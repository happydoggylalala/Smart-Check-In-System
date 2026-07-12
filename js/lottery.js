import { getState, updateState } from './state.js';
import { t } from './i18n.js';
import { secureRandomInt, escapeHtml, showToast, formatDateTime } from './utils.js';

function getLotteryPool(state, excludeWinners) {
  return state.roster.filter(p => p.checkin.checkedInAt != null && (!excludeWinners || !p.lottery.won));
}

function renderPoolCount() {
  const excludeWinners = document.getElementById('lottery-exclude-winners').checked;
  const pool = getLotteryPool(getState(), excludeWinners);
  document.getElementById('lottery-pool-label').textContent = t('lottery.poolLabel', { count: pool.length });
}

function renderHistory() {
  const state = getState();
  const list = document.getElementById('lottery-history');
  const byId = Object.fromEntries(state.roster.map(p => [p.id, p]));
  list.innerHTML = state.lotteryWinnersHistory.map(id => {
    const p = byId[id];
    if (!p) return '';
    return `<li>${escapeHtml(p.name)}（${formatDateTime(p.lottery.wonAt)}）</li>`;
  }).join('') || `<li class="hint">${t('lottery.noHistory')}</li>`;
}

function drawWinner() {
  const excludeWinners = document.getElementById('lottery-exclude-winners').checked;
  const state = getState();
  const pool = getLotteryPool(state, excludeWinners);
  if (pool.length === 0) {
    showToast(t('lottery.noPool'), 'error');
    return;
  }
  const idx = secureRandomInt(pool.length);
  const winnerId = pool[idx].id;

  updateState(s => {
    const winner = s.roster.find(p => p.id === winnerId);
    winner.lottery.won = true;
    winner.lottery.wonAt = new Date().toISOString();
    s.lotteryWinnersHistory.push(winner.id);
  });

  const winner = getState().roster.find(p => p.id === winnerId);
  const banner = document.getElementById('lottery-winner-banner');
  banner.classList.remove('hidden');
  banner.innerHTML = t('lottery.congrats', { name: escapeHtml(winner.name) }) +
    (winner.group.groupIndex ? `<br><span style="font-size:18px">${t('lottery.winnerSeat', { group: winner.group.groupIndex, seat: winner.group.seatIndex })}</span>` : '');

  renderPoolCount();
  renderHistory();
}

function resetLottery() {
  if (!confirm(t('lottery.confirmReset'))) return;
  updateState(s => {
    s.roster.forEach(p => { p.lottery.won = false; p.lottery.wonAt = null; });
    s.lotteryWinnersHistory = [];
  });
  document.getElementById('lottery-winner-banner').classList.add('hidden');
  renderPoolCount();
  renderHistory();
  showToast(t('lottery.resetDone'), 'success');
}

export function renderLotteryScreen() {
  renderPoolCount();
  renderHistory();
}

export function initLotteryScreen() {
  document.getElementById('btn-draw').addEventListener('click', drawWinner);
  document.getElementById('btn-reset-lottery').addEventListener('click', resetLottery);
  document.getElementById('lottery-exclude-winners').addEventListener('change', renderPoolCount);
  renderLotteryScreen();
}
