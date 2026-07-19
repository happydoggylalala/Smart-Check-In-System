import { createPerson } from './models.js';

const HEADER_ALIASES = {
  name: ['姓名', '名字', '氏名', 'name', 'Name'],
  employeeId: ['工號', '員工編號', '員工工號', '工号', '社員番号', 'employeeId', 'employee_id', 'EmployeeId', 'ID'],
  email: ['email', 'Email', 'E-mail', 'e-mail', '信箱', '電子郵件', '邮箱', 'メール', 'メールアドレス'],
  department: ['部門', '部门', '所屬部門', '所属部门', 'department', 'Department', 'dept'],
  extension: ['分機', '分机', 'extension', 'Extension', 'ext'],
  registeredAt: ['報名時間', '登記時間', '报名时间', '登记时间', '登録日時', 'registeredAt', 'registered_at', '報名日期'],
};

const CSV_TEMPLATE_HEADERS = ['employee_id', 'name', 'department', 'email'];

export function guessColumn(headers, field) {
  const aliases = HEADER_ALIASES[field];
  for (const h of headers) {
    if (aliases.some(a => a.toLowerCase() === String(h).toLowerCase())) return h;
  }
  return '';
}

export function guessMapping(headers) {
  return {
    name: guessColumn(headers, 'name'),
    employeeId: guessColumn(headers, 'employeeId'),
    email: guessColumn(headers, 'email'),
    department: guessColumn(headers, 'department'),
    extension: guessColumn(headers, 'extension'),
    registeredAt: guessColumn(headers, 'registeredAt'),
  };
}

export function parseArrayBuffer(buf) {
  const wb = window.XLSX.read(buf, { type: 'array' });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  return window.XLSX.utils.sheet_to_json(sheet, { defval: '' });
}

// CSV 檔案沒有內建編碼資訊，SheetJS 若用 type:'array' 讀二進位會用預設 codepage
// 猜編碼，中文字（無 BOM 的常見情況）會被誤判成亂碼。CSV 一律先當純文字讀取
// （FileReader 預設 UTF-8），再用 type:'string' 交給 SheetJS 解析，完全避開
// 編碼猜測；.xlsx/.xls 是二進位格式、內含自己的編碼中繼資料，維持原本讀法。
export function parseFile(file) {
  const isCsv = /\.csv$/i.test(file.name);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        if (isCsv) {
          const wb = window.XLSX.read(reader.result, { type: 'string' });
          const sheet = wb.Sheets[wb.SheetNames[0]];
          resolve(window.XLSX.utils.sheet_to_json(sheet, { defval: '' }));
        } else {
          resolve(parseArrayBuffer(reader.result));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    if (isCsv) reader.readAsText(file, 'utf-8');
    else reader.readAsArrayBuffer(file);
  });
}

export function rowsToPeople(rows, mapping, source = 'import') {
  const people = [];
  for (const row of rows) {
    const name = mapping.name ? String(row[mapping.name] ?? '').trim() : '';
    if (!name) continue;
    const employeeId = mapping.employeeId ? String(row[mapping.employeeId] ?? '').trim() : '';
    const email = mapping.email ? String(row[mapping.email] ?? '').trim() : '';
    const department = mapping.department ? String(row[mapping.department] ?? '').trim() : '';
    const extension = mapping.extension ? String(row[mapping.extension] ?? '').trim() : '';
    let registeredAt = null;
    if (mapping.registeredAt) {
      const d = new Date(row[mapping.registeredAt]);
      registeredAt = isNaN(d.getTime()) ? null : d.toISOString();
    }
    people.push(createPerson({ name, employeeId, email, department, extension, registeredAt, source }));
  }
  return people;
}

export function downloadCsvTemplate() {
  const csv = CSV_TEMPLATE_HEADERS.join(',') + '\n';
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'roster-template.csv';
  a.click();
  URL.revokeObjectURL(url);
}
