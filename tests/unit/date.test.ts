import { test } from "node:test";
import assert from "node:assert/strict";

test("Não ocupação mantém a data inicial ao atravessar meia-noite", async (context) => {
  const before = new Date("2026-09-02T23:59:50-03:00").getTime();
  context.mock.timers.enable({ apis: ["Date"], now: before });
  const { getApplicationDate, initializeDocumentClock } =
    await import("../../src/lib/pdf/applicationDate.ts");
  initializeDocumentClock();
  context.mock.timers.tick(30000);
  assert.equal(getApplicationDate().getTime(), before);
  const copy = getApplicationDate();
  copy.setFullYear(2000);
  assert.equal(getApplicationDate().getTime(), before);
});
