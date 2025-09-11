// Local persistence for tasks and last scan info using localStorage

const TASKS_STORAGE_KEY = "daily_tasks_v1";
const SCANS_STORAGE_KEY = "daily_task_last_scans_v1";

function safeParse(json) {
  try {
    const parsed = JSON.parse(json);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

export function loadTasksFromStorage() {
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY);
    return safeParse(raw) || null;
  } catch {
    return null;
  }
}

export function saveTasksToStorage(tasks) {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // ignore
  }
}

export function loadLastScansFromStorage() {
  try {
    const raw = localStorage.getItem(SCANS_STORAGE_KEY);
    return safeParse(raw) || {};
  } catch {
    return {};
  }
}

export function saveLastScansToStorage(lastScans) {
  try {
    localStorage.setItem(SCANS_STORAGE_KEY, JSON.stringify(lastScans));
  } catch {
    // ignore
  }
}


