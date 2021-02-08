import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

function createUrl(url) {
  return url.indexOf('https://') > -1 ? url : `https://influencer.inflai.com${url}`;
}

function HelmetMetaData(props) {
  const { title, description, image } = props;
  const imgUrl = image ? createUrl(image) : 'https://influencer.inflai.com/attach/video/logo_inflai-color.png';
  const location = useLocation();
  const currentUrl = `https://influencer.inflai.com${location.pathname}`;

  return (
    <Helmet>
      <title>Inflai</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta property="title" content={title || 'Inflai'} />
      <meta name="description" content={description || 'Inflai'} />
      <meta property="image" content={imgUrl} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || 'Inflai'} />
      <meta property="og:description" content={description || 'Inflai'} />
      <meta property="og:image" content={imgUrl} />
    </Helmet>
  );
}

export default HelmetMetaData;
