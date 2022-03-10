import React, { useRef } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Dialog, Grid, makeStyles
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import StyledButton from '../../../../containers/StyledButton';
import { Colors } from '../../../../lib/Сonstants';
import StyledText from '../../../../containers/StyledText';
import StyledTextField from '../../../../containers/StyledTextField';

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
  },
  FormHelperContained: {
    marginLeft: '0'
  },
});

const defaultValues = {
  url: ''
};

const schema = Yup.object().shape({
  url: Yup.string().required('판매링크 URL를 입력해주세요')
    .test('snsTypeCheck', '올바른 URL이 아닙니다. URL을 확인해주세요.', val => (
      val.indexOf('http://') === 0 || val.indexOf('https://') === 0
    )),
});


export default function SellUrlDialog(props) {
  const {
    open, closeDialog, sellUrl
  } = props;
  const classes = useStyles();
  const urlRef = useRef();
  const { enqueueSnackbar } = useSnackbar();

  const {
    register, errors, reset
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  function onDialogClose() {
    reset(defaultValues);
    closeDialog();
  }

  function checkUrl() {
    reset({ url: sellUrl });
  }

  function copyUrl() {
    urlRef.current.select();
    document.execCommand('copy');
    enqueueSnackbar('복사되었습니다', { variant: 'success' });
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
        판매링크 URL
        <Clear onClick={onDialogClose} classes={{ root: classes.root }} />
      </Box>
      <Box padding="20px">
        <Box mb={2}>
          <Box mb={1}><StyledText color="#3f51b5">판매링크 URL</StyledText></Box>
          <StyledTextField
            label=""
            variant="outlined"
            fullWidth
            name="url"
            inputRef={(ref) => {
              urlRef.current = ref;
              register(ref);
            }}
            error={!!errors.url}
            FormHelperTextProps={{
              classes: { contained: classes.FormHelperContained }
            }}
            helperText={<span className="error-message">{errors.url?.message}</span>}
            css={{ transition: 'all 1s ease-out' }}
            placeholder="예시) https://herotownshop.cafe24.com/product/detail.html?product_no=10&cate_no=1&display_group=2"
            inputProps={{ readOnly: true }}
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
              <StyledButton
                height={38}
                padding="0"
                background={Colors.green}
                hoverBackground={Colors.greenHover}
                onClick={copyUrl}
              >
                복사
              </StyledButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}
