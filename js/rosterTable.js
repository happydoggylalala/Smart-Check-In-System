import { computeDisplayStatus, computeEarlyLeave, statusSymbol, statusLabel } from './checkinLogic.js';
import { t } from './i18n.js';
import { escapeHtml, formatDateTime, nowIso } from './utils.js';

export function computeReportStatus(person, event, nowIsoStr) {
  if (person.onLeave) return 'on_leave';
  return computeDisplayStatus(person, event, nowIsoStr);
}

function emailStatusText(status) {
  return t(`dashboard.emailStatus.${status}`) ?? status;
}

export function createRosterTable(container, { readOnly = false, onToggleLeave, onDownloadCsv } = {}) {
  container.innerHTML = `
    <div class="filter-toolbar">
      <input class="rt-search" type="text" placeholder="${t('reports.searchPlaceholder')}">
      <select class="rt-dept"><option value="">${t('reports.filterAllDept')}</option></select>
      <select class="rt-group"><option value="">${t('reports.filterAllGroup')}</option></select>
      <select class="rt-status">
        <option value="">${t('reports.filterAllStatus')}</option>
        <option value="pending">${t('status.pending')}</option>
        <option value="on_time">${t('status.on_time')}</option>
        <option value="late">${t('status.late')}</option>
        <option value="absent">${t('status.absent')}</option>
        <option value="on_leave">${t('status.on_leave')}</option>
      </select>
      <button class="btn-secondary rt-download">${t('reports.downloadCsv')}</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>${t('th.status')}</th><th>${t('th.name')}</th><th>${t('reports.filterAllDept')}</th>
            <th>${t('reports.filterAllGroup')}</th><th>${t('th.checkinTime')}</th><th>${t('th.checkoutTime')}</th>
            <th>Teams</th><th>${t('reports.extensionCol')}</th>
            ${!readOnly ? `<th></th>` : ''}
          </tr>
        </thead>
        <tbody class="rt-tbody"></tbody>
      </table>
    </div>
  `;

  const searchEl = container.querySelector('.rt-search');
  const deptEl = container.querySelector('.rt-dept');
  const groupEl = container.querySelector('.rt-group');
  const statusEl = container.querySelector('.rt-status');
  const tbody = container.querySelector('.rt-tbody');
  const downloadBtn = container.querySelector('.rt-download');

  let currentEvent = null;

  function populateFilterOptions() {
    const depts = [...new Set(currentEvent.roster.map(p => p.department).filter(Boolean))].sort();
    deptEl.innerHTML = `<option value="">${t('reports.filterAllDept')}</option>` + depts.map(d => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join('');
    const groups = [...new Set(currentEvent.roster.map(p => p.group.groupIndex).filter(g => g != null))].sort((a, b) => a - b);
    groupEl.innerHTML = `<option value="">${t('reports.filterAllGroup')}</option>` + groups.map(g => `<option value="${g}">${t('reports.groupLabel', { group: g })}</option>`).join('');
  }

  function render() {
    if (!currentEvent) return;
    const q = searchEl.value.trim().toLowerCase();
    const dept = deptEl.value;
    const group = groupEl.value;
    const status = statusEl.value;
    const now = nowIso();

    const rows = currentEvent.roster.filter(p => {
      if (q && !(p.name.toLowerCase().includes(q) || (p.employeeId || '').toLowerCase().includes(q))) return false;
      if (dept && p.department !== dept) return false;
      if (group && String(p.group.groupIndex) !== group) return false;
      if (status && computeReportStatus(p, currentEvent, now) !== status) return false;
      return true;
    });

    tbody.innerHTML = rows.map(p => {
      const st = computeReportStatus(p, currentEvent, now);
      const earlyLeave = computeEarlyLeave(p, currentEvent);
      return `
        <tr>
          <td class="status-${st}">${statusSymbol(st)} ${statusLabel(st)}${earlyLeave ? ' <span class="overlay-earlyleave">⚠</span>' : ''}</td>
          <td><strong>${escapeHtml(p.name)}</strong><div class="hint">${escapeHtml(p.employeeId || '')}</div></td>
          <td>${escapeHtml(p.department || '')}</td>
          <td>${p.group.groupIndex ? t('reports.groupLabel', { group: p.group.groupIndex }) : ''}</td>
          <td>${formatDateTime(p.checkin.checkedInAt)}</td>
          <td>${formatDateTime(p.checkin.checkedOutAt)}</td>
          <td>${p.email ? '💬' : ''}</td>
          <td>${escapeHtml(p.extension || '')}</td>
          ${!readOnly ? `<td><button class="btn-ghost rt-leave-btn" data-id="${p.id}">${p.onLeave ? t('reports.unmarkLeave') : t('reports.markLeave')}</button></td>` : ''}
        </tr>
      `;
    }).join('') || `<tr><td colspan="9" class="hint">${t('dashboard.noRows')}</td></tr>`;

    if (!readOnly) {
      tbody.querySelectorAll('.rt-leave-btn').forEach(btn => {
        btn.addEventListener('click', () => onToggleLeave && onToggleLeave(btn.dataset.id));
      });
    }
  }

  searchEl.addEventListener('input', render);
  deptEl.addEventListener('change', render);
  groupEl.addEventListener('change', render);
  statusEl.addEventListener('change', render);
  downloadBtn?.addEventListener('click', () => onDownloadCsv && onDownloadCsv());

  return {
    setEvent(event) {
      currentEvent = event;
      populateFilterOptions();
      render();
    },
    refresh: render,
  };
}
