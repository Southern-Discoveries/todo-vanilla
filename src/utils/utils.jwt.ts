import jwt, { SignOptions } from "jsonwebtoken";
import utilsConstants from "./utils.constants";

const verify = (token: string) => {
  try {
    // ['Bearer', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...']
    const tokenArray = token.split(" ");

    return jwt.verify(tokenArray[1], utilsConstants.SERECT_KEY_JWT);
  } catch (error: any) {
    if (error.name === "JsonWebTokenError") {
      error = error.message;
    }

    throw error;
  }
};

const generate = (
  values: Parameters<typeof jwt.sign>[0],
  type: "refresh" | "access"
) => {
  return jwt.sign(values, utilsConstants.SERECT_KEY_JWT, {
    expiresIn: (function () {
      if (type === "refresh") {
        return "7d";
      }

      if (type === "access") {
        return "10s";
      }
    })(),
  });
};

export default {
  verify,
  generate,
};
