import $ from "jquery";
import utilsConstants from "../utils/utils.constants";
import { parseJWT } from "../utils";

let getAccessToken = localStorage.getItem(utilsConstants.ACCESS_TOKEN);
let getRefreshToken = localStorage.getItem(utilsConstants.REFRESH_TOKEN);

let cache_account = null;

export const fetchAccount = async () => {
  if (!getAccessToken?.length) return null;

  const parseAccessToken = parseJWT(getAccessToken);
  const parseRefreshToken = parseJWT(getRefreshToken);

  // expires refresh token
  if (parseRefreshToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(utilsConstants.ACCESS_TOKEN);
    localStorage.removeItem(utilsConstants.REFRESH_TOKEN);

    window.location.pathname = `${utilsConstants.BASE_PATH}/login`;
  }

  // expires access token
  if (parseAccessToken.exp * 1000 < Date.now()) {
    const request = await fetch(
      `${utilsConstants.GET_API}/user/refresh-token`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getRefreshToken}`,
        },
      }
    );

    const json = await request.json();

    cache_account = undefined;

    getRefreshToken = json.REFRESH_TOKEN;
    getAccessToken = json.ACCESS_TOKEN;

    localStorage.setItem(utilsConstants.ACCESS_TOKEN, getAccessToken);
    localStorage.setItem(utilsConstants.REFRESH_TOKEN, getRefreshToken);
  }

  if (!cache_account) {
    const request_account = await fetch(
      `${utilsConstants.GET_API}/user/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
      }
    );

    cache_account = await request_account.json();
  }

  return cache_account;
};

$.ready(
  (async function () {
    const isLoggedPage =
      window.location.href.includes("login") ||
      window.location.href.includes("register");

    // you're not logged but tried to go home
    if (!getAccessToken && !isLoggedPage) {
      window.location.pathname = `${utilsConstants.BASE_PATH}/login`;
    }

    // you're logged but tried to go login page
    if (getAccessToken && isLoggedPage) {
      window.location.pathname = `${utilsConstants.BASE_PATH}/`;
    }
  })()
);
