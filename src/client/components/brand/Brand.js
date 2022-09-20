import React, { useEffect, useState } from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import { Colors } from '../../lib/Сonstants';

const defaultImage = 'https://inflai-aws-bucket.s3.ap-northeast-2.amazonaws.com/campaign/483/j1pj4vbykz81q4te_820_648.jpg';
const bgStyle = 'linear-gradient(rgba(17, 17, 17, 0.85), rgba(17, 17, 17, 0.85))';

const snsTypes = {
  1: { text: 'Instagram', color: Colors.pink },
  2: { text: 'Youtube', color: Colors.red },
  3: { text: 'Blog', color: Colors.green },
};

const useStyles = makeStyles(theme => ({
  banner: {
    width: '100%',
    height: '32vw',
    maxHeight: '450px',
    marginBottom: '15px',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundAttachment: 'fixed',
    backgroundImage: `${bgStyle}, url(${defaultImage})`,
    display: 'flex',
    alignItems: 'center'
  },
  mainImage: {
    objectFit: 'cover',
    objectPosition: '50% 50%',
  },
  imageHolder: {
    position: 'absolute',
    left: '55%',
    top: '150px',
    maxWidth: '570px',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  textHolder: {
    width: '100%',
    maxWidth: '1250px',
    margin: '0 auto',
    color: '#fff'
  },
  name: {
    fontWeight: 500,
    fontSize: '45px',
    lineHeight: '72px',
    letterSpacing: '-.4px',
    marginBottom: '16px',
  },
  title: {
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '30px',
    letterSpacing: '-.4px',
    wordBreak: 'keep-all',
  },
  card: {
    border: '1px solid rgb(234, 234, 234)',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '10px',
  },
  cardTitle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginTop: '6px',
    fontSize: '17px',
    fontWeight: '600',
    color: '#222'
  },
  cardDisc: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginTop: '18px',
    fontSize: '12px'
  },
}));

function DayCounter(props) {
  const { date } = props;

  const daysDiff = moment().diff(date, 'days');
  const isPassed = daysDiff > 0;

  if (isPassed) {
    return (
      <Box>종료됨</Box>
    );
  }

  return 'D-3';
}

function Brand(props) {
  const [brandInfo, setBrandInfo] = useState({
    BRD_NAME: '', BRD_TITLE: '', BRD_IMG: defaultImage, BRD_BG_IMG: defaultImage
  });
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  function getCampaigns() {
    setLoading(true);
    const params = { BRD_ID: 1 };

    axios.get('/api/TB_BRAND/getCampaigns', { params }).then((res) => {
      const { data } = res.data;
      const { BRD_CAMPAIGNS, ...rest } = data;
      setCampaigns(BRD_CAMPAIGNS);
      setBrandInfo(rest);
      setLoading(false);
    }).catch(err => alert(err.response.data.message));
  }

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <Box>
      <Box className={classes.banner} style={{ backgroundImage: `${bgStyle}, url(${brandInfo.BRD_BG_IMG})` }}>
        <Box className={classes.textHolder}>
          <Box className={classes.name}>{brandInfo.BRD_NAME}</Box>
          <Box className={classes.title}>{brandInfo.BRD_TITLE}</Box>
        </Box>
      </Box>
      <Box className={classes.imageHolder}>
        <img className={classes.mainImage} src={brandInfo.BRD_IMG} alt="noImage" />
      </Box>
      <Box mt="130px" mb="60px" px={8}>
        <Box fontSize="26px" color="#222" mb="20px">{`${brandInfo.BRD_NAME}의 캠페인`}</Box>
        <Grid container spacing={2}>
          {campaigns.map(item => (
            <Grid item xs={2} key={item.AD_ID}>
              <Box className={classes.card}>
                <img src={item.AD_MAIN_IMG} alt="noImage" />
                <Box p={3}>
                  <Box display="flex">
                    <Box fontWeight={600} marginRight="4px" color={snsTypes[item.AD_TYPE].color}>{snsTypes[item.AD_TYPE].text}</Box>
                    <Box>{getRemainDays(item.AD_SRCH_END)}</Box>
                  </Box>
                  <Box className={classes.cardTitle}>{item.AD_NAME}</Box>
                  <Box className={classes.cardDisc}>{item.AD_SHRT_DISC}</Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Brand;
