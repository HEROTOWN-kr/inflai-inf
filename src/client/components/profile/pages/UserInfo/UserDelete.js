import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box, Dialog, Grid, IconButton, makeStyles
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import axios from 'axios';
import { Colors } from '../../../../lib/Сonstants';
import StyledButton from '../../../../containers/StyledButton';
import AuthContext from '../../../../context/AuthContext';

const useStyles = makeStyles({
  root: {
    fontSize: '13px',
    cursor: 'pointer',
    '&:hover': {
      color: Colors.pink
    }
  },
  dialogRoot: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#b9b9b9de'
  },
  paper: {
    margin: '12px',
    // width: '100%',
    borderRadius: '2px'
  },
  button: {
    padding: 0,
    minWidth: 0
  },
  socialMediaButton: {

  }
});

function UserDeleteDialog(props) {
  const { open, closeDialog } = props;
  const classes = useStyles();
  const { token, logout } = useContext(AuthContext);
  const history = useHistory();

  function deleteUser() {
    axios.post('/api/TB_INFLUENCER/userDelete', { token }).then((res) => {
      closeDialog();
      logout();
      history.push('/');
    }).catch((err) => {
      closeDialog();
      alert(err.response.data.message);
    });
  }

  function onDialogClose() {
    closeDialog();
  }

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      onClose={onDialogClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Box p="15px" fontSize="16px" fontWeight="400" lineHeight="18px" textAlign="center" position="relative" borderBottom={`1px solid ${Colors.grey8}`}>
                회원 탈퇴
        <IconButton size="medium" classes={{ root: classes.dialogRoot }} onClick={onDialogClose}>
          <Clear />
        </IconButton>
      </Box>
      <Box px={2} py={2} width="325px" boxSizing="border-box">
        탈퇴 하시겠습니까?
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StyledButton height={40} onClick={onDialogClose}>
                        아니요
              </StyledButton>
            </Grid>
            <Grid item xs={6}>
              <StyledButton height={40} onClick={deleteUser}>
                        네
              </StyledButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
}

function UserDelete() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  function toggleDialog() {
    setOpenDialog(!openDialog);
  }

  return (
    <React.Fragment>
      <Box classes={{ root: classes.root }} component="u" onClick={toggleDialog}>회원 탈퇴</Box>
      <UserDeleteDialog open={openDialog} closeDialog={toggleDialog} />
    </React.Fragment>
  );
}

export default UserDelete;
