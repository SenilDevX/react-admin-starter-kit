import { utils, writeFile } from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Sheet1');
  writeFile(wb, `${filename}.csv`, { bookType: 'csv' });
};

export const exportToXLSX = (data: Record<string, unknown>[], filename: string) => {
  const ws = utils.json_to_sheet(data);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, 'Sheet1');
  const buffer = writeFile(wb, `${filename}.xlsx`, { type: 'buffer', bookType: 'xlsx' });
  const blob = new Blob([buffer as BlobPart], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, `${filename}.xlsx`);
};
