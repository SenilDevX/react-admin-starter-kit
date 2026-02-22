import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TodoForm } from './todo-form';
import { useCreateTodo } from '../hooks/use-todo-mutations';
import type { CreateTodoFormValues } from '@/validations/todo.schema';

type TodoCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const TodoCreateDialog = ({ open, onOpenChange }: TodoCreateDialogProps) => {
  const { mutate: createTodo, isPending } = useCreateTodo();

  const handleSubmit = (data: CreateTodoFormValues) => {
    createTodo(data, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Todo</DialogTitle>
        </DialogHeader>
        <TodoForm onSubmit={handleSubmit} isPending={isPending} submitLabel="Create" />
      </DialogContent>
    </Dialog>
  );
};
