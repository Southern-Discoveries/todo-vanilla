import { TypeUserCreateProps, TypeUserGetProps } from "../types/user";
import utilsConstants from "../utils/utils.constants";
import clientPG from "../utils/utils.pg";
import bcrypt from "bcrypt";

export default {
  getUser: async (id: string) => {
    const result = await clientPG.query<TypeUserGetProps>(
      `SELECT * FROM public.user WHERE username = $1`,
      [id]
    );

    if (!result.rows[0]) throw "not found this account";

    return result.rows[0];
  },

  createUser: async (params: TypeUserCreateProps) => {
    try {
      await clientPG.query(
        `INSERT INTO public.user(username, password) VALUES ($1, $2)`,
        [params.username, bcrypt.hashSync(params.password, 10)]
      );
    } catch (error: any) {
      const catchByCode = utilsConstants.ERROR_PG?.[error?.code as never];

      if (catchByCode) throw catchByCode;

      throw error;
    }
  },

  login: async (params: TypeUserCreateProps) => {
    const result = await clientPG.query<TypeUserGetProps>(
      `SELECT * FROM public.user WHERE username = $1`,
      [params.username]
    );

    if (!result.rows.length) {
      throw "the account is not already existed";
    }

    if (!bcrypt.compareSync(params.password, result.rows[0].password)) {
      throw "the password incorrect, please check again";
    }

    return result.rows[0];
  },
};
