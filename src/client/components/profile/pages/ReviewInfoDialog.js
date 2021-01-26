import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Clear, WarningRounded } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import StyledButton from '../../../containers/StyledButton';
import { Colors } from '../../../lib/Сonstants';
import StyledText from '../../../containers/StyledText';
import ReactFormText from '../../../containers/ReactFormText';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '15px',
    right: '14px',
    fontSize: '28px',
    color: '#b9b9b9de',
    cursor: 'pointer'
  },
  paper: {
    margin: '12px',
    width: '100%',
    borderRadius: '2px'
  }
});

const defaultValues = {
  url: ''
};

const schema = Yup.object().shape({
  url: Yup.string().required('리뷰 url를 입력해주세요')
    .test('snsTypeCheck', '올바른 블로그 URL이 아닙니다. URL을 확인해주세요.', val => (
      val.indexOf('http://') === 0 || val.indexOf('https://') === 0
    )),
});


export default function ReviewInfoDialog(props) {
  const {
    open, closeDialog, onConfirm, currentAd
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();


  const {
    register, handleSubmit, handleBlur, watch, errors, setValue, control, getValues, reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  const onConfirmFunc = (data) => {
    onConfirm(data.url);
    reset(defaultValues);
    closeDialog();
  };

  function onDialogClose() {
    reset(defaultValues);
    closeDialog();
  }

  function checkUrl() {
    reset({ url: currentAd.url });
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      // fullScreen={fullScreen}
      open={open}
      onEntered={checkUrl}
      onClose={onDialogClose}
      maxWidth="xs"
      aria-labelledby="responsive-dialog-title"
    >
      <Box padding="20px" fontSize="18px" fontWeight="400" lineHeight="18px" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
                INFLAI
        <Clear onClick={onDialogClose} classes={{ root: classes.root }} />
      </Box>
      <Box padding="20px">
        <Box mb={2}>
          <Box mb={1}><StyledText color="#3f51b5">리뷰 URL</StyledText></Box>
          <ReactFormText
            register={register}
            errors={errors}
            name="url"
            placeholder="예시) https://www.instagram.com/myreviewlink"
          />
        </Box>
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Box width="100px">
              <StyledButton height={38} padding="0" onClick={onDialogClose}>
                        닫기
              </StyledButton>
            </Box>
          </Grid>
          <Grid item>
            <Box width="100px">
              <StyledButton height={38} padding="0" onClick={handleSubmit(onConfirmFunc)}>
                              저장
              </StyledButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
