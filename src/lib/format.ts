import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string | Date, pattern = 'dd MMM, yyyy') => {
  return format(new Date(date), pattern);
};

export const formatDateTime = (date: string | Date) => {
  return format(new Date(date), 'dd MMM, yyyy \'at\' h:mm a');
};

export const formatRelativeTime = (date: string | Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
