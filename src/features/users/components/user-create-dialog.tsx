import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserForm } from './user-form';
import { useCreateUser } from '../hooks/use-user-mutations';
import { roleService } from '@/services/role.service';
import { QUERY_KEYS } from '@/lib/constants';
import type { CreateUserFormValues } from '@/validations/user.schema';

type UserCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UserCreateDialog = ({ open, onOpenChange }: UserCreateDialogProps) => {
  const { mutate: createUser, isPending } = useCreateUser();

  const { data: rolesData } = useQuery({
    queryKey: QUERY_KEYS.roles({}),
    queryFn: () => roleService.getAll({ limit: 100 }),
  });

  const roles = rolesData?.items ?? [];

  const handleSubmit = (data: CreateUserFormValues) => {
    createUser(data, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <UserForm
          onSubmit={handleSubmit}
          isPending={isPending}
          submitLabel="Create"
          roles={roles}
        />
      </DialogContent>
    </Dialog>
  );
};
