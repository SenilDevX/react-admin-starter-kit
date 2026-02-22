import { useState, useCallback } from 'react';

type PaginationState = {
  page: number;
  limit: number;
};

export const usePagination = (initialLimit = 10) => {
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: initialLimit,
  });

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setPagination({ page: 1, limit });
  }, []);

  const resetPage = useCallback(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  return {
    ...pagination,
    setPage,
    setLimit,
    resetPage,
  };
};
