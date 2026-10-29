import test from "node:test";
import assert from "node:assert/strict";

const base = "http://127.0.0.1:3000";
let serverProcess;

test("API health endpoint responds with 20 records", async () => {
  const response = await fetch(`${base}/health`).catch(() => null);
  if (!response) {
    console.log("Skipping live HTTP test: start the server with `npm start` in another terminal.");
    return;
  }
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.status, "ok");
  assert.equal(body.records, 20);
});

test("Dataset contains 20 synthetic people", async () => {
  const { readFile } = await import("node:fs/promises");
  const { fileURLToPath } = await import("node:url");
  const { dirname, join } = await import("node:path");
  const here = dirname(fileURLToPath(import.meta.url));
  const json = JSON.parse(await readFile(join(here, "../data/people.json"), "utf8"));
  assert.equal(json.people.length, 20);
  assert.equal(new Set(json.people.map((p) => p.id)).size, 20);
  assert.ok(json.people.every((p) => p.email.endsWith("@example.com")));
});
