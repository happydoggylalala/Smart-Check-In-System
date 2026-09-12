import { getEvents, addEvent, deleteEvent, setEventCancelled } from './eventsStore.js';
import { filterEvents, renderEventCardList } from './eventPicker.js';
import { deriveGroupConfig, assignGroupSeat } from './grouping.js';
import { recomputeEarlyBirds } from './earlybird.js';
import { buildDemoRoster } from './demoData.js';
import { parseFile, guessMapping, rowsToPeople, downloadCsvTemplate } from './importRoster.js';
import { MOCK_LMS_COURSES, getMockLmsCourse } from './mockOrg.js';
import { t } from './i18n.js';
import { showToast, escapeHtml, nowIso, uuid } from './utils.js';
import { showScreen, refreshSidebar } from './sidebar.js';
import { showEventInReports } from './reportsScreen.js';

let selectedRoster = null; // { key: 'full'|'lite'|'csv', people: PersonRecord[] }
let selectedLmsCourseId = null;
let onEventCreated = null;
let materialsDraft = []; // { id, title, link, description } — filled in during event creation
let lotteryPrizesDraft = []; // { id, name, quantity } — filled in during event creation

function renderBrowseList() {
  const container = document.getElementById('events-list');
  const filters = {
    query: document.getElementById('events-search').value,
    source: document.getElementById('events-filter-source').value,
    type: document.getElementById('events-filter-type').value,
    status: document.getElementById('events-filter-status').value,
  };
  const filtered = filterEvents(getEvents(), filters);
  renderEventCardList(container, filtered, {
    mode: 'manage',
    onDelete: id => {
      if (!confirm(t('eventPicker.confirmDelete'))) return;
      deleteEvent(id);
      renderBrowseList();
      showToast(t('events.deletedToast'), 'success');
    },
    onCancel: id => {
      if (!confirm(t('eventPicker.confirmCancel'))) return;
      setEventCancelled(id, true);
      renderBrowseList();
      showToast(t('events.cancelledToast'), 'success');
    },
    onSelect: id => {
      showEventInReports(id);
      showScreen('screen-reports');
    },
  });
}

function switchView(view) {
  document.getElementById('events-browse-view').classList.toggle('hidden', view !== 'browse');
  document.getElementById('events-create-view').classList.toggle('hidden', view !== 'create');
  document.querySelectorAll('#events-view-toggle button').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  if (view === 'browse') renderBrowseList();
  else resetCreateFlow();
}

function resetCreateFlow() {
  selectedRoster = null;
  selectedLmsCourseId = null;
  materialsDraft = [];
  lotteryPrizesDraft = [];
  document.getElementById('create-source-step').classList.remove('hidden');
  document.getElementById('lms-picker').classList.add('hidden');
  document.getElementById('event-form').classList.add('hidden');
  document.getElementById('event-form').reset();
  document.querySelectorAll('.roster-choice-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('ef-roster-status').textContent = '';
  document.getElementById('ef-roster-preview').innerHTML = '';
  document.querySelectorAll('#ef-name,#ef-organizer,#ef-location,#ef-date,#ef-start,#ef-end,#ef-type,#ef-format').forEach(el => { el.disabled = false; });
  document.querySelectorAll('.feature-detail').forEach(el => el.classList.add('hidden'));
  renderMaterialsDraft();
  renderLotteryPrizesDraft();
}

function toggleFeatureDetail(feature, checked) {
  document.getElementById(`ef-feat-${feature}-detail`).classList.toggle('hidden', !checked);
  if (feature === 'lottery' && checked && lotteryPrizesDraft.length === 0) {
    lotteryPrizesDraft.push({ id: uuid(), name: '', quantity: 1 });
    renderLotteryPrizesDraft();
  }
}

function renderMaterialsDraft() {
  const container = document.getElementById('ef-materials-list');
  if (materialsDraft.length === 0) {
    container.innerHTML = `<p class="hint">${t('events.materialsDraftEmpty')}</p>`;
    return;
  }
  container.innerHTML = materialsDraft.map(m => `
    <div class="draft-list-item">
      <div>
        <strong>${escapeHtml(m.title)}</strong>
        ${m.link ? ` · ${escapeHtml(m.link)}` : ''}
      </div>
      <button type="button" class="btn-danger-outline" data-id="${m.id}">${t('materials.deleteBtn')}</button>
    </div>
  `).join('');
  container.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      materialsDraft = materialsDraft.filter(m => m.id !== btn.dataset.id);
      renderMaterialsDraft();
    });
  });
}

function addMaterialDraft() {
  const title = document.getElementById('ef-mat-title').value.trim();
  const link = document.getElementById('ef-mat-link').value.trim();
  const description = document.getElementById('ef-mat-desc').value.trim();
  if (!title) return showToast(t('materials.errTitle'), 'error');
  materialsDraft.push({ id: uuid(), title, link, description, createdAt: nowIso() });
  document.getElementById('ef-mat-title').value = '';
  document.getElementById('ef-mat-link').value = '';
  document.getElementById('ef-mat-desc').value = '';
  renderMaterialsDraft();
}

function renderLotteryPrizesDraft() {
  const container = document.getElementById('ef-lottery-prize-rows');
  container.innerHTML = lotteryPrizesDraft.map((p, index) => `
    <div class="prize-row">
      <label><span>${t('lottery.fieldPrizeName')} ${index + 1}</span><input type="text" data-field="name" data-id="${p.id}" value="${escapeHtml(p.name)}"></label>
      <label><span>${t('lottery.fieldPrizeQuantity')}</span><input type="number" min="1" data-field="quantity" data-id="${p.id}" value="${p.quantity}"></label>
      ${lotteryPrizesDraft.length > 1 ? `<button type="button" class="prize-remove" data-remove-id="${p.id}" aria-label="${t('lottery.removePrizeBtn')}">✕</button>` : '<span></span>'}
    </div>
  `).join('');
  container.querySelectorAll('input[data-field]').forEach(input => {
    input.addEventListener('input', () => {
      const prize = lotteryPrizesDraft.find(p => p.id === input.dataset.id);
      if (!prize) return;
      if (input.dataset.field === 'name') prize.name = input.value;
      else prize.quantity = Number(input.value) || 1;
    });
  });
  container.querySelectorAll('button[data-remove-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      lotteryPrizesDraft = lotteryPrizesDraft.filter(p => p.id !== btn.dataset.removeId);
      renderLotteryPrizesDraft();
    });
  });
}

function addLotteryPrizeDraft() {
  lotteryPrizesDraft.push({ id: uuid(), name: '', quantity: 1 });
  renderLotteryPrizesDraft();
}

function renderLmsCourseList() {
  const container = document.getElementById('lms-course-list');
  container.innerHTML = MOCK_LMS_COURSES.map(c => `
    <div class="lms-course-item" data-id="${c.id}">
      <div>
        <strong>${escapeHtml(c.name)}</strong>
        <div class="hint">${escapeHtml(c.department)} · ${escapeHtml(c.date)} ${escapeHtml(c.startTime)}-${escapeHtml(c.endTime)} · ${escapeHtml(c.location)}</div>
      </div>
      <span class="hint">👥 ${c.capacity}</span>
    </div>
  `).join('');
  container.querySelectorAll('.lms-course-item').forEach(item => {
    item.addEventListener('click', () => selectLmsCourse(item.dataset.id));
  });
}

function selectLmsCourse(id) {
  const course = getMockLmsCourse(id);
  if (!course) return;
  selectedLmsCourseId = id;
  document.getElementById('lms-picker').classList.add('hidden');
  document.getElementById('event-form').classList.remove('hidden');

  document.getElementById('ef-name').value = course.name;
  document.getElementById('ef-organizer').value = course.department;
  document.getElementById('ef-capacity').value = course.capacity;
  document.getElementById('ef-date').value = course.date;
  document.getElementById('ef-start').value = course.startTime;
  document.getElementById('ef-end').value = course.endTime;
  document.getElementById('ef-location').value = course.location;
  document.getElementById('ef-type').value = course.type;
  document.querySelectorAll('#ef-name,#ef-organizer,#ef-location,#ef-date,#ef-start,#ef-end,#ef-type').forEach(el => { el.disabled = true; });
}

function selectRosterCard(key) {
  document.querySelectorAll('.roster-choice-card').forEach(c => c.classList.toggle('selected', c.dataset.roster === key));
  const statusEl = document.getElementById('ef-roster-status');
  const previewEl = document.getElementById('ef-roster-preview');

  if (key === 'csv') {
    document.getElementById('ef-csv-file').click();
    return;
  }

  const startIso = buildStartIso();
  const endIso = buildEndIso();
  const people = buildDemoRoster(startIso, endIso, key);
  selectedRoster = { key, people };
  const labelKey = key === 'full' ? 'events.rosterMockFull' : 'events.rosterMockLite';
  statusEl.textContent = t('events.rosterSelected', { label: t(labelKey), count: people.length });
  previewEl.innerHTML = '';
}

async function handleCsvFile(file) {
  try {
    const rows = await parseFile(file);
    if (rows.length === 0) {
      showToast(t('import.noData'), 'error');
      return;
    }
    const headers = Object.keys(rows[0]);
    const mapping = guessMapping(headers);
    const people = rowsToPeople(rows, mapping, 'import');
    selectedRoster = { key: 'csv', people };
    document.querySelectorAll('.roster-choice-card').forEach(c => c.classList.toggle('selected', c.dataset.roster === 'csv'));
    document.getElementById('ef-roster-status').textContent = t('events.rosterSelected', { label: t('events.rosterCsv'), count: people.length });
  } catch (err) {
    showToast(t('import.parseFail', { msg: err.message }), 'error');
  }
}

function buildStartIso() {
  const date = document.getElementById('ef-date').value;
  const time = document.getElementById('ef-start').value;
  if (!date || !time) return null;
  return new Date(`${date}T${time}:00`).toISOString();
}
function buildEndIso() {
  const date = document.getElementById('ef-date').value;
  const time = document.getElementById('ef-end').value;
  if (!date || !time) return null;
  return new Date(`${date}T${time}:00`).toISOString();
}

function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('ef-name').value.trim();
  const organizer = document.getElementById('ef-organizer').value.trim();
  const location = document.getElementById('ef-location').value.trim();
  const startTime = buildStartIso();
  const endTime = buildEndIso();

  if (!name) return showToast(t('events.errName'), 'error');
  if (!organizer) return showToast(t('events.errOrganizer'), 'error');
  if (!location) return showToast(t('events.errLocation'), 'error');
  if (!startTime || !endTime) return showToast(t('events.errDate'), 'error');
  if (!selectedRoster) return showToast(t('events.errRoster'), 'error');

  const groupingEnabled = document.getElementById('ef-grouping').checked;
  const { groupCount, groupSize } = deriveGroupConfig(selectedRoster.people.length, groupingEnabled);
  const earlyBirdFeatureOn = document.getElementById('ef-feat-earlyBird').checked;
  const earlyBirdCountInput = Number(document.getElementById('ef-earlybird-count').value);
  const earlyBirdCount = earlyBirdFeatureOn && earlyBirdCountInput > 0
    ? earlyBirdCountInput
    : Math.max(1, Math.round(selectedRoster.people.length / 4));

  // 模擬名單裡已預先「報到」的示範資料，在活動正式建立前就先算好分組配位與
  // 早鳥資格——這裡的計算結果會直接包在 addEvent() 的單次寫入裡一起存進
  // localStorage，避免「先建立活動、再事後補跑邏輯」導致補跑的結果沒被存到
  // （state.js 的 persist() 只在每次 updateState 呼叫時執行一次）。
  const roster = selectedRoster.people;
  const groupAssignState = { groupCount, nextAssignSeq: 1 };
  roster
    .filter(p => p.checkin.checkedInAt)
    .sort((a, b) => new Date(a.checkin.checkedInAt) - new Date(b.checkin.checkedInAt))
    .forEach(p => assignGroupSeat(p, groupAssignState));
  recomputeEarlyBirds({ roster, earlyBirdCount });

  const event = addEvent({
    name, organizer, location,
    type: document.getElementById('ef-type').value,
    format: document.getElementById('ef-format').value,
    source: selectedLmsCourseId ? 'lms' : 'self',
    lmsCourseId: selectedLmsCourseId,
    capacity: Number(document.getElementById('ef-capacity').value) || selectedRoster.people.length,
    startTime, endTime,
    groupingEnabled, groupCount, groupSize,
    features: {
      materials: document.getElementById('ef-feat-materials').checked,
      survey: document.getElementById('ef-feat-survey').checked,
      earlyBird: document.getElementById('ef-feat-earlyBird').checked,
      lottery: document.getElementById('ef-feat-lottery').checked,
    },
    earlyBirdCount,
    roster,
    nextAssignSeq: groupAssignState.nextAssignSeq,
    materials: document.getElementById('ef-feat-materials').checked ? materialsDraft : [],
    survey: { link: document.getElementById('ef-feat-survey').checked ? document.getElementById('ef-survey-link').value.trim() : '', sentAt: null },
    earlyBirdPrizeName: earlyBirdFeatureOn ? document.getElementById('ef-earlybird-prize').value.trim() : '',
    lotteryPrizes: document.getElementById('ef-feat-lottery').checked
      ? lotteryPrizesDraft.filter(p => p.name.trim()).map(p => ({ id: p.id, name: p.name.trim(), quantity: Math.max(1, Number(p.quantity) || 1), drawnCount: 0 }))
      : [],
    updatedAt: nowIso(),
  });

  showToast(t('events.createdToast'), 'success');
  switchView('browse');
  refreshSidebar();
  onEventCreated && onEventCreated();
}

export function initEventsScreen({ onEventChanged } = {}) {
  onEventCreated = onEventChanged;

  document.querySelectorAll('#events-view-toggle button').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  ['events-search', 'events-filter-source', 'events-filter-type', 'events-filter-status'].forEach(id => {
    document.getElementById(id).addEventListener('input', renderBrowseList);
    document.getElementById(id).addEventListener('change', renderBrowseList);
  });

  document.getElementById('option-self').addEventListener('click', () => {
    document.getElementById('create-source-step').classList.add('hidden');
    document.getElementById('event-form').classList.remove('hidden');
  });
  document.getElementById('option-lms').addEventListener('click', () => {
    document.getElementById('create-source-step').classList.add('hidden');
    renderLmsCourseList();
    document.getElementById('lms-picker').classList.remove('hidden');
  });

  document.querySelectorAll('.roster-choice-card').forEach(card => {
    card.addEventListener('click', () => selectRosterCard(card.dataset.roster));
  });
  document.getElementById('ef-csv-file').addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) handleCsvFile(file);
  });

  document.getElementById('event-form').addEventListener('submit', handleSubmit);

  ['materials', 'survey', 'earlyBird', 'lottery'].forEach(feature => {
    document.getElementById(`ef-feat-${feature}`).addEventListener('change', e => {
      toggleFeatureDetail(feature, e.target.checked);
    });
  });
  document.getElementById('ef-mat-add').addEventListener('click', addMaterialDraft);
  document.getElementById('ef-lp-add').addEventListener('click', addLotteryPrizeDraft);
  renderMaterialsDraft();
  renderLotteryPrizesDraft();

  renderBrowseList();
}

export { downloadCsvTemplate };
export { renderBrowseList as refreshEventsScreen };
