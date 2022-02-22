import React, {
  Fragment, useContext, useEffect, useState
} from 'react';
import {
  Box, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useMediaQuery, useTheme
} from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
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
import MyPagination from '../../containers/MyPagination';

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

const useStyles = makeStyles(theme => ({
  campaignCard: {
    padding: '12px'
  },
  tooltipIcon: {
    color: '#8C3FFF',
    marginLeft: '5px',
  },
  image: {
    width: '100%',
    height: '276px',
    objectFit: 'cover',
    objectPosition: '50% 50%',
    [theme.breakpoints.down('sm')]: {
      width: '60px',
      height: '60px',
    }
  }
}));

const defaultCampaignInfo = {
  adId: null,
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
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const classes = useStyles();
  const { token } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
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
      params: { adId: campaignInfo.adId, token, page }
    }).then((res) => {
      const { data, countData } = res.data;
      setQuestions(data);
      setCount(countData);
    }).catch((err) => {
      alert(err.response.message);
    });
  }

  const changePage = (event, value) => {
    setPage(value);
  };

  function getDetail(value) {
    setSelected(value);
    toggleDetailDialog();
  }

  useEffect(() => {
    if (campaignInfo.adId) getQuestions();
  }, [campaignInfo]);

  useEffect(() => {
    if (state && state.adId) {
      setCampaignInfo(state);
    } else {
      history.push('Profile/CampaignInfo/Selected');
    }
  }, []);

  return (
    <Box py="50px" bgcolor="#f5f5f5" minHeight="calc(100vh - 445px);">
      <Box px={2} maxWidth={1200} m="0 auto" boxSizing="border-box">
        <Grid container spacing={2}>
          <Grid item xs={12} md="auto">
            <Box width={{ xs: '100%', md: '300px' }}>
              <Paper className={classes.campaignCard}>
                <Grid container spacing={2}>
                  <Grid item>
                    <StyledImage className={classes.image} src={campaignInfo.photo || noImage} />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Box mb={{ xs: '4px', md: '11px' }}>
                      <StyledText overflowHidden fontSize={isMD ? '22px' : '15px'} fontWeight="bold" lineHeight="1.1em">
                        {campaignInfo.campaignName}
                      </StyledText>
                    </Box>
                    <StyledText overflowHidden fontSize={isMD ? '15px' : '13px'}>{campaignInfo.shortDiscription}</StyledText>
                    <Box pt={{ xs: '6px', md: 2 }}>
                      {isMD ? (
                        <Box width="30%" p={1} border={`1px solid ${adTypes[campaignInfo.type].color}`}>
                          <StyledText textAlign="center" fontSize="13px" color={adTypes[campaignInfo.type].color} fontWeight="bold">{adTypes[campaignInfo.type].text}</StyledText>
                        </Box>
                      ) : (
                        <StyledText fontSize="13px" color={adTypes[campaignInfo.type].color} fontWeight="bold">{adTypes[campaignInfo.type].text}</StyledText>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md>
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
            {questions.length > 0 ? (
              <Fragment>
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
                        <TableRow hover key={item.QUE_ID} onClick={() => getDetail(item.QUE_ID)}>
                          <StyledTableCell align="center">
                            {item.rownum}
                          </StyledTableCell>
                          <StyledTableCell>
                            {item.QUE_TITLE}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Box color={item.QUE_STATE === '1' ? Colors.green : Colors.red}>{item.QUE_STATE === '1' ? '답변완료' : '대기중'}</Box>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.QUE_DT}
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box py={4}>
                  <Grid container justify="center">
                    <Grid item>
                      <MyPagination
                        itemCount={count}
                        page={page}
                        changePage={changePage}
                        perPage={10}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Fragment>
            ) : (
              <Box textAlign="center">문의 없습니다</Box>
            )}
          </Grid>
        </Grid>
      </Box>
      <QuestionCreateDialog open={showDialog} closeDialog={toggleDialog} getQuestions={getQuestions} adId={campaignInfo.adId} token={token} />
      <QuestionDialog open={detailDialog} closeDialog={toggleDetailDialog} questionId={selected} />
    </Box>
  );
}

export default Question;
