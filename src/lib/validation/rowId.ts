let lastId = Date.now();
/** Stable within the page session, including multiple additions in the same millisecond. */
export function createRowId() {
  return ++lastId;
}
