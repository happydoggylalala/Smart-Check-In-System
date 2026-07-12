import { getState, updateState } from './state.js';
import { assignGroupSeat } from './grouping.js';
import { tryWalkinAdd } from './waitlist.js';
import { sendHandoutEmail } from './email.js';
import { recomputeEarlyBirds } from './earlybird.js';
import { t } from './i18n.js';
import { minutesBetween, nowIso, debounce, escapeHtml, formatDateTime, showToast } from './utils.js';

const STATUS_SYMBOL = { on_time: '✓', late: '⏰', absent: '✕', pending: '–' };

export function computeDisplayStatus(person, event, nowIsoStr) {
  if (person.checkin.checkedInAt) return person.checkin.status;
  if (!event.startTime) return 'pending';
  const delta = minutesBetween(event.startTime, nowIsoStr);
  if (delta > event.absentThresholdMin) return 'absent';
  return 'pending';
}

export function computeEarlyLeave(person, event) {
  if (!person.checkin.checkedOutAt || !event.endTime) return false;
  if (person.checkin.checkedOutAt >= event.endTime) return false;
  const minsBeforeEnd = minutesBetween(person.checkin.checkedOutAt, event.endTime);
  return minsBeforeEnd <= event.earlyLeaveWindowMin;
}

export function statusSymbol(status) {
  return STATUS_SYMBOL[status] ?? '–';
}
export function statusLabel(status) {
  return t(`status.${status}`) ?? status;
}

function tryCheckin(state, person, nowIsoStr) {
  if (!state.event.startTime) {
    return { ok: false, error: t('checkin.errNoStartTime') };
  }
  if (person.checkin.checkedInAt) {
    return { ok: false, error: t('checkin.errAlreadyCheckedIn') };
  }
  const delta = minutesBetween(state.event.startTime, nowIsoStr);
  if (delta > state.event.absentThresholdMin) {
    return { ok: false, error: t('checkin.errTooLate', { min: state.event.absentThresholdMin }) };
  }
  person.checkin.checkedInAt = nowIsoStr;
  person.checkin.status = delta <= state.event.lateThresholdMin ? 'on_time' : 'late';
  assignGroupSeat(person, state);
  person.lottery.eligible = true;
  recomputeEarlyBirds(state);
  return { ok: true, person };
}

function tryCheckout(state, person, nowIsoStr) {
  if (!person.checkin.checkedInAt) return { ok: false, error: t('checkin.errNotCheckedIn') };
  if (person.checkin.checkedOutAt) return { ok: false, error: t('checkin.errAlreadyCheckedOut') };
  person.checkin.checkedOutAt = nowIsoStr;
  person.earlyLeave = computeEarlyLeave(person, state.event);
  return { ok: true, person };
}

function searchRoster(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const { roster } = getState();
  return roster
    .filter(p => p.name.toLowerCase().includes(q) || (p.employeeId && p.employeeId.toLowerCase().includes(q)) || (p.email && p.email.toLowerCase().includes(q)))
    .slice(0, 30);
}

function renderResultItem(p) {
  const state = getState();
  const status = computeDisplayStatus(p, state.event, nowIso());
  const earlyLeave = computeEarlyLeave(p, state.event);
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

function renderResults(list, query) {
  const container = document.getElementById('checkin-results');
  if (!query || !query.trim()) {
    container.innerHTML = '';
    return;
  }
  if (list.length === 0) {
    const rosterEmpty = getState().roster.length === 0;
    container.innerHTML = `<p class="hint">${rosterEmpty ? t('checkin.emptyRosterHint') : t('checkin.noMatchHint')}</p>`;
    return;
  }
  container.innerHTML = list.map(renderResultItem).join('');
}

function renderConfirm(person, emailStatusText) {
  const state = getState();
  const status = person.checkin.status;
  const panel = document.getElementById('checkin-confirm');
  panel.classList.remove('hidden');
  panel.innerHTML = `
    <div class="big-status status-${status}">${statusSymbol(status)}</div>
    <div class="big-name">${escapeHtml(person.name)}</div>
    <div class="confirm-line">${t('checkin.confirmStatusLine', { status: statusLabel(status), time: formatDateTime(person.checkin.checkedInAt) })}</div>
    <div class="confirm-line">
      ${person.group.groupIndex ? t('checkin.confirmSeat', { group: person.group.groupIndex, seat: person.group.seatIndex }) : ''}
      ${person.group.seatIndex > (Number(state.event.groupSize) || 1) ? `<span class="badge badge-overflow">${t('badge.overflow')}</span>` : ''}
    </div>
    <div class="confirm-line">
      ${person.isEarlyBird ? `<span class="badge badge-earlybird">${t('badge.earlybirdBenefit')}</span>` : ''}
      ${person.checkin.waitlisted ? `<span class="badge badge-waitlist">${t('badge.waitlist')}</span>` : ''}
    </div>
    <div class="confirm-line" id="confirm-email-status">${t('checkin.emailLinePrefix')}：${emailStatusText}</div>
  `;
}

function updateConfirmEmailStatus(text) {
  const el = document.getElementById('confirm-email-status');
  if (el) el.textContent = `${t('checkin.emailLinePrefix')}：${text}`;
}

function emailStatusText(status) {
  return t(`checkin.emailStatus.${status}`) ?? status;
}

async function doCheckin(personId, onStateChanged) {
  const now = nowIso();
  let result;
  updateState(state => {
    const person = state.roster.find(p => p.id === personId);
    result = tryCheckin(state, person, now);
  });
  if (!result.ok) {
    showToast(result.error, 'error');
    return;
  }
  const person = getState().roster.find(p => p.id === personId);
  renderConfirm(person, t('checkin.emailSending'));
  onStateChanged();
  reRenderSearch();

  const emailResult = await sendHandoutEmail(person, getState().event);
  updateState(state => {
    const p = state.roster.find(x => x.id === personId);
    p.emailStatus.status = emailResult.status;
    p.emailStatus.error = emailResult.error || null;
    p.emailStatus.sentAt = emailResult.status === 'sent' ? nowIso() : null;
  });
  updateConfirmEmailStatus(emailStatusText(emailResult.status));
  onStateChanged();
}

function doCheckout(personId, onStateChanged) {
  const now = nowIso();
  let result;
  updateState(state => {
    const person = state.roster.find(p => p.id === personId);
    result = tryCheckout(state, person, now);
  });
  if (!result.ok) {
    showToast(result.error, 'error');
    return;
  }
  showToast(t('checkin.checkoutToast', {
    name: result.person.name,
    earlyTag: result.person.earlyLeave ? t('checkin.checkoutEarlyTag') : '',
  }), 'success');
  onStateChanged();
  reRenderSearch();
}

let lastQuery = '';
export function reRenderSearch() {
  if (!lastQuery) return;
  renderResults(searchRoster(lastQuery), lastQuery);
}

export function initCheckinScreen({ onStateChanged }) {
  const searchInput = document.getElementById('checkin-search');
  const resultsContainer = document.getElementById('checkin-results');
  const walkinToggle = document.getElementById('btn-open-walkin');
  const walkinForm = document.getElementById('walkin-form');
  const walkinCancel = document.getElementById('btn-walkin-cancel');
  const walkinSubmit = document.getElementById('btn-walkin-submit');

  const runSearch = debounce(() => {
    lastQuery = searchInput.value;
    renderResults(searchRoster(lastQuery), lastQuery);
  }, 200);
  searchInput.addEventListener('input', runSearch);

  resultsContainer.addEventListener('click', async e => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === 'checkin') await doCheckin(id, onStateChanged);
    else if (action === 'checkout') doCheckout(id, onStateChanged);
  });

  walkinToggle.addEventListener('click', () => walkinForm.classList.toggle('hidden'));
  walkinCancel.addEventListener('click', () => {
    walkinForm.classList.add('hidden');
    document.getElementById('walkin-name').value = '';
    document.getElementById('walkin-employeeid').value = '';
    document.getElementById('walkin-email').value = '';
  });

  walkinSubmit.addEventListener('click', async () => {
    const name = document.getElementById('walkin-name').value.trim();
    const employeeId = document.getElementById('walkin-employeeid').value.trim();
    const email = document.getElementById('walkin-email').value.trim();
    if (!name) {
      showToast(t('checkin.errNeedName'), 'error');
      return;
    }
    if (employeeId && !/^\d{6}$/.test(employeeId)) {
      showToast(t('checkin.errEmployeeIdFormat'), 'error');
      return;
    }
    const now = nowIso();
    let addResult;
    updateState(state => {
      addResult = tryWalkinAdd(state, { name, employeeId, email }, now);
    });
    if (!addResult.ok) {
      showToast(addResult.error, 'error');
      return;
    }
    walkinForm.classList.add('hidden');
    document.getElementById('walkin-name').value = '';
    document.getElementById('walkin-employeeid').value = '';
    document.getElementById('walkin-email').value = '';
    onStateChanged();
    await doCheckin(addResult.person.id, onStateChanged);
  });
}
