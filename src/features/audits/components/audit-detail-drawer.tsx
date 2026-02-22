import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  <div className="flex items-start justify-between gap-4 py-2">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium text-right">{children}</span>
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
      <SheetContent className="overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Audit Log Details</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* User Info */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">User Information</h4>
            <div className="rounded-md border p-4">
              <DetailRow label="Name">{audit.userName}</DetailRow>
              <DetailRow label="Email">{audit.userEmail}</DetailRow>
              <DetailRow label="Role">
                <Badge variant="outline">{audit.userRole}</Badge>
              </DetailRow>
            </div>
          </div>

          <Separator />

          {/* Action Info */}
          <div>
            <h4 className="mb-3 text-sm font-semibold">Action Details</h4>
            <div className="rounded-md border p-4">
              <DetailRow label="Module">
                <StatusBadge status={capitalize(audit.module)} variant="default" />
              </DetailRow>
              <DetailRow label="Action">
                <StatusBadge status={label} variant={variant} />
              </DetailRow>
              <DetailRow label="Record ID">
                <code className="text-xs">{audit.recordId}</code>
              </DetailRow>
              <DetailRow label="IP Address">{audit.ipAddress}</DetailRow>
              <DetailRow label="Timestamp">{formatDateTime(audit.createdAt)}</DetailRow>
            </div>
          </div>

          {/* Values */}
          {(hasPrevious || hasNew) && (
            <>
              <Separator />
              <div>
                <h4 className="mb-3 text-sm font-semibold">Changed Values</h4>
                {hasBoth ? (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                        Previous Values
                      </p>
                      <pre className="overflow-auto rounded-md bg-muted p-3 text-xs">
                        {JSON.stringify(audit.previousValues, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                        New Values
                      </p>
                      <pre className="overflow-auto rounded-md bg-muted p-3 text-xs">
                        {JSON.stringify(audit.newValues, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div>
                    {hasPrevious && (
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                          Previous Values
                        </p>
                        <pre className="overflow-auto rounded-md bg-muted p-3 text-xs">
                          {JSON.stringify(audit.previousValues, null, 2)}
                        </pre>
                      </div>
                    )}
                    {hasNew && (
                      <div>
                        <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                          New Values
                        </p>
                        <pre className="overflow-auto rounded-md bg-muted p-3 text-xs">
                          {JSON.stringify(audit.newValues, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
