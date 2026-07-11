import { createPerson } from './models.js';

export function tryWalkinAdd(state, { name, employeeId, email }, nowIsoStr) {
  const checkedInCount = state.roster.filter(p => p.checkin.checkedInAt != null).length;
  const capacity = Number(state.event.capacity) || 0;
  if (capacity > 0 && checkedInCount >= capacity) {
    return { ok: false, error: '已達活動人數上限，無法報到' };
  }
  const person = createPerson({ name, employeeId, email, registeredAt: nowIsoStr, source: 'walkin' });
  person.checkin.waitlisted = true;
  state.roster.push(person);
  return { ok: true, person };
}
