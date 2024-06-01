import React, { useContext, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import axios from "axios";
import GoogleLogin from "react-google-login";
import StyledText from "../../../../containers/StyledText";
import StyledImage from "../../../../containers/StyledImage";
import instagramIcon from "../../../../img/instagram.png";
import InstagramDialog from "../../../login/InstagramDialog";
import InstagramSelectDialog from "../../../login/InstagramSelectDialog";
import YoutubeDialog from "../../../login/YoutubeDialog";
import AuthContext from "../../../../context/AuthContext";
import LabelComponent from "./LabelComponent";
import {
  fbGetCredentials,
  fbGetInstagramProfileData,
  fbGetLoginStatus,
  fbLogin,
  getInstagramAccounts,
} from "../../../../lib/fb";

function Sns(props) {
  const { userInfo, getUserInfo, isMD } = props;
  const { TB_INSTum } = userInfo;
  const { INS_ID, INS_USERNAME, INS_STATUS, INS_DT } = TB_INSTum || {};
  const { token } = useContext(AuthContext);
  const [instaDialogOpen, setInstaDialogOpen] = useState(false);
  const [youtubeDialogOpen, setYoutubeDialogOpen] = useState(false);
  const [instaSelectDialogOpen, setInstaSelectDialogOpen] = useState(false);
  const [instaAccounts, setInstaAccounts] = useState([]);

  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isInstagram = ua.indexOf("Instagram") > -1;

  function selectAccountDialog() {
    setInstaSelectDialogOpen(!instaSelectDialogOpen);
  }

  const saveIgAccount = async (facebookToken, facebookUserId, instaId) => {
    await axios.post("/api/TB_INSTA/add", { facebookToken, facebookUserId, token, instaId });
    getUserInfo();
  };

  const findInstagramAccounts = async (accessToken, userID) => {
    try {
      const igAccounts = await getInstagramAccounts();
      if (igAccounts.length === 0) {
        alert("페이스북 페이지에 연결된 인스타그램 계정이 없습니다");
        return;
      }

      if (igAccounts?.length === 1) {
        await saveIgAccount(accessToken, userID, igAccounts[0]);
        return;
      }

      if (igAccounts?.length > 1) {
        const promises = igAccounts.map((instagramId) => fbGetInstagramProfileData(instagramId));
        const instagramProfiles = await Promise.all(promises);
        setInstaAccounts(instagramProfiles);
        selectAccountDialog();
      }
    } catch (e) {
      alert("login func error: ", e.message);
    }
  };

  const instagramButtonClick = async () => {
    try {
      if (INS_ID) {
        await axios.post("/api/TB_INSTA/delete", { id: INS_ID });
        getUserInfo();
        return;
      }

      setInstaDialogOpen(!instaDialogOpen);
    } catch (e) {
      console.log(e.message);
    }
  };

  const facebookLogin = async () => {
    try {
      const data = await fbGetCredentials();
      const { accessToken, userID } = data;

      await findInstagramAccounts(accessToken, userID);
    } catch (e) {
      console.log(e.message);
    }
  };

  const fbReconnect = async () => {
    try {
      const fbLoginResponse = await fbLogin();
      const {
        authResponse: { accessToken },
      } = fbLoginResponse;

      const response = await axios.post("/api/TB_INSTA/reconnect", {
        facebookToken: accessToken,
        token,
      });

      if (response.status === 201) {
        alert(response.data.message);
        return 0;
      }
      getUserInfo();
    } catch (e) {
      console.log(e.message);
    }
  };

  const addInstagram = async (selectedId) => {
    try {
      const response = await fbGetLoginStatus();
      if (!response || response?.status !== "connected") {
        alert("The user isn't logged in to Facebook");
        return 0;
      }

      const { accessToken, userID } = response.authResponse;
      await saveIgAccount(accessToken, userID, selectedId);
    } catch (e) {
      console.log(e.message);
    }
  };

  const GoogleButtonRef = React.useRef(null);

  function toggleYoutubeDialog() {
    setYoutubeDialogOpen(!youtubeDialogOpen);
  }

  const responseGoogle = async (response) => {
    try {
      if (response.error) {
        return alert("google auth error");
      }

      await axios.post("/api/TB_YOUTUBE/add", {
        code: response.code,
        host: window.location.host,
        token,
      });

      getUserInfo();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <LabelComponent fontSize="15px" labelName="인스타" />
          </Grid>
          <Grid item xs={12} md>
            <Grid container spacing={1}>
              <Grid item xs md="auto">
                <Box
                  py={2}
                  px={2}
                  width={{ xs: "inherit", md: "250px" }}
                  border="1px solid #e9ecef"
                  css={{ cursor: "pointer" }}
                  onClick={() => instagramButtonClick()}
                >
                  <Grid container justify="center" spacing={1}>
                    <Grid item>
                      <StyledImage width="18px" height="18px" src={instagramIcon} />
                    </Grid>
                    <Grid item>
                      <StyledText>
                        {INS_ID ? "인스타그램 연결 해제" : "인스타그램 연결하기"}
                      </StyledText>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {INS_ID ? null : (
                <Grid item>
                  <Box
                    py={2}
                    px={2}
                    height="52px"
                    border="1px solid #e9ecef"
                    boxSizing="border-box"
                    css={{ cursor: "pointer" }}
                    onClick={() => window.open("http://pf.kakao.com/_AYxeUxb/62492911", "_blank")}
                  >
                    <StyledText>연결방법 (필독)</StyledText>
                  </Box>
                </Grid>
              )}
              {INS_STATUS === 0 ? (
                <React.Fragment>
                  <Grid item>
                    <Box
                      py={2}
                      px={2}
                      height="52px"
                      border="1px solid #e9ecef"
                      boxSizing="border-box"
                      css={{ cursor: "pointer" }}
                      onClick={() => fbReconnect(INS_ID)}
                    >
                      <StyledText>재연결</StyledText>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box fontSize="14px" color="#da910c">
                      페이스북 비번을 바꾸거나 인스타 연동 후 60일 지나거나 인스타 비즈니스 계정
                      취소할때 인스타 계정 재연결 해야 됩니다
                    </Box>
                  </Grid>
                </React.Fragment>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {INS_ID ? (
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={1}>
            {isMD ? (
              <Grid item>
                <LabelComponent fontSize="15px" labelName="" />
              </Grid>
            ) : null}
            <Grid item xs={12} md>
              <Box pb={2}>
                <StyledText fontSize="14px">
                  {"연결한 계정: "}
                  <b>{INS_USERNAME}</b>
                </StyledText>
              </Box>
              <StyledText fontSize="13px">{`${INS_DT}에 연결되었습니다`}</StyledText>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      {isInstagram ? (
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={1}>
            {isMD ? (
              <Grid item>
                <LabelComponent fontSize="15px" labelName="" />
              </Grid>
            ) : null}
            <Grid item xs={12} md>
              <Box>
                <StyledText fontSize="14px" color="red" lineHeight="1.3em">
                  사파리 혹은 크롬으로 접속하셔야 연동이 문제없이 됩니다 ㅠㅠ!
                </StyledText>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      <InstagramDialog
        open={instaDialogOpen}
        closeDialog={() => setInstaDialogOpen(false)}
        facebookLogin={facebookLogin}
        userPage
      />
      <InstagramSelectDialog
        open={instaSelectDialogOpen}
        closeDialog={selectAccountDialog}
        instaAccounts={instaAccounts}
        connectAccount={addInstagram}
      />
      <YoutubeDialog
        open={youtubeDialogOpen}
        closeDialog={toggleYoutubeDialog}
        googleLogin={() => GoogleButtonRef.current.click()}
      />
      <GoogleLogin
        clientId="997274422725-gb40o5tv579csr09ch7q8an63tfmjgfo.apps.googleusercontent.com" // CLIENTID                buttonText="LOGIN WITH GOOGLE"
        scope="profile email https://www.googleapis.com/auth/youtube.readonly"
        responseType="code"
        accessType="offline"
        prompt="consent"
        render={(renderProps) => (
          <button
            ref={GoogleButtonRef}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ display: "none" }}
          >
            This is my custom Google button
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </Grid>
  );
}

export default Sns;
