import { getEventById, updateEvent } from './eventsStore.js';
import { getActiveEventId, onSessionChange } from './session.js';
import { t } from './i18n.js';
import { secureRandomInt, escapeHtml, showToast, formatDateTime, uuid, nowIso } from './utils.js';

let selectedPrizeId = null;

function getLotteryPool(event, excludeWinners) {
  return event.roster.filter(p => p.checkin.checkedInAt != null && (!excludeWinners || !p.lottery.won));
}

function renderContentShell() {
  const content = document.getElementById('lottery-content');
  content.innerHTML = `
    <div class="panel">
      <h3>${t('lottery.managePrizesHeading')}</h3>
      <div id="lottery-prize-manage-list"></div>
      <button id="lot-prize-add" type="button" class="btn-secondary add-prize-button">${t('lottery.addPrizeBtn')}</button>
    </div>
    <div class="panel lottery-panel">
      <label><span>${t('lottery.selectPrizeLabel')}</span>
        <select id="lottery-prize-select"></select>
      </label>
      <p id="lottery-prize-progress" class="hint"></p>
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

function renderPrizeManageList(event) {
  const container = document.getElementById('lottery-prize-manage-list');
  const eventId = event.id;
  container.innerHTML = event.lotteryPrizes.map((p, index) => `
    <div class="prize-row">
      <label><span>${t('lottery.fieldPrizeName')} ${index + 1}</span><input type="text" data-field="name" data-id="${p.id}" value="${escapeHtml(p.name)}"></label>
      <label><span>${t('lottery.fieldPrizeQuantity')} · ${t('lottery.prizeProgress', { drawn: p.drawnCount, quantity: p.quantity })}</span><input type="number" min="1" data-field="quantity" data-id="${p.id}" value="${p.quantity}"></label>
      ${event.lotteryPrizes.length > 1 ? `<button type="button" class="prize-remove" data-remove-id="${p.id}" aria-label="${t('lottery.removePrizeBtn')}">✕</button>` : '<span></span>'}
    </div>
  `).join('') || `<p class="hint">${t('lottery.noPrizesYet')}</p>`;
  container.querySelectorAll('input[data-field]').forEach(input => {
    input.addEventListener('change', () => {
      updateEvent(eventId, ev => {
        const prize = ev.lotteryPrizes.find(p => p.id === input.dataset.id);
        if (!prize) return;
        if (input.dataset.field === 'name') prize.name = input.value.trim();
        else prize.quantity = Math.max(prize.drawnCount, 1, Number(input.value) || 1);
      });
      render();
    });
  });
  container.querySelectorAll('button[data-remove-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      updateEvent(eventId, ev => { ev.lotteryPrizes = ev.lotteryPrizes.filter(p => p.id !== btn.dataset.removeId); });
      render();
    });
  });
}

function populatePrizeSelect(event) {
  const select = document.getElementById('lottery-prize-select');
  if (event.lotteryPrizes.length === 0) {
    select.innerHTML = `<option value="">${t('lottery.noPrizesYet')}</option>`;
    selectedPrizeId = null;
    return;
  }
  select.innerHTML = event.lotteryPrizes.map(p => `<option value="${p.id}">${escapeHtml(p.name)} (${p.drawnCount}/${p.quantity})</option>`).join('');
  if (!event.lotteryPrizes.some(p => p.id === selectedPrizeId)) {
    selectedPrizeId = event.lotteryPrizes[0].id;
  }
  select.value = selectedPrizeId;
  select.addEventListener('change', () => {
    selectedPrizeId = select.value;
    renderPrizeProgress(event);
  });
}

function renderPrizeProgress(event) {
  const prize = event.lotteryPrizes.find(p => p.id === selectedPrizeId);
  document.getElementById('lottery-prize-progress').textContent = prize
    ? t('lottery.prizeProgress', { drawn: prize.drawnCount, quantity: prize.quantity })
    : '';
}

function renderPoolCount() {
  const event = getEventById(getActiveEventId());
  const excludeWinners = document.getElementById('lottery-exclude-winners').checked;
  const pool = getLotteryPool(event, excludeWinners);
  document.getElementById('lottery-pool-label').textContent = t('lottery.poolLabel', { count: pool.length });
}

function renderHistory(event) {
  const list = document.getElementById('lottery-history');
  const byId = Object.fromEntries(event.roster.map(p => [p.id, p]));
  list.innerHTML = event.lotteryWinnersHistory.map(entry => {
    const p = byId[entry.personId];
    if (!p) return '';
    return `<li>${escapeHtml(p.name)} — ${escapeHtml(entry.prizeName)}（${formatDateTime(entry.wonAt)}）</li>`;
  }).join('') || `<li class="hint">${t('lottery.noHistory')}</li>`;
}

function addPrize() {
  const prize = { id: uuid(), name: '', quantity: 1, drawnCount: 0 };
  updateEvent(getActiveEventId(), ev => { ev.lotteryPrizes.push(prize); });
  selectedPrizeId = prize.id;
  render();
}

function drawWinner() {
  const eventId = getActiveEventId();
  const event = getEventById(eventId);
  const prize = event.lotteryPrizes.find(p => p.id === selectedPrizeId);
  if (!prize) return showToast(t('lottery.noPrizeSelected'), 'error');
  if (prize.drawnCount >= prize.quantity) return showToast(t('lottery.prizeSoldOut'), 'error');

  const excludeWinners = document.getElementById('lottery-exclude-winners').checked;
  const pool = getLotteryPool(event, excludeWinners);
  if (pool.length === 0) {
    showToast(t('lottery.noPool'), 'error');
    return;
  }
  const winnerId = pool[secureRandomInt(pool.length)].id;

  updateEvent(eventId, ev => {
    const winner = ev.roster.find(p => p.id === winnerId);
    winner.lottery.won = true;
    winner.lottery.wonAt = nowIso();
    ev.lotteryPrizes.find(p => p.id === prize.id).drawnCount += 1;
    ev.lotteryWinnersHistory.push({ id: uuid(), personId: winnerId, prizeId: prize.id, prizeName: prize.name, wonAt: nowIso() });
  });

  const winner = getEventById(eventId).roster.find(p => p.id === winnerId);
  render();

  const banner = document.getElementById('lottery-winner-banner');
  banner.classList.remove('hidden');
  banner.innerHTML = t('lottery.congrats', { name: escapeHtml(winner.name) }) +
    `<br><span style="font-size:16px">${escapeHtml(t('lottery.wonPrizeLabel'))}：${escapeHtml(prize.name)}</span>` +
    (winner.group.groupIndex ? `<br><span style="font-size:18px">${t('lottery.winnerSeat', { group: winner.group.groupIndex, seat: winner.group.seatIndex })}</span>` : '');
}

function resetLottery() {
  if (!confirm(t('lottery.confirmReset'))) return;
  updateEvent(getActiveEventId(), ev => {
    ev.roster.forEach(p => { p.lottery.won = false; p.lottery.wonAt = null; });
    ev.lotteryWinnersHistory = [];
    ev.lotteryPrizes.forEach(p => { p.drawnCount = 0; });
  });
  render();
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
  renderPrizeManageList(event);
  populatePrizeSelect(event);
  document.getElementById('lot-prize-add').addEventListener('click', addPrize);
  document.getElementById('btn-draw').addEventListener('click', drawWinner);
  document.getElementById('btn-reset-lottery').addEventListener('click', resetLottery);
  document.getElementById('lottery-exclude-winners').addEventListener('change', renderPoolCount);
  renderPoolCount();
  renderPrizeProgress(event);
  renderHistory(event);
}

export function initLotteryScreen() {
  onSessionChange(render);
  render();
}

export { render as refreshLotteryScreen };
