// 記憶體內的「目前工作階段」狀態：目前選定的活動、報到工作台的模式。
// 刻意不存進 localStorage——重新整理頁面就重置，如同分頁導覽本來就會回到預設頁一樣。

let activeEventId = null;
let workbenchMode = 'checkin'; // 'checkin' | 'checkout'
let scanMode = 'card'; // 'card' | 'manual'

const listeners = [];

export function getActiveEventId() {
  return activeEventId;
}

export function setActiveEventId(id) {
  activeEventId = id;
  workbenchMode = 'checkin';
  scanMode = 'card';
  notify();
}

export function clearActiveEvent() {
  activeEventId = null;
  notify();
}

export function getWorkbenchMode() {
  return workbenchMode;
}

export function setWorkbenchMode(mode) {
  workbenchMode = mode;
  notify();
}

export function getScanMode() {
  return scanMode;
}

export function setScanMode(mode) {
  scanMode = mode;
  notify();
}

export function onSessionChange(fn) {
  listeners.push(fn);
}

function notify() {
  listeners.forEach(fn => fn());
}
