/* eslint-disable */
// Contents.js

import React, { useState }  from 'react'
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

// awsui
import { Badge, SideNavigation, SpaceBetween, Cards, Box, Button, TextFilter, Header, Pagination, CollectionPreferences, Container } from "@awsui/components-react";

export default function Contents({
  contents = []
}) {
  const [ selectedItems, setSelectedItems ] = useState([]);
  return (
    <>
      <h1>Contents</h1>
      <Cards
        trackBy="name"
        cardDefinition={{
          header: e => e.name,
          sections: [
            {
              id: "description",
              header: "Description",
              content: e => e.description
            }
          ]
        }}
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        selectedItems={selectedItems}
        cardsPerRow={[
          { cards: 1 },
          { minWidth: 500, cards: 3 }
        ]}
        items={contents}
        loadingText="Loading resources"
        selectionType="multi"
        visibleSections={["description"]}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box
              padding={{ bottom: "s" }}
              variant="p"
              color="inherit"
            >
              No resources to display.
            </Box>
            <Button>Create resource</Button>
          </Box>
        }
        filter={
          <TextFilter filteringPlaceholder="Find resources" />
        }
        header={
          <Header
            counter={
              selectedItems.length
                ? "(" + ((selectedItems.length) - 1) + "/" + contents.length + ")"
                : "(0/" + contents.length +")"
            }
          >
            선택한 컨텐츠
          </Header>
        }
      />
      {
        contents.map(content => (
          <Link to={`/content/${content.id}`} className={linkStyle} key={content.id}>
            <div key={content.id} className={contentContainer}>
              <h1 className={contentTitleStyle}>{content.name}</h1>
              <p className={contentTitleStyle2}>{content.description}</p>
              <img alt="content" className={imageStyle} src={content.image} />
            </div>
          </Link>
        ))
      }
    </>
  )
}

const contentTitleStyle = css`
  margin: 15px 0px;
  color: #0070f3;
`

const contentTitleStyle2 = css`
  margin: 15px 0px;
  color: #333333;
`

const linkStyle = css`
  text-decoration: none;
`

const contentContainer = css`
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  margin: 0px 20px 20px 0px;
  float: left;
  :hover {
    border-color: #0070f3;
  }
`

const imageStyle = css`
  width: 100%;
  max-width: 200px;
`
