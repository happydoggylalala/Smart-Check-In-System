import { uuid, nowIso } from './utils.js';

export function createDefaultEvent() {
  return {
    name: '',
    startTime: null,
    endTime: null,
    capacity: 0,
    lateThresholdMin: 15,
    absentThresholdMin: 30,
    earlyLeaveWindowMin: 30,
    earlyBirdCount: 0,
    groupCount: 1,
    groupSize: 1,
    emailJs: {
      serviceId: '',
      templateId: '',
      publicKey: '',
      handoutLink: '',
      enabled: false,
    },
  };
}

export function createPerson({ name, employeeId = '', email = '', registeredAt = null, source = 'import' }) {
  return {
    id: uuid(),
    name,
    employeeId,
    email,
    registeredAt: registeredAt || nowIso(),
    source,
    isEarlyBird: false,
    checkin: {
      checkedInAt: null,
      checkedOutAt: null,
      waitlisted: false,
      status: 'pending',
    },
    earlyLeave: false,
    group: { groupIndex: null, seatIndex: null, assignSeq: null },
    lottery: { eligible: false, won: false, wonAt: null },
    emailStatus: { status: 'not_sent', sentAt: null, error: null },
  };
}

export function createInitialState() {
  return {
    schemaVersion: 1,
    event: createDefaultEvent(),
    roster: [],
    lotteryWinnersHistory: [],
    nextAssignSeq: 1,
  };
}
