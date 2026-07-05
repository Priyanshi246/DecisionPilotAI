import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export async function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve({
          data: results.data,
          fields: results.meta.fields,
          errors: results.errors
        });
      },
      error: (error) => reject(error)
    });
  });
}

export async function parseExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        const fields = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
        resolve({ data: jsonData, fields });
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export async function parseJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const fields = Array.isArray(data) && data.length > 0 ? Object.keys(data[0]) : [];
        resolve({ data: Array.isArray(data) ? data : [data], fields });
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export function analyzeDataset(data, fields) {
  if (!data || data.length === 0) {
    return null;
  }

  const stats = {
    totalRows: data.length,
    totalColumns: fields.length,
    columns: {},
    missingValues: 0,
    duplicateRows: 0,
    numericColumns: [],
    categoricalColumns: [],
    dateColumns: []
  };

  const seen = new Set();
  data.forEach((row, rowIndex) => {
    const rowStr = JSON.stringify(row);
    if (seen.has(rowStr)) {
      stats.duplicateRows++;
    }
    seen.add(rowStr);

    fields.forEach(field => {
      if (!stats.columns[field]) {
        stats.columns[field] = {
          name: field,
          type: 'unknown',
          missing: 0,
          unique: new Set(),
          min: null,
          max: null,
          avg: null,
          sum: null
        };
      }

      const value = row[field];
      const col = stats.columns[field];

      if (value === null || value === undefined || value === '') {
        col.missing++;
        stats.missingValues++;
      } else {
        col.unique.add(String(value));

        const num = parseFloat(value);
        if (!isNaN(num)) {
          if (col.type === 'unknown' || col.type === 'numeric') {
            col.type = 'numeric';
            col.min = col.min === null ? num : Math.min(col.min, num);
            col.max = col.max === null ? num : Math.max(col.max, num);
            col.sum = (col.sum || 0) + num;
          }
        } else if (isDateString(value)) {
          col.type = 'date';
        } else {
          col.type = 'categorical';
        }
      }
    });
  });

  fields.forEach(field => {
    const col = stats.columns[field];
    if (col.type === 'numeric' && col.sum !== null) {
      col.avg = col.sum / (stats.totalRows - col.missing);
    }
    col.unique = col.unique.size;

    if (col.type === 'numeric') stats.numericColumns.push(field);
    else if (col.type === 'categorical') stats.categoricalColumns.push(field);
    else if (col.type === 'date') stats.dateColumns.push(field);
  });

  return stats;
}

function isDateString(value) {
  const datePatterns = [
    /^\d{4}-\d{2}-\d{2}$/,
    /^\d{2}\/\d{2}\/\d{4}$/,
    /^\d{4}\/\d{2}\/\d{2}$/,
    /^\d{2}-\d{2}-\d{4}$/
  ];
  return datePatterns.some(p => p.test(value)) || !isNaN(Date.parse(value));
}

export function generateSummary(stats) {
  if (!stats) return '';

  const summary = {
    overview: `Dataset contains ${stats.totalRows.toLocaleString()} rows and ${stats.totalColumns} columns.`,
    dataQuality: `${((1 - stats.missingValues / (stats.totalRows * stats.totalColumns)) * 100).toFixed(1)}% data completeness.`,
    duplicates: stats.duplicateRows > 0
      ? `Found ${stats.duplicateRows} duplicate rows (${((stats.duplicateRows / stats.totalRows) * 100).toFixed(1)}%).`
      : 'No duplicate rows found.',
    columns: {
      numeric: stats.numericColumns.length,
      categorical: stats.categoricalColumns.length,
      date: stats.dateColumns.length
    }
  };

  return summary;
}

export function dataToCSV(data) {
  if (!Array.isArray(data) || data.length === 0) return '';
  return Papa.unparse(data);
}

export function downloadData(data, filename = 'export.csv') {
  const csv = dataToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
