import { getEvents, getEventById, updateEvent } from './eventsStore.js';
import { buildEventDropdownOptions } from './eventPicker.js';
import { createRosterTable, computeReportStatus } from './rosterTable.js';
import { exportEventCsv } from './exportData.js';
import { t } from './i18n.js';
import { nowIso } from './utils.js';

let table = null;
let currentEventId = '';

function computeStats(event) {
  const now = nowIso();
  const total = event.roster.length;
  const checkedIn = event.roster.filter(p => p.checkin.checkedInAt).length;
  const followUp = event.roster.filter(p => !p.checkin.checkedInAt && !p.onLeave).length;
  const rate = total > 0 ? Math.round((checkedIn / total) * 100) : 0;
  return { total, checkedIn, followUp, rate };
}

function renderStatTiles(event) {
  const stats = computeStats(event);
  const tiles = [
    { icon: '📅', label: t('reports.statExpected'), num: stats.total },
    { icon: '🔲', label: t('reports.statCheckedIn'), num: stats.checkedIn },
    { icon: '🔔', label: t('reports.statFollowUp'), num: stats.followUp },
    { icon: '📊', label: t('reports.statRate'), num: `${stats.rate}%` },
  ];
  document.getElementById('reports-content').querySelector('.stat-tiles').innerHTML = tiles.map(tile => `
    <div class="stat-tile"><div class="stat-icon">${tile.icon}</div><div class="num">${tile.num}</div><div class="label">${tile.label}</div></div>
  `).join('');
}

function renderEvent(eventId) {
  const event = getEventById(eventId);
  const empty = document.getElementById('reports-empty');
  const content = document.getElementById('reports-content');
  if (!event) {
    empty.classList.remove('hidden');
    content.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');
  content.classList.remove('hidden');
  renderStatTiles(event);
  table.setEvent(event);
}

function populateDropdown() {
  const select = document.getElementById('reports-event-select');
  const options = buildEventDropdownOptions(getEvents());
  select.innerHTML = `<option value="">${t('eventPicker.selectPlaceholder')}</option>` +
    options.map(o => `<option value="${o.value}">${o.label}</option>`).join('');
  select.value = currentEventId;
}

export function showEventInReports(eventId) {
  if (!eventId) return;
  currentEventId = eventId;
  populateDropdown();
  renderEvent(eventId);
}

export function initReportsScreen() {
  const select = document.getElementById('reports-event-select');
  const content = document.getElementById('reports-content');
  content.innerHTML = `
    <div class="stat-tiles"></div>
    <div class="panel">
      <div class="page-eyebrow">${t('reports.rosterEyebrow')}</div>
      <h2>${t('reports.rosterHeading')}</h2>
      <div id="reports-roster-table"></div>
    </div>
  `;

  table = createRosterTable(document.getElementById('reports-roster-table'), {
    onToggleLeave: personId => {
      updateEvent(currentEventId, event => {
        const p = event.roster.find(x => x.id === personId);
        p.onLeave = !p.onLeave;
      });
      renderEvent(currentEventId);
    },
    onDownloadCsv: () => {
      const event = getEventById(currentEventId);
      if (event) exportEventCsv(event);
    },
  });

  populateDropdown();
  select.addEventListener('change', () => {
    currentEventId = select.value;
    renderEvent(currentEventId);
  });
}

export function refreshReportsScreen() {
  populateDropdown();
  if (currentEventId) renderEvent(currentEventId);
}
