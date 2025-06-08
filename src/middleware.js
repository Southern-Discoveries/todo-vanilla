import $ from "jquery";
import utilsConstants from "../utils/utils.constants";

$.ready(
  (function () {
    // authentication
    const getAccount = localStorage.getItem(utilsConstants.STORAGE_ACCOUNT);

    if (!getAccount?.length) {
      window.location = "/login";
    }
  })()
);
