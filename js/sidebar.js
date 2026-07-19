import { getEventById } from './eventsStore.js';
import { getActiveEventId, onSessionChange } from './session.js';
import { MOCK_CONNECTION_STATUS } from './mockOrg.js';
import { t } from './i18n.js';

const STATIC_ITEMS = [
  { id: 'screen-checkin', key: 'sidebar.navCheckin', icon: '🔲' },
  { id: 'screen-history', key: 'sidebar.navHistory', icon: '🕓' },
];
const EVENTS_ITEM = { id: 'screen-events', key: 'sidebar.navEvents', icon: '🗓️' };
const DYNAMIC_ITEMS = [
  { id: 'screen-materials', key: 'sidebar.navMaterials', icon: '📖', feature: 'materials' },
  { id: 'screen-earlybird', key: 'sidebar.navEarlybird', icon: '🎁', feature: 'earlyBird' },
  { id: 'screen-lottery', key: 'sidebar.navLottery', icon: '✨', feature: 'lottery' },
  { id: 'screen-survey', key: 'sidebar.navSurvey', icon: '📋', feature: 'survey' },
];
const REPORTS_ITEM = { id: 'screen-reports', key: 'sidebar.navReports', icon: '📊' };

let onNavigate = null;
let currentScreenId = 'screen-checkin';

function navButton(item) {
  const active = item.id === currentScreenId;
  return `<button class="sidebar-nav-item${active ? ' active' : ''}" data-target="${item.id}">
    <span class="sidebar-nav-icon">${item.icon}</span>${t(item.key)}
  </button>`;
}

function render() {
  const nav = document.getElementById('sidebar-nav');
  if (!nav) return;

  const activeEvent = getEventById(getActiveEventId());
  const dynamicItems = activeEvent ? DYNAMIC_ITEMS.filter(item => activeEvent.features[item.feature]) : [];

  nav.innerHTML = `
    <div class="sidebar-nav-section">
      <h2>${t('sidebar.sectionRelated')}</h2>
      ${STATIC_ITEMS.map(navButton).join('')}
    </div>
    <div class="sidebar-nav-section">
      <h2>${t('sidebar.sectionEvents')}</h2>
      ${navButton(EVENTS_ITEM)}
      ${dynamicItems.map(navButton).join('')}
      ${navButton(REPORTS_ITEM)}
    </div>
  `;

  nav.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentScreenId = btn.dataset.target;
      showScreen(currentScreenId);
      onNavigate && onNavigate(currentScreenId);
    });
  });
}

export function showScreen(id) {
  currentScreenId = id;
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  render();
}

function renderStatus() {
  const el = document.getElementById('sidebar-status');
  if (!el) return;
  el.innerHTML = `
    <span class="status-dot${MOCK_CONNECTION_STATUS.online ? ' online' : ''}"></span>
    <div>
      <strong>${t('sidebar.statusOnline')}</strong>
      <div class="hint">${MOCK_CONNECTION_STATUS.integrations.join(' · ')}</div>
    </div>
  `;
}

export function initSidebar({ onNavigate: navigateFn } = {}) {
  onNavigate = navigateFn;
  renderStatus();
  render();
  onSessionChange(render);
}

export function refreshSidebar() {
  render();
  renderStatus();
}
