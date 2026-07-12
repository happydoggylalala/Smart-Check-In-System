import { getState } from './state.js';
import { computeDisplayStatus, computeEarlyLeave, statusLabel } from './checkin.js';
import { t } from './i18n.js';
import { formatDateTime, nowIso } from './utils.js';

function buildExportRows() {
  const state = getState();
  const now = nowIso();
  return state.roster.map(p => ({
    [t('export.name')]: p.name,
    [t('export.employeeId')]: p.employeeId,
    [t('export.email')]: p.email,
    [t('export.status')]: statusLabel(computeDisplayStatus(p, state.event, now)),
    [t('export.earlyLeave')]: computeEarlyLeave(p, state.event) ? t('export.yes') : '',
    [t('export.earlybird')]: p.isEarlyBird ? t('export.yes') : '',
    [t('export.waitlist')]: p.checkin.waitlisted ? t('export.yes') : '',
    [t('export.group')]: p.group.groupIndex || '',
    [t('export.seat')]: p.group.seatIndex || '',
    [t('export.checkinTime')]: formatDateTime(p.checkin.checkedInAt),
    [t('export.checkoutTime')]: formatDateTime(p.checkin.checkedOutAt),
    [t('export.emailStatus')]: p.emailStatus.status,
    [t('export.lotteryWon')]: p.lottery.won ? t('export.yes') : '',
  }));
}

export function exportCsv() {
  const rows = buildExportRows();
  const ws = window.XLSX.utils.json_to_sheet(rows);
  const csv = window.XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${t('export.filenamePrefix')}_${Date.now()}.csv`);
}

export function exportXlsx() {
  const rows = buildExportRows();
  const ws = window.XLSX.utils.json_to_sheet(rows);
  const wb = window.XLSX.utils.book_new();
  window.XLSX.utils.book_append_sheet(wb, ws, t('export.filenamePrefix'));
  window.XLSX.writeFile(wb, `${t('export.filenamePrefix')}_${Date.now()}.xlsx`);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
