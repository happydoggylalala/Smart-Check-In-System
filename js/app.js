import { initNav, showScreen } from './nav.js';
import { initCheckinScreen } from './checkin.js';
import { initImportScreen } from './importRoster.js';
import { initSettingsScreen } from './settingsScreen.js';
import { initDashboardScreen, renderDashboard } from './dashboard.js';
import { renderGroupingBoard } from './grouping.js';
import { initLotteryScreen, renderLotteryScreen } from './lottery.js';
import { exportCsv, exportXlsx } from './exportData.js';

function renderAll() {
  renderDashboard();
  renderGroupingBoard();
  renderLotteryScreen();
}

function init() {
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
