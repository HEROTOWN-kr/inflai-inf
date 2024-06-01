const scopes = [
  "pages_show_list",
  "business_management",
  "instagram_basic",
  "instagram_manage_insights",
].join(" , ");

const config_id = "766776172298246";
const fbLoginConfig = {
  scope: scopes,
};

const isLocal = window.location.host === "localhost:3002";
if (isLocal) fbLoginConfig.config_id = config_id;

export const fbLogin = () => {
  return new Promise((resolve, reject) => {
    const { FB } = window;

    FB.login((response) => {
      if (!response) {
        reject(Error("fb login error"));
      }
      resolve(response);
    }, fbLoginConfig);
  });
};

export const fbGetLoginStatus = async () => {
  return new Promise((resolve, reject) => {
    const { FB } = window;

    FB.getLoginStatus((response) => {
      if (!response) {
        reject(Error("fb get login status error"));
      }
      resolve(response);
    });
  });
};

export const fbGetIGAccounts = () => {
  return new Promise(async (resolve, reject) => {
    const { FB } = window;

    FB.api(
      "/me/accounts",
      "GET",
      {
        fields: "instagram_business_account",
      },
      (response) => {
        if (!response) {
          reject(Error("fb get IG accounts error"));
        }

        const pages = response.data;

        if (!pages || !Array.isArray(pages) || pages.length === 0) {
          resolve([]);
        }

        const businesAccs = pages
          .filter((item) => item.instagram_business_account)
          .map((page) => page.instagram_business_account.id);

        resolve(businesAccs);
      }
    );
  });
};

export const fbGetInstagramProfileData = (instagramId) => {
  return new Promise((resolve, reject) => {
    const { FB } = window;

    FB.api(
      `/${instagramId}`,
      "GET",
      {
        fields: "username,profile_picture_url",
      },
      (response) => {
        if (!response) {
          reject(Error("getInstagramProfileData error"));
        }
        resolve(response);
      }
    );
  });
};

export const getInstagramAccounts = async () => {
  const response = await fbGetLoginStatus();

  if (response?.status !== "connected") {
    await fbLogin();
  }

  const igAccounts = await fbGetIGAccounts();
  if (!igAccounts || !Array.isArray(igAccounts) || igAccounts.length === 0) {
    return [];
  }

  return igAccounts;
};

export const fbGetCredentials = async () => {
  const fbStatusResponse = await fbGetLoginStatus();

  if (fbStatusResponse?.status === "connected") {
    const {
      authResponse: { accessToken, userID },
    } = fbStatusResponse;

    return { accessToken, userID };
  }

  const fbLoginResponse = await fbLogin();
  const {
    authResponse: { accessToken, userID },
  } = fbLoginResponse;

  return { accessToken, userID };
};
