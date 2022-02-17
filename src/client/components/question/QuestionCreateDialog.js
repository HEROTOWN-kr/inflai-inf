import React from 'react';
import {
  Box, Button, Dialog, Grid, IconButton, makeStyles
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Colors } from '../../lib/Сonstants';
import ReactFormText from '../../containers/ReactFormText';
import StyledText from '../../containers/StyledText';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    width: '100%',
    borderRadius: '2px'
  },
  button: {
    padding: 0,
    minWidth: 0
  },
  header: {
    padding: '15px',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '18px',
    textAlign: 'center',
    position: 'relative',
    borderBottom: `1px solid ${Colors.grey8}`,
  }
});

const defaultValues = {
  title: '',
  content: ''
};

const schema = Yup.object().shape({
  title: Yup.string().required('문의 제목을 입력해주세요').max(45, '45 글자까지 입력 가능합니다'),
  content: Yup.string().required('문의 내용을 입력해주세요').max(300, '300 글자까지 입력 가능합니다'),
});


function QuestionCreateDialog(props) {
  const {
    open, closeDialog, getQuestions, adId, token
  } = props;
  const classes = useStyles();

  const {
    register, handleSubmit, errors, reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  function onDialogClose() {
    reset(defaultValues);
    closeDialog();
  }

  function onSubmit(values) {
    axios.post('/api/TB_QUESTION/saveQuestion', { ...values, token, adId }).then((res) => {
      getQuestions();
      onDialogClose();
    }).catch((err) => {
      alert(err.response.data.message);
    });
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
          // fullScreen={fullScreen}
      open={open}
      onClose={onDialogClose}
      maxWidth="xs"
      /* TransitionProps={{
        onEntered: getHistory,
        unmountOnExit: true
      }} */
      aria-labelledby="responsive-dialog-title"
    >
      <Box className={classes.header}>
        문의 쓰기
        <IconButton size="medium" classes={{ root: classes.root }} onClick={onDialogClose}>
          <Clear />
        </IconButton>
      </Box>
      <Box p={2} boxSizing="border-box">
        <Box>
          <Box mb={1}><StyledText color="#3f51b5">문의 제목</StyledText></Box>
          <ReactFormText
            register={register}
            errors={errors}
            name="title"
            placeholder="Ex) 배송 날짜 궁금합니다"
          />

          <Box my={1}><StyledText color="#3f51b5">문의 내용</StyledText></Box>
          <ReactFormText
            register={register}
            errors={errors}
            multiline
            rows={5}
            name="content"
            placeholder="Ex) 제품 배송이 안되서 언제 배송이 되는지 궁금합니다"
          />
        </Box>

        <Box mt={4}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Box width="110px" m="0 auto">
                <Button
                  fullWidth
                  color="secondary"
                  variant="contained"
                  onClick={onDialogClose}
                >
                  닫기
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <Box width="110px" m="0 auto">
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}
                >
                  저장
                </Button>
              </Box>
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Dialog>
  );
}

export default QuestionCreateDialog;
