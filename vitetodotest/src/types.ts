export type Todo = {
  description: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TodoTableProps {
  todos: Todo[];
}