export const TODO_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
} as const;

export type TodoStatus = (typeof TODO_STATUS)[keyof typeof TODO_STATUS];

export type Todo = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateTodoRequest = {
  title: string;
  description?: string;
};

export type UpdateTodoRequest = {
  title?: string;
  description?: string;
  status?: TodoStatus;
};
