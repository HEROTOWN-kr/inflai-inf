import React, { useEffect, useRef, useState } from 'react';

function AddressSearch(props) {
  const { daum } = window;
  const wrapElement = useRef(null);

  function execDaumPostCodeMobile() {
    const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    const addressJson = {
      function_name: 'bridge_setaddr',
    };
    new daum.Postcode({
      oncomplete(data) {
        // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
        const {
          roadAddress, bname, buildingName, zonecode, jibunAddress, autoRoadAddress, autoJibunAddress, apartment
        } = data;
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        const roadAddr = roadAddress; // 도로명 주소 변수
        let extraRoadAddr = ''; // 참고 항목 변수

        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (bname !== '' && /[동|로|가]$/g.test(bname)) {
          extraRoadAddr += bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (buildingName !== '' && apartment === 'Y') {
          extraRoadAddr += (extraRoadAddr !== '' ? `, ${buildingName}` : buildingName);
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraRoadAddr !== '') {
          extraRoadAddr = ` (${extraRoadAddr})`;
        }


        // setValue('jibunAddress', jibunAddress);
        addressJson.postcode = zonecode;
        addressJson.roadAddress = roadAddress;


        // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
        if (roadAddr !== '') {
          addressJson.extraAddress = extraRoadAddr;
        } else {
          addressJson.extraAddress = '';
        }

        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify(addressJson));
        } else {
          alert("it's not mobile webview");
        }

        // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
        document.body.scrollTop = currentScroll;
      },
      // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
      onresize(size) {

      },
      width: '100%',
      height: '100%'
    }).embed(wrapElement.current);

    // iframe을 넣은 element를 보이게 한다.
    // setSearchComponent(true);
  }

  useEffect(() => {
    execDaumPostCodeMobile();
  }, []);

  return (
    <div style={{ height: '461px' }} id="wrap" ref={wrapElement} />
  );
}

export default AddressSearch;
