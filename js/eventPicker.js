import { computeEventStatus } from './eventsStore.js';
import { t } from './i18n.js';
import { escapeHtml, formatDayMonth, timeRangeLabel } from './utils.js';

export function filterEvents(events, { query = '', source = '', type = '', status = '' } = {}, nowIso) {
  const q = query.trim().toLowerCase();
  return events.filter(e => {
    if (q && !e.name.toLowerCase().includes(q)) return false;
    if (source && e.source !== source) return false;
    if (type && e.type !== type) return false;
    if (status && computeEventStatus(e, nowIso) !== status) return false;
    return true;
  });
}

export function renderStatusBadge(event, nowIso) {
  const status = computeEventStatus(event, nowIso);
  return `<span class="badge badge-status-${status}">${t(`eventStatus.${status}`)}</span>`;
}

export function renderSourceBadge(event) {
  return `<span class="badge badge-source-${event.source}">${t(`eventSource.${event.source}`)}</span>`;
}

export function renderFeatureChips(event) {
  return Object.entries(event.features)
    .filter(([, enabled]) => enabled)
    .map(([key]) => `<span class="chip">${t(`feature.${key}`)}</span>`)
    .join('');
}

export function renderMetaRow(event) {
  return `
    <span class="meta-item">📅 ${escapeHtml(timeRangeLabel(event.startTime, event.endTime))}</span>
    <span class="meta-item">📍 ${escapeHtml(event.location || '')}</span>
    <span class="meta-item">👥 ${t('eventPicker.capacityLabel', { n: event.capacity })}</span>
  `;
}

// mode: 'manage' (活動管理列表：檢視/刪除/取消) | 'pick' (報到選活動：日期方塊卡片，點擊選取)
export function renderEventCardList(container, events, { mode, nowIso, activeEventId, onSelect, onDelete, onCancel } = {}) {
  if (events.length === 0) {
    container.innerHTML = `<p class="hint empty-hint">${t('eventPicker.noResults')}</p>`;
    return;
  }

  if (mode === 'pick') {
    container.innerHTML = events.map(e => {
      const { day, month } = formatDayMonth(e.startTime);
      const active = e.id === activeEventId;
      return `
        <button class="event-pick-card${active ? ' active' : ''}" data-id="${e.id}">
          <div class="date-badge"><strong>${day}</strong><span>${month}</span></div>
          <div class="event-pick-body">
            <div class="event-pick-badges">${renderStatusBadge(e, nowIso)}${renderSourceBadge(e)}</div>
            <strong class="event-pick-title">${escapeHtml(e.name)}</strong>
            <div class="event-pick-meta">${escapeHtml(timeRangeLabel(e.startTime, e.endTime).split(' · ')[1] || '')} · ${escapeHtml(e.location || '')}</div>
          </div>
        </button>
      `;
    }).join('');
    container.querySelectorAll('.event-pick-card').forEach(btn => {
      btn.addEventListener('click', () => onSelect && onSelect(btn.dataset.id));
    });
    return;
  }

  container.innerHTML = events.map(e => `
    <article class="event-card">
      <div class="event-card-main">
        <div class="event-card-badges">${renderStatusBadge(e, nowIso)}${renderSourceBadge(e)}</div>
        <h2>${escapeHtml(e.name)}</h2>
        <div class="event-card-meta">${renderMetaRow(e)}</div>
        <div class="event-card-chips">${renderFeatureChips(e)}</div>
      </div>
      <div class="event-card-actions">
        <button class="btn-secondary" data-action="view" data-id="${e.id}">${t('eventPicker.viewBtn')}</button>
        ${!e.cancelled ? `<button class="btn-ghost" data-action="cancel" data-id="${e.id}">${t('eventPicker.cancelBtn')}</button>` : ''}
        <button class="btn-danger-outline" data-action="delete" data-id="${e.id}">${t('eventPicker.deleteBtn')}</button>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('[data-action="delete"]').forEach(btn => {
    btn.addEventListener('click', () => onDelete && onDelete(btn.dataset.id));
  });
  container.querySelectorAll('[data-action="cancel"]').forEach(btn => {
    btn.addEventListener('click', () => onCancel && onCancel(btn.dataset.id));
  });
  container.querySelectorAll('[data-action="view"]').forEach(btn => {
    btn.addEventListener('click', () => onSelect && onSelect(btn.dataset.id));
  });
}

export function buildEventDropdownOptions(events) {
  return events
    .slice()
    .sort((a, b) => new Date(b.startTime || 0) - new Date(a.startTime || 0))
    .map(e => ({ value: e.id, label: `${e.name} · ${timeRangeLabel(e.startTime).split(' · ')[0]}` }));
}
