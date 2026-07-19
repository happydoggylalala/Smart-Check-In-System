import { uuid, nowIso } from './utils.js';

export function createEventRecord() {
  const now = nowIso();
  return {
    id: uuid(),
    name: '',
    organizer: '',
    location: '',
    type: 'other',
    format: 'in_person',
    source: 'self',
    lmsCourseId: null,
    startTime: null,
    endTime: null,
    capacity: 40,
    cancelled: false,

    lateThresholdMin: 15,
    absentThresholdMin: 30,
    earlyLeaveWindowMin: 30,
    earlyBirdCount: 0,

    groupingEnabled: false,
    groupCount: 1,
    groupSize: 1,

    features: { materials: false, survey: false, earlyBird: false, lottery: false },

    emailJs: {
      serviceId: '',
      templateId: '',
      publicKey: '',
      handoutLink: '',
      enabled: false,
    },

    roster: [],
    nextAssignSeq: 1,
    lotteryWinnersHistory: [],
    materials: [],
    survey: { link: '', sentAt: null },
    recentActivity: [],

    createdAt: now,
    updatedAt: now,
  };
}

export function createPerson({ name, employeeId = '', email = '', department = '', extension = '', registeredAt = null, source = 'import' }) {
  return {
    id: uuid(),
    name,
    employeeId,
    email,
    department,
    extension,
    registeredAt: registeredAt || nowIso(),
    source,
    isEarlyBird: false,
    earlyBirdGranted: false,
    earlyBirdGrantedAt: null,
    onLeave: false,
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
    surveyStatus: { status: 'not_sent', sentAt: null },
  };
}

export function createInitialState() {
  return {
    schemaVersion: 2,
    events: [],
  };
}
