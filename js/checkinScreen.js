import { getEvents, getEventById, updateEvent, computeEventStatus } from './eventsStore.js';
import { filterEvents, renderEventCardList, renderStatusBadge, renderSourceBadge, renderFeatureChips, renderMetaRow } from './eventPicker.js';
import { getActiveEventId, setActiveEventId, clearActiveEvent, getWorkbenchMode, setWorkbenchMode, getScanMode, setScanMode, onSessionChange } from './session.js';
import { tryCheckin, tryCheckout, computeDisplayStatus, computeEarlyLeave, statusSymbol, statusLabel, searchRoster, recordActivity } from './checkinLogic.js';
import { tryWalkinAdd } from './waitlist.js';
import { sendHandoutEmail } from './email.js';
import { t } from './i18n.js';
import { escapeHtml, formatDateTime, nowIso, debounce, showToast } from './utils.js';
import { refreshSidebar } from './sidebar.js';

let onStateChanged = null;
let lastQuery = '';

// ---------- Step A: event picker ----------

function renderPickerList() {
  const container = document.getElementById('checkin-picker-list');
  const events = getEvents().filter(e => {
    const status = computeEventStatus(e);
    return status === 'ongoing' || status === 'upcoming';
  });
  const filters = {
    query: document.getElementById('checkin-picker-search').value,
    source: document.getElementById('checkin-picker-source').value,
    status: document.getElementById('checkin-picker-status').value,
  };
  const filtered = filterEvents(events, filters);
  renderEventCardList(container, filtered, {
    mode: 'pick',
    activeEventId: getActiveEventId(),
    onSelect: id => {
      setActiveEventId(id);
      renderPickerDetail();
      renderPickerList();
    },
  });
}

function renderPickerDetail() {
  const panel = document.getElementById('checkin-picker-detail');
  const event = getEventById(getActiveEventId());
  if (!event) {
    panel.classList.add('hidden');
    return;
  }
  panel.classList.remove('hidden');
  panel.innerHTML = `
    <div class="event-card-badges">${renderStatusBadge(event)}${renderSourceBadge(event)}</div>
    <h2>${escapeHtml(event.name)}</h2>
    <p class="hint">${escapeHtml(event.organizer)}</p>
    <div class="event-card-meta">${renderMetaRow(event)}</div>
    <div class="event-card-chips" style="margin-bottom:14px;">${renderFeatureChips(event)}</div>
    <button id="btn-start-checkin" class="btn-primary btn-big">📡 ${t('checkinStep.startBtn')}</button>
  `;
  document.getElementById('btn-start-checkin').addEventListener('click', () => enterWorkbench(event.id));
}

// ---------- Step B: workbench ----------

function enterWorkbench(eventId) {
  setActiveEventId(eventId);
  document.getElementById('checkin-step-picker').classList.add('hidden');
  document.getElementById('checkin-step-workbench').classList.remove('hidden');
  renderWorkbenchHeader();
  renderModeToggles();
  renderScanModePanels();
  resetScanWaiting();
  renderQuickChips();
  renderLiveFeed();
  refreshSidebar();
}

function exitWorkbench() {
  clearActiveEvent();
  document.getElementById('checkin-step-workbench').classList.add('hidden');
  document.getElementById('checkin-step-picker').classList.remove('hidden');
  document.getElementById('checkin-picker-detail').classList.add('hidden');
  renderPickerList();
  refreshSidebar();
}

function renderWorkbenchHeader() {
  const event = getEventById(getActiveEventId());
  if (!event) return;
  document.getElementById('wb-source-label').textContent = t(`eventSource.${event.source}`).toUpperCase();
  document.getElementById('wb-event-name').textContent = event.name;
  document.getElementById('wb-event-meta').innerHTML = renderMetaRow(event);
}

function renderModeToggles() {
  document.querySelectorAll('#workbench-mode-toggle button').forEach(b => b.classList.toggle('active', b.dataset.mode === getWorkbenchMode()));
  document.querySelectorAll('#scan-mode-toggle button').forEach(b => b.classList.toggle('active', b.dataset.mode === getScanMode()));
}

function renderScanModePanels() {
  const isCard = getScanMode() === 'card';
  document.getElementById('card-scan-panel').classList.toggle('hidden', !isCard);
  document.getElementById('manual-panel').classList.toggle('hidden', isCard);
  if (isCard) document.getElementById('checkin-card-input').focus();
}

function resetScanWaiting() {
  document.getElementById('scan-waiting').classList.remove('hidden');
  document.getElementById('scan-result').classList.add('hidden');
}

function renderQuickChips() {
  const event = getEventById(getActiveEventId());
  const container = document.getElementById('scan-quick-chips');
  if (!event) { container.innerHTML = ''; return; }
  // 優先顯示「這個模式下點了會有實際效果」的人：報到模式優先顯示尚未報到者，
  // 簽退模式優先顯示已報到但尚未簽退者，方便展示時不用先手動找卡號。
  const mode = getWorkbenchMode();
  const withId = event.roster.filter(p => p.employeeId);
  const relevant = mode === 'checkin'
    ? withId.filter(p => !p.checkin.checkedInAt)
    : withId.filter(p => p.checkin.checkedInAt && !p.checkin.checkedOutAt);
  const rest = withId.filter(p => !relevant.includes(p));
  const sample = [...relevant, ...rest].slice(0, 6);
  container.innerHTML = sample.map(p => `<button data-id="${escapeHtml(p.employeeId)}">${escapeHtml(p.employeeId)}</button>`).join('');
  container.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => handleCardScan(btn.dataset.id));
  });
}

function renderLiveFeed() {
  const event = getEventById(getActiveEventId());
  const container = document.getElementById('live-feed-list');
  if (!event || event.recentActivity.length === 0) {
    container.innerHTML = `<p class="live-feed-empty">${t('checkinWorkbench.liveFeedEmpty')}</p>`;
    return;
  }
  container.innerHTML = event.recentActivity.map(a => {
    const text = a.action === 'checkin'
      ? t('checkinWorkbench.feedCheckin', { name: escapeHtml(a.personName), status: statusLabel(a.resultStatus) })
      : t('checkinWorkbench.feedCheckout', { name: escapeHtml(a.personName) });
    return `<div class="live-feed-item"><span>${text}</span><span class="hint">${formatDateTime(a.at)}</span></div>`;
  }).join('');
}

// ---------- Scan / check-in actions ----------

function renderScanResult({ ok, message, person, caption }) {
  document.getElementById('scan-waiting').classList.add('hidden');
  const result = document.getElementById('scan-result');
  result.classList.remove('hidden');
  result.className = `scan-result-banner ${ok ? 'success' : 'error'}`;
  result.innerHTML = `
    <div class="scan-result-icon">${ok ? '✓' : '✕'}</div>
    <div class="scan-result-caption">${caption}</div>
    <div class="scan-result-text">${message}</div>
    ${person ? `<div class="scan-result-person">${escapeHtml(person.name)} · ${escapeHtml(person.employeeId || '')}</div>` : ''}
    <button id="btn-scan-result-close" class="btn-secondary">${t('checkinWorkbench.resultCloseBtn')}</button>
  `;
  document.getElementById('btn-scan-result-close').addEventListener('click', () => {
    resetScanWaiting();
    if (getScanMode() === 'card') document.getElementById('checkin-card-input').focus();
  });
}

async function performCheckin(personId) {
  const eventId = getActiveEventId();
  const now = nowIso();
  let result;
  let updatedPerson;
  updateEvent(eventId, event => {
    const p = event.roster.find(x => x.id === personId);
    result = tryCheckin(event, p, now);
    if (result.ok) {
      recordActivity(event, p, 'checkin', p.checkin.status);
      updatedPerson = p;
    }
  });
  onStateChanged && onStateChanged();
  renderLiveFeed();
  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  const emailResult = await sendHandoutEmail(updatedPerson, getEventById(eventId));
  updateEvent(eventId, event => {
    const p = event.roster.find(x => x.id === personId);
    p.emailStatus.status = emailResult.status;
    p.emailStatus.error = emailResult.error || null;
    p.emailStatus.sentAt = emailResult.status === 'sent' ? nowIso() : null;
  });
  onStateChanged && onStateChanged();
  return { ok: true, person: updatedPerson };
}

function performCheckout(personId) {
  const eventId = getActiveEventId();
  const now = nowIso();
  let result;
  let updatedPerson;
  updateEvent(eventId, event => {
    const p = event.roster.find(x => x.id === personId);
    result = tryCheckout(event, p, now);
    if (result.ok) {
      recordActivity(event, p, 'checkout', p.checkin.status);
      updatedPerson = p;
    }
  });
  onStateChanged && onStateChanged();
  renderLiveFeed();
  return result.ok ? { ok: true, person: updatedPerson } : { ok: false, error: result.error };
}

async function handleCardScan(rawValue) {
  const cardId = String(rawValue || '').replace(/[\r\n]/g, '').trim();
  if (!cardId) return;
  const event = getEventById(getActiveEventId());
  const person = event?.roster.find(p => p.employeeId === cardId);
  const mode = getWorkbenchMode();
  const captionKey = mode === 'checkin' ? 'checkinWorkbench.modeCheckin' : 'checkinWorkbench.modeCheckout';

  if (!person) {
    renderScanResult({ ok: false, message: t('checkin.cardNotFound', { id: cardId }), caption: t(captionKey) });
    return;
  }

  if (mode === 'checkin') {
    const result = await performCheckin(person.id);
    if (result.ok) {
      renderScanResult({ ok: true, message: t('checkinWorkbench.resultSuccess'), person: result.person, caption: t(captionKey) });
    } else {
      renderScanResult({ ok: false, message: result.error, person, caption: t(captionKey) });
    }
  } else {
    const result = performCheckout(person.id);
    if (result.ok) {
      renderScanResult({ ok: true, message: t('checkinWorkbench.resultCheckoutSuccess'), person: result.person, caption: t(captionKey) });
    } else {
      renderScanResult({ ok: false, message: result.error, person, caption: t(captionKey) });
    }
  }
  renderQuickChips();
}

// ---------- Manual mode ----------

function renderManualResultItem(p) {
  const event = getEventById(getActiveEventId());
  const now = nowIso();
  const status = computeDisplayStatus(p, event, now);
  const earlyLeave = computeEarlyLeave(p, event);
  const badges = [
    p.isEarlyBird ? `<span class="badge badge-earlybird">${t('badge.earlybird')}</span>` : '',
    p.checkin.waitlisted ? `<span class="badge badge-waitlist">${t('badge.waitlist')}</span>` : '',
  ].join('');

  let actionHtml = '';
  if (!p.checkin.checkedInAt) {
    actionHtml = `<button class="btn-primary" data-action="checkin" data-id="${p.id}">${t('checkin.actionCheckin')}</button>`;
  } else if (!p.checkin.checkedOutAt) {
    actionHtml = `<button class="btn-secondary" data-action="checkout" data-id="${p.id}">${t('checkin.actionCheckout')}</button>`;
  } else {
    actionHtml = `<span class="hint">${t('checkin.doneCheckedOut')}</span>`;
  }

  return `
    <div class="result-item">
      <div>
        <strong>${escapeHtml(p.name)}</strong>
        <span class="status-symbol status-${status}">${statusSymbol(status)} ${statusLabel(status)}</span>
        ${earlyLeave ? `<span class="overlay-earlyleave">${t('checkin.earlyLeaveTag')}</span>` : ''}
        ${badges}
        <div class="meta">${escapeHtml(p.employeeId || '')} ${p.email ? '· ' + escapeHtml(p.email) : ''}</div>
      </div>
      ${actionHtml}
    </div>
  `;
}

function renderManualResults() {
  const container = document.getElementById('checkin-results');
  const event = getEventById(getActiveEventId());
  if (!lastQuery || !lastQuery.trim()) {
    container.innerHTML = '';
    return;
  }
  const list = searchRoster(event, lastQuery);
  if (list.length === 0) {
    const rosterEmpty = !event || event.roster.length === 0;
    container.innerHTML = `<p class="hint">${rosterEmpty ? t('checkin.emptyRosterHint') : t('checkin.noMatchHint')}</p>`;
    return;
  }
  container.innerHTML = list.map(renderManualResultItem).join('');
}

// ---------- Init ----------

export function initCheckinScreen({ onStateChanged: onChanged } = {}) {
  onStateChanged = onChanged;

  ['checkin-picker-search', 'checkin-picker-source', 'checkin-picker-status'].forEach(id => {
    document.getElementById(id).addEventListener('input', renderPickerList);
    document.getElementById(id).addEventListener('change', renderPickerList);
  });

  document.getElementById('btn-back-to-picker').addEventListener('click', exitWorkbench);

  document.querySelectorAll('#workbench-mode-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      setWorkbenchMode(btn.dataset.mode);
      renderModeToggles();
      resetScanWaiting();
      renderQuickChips();
      renderManualResults();
    });
  });
  document.querySelectorAll('#scan-mode-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      setScanMode(btn.dataset.mode);
      renderModeToggles();
      renderScanModePanels();
      resetScanWaiting();
    });
  });

  const cardInput = document.getElementById('checkin-card-input');
  cardInput.addEventListener('keydown', async e => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const value = cardInput.value;
    cardInput.value = '';
    await handleCardScan(value);
    cardInput.focus();
  });

  const searchInput = document.getElementById('checkin-search');
  const runSearch = debounce(() => {
    lastQuery = searchInput.value;
    renderManualResults();
  }, 200);
  searchInput.addEventListener('input', runSearch);

  document.getElementById('checkin-results').addEventListener('click', async e => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === 'checkin') {
      const result = await performCheckin(id);
      if (!result.ok) showToast(result.error, 'error');
      else showToast(t('checkinWorkbench.resultSuccess'), 'success');
      renderManualResults();
      renderQuickChips();
    } else if (action === 'checkout') {
      const result = performCheckout(id);
      if (!result.ok) showToast(result.error, 'error');
      else showToast(t('checkinWorkbench.resultCheckoutSuccess'), 'success');
      renderManualResults();
      renderQuickChips();
    }
  });

  const walkinForm = document.getElementById('walkin-form');
  document.getElementById('btn-open-walkin').addEventListener('click', () => walkinForm.classList.toggle('hidden'));
  document.getElementById('btn-walkin-cancel').addEventListener('click', () => {
    walkinForm.classList.add('hidden');
    document.getElementById('walkin-name').value = '';
    document.getElementById('walkin-employeeid').value = '';
    document.getElementById('walkin-email').value = '';
  });
  document.getElementById('btn-walkin-submit').addEventListener('click', async () => {
    const name = document.getElementById('walkin-name').value.trim();
    const employeeId = document.getElementById('walkin-employeeid').value.trim();
    const email = document.getElementById('walkin-email').value.trim();
    if (!name) return showToast(t('checkin.errNeedName'), 'error');
    if (employeeId && !/^\d{6}$/.test(employeeId)) return showToast(t('checkin.errEmployeeIdFormat'), 'error');

    const eventId = getActiveEventId();
    let addResult;
    updateEvent(eventId, event => {
      addResult = tryWalkinAdd(event, { name, employeeId, email }, nowIso());
    });
    if (!addResult.ok) return showToast(addResult.error, 'error');

    walkinForm.classList.add('hidden');
    document.getElementById('walkin-name').value = '';
    document.getElementById('walkin-employeeid').value = '';
    document.getElementById('walkin-email').value = '';
    onStateChanged && onStateChanged();

    const result = await performCheckin(addResult.person.id);
    if (result.ok) showToast(t('checkinWorkbench.resultSuccess'), 'success');
    renderManualResults();
    renderQuickChips();
  });

  onSessionChange(() => renderManualResults());

  renderPickerList();
}

export function refreshCheckinScreen() {
  renderPickerList();
  if (!document.getElementById('checkin-picker-detail').classList.contains('hidden')) {
    renderPickerDetail();
  }
  if (!document.getElementById('checkin-step-workbench').classList.contains('hidden')) {
    renderWorkbenchHeader();
    renderQuickChips();
    renderLiveFeed();
    renderManualResults();
  }
}
