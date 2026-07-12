import { initNav, showScreen } from './nav.js';
import { initCheckinScreen, reRenderSearch } from './checkin.js';
import { initImportScreen } from './importRoster.js';
import { initSettingsScreen } from './settingsScreen.js';
import { initDashboardScreen, renderDashboard } from './dashboard.js';
import { renderGroupingBoard } from './grouping.js';
import { initLotteryScreen, renderLotteryScreen } from './lottery.js';
import { exportCsv, exportXlsx } from './exportData.js';
import { getLang, setLang, onLangChange, applyStaticTranslations, SUPPORTED_LANGS, LANG_NAMES } from './i18n.js';

function renderAll() {
  renderDashboard();
  renderGroupingBoard();
  renderLotteryScreen();
  reRenderSearch();
}

function initLangSwitcher() {
  const select = document.getElementById('lang-switcher');
  select.innerHTML = SUPPORTED_LANGS.map(code => `<option value="${code}">${LANG_NAMES[code]}</option>`).join('');
  select.value = getLang();
  document.documentElement.lang = getLang();
  select.addEventListener('change', () => setLang(select.value));
  onLangChange(() => renderAll());
}

function init() {
  applyStaticTranslations();
  initLangSwitcher();

  initNav(id => {
    if (id === 'screen-dashboard') renderDashboard();
    if (id === 'screen-grouping') renderGroupingBoard();
    if (id === 'screen-lottery') renderLotteryScreen();
  });

  initCheckinScreen({ onStateChanged: renderAll });
  initImportScreen({ onImported: renderAll });
  initSettingsScreen({ onStateChanged: renderAll });
  initDashboardScreen();
  initLotteryScreen();

  document.getElementById('btn-export-csv').addEventListener('click', exportCsv);
  document.getElementById('btn-export-xlsx').addEventListener('click', exportXlsx);

  showScreen('screen-checkin');
  renderAll();
}

document.addEventListener('DOMContentLoaded', init);
