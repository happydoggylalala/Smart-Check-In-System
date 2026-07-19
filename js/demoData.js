import { createPerson } from './models.js';

function offsetIso(baseIso, minutes) {
  return new Date(new Date(baseIso).getTime() + minutes * 60000).toISOString();
}
function daysAgoIso(nowMs, days) {
  return new Date(nowMs - days * 86400000).toISOString();
}

const FULL_PEOPLE = [
  { name: '王小明', employeeId: '100001', email: 'ming@example.com', department: '研發部', daysAgo: 10, checkin: { offsetMin: 4, status: 'on_time' }, emailStatus: 'sent' },
  { name: '李小華', employeeId: '100002', email: 'hua@example.com', department: '產品部', daysAgo: 9, checkin: { offsetMin: 6, status: 'on_time' }, emailStatus: 'sent' },
  { name: '陳大同', employeeId: '100003', email: 'datong@example.com', department: '業務部', daysAgo: 8, checkin: { offsetMin: 17, status: 'late' }, emailStatus: 'skipped_not_configured' },
  { name: '林美玲', employeeId: '100004', email: 'meiling@example.com', department: '人力資源部', daysAgo: 7, checkin: { offsetMin: 8, status: 'on_time', checkoutAtEnd: true }, emailStatus: 'sent' },
  { name: '張家豪', employeeId: '100005', email: 'jiahao@example.com', department: '工程部', daysAgo: 6, checkin: { offsetMin: 10, status: 'on_time', checkoutBeforeEndMin: 20, earlyLeave: true }, emailStatus: 'sent' },
  { name: '黃詩涵', employeeId: '100006', email: 'shihan@example.com', department: '財務部', daysAgo: 5, checkin: { offsetMin: 19, status: 'late' }, emailStatus: 'skipped_not_configured' },
  { name: '吳建志', employeeId: '100007', email: 'jianzhi@example.com', department: '行銷部', daysAgo: 4 },
  { name: '周佳穎', employeeId: '100008', email: 'jiaying@example.com', department: '法務部', daysAgo: 3 },
  { name: '許志偉', employeeId: '100009', email: 'zhiwei@example.com', department: '資訊部', daysAgo: 2 },
  { name: '蔡佩珊', employeeId: '100010', email: 'peishan@example.com', department: '客服部', daysAgo: 1 },
  { name: '許家瑜', employeeId: '100011', email: 'chiayu@example.com', department: '採購部', daysAgo: 0 },
  { name: '游承翰', employeeId: '100012', email: 'chenghan@example.com', department: '營運部', daysAgo: 0 },
];

const LITE_PEOPLE = [
  { name: '王小明', employeeId: '100001', email: 'ming@example.com', department: '研發部', daysAgo: 5, checkin: { offsetMin: 4, status: 'on_time' }, emailStatus: 'sent' },
  { name: '李小華', employeeId: '100002', email: 'hua@example.com', department: '產品部', daysAgo: 4, checkin: { offsetMin: 6, status: 'on_time' }, emailStatus: 'sent' },
  { name: '陳大同', employeeId: '100003', email: 'datong@example.com', department: '業務部', daysAgo: 3, checkin: { offsetMin: 17, status: 'late' }, emailStatus: 'skipped_not_configured' },
  { name: '林美玲', employeeId: '100004', email: 'meiling@example.com', department: '人力資源部', daysAgo: 2, checkin: { offsetMin: 8, status: 'on_time', checkoutAtEnd: true }, emailStatus: 'sent' },
  { name: '張家豪', employeeId: '100005', email: 'jiahao@example.com', department: '工程部', daysAgo: 1, checkin: { offsetMin: 10, status: 'on_time', checkoutBeforeEndMin: 20, earlyLeave: true }, emailStatus: 'sent' },
  { name: '黃詩涵', employeeId: '100006', email: 'shihan@example.com', department: '財務部', daysAgo: 0 },
];

// 建立涵蓋準時/遲到/尚未報到/正常簽退/早退等各種狀態的展示名單，供「新增活動」
// 表單的模擬名單選項使用。只回傳名單陣列，不含分組配位（分組要等活動真正建立、
// 有了 nextAssignSeq 之後才由呼叫端跑 assignGroupSeat），也不含活動層級欄位。
export function buildDemoRoster(startIso, endIso, size = 'full') {
  const source = size === 'lite' ? LITE_PEOPLE : FULL_PEOPLE;
  const nowMs = Date.now();
  return source.map(spec => {
    const p = createPerson({
      name: spec.name,
      employeeId: spec.employeeId,
      email: spec.email,
      department: spec.department,
      registeredAt: daysAgoIso(nowMs, spec.daysAgo),
      source: 'import',
    });
    if (spec.checkin && startIso) {
      p.checkin.checkedInAt = offsetIso(startIso, spec.checkin.offsetMin);
      p.checkin.status = spec.checkin.status;
      p.lottery.eligible = true;
      if (spec.checkin.checkoutAtEnd && endIso) {
        p.checkin.checkedOutAt = endIso;
        p.earlyLeave = false;
      } else if (spec.checkin.checkoutBeforeEndMin != null && endIso) {
        p.checkin.checkedOutAt = offsetIso(endIso, -spec.checkin.checkoutBeforeEndMin);
        p.earlyLeave = !!spec.checkin.earlyLeave;
      }
    }
    if (spec.emailStatus) p.emailStatus.status = spec.emailStatus;
    return p;
  });
}
