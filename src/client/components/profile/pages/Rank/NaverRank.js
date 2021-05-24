import React, { useEffect } from 'react';

function NaverRank(props) {
  const { changeTab } = props;

  useEffect(() => {
    changeTab(2);
  }, []);

  return (
    <div>개발 중</div>
  );
}

export default NaverRank;
