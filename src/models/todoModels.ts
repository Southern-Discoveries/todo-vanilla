import { TypeTodoCreate, TypeTodoDelete } from "../types/todo";
import { TypeUserJWTProps } from "../types/user";
import { getFieldsByTemplate } from "../utils";
import utilsJwt from "../utils/utils.jwt";
import clientPG from "../utils/utils.pg";

export default {
  getTodo: async (token: string) => {
    const verify = utilsJwt.verify(token) as TypeUserJWTProps;

    const result = await clientPG.query(
      `SELECT id, creator, status, task_name, comment, index FROM public.todo WHERE creator=$1`,
      [verify.username]
    );

    return result.rows;
  },

  createTodo: async (params: TypeTodoCreate) => {
    await clientPG.query(
      `INSERT INTO public.todo(creator, status, task_name, comment, index, "createdAt") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        params.creator,
        params.status,
        params.task_name,
        params?.comment || "",
        params?.index,
        new Date().toUTCString(),
      ]
    );
  },

  deleteTodo: async (params: TypeTodoDelete) => {
    const result = await clientPG.query(
      `DELETE FROM public.todo WHERE id = $1 AND creator = $2`,
      [params.id, params.creator]
    );

    if (!result.rowCount) throw "task is not already existed";
  },

  editTodo: async (params: TypeTodoCreate) => {
    const fields = getFieldsByTemplate(params, [
      "status",
      "task_name",
      "comment",
      "index",
    ]);

    // don't change anything
    if (!fields.length) return;

    await clientPG.query(`UPDATE public.todo SET ${fields} WHERE id=$1`, [
      params.id,
    ]);
  },
};
