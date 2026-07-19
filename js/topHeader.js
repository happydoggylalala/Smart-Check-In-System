import { getLang, setLang, SUPPORTED_LANGS, LANG_NAMES } from './i18n.js';
import { MOCK_USER } from './mockOrg.js';
import { t } from './i18n.js';
import { escapeHtml } from './utils.js';

export function initTopHeader({ onLangSwitch } = {}) {
  const select = document.getElementById('lang-switcher');
  select.innerHTML = SUPPORTED_LANGS.map(code => `<option value="${code}">${LANG_NAMES[code]}</option>`).join('');
  select.value = getLang();
  document.documentElement.lang = getLang();
  select.addEventListener('change', () => {
    setLang(select.value);
    onLangSwitch && onLangSwitch();
  });

  renderUserBadge();
}

export function renderUserBadge() {
  const el = document.getElementById('user-badge');
  if (!el) return;
  el.innerHTML = `
    <span class="user-avatar">${escapeHtml(MOCK_USER.initials)}</span>
    <div>
      <strong>${escapeHtml(MOCK_USER.name)}</strong>
      <div class="hint">${t('mock.userRole')}</div>
    </div>
  `;
}
