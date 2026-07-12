import { getState, updateState } from './state.js';
import { createPerson } from './models.js';
import { recomputeEarlyBirds } from './earlybird.js';
import { t } from './i18n.js';
import { escapeHtml, showToast } from './utils.js';

const HEADER_ALIASES = {
  name: ['姓名', '名字', '氏名', 'name', 'Name'],
  employeeId: ['工號', '員工編號', '員工工號', '工号', '社員番号', 'employeeId', 'employee_id', 'EmployeeId', 'ID'],
  email: ['email', 'Email', 'E-mail', 'e-mail', '信箱', '電子郵件', '邮箱', 'メール', 'メールアドレス'],
  registeredAt: ['報名時間', '登記時間', '报名时间', '登记时间', '登録日時', 'registeredAt', 'registered_at', '報名日期'],
};

let parsedRows = [];
let columnMapping = { name: '', employeeId: '', email: '', registeredAt: '' };

function guessColumn(headers, field) {
  const aliases = HEADER_ALIASES[field];
  for (const h of headers) {
    if (aliases.some(a => a.toLowerCase() === String(h).toLowerCase())) return h;
  }
  return '';
}

function parseArrayBuffer(buf) {
  const wb = window.XLSX.read(buf, { type: 'array' });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  return window.XLSX.utils.sheet_to_json(sheet, { defval: '' });
}

function renderPreview() {
  const container = document.getElementById('import-preview');
  const confirmBtn = document.getElementById('btn-import-confirm');
  if (parsedRows.length === 0) {
    container.innerHTML = '';
    confirmBtn.classList.add('hidden');
    return;
  }
  const headers = Object.keys(parsedRows[0]);
  const fields = [
    { key: 'name', label: t('import.fieldName'), required: true },
    { key: 'employeeId', label: t('import.fieldEmployeeId'), required: false },
    { key: 'email', label: t('import.fieldEmail'), required: false },
    { key: 'registeredAt', label: t('import.fieldRegisteredAt'), required: false },
  ];

  const mappingHtml = fields.map(f => `
    <label>${f.label}${f.required ? ' *' : ''}
      <select data-map-field="${f.key}">
        <option value="">${t('import.noMap')}</option>
        ${headers.map(h => `<option value="${escapeHtml(h)}" ${columnMapping[f.key] === h ? 'selected' : ''}>${escapeHtml(h)}</option>`).join('')}
      </select>
    </label>
  `).join('');

  const previewRows = parsedRows.slice(0, 5);
  const tableHtml = `
    <div class="table-wrap">
      <table>
        <thead><tr>${headers.map(h => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
        <tbody>
          ${previewRows.map(r => `<tr>${headers.map(h => `<td>${escapeHtml(r[h])}</td>`).join('')}</tr>`).join('')}
        </tbody>
      </table>
    </div>
    <p class="hint">${t('import.previewCount', { count: parsedRows.length })}</p>
  `;

  container.innerHTML = `
    <div class="panel">
      <h3>${t('import.mappingHeading')}</h3>
      ${mappingHtml}
    </div>
    ${tableHtml}
  `;

  container.querySelectorAll('[data-map-field]').forEach(sel => {
    sel.addEventListener('change', () => {
      columnMapping[sel.dataset.mapField] = sel.value;
    });
  });

  confirmBtn.classList.toggle('hidden', !columnMapping.name);
}

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      parsedRows = parseArrayBuffer(reader.result);
      if (parsedRows.length === 0) {
        showToast(t('import.noData'), 'error');
        return;
      }
      const headers = Object.keys(parsedRows[0]);
      columnMapping = {
        name: guessColumn(headers, 'name'),
        employeeId: guessColumn(headers, 'employeeId'),
        email: guessColumn(headers, 'email'),
        registeredAt: guessColumn(headers, 'registeredAt'),
      };
      renderPreview();
    } catch (err) {
      showToast(t('import.parseFail', { msg: err.message }), 'error');
    }
  };
  reader.readAsArrayBuffer(file);
}

function confirmImport(onImported) {
  if (!columnMapping.name) {
    showToast(t('import.needName'), 'error');
    return;
  }
  let count = 0;
  updateState(state => {
    for (const row of parsedRows) {
      const name = String(row[columnMapping.name] ?? '').trim();
      if (!name) continue;
      const employeeId = columnMapping.employeeId ? String(row[columnMapping.employeeId] ?? '').trim() : '';
      const email = columnMapping.email ? String(row[columnMapping.email] ?? '').trim() : '';
      let registeredAt = null;
      if (columnMapping.registeredAt) {
        const raw = row[columnMapping.registeredAt];
        const d = new Date(raw);
        registeredAt = isNaN(d.getTime()) ? null : d.toISOString();
      }
      state.roster.push(createPerson({ name, employeeId, email, registeredAt, source: 'import' }));
      count++;
    }
    recomputeEarlyBirds(state);
  });
  showToast(t('import.successCount', { count }), 'success');
  parsedRows = [];
  columnMapping = { name: '', employeeId: '', email: '', registeredAt: '' };
  document.getElementById('import-file').value = '';
  renderPreview();
  onImported && onImported();
}

export function initImportScreen({ onImported } = {}) {
  const fileInput = document.getElementById('import-file');
  const confirmBtn = document.getElementById('btn-import-confirm');

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) handleFile(file);
  });

  confirmBtn.addEventListener('click', () => confirmImport(onImported));
}
