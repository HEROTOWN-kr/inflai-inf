import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { Create } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { AdvertiseTypes, Colors } from '../../lib/Сonstants';
import StyledText from '../../containers/StyledText';
import StyledButton from '../../containers/StyledButton';
import StyledImage from '../../containers/StyledImage';
import defaultAccountImage from '../../img/default_account_image.png';
import StyledTableCell from '../../containers/StyledTableCell';
import AuthContext from '../../context/AuthContext';

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

const campaignInfo = {
  photo: [],
  campaignName: '캠페인 이름',
  type: '1',
  category: '1',
  subcategory: '1'
};
function Question(props) {
  const { test } = props;
  const [questions, setQuestions] = useState([]);

  const classes = useStyles();
  const { token } = useContext(AuthContext);

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

  useEffect(() => {
    if (token) getQuestions();
  }, [token]);


  return (
    <Box py="50px" bgcolor="#f5f5f5">
      <Box px={2} maxWidth={1200} m="0 auto" boxSizing="border-box">
        <Box fontSize={22} fontWeight={600} mb="25px">1대1문의하기(Q&A)</Box>
        <Paper className={classes.campaignCard}>
          <Grid container>
            <Grid item xs="auto">
              <StyledImage
                width="80px"
                height="80px"
                src={campaignInfo.photo.length > 0 ? campaignInfo.photo[0].PHO_FILE_URL : defaultAccountImage}
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
          </Grid>
        </Paper>
        <Box mt="20px" mb={1}>
          <Grid container justify="flex-end">
            <Grid item>
              <StyledButton
                height={40}
                padding="0 20px"
                background="#0fb359"
                hoverBackground="#107C41"
                startIcon={<Create />}
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
                  <TableRow>
                    <StyledTableCell align="center">
                      {item.row}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.QUE_TITLE}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.QUE_STATUS}
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
      </Box>
    </Box>
  );
}

export default Question;
