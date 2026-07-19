import { getEventById, updateEvent } from './eventsStore.js';
import { getActiveEventId, onSessionChange } from './session.js';
import { computeDisplayStatus, statusLabel } from './checkinLogic.js';
import { t } from './i18n.js';
import { escapeHtml, formatDateTime, nowIso, showToast } from './utils.js';

function grantOne(eventId, personId) {
  updateEvent(eventId, ev => {
    const p = ev.roster.find(x => x.id === personId);
    if (p && p.isEarlyBird && !p.earlyBirdGranted) {
      p.earlyBirdGranted = true;
      p.earlyBirdGrantedAt = nowIso();
    }
  });
  render();
}

function grantAll(eventId) {
  const event = getEventById(eventId);
  const targets = event.roster.filter(p => p.isEarlyBird && !p.earlyBirdGranted);
  if (targets.length === 0) {
    showToast(t('earlybirdPage.noneToGrant'), 'error');
    return;
  }
  updateEvent(eventId, ev => {
    ev.roster.forEach(p => {
      if (p.isEarlyBird && !p.earlyBirdGranted) {
        p.earlyBirdGranted = true;
        p.earlyBirdGrantedAt = nowIso();
      }
    });
  });
  showToast(t('earlybirdPage.grantedAllToast', { count: targets.length }), 'success');
  render();
}

function render() {
  const empty = document.getElementById('earlybird-empty');
  const content = document.getElementById('earlybird-content');
  const eventId = getActiveEventId();
  const event = getEventById(eventId);

  if (!event) {
    empty.classList.remove('hidden');
    empty.querySelector('p').textContent = t('eventPicker.selectPlaceholder');
    content.classList.add('hidden');
    return;
  }
  if (!event.features.earlyBird) {
    empty.classList.remove('hidden');
    empty.querySelector('p').textContent = t('earlybirdPage.notEnabled');
    content.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  content.classList.remove('hidden');

  const sorted = [...event.roster].sort((a, b) => new Date(a.registeredAt) - new Date(b.registeredAt));
  const n = Number(event.earlyBirdCount) || 0;
  const now = nowIso();
  const grantedCount = event.roster.filter(p => p.earlyBirdGranted).length;
  const eligibleCount = event.roster.filter(p => p.isEarlyBird).length;

  content.innerHTML = `
    <p class="hint">${t('earlybirdPage.desc')}</p>
    <p><strong>${t('earlybirdPage.countLabel', { n })}</strong></p>
    <div class="form-actions">
      <button id="eb-grant-all" class="btn-primary">${t('earlybirdPage.grantAllBtn')}</button>
      <span class="hint">${t('earlybirdPage.grantedSummary', { granted: grantedCount, eligible: eligibleCount })}</span>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>${t('th.name')}</th><th>${t('th.employeeId')}</th><th>${t('earlybirdPage.registeredAtCol')}</th><th>${t('badge.earlybird')}</th><th>${t('earlybirdPage.grantStatusCol')}</th></tr></thead>
        <tbody>
          ${sorted.map((p, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td>${escapeHtml(p.name)}</td>
              <td>${escapeHtml(p.employeeId || '')}</td>
              <td>${formatDateTime(p.registeredAt)}</td>
              <td>${p.isEarlyBird ? `<span class="badge badge-earlybird">${t('badge.earlybird')}</span>` : (idx < n ? `<span class="hint">${statusLabel(computeDisplayStatus(p, event, now))}</span>` : '')}</td>
              <td>${renderGrantCell(p)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  document.getElementById('eb-grant-all').addEventListener('click', () => grantAll(eventId));
  content.querySelectorAll('.eb-grant-btn').forEach(btn => {
    btn.addEventListener('click', () => grantOne(eventId, btn.dataset.id));
  });
}

function renderGrantCell(p) {
  if (!p.isEarlyBird) return '';
  if (p.earlyBirdGranted) {
    return `<span class="badge badge-granted">${t('earlybirdPage.grantedMark')}</span> <span class="hint">${formatDateTime(p.earlyBirdGrantedAt)}</span>`;
  }
  return `<button class="btn-secondary eb-grant-btn" data-id="${p.id}">${t('earlybirdPage.grantBtn')}</button>`;
}

export function initEarlybirdScreen() {
  onSessionChange(render);
  render();
}

export { render as refreshEarlybirdScreen };
