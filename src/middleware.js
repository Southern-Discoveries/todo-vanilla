import $ from "jquery";
import utilsConstants from "../utils/utils.constants";

$.ready(
  (function () {
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

    // handler expires login
    {
      // ... E.g
    }
  })()
);
