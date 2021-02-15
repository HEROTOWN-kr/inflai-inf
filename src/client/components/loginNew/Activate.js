import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@material-ui/core';

function Activate() {
  const [activated, setActivated] = useState(false);

  const params = useParams();
  const { hash } = params;

  useEffect(() => {
    axios.post('/api/TB_INFLUENCER/activate', { hash }).then((res) => {
      if (res.status === 200) {
        setActivated(true);
        console.log(res);
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }, []);

  return (
    <Box>
      { activated ? (
        <Box>인증되었습니다! 로그인 하십시오.</Box>
      ) : (
        <Box>인증할때 에러가 생겼습니다</Box>
      )}
    </Box>
  );
}

export default Activate;
