import { getEventById, updateEvent } from './eventsStore.js';
import { getActiveEventId, onSessionChange } from './session.js';
import { t } from './i18n.js';
import { secureRandomInt, escapeHtml, showToast, formatDateTime } from './utils.js';

function getLotteryPool(event, excludeWinners) {
  return event.roster.filter(p => p.checkin.checkedInAt != null && (!excludeWinners || !p.lottery.won));
}

function renderContentShell() {
  const content = document.getElementById('lottery-content');
  content.innerHTML = `
    <div class="panel lottery-panel">
      <p id="lottery-pool-label"></p>
      <label><input type="checkbox" id="lottery-exclude-winners" checked> ${t('lottery.excludeWinners')}</label>
      <div class="form-actions">
        <button id="btn-draw" class="btn-primary btn-big">${t('lottery.drawBtn')}</button>
        <button id="btn-reset-lottery" class="btn-ghost">${t('lottery.resetBtn')}</button>
      </div>
    </div>
    <div id="lottery-winner-banner" class="winner-banner hidden"></div>
    <div class="panel">
      <h3>${t('lottery.historyHeading')}</h3>
      <ol id="lottery-history"></ol>
    </div>
  `;
}

function renderPoolCount() {
  const event = getEventById(getActiveEventId());
  const excludeWinners = document.getElementById('lottery-exclude-winners').checked;
  const pool = getLotteryPool(event, excludeWinners);
  document.getElementById('lottery-pool-label').textContent = t('lottery.poolLabel', { count: pool.length });
}

function renderHistory() {
  const event = getEventById(getActiveEventId());
  const list = document.getElementById('lottery-history');
  const byId = Object.fromEntries(event.roster.map(p => [p.id, p]));
  list.innerHTML = event.lotteryWinnersHistory.map(id => {
    const p = byId[id];
    if (!p) return '';
    return `<li>${escapeHtml(p.name)}（${formatDateTime(p.lottery.wonAt)}）</li>`;
  }).join('') || `<li class="hint">${t('lottery.noHistory')}</li>`;
}

function drawWinner() {
  const eventId = getActiveEventId();
  const excludeWinners = document.getElementById('lottery-exclude-winners').checked;
  const event = getEventById(eventId);
  const pool = getLotteryPool(event, excludeWinners);
  if (pool.length === 0) {
    showToast(t('lottery.noPool'), 'error');
    return;
  }
  const winnerId = pool[secureRandomInt(pool.length)].id;

  updateEvent(eventId, ev => {
    const winner = ev.roster.find(p => p.id === winnerId);
    winner.lottery.won = true;
    winner.lottery.wonAt = new Date().toISOString();
    ev.lotteryWinnersHistory.push(winner.id);
  });

  const winner = getEventById(eventId).roster.find(p => p.id === winnerId);
  const banner = document.getElementById('lottery-winner-banner');
  banner.classList.remove('hidden');
  banner.innerHTML = t('lottery.congrats', { name: escapeHtml(winner.name) }) +
    (winner.group.groupIndex ? `<br><span style="font-size:18px">${t('lottery.winnerSeat', { group: winner.group.groupIndex, seat: winner.group.seatIndex })}</span>` : '');

  renderPoolCount();
  renderHistory();
}

function resetLottery() {
  if (!confirm(t('lottery.confirmReset'))) return;
  const eventId = getActiveEventId();
  updateEvent(eventId, ev => {
    ev.roster.forEach(p => { p.lottery.won = false; p.lottery.wonAt = null; });
    ev.lotteryWinnersHistory = [];
  });
  document.getElementById('lottery-winner-banner').classList.add('hidden');
  renderPoolCount();
  renderHistory();
  showToast(t('lottery.resetDone'), 'success');
}

function render() {
  const empty = document.getElementById('lottery-empty');
  const content = document.getElementById('lottery-content');
  const event = getEventById(getActiveEventId());

  if (!event) {
    empty.classList.remove('hidden');
    empty.querySelector('p').textContent = t('eventPicker.selectPlaceholder');
    content.classList.add('hidden');
    return;
  }
  if (!event.features.lottery) {
    empty.classList.remove('hidden');
    empty.querySelector('p').textContent = t('lotteryPage.notEnabled');
    content.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  content.classList.remove('hidden');
  renderContentShell();
  document.getElementById('btn-draw').addEventListener('click', drawWinner);
  document.getElementById('btn-reset-lottery').addEventListener('click', resetLottery);
  document.getElementById('lottery-exclude-winners').addEventListener('change', renderPoolCount);
  renderPoolCount();
  renderHistory();
}

export function initLotteryScreen() {
  onSessionChange(render);
  render();
}

export { render as refreshLotteryScreen };
