import $ from "jquery";
import utilsConstants from "../utils/utils.constants";

$.ready(
  (function () {
    const getAccount = localStorage.getItem(utilsConstants.STORAGE_ACCOUNT);
    const isLoggedPage = location.pathname === "/login";

    // handler you're logged or not?
    {
      if (!getAccount?.length && !isLoggedPage) {
        window.location = `${utilsConstants.BASE_PATH}/login`;
      }

      if (getAccount?.length && isLoggedPage) {
        window.location = `${utilsConstants.BASE_PATH}/`;
      }
    }

    // handler expires login
    {
      // ... E.g
    }
  })()
);
