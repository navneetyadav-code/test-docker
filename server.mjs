import http from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const database = JSON.parse(await readFile(path.join(__dirname, "data/people.json"), "utf8"));
const people = database.people;

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
    "X-Mock-API": "true"
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && url.pathname === "/") {
    return sendJson(res, 200, {
      name: "Mock Personal Information API",
      mockData: true,
      disclaimer: "All people and contact details are fictional test data.",
      endpoints: [
        "GET /health",
        "GET /api/people",
        "GET /api/people?limit=5",
        "GET /api/people?city=Austin",
        "GET /api/people/1"
      ]
    });
  }

  if (req.method === "GET" && url.pathname === "/health") {
    return sendJson(res, 200, { status: "ok", mockData: true, records: people.length });
  }

  if (req.method === "GET" && url.pathname === "/api/people") {
    const city = url.searchParams.get("city");
    const search = (url.searchParams.get("search") || "").toLowerCase();
    const requestedLimit = Number.parseInt(url.searchParams.get("limit") || "20", 10);
    const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 20) : 20;

    let result = people;
    if (city) result = result.filter((p) => p.city.toLowerCase() === city.toLowerCase());
    if (search) {
      result = result.filter((p) =>
        [p.firstName, p.lastName, p.email, p.jobTitle, p.company, p.city]
          .some((value) => value.toLowerCase().includes(search))
      );
    }

    return sendJson(res, 200, {
      mockData: true,
      total: result.length,
      returned: Math.min(result.length, limit),
      data: result.slice(0, limit)
    });
  }

  const match = url.pathname.match(/^\/api\/people\/(\d+)$/);
  if (req.method === "GET" && match) {
    const person = people.find((p) => p.id === Number(match[1]));
    if (!person) return sendJson(res, 404, { error: "Person not found", mockData: true });
    return sendJson(res, 200, { mockData: true, data: person });
  }

  return sendJson(res, 404, { error: "Route not found", mockData: true });
});

server.listen(PORT, HOST, () => {
  console.log(`Mock Personal Information API running at http://${HOST}:${PORT}`);
  console.log(`Loaded ${people.length} synthetic records.`);
});
