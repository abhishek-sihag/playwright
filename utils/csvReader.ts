import fs from 'fs';
import { parse } from 'csv-parse/sync';

export function readCSV(filePath: string) {
  const file = fs.readFileSync(filePath);
  return parse(file, {
    columns: true,
    skip_empty_lines: true
  });
}