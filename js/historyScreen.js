import { getEvents, getEventById, computeEventStatus } from './eventsStore.js';
import { buildEventDropdownOptions } from './eventPicker.js';
import { createRosterTable } from './rosterTable.js';
import { exportEventCsv } from './exportData.js';
import { t } from './i18n.js';

let table = null;
let currentEventId = '';

function getPastEvents() {
  return getEvents().filter(e => {
    const status = computeEventStatus(e);
    return status === 'ended' || status === 'cancelled';
  });
}

function renderEvent(eventId) {
  const event = getEventById(eventId);
  const empty = document.getElementById('history-empty');
  const content = document.getElementById('history-content');
  if (!event) {
    empty.classList.remove('hidden');
    content.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');
  content.classList.remove('hidden');
  table.setEvent(event);
}

function populateDropdown() {
  const select = document.getElementById('history-event-select');
  const options = buildEventDropdownOptions(getPastEvents());
  select.innerHTML = `<option value="">${t('eventPicker.selectPlaceholder')}</option>` +
    options.map(o => `<option value="${o.value}">${o.label}</option>`).join('');
  select.value = currentEventId;
}

export function initHistoryScreen() {
  const select = document.getElementById('history-event-select');
  const content = document.getElementById('history-content');
  content.innerHTML = `<div class="panel"><div id="history-roster-table"></div></div>`;

  table = createRosterTable(document.getElementById('history-roster-table'), {
    readOnly: true,
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

export function refreshHistoryScreen() {
  populateDropdown();
  if (currentEventId) renderEvent(currentEventId);
}
