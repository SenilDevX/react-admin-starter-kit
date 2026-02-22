import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RoleForm } from './role-form';
import { useCreateRole } from '../hooks/use-role-mutations';
import { usePermissionsList } from '../hooks/use-permissions-list';
import { Loader2 } from 'lucide-react';
import type { CreateRoleFormValues } from '@/validations/role.schema';

type RoleCreateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const RoleCreateDialog = ({ open, onOpenChange }: RoleCreateDialogProps) => {
  const { mutate: createRole, isPending } = useCreateRole();
  const { data: permissions, isLoading: isLoadingPermissions } = usePermissionsList();

  const handleSubmit = (data: CreateRoleFormValues) => {
    createRole(data, {
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Role</DialogTitle>
        </DialogHeader>
        {isLoadingPermissions ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <RoleForm
            onSubmit={handleSubmit}
            isPending={isPending}
            submitLabel="Create"
            permissions={permissions ?? []}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
