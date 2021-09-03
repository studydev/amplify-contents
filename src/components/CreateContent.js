/* eslint-disable */
// CreateContent.js

import React, { useState } from 'react';
import { css } from '@emotion/css';
// import Button from './Button';
import { v4 as uuid } from 'uuid';
import { Storage, API, Auth } from 'aws-amplify';
import { createContent } from '../graphql/mutations';
import { Input, FormField, Form, Badge, SideNavigation, SpaceBetween, Cards, Box, Button, TextFilter, Header, Pagination, CollectionPreferences, Container } from "@awsui/components-react";


/* Initial state to hold form input, saving state */
const initialState = {
  name: '',
  description: '',
  image: {},
  file: '',
  saving: false
};

export default function CreateContent({
  updateOverlayVisibility, updateContents, contents
}) {

  /* 1. Create local state with useState hook */
  const [formState, updateFormState] = useState(initialState)

  /* 2. onChangeText handler updates the form state when a user types into a form field */
  function onChangeText(e) {
    e.persist();
    updateFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }));
  }

  /* 3. onChangeFile handler will be fired when a user uploads a file  */
  function onChangeFile(e) {
    e.persist();
    if (! e.target.files[0]) return;
    const image = { fileInfo: e.target.files[0], name: `${e.target.files[0].name}_${uuid()}`}
    updateFormState(currentState => ({ ...currentState, file: URL.createObjectURL(e.target.files[0]), image }))
  }

  /* 4. Save the content  */
  async function save() {
    try {
      const { name, description, image } = formState;
      if (!name || !description || !image.name) return;
      updateFormState(currentState => ({ ...currentState, saving: true }));
      const contentId = uuid();
      const contentInfo = { name, description, image: formState.image.name, id: contentId };

      await Storage.put(formState.image.name, formState.image.fileInfo);
      await API.graphql({
        query: createContent,
        variables: { input: contentInfo },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });
      const { username } = await Auth.currentAuthenticatedUser(); // new
      updateContents([...contents, { ...contentInfo, image: formState.file, owner: username }]);
      updateFormState(currentState => ({ ...currentState, saving: false }));
      updateOverlayVisibility(false);
    } catch (err) {
      console.log('error: ', err);
    }
  }
  
  return (
    <div className={containerStyle}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button type="cancel" title="Cancel" variant="link" onClick={() => updateOverlayVisibility(false)}>Cancel</Button>
            <Button title="Create New Content" variant="primary" onClick={save}>Create New Content</Button>
          </SpaceBetween>
        }
        header={
          <Header
            variant="h1"
            description="다음 정보를 입력하세요."
          >
            New Content
          </Header>
        }
      >
        <Container>
            <FormField label="컨텐츠 이름">
              <input placeholder="Content name" name="name" onChange={onChangeText} autoFocus/>
            </FormField>
            
            <FormField label="상세 설명">
              <input placeholder="Description" name="description" onChange={onChangeText}/>
            </FormField>
            
            <FormField label="파일 업로드">
              <input type="file" onChange={onChangeFile} />
            </FormField>
            { formState.file && <img className={imageStyle} alt="preview" src={formState.file} /> }
        </Container>
        { formState.saving && <p className={savingMessageStyle}>Saving content...</p> }
      </Form>
    </div>
  )
}

const inputStyle = css`
  margin-bottom: 10px;
  outline: none;
  padding: 7px;
  border: 1px solid #ddd;
  font-size: 16px;
  border-radius: 4px;
`

const imageStyle = css`
  height: 120px;
  margin: 10px 0px;
  object-fit: contain;
`

const containerStyle = css`
  display: flex;
  flex-direction: column;
  width: 440px;
  height: auto;
  position: fixed;
  left: 0;
  border-radius: 4px;
  top: 0;
  margin-left: calc(50vw - 220px);
  margin-top: calc(50vh - 230px);
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.125rem 0.25rem;
  padding: 20px;
`

const savingMessageStyle = css`
  margin-bottom: 0px;
`
