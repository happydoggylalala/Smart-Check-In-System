import { t } from './i18n.js';
import { escapeHtml } from './utils.js';

const TARGET_GROUP_SIZE = 6;

// 「需要分組」開關打開時，依名單人數自動反推組數/每組人數，
// 使用者不用手動填——UI 只有一個 ON/OFF 開關。
export function deriveGroupConfig(rosterSize, groupingEnabled) {
  if (!groupingEnabled || rosterSize === 0) {
    return { groupCount: 1, groupSize: Math.max(1, rosterSize) };
  }
  const groupCount = Math.max(1, Math.round(rosterSize / TARGET_GROUP_SIZE));
  const groupSize = Math.ceil(rosterSize / groupCount);
  return { groupCount, groupSize };
}

export function assignGroupSeat(person, event) {
  const k = event.nextAssignSeq;
  const g = Math.max(1, Number(event.groupCount) || 1);
  person.group.groupIndex = ((k - 1) % g) + 1;
  person.group.seatIndex = Math.floor((k - 1) / g) + 1;
  person.group.assignSeq = k;
  event.nextAssignSeq = k + 1;
}

// 目前未掛上任何導覽（範例網站沒有獨立的分組座位板頁面），保留函式供未來
// 需要時（例如報表頁想加一個座位總覽面板）重新使用，邏輯不受影響。
export function renderGroupingBoard(container, event) {
  if (!container || !event) return;
  const groupCount = Math.max(1, Number(event.groupCount) || 1);
  const groupSize = Math.max(1, Number(event.groupSize) || 1);

  const groups = Array.from({ length: groupCount }, () => []);
  event.roster
    .filter(p => p.group.groupIndex)
    .sort((a, b) => a.group.assignSeq - b.group.assignSeq)
    .forEach(p => {
      groups[p.group.groupIndex - 1].push(p);
    });

  container.innerHTML = groups.map((members, idx) => `
    <div class="group-card">
      <h4>${t('grouping.groupCard', { idx: idx + 1, count: members.length, size: groupSize })}</h4>
      <ul>
        ${members.map(p => `
          <li>
            ${t('grouping.seatLine', { seat: p.group.seatIndex, name: escapeHtml(p.name) })}
            ${p.group.seatIndex > groupSize ? `<span class="badge badge-overflow">${t('badge.overflow')}</span>` : ''}
          </li>
        `).join('') || `<li class="hint">${t('grouping.noMembers')}</li>`}
      </ul>
    </div>
  `).join('');
}
