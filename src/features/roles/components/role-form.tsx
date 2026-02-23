import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRoleSchema, type CreateRoleFormValues } from '@/validations/role.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

import { PermissionMatrix } from './permission-matrix';
import type { Permission } from '@/types';

type RoleFormProps = {
  defaultValues?: Partial<CreateRoleFormValues>;
  onSubmit: (data: CreateRoleFormValues) => void;
  isPending: boolean;
  submitLabel?: string;
  permissions: Permission[];
};

export const RoleForm = ({
  defaultValues,
  onSubmit,
  isPending,
  submitLabel = 'Save',
  permissions,
}: RoleFormProps) => {
  const form = useForm<CreateRoleFormValues>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: '',
      description: '',
      permissions: [],
      requiresTwoFactor: false,
      ...defaultValues,
    },
  });

  const handlePermissionToggle = (permissionName: string) => {
    const current = form.getValues('permissions');
    const updated = current.includes(permissionName)
      ? current.filter((p) => p !== permissionName)
      : [...current, permissionName];
    form.setValue('permissions', updated, { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter role name" {...field} />
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
        <FormField
          control={form.control}
          name="requiresTwoFactor"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FormLabel>Require Two-Factor Authentication</FormLabel>
                <FormDescription>
                  Users with this role must enable 2FA
                </FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permissions"
          render={() => (
            <FormItem>
              <FormLabel>Permissions</FormLabel>
              <PermissionMatrix
                permissions={permissions}
                selectedPermissions={form.watch('permissions')}
                onToggle={handlePermissionToggle}
              />
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
