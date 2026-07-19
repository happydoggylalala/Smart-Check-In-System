import { createPerson } from './models.js';
import { t } from './i18n.js';

export function tryWalkinAdd(event, { name, employeeId, email }, nowIsoStr) {
  const checkedInCount = event.roster.filter(p => p.checkin.checkedInAt != null).length;
  const capacity = Number(event.capacity) || 0;
  if (capacity > 0 && checkedInCount >= capacity) {
    return { ok: false, error: t('waitlist.errCapacityFull') };
  }
  const person = createPerson({ name, employeeId, email, registeredAt: nowIsoStr, source: 'walkin' });
  person.checkin.waitlisted = true;
  event.roster.push(person);
  return { ok: true, person };
}
