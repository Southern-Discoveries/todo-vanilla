import { TypeTodoCreate, TypeTodoDelete } from "../types/todo";
import clientPG from "../utils/utils.pg";

export default {
  createTodo: async (params: TypeTodoCreate) => {
    await clientPG.query(
      `INSERT INTO public.todo(creator, status, task_name, comment, index) VALUES ($1, $2, $3, $4, $5)`,
      [
        params.creator,
        params.status,
        params.task_name,
        params?.comment || "",
        params?.index,
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
    let fields = "";

    for (let field of ["status", "task_name", "comment", "index"]) {
      const getChange = params?.[field as keyof typeof params];

      if (typeof getChange === "number") {
        fields += `${field}=${getChange},`;
      }

      if (typeof getChange === "string") {
        fields += `${field}='${getChange}',`;
      }
    }

    // don't change anything
    if (!fields.length) return;

    /* 
      you needs substring because the last word don't allow ,
      E.g:
        task_name='hello world', index=0, // wrong
        task_name='hello world', index=, // correct
    */
    fields = fields.substring(0, fields.length - 1);

    await clientPG.query(`UPDATE public.todo SET ${fields} WHERE id=$1`, [
      params.id,
    ]);
  },

  resetTodo: async (creator: string) => {
    const result = await clientPG.query(
      `DELETE FROM public.todo WHERE creator=$1`,
      [creator]
    );

    if (!result.rowCount) throw "you don't have any task to reset";
  },
};
