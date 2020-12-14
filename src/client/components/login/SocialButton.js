import React from 'react';
import { Grid, Box } from '@material-ui/core';

function SocialButton(props) {
  const {
    bgColor, textColor, link, clicked, icon, text
  } = props;
  const buttonStyle = {
    mainContainer: {
      backgroundColor: bgColor,
      borderRadius: '5px'
    },
    buttonIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '100%',
      margin: '0 auto',
      overflow: 'hidden',
      backgroundImage: `url(${icon})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    },
    buttonText: {
      color: textColor,
      fontWeight: 'bold'
    }
  };

  return (
    <div style={buttonStyle.mainContainer} className="social-main-container" onClick={clicked}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={3}>
          <Box className="button-icon">
            <div style={buttonStyle.buttonIcon} />
          </Box>
        </Grid>
        <Grid item xs={9} style={buttonStyle.buttonText} className="button-text">
          {text}
        </Grid>
      </Grid>
    </div>
  );
}

export default SocialButton;
