import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatDateTime, capitalize } from '@/lib/format';
import type { AuditLog, AuditAction } from '@/types';

const actionVariantMap: Record<AuditAction, { variant: 'info' | 'warning' | 'destructive'; label: string }> = {
  created: { variant: 'info', label: 'Created' },
  updated: { variant: 'warning', label: 'Updated' },
  deleted: { variant: 'destructive', label: 'Deleted' },
};

type AuditDetailDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  audit: AuditLog | null;
};

type DetailRowProps = {
  label: string;
  children: React.ReactNode;
};

const DetailRow = ({ label, children }: DetailRowProps) => (
  <div className="flex items-center justify-between gap-4 py-2.5">
    <span className="text-sm text-muted-foreground shrink-0">{label}</span>
    <span className="text-sm font-medium text-right truncate">{children}</span>
  </div>
);

export const AuditDetailDrawer = ({ open, onOpenChange, audit }: AuditDetailDrawerProps) => {
  if (!audit) return null;

  const { variant, label } = actionVariantMap[audit.action] ?? {
    variant: 'default' as const,
    label: capitalize(audit.action),
  };

  const hasPrevious = audit.previousValues !== null;
  const hasNew = audit.newValues !== null;
  const hasBoth = hasPrevious && hasNew;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Audit Log Details</SheetTitle>
          <SheetDescription>
            {capitalize(audit.module)} record {audit.action} by {audit.userName}
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 pb-6 space-y-5">
          {/* User Info */}
          <section>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              User Information
            </h4>
            <div className="rounded-lg border divide-y">
              <div className="px-4">
                <DetailRow label="Name">{audit.userName || '-'}</DetailRow>
              </div>
              <div className="px-4">
                <DetailRow label="Email">{audit.userEmail || '-'}</DetailRow>
              </div>
              <div className="px-4">
                <DetailRow label="Role">
                  <Badge variant="outline">{audit.userRole || '-'}</Badge>
                </DetailRow>
              </div>
            </div>
          </section>

          {/* Action Info */}
          <section>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Action Details
            </h4>
            <div className="rounded-lg border divide-y">
              <div className="px-4">
                <DetailRow label="Module">
                  <StatusBadge status={capitalize(audit.module)} variant="default" />
                </DetailRow>
              </div>
              <div className="px-4">
                <DetailRow label="Action">
                  <StatusBadge status={label} variant={variant} />
                </DetailRow>
              </div>
              <div className="px-4">
                <DetailRow label="Record ID">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{audit.recordId || '-'}</code>
                </DetailRow>
              </div>
              <div className="px-4">
                <DetailRow label="IP Address">{audit.ipAddress || '-'}</DetailRow>
              </div>
              <div className="px-4">
                <DetailRow label="Timestamp">{formatDateTime(audit.createdAt)}</DetailRow>
              </div>
            </div>
          </section>

          {/* Changed Values */}
          {(hasPrevious || hasNew) && (
            <section>
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Changed Values
              </h4>
              {hasBoth ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1.5">Previous</p>
                    <pre className="overflow-auto rounded-lg border bg-muted/50 p-3 text-xs leading-relaxed">
                      {JSON.stringify(audit.previousValues, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1.5">New</p>
                    <pre className="overflow-auto rounded-lg border bg-muted/50 p-3 text-xs leading-relaxed">
                      {JSON.stringify(audit.newValues, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div>
                  {hasPrevious && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1.5">Previous Values</p>
                      <pre className="overflow-auto rounded-lg border bg-muted/50 p-3 text-xs leading-relaxed">
                        {JSON.stringify(audit.previousValues, null, 2)}
                      </pre>
                    </div>
                  )}
                  {hasNew && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1.5">New Values</p>
                      <pre className="overflow-auto rounded-lg border bg-muted/50 p-3 text-xs leading-relaxed">
                        {JSON.stringify(audit.newValues, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
