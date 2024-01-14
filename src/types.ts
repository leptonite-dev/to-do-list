export interface ToDo {
  title: string;
  detail: string;
  status: "completed" | "pending";
  dueDate?: string;
  createdAt: number;
}
