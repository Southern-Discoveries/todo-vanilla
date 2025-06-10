export const catchProperties = (obj: Record<string, any>) => {
  for (const [key, conditional] of Object.entries(obj)) {
    if (conditional) return key;
  }
};

export const getFieldsByTemplate = (params: unknown, element: string[]) => {
  let fields = "";

  for (let field of element) {
    const getChange = params?.[field as keyof typeof params];

    if (typeof getChange === "number") {
      fields += `${field}=${getChange},`;
    }

    if (typeof getChange === "string") {
      fields += `${field}='${getChange}',`;
    }
  }

  /* 
      you needs substring because the last word don't allow ,
      E.g:
        task_name='hello world', index=0, // wrong
        task_name='hello world', index=, // correct
    */
  fields = fields.substring(0, fields.length - 1);

  return fields;
};
