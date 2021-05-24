import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Grid, Table, TableBody, TableHead, TableRow
} from '@material-ui/core';
import StyledTableCell from '../../../../containers/StyledTableCell';
import StyledTableSortLabel from '../../../../containers/StyledTableSortLabel';
import StyledTableRow from '../../../../containers/StyledTableRow';
import AuthContext from '../../../../context/AuthContext';
import MyPagination from '../../../../containers/MyPagination';

const tableHeader = [
  {
    text: '#',
    align: 'center',
    width: '40px'
  },
  {
    text: '체널이름',
    align: 'center',
  },
  {
    text: '구독자수',
    align: 'center',
    width: '100px',
    colName: 'YOU_SUBS'
  },
  {
    text: '조회수',
    align: 'center',
    width: '100px',
    colName: 'YOU_VIEWS'
  }
];

function YoutubeRank(props) {
  const { changeTab } = props;
  const [channels, setChannels] = useState([]);
  const [count, setCount] = useState(0);
  const [order, setOrder] = useState({ orderBy: 'YOU_SUBS', direction: 'desc' });
  const [page, setPage] = useState(1);
  const limit = 10;

  const { token } = useContext(AuthContext);

  function getParticipants() {
    axios.get('/api/TB_YOUTUBE/rank', {
      params: {
        ...order, limit, page, token
      }
    }).then((res) => {
      console.log(res.data.data);
      setChannels(res.data.data);
      setCount(res.data.count);
    });
  }

  useEffect(() => {
    if (token) getParticipants();
  }, [order, page, token]);

  function sortTable(id) {
    const isDesc = order.orderBy === id && order.direction === 'desc';
    setPage(1);
    setOrder({
      orderBy: id,
      direction: isDesc ? 'asc' : 'desc'
    });
  }

  const changePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    changeTab(3);
  }, []);

  return (
    <Box maxWidth="725px" py={4} px={6}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeader.map(item => (
              <StyledTableCell key={item.text} align={item.align} width={item.width || null}>
                {item.colName ? (
                  <StyledTableSortLabel
                    key={item.text}
                    color="#66f8ff"
                    active={order.orderBy === item.colName}
                    direction={order.orderBy === item.colName ? order.direction : 'desc'}
                    onClick={() => sortTable(item.colName)}
                  >
                    {item.text}
                  </StyledTableSortLabel>
                ) : item.text}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {channels.map(item => (
            <StyledTableRow key={item.YOU_ID}>
              <StyledTableCell align="center" className={item.selected ? 'current' : ''}>
                {item.rownum}
              </StyledTableCell>
              <StyledTableCell align="center" className={item.selected ? 'current' : ''}>
                {item.YOU_NAME}
              </StyledTableCell>
              <StyledTableCell align="center" className={item.selected ? 'current' : ''}>
                {item.YOU_SUBS}
              </StyledTableCell>
              <StyledTableCell align="center" className={item.selected ? 'current' : ''}>
                {item.YOU_VIEWS}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Box py={4}>
        <Grid container justify="center">
          <Grid item>
            <MyPagination
              itemCount={count}
              page={page}
              changePage={changePage}
              perPage={limit}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default YoutubeRank;
