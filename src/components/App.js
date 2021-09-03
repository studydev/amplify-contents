/* eslint-disable */
//App.js

import React, { useState, useEffect } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { css } from '@emotion/css';
import { API, Storage, Auth } from 'aws-amplify';
import { listContents } from '../graphql/queries';

import Contents from './Contents';
import Content from './Content';
import Header from './Header';
import CreateContent from './CreateContent';
import Button from './Button';

function Router() {

  /* create a couple of pieces of initial state */
  const [showOverlay, updateOverlayVisibility] = useState(false);
  const [contents, updateContents] = useState([]);
  const [myContents, updateMyContents] = useState([]);

  /* fetch contents when component loads */
  useEffect(() => {
      fetchContents();
  }, []);

  async function fetchContents() {

    /* query the API, ask for 100 items */
    let contentData = await API.graphql({ query: listContents, variables: { limit: 100 }});
    let contentsArray = contentData.data.listContents.items;

    /* map over the image keys in the contents array, get signed image URLs for each image */
    contentsArray = await Promise.all(contentsArray.map(async content => {
      const imageKey = await Storage.get(content.image);
      content.image = imageKey;
      return content;
    }));

    /* update the contents array in the local state */
    setContentState(contentsArray);
  }
  
  async function setContentState(contentsArray) {
    const user = await Auth.currentAuthenticatedUser();
    const myContentData = contentsArray.filter(p => p.owner === user.username);
    console.log(user);
    console.log(contentsArray);
    updateMyContents(myContentData);
    updateContents(contentsArray);
  }


  return (
    <>
      <HashRouter>
          <div className={contentStyle}>
            <Header />
            <hr className={dividerStyle} />
            <Button title="New Content" onClick={() => updateOverlayVisibility(true)} />
            <Switch>
              <Route exact path="/" >
                <Contents contents={contents} />
              </Route>
              <Route path="/content/:id" >
                <Content />
              </Route>
              <Route exact path="/mycontents" >
                <Contents contents={myContents} />
              </Route>
            </Switch>
          </div>
          <AmplifySignOut />
        </HashRouter>
        { showOverlay && (
          <CreateContent
            updateOverlayVisibility={updateOverlayVisibility}
            updateContents={setContentState}
            contents={contents}
          />
        )}
    </>
  );
}

const dividerStyle = css`
  margin-top: 15px;
`

const contentStyle = css`
  min-height: calc(100vh - 45px);
  padding: 0px 40px;
`

export default withAuthenticator(Router);