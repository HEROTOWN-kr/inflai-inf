import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { Box, Divider } from '@material-ui/core';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { Colors } from '../../lib/Сonstants';
import StyledText from '../../containers/StyledText';
import ReactFormText from '../../containers/ReactFormText';
import StyledButton from '../../containers/StyledButton';
import FbLogin from './sns/FbLogin';
import NavLogin from './sns/NavLogin';
import KakLogin from './sns/KakLogin';

const defaultValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
};

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('잘못된 이메일 형식 입니다.')
    .required('이메일을 입력해주세요'),
  password: Yup.string()
    .required('비밀번호를 입력해주세요'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], '비밀번호가 일치해야합니다')
    .required('비밀번호 확인해주세요'),
  name: Yup.string()
    .required('이름을 입력해주세요'),
});

function SignUpNew() {
  const history = useHistory();
  const [mainError, setMainError] = useState({});
  const auth = useContext(AuthContext);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  async function signUp(values) {
    try {
      const urlResponse = await axios.post('/api/TB_INFLUENCER/signup', values);
      const {
        social_type, userToken, userName, userPhone, message, userPhoto
      } = urlResponse.data;
      if (urlResponse.status === 200) {
        auth.login(userToken, '2', userName, social_type, userPhoto);
        if (userPhone) {
          history.push('/');
        } else {
          history.push('/Profile');
        }
      } else if (urlResponse.status === 201) {
        setMainError({ message });
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  const handleUserKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(signUp)();
    }
  };


  return (
    <Box
      maxWidth="400px"
      m="48px auto"
      boxSizing="border-box"
      border={{ xs: 'medium none color', md: `solid 1px ${Colors.grey}` }}
      py={{ xs: 0, md: 6 }}
      px={{ xs: 2, md: 6 }}
    >
      <StyledText mb="44px" textAlign="center" fontSize="36px">로그인</StyledText>
      <Box mb="24px">
        <ReactFormText
          register={register}
          errors={errors}
          name="email"
          placeholder="이메일"
        />
      </Box>
      <ReactFormText
        register={register}
        errors={errors}
        name="password"
        type="password"
        placeholder="비밀번호"
      />
      <ReactFormText
        register={register}
        errors={errors}
        name="passwordConfirm"
        type="password"
        placeholder="비밀번호 확인"
      />
      <ReactFormText
        register={register}
        errors={errors}
        name="name"
        placeholder="이름"
        onKeyPress={handleUserKeyPress}
      />
      {mainError.message ? (
        <Box my="24px">
          <div className="error-message">{mainError.message ? mainError.message : null}</div>
        </Box>
      ) : null}
      <Box my="24px">
        <StyledButton
          height={36}
          background="#f50057"
          hoverBackground="#c51162"
          onClick={handleSubmit(signUp)}
        >
            회원가입
        </StyledButton>
      </Box>
      <Divider />
      <Box mt="24px">
        <FbLogin />
        <NavLogin />
        <KakLogin />
      </Box>
    </Box>
  );
}

export default SignUpNew;
