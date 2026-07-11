import { getState } from './state.js';
import { computeDisplayStatus, computeEarlyLeave, statusSymbol, statusLabel } from './checkin.js';
import { escapeHtml, formatDateTime, nowIso } from './utils.js';

const EMAIL_STATUS_TEXT = {
  not_sent: '-',
  sent: '已寄出',
  failed: '失敗',
  skipped_no_email: '無Email',
  skipped_not_configured: '未設定',
};

function computeStats(state) {
  const now = nowIso();
  const stats = { total: state.roster.length, on_time: 0, late: 0, absent: 0, pending: 0, checkedIn: 0, earlyLeave: 0, waitlisted: 0 };
  for (const p of state.roster) {
    const status = computeDisplayStatus(p, state.event, now);
    stats[status] = (stats[status] || 0) + 1;
    if (p.checkin.checkedInAt) stats.checkedIn++;
    if (computeEarlyLeave(p, state.event)) stats.earlyLeave++;
    if (p.checkin.waitlisted) stats.waitlisted++;
  }
  return stats;
}

export function renderStatTiles() {
  const state = getState();
  const stats = computeStats(state);
  const capacity = Number(state.event.capacity) || 0;
  const tiles = [
    { label: '總名單', num: stats.total },
    { label: '已報到', num: stats.checkedIn },
    { label: '準時', num: stats.on_time },
    { label: '遲到', num: stats.late },
    { label: '未到', num: stats.absent },
    { label: '早退', num: stats.earlyLeave },
    { label: '現場候補', num: stats.waitlisted },
    { label: '容量使用率', num: capacity > 0 ? `${Math.round((stats.checkedIn / capacity) * 100)}%` : '-' },
  ];
  document.getElementById('stat-tiles').innerHTML = tiles.map(t => `
    <div class="stat-tile"><div class="num">${t.num}</div><div class="label">${t.label}</div></div>
  `).join('');
}

function getFilteredRoster() {
  const state = getState();
  const q = document.getElementById('dashboard-search').value.trim().toLowerCase();
  const statusFilter = document.getElementById('dashboard-filter-status').value;
  const now = nowIso();
  return state.roster.filter(p => {
    if (q && !(p.name.toLowerCase().includes(q) || (p.employeeId || '').toLowerCase().includes(q) || (p.email || '').toLowerCase().includes(q))) return false;
    if (statusFilter && computeDisplayStatus(p, state.event, now) !== statusFilter) return false;
    return true;
  });
}

export function renderDashboardTable() {
  const state = getState();
  const rows = getFilteredRoster();
  const now = nowIso();
  const tbody = document.getElementById('dashboard-tbody');
  tbody.innerHTML = rows.map(p => {
    const status = computeDisplayStatus(p, state.event, now);
    const earlyLeave = computeEarlyLeave(p, state.event);
    return `
      <tr>
        <td class="status-${status}">${statusSymbol(status)} ${statusLabel(status)}${earlyLeave ? ' <span class="overlay-earlyleave">⚠</span>' : ''}</td>
        <td>${escapeHtml(p.name)}</td>
        <td>${escapeHtml(p.employeeId || '')}</td>
        <td>${escapeHtml(p.email || '')}</td>
        <td>${p.isEarlyBird ? '早鳥' : ''}</td>
        <td>${p.checkin.waitlisted ? '候補' : ''}</td>
        <td>${p.group.groupIndex ? `第${p.group.groupIndex}組 ${p.group.seatIndex}號` : ''}</td>
        <td>${formatDateTime(p.checkin.checkedInAt)}</td>
        <td>${formatDateTime(p.checkin.checkedOutAt)}</td>
        <td>${EMAIL_STATUS_TEXT[p.emailStatus.status] || p.emailStatus.status}</td>
        <td>${p.lottery.won ? '🎉 中獎' : ''}</td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="11" class="hint">沒有符合條件的資料</td></tr>';
}

export function renderDashboard() {
  renderStatTiles();
  renderDashboardTable();
}

export function initDashboardScreen() {
  document.getElementById('dashboard-search').addEventListener('input', renderDashboardTable);
  document.getElementById('dashboard-filter-status').addEventListener('change', renderDashboardTable);
  renderDashboard();
}

export { getFilteredRoster };
