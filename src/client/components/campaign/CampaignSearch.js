import React, { useEffect, useState } from 'react';
import {
  Box, InputAdornment, IconButton, TextField, makeStyles
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import axios from 'axios';
import {
  Route, Switch, useRouteMatch, useHistory, useParams
} from 'react-router-dom';
import StyledTextField from '../../containers/StyledTextField';
import CampaignAll from './CampaignAll';
import Join from '../loginNew/Join';
import Activate from '../loginNew/Activate';

const useStyles = makeStyles({
  endAdornment: {
    padding: '0'
  },
  input: {
    padding: '15px 14px',
    paddingRight: '0'
  },
  positionEnd: {
    margin: '0'
  }
});

function EmptySearch() {
  return <Box textAlign="center">검색어를 입력해주세요</Box>;
}

function SearchResult(props) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const { fieldWord, setSearchWord } = props;
  const params = useParams();
  const { searchWord } = params;

  function getCampaigns() {
    if (searchWord) {
      setLoading(true);
      axios.get('/api/TB_AD/search', { params: { searchWord } }).then((res) => {
        const { data } = res.data;
        setCampaigns(data);
        setLoading(false);
      }).catch(err => alert(err.response.data.message));
    }
  }

  useEffect(() => {
    getCampaigns();
    if (!fieldWord) setSearchWord(searchWord);
  }, [searchWord]);

  return (
    <CampaignAll campaigns={campaigns} loading={loading} />
  );
}

function CampaignSearch() {
  const [searchWord, setSearchWord] = useState('');
  const classes = useStyles();
  const match = useRouteMatch();
  const history = useHistory();

  function handleInputChange(event) {
    setSearchWord(event.target.value);
  }

  function searchCampaigns() {
    history.push(`/Search/${searchWord}`);
  }

  const handleUserKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      searchCampaigns();
    }
  };

  return (
    <Box my={4}>
      <Box width="300px" m="0 auto">
        <TextField
          variant="outlined"
          fullWidth
          placeholder="검색어를 입력해주세요"
          value={searchWord}
          onChange={handleInputChange}
          onKeyPress={handleUserKeyPress}
          InputProps={{
            endAdornment: <InputAdornment position="end" classes={{ positionEnd: classes.positionEnd }}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={searchCampaigns}
              >
                <Search />
              </IconButton>
            </InputAdornment>,
            classes: {
              adornedEnd: classes.endAdornment,
              input: classes.input
            }
          }}
        />
      </Box>
      <Box maxWidth="1920px" m="0 auto" mt={4} px={{ xs: 2, md: 6 }}>
        <Route
          exact
          path={`${match.url}/`}
          render={props => <EmptySearch />}
        />
        <Route
          path={`${match.url}/:searchWord`}
          render={props => <SearchResult fieldWord={searchWord} setSearchWord={setSearchWord} />}
        />
      </Box>
    </Box>
  );
}

export default CampaignSearch;
