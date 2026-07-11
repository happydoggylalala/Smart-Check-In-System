import { getState, updateState } from './state.js';
import { assignGroupSeat } from './grouping.js';
import { tryWalkinAdd } from './waitlist.js';
import { sendHandoutEmail } from './email.js';
import { minutesBetween, nowIso, debounce, escapeHtml, formatDateTime, showToast } from './utils.js';

const STATUS_SYMBOL = { on_time: '✓', late: '⏰', absent: '✕', pending: '–' };
const STATUS_LABEL = { on_time: '準時', late: '遲到', absent: '未到', pending: '尚未報到' };

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
  return STATUS_LABEL[status] ?? status;
}

function tryCheckin(state, person, nowIsoStr) {
  if (!state.event.startTime) {
    return { ok: false, error: '尚未設定活動開始時間，請先至「設定」頁配置活動資訊' };
  }
  if (person.checkin.checkedInAt) {
    return { ok: false, error: '此人已報到過' };
  }
  const delta = minutesBetween(state.event.startTime, nowIsoStr);
  if (delta > state.event.absentThresholdMin) {
    return { ok: false, error: `已超過報到時間（活動開始 ${state.event.absentThresholdMin} 分鐘後），無法報到，狀態將標記為未到` };
  }
  person.checkin.checkedInAt = nowIsoStr;
  person.checkin.status = delta <= state.event.lateThresholdMin ? 'on_time' : 'late';
  assignGroupSeat(person, state);
  person.lottery.eligible = true;
  return { ok: true, person };
}

function tryCheckout(state, person, nowIsoStr) {
  if (!person.checkin.checkedInAt) return { ok: false, error: '尚未報到，無法簽退' };
  if (person.checkin.checkedOutAt) return { ok: false, error: '已經簽退過' };
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
    p.isEarlyBird ? '<span class="badge badge-earlybird">早鳥</span>' : '',
    p.checkin.waitlisted ? '<span class="badge badge-waitlist">現場候補</span>' : '',
  ].join('');

  let actionHtml = '';
  if (!p.checkin.checkedInAt) {
    actionHtml = `<button class="btn-primary" data-action="checkin" data-id="${p.id}">報到</button>`;
  } else if (!p.checkin.checkedOutAt) {
    actionHtml = `<button class="btn-secondary" data-action="checkout" data-id="${p.id}">簽退</button>`;
  } else {
    actionHtml = `<span class="hint">已完成簽退</span>`;
  }

  return `
    <div class="result-item">
      <div>
        <strong>${escapeHtml(p.name)}</strong>
        <span class="status-symbol status-${status}">${statusSymbol(status)} ${statusLabel(status)}</span>
        ${earlyLeave ? '<span class="overlay-earlyleave">⚠ 早退</span>' : ''}
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
    container.innerHTML = `<p class="hint">${rosterEmpty
      ? '目前名單是空的，請先到「名單匯入」頁上傳名單，或使用下方「找不到？現場報到」登記。'
      : '查無符合的人員，請確認姓名/工號是否正確，或使用下方「找不到？現場報到」登記。'}</p>`;
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
    <div class="confirm-line">狀態：${statusLabel(status)}　報到時間：${formatDateTime(person.checkin.checkedInAt)}</div>
    <div class="confirm-line">
      ${person.group.groupIndex ? `座位：第 ${person.group.groupIndex} 組 第 ${person.group.seatIndex} 號` : ''}
      ${person.group.seatIndex > (Number(state.event.groupSize) || 1) ? '<span class="badge badge-overflow">超出原座位規劃</span>' : ''}
    </div>
    <div class="confirm-line">
      ${person.isEarlyBird ? '<span class="badge badge-earlybird">早鳥福利</span>' : ''}
      ${person.checkin.waitlisted ? '<span class="badge badge-waitlist">現場候補</span>' : ''}
    </div>
    <div class="confirm-line" id="confirm-email-status">講義 Email：${emailStatusText}</div>
  `;
}

function updateConfirmEmailStatus(text) {
  const el = document.getElementById('confirm-email-status');
  if (el) el.textContent = `講義 Email：${text}`;
}

const EMAIL_STATUS_TEXT = {
  sent: '已寄出 ✓',
  failed: '寄送失敗',
  skipped_no_email: '無 Email，略過',
  skipped_not_configured: '未設定寄信服務，略過',
};

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
  renderConfirm(person, '寄送中...');
  onStateChanged();
  reRenderSearch();

  const emailResult = await sendHandoutEmail(person, getState().event);
  updateState(state => {
    const p = state.roster.find(x => x.id === personId);
    p.emailStatus.status = emailResult.status;
    p.emailStatus.error = emailResult.error || null;
    p.emailStatus.sentAt = emailResult.status === 'sent' ? nowIso() : null;
  });
  updateConfirmEmailStatus(EMAIL_STATUS_TEXT[emailResult.status] || emailResult.status);
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
  showToast(`${result.person.name} 已簽退${result.person.earlyLeave ? '（早退 ⚠）' : ''}`, 'success');
  onStateChanged();
  reRenderSearch();
}

let lastQuery = '';
function reRenderSearch() {
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
      showToast('請輸入姓名', 'error');
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
