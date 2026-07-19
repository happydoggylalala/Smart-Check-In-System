import { getEventById } from './eventsStore.js';
import { getActiveEventId, onSessionChange } from './session.js';
import { computeDisplayStatus, statusLabel } from './checkinLogic.js';
import { t } from './i18n.js';
import { escapeHtml, formatDateTime, nowIso } from './utils.js';

function render() {
  const empty = document.getElementById('earlybird-empty');
  const content = document.getElementById('earlybird-content');
  const event = getEventById(getActiveEventId());

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

  content.innerHTML = `
    <p class="hint">${t('earlybirdPage.desc')}</p>
    <p><strong>${t('earlybirdPage.countLabel', { n })}</strong></p>
    <div class="table-wrap">
      <table>
        <thead><tr><th>#</th><th>${t('th.name')}</th><th>${t('th.employeeId')}</th><th>${t('earlybirdPage.registeredAtCol')}</th><th>${t('badge.earlybird')}</th></tr></thead>
        <tbody>
          ${sorted.map((p, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td>${escapeHtml(p.name)}</td>
              <td>${escapeHtml(p.employeeId || '')}</td>
              <td>${formatDateTime(p.registeredAt)}</td>
              <td>${p.isEarlyBird ? `<span class="badge badge-earlybird">${t('badge.earlybird')}</span>` : (idx < n ? `<span class="hint">${statusLabel(computeDisplayStatus(p, event, now))}</span>` : '')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

export function initEarlybirdScreen() {
  onSessionChange(render);
  render();
}

export { render as refreshEarlybirdScreen };
