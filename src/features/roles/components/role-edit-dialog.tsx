import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RoleForm } from './role-form';
import { useUpdateRole } from '../hooks/use-role-mutations';
import { usePermissionsList } from '../hooks/use-permissions-list';
import { Loader2 } from 'lucide-react';
import type { CreateRoleFormValues } from '@/validations/role.schema';
import type { Role } from '@/types';

type RoleEditDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role | null;
};

export const RoleEditDialog = ({ open, onOpenChange, role }: RoleEditDialogProps) => {
  const { mutate: updateRole, isPending } = useUpdateRole();
  const { data: permissions, isLoading: isLoadingPermissions } = usePermissionsList();

  if (!role) return null;

  const handleSubmit = (data: CreateRoleFormValues) => {
    updateRole(
      { id: role._id, data },
      { onSuccess: () => onOpenChange(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
        </DialogHeader>
        {isLoadingPermissions ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <RoleForm
            defaultValues={{
              name: role.name,
              description: role.description ?? '',
              permissions: role.permissions,
              requiresTwoFactor: role.requiresTwoFactor,
            }}
            onSubmit={handleSubmit}
            isPending={isPending}
            submitLabel="Update"
            permissions={permissions ?? []}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
