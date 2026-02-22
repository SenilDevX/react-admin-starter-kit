import { todoService } from './todo.service';
import { userService } from './user.service';
import { roleService } from './role.service';
import { auditService } from './audit.service';

export type DashboardStats = {
  totalTodos: number;
  totalUsers: number;
  totalRoles: number;
  totalAudits: number;
};

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const [todos, users, roles, audits] = await Promise.all([
      todoService.getAll({ page: 1, limit: 1 }),
      userService.getAll({ page: 1, limit: 1 }),
      roleService.getAll({ page: 1, limit: 1 }),
      auditService.getAll({ page: 1, limit: 1 }),
    ]);

    return {
      totalTodos: todos.total,
      totalUsers: users.total,
      totalRoles: roles.total,
      totalAudits: audits.total,
    };
  },
};
