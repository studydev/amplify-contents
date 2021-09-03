/* eslint-disable */
// Content.js

import React, { useState, useEffect } from 'react'
import { css } from '@emotion/css';
import { useParams } from 'react-router-dom';
import { API, Storage } from 'aws-amplify';
import { getContent } from '../graphql/queries';

export default function Content() {
  const [loading, updateLoading] = useState(true);
  const [content, updateContent] = useState(null);
  const { id } = useParams()
  
  useEffect(() => {
    fetchContent()
  }, [])
  
  async function fetchContent() {
    try {
      const contentData = await API.graphql({
        query: getContent, variables: { id }
      });
      const currentContent = contentData.data.getContent
      const image = await Storage.get(currentContent.image);

      currentContent.image = image;
      updateContent(currentContent);
      updateLoading(false);
    } catch (err) {
      console.log('error: ', err)
    }
  }
  
  if (loading) return <h3>Loading...</h3>
  console.log('content: ', content)
  
  return (
    <>
      <h1 className={titleStyle}>{content.name}</h1>
      <p>{content.description}</p>
      <img alt="content" src={content.image} className={imageStyle} />
    </>
  )
}

const titleStyle = css`
  margin-bottom: 7px;
`

const imageStyle = css`
  max-width: 250px;
  @media (max-width: 250px) {
    width: 100%;
  }
`
