import React, {useContext, useEffect, useState} from 'react';
import {Box, Grid, useMediaQuery, useTheme} from '@material-ui/core';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import ReactFormText from '../../../../containers/ReactFormText';
import LabelComponent from '../UserInfo/LabelComponent';
import StyledButton from '../../../../containers/StyledButton';
import AuthContext from '../../../../context/AuthContext';
import StyledBackDrop from '../../../../containers/StyledBackDrop';

const defaultValues = {
  blogId: '',
};

const schema = Yup.object().shape({
  blogId: Yup.string().required('블로그 아이디를 입력해주세요'),
});

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function CardComponent(props) {
  const { title, data } = props;

  return (
    <Box width={{ xs: 'auto', sm: '170px' }} p="12px" fontSize="14px" border="1px solid #e8e8e8" color="#aeaeae">
      {title}
      <Box mt="12px" fontSize="22px" fontWeight="700" color="#000000a6">
        {data}
      </Box>
    </Box>
  );
}

function NaverBlog(props) {
  const { changeTab } = props;
  const [blogInfo, setBlogInfo] = useState({
    id: null,
    blogId: null,
    guests: null,
    followers: null,
    content: null,
    cntArray: [0, 0, 0, 0, 0],
    dateArray: ['1', '2', '3', '4', '5']
  });
  const [isLoad, setIsLoad] = useState(false);

  const urlParams = window.location.search;
  const searchParams = new URLSearchParams(urlParams);
  const paramsToken = searchParams.get('token');

  const token = useContext(AuthContext).token || paramsToken;

  const data = {
    labels: blogInfo.dateArray,
    datasets: [
      {
        label: '# 방문자수',
        data: blogInfo.cntArray,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const {
    register, handleSubmit, reset, errors, setValue, control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  function toggleLoadMode() {
    setIsLoad(!isLoad);
  }

  function getBlogInfo() {
    axios.get('/api/TB_NAVER/blogInfo', { params: { token } }).then((res) => {
      if (res.status === 200) {
        const {
          NAV_ID, NAV_BLOG_ID, NAV_FLWR, NAV_CONT, NAV_GUEST_AVG, cntArray, dateArray
        } = res.data.data;
        setBlogInfo({
          ...blogInfo,
          blogId: NAV_BLOG_ID,
          guests: NAV_GUEST_AVG,
          followers: NAV_FLWR,
          content: NAV_CONT,
          id: NAV_ID,
          cntArray,
          dateArray
        });
        reset({
          blogId: NAV_BLOG_ID
        });
      } else if (res.status === 201) {
        setBlogInfo({
          ...blogInfo,
          blogId: '',
          guests: '',
          followers: '',
          content: '',
          id: '',
          cntArray: [0, 0, 0, 0, 0],
          dateArray: ['1', '2', '3', '4', '5']
        });
        reset({
          blogId: ''
        });
      }
    }).catch(err => alert(err.response.data.message));
  }

  function saveBlogInfo(values) {
    setIsLoad(true);
    const { blogId } = values;
    axios.post('/api/TB_NAVER/addBlog', { token, blogId }).then((res) => {
      if (res.status === 200) {
        setIsLoad(false);
        getBlogInfo();
      }
    }).catch((err) => {
      setIsLoad(false);
      alert(err.response.data.message);
    });
  }

  function deleteBlogInfo() {
    axios.post('/api/TB_NAVER/delete', { id: blogInfo.id }).then((res) => {
      if (res.status === 200) {
        getBlogInfo();
      }
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  function buttonClick() {
    if (blogInfo.blogId) {
      deleteBlogInfo();
    } else {
      handleSubmit(saveBlogInfo)();
    }
  }

  useEffect(() => {
    if (token) {
      changeTab(2);
      getBlogInfo();
    }
  }, [token]);

  return (
    <Box py={{ xs: 1, md: 4 }} px={{ xs: 1, md: 6 }}>
      <Box mb={2}>
        <LabelComponent fontWeight="700" color="#000000" fontSize="15px" labelName="네이버블로그 연동" />
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm="auto">
          <Box width={{ xs: 'auto', sm: '250px' }}>
            <ReactFormText
              register={register}
              errors={errors}
              name="blogId"
              placeholder="블로그 아이디"
              inputProps={{ readOnly: blogInfo.blogId }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm="auto">
          <StyledButton
            height={40}
            padding="0 20px"
            onClick={buttonClick}
          >
            {blogInfo.blogId ? '연동끊기' : '연동하기'}
          </StyledButton>
        </Grid>
      </Grid>
      <Box mt={4} mb={2}>
        <LabelComponent fontWeight="700" color="#000000" fontSize="15px" labelName="연동된 네이버블로그 정보" />
      </Box>
      <Grid container spacing={isSM ? 2 : 1}>
        <Grid item xs={6} sm="auto">
          <CardComponent title="방문자(평균)" data={blogInfo.guests || '-'} />
        </Grid>
        <Grid item xs={6} sm="auto">
          <CardComponent title="이웃" data={blogInfo.followers || '-'} />
        </Grid>
        <Grid item xs={6} sm="auto">
          <CardComponent title="게시물" data={blogInfo.content || '-'} />
        </Grid>
      </Grid>
      <Box mt={4} mb={2}>
        <LabelComponent fontWeight="700" color="#000000" fontSize="15px" labelName="방문자수" />
      </Box>
      <Box width={{ xs: 'auto', sm: '594px' }} p="12px" fontSize="14px" border="1px solid #e8e8e8" color="#aeaeae">
          방문자 ( 최근 5일간 방문자수 )
        <Box mt="12px">
          <Line data={data} options={options} />
        </Box>
      </Box>
      <StyledBackDrop open={isLoad} handleClose={toggleLoadMode} />
    </Box>
  );
}

export default NaverBlog;
