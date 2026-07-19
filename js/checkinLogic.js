import { assignGroupSeat } from './grouping.js';
import { recomputeEarlyBirds } from './earlybird.js';
import { t } from './i18n.js';
import { minutesBetween } from './utils.js';

const STATUS_SYMBOL = { on_time: '✓', late: '⏰', absent: '✕', pending: '–', on_leave: '🌙' };

export function computeDisplayStatus(person, event, nowIsoStr) {
  if (person.checkin.checkedInAt) return person.checkin.status;
  if (!event.startTime) return 'pending';
  const delta = minutesBetween(event.startTime, nowIsoStr);
  if (delta > event.absentThresholdMin) return 'absent';
  return 'pending';
}

export function computeEarlyLeave(person, event) {
  if (!person.checkin.checkedOutAt || !event.endTime) return false;
  if (person.checkin.checkedOutAt >= event.endTime) return false;
  const minsBeforeEnd = minutesBetween(person.checkin.checkedOutAt, event.endTime);
  return minsBeforeEnd <= event.earlyLeaveWindowMin;
}

export function statusSymbol(status) {
  return STATUS_SYMBOL[status] ?? '–';
}
export function statusLabel(status) {
  return t(`status.${status}`) ?? status;
}

export function tryCheckin(event, person, nowIsoStr) {
  if (!event.startTime) {
    return { ok: false, error: t('checkin.errNoStartTime') };
  }
  if (person.checkin.checkedInAt) {
    return { ok: false, error: t('checkin.errAlreadyCheckedIn') };
  }
  const delta = minutesBetween(event.startTime, nowIsoStr);
  if (delta > event.absentThresholdMin) {
    return { ok: false, error: t('checkin.errTooLate', { min: event.absentThresholdMin }) };
  }
  person.checkin.checkedInAt = nowIsoStr;
  person.checkin.status = delta <= event.lateThresholdMin ? 'on_time' : 'late';
  assignGroupSeat(person, event);
  person.lottery.eligible = true;
  recomputeEarlyBirds(event);
  return { ok: true, person };
}

export function tryCheckout(event, person, nowIsoStr) {
  if (!person.checkin.checkedInAt) return { ok: false, error: t('checkin.errNotCheckedIn') };
  if (person.checkin.checkedOutAt) return { ok: false, error: t('checkin.errAlreadyCheckedOut') };
  person.checkin.checkedOutAt = nowIsoStr;
  person.earlyLeave = computeEarlyLeave(person, event);
  return { ok: true, person };
}

export function searchRoster(event, query) {
  const q = query.trim().toLowerCase();
  if (!q || !event) return [];
  return event.roster
    .filter(p => p.name.toLowerCase().includes(q) || (p.employeeId && p.employeeId.toLowerCase().includes(q)) || (p.email && p.email.toLowerCase().includes(q)))
    .slice(0, 30);
}

export function recordActivity(event, person, action, resultStatus) {
  event.recentActivity.unshift({
    id: `${person.id}-${action}-${Date.now()}`,
    personId: person.id,
    personName: person.name,
    action,
    at: new Date().toISOString(),
    resultStatus,
  });
  event.recentActivity = event.recentActivity.slice(0, 20);
}
