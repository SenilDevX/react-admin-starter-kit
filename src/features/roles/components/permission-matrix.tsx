import { useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { PERMISSION_MODULES, PERMISSION_ACTIONS } from '@/lib/constants';
import { capitalize } from '@/lib/format';
import type { Permission } from '@/types';

type PermissionMatrixProps = {
  permissions: Permission[];
  selectedPermissions: string[];
  onToggle: (permissionName: string) => void;
};

export const PermissionMatrix = ({
  permissions,
  selectedPermissions,
  onToggle,
}: PermissionMatrixProps) => {
  const permissionMap = useMemo(() => {
    const map = new Map<string, Permission>();
    for (const permission of permissions) {
      map.set(`${permission.module}.${permission.action}`, permission);
    }
    return map;
  }, [permissions]);

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                Module
              </th>
              {PERMISSION_ACTIONS.map((action) => (
                <th
                  key={action}
                  className="px-4 py-3 text-center font-medium text-muted-foreground"
                >
                  {capitalize(action)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSION_MODULES.map((module) => (
              <tr key={module} className="border-b last:border-b-0">
                <td className="px-4 py-3 font-medium">{capitalize(module)}</td>
                {PERMISSION_ACTIONS.map((action) => {
                  const permission = permissionMap.get(`${module}.${action}`);
                  const isSelected = permission
                    ? selectedPermissions.includes(permission.name)
                    : false;

                  return (
                    <td key={action} className="px-4 py-3 text-center">
                      {permission ? (
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => onToggle(permission.name)}
                          aria-label={`${capitalize(module)} ${action}`}
                        />
                      ) : (
                        <span className="text-muted-foreground">\u2014</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
