import { initSidebar, showScreen, refreshSidebar } from './sidebar.js';
import { initTopHeader, renderUserBadge } from './topHeader.js';
import { initEventsScreen, refreshEventsScreen } from './eventsScreen.js';
import { initCheckinScreen, refreshCheckinScreen } from './checkinScreen.js';
import { initReportsScreen, refreshReportsScreen } from './reportsScreen.js';
import { initHistoryScreen, refreshHistoryScreen } from './historyScreen.js';
import { initEarlybirdScreen, refreshEarlybirdScreen } from './earlybirdScreen.js';
import { initLotteryScreen, refreshLotteryScreen } from './lotteryScreen.js';
import { initMaterialsScreen, refreshMaterialsScreen } from './materialsScreen.js';
import { initSurveyScreen, refreshSurveyScreen } from './surveyScreen.js';
import { applyStaticTranslations } from './i18n.js';

function renderAll() {
  refreshReportsScreen();
  refreshHistoryScreen();
  refreshEarlybirdScreen();
  refreshLotteryScreen();
  refreshMaterialsScreen();
  refreshSurveyScreen();
}

function renderAllForLangSwitch() {
  applyStaticTranslations();
  renderUserBadge();
  refreshSidebar();
  refreshEventsScreen();
  refreshCheckinScreen();
  renderAll();
}

function init() {
  applyStaticTranslations();
  initTopHeader({ onLangSwitch: renderAllForLangSwitch });
  initSidebar({
    onNavigate: id => {
      if (id === 'screen-reports') refreshReportsScreen();
      if (id === 'screen-history') refreshHistoryScreen();
      if (id === 'screen-earlybird') refreshEarlybirdScreen();
      if (id === 'screen-lottery') refreshLotteryScreen();
      if (id === 'screen-materials') refreshMaterialsScreen();
      if (id === 'screen-survey') refreshSurveyScreen();
    },
  });
  initEventsScreen({ onEventChanged: renderAll });
  initCheckinScreen({ onStateChanged: renderAll });
  initReportsScreen();
  initHistoryScreen();
  initEarlybirdScreen();
  initLotteryScreen();
  initMaterialsScreen();
  initSurveyScreen();

  showScreen('screen-checkin');
}

document.addEventListener('DOMContentLoaded', init);
