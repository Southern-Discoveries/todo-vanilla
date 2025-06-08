export interface TypeTodoCreate {
  id: number;
  creator: string;
  status: "process" | "done";
  task_name: string;
  comment?: string;
  index?: number; // the position of todo
}

export interface TypeTodoDelete {
  id: string;
  creator: string;
}
