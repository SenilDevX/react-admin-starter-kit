import { useState } from 'react';
import type { SortingState } from '@tanstack/react-table';
import { SORT_ORDER } from '@/types';

export const useSorting = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const sortBy = sorting[0]?.id;
  const sortOrder = sorting[0]
    ? sorting[0].desc
      ? SORT_ORDER.DESC
      : SORT_ORDER.ASC
    : undefined;

  return { sorting, setSorting, sortBy, sortOrder };
};
