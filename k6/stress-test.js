import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

// Custom metrics
const errorRate = new Rate("errors");
const latency = new Trend("request_latency", true);

// Base URL — change this to your actual domain/IP
const BASE_URL = __ENV.BASE_URL || "http://eshop.marmaracse.xyz";

/*
 * Stress test stages:
 *   1. Ramp up to 50 users over 1 min
 *   2. Hold 50 users for 3 min
 *   3. Spike to 150 users over 1 min
 *   4. Hold 150 users for 3 min
 *   5. Spike to 300 users over 1 min  (push the limits)
 *   6. Hold 300 users for 3 min
 *   7. Ramp down over 2 min
 *
 * Total: ~14 minutes
 */
export const options = {
  stages: [
    { duration: "1m", target: 500 },
    { duration: "3m", target: 500 },
    { duration: "1m", target: 1500 },
    { duration: "3m", target: 150 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95% of requests should be under 2s
    errors: ["rate<0.1"],              // Error rate should be under 10%
  },
};

export default function () {
  // --- Scenario 1: Browse the homepage ---
  const homeRes = http.get(`${BASE_URL}/`, { tags: { name: "homepage" } });
  check(homeRes, {
    "homepage status 200": (r) => r.status === 200,
  }) || errorRate.add(1);
  latency.add(homeRes.timings.duration);

  sleep(1);

  // --- Scenario 2: Browse catalog items ---
  const catalogRes = http.get(`${BASE_URL}/catalog`, {
    tags: { name: "catalog" },
  });
  check(catalogRes, {
    "catalog status 200": (r) => r.status === 200,
  }) || errorRate.add(1);
  latency.add(catalogRes.timings.duration);

  sleep(1);

  // --- Scenario 3: View a specific item detail page ---
  const itemRes = http.get(`${BASE_URL}/item/1`, {
    tags: { name: "item-detail" },
  });
  check(itemRes, {
    "item detail status 200": (r) => r.status === 200,
  }) || errorRate.add(1);
  latency.add(itemRes.timings.duration);

  sleep(1);

  // --- Scenario 4: Health check endpoint ---
  const healthRes = http.get(`${BASE_URL}/health`, {
    tags: { name: "health" },
  });
  check(healthRes, {
    "health check status 200": (r) => r.status === 200,
  }) || errorRate.add(1);
  latency.add(healthRes.timings.duration);

  sleep(Math.random() * 2 + 1); // random 1-3s think time
}
