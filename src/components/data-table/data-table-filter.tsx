import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type FilterField = {
  key: string;
  label: string;
  options: { label: string; value: string }[];
};

type DataTableFilterProps = {
  fields: FilterField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  activeCount: number;
};

export const DataTableFilter = ({
  fields,
  values,
  onChange,
  onClear,
  activeCount,
}: DataTableFilterProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="flex items-center justify-between pb-3">
          <h4 className="text-sm font-medium">Filters</h4>
          {activeCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs" onClick={onClear}>
              <X className="mr-1 h-3 w-3" />
              Clear all
            </Button>
          )}
        </div>
        <div className="grid gap-3">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="mb-1 text-xs font-medium text-muted-foreground">
                {field.label}
              </label>
              <Select
                value={values[field.key] || ''}
                onValueChange={(val) => onChange(field.key, val)}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
