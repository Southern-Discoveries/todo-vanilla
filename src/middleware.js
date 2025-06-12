import $ from "jquery";
import utilsConstants from "../utils/utils.constants";

let cache_account = null;

export const fetchAccount = async () => {
  const username = localStorage.getItem(utilsConstants.STORAGE_ACCOUNT);

  if (!username?.length) return null;

  if (!cache_account) {
    const request_account = await fetch(
      `${utilsConstants.GET_API}/user/profile/${username}`
    );

    cache_account = await request_account.json();
  }

  return cache_account;
};

$.ready(
  (async function () {
    const getAccount = localStorage.getItem(utilsConstants.STORAGE_ACCOUNT);

    const isLoggedPage =
      window.location.href.includes("login") ||
      window.location.href.includes("register");

    // handler you're logged or not?
    {
      if (!getAccount?.length && !isLoggedPage) {
        window.location.pathname = `${utilsConstants.BASE_PATH}/login`;
      }

      if (getAccount?.length && isLoggedPage) {
        window.location.pathname = `${utilsConstants.BASE_PATH}/`;
      }
    }

    if (getAccount?.length) {
      // context = await fetchAccount(getAccount);
    }

    // handler expires login
    {
      // ... E.g
    }
  })()
);
