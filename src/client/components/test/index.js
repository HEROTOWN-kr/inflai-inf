import React from "react";
import { fbGetInstagramProfileData, getInstagramAccounts } from "../../lib/fb";

const Test = () => {
  const login = async () => {
    try {
      const igAccounts = await getInstagramAccounts();
      if (igAccounts.length === 0) {
        alert("페이스북 페이지에 연결된 인스타그램 계정이 없습니다");
        return;
      }

      if (igAccounts?.length === 1) {
        console.log("business account: ", igAccounts[0]);
        return;
      }

      if (igAccounts?.length > 1) {
        const promises = igAccounts.map((instagramId) => fbGetInstagramProfileData(instagramId));
        const instagramProfiles = await Promise.all(promises);
        console.log("multiple accounts: ", instagramProfiles);
      }
    } catch (e) {
      alert("login func error: ", e.message);
    }
  };

  return (
    <div>
      <button onClick={login}>test</button>
    </div>
  );
};

export default Test;
