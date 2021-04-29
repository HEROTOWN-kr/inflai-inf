import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Grid, Hidden, useMediaQuery, useTheme
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import PageTitle from '../../PageTitle';
import StyledText from '../../../../containers/StyledText';
import WhiteBlock from '../../../../containers/WhiteBlock';
import ReactFormText from '../../../../containers/ReactFormText';
import LabelComponent from '../UserInfo/LabelComponent';
import StyledButton from '../../../../containers/StyledButton';
import { Colors } from '../../../../lib/Сonstants';
import AuthContext from '../../../../context/AuthContext';
import StyledBackDrop from '../../../../containers/StyledBackDrop';

const defaultValues = {
  blogId: '',
};

const schema = Yup.object().shape({
  blogId: Yup.string().required('블로그 아이디를 입력해주세요'),
});

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

function NaverBlog() {
  const [blogInfo, setBlogInfo] = useState({
    id: null,
    blogId: null,
    guests: null,
    followers: null,
    content: null,
  });
  const [isLoad, setIsLoad] = useState(false);
  const { token } = useContext(AuthContext);

  const {
    register, handleSubmit, reset, errors, setValue, control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));

  function toggleLoadMode() {
    setIsLoad(!isLoad);
  }

  function getBlogInfo() {
    axios.get('/api/TB_NAVER/blogInfo', { params: { token } }).then((res) => {
      if (res.status === 200) {
        const {
          NAV_ID, NAV_BLOG_ID, NAV_FLWR, NAV_CONT, NAV_GUEST
        } = res.data.data;
        setBlogInfo({
          ...blogInfo,
          blogId: NAV_BLOG_ID,
          guests: NAV_GUEST,
          followers: NAV_FLWR,
          content: NAV_CONT,
          id: NAV_ID
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
          id: ''
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
      getBlogInfo();
    }
  }, [token]);

  return (
    <WhiteBlock height="100%" borderRadius={isMD ? '7px' : '0'}>
      <Hidden smDown>
        <PageTitle>
          <StyledText fontSize="24px">
              SNS
          </StyledText>
        </PageTitle>
      </Hidden>
      <Box py={isMD ? 4 : 1} px={isMD ? 6 : 1}>
        <Box mb={2}>
          <LabelComponent fontSize="15px" labelName="네이버블로그 연동" />
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
          <LabelComponent fontSize="15px" labelName="연동된 네이버블로그 정보" />
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
      </Box>
      <StyledBackDrop open={isLoad} handleClose={toggleLoadMode} />
    </WhiteBlock>
  );
}

export default NaverBlog;
