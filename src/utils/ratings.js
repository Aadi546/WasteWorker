// Simple localStorage helpers for storing segregation ratings and reviews by householdId

const STORAGE_KEY = "household_ratings_v1";

function loadAllRatings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch {
    return {};
  }
}

function saveAllRatings(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function getHouseholdRating(householdId) {
  const all = loadAllRatings();
  return all?.[householdId] || null;
}

export function setHouseholdRating(householdId, rating, review) {
  const all = loadAllRatings();
  all[householdId] = { rating, review: review || "", updatedAt: new Date().toISOString() };
  saveAllRatings(all);
  return all[householdId];
}

export function deleteHouseholdRating(householdId) {
  const all = loadAllRatings();
  if (all[householdId]) {
    delete all[householdId];
    saveAllRatings(all);
  }
}


