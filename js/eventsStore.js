import { getState, updateState } from './state.js';
import { createEventRecord } from './models.js';
import { nowIso, minutesBetween } from './utils.js';

export function getEvents() {
  return getState().events;
}

export function getEventById(id) {
  return getState().events.find(e => e.id === id) || null;
}

export function addEvent(partial = {}) {
  const event = { ...createEventRecord(), ...partial };
  updateState(state => {
    state.events.push(event);
  });
  return event;
}

export function updateEvent(id, mutatorFn) {
  let updated = null;
  updateState(state => {
    const event = state.events.find(e => e.id === id);
    if (!event) return;
    mutatorFn(event);
    event.updatedAt = nowIso();
    updated = event;
  });
  return updated;
}

export function deleteEvent(id) {
  updateState(state => {
    state.events = state.events.filter(e => e.id !== id);
  });
}

export function setEventCancelled(id, cancelled) {
  return updateEvent(id, event => {
    event.cancelled = !!cancelled;
  });
}

export function computeEventStatus(event, nowIsoStr = nowIso()) {
  if (event.cancelled) return 'cancelled';
  if (!event.startTime || !event.endTime) return 'upcoming';
  if (minutesBetween(nowIsoStr, event.startTime) > 0) return 'upcoming';
  if (minutesBetween(nowIsoStr, event.endTime) > 0) return 'ongoing';
  return 'ended';
}
