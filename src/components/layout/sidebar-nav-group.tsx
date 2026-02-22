import type { ReactNode } from 'react';

type SidebarNavGroupProps = {
  label: string;
  children: ReactNode;
};

export const SidebarNavGroup = ({ label, children }: SidebarNavGroupProps) => {
  return (
    <div className="mb-4">
      <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <nav className="flex flex-col gap-0.5">{children}</nav>
    </div>
  );
};
