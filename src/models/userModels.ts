import {
  TypeUserCreateProps,
  TypeUserEditProps,
  TypeUserGetProps,
} from "../types/user";
import { getFieldsByTemplate } from "../utils";
import utilsConstants from "../utils/utils.constants";
import clientPG from "../utils/utils.pg";
import bcrypt from "bcrypt";
import utilsJwt from "../utils/utils.jwt";

export default {
  getUserById: async (id: string) => {
    const result = await clientPG.query<TypeUserGetProps>(
      `SELECT * FROM public.user WHERE username = $1`,
      [id]
    );

    if (!result.rows[0]) throw "not found this account";

    return {
      username: result.rows[0].username,
      subname: result.rows[0].subname || result.rows[0].username,
      avatar: result.rows[0].avatar,
      createdAt: result.rows[0].createdAt,
    };
  },

  createUser: async (params: TypeUserCreateProps) => {
    try {
      await clientPG.query(
        `INSERT INTO public.user(username, subname, password, "createdAt") VALUES ($1, $2, $3, $4)`,
        [
          params.username,
          params.username,
          bcrypt.hashSync(params.password, 10),
          Math.round(Date.now() / 1000),
        ]
      );
    } catch (error: any) {
      const catchByCode = utilsConstants.ERROR_PG?.[error?.code as never];

      if (catchByCode) throw catchByCode;

      throw error;
    }
  },

  login: async (params: TypeUserCreateProps) => {
    const result = await clientPG.query<TypeUserGetProps & TypeUserCreateProps>(
      `SELECT * FROM public.user WHERE username = $1`,
      [params.username]
    );

    if (!result.rows.length) {
      throw "the account is not already existed";
    }

    if (!bcrypt.compareSync(params.password, result.rows[0].password)) {
      throw "the password incorrect, please check again";
    }

    const values = {
      username: result.rows[0].username,
      subname: result.rows[0].subname || result.rows[0].username,
      avatar: result.rows[0].avatar,
      createdAt: result.rows[0].createdAt,
    };

    return {
      REFRESH_TOKEN: utilsJwt.generate(values, "refresh"),
      ACCESS_TOKEN: utilsJwt.generate(values, "access"),
    };
  },

  editUser: async (params: TypeUserEditProps) => {
    const fields = getFieldsByTemplate(params, [
      "subname",
      "avatar",
      "password",
    ]);

    // don't change anything
    if (!fields.length) return;

    const result = await clientPG.query(
      `UPDATE public.user SET ${fields} WHERE username=$1`,
      [params.username]
    );

    if (!result.rowCount) throw "not found this account";
  },
};
