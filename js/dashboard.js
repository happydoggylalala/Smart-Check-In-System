import { getState } from './state.js';
import { computeDisplayStatus, computeEarlyLeave, statusSymbol, statusLabel } from './checkin.js';
import { t } from './i18n.js';
import { escapeHtml, formatDateTime, nowIso } from './utils.js';

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
    { label: t('dashboard.stat.total'), num: stats.total },
    { label: t('dashboard.stat.checkedIn'), num: stats.checkedIn },
    { label: t('dashboard.stat.onTime'), num: stats.on_time },
    { label: t('dashboard.stat.late'), num: stats.late },
    { label: t('dashboard.stat.absent'), num: stats.absent },
    { label: t('dashboard.stat.earlyLeave'), num: stats.earlyLeave },
    { label: t('dashboard.stat.waitlisted'), num: stats.waitlisted },
    { label: t('dashboard.stat.capacityUsage'), num: capacity > 0 ? `${Math.round((stats.checkedIn / capacity) * 100)}%` : '-' },
  ];
  document.getElementById('stat-tiles').innerHTML = tiles.map(tile => `
    <div class="stat-tile"><div class="num">${tile.num}</div><div class="label">${tile.label}</div></div>
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
        <td>${p.isEarlyBird ? t('dashboard.earlybirdMark') : ''}</td>
        <td>${p.checkin.waitlisted ? t('dashboard.waitlistMark') : ''}</td>
        <td>${p.group.groupIndex ? t('dashboard.groupSeatCell', { group: p.group.groupIndex, seat: p.group.seatIndex }) : ''}</td>
        <td>${formatDateTime(p.checkin.checkedInAt)}</td>
        <td>${formatDateTime(p.checkin.checkedOutAt)}</td>
        <td>${t(`dashboard.emailStatus.${p.emailStatus.status}`)}</td>
        <td>${p.lottery.won ? t('dashboard.lotteryWonMark') : ''}</td>
      </tr>
    `;
  }).join('') || `<tr><td colspan="11" class="hint">${t('dashboard.noRows')}</td></tr>`;
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
