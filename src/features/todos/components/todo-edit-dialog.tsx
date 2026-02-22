import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TodoForm } from './todo-form';
import { useUpdateTodo } from '../hooks/use-todo-mutations';
import type { CreateTodoFormValues } from '@/validations/todo.schema';
import type { Todo } from '@/types';

type TodoEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo: Todo | null;
};

export const TodoEditDialog = ({ open, onOpenChange, todo }: TodoEditDialogProps) => {
  const { mutate: updateTodo, isPending } = useUpdateTodo();

  if (!todo) return null;

  const handleSubmit = (data: CreateTodoFormValues) => {
    updateTodo(
      { id: todo._id, data },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <TodoForm
          defaultValues={{ title: todo.title, description: todo.description }}
          onSubmit={handleSubmit}
          isPending={isPending}
          submitLabel="Update"
        />
      </DialogContent>
    </Dialog>
  );
};
