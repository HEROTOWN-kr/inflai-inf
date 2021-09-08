import React from 'react';
import GoogleLogin from 'react-google-login';
import { Box } from '@material-ui/core';
import axios from 'axios';

function YoutubeTest(props) {
  const responseGoogle = async (response) => {
    if (!response.error) {
      console.log(response.code);
    } else {
      alert('google auth error');
    }
  };

  return (
    <Box>
      <GoogleLogin
        clientId="997274422725-gb40o5tv579csr09ch7q8an63tfmjgfo.apps.googleusercontent.com" // CLIENTID                buttonText="LOGIN WITH GOOGLE"
        scope="profile email https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/yt-analytics.readonly"
        responseType="code"
        accessType="offline"
        prompt="consent"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </Box>
  );
}

export default YoutubeTest;
