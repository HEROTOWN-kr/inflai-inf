import React, { useContext, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Grid from '@material-ui/core/Grid';
import {
  Box, Button, Divider, TextField
} from '@material-ui/core';
import SocialNetworks from './Social';
import AuthContext from '../../context/AuthContext';

function Login(props) {
  const { history } = props;
  const [mainError, setMainError] = useState({});
  const auth = useContext(AuthContext);

  function logIn(values) {
    axios.post('/api/auth/login', values).then((res) => {
      if (res.status === 200) {
        const {
          social_type, userToken, userName, regState, userPhone, userPhoto, message
        } = res.data;
        auth.login(userToken, userName, social_type, userPhoto);
        if (userPhone) {
          history.push('/');
        } else {
          history.push('/Profile');
        }
      } else if (res.status === 201) {
        setMainError({ message: res.data.message });
      } else {
        setMainError({ message: res.data.message });
      }
    }).catch(error => (error));
  }

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email('잘못된 이메일 형식 입니다.')
      .required('이메일을 입력해주세요'),
    password: Yup.string()
      .required('비밀번호를 입력해주세요'),
  });

  return (
    <div className="login-dialog">
      <Formik
        initialValues={{
          type: '2',
          email: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          logIn(values);
        }}
      >
        {({
          values, errors, touched, handleChange, handleBlur, setFieldValue
        }) => (
          <Box py={{ xs: 3, md: 6 }} px={{ xs: 4, md: 6 }} className="signUpForm">
            <Form>
              {errors.type && touched.type ? <div className="error-message">{errors.type}</div> : null}
              <Grid container spacing={3}>
                <Grid item xs={12} className="title">
                  <h2>로그인</h2>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    error={errors.email && touched.email}
                    placeholder="이메일"
                    name="email"
                    className="text-field"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email && touched.email ? <div className="error-message">{errors.email}</div> : null}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    error={errors.password && touched.password}
                    placeholder="비밀번호"
                    name="password"
                    type="password"
                    className="text-field"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.password && touched.password ? <div className="error-message">{errors.password}</div> : null}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                {mainError.message
                  ? (
                    <Grid item xs={12}>
                      <Grid container justify="center">
                        <Grid item>
                          <div className="error-message">{mainError.message ? mainError.message : null}</div>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) : null}
                <Grid item xs={12}>
                  <Button fullWidth type="submit" variant="contained" color="secondary" className="login-button">
                                        로그인
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider variant="middle" />
                </Grid>
                <Grid item xs={12} className="social-networks">
                  <SocialNetworks history={history} />
                </Grid>
                <Grid item xs={12}>
                  <Divider variant="middle" />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant="contained" className="signup-button" onClick={() => history.push('SignUp')}>
                                        회원가입하기
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Box>
        )}
      </Formik>
    </div>
  );
}

export default Login;
