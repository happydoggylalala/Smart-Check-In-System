import { getState } from './state.js';
import { computeDisplayStatus, computeEarlyLeave, statusLabel } from './checkin.js';
import { formatDateTime, nowIso } from './utils.js';

function buildExportRows() {
  const state = getState();
  const now = nowIso();
  return state.roster.map(p => ({
    姓名: p.name,
    工號: p.employeeId,
    Email: p.email,
    狀態: statusLabel(computeDisplayStatus(p, state.event, now)),
    早退: computeEarlyLeave(p, state.event) ? '是' : '',
    早鳥: p.isEarlyBird ? '是' : '',
    現場候補: p.checkin.waitlisted ? '是' : '',
    組別: p.group.groupIndex || '',
    座位: p.group.seatIndex || '',
    報到時間: formatDateTime(p.checkin.checkedInAt),
    簽退時間: formatDateTime(p.checkin.checkedOutAt),
    Email寄送狀態: p.emailStatus.status,
    抽獎中獎: p.lottery.won ? '是' : '',
  }));
}

export function exportCsv() {
  const rows = buildExportRows();
  const ws = window.XLSX.utils.json_to_sheet(rows);
  const csv = window.XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `報到結果_${Date.now()}.csv`);
}

export function exportXlsx() {
  const rows = buildExportRows();
  const ws = window.XLSX.utils.json_to_sheet(rows);
  const wb = window.XLSX.utils.book_new();
  window.XLSX.utils.book_append_sheet(wb, ws, '報到結果');
  window.XLSX.writeFile(wb, `報到結果_${Date.now()}.xlsx`);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
