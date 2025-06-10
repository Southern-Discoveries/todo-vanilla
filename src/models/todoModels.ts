import { TypeTodoCreate, TypeTodoDelete } from "../types/todo";
import { getFieldsByTemplate } from "../utils";
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

  resetTodo: async (creator: string) => {
    const result = await clientPG.query(
      `DELETE FROM public.todo WHERE creator=$1`,
      [creator]
    );

    if (!result.rowCount) throw "you don't have any task to reset";
  },
};
