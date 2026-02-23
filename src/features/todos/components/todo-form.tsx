import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTodoSchema, type CreateTodoFormValues } from '@/validations/todo.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';


type TodoFormProps = {
  defaultValues?: Partial<CreateTodoFormValues>;
  onSubmit: (data: CreateTodoFormValues) => void;
  isPending: boolean;
  submitLabel?: string;
};

export const TodoForm = ({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel = 'Save',
}: TodoFormProps) => {
  const form = useForm<CreateTodoFormValues>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: '',
      description: '',
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter todo title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description (optional)" rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 pt-2">
          <Button type="submit" loading={isPending}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
