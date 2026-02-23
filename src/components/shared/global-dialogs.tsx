import { lazy, Suspense } from 'react';
import { useDialogStore, DIALOG_KEY } from '@/stores/dialog-store';
import { PermissionGate } from '@/components/shared/permission-gate';

const TodoCreateDialog = lazy(() =>
  import('@/features/todos/components/todo-create-dialog').then((m) => ({
    default: m.TodoCreateDialog,
  })),
);
const UserCreateDialog = lazy(() =>
  import('@/features/users/components/user-create-dialog').then((m) => ({
    default: m.UserCreateDialog,
  })),
);
const RoleCreateDialog = lazy(() =>
  import('@/features/roles/components/role-create-dialog').then((m) => ({
    default: m.RoleCreateDialog,
  })),
);

export const GlobalDialogs = () => {
  const { openDialogs, closeDialog } = useDialogStore();

  return (
    <Suspense>
      <PermissionGate permission="todos.create">
        <TodoCreateDialog
          open={openDialogs[DIALOG_KEY.CREATE_TODO] ?? false}
          onOpenChange={(open) => !open && closeDialog(DIALOG_KEY.CREATE_TODO)}
        />
      </PermissionGate>
      <PermissionGate permission="users.create">
        <UserCreateDialog
          open={openDialogs[DIALOG_KEY.CREATE_USER] ?? false}
          onOpenChange={(open) => !open && closeDialog(DIALOG_KEY.CREATE_USER)}
        />
      </PermissionGate>
      <PermissionGate permission="roles.create">
        <RoleCreateDialog
          open={openDialogs[DIALOG_KEY.CREATE_ROLE] ?? false}
          onOpenChange={(open) => !open && closeDialog(DIALOG_KEY.CREATE_ROLE)}
        />
      </PermissionGate>
    </Suspense>
  );
};
