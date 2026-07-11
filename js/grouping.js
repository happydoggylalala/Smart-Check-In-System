import { getState } from './state.js';
import { escapeHtml } from './utils.js';

export function assignGroupSeat(person, state) {
  const k = state.nextAssignSeq;
  const g = Math.max(1, Number(state.event.groupCount) || 1);
  person.group.groupIndex = ((k - 1) % g) + 1;
  person.group.seatIndex = Math.floor((k - 1) / g) + 1;
  person.group.assignSeq = k;
  state.nextAssignSeq = k + 1;
}

export function renderGroupingBoard() {
  const board = document.getElementById('grouping-board');
  if (!board) return;
  const state = getState();
  const groupCount = Math.max(1, Number(state.event.groupCount) || 1);
  const groupSize = Math.max(1, Number(state.event.groupSize) || 1);

  const groups = Array.from({ length: groupCount }, () => []);
  state.roster
    .filter(p => p.group.groupIndex)
    .sort((a, b) => a.group.assignSeq - b.group.assignSeq)
    .forEach(p => {
      groups[p.group.groupIndex - 1].push(p);
    });

  board.innerHTML = groups.map((members, idx) => `
    <div class="group-card">
      <h4>第 ${idx + 1} 組（${members.length}/${groupSize} 人）</h4>
      <ul>
        ${members.map(p => `
          <li>
            第 ${p.group.seatIndex} 號 — ${escapeHtml(p.name)}
            ${p.group.seatIndex > groupSize ? '<span class="badge badge-overflow">超出原座位規劃</span>' : ''}
          </li>
        `).join('') || '<li class="hint">尚無成員</li>'}
      </ul>
    </div>
  `).join('');
}
