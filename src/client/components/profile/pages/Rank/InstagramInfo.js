import React, { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import axios from "axios";
import { PieChart } from "react-minimal-pie-chart";
import {
  ChatBubble,
  Room,
  Favorite,
  Image,
  Details,
  ChangeHistory,
  ImportExportOutlined,
  CalendarToday,
} from "@material-ui/icons";
import WhiteBlock from "../../../../containers/WhiteBlock";
import StyledImage from "../../../../containers/StyledImage";
import Common from "../../../../lib/common";
import defaultAccountImage from "../../../../img/default_account_image.png";
import StyledText from "../../../../containers/StyledText";
import StyledSvg from "../../../../containers/StyledSvg";
import GoogleVisionGraph from "../Graphs/GoogleVisionGraph";
import LikeCommentBarGraph from "../Graphs/LikeCommentBarGraph";
import { Colors } from "../../../../lib/Сonstants";
import AgeGraph from "../Graphs/AgeGraph";
import GenderGraph from "../Graphs/GenderGraph";
import MapGraph from "../Graphs/MapGraph";
import AuthContext from "../../../../context/AuthContext";
import MapGraph2 from "../Graphs/MapGraph2";
import AnalysisComponent from "../../../Analysis/AnalysisComponent";

function InstagramInfo() {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up("md"));
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));

  const [instaData, setInstaData] = useState({});

  const urlParams = window.location.search;
  const searchParams = new URLSearchParams(urlParams);
  const paramsToken = searchParams.get("token");

  const token = useContext(AuthContext).token || paramsToken;

  async function getInstaInfo() {
    try {
      const InstaData = await axios.get("/api/TB_INSTA/rankingInfo", {
        params: {
          token,
        },
      });

      if (InstaData.status === 201) return null;
      const { data } = InstaData.data;
      setInstaData(data);
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  useEffect(() => {
    if (token) getInstaInfo();
  }, [token]);

  return (
    <Box>
      {instaData.INF_ID ? (
        <AnalysisComponent INS_ID={instaData.INF_ID} />
      ) : (
        <Box p={2} textAlign="center">
          <Box>인스타 계정을 연결해주세요</Box>
          <Box>회원정보수정 - 인스타그램 연결하기</Box>
        </Box>
      )}
    </Box>
  );
}

export default InstagramInfo;
