import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { AdvertiseTypes, Colors } from '../../lib/Сonstants';
import StyledText from '../../containers/StyledText';
import StyledButton from '../../containers/StyledButton';
import StyledImage from '../../containers/StyledImage';
import noFound from '../../img/notFound400_316.png';
import defaultAccountImage from '../../img/default_account_image.png';
import StyledTableCell from '../../containers/StyledTableCell';
import AuthContext from '../../context/AuthContext';
import QuestionCreateDialog from './QuestionCreateDialog';
import QuestionDialog from './QuestionDialog';
import noImage from '../../img/noImage.png';

const tableHeader = [
  {
    text: '번호',
    width: '60px',
    align: 'center'
  },
  {
    text: '제목',
    align: 'center'
  },
  {
    text: '상태',
    width: '60px',
    align: 'center'
  },
  {
    text: '작성기간',
    width: '100px',
    align: 'center'
  }
];

const adTypes = {
  1: {
    text: '인스타',
    color: Colors.pink,
  },
  2: {
    text: '유튜브',
    color: Colors.red,
  },
  3: {
    text: '블로그',
    color: '#2ba406',
  },
  4: {
    text: '기자단',
    color: '#0027ff'
  }
};

const snsTypes = {
  1: {
    text: 'Instagram',
    color: Colors.pink
  },
  2: {
    text: 'Youtube',
    color: Colors.red
  },
  3: {
    text: 'Blog',
    color: Colors.green
  }
};

const useStyles = makeStyles({
  campaignCard: {
    padding: '12px'
  },
  tooltipIcon: {
    color: '#8C3FFF',
    marginLeft: '5px',
  },
});

const defaultCampaignInfo = {
  photo: '',
  campaignName: '캠페인 이름',
  shortDiscription: '캠페인 이름',
  type: '1',
};
function Question(props) {
  const [questions, setQuestions] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [detailDialog, setDetailDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [campaignInfo, setCampaignInfo] = useState(defaultCampaignInfo);

  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const {
    state
  } = location;

  function toggleDialog() {
    setShowDialog(!showDialog);
  }

  function toggleDetailDialog() {
    setDetailDialog(!detailDialog);
  }


  function getQuestions() {
    axios.get('/api/TB_QUESTION/list', {
      params: { AD_ID: '314', token, page: '1' }
    }).then((res) => {
      const { data, countData } = res.data;
      setQuestions(data);
    }).catch((err) => {
      alert(err.response.message);
    });
  }

  function getDetail(value) {
    setSelected(value);
    toggleDetailDialog();
  }

  useEffect(() => {
    if (token) getQuestions();
    setCampaignInfo(state);
  }, [token]);


  return (
    <Box py="50px" bgcolor="#f5f5f5" minHeight="calc(100vh - 445px);">
      <Box px={2} maxWidth={1200} m="0 auto" boxSizing="border-box">
        <Grid container spacing={2}>
          <Grid item>
            <Box width="300px">
              <Paper className={classes.campaignCard}>
                <StyledImage width="100%" height="300px" src={campaignInfo.photo || noImage} />
                <Box py={3}><StyledText overflowHidden fontSize="20px" fontWeight="bold">{campaignInfo.campaignName}</StyledText></Box>
                <StyledText overflowHidden fontSize="15px">{campaignInfo.shortDiscription}</StyledText>
                <Box pt={2}>
                  <Box width="30%" p={1} border={`1px solid ${adTypes[campaignInfo.type].color}`}>
                    <StyledText textAlign="center" fontSize="13px" color={adTypes[campaignInfo.type].color} fontWeight="bold">{adTypes[campaignInfo.type].text}</StyledText>
                  </Box>
                </Box>
                {/* <Grid container>
                  <Grid item xs="auto">
                    <StyledImage
                      width="80px"
                      height="80px"
                      src={campaignInfo.photo.length > 0 ? campaignInfo.photo[0].PHO_FILE_URL : noFound}
                      onError={(e) => { e.target.onerror = null; e.target.src = `${defaultAccountImage}`; }}
                    />
                  </Grid>
                  <Grid item xs>
                    <Box ml="14px" height="100%">
                      <Grid container alignContent="space-between" style={{ height: '100%' }}>
                        <Grid item xs={12}>
                          <StyledText fontSize="14px" color="#222">
                            {campaignInfo.campaignName}
                          </StyledText>
                          <StyledText fontSize="14px" color="#222">
                            <Grid container spacing={1}>
                              { campaignInfo.report ? (
                                <Grid item>
                                  <Box style={{ color: '#0027ff', fontWeight: '600' }}>(기자단)</Box>
                                </Grid>
                              ) : null}
                              <Grid item>
                                <Box style={{ color: snsTypes[campaignInfo.type].color, fontWeight: '600' }}>{snsTypes[campaignInfo.type].text}</Box>
                              </Grid>
                              <Grid item>
                                <Box>
                                  {` ${AdvertiseTypes.mainType[campaignInfo.category]} > ${AdvertiseTypes.subType[campaignInfo.category][campaignInfo.subcategory]}`}
                                </Box>
                              </Grid>
                            </Grid>
                          </StyledText>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid> */}
              </Paper>
            </Box>
          </Grid>
          <Grid item xs>
            <Box fontSize={22} fontWeight={600} mb="25px">1대1문의하기(Q&A)</Box>
            <Box mt={{ xs: '20px', sm: 0 }} mb={1}>
              <Grid container justify="flex-end">
                <Grid item>
                  <StyledButton
                    height={40}
                    padding="0 20px"
                    background="#0fb359"
                    hoverBackground="#107C41"
                    startIcon={<Create />}
                    onClick={toggleDialog}
                  >
                    문의 쓰기
                  </StyledButton>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      {tableHeader.map(item => (
                        <StyledTableCell key={item.text} align={item.align} width={item.width}>
                          {item.text}
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questions.map(item => (
                      <TableRow hover onClick={() => getDetail(item.QUE_ID)}>
                        <StyledTableCell align="center">
                          {item.rownum}
                        </StyledTableCell>
                        <StyledTableCell>
                          {item.QUE_TITLE}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.QUE_STATE === '1' ? '답변완료' : '대기중'}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {item.QUE_DT}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <QuestionCreateDialog open={showDialog} closeDialog={toggleDialog} getQuestions={getQuestions} adId={314} token={token} />
      <QuestionDialog open={detailDialog} closeDialog={toggleDetailDialog} questionId={selected} />
    </Box>
  );
}

export default Question;