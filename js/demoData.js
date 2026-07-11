import { createDefaultEvent, createPerson } from './models.js';
import { assignGroupSeat } from './grouping.js';
import { recomputeEarlyBirds } from './earlybird.js';

function minutesAgoIso(nowMs, minutes) {
  return new Date(nowMs - minutes * 60000).toISOString();
}
function offsetIso(baseIso, minutes) {
  return new Date(new Date(baseIso).getTime() + minutes * 60000).toISOString();
}
function daysAgoIso(nowMs, days) {
  return new Date(nowMs - days * 86400000).toISOString();
}

// 建立跨所有功能都有範例的展示資料：早鳥、準時/遲到/未報到、正常簽退/早退、
// 現場候補、已分組配位、已有抽獎得獎紀錄。活動開始時間設在「現在」附近，
// 讓使用者仍可在展示當下實際操作「報到」「簽退」「抽獎」等即時功能。
export function buildDemoState(nowMs = Date.now()) {
  const event = createDefaultEvent();
  event.name = '2026 年度技術交流大會';
  event.startTime = minutesAgoIso(nowMs, 20);
  event.endTime = new Date(nowMs + 3 * 3600000).toISOString();
  event.capacity = 12;
  event.lateThresholdMin = 15;
  event.absentThresholdMin = 30;
  event.earlyLeaveWindowMin = 30;
  event.earlyBirdCount = 3;
  event.groupCount = 3;
  event.groupSize = 5;
  event.emailJs = { serviceId: '', templateId: '', publicKey: '', handoutLink: 'https://example.com/handout.pdf', enabled: false };

  const roster = [];
  const seedState = { event, roster, nextAssignSeq: 1 };

  function addPerson({ name, employeeId = '', email = '', daysAgo, source = 'import', waitlisted = false, checkin, emailStatus }) {
    const p = createPerson({
      name, employeeId, email,
      registeredAt: daysAgoIso(nowMs, daysAgo),
      source,
    });
    if (waitlisted) p.checkin.waitlisted = true;
    if (checkin) {
      p.checkin.checkedInAt = checkin.checkedInAt;
      p.checkin.status = checkin.status;
      p.lottery.eligible = true;
      assignGroupSeat(p, seedState);
      if (checkin.checkedOutAt) {
        p.checkin.checkedOutAt = checkin.checkedOutAt;
        p.earlyLeave = !!checkin.earlyLeave;
      }
    }
    if (emailStatus) p.emailStatus.status = emailStatus;
    roster.push(p);
    return p;
  }

  addPerson({
    name: '王小明', employeeId: 'E001', email: 'ming@example.com', daysAgo: 10,
    checkin: { checkedInAt: offsetIso(event.startTime, 4), status: 'on_time' }, emailStatus: 'sent',
  });
  addPerson({
    name: '李小華', employeeId: 'E002', email: 'hua@example.com', daysAgo: 9,
    checkin: { checkedInAt: offsetIso(event.startTime, 6), status: 'on_time' }, emailStatus: 'sent',
  });
  addPerson({
    name: '陳大同', employeeId: 'E003', email: 'datong@example.com', daysAgo: 8,
    checkin: { checkedInAt: offsetIso(event.startTime, 17), status: 'late' }, emailStatus: 'skipped_not_configured',
  });
  const normalOut = addPerson({
    name: '林美玲', employeeId: 'E004', email: 'meiling@example.com', daysAgo: 7,
    checkin: {
      checkedInAt: offsetIso(event.startTime, 8), status: 'on_time',
      checkedOutAt: event.endTime, earlyLeave: false,
    },
    emailStatus: 'sent',
  });
  addPerson({
    name: '張家豪', employeeId: 'E005', email: 'jiahao@example.com', daysAgo: 6,
    checkin: {
      checkedInAt: offsetIso(event.startTime, 10), status: 'on_time',
      checkedOutAt: offsetIso(event.endTime, -20), earlyLeave: true,
    },
    emailStatus: 'sent',
  });
  addPerson({
    name: '黃詩涵', employeeId: 'E006', email: 'shihan@example.com', daysAgo: 5,
    checkin: { checkedInAt: offsetIso(event.startTime, 19), status: 'late' }, emailStatus: 'skipped_not_configured',
  });

  // 尚未報到的名單，可在展示時現場搜尋並實際按下「報到」
  addPerson({ name: '吳建志', employeeId: 'E007', email: 'jianzhi@example.com', daysAgo: 4 });
  addPerson({ name: '周佳穎', employeeId: 'E008', email: 'jiaying@example.com', daysAgo: 3 });
  addPerson({ name: '許志偉', employeeId: 'E009', email: 'zhiwei@example.com', daysAgo: 2 });
  addPerson({ name: '蔡佩珊', employeeId: 'E010', email: 'peishan@example.com', daysAgo: 1 });

  // 現場候補示範
  addPerson({
    name: '陳志明', daysAgo: 0, source: 'walkin', waitlisted: true,
    checkin: { checkedInAt: offsetIso(event.startTime, 12), status: 'on_time' }, emailStatus: 'skipped_no_email',
  });

  recomputeEarlyBirds(seedState);

  normalOut.lottery.won = true;
  normalOut.lottery.wonAt = minutesAgoIso(nowMs, 5);

  return {
    schemaVersion: 1,
    event,
    roster,
    lotteryWinnersHistory: [normalOut.id],
    nextAssignSeq: seedState.nextAssignSeq,
  };
}
