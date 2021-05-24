import React, { useEffect } from 'react';

function InstagramRank(props) {
  const { changeTab } = props;
  useEffect(() => {
    changeTab(1);
  }, []);

  return (
    <div>개발 중</div>
  );
}

export default InstagramRank;
