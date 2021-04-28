import React from 'react';
import {
  Box, Hidden, useMediaQuery, useTheme
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PageTitle from '../../PageTitle';
import StyledText from '../../../../containers/StyledText';
import WhiteBlock from '../../../../containers/WhiteBlock';
import ReactFormText from '../../../../containers/ReactFormText';

const defaultValues = {
  blogId: '',
};

const schema = Yup.object().shape({
  blogId: Yup.string().required('블로그 아이디를 입력해주세요'),
});

function NaverBlog() {
  const {
    register, handleSubmit, reset, errors, setValue, control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const is1300 = useMediaQuery('(min-width:1300px)');
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const isSM = useMediaQuery(theme.breakpoints.up('sm'));


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
        <Box width={{ xs: '100%', md: '250px' }}>
          <ReactFormText
            register={register}
            errors={errors}
            name="blogId"
            placeholder="블로그 아이디"
          />
        </Box>
      </Box>
    </WhiteBlock>
  );
}

export default NaverBlog;
