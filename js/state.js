import { createInitialState } from './models.js';

const STORAGE_KEY = 'smartCheckin.v1';

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.schemaVersion !== 1) return createInitialState();
    return parsed;
  } catch {
    return createInitialState();
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getState() {
  return state;
}

export function updateState(mutatorFn) {
  mutatorFn(state);
  persist();
  return state;
}

export function replaceState(newState) {
  state = newState;
  persist();
}

export function resetState() {
  state = createInitialState();
  persist();
}

export function exportBackup() {
  return JSON.stringify(state, null, 2);
}

export function importBackup(jsonText) {
  const parsed = JSON.parse(jsonText);
  if (!parsed || parsed.schemaVersion !== 1 || !Array.isArray(parsed.roster)) {
    throw new Error('備份檔格式不正確');
  }
  replaceState(parsed);
}
