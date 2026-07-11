import { getState, updateState, resetState, exportBackup, importBackup } from './state.js';
import { recomputeEarlyBirds } from './earlybird.js';
import { sendTestEmail } from './email.js';
import { showToast, toDatetimeLocalValue, fromDatetimeLocalValue } from './utils.js';

function loadFormFromState() {
  const { event } = getState();
  document.getElementById('set-name').value = event.name || '';
  document.getElementById('set-start').value = toDatetimeLocalValue(event.startTime);
  document.getElementById('set-end').value = toDatetimeLocalValue(event.endTime);
  document.getElementById('set-capacity').value = event.capacity ?? 0;
  document.getElementById('set-late').value = event.lateThresholdMin ?? 15;
  document.getElementById('set-absent').value = event.absentThresholdMin ?? 30;
  document.getElementById('set-earlyleave').value = event.earlyLeaveWindowMin ?? 30;
  document.getElementById('set-earlybird').value = event.earlyBirdCount ?? 0;
  document.getElementById('set-groupcount').value = event.groupCount ?? 1;
  document.getElementById('set-groupsize').value = event.groupSize ?? 1;
  document.getElementById('set-email-enabled').checked = !!event.emailJs.enabled;
  document.getElementById('set-email-service').value = event.emailJs.serviceId || '';
  document.getElementById('set-email-template').value = event.emailJs.templateId || '';
  document.getElementById('set-email-publickey').value = event.emailJs.publicKey || '';
  document.getElementById('set-email-link').value = event.emailJs.handoutLink || '';
}

function saveFormToState(onStateChanged) {
  updateState(state => {
    state.event.name = document.getElementById('set-name').value.trim();
    state.event.startTime = fromDatetimeLocalValue(document.getElementById('set-start').value);
    state.event.endTime = fromDatetimeLocalValue(document.getElementById('set-end').value);
    state.event.capacity = Number(document.getElementById('set-capacity').value) || 0;
    state.event.lateThresholdMin = Number(document.getElementById('set-late').value) || 0;
    state.event.absentThresholdMin = Number(document.getElementById('set-absent').value) || 0;
    state.event.earlyLeaveWindowMin = Number(document.getElementById('set-earlyleave').value) || 0;
    state.event.earlyBirdCount = Number(document.getElementById('set-earlybird').value) || 0;
    state.event.groupCount = Math.max(1, Number(document.getElementById('set-groupcount').value) || 1);
    state.event.groupSize = Math.max(1, Number(document.getElementById('set-groupsize').value) || 1);
    state.event.emailJs.enabled = document.getElementById('set-email-enabled').checked;
    state.event.emailJs.serviceId = document.getElementById('set-email-service').value.trim();
    state.event.emailJs.templateId = document.getElementById('set-email-template').value.trim();
    state.event.emailJs.publicKey = document.getElementById('set-email-publickey').value.trim();
    state.event.emailJs.handoutLink = document.getElementById('set-email-link').value.trim();
    recomputeEarlyBirds(state);
  });
  showToast('設定已儲存', 'success');
  const hint = document.getElementById('settings-saved-hint');
  hint.classList.remove('hidden');
  setTimeout(() => hint.classList.add('hidden'), 2000);
  onStateChanged && onStateChanged();
}

function handleBackupExport() {
  const json = exportBackup();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `smart-checkin-backup_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function handleBackupImport(file, onStateChanged) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      importBackup(reader.result);
      loadFormFromState();
      showToast('備份已還原', 'success');
      onStateChanged && onStateChanged();
    } catch (err) {
      showToast('還原失敗：' + err.message, 'error');
    }
  };
  reader.readAsText(file);
}

function handleClearAll(onStateChanged) {
  if (!confirm('確定要清除所有資料嗎？此動作無法復原！')) return;
  resetState();
  loadFormFromState();
  showToast('已清除所有資料', 'success');
  onStateChanged && onStateChanged();
}

export function initSettingsScreen({ onStateChanged }) {
  loadFormFromState();

  document.getElementById('btn-save-settings').addEventListener('click', () => saveFormToState(onStateChanged));

  document.getElementById('btn-email-test').addEventListener('click', async () => {
    const addr = document.getElementById('set-email-testaddr').value.trim();
    const draftEvent = {
      ...getState().event,
      emailJs: {
        serviceId: document.getElementById('set-email-service').value.trim(),
        templateId: document.getElementById('set-email-template').value.trim(),
        publicKey: document.getElementById('set-email-publickey').value.trim(),
        handoutLink: document.getElementById('set-email-link').value.trim(),
      },
      name: document.getElementById('set-name').value.trim(),
    };
    const result = await sendTestEmail(draftEvent, addr);
    if (result.ok) showToast('測試郵件已送出，請檢查信箱', 'success');
    else showToast('寄送失敗：' + result.error, 'error');
  });

  document.getElementById('btn-backup-export').addEventListener('click', handleBackupExport);
  document.getElementById('btn-backup-import').addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) handleBackupImport(file, onStateChanged);
    e.target.value = '';
  });

  document.getElementById('btn-clear-all').addEventListener('click', () => handleClearAll(onStateChanged));
}
