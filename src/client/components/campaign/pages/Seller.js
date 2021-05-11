import React from 'react';
import {
  Box, Divider, makeStyles, TextField, InputAdornment, Grid
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import YoutubeIcon from '../../../img/icon_youtube_url.png';
import BlogIcon from '../../../img/icon_blog_url.png';
import InstaIcon from '../../../img/icon_instagram_url.png';
import StyledText from '../../../containers/StyledText';
import { Colors } from '../../../lib/Сonstants';
import ReactFormText from '../../../containers/ReactFormText';
import StyledImage from '../../../containers/StyledImage';

const useStyles = makeStyles({
  divider: {
    width: '80%',
    margin: '0 auto'
  },
  textFieldRoot: {
    borderRadius: '0 5px 5px 0'
  },
  textFieldInput: {
    padding: '10.5px 14px',
  },
  textFieldIcon: {
    borderRadius: '5px 0 0 5px',
    border: '1px solid rgb(196, 196, 196)',
    borderRight: 0,
    padding: '6px 11px',
    paddingBottom: '7px',
    backgroundColor: '#f3f3f3'
  }
});

const defaultValues = {
  name: '',
  phone: '',
  email: '',
};

const schema = Yup.object().shape({
  blogId: Yup.string().required('블로그 아이디를 입력해주세요'),
});


function BlogTextField(props) {
  const classes = useStyles();
  const { icon, ...rest } = props;
  return (
    <Box mb="24px">
      <Grid container>
        <Grid item>
          <Box classes={{ root: classes.textFieldIcon }}>
            <StyledImage src={icon} width="25px" />
          </Box>
        </Grid>
        <Grid item xs>
          <TextField
            {...rest}
            fullWidth
            variant="outlined"
            InputProps={{
              classes: {
                root: classes.textFieldRoot,
                input: classes.textFieldInput
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function Seller() {
  const classes = useStyles();
  const {
    register, handleSubmit, reset, errors, setValue, control
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues
  });

  return (
    <Box px={{ xs: 2, md: 6 }} py={{ xs: 4, md: 8 }} maxWidth="1920px" margin="0 auto">
      <Box mb="35px">
        <StyledText fontSize="25px">
          <span style={{ color: Colors.pink }}>셀러 캠페인</span>
        </StyledText>
      </Box>
      <Divider classes={{ root: classes.divider }} />
      <Box maxWidth="500px" m="45px auto">
        <StyledText mb="45px" fontSize="21px" fontWeight={600}>
          셀러 기본정보 입력
        </StyledText>
        <Box mb="24px">
          <StyledText mb="12px" fontSize="14px">
          성명
          </StyledText>
          <ReactFormText
            register={register}
            errors={errors}
            name="name"
            placeholder="성명을 입력해주세요"
          />
        </Box>
        <Box mb="24px">
          <StyledText mb="12px" fontSize="14px">
              전화번호
          </StyledText>
          <ReactFormText
            register={register}
            errors={errors}
            name="phone"
            placeholder="전화번호를 입력해주세요"
          />
        </Box>
        <StyledText mb="12px" fontSize="14px">
              이메일
        </StyledText>
        <ReactFormText
          register={register}
          errors={errors}
          name="email"
          placeholder="이메일을 입력해주세요"
        />
      </Box>
      <Divider classes={{ root: classes.divider }} />
      <Box maxWidth="500px" m="45px auto">
        <StyledText mb="16px" fontSize="21px" fontWeight={600}>
        활동 중인 SNS 링크 등록
        </StyledText>
        <StyledText mb="45px" fontSize="14px" color="#909090">
        본인의 SNS 채널 중 한 채널 이상 입력해 주세요.
        </StyledText>
        <BlogTextField
          icon={BlogIcon}
          register={register}
          errors={errors}
          name="blogUrl"
          placeholder="예) 본인의 블로그 Url"
        />
        <BlogTextField
          icon={InstaIcon}
          register={register}
          errors={errors}
          name="instaUrl"
          placeholder="예) 본인의 인스타 Url"
        />
        <BlogTextField
          icon={YoutubeIcon}
          register={register}
          errors={errors}
          name="youtubeUrl"
          placeholder="예) 본인의 유튜브 Url"
        />
      </Box>
      <Divider classes={{ root: classes.divider }} />
      <Box maxWidth="500px" m="45px auto">
        <StyledText mb="45px" fontSize="21px" fontWeight={600}>
          셀러 판매 이력
        </StyledText>
        <Box mb="24px">
          <StyledText mb="12px" fontSize="14px">
            공구 진행 시 최대 판매 수량:
          </StyledText>
          <ReactFormText
            register={register}
            errors={errors}
            name="salesNumber"
            placeholder="예) 최고 실적을 낸 제품의 판매 수량을 기록해 주세요"
          />
        </Box>
        <Box mb="24px">
          <StyledText mb="12px" fontSize="14px">
            자기소개:
          </StyledText>
          <ReactFormText
            register={register}
            errors={errors}
            multiline
            rows={4}
            name="biography"
            placeholder="예) 관심 카테고리, 관심 상품 또는 공동 구매 경험 등 위주로 편하게 작성해 주시면 됩니다"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Seller;
