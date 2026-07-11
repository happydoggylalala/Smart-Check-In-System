import { getState, updateState } from './state.js';
import { secureRandomInt, escapeHtml, showToast, formatDateTime } from './utils.js';

function getLotteryPool(state, excludeWinners) {
  return state.roster.filter(p => p.checkin.checkedInAt != null && (!excludeWinners || !p.lottery.won));
}

function renderPoolCount() {
  const excludeWinners = document.getElementById('lottery-exclude-winners').checked;
  const pool = getLotteryPool(getState(), excludeWinners);
  document.getElementById('lottery-pool-count').textContent = pool.length;
}

function renderHistory() {
  const state = getState();
  const list = document.getElementById('lottery-history');
  const byId = Object.fromEntries(state.roster.map(p => [p.id, p]));
  list.innerHTML = state.lotteryWinnersHistory.map(id => {
    const p = byId[id];
    if (!p) return '';
    return `<li>${escapeHtml(p.name)}（${formatDateTime(p.lottery.wonAt)}）</li>`;
  }).join('') || '<li class="hint">尚無得獎紀錄</li>';
}

function drawWinner() {
  const excludeWinners = document.getElementById('lottery-exclude-winners').checked;
  const state = getState();
  const pool = getLotteryPool(state, excludeWinners);
  if (pool.length === 0) {
    showToast('目前沒有可抽獎的人員', 'error');
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
  banner.innerHTML = `🎉 恭喜 ${escapeHtml(winner.name)}！` +
    (winner.group.groupIndex ? `<br><span style="font-size:18px">第 ${winner.group.groupIndex} 組 第 ${winner.group.seatIndex} 號</span>` : '');

  renderPoolCount();
  renderHistory();
}

function resetLottery() {
  if (!confirm('確定要重置所有得獎名單嗎？此動作無法復原。')) return;
  updateState(s => {
    s.roster.forEach(p => { p.lottery.won = false; p.lottery.wonAt = null; });
    s.lotteryWinnersHistory = [];
  });
  document.getElementById('lottery-winner-banner').classList.add('hidden');
  renderPoolCount();
  renderHistory();
  showToast('已重置得獎名單', 'success');
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
