import { getEventById, updateEvent } from './eventsStore.js';
import { getActiveEventId, onSessionChange } from './session.js';
import { t } from './i18n.js';
import { uuid, nowIso, escapeHtml, showToast } from './utils.js';

function renderList(event) {
  const list = event.materials;
  if (list.length === 0) return `<p class="hint">${t('materials.empty')}</p>`;
  return list.map(m => `
    <div class="materials-list-item">
      <div>
        <div class="material-title">${escapeHtml(m.title)}</div>
        ${m.link ? `<div class="material-link">${escapeHtml(m.link)}</div>` : ''}
        ${m.description ? `<div class="hint">${escapeHtml(m.description)}</div>` : ''}
      </div>
      <button class="btn-danger-outline" data-id="${m.id}">${t('materials.deleteBtn')}</button>
    </div>
  `).join('');
}

function renderContent() {
  const eventId = getActiveEventId();
  const event = getEventById(eventId);
  const content = document.getElementById('materials-content');
  content.innerHTML = `
    <div class="panel">
      <h3>${t('materials.addBtn')}</h3>
      <label><span>${t('materials.fieldTitle')}</span><input id="mat-title" type="text"></label>
      <label><span>${t('materials.fieldLink')}</span><input id="mat-link" type="text"></label>
      <label><span>${t('materials.fieldDesc')}</span><input id="mat-desc" type="text"></label>
      <button id="mat-save" class="btn-primary">${t('materials.saveBtn')}</button>
    </div>
    <div class="panel" id="mat-list">${renderList(event)}</div>
  `;

  content.querySelectorAll('.materials-list-item button').forEach(btn => {
    btn.addEventListener('click', () => {
      updateEvent(eventId, ev => {
        ev.materials = ev.materials.filter(m => m.id !== btn.dataset.id);
      });
      renderContent();
    });
  });

  document.getElementById('mat-save').addEventListener('click', () => {
    const title = document.getElementById('mat-title').value.trim();
    const link = document.getElementById('mat-link').value.trim();
    const description = document.getElementById('mat-desc').value.trim();
    if (!title) return showToast(t('materials.errTitle'), 'error');
    updateEvent(eventId, ev => {
      ev.materials.push({ id: uuid(), title, link, description, createdAt: nowIso() });
    });
    showToast(t('materials.saveBtn'), 'success');
    renderContent();
  });
}

function render() {
  const empty = document.getElementById('materials-empty');
  const content = document.getElementById('materials-content');
  const event = getEventById(getActiveEventId());

  if (!event) {
    empty.classList.remove('hidden');
    empty.querySelector('p').textContent = t('eventPicker.selectPlaceholder');
    content.classList.add('hidden');
    return;
  }
  if (!event.features.materials) {
    empty.classList.remove('hidden');
    empty.querySelector('p').textContent = t('materials.notEnabled');
    content.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  content.classList.remove('hidden');
  renderContent();
}

export function initMaterialsScreen() {
  onSessionChange(render);
  render();
}

export { render as refreshMaterialsScreen };
