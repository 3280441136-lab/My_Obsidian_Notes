if (!Promise.withResolvers) {
  Promise.withResolvers = function () {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => PDFAnnotatorPlugin
});
module.exports = __toCommonJS(main_exports);

// src/interaction/toolShortcuts.ts
var TOOL_KEYS = {
  "1": "pen",
  "2": "highlighter",
  "3": "eraser",
  "4": "select",
  "5": "text"
};
function resolveToolShortcut(event) {
  var _a2;
  if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey || event.repeat || event.isComposing) {
    return null;
  }
  return (_a2 = TOOL_KEYS[event.key]) != null ? _a2 : null;
}

// main.ts
var import_obsidian6 = require("obsidian");

// node_modules/perfect-freehand/dist/esm/index.mjs
var { PI: e } = Math;
var t = e + 1e-4;
var n = 0.5;
var r = [1, 1];
function i(e2, t2, n2, r2 = (e3) => e3) {
  return e2 * r2(0.5 - t2 * (0.5 - n2));
}
var { min: a } = Math;
function o(e2, t2, n2) {
  let r2 = a(1, t2 / n2);
  return a(1, e2 + (a(1, 1 - r2) - e2) * (r2 * 0.275));
}
function s(e2) {
  return [-e2[0], -e2[1]];
}
function c(e2, t2) {
  return [e2[0] + t2[0], e2[1] + t2[1]];
}
function l(e2, t2, n2) {
  return e2[0] = t2[0] + n2[0], e2[1] = t2[1] + n2[1], e2;
}
function u(e2, t2) {
  return [e2[0] - t2[0], e2[1] - t2[1]];
}
function d(e2, t2, n2) {
  return e2[0] = t2[0] - n2[0], e2[1] = t2[1] - n2[1], e2;
}
function f(e2, t2) {
  return [e2[0] * t2, e2[1] * t2];
}
function p(e2, t2, n2) {
  return e2[0] = t2[0] * n2, e2[1] = t2[1] * n2, e2;
}
function m(e2, t2) {
  return [e2[0] / t2, e2[1] / t2];
}
function h(e2) {
  return [e2[1], -e2[0]];
}
function g(e2, t2) {
  let n2 = t2[0];
  return e2[0] = t2[1], e2[1] = -n2, e2;
}
function ee(e2, t2) {
  return e2[0] * t2[0] + e2[1] * t2[1];
}
function _(e2, t2) {
  return e2[0] === t2[0] && e2[1] === t2[1];
}
function v(e2) {
  return Math.hypot(e2[0], e2[1]);
}
function y(e2, t2) {
  let n2 = e2[0] - t2[0], r2 = e2[1] - t2[1];
  return n2 * n2 + r2 * r2;
}
function b(e2) {
  return m(e2, v(e2));
}
function x(e2, t2) {
  return Math.hypot(e2[1] - t2[1], e2[0] - t2[0]);
}
function S(e2, t2, n2) {
  let r2 = Math.sin(n2), i2 = Math.cos(n2), a2 = e2[0] - t2[0], o2 = e2[1] - t2[1], s2 = a2 * i2 - o2 * r2, c2 = a2 * r2 + o2 * i2;
  return [s2 + t2[0], c2 + t2[1]];
}
function C(e2, t2, n2, r2) {
  let i2 = Math.sin(r2), a2 = Math.cos(r2), o2 = t2[0] - n2[0], s2 = t2[1] - n2[1], c2 = o2 * a2 - s2 * i2, l2 = o2 * i2 + s2 * a2;
  return e2[0] = c2 + n2[0], e2[1] = l2 + n2[1], e2;
}
function w(e2, t2, n2) {
  return c(e2, f(u(t2, e2), n2));
}
function te(e2, t2, n2, r2) {
  let i2 = n2[0] - t2[0], a2 = n2[1] - t2[1];
  return e2[0] = t2[0] + i2 * r2, e2[1] = t2[1] + a2 * r2, e2;
}
function T(e2, t2, n2) {
  return c(e2, f(t2, n2));
}
var E = [0, 0];
var D = [0, 0];
var O = [0, 0];
function k(e2, n2) {
  let r2 = T(e2, b(h(u(e2, c(e2, [1, 1])))), -n2), i2 = [], a2 = 1 / 13;
  for (let n3 = a2; n3 <= 1; n3 += a2) i2.push(S(r2, e2, t * 2 * n3));
  return i2;
}
function A(e2, n2, r2) {
  let i2 = [], a2 = 1 / r2;
  for (let r3 = a2; r3 <= 1; r3 += a2) i2.push(S(n2, e2, t * r3));
  return i2;
}
function j(e2, t2, n2) {
  let r2 = u(t2, n2), i2 = f(r2, 0.5), a2 = f(r2, 0.51);
  return [u(e2, i2), u(e2, a2), c(e2, a2), c(e2, i2)];
}
function M(e2, n2, r2, i2) {
  let a2 = [], o2 = T(e2, n2, r2), s2 = 1 / i2;
  for (let n3 = s2; n3 < 1; n3 += s2) a2.push(S(o2, e2, t * 3 * n3));
  return a2;
}
function ne(e2, t2, n2) {
  return [c(e2, f(t2, n2)), c(e2, f(t2, n2 * 0.99)), u(e2, f(t2, n2 * 0.99)), u(e2, f(t2, n2))];
}
function N(e2, t2, n2) {
  return e2 === false || e2 === void 0 ? 0 : e2 === true ? Math.max(t2, n2) : e2;
}
function re(e2, t2, n2) {
  return e2.slice(0, 10).reduce((e3, r2) => {
    let i2 = r2.pressure;
    return t2 && (i2 = o(e3, r2.distance, n2)), (e3 + i2) / 2;
  }, e2[0].pressure);
}
function P(e2, n2 = {}) {
  let { size: r2 = 16, smoothing: a2 = 0.5, thinning: f2 = 0.5, simulatePressure: m2 = true, easing: _2 = (e3) => e3, start: v2 = {}, end: b2 = {}, last: x2 = false } = n2, { cap: S2 = true, easing: w2 = (e3) => e3 * (2 - e3) } = v2, { cap: T2 = true, easing: P2 = (e3) => --e3 * e3 * e3 + 1 } = b2;
  if (e2.length === 0 || r2 <= 0) return [];
  let F2 = e2[e2.length - 1].runningLength, I2 = N(v2.taper, r2, F2), L2 = N(b2.taper, r2, F2), R2 = (r2 * a2) ** 2, z = [], B = [], V = re(e2, m2, r2), H = i(r2, f2, e2[e2.length - 1].pressure, _2), U, W = e2[0].vector, G = e2[0].point, K = G, q = G, J = K, Y = false;
  for (let n3 = 0; n3 < e2.length; n3++) {
    let { pressure: a3 } = e2[n3], { point: s2, vector: h2, distance: v3, runningLength: b3 } = e2[n3], x3 = n3 === e2.length - 1;
    if (!x3 && F2 - b3 < 3) continue;
    f2 ? (m2 && (a3 = o(V, v3, r2)), H = i(r2, f2, a3, _2)) : H = r2 / 2, U === void 0 && (U = H);
    let S3 = b3 < I2 ? w2(b3 / I2) : 1, T3 = F2 - b3 < L2 ? P2((F2 - b3) / L2) : 1;
    H = Math.max(0.01, H * Math.min(S3, T3));
    let k2 = (x3 ? e2[n3] : e2[n3 + 1]).vector, A2 = x3 ? 1 : ee(h2, k2), j2 = ee(h2, W) < 0 && !Y, M2 = A2 !== null && A2 < 0;
    if (j2 || M2) {
      g(E, W), p(E, E, H);
      for (let e3 = 0; e3 <= 1; e3 += 0.07692307692307693) d(D, s2, E), C(D, D, s2, t * e3), q = [D[0], D[1]], z.push(q), l(O, s2, E), C(O, O, s2, t * -e3), J = [O[0], O[1]], B.push(J);
      G = q, K = J, M2 && (Y = true);
      continue;
    }
    if (Y = false, x3) {
      g(E, h2), p(E, E, H), z.push(u(s2, E)), B.push(c(s2, E));
      continue;
    }
    te(E, k2, h2, A2), g(E, E), p(E, E, H), d(D, s2, E), q = [D[0], D[1]], (n3 <= 1 || y(G, q) > R2) && (z.push(q), G = q), l(O, s2, E), J = [O[0], O[1]], (n3 <= 1 || y(K, J) > R2) && (B.push(J), K = J), V = a3, W = h2;
  }
  let X = [e2[0].point[0], e2[0].point[1]], Z = e2.length > 1 ? [e2[e2.length - 1].point[0], e2[e2.length - 1].point[1]] : c(e2[0].point, [1, 1]), Q = [], $ = [];
  if (e2.length === 1) {
    if (!(I2 || L2) || x2) return k(X, U || H);
  } else {
    I2 || L2 && e2.length === 1 || (S2 ? Q.push(...A(X, B[0], 13)) : Q.push(...j(X, z[0], B[0])));
    let t2 = h(s(e2[e2.length - 1].vector));
    L2 || I2 && e2.length === 1 ? $.push(Z) : T2 ? $.push(...M(Z, t2, H, 29)) : $.push(...ne(Z, t2, H));
  }
  return z.concat($, B.reverse(), Q);
}
var F = [0, 0];
function I(e2) {
  return e2 != null && e2 >= 0;
}
function L(e2, t2 = {}) {
  var _a2;
  let { streamline: i2 = 0.5, size: a2 = 16, last: o2 = false } = t2;
  if (e2.length === 0) return [];
  let s2 = 0.15 + (1 - i2) * 0.85, l2 = Array.isArray(e2[0]) ? e2 : e2.map(({ x: e3, y: t3, pressure: r2 = n }) => [e3, t3, r2]);
  if (l2.length === 2) {
    let e3 = l2[1];
    l2 = l2.slice(0, -1);
    for (let t3 = 1; t3 < 5; t3++) l2.push(w(l2[0], e3, t3 / 4));
  }
  l2.length === 1 && (l2 = [...l2, [...c(l2[0], r), ...l2[0].slice(2)]]);
  let u2 = [{ point: [l2[0][0], l2[0][1]], pressure: I(l2[0][2]) ? l2[0][2] : 0.25, vector: [...r], distance: 0, runningLength: 0 }], f2 = false, p2 = 0, m2 = u2[0], h2 = l2.length - 1;
  for (let e3 = 1; e3 < l2.length; e3++) {
    let t3 = o2 && e3 === h2 ? [l2[e3][0], l2[e3][1]] : w(m2.point, l2[e3], s2);
    if (_(m2.point, t3)) continue;
    let r2 = x(t3, m2.point);
    if (p2 += r2, e3 < h2 && !f2) {
      if (p2 < a2) continue;
      f2 = true;
    }
    d(F, m2.point, t3), m2 = { point: t3, pressure: I(l2[e3][2]) ? l2[e3][2] : n, vector: b(F), distance: r2, runningLength: p2 }, u2.push(m2);
  }
  return u2[0].vector = ((_a2 = u2[1]) == null ? void 0 : _a2.vector) || [0, 0], u2;
}
function R(e2, t2 = {}) {
  return P(L(e2, t2), t2);
}

// src/ink/inkEngine.ts
var INK_MAX_SMOOTHING_WINDOW_MS = 100;
var INK_OUTPUT_RATE_HZ = 180;
var INK_OUTPUT_INTERVAL_MS = 1e3 / INK_OUTPUT_RATE_HZ;
var INK_END_OF_STROKE_MAX_ITERATIONS = 20;
var INK_SPEED_FLOOR = 1.31;
var INK_SPEED_CEILING = 1.44;
var INK_PREDICTION_MS = 8;
var INK_MAX_PREDICTION_DISTANCE = 6e-3;
var INK_TAPER_MIN_MULTIPLIER = 0.72;
var INK_TAPER_MAX_LENGTH = 0.018;
var INK_MIN_DOT_DISTANCE = 12e-4;
var INK_PRESSURE_WIDTH_VARIATION = 0.18;
var INK_CENTERLINE_SMOOTHING_PASSES = 1;
var INK_PRESSURE_GAIN = 1.25;
var INK_PRESSURE_SLEW_PER_WIDTH = 0.3;
var INK_PRESSURE_SMOOTHING_ALPHA = 0.4;
var DEFAULT_INK_RENDER_SETTINGS = {
  thinning: 0.5,
  streamline: 0.12,
  smoothing: 0.5,
  easing: "linear",
  taperStart: 0,
  taperEnd: 0,
  pressureMode: "auto"
};
var activeInkRenderSettings = { ...DEFAULT_INK_RENDER_SETTINGS };
function setInkRenderSettings(settings) {
  var _a2, _b, _c, _d, _e;
  activeInkRenderSettings = {
    thinning: clamp((_a2 = settings == null ? void 0 : settings.thinning) != null ? _a2 : DEFAULT_INK_RENDER_SETTINGS.thinning, -1, 1),
    streamline: clamp((_b = settings == null ? void 0 : settings.streamline) != null ? _b : DEFAULT_INK_RENDER_SETTINGS.streamline, 0, 1),
    smoothing: clamp((_c = settings == null ? void 0 : settings.smoothing) != null ? _c : DEFAULT_INK_RENDER_SETTINGS.smoothing, 0, 1),
    easing: normalizeEasing(settings == null ? void 0 : settings.easing),
    taperStart: clamp((_d = settings == null ? void 0 : settings.taperStart) != null ? _d : DEFAULT_INK_RENDER_SETTINGS.taperStart, 0, 120),
    taperEnd: clamp((_e = settings == null ? void 0 : settings.taperEnd) != null ? _e : DEFAULT_INK_RENDER_SETTINGS.taperEnd, 0, 120),
    pressureMode: (settings == null ? void 0 : settings.pressureMode) === "stylus" || (settings == null ? void 0 : settings.pressureMode) === "simulate" ? settings.pressureMode : "auto"
  };
}
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function normalizeEasing(value) {
  return value === "ease-in" || value === "ease-out" || value === "ease-in-out" || value === "linear" ? value : DEFAULT_INK_RENDER_SETTINGS.easing;
}
function getEasingFunction(mode) {
  switch (mode) {
    case "ease-in":
      return (value) => value * value;
    case "ease-out":
      return (value) => 1 - Math.pow(1 - value, 2);
    case "ease-in-out":
      return (value) => value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;
    case "linear":
    default:
      return (value) => value;
  }
}
function distanceBetween(first, second) {
  return Math.hypot(first.x - second.x, first.y - second.y);
}
function getStrokeSampleThreshold(strokeWidthScale, override) {
  if (override && Number.isFinite(override) && override > 0) {
    return clamp(override, 8e-5, 4e-3);
  }
  const widthAwareThreshold = strokeWidthScale && strokeWidthScale > 0 ? strokeWidthScale * 0.08 : 45e-5;
  return clamp(widthAwareThreshold, 12e-5, 65e-5);
}
function appendStrokePoints(stroke, points, options = {}) {
  let appended = false;
  for (const sample of points) {
    const previousPoint = stroke.points[stroke.points.length - 1];
    const threshold = getStrokeSampleThreshold(stroke.widthScale, options.mergeThreshold);
    if (previousPoint && distanceBetween(previousPoint, sample) < threshold && !options.forceCommitFinalPoint) {
      const pressure2 = getNextStrokePressure(previousPoint.pressure, sample.pressure, previousPoint, sample, stroke.widthScale);
      stroke.points[stroke.points.length - 1] = { ...sample, pressure: pressure2 };
      appended = true;
      continue;
    }
    const pressure = previousPoint ? getNextStrokePressure(previousPoint.pressure, sample.pressure, previousPoint, sample, stroke.widthScale) : clamp(sample.pressure * INK_PRESSURE_GAIN, 0.12, 0.88);
    if (previousPoint && options.forceCommitFinalPoint) {
      stroke.points[stroke.points.length - 1] = { ...sample, pressure: Math.max(previousPoint.pressure, pressure) };
      appended = true;
      continue;
    }
    stroke.points.push({ ...sample, pressure });
    appended = true;
  }
  return appended;
}
function getNextStrokePressure(previousPressure, samplePressure, previousPoint, sample, strokeWidthScale) {
  const target = clamp(samplePressure * INK_PRESSURE_GAIN, 0.08, 1);
  const smoothed = previousPressure + (target - previousPressure) * INK_PRESSURE_SMOOTHING_ALPHA;
  const width = Math.max(strokeWidthScale != null ? strokeWidthScale : 25e-4, 8e-4);
  const travel = distanceBetween(previousPoint, sample);
  const maxDelta = clamp(INK_PRESSURE_SLEW_PER_WIDTH * (travel / width), 0.015, 0.18);
  return clamp(smoothed, Math.max(0.08, previousPressure - maxDelta), Math.min(1, previousPressure + maxDelta));
}
function getStrokeMidpoint(first, second) {
  const firstTime = typeof first.t === "number" ? first.t : null;
  const secondTime = typeof second.t === "number" ? second.t : null;
  return {
    x: (first.x + second.x) / 2,
    y: (first.y + second.y) / 2,
    pressure: (first.pressure + second.pressure) / 2,
    t: firstTime !== null && secondTime !== null ? (firstTime + secondTime) / 2 : void 0
  };
}
function interpolateStrokePoint(first, second, ratio) {
  const firstTime = typeof first.t === "number" ? first.t : null;
  const secondTime = typeof second.t === "number" ? second.t : null;
  return {
    x: first.x + (second.x - first.x) * ratio,
    y: first.y + (second.y - first.y) * ratio,
    pressure: clamp(first.pressure + (second.pressure - first.pressure) * ratio, 0.06, 1),
    t: firstTime !== null && secondTime !== null ? firstTime + (secondTime - firstTime) * ratio : void 0
  };
}
function resampleStrokePoints(points) {
  if (points.length < 2) {
    return points;
  }
  const output = [points[0]];
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const point = points[index];
    if (typeof previous.t === "number" && typeof point.t === "number" && point.t > previous.t) {
      const deltaMs = point.t - previous.t;
      const steps = Math.min(INK_END_OF_STROKE_MAX_ITERATIONS, Math.floor(deltaMs / INK_OUTPUT_INTERVAL_MS));
      for (let step = 1; step <= steps; step += 1) {
        const targetTime = previous.t + step * INK_OUTPUT_INTERVAL_MS;
        if (targetTime >= point.t) {
          break;
        }
        output.push(interpolateStrokePoint(previous, point, (targetTime - previous.t) / deltaMs));
      }
    }
    output.push(point);
  }
  return output;
}
function getPredictedStrokePoints(points, predictionStrength = 1) {
  const strength = clamp(Number.isFinite(predictionStrength) ? predictionStrength : 1, 0, 1);
  if (points.length < 2 || strength === 0) {
    return points;
  }
  const previous = points[points.length - 2];
  const last = points[points.length - 1];
  if (typeof previous.t !== "number" || typeof last.t !== "number" || last.t <= previous.t) {
    return points;
  }
  const deltaMs = last.t - previous.t;
  if (deltaMs > 28 || distanceBetween(previous, last) < 7e-4) {
    return points;
  }
  const predictionMs = INK_PREDICTION_MS * strength;
  const maxPredictionDistance = INK_MAX_PREDICTION_DISTANCE * strength;
  const projectedRatio = predictionMs / Math.max(1, deltaMs);
  const rawX = last.x + (last.x - previous.x) * projectedRatio;
  const rawY = last.y + (last.y - previous.y) * projectedRatio;
  const rawPrediction = {
    x: clamp(rawX, 0, 1),
    y: clamp(rawY, 0, 1),
    pressure: last.pressure,
    t: last.t + predictionMs
  };
  const distance = distanceBetween(last, rawPrediction);
  if (distance <= maxPredictionDistance) {
    return [...points, rawPrediction];
  }
  const limitedRatio = maxPredictionDistance / Math.max(distance, 1e-6);
  return [
    ...points,
    {
      x: last.x + (rawPrediction.x - last.x) * limitedRatio,
      y: last.y + (rawPrediction.y - last.y) * limitedRatio,
      pressure: last.pressure,
      t: rawPrediction.t
    }
  ];
}
function getPointSpeed(previous, next) {
  if (typeof previous.t !== "number" || typeof next.t !== "number" || next.t <= previous.t) {
    return 0;
  }
  return distanceBetween(previous, next) / ((next.t - previous.t) / 1e3);
}
function getInflectionPreservation(previous, point, next) {
  const incomingX = point.x - previous.x;
  const incomingY = point.y - previous.y;
  const outgoingX = next.x - point.x;
  const outgoingY = next.y - point.y;
  const incomingLength = Math.hypot(incomingX, incomingY);
  const outgoingLength = Math.hypot(outgoingX, outgoingY);
  if (incomingLength === 0 || outgoingLength === 0) {
    return 1;
  }
  const cosine = (incomingX * outgoingX + incomingY * outgoingY) / (incomingLength * outgoingLength);
  return cosine < 0.72 ? 0.35 : 1;
}
function getTimedWindowAverage(points, index, stabilization) {
  const point = points[index];
  const windowMs = INK_MAX_SMOOTHING_WINDOW_MS * stabilization;
  if (typeof point.t !== "number") {
    return point;
  }
  let x2 = 0;
  let y2 = 0;
  let pressure = 0;
  let count = 0;
  for (let scan = index; scan >= 0; scan -= 1) {
    const candidate = points[scan];
    if (typeof candidate.t !== "number" || point.t - candidate.t > windowMs) {
      break;
    }
    x2 += candidate.x;
    y2 += candidate.y;
    pressure += candidate.pressure;
    count += 1;
  }
  for (let scan = index + 1; scan < points.length; scan += 1) {
    const candidate = points[scan];
    if (typeof candidate.t !== "number" || candidate.t - point.t > windowMs) {
      break;
    }
    x2 += candidate.x;
    y2 += candidate.y;
    pressure += candidate.pressure;
    count += 1;
  }
  return count > 0 ? { x: x2 / count, y: y2 / count, pressure: clamp(pressure / count, 0.06, 1), t: point.t } : point;
}
function getCumulativeStrokeDistances(points) {
  const distances = [0];
  for (let index = 1; index < points.length; index += 1) {
    distances[index] = distances[index - 1] + distanceBetween(points[index - 1], points[index]);
  }
  return distances;
}
function getStrokeTaperMultiplier(cumulativeDistances, pointIndex, enableTaper) {
  var _a2, _b;
  if (!enableTaper || cumulativeDistances.length < 3) {
    return 1;
  }
  const totalLength = (_a2 = cumulativeDistances[cumulativeDistances.length - 1]) != null ? _a2 : 0;
  if (totalLength <= 0) {
    return 1;
  }
  const taperLength = clamp(totalLength * 0.1, 3e-3, INK_TAPER_MAX_LENGTH);
  const distanceFromStart = (_b = cumulativeDistances[pointIndex]) != null ? _b : 0;
  const distanceFromEnd = totalLength - distanceFromStart;
  const edgeDistance = Math.min(distanceFromStart, distanceFromEnd);
  if (edgeDistance >= taperLength) {
    return 1;
  }
  return clamp(edgeDistance / taperLength, INK_TAPER_MIN_MULTIPLIER, 1);
}
function getVisualPressureMultiplier(pressure, usePressure) {
  if (!usePressure) {
    return 1;
  }
  return clamp(1 + (clamp(pressure, 0.06, 1) - 0.5) * INK_PRESSURE_WIDTH_VARIATION, 0.9, 1.09);
}
function getSmoothedStrokePoints(points, stabilization) {
  if (points.length < 3) {
    return points;
  }
  return points.map((point, index) => {
    if (index === 0 || index === points.length - 1) {
      return point;
    }
    const previous = points[index - 1];
    const next = points[index + 1];
    const windowAverage = getTimedWindowAverage(points, index, stabilization);
    if (windowAverage !== point) {
      const speed = getPointSpeed(previous, next);
      const speedBlend = clamp((speed - INK_SPEED_FLOOR) / Math.max(1e-3, INK_SPEED_CEILING - INK_SPEED_FLOOR), 0, 1);
      const cornerFactor = getInflectionPreservation(previous, point, next);
      const smoothingWeight = clamp(0.28 * (1 - speedBlend) * cornerFactor, 0.04, 0.28);
      return {
        x: point.x * (1 - smoothingWeight) + windowAverage.x * smoothingWeight,
        y: point.y * (1 - smoothingWeight) + windowAverage.y * smoothingWeight,
        pressure: clamp(point.pressure * 0.72 + windowAverage.pressure * 0.28, 0.06, 1),
        t: point.t
      };
    }
    return {
      x: previous.x * 0.18 + point.x * 0.64 + next.x * 0.18,
      y: previous.y * 0.18 + point.y * 0.64 + next.y * 0.18,
      pressure: clamp(previous.pressure * 0.2 + point.pressure * 0.6 + next.pressure * 0.2, 0.06, 1),
      t: point.t
    };
  });
}
function smoothStrokeCenterline(points, passes = INK_CENTERLINE_SMOOTHING_PASSES, strength = 1) {
  if (points.length < 4 || passes <= 0) {
    return points;
  }
  let result = points;
  const inset = 0.25 * strength;
  const retained = 1 - inset;
  for (let pass = 0; pass < passes; pass += 1) {
    const next = [result[0]];
    for (let index = 0; index < result.length - 1; index += 1) {
      const current = result[index];
      const following = result[index + 1];
      next.push({
        x: current.x * retained + following.x * inset,
        y: current.y * retained + following.y * inset,
        pressure: clamp(current.pressure * 0.75 + following.pressure * 0.25, 0.06, 1),
        t: typeof current.t === "number" && typeof following.t === "number" ? current.t + (following.t - current.t) * 0.25 : current.t
      });
      next.push({
        x: current.x * inset + following.x * retained,
        y: current.y * inset + following.y * retained,
        pressure: clamp(current.pressure * 0.25 + following.pressure * 0.75, 0.06, 1),
        t: typeof current.t === "number" && typeof following.t === "number" ? current.t + (following.t - current.t) * 0.75 : following.t
      });
    }
    next.push(result[result.length - 1]);
    result = next;
  }
  return result;
}
function average(first, second) {
  return (first + second) / 2;
}
function getRenderStrokePoints(points, predictTail, predictionStrength = 1, settings = activeInkRenderSettings) {
  const inputPoints = predictTail ? getPredictedStrokePoints(points, predictionStrength) : points;
  const stabilization = settings.streamline;
  if (stabilization === 0) {
    return inputPoints;
  }
  const preparedPoints = getSmoothedStrokePoints(resampleStrokePoints(inputPoints), stabilization);
  return smoothStrokeCenterline(preparedPoints, 1, stabilization);
}
function getSvgPathFromStroke(outline, closed = true) {
  const length = outline.length;
  if (length < 4) {
    return "";
  }
  let first = outline[0];
  let second = outline[1];
  const third = outline[2];
  let result = `M${first[0].toFixed(2)},${first[1].toFixed(2)} Q${second[0].toFixed(2)},${second[1].toFixed(2)} ${average(second[0], third[0]).toFixed(2)},${average(second[1], third[1]).toFixed(2)} T`;
  for (let index = 2; index < length - 1; index += 1) {
    first = outline[index];
    second = outline[index + 1];
    result += `${average(first[0], second[0]).toFixed(2)},${average(first[1], second[1]).toFixed(2)} `;
  }
  if (closed) {
    result += "Z";
  }
  return result;
}
function getSmoothInkStrokeOutline(points, width, height, baseWidth, usePressure, predictTail, options = {}) {
  var _a2, _b, _c, _d;
  try {
    const renderMode = (_a2 = options.renderMode) != null ? _a2 : predictTail ? "live" : "committed";
    void renderMode;
    const settings = (_b = options.inkSettings) != null ? _b : activeInkRenderSettings;
    const renderPoints = getRenderStrokePoints(points, predictTail, options.predictionStrength, settings);
    if (renderPoints.length < 2) {
      return null;
    }
    if (renderPoints.length < 4 && distanceBetween(renderPoints[0], renderPoints[renderPoints.length - 1]) < INK_MIN_DOT_DISTANCE) {
      return null;
    }
    const effectiveUsePressure = usePressure;
    const easing = getEasingFunction(settings.easing);
    const geometryScale = 1524 / Math.max(1, width);
    const outline = R(
      renderPoints.map((point) => [point.x * width * geometryScale, point.y * height * geometryScale, effectiveUsePressure ? clamp(point.pressure, 0.12, 1) : 0.5]),
      {
        size: Math.max(1, baseWidth * geometryScale),
        thinning: settings.thinning,
        smoothing: settings.smoothing,
        streamline: settings.streamline,
        easing,
        simulatePressure: false,
        last: true,
        start: {
          taper: options.startTaper === void 0 ? settings.taperStart : options.startTaper * geometryScale,
          easing,
          cap: (_c = options.startCap) != null ? _c : true
        },
        end: {
          taper: options.endTaper === void 0 ? settings.taperEnd : options.endTaper * geometryScale,
          easing,
          cap: (_d = options.endCap) != null ? _d : true
        }
      }
    );
    if (outline.length < 3) {
      return null;
    }
    return outline.map((point) => [point[0] / geometryScale, point[1] / geometryScale]);
  } catch (error) {
    console.warn("freedraw-pdf: perfect-freehand outline failed, falling back to canvas stroke", error);
    return null;
  }
}
function fillInkStrokeOutline(context, outline) {
  if (outline.length < 4) {
    return false;
  }
  const first = outline[0];
  const second = outline[1];
  const third = outline[2];
  context.beginPath();
  context.moveTo(first[0], first[1]);
  context.quadraticCurveTo(
    second[0],
    second[1],
    average(second[0], third[0]),
    average(second[1], third[1])
  );
  for (let index = 2; index < outline.length - 1; index += 1) {
    const control = outline[index];
    const next = outline[index + 1];
    context.quadraticCurveTo(
      control[0],
      control[1],
      average(control[0], next[0]),
      average(control[1], next[1])
    );
  }
  context.closePath();
  context.fill();
  return true;
}
function drawFreehandOutlineStroke(context, points, width, height, baseWidth, usePressure, predictTail, options = {}) {
  const outline = getSmoothInkStrokeOutline(points, width, height, baseWidth, usePressure, predictTail, options);
  if (!outline || !fillInkStrokeOutline(context, outline)) {
    return null;
  }
  return getSvgPathFromStroke(outline) || null;
}
function drawUniformSmoothStroke(context, points, width, height, baseWidth, usePressure, predictTail, renderMode, predictionStrength = 1, settings = activeInkRenderSettings) {
  void renderMode;
  const renderPoints = getRenderStrokePoints(points, predictTail, predictionStrength, settings);
  if (renderPoints.length < 3) {
    return false;
  }
  const averagePressure = usePressure ? clamp(renderPoints.reduce((sum, point) => sum + point.pressure, 0) / renderPoints.length, 0.28, 1) : 1;
  context.lineWidth = Math.max(0.85, baseWidth * getVisualPressureMultiplier(averagePressure, usePressure));
  context.beginPath();
  context.moveTo(renderPoints[0].x * width, renderPoints[0].y * height);
  for (let index = 1; index < renderPoints.length - 1; index += 1) {
    const controlPoint = renderPoints[index];
    const nextAnchor = getStrokeMidpoint(controlPoint, renderPoints[index + 1]);
    context.quadraticCurveTo(
      controlPoint.x * width,
      controlPoint.y * height,
      nextAnchor.x * width,
      nextAnchor.y * height
    );
  }
  const last = renderPoints[renderPoints.length - 1];
  context.lineTo(last.x * width, last.y * height);
  context.stroke();
  return true;
}
function drawSmoothInkStroke(context, points, width, height, baseWidth, usePressure, predictTail = false, options = {}) {
  var _a2;
  if (points.length === 0) {
    return null;
  }
  const renderMode = (_a2 = options.renderMode) != null ? _a2 : predictTail ? "live" : "committed";
  const pathData = drawFreehandOutlineStroke(context, points, width, height, baseWidth, usePressure, predictTail, { ...options, renderMode });
  if (pathData) {
    return pathData;
  }
  if ((renderMode === "live" || predictTail || !usePressure) && drawUniformSmoothStroke(context, points, width, height, baseWidth, usePressure, predictTail, renderMode, options.predictionStrength, options.inkSettings)) {
    return null;
  }
  const renderPoints = getRenderStrokePoints(points, predictTail, options.predictionStrength, options.inkSettings);
  const cumulativeDistances = getCumulativeStrokeDistances(renderPoints);
  const first = renderPoints[0];
  if (renderPoints.length === 1) {
    const pressure2 = usePressure ? clamp(first.pressure, 0.2, 1) : 1;
    context.lineWidth = Math.max(0.85, baseWidth * getVisualPressureMultiplier(pressure2, usePressure));
    context.beginPath();
    context.moveTo(first.x * width, first.y * height);
    context.lineTo((first.x + 1e-4) * width, (first.y + 1e-4) * height);
    context.stroke();
    return null;
  }
  if (renderPoints.length === 2) {
    const second = renderPoints[1];
    const pressure2 = usePressure ? clamp((first.pressure + second.pressure) / 2, 0.2, 1) : 1;
    context.lineWidth = Math.max(0.85, baseWidth * getVisualPressureMultiplier(pressure2, usePressure));
    context.beginPath();
    context.moveTo(first.x * width, first.y * height);
    context.lineTo(second.x * width, second.y * height);
    context.stroke();
    return null;
  }
  let previousAnchor = first;
  for (let index = 1; index < renderPoints.length - 1; index += 1) {
    const controlPoint = renderPoints[index];
    const nextAnchor = getStrokeMidpoint(controlPoint, renderPoints[index + 1]);
    const pressure2 = usePressure ? clamp((previousAnchor.pressure + controlPoint.pressure + nextAnchor.pressure) / 3, 0.2, 1) : 1;
    const taper2 = getStrokeTaperMultiplier(cumulativeDistances, index, usePressure);
    context.lineWidth = Math.max(0.85, baseWidth * getVisualPressureMultiplier(pressure2, usePressure) * taper2);
    context.beginPath();
    context.moveTo(previousAnchor.x * width, previousAnchor.y * height);
    context.quadraticCurveTo(
      controlPoint.x * width,
      controlPoint.y * height,
      nextAnchor.x * width,
      nextAnchor.y * height
    );
    context.stroke();
    previousAnchor = nextAnchor;
  }
  const last = renderPoints[renderPoints.length - 1];
  const pressure = usePressure ? clamp((previousAnchor.pressure + last.pressure) / 2, 0.2, 1) : 1;
  const taper = getStrokeTaperMultiplier(cumulativeDistances, renderPoints.length - 1, usePressure);
  context.lineWidth = Math.max(0.85, baseWidth * getVisualPressureMultiplier(pressure, usePressure) * taper);
  context.beginPath();
  context.moveTo(previousAnchor.x * width, previousAnchor.y * height);
  context.lineTo(last.x * width, last.y * height);
  context.stroke();
  return null;
}

// src/utils/general.ts
function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
function clamp2(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function getBaseName(file) {
  const extensionWithDot = `.${file.extension}`;
  return file.name.endsWith(extensionWithDot) ? file.name.slice(0, -extensionWithDot.length) : file.basename;
}
function dataUrlToArrayBuffer(dataUrl) {
  var _a2;
  const base64 = (_a2 = dataUrl.split(",")[1]) != null ? _a2 : "";
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes.buffer;
}

// src/annotation/geometry.ts
function distanceBetween2(first, second) {
  return Math.hypot(first.x - second.x, first.y - second.y);
}
function distanceToSegment(point, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (dx === 0 && dy === 0) {
    return distanceBetween2(point, start);
  }
  const t2 = clamp2(((point.x - start.x) * dx + (point.y - start.y) * dy) / (dx * dx + dy * dy), 0, 1);
  const projection = {
    x: start.x + t2 * dx,
    y: start.y + t2 * dy
  };
  return distanceBetween2(point, projection);
}
function getPolygonBounds(points) {
  return {
    left: Math.min(...points.map((point) => point.x)),
    right: Math.max(...points.map((point) => point.x)),
    top: Math.min(...points.map((point) => point.y)),
    bottom: Math.max(...points.map((point) => point.y))
  };
}
function boundsOverlap(first, second) {
  return !(first.right < second.left || first.left > second.right || first.bottom < second.top || first.top > second.bottom);
}
function orientation(a2, b2, c2) {
  const value = (b2.y - a2.y) * (c2.x - b2.x) - (b2.x - a2.x) * (c2.y - b2.y);
  if (Math.abs(value) < 1e-6) {
    return 0;
  }
  return value > 0 ? 1 : 2;
}
function onSegment(a2, b2, c2) {
  return b2.x <= Math.max(a2.x, c2.x) && b2.x >= Math.min(a2.x, c2.x) && b2.y <= Math.max(a2.y, c2.y) && b2.y >= Math.min(a2.y, c2.y);
}
function segmentsIntersect(firstStart, firstEnd, secondStart, secondEnd) {
  const o1 = orientation(firstStart, firstEnd, secondStart);
  const o2 = orientation(firstStart, firstEnd, secondEnd);
  const o3 = orientation(secondStart, secondEnd, firstStart);
  const o4 = orientation(secondStart, secondEnd, firstEnd);
  if (o1 !== o2 && o3 !== o4) {
    return true;
  }
  if (o1 === 0 && onSegment(firstStart, secondStart, firstEnd)) {
    return true;
  }
  if (o2 === 0 && onSegment(firstStart, secondEnd, firstEnd)) {
    return true;
  }
  if (o3 === 0 && onSegment(secondStart, firstStart, secondEnd)) {
    return true;
  }
  if (o4 === 0 && onSegment(secondStart, firstEnd, secondEnd)) {
    return true;
  }
  return false;
}

// src/annotation/renderOrder.ts
function getAnnotationRenderables(strokes, textItems, shapes) {
  const renderables = [
    ...strokes.map((annotation, index) => ({ kind: "stroke", annotation, fallbackOrder: index })),
    ...textItems.map((annotation, index) => ({ kind: "text", annotation, fallbackOrder: 1e5 + index })),
    ...shapes.map((annotation, index) => ({ kind: "shape", annotation, fallbackOrder: 2e5 + index }))
  ];
  return renderables.sort((left, right) => getRenderableOrder(left) - getRenderableOrder(right));
}
function getRenderableOrder(renderable) {
  var _a2;
  return (_a2 = renderable.annotation.zIndex) != null ? _a2 : renderable.fallbackOrder;
}
function getRenderableKey(renderable) {
  return `${renderable.kind}:${renderable.annotation.id}`;
}
function reorderRenderables(renderables, selectedKeys, direction) {
  const ordered = [...renderables];
  const selected = (renderable) => selectedKeys.has(getRenderableKey(renderable));
  const selectedRenderables = ordered.filter(selected);
  if (selectedRenderables.length === 0) {
    return false;
  }
  let nextOrder;
  if (direction === "front") {
    nextOrder = [...ordered.filter((renderable) => !selected(renderable)), ...selectedRenderables];
  } else if (direction === "back") {
    nextOrder = [...selectedRenderables, ...ordered.filter((renderable) => !selected(renderable))];
  } else {
    nextOrder = [...ordered];
    if (direction === "forward") {
      for (let index = nextOrder.length - 2; index >= 0; index -= 1) {
        if (selected(nextOrder[index]) && !selected(nextOrder[index + 1])) {
          [nextOrder[index], nextOrder[index + 1]] = [nextOrder[index + 1], nextOrder[index]];
        }
      }
    } else {
      for (let index = 1; index < nextOrder.length; index += 1) {
        if (selected(nextOrder[index]) && !selected(nextOrder[index - 1])) {
          [nextOrder[index - 1], nextOrder[index]] = [nextOrder[index], nextOrder[index - 1]];
        }
      }
    }
  }
  const previousKeys = ordered.map(getRenderableKey).join("|");
  const nextKeys = nextOrder.map(getRenderableKey).join("|");
  if (previousKeys === nextKeys) {
    return false;
  }
  nextOrder.forEach((renderable, index) => {
    renderable.annotation.zIndex = index;
  });
  return true;
}

// src/annotation/bounds.ts
function getTextLines(text) {
  const lines = text.split(/\r?\n/);
  return lines.length > 0 ? lines : [text];
}
function getNormalizedStrokePadding(width, widthScale) {
  const normalizedWidth = widthScale && widthScale > 0 ? widthScale : width * 12e-4;
  return clamp2(normalizedWidth * 0.75, 3e-3, 0.04);
}
function getShapeBounds(shape) {
  const padding = getNormalizedStrokePadding(shape.width, shape.widthScale);
  return {
    left: clamp2(Math.min(shape.start.x, shape.end.x) - padding, 0, 1),
    right: clamp2(Math.max(shape.start.x, shape.end.x) + padding, 0, 1),
    top: clamp2(Math.min(shape.start.y, shape.end.y) - padding, 0, 1),
    bottom: clamp2(Math.max(shape.start.y, shape.end.y) + padding, 0, 1)
  };
}
function getStrokeBounds(stroke) {
  if (stroke.points.length === 0) {
    return { left: 0, right: 0, top: 0, bottom: 0 };
  }
  const xs = stroke.points.map((point) => point.x);
  const ys = stroke.points.map((point) => point.y);
  const padding = getNormalizedStrokePadding(stroke.width, stroke.widthScale);
  return {
    left: clamp2(Math.min(...xs) - padding, 0, 1),
    right: clamp2(Math.max(...xs) + padding, 0, 1),
    top: clamp2(Math.min(...ys) - padding, 0, 1),
    bottom: clamp2(Math.max(...ys) + padding, 0, 1)
  };
}
function getTextBounds(textItem) {
  var _a2;
  const lines = getTextLines(textItem.text);
  const longestLine = lines.reduce((longest, line) => line.length > longest.length ? line : longest, "");
  const normalizedFontSize = textItem.fontScale && textItem.fontScale > 0 ? textItem.fontScale : textItem.fontSize * 135e-5;
  const rawEstimatedWidth = Math.max(0.032, longestLine.length * normalizedFontSize * 0.58);
  const estimatedWidth = textItem.boxWidthScale && textItem.boxWidthScale > 0 ? Math.max(0.032, textItem.boxWidthScale) : rawEstimatedWidth;
  const estimatedWrappedLineCount = textItem.wordWrap !== false && textItem.boxWidthScale && textItem.boxWidthScale > 0 ? lines.reduce((sum, line) => {
    const lineWidth = Math.max(0.032, line.length * normalizedFontSize * 0.58);
    return sum + Math.max(1, Math.ceil(lineWidth / estimatedWidth));
  }, 0) : lines.length;
  const lineSpacing = clamp2((_a2 = textItem.lineSpacing) != null ? _a2 : 1.35, 0.8, 3);
  const estimatedHeight = Math.max(
    0.026,
    normalizedFontSize + (Math.max(1, estimatedWrappedLineCount) - 1) * normalizedFontSize * lineSpacing
  );
  const finalHeight = textItem.boxHeightScale && textItem.boxHeightScale > 0 ? Math.max(estimatedHeight, textItem.boxHeightScale) : estimatedHeight;
  const padding = textItem.boxWidthScale ? 0 : 5e-3;
  return {
    left: textItem.x - padding,
    right: textItem.x + estimatedWidth,
    top: textItem.y - padding,
    bottom: textItem.y + finalHeight
  };
}

// src/annotation/interaction.ts
function getSelectionBoxPoints(start, end) {
  const left = clamp2(Math.min(start.x, end.x), 0, 1);
  const right = clamp2(Math.max(start.x, end.x), 0, 1);
  const top = clamp2(Math.min(start.y, end.y), 0, 1);
  const bottom = clamp2(Math.max(start.y, end.y), 0, 1);
  return [
    { x: left, y: top, pressure: 0.5 },
    { x: right, y: top, pressure: 0.5 },
    { x: right, y: bottom, pressure: 0.5 },
    { x: left, y: bottom, pressure: 0.5 },
    { x: left, y: top, pressure: 0.5 }
  ];
}
function parseRegionReference(raw) {
  const match = raw.match(/\[\[([^\]#]+)#page=(\d+)]]\s*::region\[page=(\d+);rect=([0-9.-]+),([0-9.-]+),([0-9.-]+),([0-9.-]+)]/i);
  if (!match) {
    return null;
  }
  const [, filePath, pageFromLink, pageFromRegion, left, top, right, bottom] = match;
  const linkPage = Number(pageFromLink);
  const regionPage = Number(pageFromRegion);
  if (!Number.isFinite(linkPage) || !Number.isFinite(regionPage) || linkPage !== regionPage) {
    return null;
  }
  const rect = {
    left: clamp2(Number(left), 0, 1),
    top: clamp2(Number(top), 0, 1),
    right: clamp2(Number(right), 0, 1),
    bottom: clamp2(Number(bottom), 0, 1)
  };
  if (rect.right <= rect.left || rect.bottom <= rect.top) {
    return null;
  }
  return {
    filePath,
    page: linkPage,
    rect
  };
}
function normalizeRect(rect) {
  const normalized = {
    left: clamp2(Math.min(rect.left, rect.right), 0, 1),
    top: clamp2(Math.min(rect.top, rect.bottom), 0, 1),
    right: clamp2(Math.max(rect.left, rect.right), 0, 1),
    bottom: clamp2(Math.max(rect.top, rect.bottom), 0, 1)
  };
  if (normalized.right <= normalized.left || normalized.bottom <= normalized.top) {
    return null;
  }
  return normalized;
}
function getClipboardBounds(clipboard) {
  var _a2;
  const bounds = [
    ...clipboard.strokes.map((stroke) => getStrokeBounds(stroke)),
    ...clipboard.textItems.map((item) => getTextBounds(item)),
    ...clipboard.shapes.map((shape) => getShapeBounds(shape)),
    ...((_a2 = clipboard.imageItems) != null ? _a2 : []).map((image) => getImageBounds(image))
  ];
  if (bounds.length === 0) {
    return null;
  }
  return {
    left: Math.min(...bounds.map((bound) => bound.left)),
    right: Math.max(...bounds.map((bound) => bound.right)),
    top: Math.min(...bounds.map((bound) => bound.top)),
    bottom: Math.max(...bounds.map((bound) => bound.bottom))
  };
}
function getImageBounds(image) {
  return {
    left: clamp2(image.x, 0, 1),
    right: clamp2(image.x + image.widthScale, 0, 1),
    top: clamp2(image.y, 0, 1),
    bottom: clamp2(image.y + image.heightScale, 0, 1)
  };
}
function getClipboardPasteOffset(clipboard, targetPoint, fallbackOffset = 0.02) {
  const bounds = getClipboardBounds(clipboard);
  if (!bounds || !targetPoint) {
    return { x: fallbackOffset, y: fallbackOffset };
  }
  const centerX = (bounds.left + bounds.right) / 2;
  const centerY = (bounds.top + bounds.bottom) / 2;
  return {
    x: clamp2(targetPoint.x - centerX, -bounds.left, 1 - bounds.right),
    y: clamp2(targetPoint.y - centerY, -bounds.top, 1 - bounds.bottom)
  };
}
function cloneAnnotationsForPage(strokes, textItems, shapes, pageNumber) {
  const payload = {
    strokes: [],
    textItems: [],
    shapes: []
  };
  getAnnotationRenderables(strokes, textItems, shapes).forEach((renderable, index) => {
    var _a2, _b, _c;
    if (renderable.kind === "stroke") {
      payload.strokes.push(JSON.parse(JSON.stringify({ ...renderable.annotation, id: generateId("stroke"), page: pageNumber, zIndex: (_a2 = renderable.annotation.zIndex) != null ? _a2 : index })));
    } else if (renderable.kind === "text") {
      payload.textItems.push(JSON.parse(JSON.stringify({ ...renderable.annotation, id: generateId("text"), page: pageNumber, zIndex: (_b = renderable.annotation.zIndex) != null ? _b : index })));
    } else {
      payload.shapes.push(JSON.parse(JSON.stringify({ ...renderable.annotation, id: generateId("shape"), page: pageNumber, zIndex: (_c = renderable.annotation.zIndex) != null ? _c : index })));
    }
  });
  return payload;
}
function distanceToRectEdge(point, bounds) {
  const topEdge = distanceToSegment(point, { x: bounds.left, y: bounds.top }, { x: bounds.right, y: bounds.top });
  const rightEdge = distanceToSegment(point, { x: bounds.right, y: bounds.top }, { x: bounds.right, y: bounds.bottom });
  const bottomEdge = distanceToSegment(point, { x: bounds.left, y: bounds.bottom }, { x: bounds.right, y: bounds.bottom });
  const leftEdge = distanceToSegment(point, { x: bounds.left, y: bounds.top }, { x: bounds.left, y: bounds.bottom });
  return Math.min(topEdge, rightEdge, bottomEdge, leftEdge);
}
function pointInBounds(point, bounds, padding = 0) {
  return point.x >= bounds.left - padding && point.x <= bounds.right + padding && point.y >= bounds.top - padding && point.y <= bounds.bottom + padding;
}
function distanceToBounds(point, bounds) {
  if (pointInBounds(point, bounds)) {
    return 0;
  }
  const nearestX = clamp2(point.x, bounds.left, bounds.right);
  const nearestY = clamp2(point.y, bounds.top, bounds.bottom);
  return distanceBetween2(point, { x: nearestX, y: nearestY });
}
function distanceToStroke(point, stroke) {
  if (stroke.points.length === 0) {
    return Number.POSITIVE_INFINITY;
  }
  if (stroke.points.length === 1) {
    return distanceBetween2(point, stroke.points[0]);
  }
  let nearest = Number.POSITIVE_INFINITY;
  for (let index = 1; index < stroke.points.length; index += 1) {
    nearest = Math.min(nearest, distanceToSegment(point, stroke.points[index - 1], stroke.points[index]));
  }
  return nearest;
}
function distanceToShape(point, shape) {
  if (shape.tool === "line") {
    return distanceToSegment(point, shape.start, shape.end);
  }
  const bounds = getShapeBounds(shape);
  if (shape.tool === "rectangle") {
    return distanceToRectEdge(point, bounds);
  }
  const centerX = (bounds.left + bounds.right) / 2;
  const centerY = (bounds.top + bounds.bottom) / 2;
  const radiusX = Math.max((bounds.right - bounds.left) / 2, 1e-4);
  const radiusY = Math.max((bounds.bottom - bounds.top) / 2, 1e-4);
  const normalized = Math.abs((point.x - centerX) ** 2 / radiusX ** 2 + (point.y - centerY) ** 2 / radiusY ** 2 - 1);
  return normalized * Math.max(radiusX, radiusY);
}
function distanceBetweenSegments(firstStart, firstEnd, secondStart, secondEnd) {
  if (segmentsIntersect(firstStart, firstEnd, secondStart, secondEnd)) {
    return 0;
  }
  return Math.min(
    distanceToSegment(firstStart, secondStart, secondEnd),
    distanceToSegment(firstEnd, secondStart, secondEnd),
    distanceToSegment(secondStart, firstStart, firstEnd),
    distanceToSegment(secondEnd, firstStart, firstEnd)
  );
}
function pointInExpandedBounds(point, bounds, threshold) {
  return point.x >= bounds.left - threshold && point.x <= bounds.right + threshold && point.y >= bounds.top - threshold && point.y <= bounds.bottom + threshold;
}
function segmentIntersectsExpandedBounds(start, end, bounds, threshold) {
  const expanded = {
    left: bounds.left - threshold,
    right: bounds.right + threshold,
    top: bounds.top - threshold,
    bottom: bounds.bottom + threshold
  };
  if (pointInExpandedBounds(start, bounds, threshold) || pointInExpandedBounds(end, bounds, threshold)) {
    return true;
  }
  const corners = [
    { x: expanded.left, y: expanded.top, pressure: 0.5 },
    { x: expanded.right, y: expanded.top, pressure: 0.5 },
    { x: expanded.right, y: expanded.bottom, pressure: 0.5 },
    { x: expanded.left, y: expanded.bottom, pressure: 0.5 }
  ];
  for (let index = 0; index < corners.length; index += 1) {
    if (segmentsIntersect(start, end, corners[index], corners[(index + 1) % corners.length])) {
      return true;
    }
  }
  return false;
}

// src/annotation/eraser.ts
function getSegments(points) {
  if (points.length === 0) {
    return [];
  }
  if (points.length === 1) {
    return [{ start: points[0], end: points[0] }];
  }
  return points.slice(1).map((point, index) => ({ start: points[index], end: point }));
}
function pathTouchesStroke(stroke, segments, threshold) {
  if (stroke.points.length === 0) {
    return false;
  }
  if (segments.some((segment) => stroke.points.some((point) => distanceToSegment(point, segment.start, segment.end) <= threshold))) {
    return true;
  }
  for (let index = 1; index < stroke.points.length; index += 1) {
    if (segments.some(
      (segment) => distanceBetweenSegments(stroke.points[index - 1], stroke.points[index], segment.start, segment.end) <= threshold
    )) {
      return true;
    }
  }
  return false;
}
function interpolatePoint(start, end, progress) {
  const startTime = start.t;
  const endTime = end.t;
  return {
    x: start.x + (end.x - start.x) * progress,
    y: start.y + (end.y - start.y) * progress,
    pressure: start.pressure + (end.pressure - start.pressure) * progress,
    t: startTime !== void 0 && endTime !== void 0 ? startTime + (endTime - startTime) * progress : startTime != null ? startTime : endTime
  };
}
function pointTouchesPath(point, segments, threshold) {
  return segments.some((segment) => distanceToSegment(point, segment.start, segment.end) <= threshold);
}
function sampleStrokeNearEraser(stroke, segments, threshold) {
  if (stroke.points.length < 2) {
    return [...stroke.points];
  }
  const sampleSpacing = Math.max(25e-5, Math.min(threshold * 0.2, 25e-4));
  const sampled = [stroke.points[0]];
  for (let index = 1; index < stroke.points.length; index += 1) {
    const start = stroke.points[index - 1];
    const end = stroke.points[index];
    const touches = segments.some(
      (segment) => distanceBetweenSegments(start, end, segment.start, segment.end) <= threshold
    );
    const steps = touches ? Math.min(256, Math.max(1, Math.ceil(distanceBetween2(start, end) / sampleSpacing))) : 1;
    for (let step = 1; step <= steps; step += 1) {
      sampled.push(step === steps ? end : interpolatePoint(start, end, step / steps));
    }
  }
  return sampled;
}
function getCutContextPoint(outside, inside, segments, threshold) {
  let low = 0;
  let high = 1;
  for (let iteration = 0; iteration < 8; iteration += 1) {
    const middle = (low + high) / 2;
    if (pointTouchesPath(interpolatePoint(outside, inside, middle), segments, threshold)) {
      high = middle;
    } else {
      low = middle;
    }
  }
  return interpolatePoint(outside, inside, low);
}
function splitStrokeByEraserPath(stroke, eraserPoints, radiusScale, createId) {
  var _a2;
  const segments = getSegments(eraserPoints);
  const threshold = Math.max(5e-4, radiusScale) + Math.max(0, (_a2 = stroke.widthScale) != null ? _a2 : 0) * 0.5;
  if (segments.length === 0 || !pathTouchesStroke(stroke, segments, threshold)) {
    return { changed: false, strokes: [stroke] };
  }
  if (stroke.points.length === 1) {
    return { changed: true, strokes: [] };
  }
  const sampled = sampleStrokeNearEraser(stroke, segments, threshold);
  const fragments = [];
  let active = [];
  let activeCutStart = false;
  let previous = sampled[0];
  let previousErased = pointTouchesPath(previous, segments, threshold);
  if (!previousErased) {
    active.push(previous);
  }
  for (let index = 1; index < sampled.length; index += 1) {
    const point = sampled[index];
    const erased = pointTouchesPath(point, segments, threshold);
    if (!previousErased && erased && active.length > 0) {
      active.push(getCutContextPoint(previous, point, segments, threshold));
      if (active.length >= 2) {
        fragments.push({ points: active, cutStart: activeCutStart, cutEnd: true });
      }
      active = [];
    } else if (previousErased && !erased) {
      activeCutStart = true;
      active = [getCutContextPoint(point, previous, segments, threshold), point];
    } else if (!erased) {
      active.push(point);
    }
    previous = point;
    previousErased = erased;
  }
  if (active.length >= 2) {
    fragments.push({ points: active, cutStart: activeCutStart, cutEnd: false });
  }
  return {
    changed: true,
    strokes: fragments.map((fragment, index) => ({
      ...stroke,
      id: index === 0 ? stroke.id : createId(),
      points: fragment.points,
      cutStart: stroke.cutStart === true || fragment.cutStart,
      cutEnd: stroke.cutEnd === true || fragment.cutEnd
    }))
  };
}
function eraseStrokeSegmentsAlongPath(document, pageNumber, eraserPoints, radiusScale, createId) {
  let changed = false;
  const strokes = [];
  for (const stroke of document.strokes) {
    if (stroke.page !== pageNumber) {
      strokes.push(stroke);
      continue;
    }
    const result = splitStrokeByEraserPath(stroke, eraserPoints, radiusScale, createId);
    changed = changed || result.changed;
    strokes.push(...result.strokes);
  }
  if (changed) {
    document.strokes = strokes;
  }
  return changed;
}
function migrateStrokeEraseMasks(strokes, createId) {
  let changed = false;
  const migrated = [];
  for (const storedStroke of strokes) {
    const legacyStroke = storedStroke;
    const masks = Array.isArray(legacyStroke.eraseMasks) ? legacyStroke.eraseMasks : [];
    if (masks.length === 0) {
      migrated.push(storedStroke);
      continue;
    }
    const { eraseMasks: _discardedMasks, ...baseStroke } = legacyStroke;
    let fragments = [baseStroke];
    for (const mask of masks) {
      if (!Array.isArray(mask.points) || mask.points.length === 0) {
        continue;
      }
      fragments = fragments.flatMap(
        (fragment) => splitStrokeByEraserPath(fragment, mask.points, Math.max(5e-4, Number(mask.radiusScale) || 4e-3), createId).strokes
      );
    }
    migrated.push(...fragments);
    changed = true;
  }
  if (changed) {
    strokes.splice(0, strokes.length, ...migrated);
  }
  return changed;
}
function pathTouchesText(item, segments, threshold) {
  const bounds = getTextBounds(item);
  return segments.some((segment) => segmentIntersectsExpandedBounds(segment.start, segment.end, bounds, threshold));
}
function pathTouchesImage(image, segments, threshold) {
  const bounds = {
    left: image.x,
    top: image.y,
    right: image.x + image.widthScale,
    bottom: image.y + image.heightScale
  };
  return segments.some((segment) => segmentIntersectsExpandedBounds(segment.start, segment.end, bounds, threshold));
}
function pathTouchesShape(shape, segments, threshold) {
  if (shape.tool === "line") {
    return segments.some((segment) => distanceBetweenSegments(segment.start, segment.end, shape.start, shape.end) <= threshold);
  }
  const bounds = getShapeBounds(shape);
  return segments.some(
    (segment) => segmentIntersectsExpandedBounds(segment.start, segment.end, bounds, threshold) || distanceToShape(segment.start, shape) <= threshold || distanceToShape(segment.end, shape) <= threshold
  );
}
function getOrder(zIndex, fallback) {
  return zIndex != null ? zIndex : fallback;
}
function migrateLegacyEraserPaths(document) {
  var _a2, _b;
  const eraserPaths = [...(_a2 = document.eraserPaths) != null ? _a2 : []].map((annotation, index) => ({ annotation, fallbackOrder: 3e5 + index })).sort((left, right) => getOrder(left.annotation.zIndex, left.fallbackOrder) - getOrder(right.annotation.zIndex, right.fallbackOrder));
  if (eraserPaths.length === 0) {
    return false;
  }
  for (const { annotation: eraserPath, fallbackOrder } of eraserPaths) {
    const segments = getSegments(eraserPath.points);
    if (segments.length === 0) {
      continue;
    }
    const eraseOrder = getOrder(eraserPath.zIndex, fallbackOrder);
    document.strokes = document.strokes.filter(
      (stroke, index) => {
        var _a3;
        return stroke.page !== eraserPath.page || getOrder(stroke.zIndex, index) >= eraseOrder || !pathTouchesStroke(
          stroke,
          segments,
          Math.max(5e-4, eraserPath.radiusScale) + Math.max(0, (_a3 = stroke.widthScale) != null ? _a3 : 0) * 0.5
        );
      }
    );
    document.textItems = document.textItems.filter(
      (item, index) => item.page !== eraserPath.page || getOrder(item.zIndex, 1e5 + index) >= eraseOrder || !pathTouchesText(item, segments, eraserPath.radiusScale)
    );
    document.shapes = document.shapes.filter(
      (shape, index) => shape.page !== eraserPath.page || getOrder(shape.zIndex, 2e5 + index) >= eraseOrder || !pathTouchesShape(shape, segments, eraserPath.radiusScale)
    );
    document.imageItems = ((_b = document.imageItems) != null ? _b : []).filter(
      (image, index) => image.page !== eraserPath.page || getOrder(image.zIndex, index) >= eraseOrder || !pathTouchesImage(image, segments, eraserPath.radiusScale)
    );
  }
  document.eraserPaths = [];
  return true;
}

// src/notebook/paperTemplates.ts
var A4_WIDTH_MM = 210;
var GRAPH_SPACING_MM = 5;
var RULED_SPACING_MM = 8;
var RULED_TOP_MARGIN_MM = 20;
var DOT_SPACING_MM = 5;
var PAPER_TEMPLATE_LINE_COLOR = "rgba(78, 123, 166, 0.22)";
var PAPER_TEMPLATE_GRID_COLOR = "rgba(86, 112, 148, 0.14)";
var PAPER_TEMPLATE_DOT_COLOR = "rgba(86, 112, 148, 0.28)";
function getPaperTemplateMetrics(pageWidthPx) {
  const pxPerMm = Math.max(1, pageWidthPx) / A4_WIDTH_MM;
  const graphStep = GRAPH_SPACING_MM * pxPerMm;
  const ruledStep = RULED_SPACING_MM * pxPerMm;
  const dotStep = DOT_SPACING_MM * pxPerMm;
  return {
    graphStep,
    ruledStep,
    ruledOffset: RULED_TOP_MARGIN_MM * pxPerMm,
    dotStep,
    dotRadius: Math.max(0.65, dotStep * 0.052)
  };
}

// src/config.ts
var ANNOTATION_FILE_SUFFIX = ".annot.json";
var MAX_HISTORY = 100;
var PAGE_VIRTUALIZATION_MARGIN = 0;
var ZOOM_SETTLE_DELAY_MS = 120;
var SESSION_ROOT_CLASS = "pdf-native-annotator-ui";
var OVERLAY_CLASS = "pdf-native-annotator-overlay";
var PAGE_SELECTORS = [
  ".pdfViewer .page[data-page-number]",
  ".page[data-page-number]",
  ".pdf-page[data-page-number]"
].join(", ");
var PAGE_HOST_SELECTORS = [
  ".canvasWrapper",
  ".page canvas",
  ".pdf-page canvas"
].join(", ");
var TOOLBAR_SELECTORS = [
  ".pdf-toolbar"
].join(", ");
var TOOL_WIDTH_RANGES = {
  pen: { min: 1, max: 48, step: 0.5 },
  highlighter: { min: 4, max: 64, step: 0.5 },
  eraser: { min: 4, max: 80, step: 1 }
};
function clampToolWidth(kind, width) {
  const range = TOOL_WIDTH_RANGES[kind];
  const finiteWidth = Number.isFinite(width) ? width : DEFAULT_TOOL_STATE.widths[kind];
  return Math.max(range.min, Math.min(range.max, finiteWidth));
}
var DEFAULT_TOOL_PRESETS = [
  { id: "pen-slot-1", label: "Pen 1", kind: "pen", color: "#ff6b57", width: 3, opacity: 0.96 },
  { id: "pen-slot-2", label: "Pen 2", kind: "pen", color: "#55b4ff", width: 5, opacity: 0.96 },
  { id: "pen-slot-3", label: "Pen 3", kind: "pen", color: "#a855f7", width: 8, opacity: 0.96 },
  { id: "highlight-slot-1", label: "Highlighter 1", kind: "highlighter", color: "#ffcb47", width: 12, opacity: 0.24 },
  { id: "highlight-slot-2", label: "Highlighter 2", kind: "highlighter", color: "#6bcf8a", width: 16, opacity: 0.22 },
  { id: "highlight-slot-3", label: "Highlighter 3", kind: "highlighter", color: "#8fdff0", width: 20, opacity: 0.22 },
  { id: "eraser-slot-1", label: "Eraser 1", kind: "eraser", color: "#ffffff", width: 10, opacity: 1 },
  { id: "eraser-slot-2", label: "Eraser 2", kind: "eraser", color: "#ffffff", width: 18, opacity: 1 },
  { id: "eraser-slot-3", label: "Eraser 3", kind: "eraser", color: "#ffffff", width: 30, opacity: 1 }
];
var TEXT_FONT_FAMILIES = [
  "Segoe UI",
  "Georgia",
  "Times New Roman",
  "Verdana",
  "Courier New"
];
var TEXT_COLOR_PRESETS = [
  { color: "#202124", label: "Black" },
  { color: "#ff6b57", label: "Coral" },
  { color: "#ffcb47", label: "Yellow" },
  { color: "#55b4ff", label: "Blue" },
  { color: "#6bcf8a", label: "Green" },
  { color: "#a855f7", label: "Violet" }
];
var PAPER_COLOR_PRESETS = [
  { label: "Cream", color: "#fffdf7" },
  { label: "White", color: "#ffffff" },
  { label: "Soft yellow", color: "#fff7cc" },
  { label: "Blue tint", color: "#eef6ff" },
  { label: "Green tint", color: "#effaf0" },
  { label: "Gray", color: "#f3f3f3" }
];
var DEFAULT_TOOL_STATE = {
  activeTool: "pen",
  activeColor: "#ff6b57",
  activeOpacity: 0.96,
  eraserMode: "segment",
  selectionMode: "single",
  selectedPresetId: "pen-slot-1",
  selectedPresetIds: {
    pen: "pen-slot-1",
    highlighter: "highlight-slot-1",
    eraser: "eraser-slot-2"
  },
  widths: {
    pen: 4,
    highlighter: 12,
    eraser: 18
  }
};
var _a;
var DEFAULT_SETTINGS = {
  pressureCaptureVersion: 1,
  toolDefaults: {
    ...DEFAULT_TOOL_STATE,
    selectedPresetIds: { ...(_a = DEFAULT_TOOL_STATE.selectedPresetIds) != null ? _a : {} },
    widths: { ...DEFAULT_TOOL_STATE.widths }
  },
  presets: DEFAULT_TOOL_PRESETS.map((preset) => ({ ...preset })),
  textColor: TEXT_COLOR_PRESETS[0].color,
  preferInlineToolbar: true,
  showRegionToolbarButton: false,
  showCopyEmbedToolbarButton: false,
  autoCopyRegionEmbed: true,
  showAnnotatedEmbedHeader: false,
  showDrawingNotices: false,
  showRenderTelemetry: false,
  inkInputPolicy: "pen-mouse-only",
  livePreviewMode: "balanced",
  inkRenderSettings: {
    thinning: 0.5,
    streamline: 0.12,
    smoothing: 0.5,
    easing: "linear",
    taperStart: 0,
    taperEnd: 0,
    pressureMode: "auto"
  },
  autosaveDelayMs: 600
};
function normalizeToolPresets(presets) {
  var _a2, _b;
  const incoming = Array.isArray(presets) ? presets : [];
  const normalized = [];
  for (const kind of ["pen", "highlighter", "eraser"]) {
    const defaults = DEFAULT_TOOL_PRESETS.filter((preset) => preset.kind === kind);
    const saved = incoming.filter((preset) => preset.kind === kind);
    for (let index = 0; index < defaults.length; index += 1) {
      const fallback = defaults[index];
      const stored = (_a2 = incoming.find((preset) => preset.id === fallback.id)) != null ? _a2 : saved[index];
      normalized.push({
        ...fallback,
        color: (_b = stored == null ? void 0 : stored.color) != null ? _b : fallback.color,
        width: clampToolWidth(kind, typeof (stored == null ? void 0 : stored.width) === "number" ? stored.width : fallback.width),
        opacity: typeof (stored == null ? void 0 : stored.opacity) === "number" ? stored.opacity : fallback.opacity
      });
    }
  }
  return normalized;
}

// src/stores/annotationStore.ts
var import_obsidian = require("obsidian");

// src/settings/settingsController.ts
function normalizeInkInputPolicy(value) {
  if (value === "pen-mouse-stylus-touch") {
    return "allow-touch";
  }
  return value === "pen-mouse-only" || value === "allow-touch" ? value : DEFAULT_SETTINGS.inkInputPolicy;
}
function normalizeLivePreviewMode(value) {
  const migratedValue = value === "quality" ? "smooth" : value === "fast" ? "accurate" : value;
  return migratedValue === "accurate" || migratedValue === "balanced" || migratedValue === "smooth" ? migratedValue : DEFAULT_SETTINGS.livePreviewMode;
}
function normalizeColor(value, fallback) {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}
function clampNumber(value, fallback, min, max) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;
}
function normalizeInkPressureMode(value) {
  return value === "auto" || value === "stylus" || value === "simulate" ? value : DEFAULT_SETTINGS.inkRenderSettings.pressureMode;
}
function normalizeInkEasingMode(value) {
  return value === "ease-in" || value === "ease-out" || value === "ease-in-out" || value === "linear" ? value : DEFAULT_SETTINGS.inkRenderSettings.easing;
}
function normalizeInkRenderSettings(value) {
  const raw = value && typeof value === "object" ? value : {};
  return {
    thinning: clampNumber(raw.thinning, DEFAULT_SETTINGS.inkRenderSettings.thinning, -1, 1),
    streamline: clampNumber(raw.streamline, DEFAULT_SETTINGS.inkRenderSettings.streamline, 0, 1),
    smoothing: clampNumber(raw.smoothing, DEFAULT_SETTINGS.inkRenderSettings.smoothing, 0, 1),
    easing: normalizeInkEasingMode(raw.easing),
    taperStart: clampNumber(raw.taperStart, DEFAULT_SETTINGS.inkRenderSettings.taperStart, 0, 120),
    taperEnd: clampNumber(raw.taperEnd, DEFAULT_SETTINGS.inkRenderSettings.taperEnd, 0, 120),
    pressureMode: normalizeInkPressureMode(raw.pressureMode)
  };
}
var PDFAnnotatorSettingsController = class {
  constructor(loadData, saveData, onBehaviorChanged) {
    this.loadData = loadData;
    this.saveData = saveData;
    this.onBehaviorChanged = onBehaviorChanged;
    this.settings = this.createDefaultSettings();
    this.settingsSaveHandle = null;
  }
  async load() {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    const loaded = await this.loadData();
    const toolDefaults = (_a2 = loaded == null ? void 0 : loaded.toolDefaults) != null ? _a2 : {};
    const loadedWidths = toolDefaults.widths;
    const normalizedPresets = normalizeToolPresets(loaded == null ? void 0 : loaded.presets);
    const shouldMigrateLegacyPressure = (loaded == null ? void 0 : loaded.pressureCaptureVersion) !== 1;
    const loadedLivePreviewMode = loaded == null ? void 0 : loaded.livePreviewMode;
    const shouldMigrateLegacyPreview = loadedLivePreviewMode === "quality" || loadedLivePreviewMode === "fast";
    const inkRenderSettings = normalizeInkRenderSettings(loaded == null ? void 0 : loaded.inkRenderSettings);
    if (shouldMigrateLegacyPressure && inkRenderSettings.pressureMode === "simulate") {
      inkRenderSettings.pressureMode = "auto";
    }
    this.settings = {
      pressureCaptureVersion: 1,
      toolDefaults: {
        ...DEFAULT_SETTINGS.toolDefaults,
        ...toolDefaults,
        selectedPresetIds: {
          ...(_b = DEFAULT_SETTINGS.toolDefaults.selectedPresetIds) != null ? _b : {},
          ...(_c = toolDefaults.selectedPresetIds) != null ? _c : {}
        },
        widths: {
          pen: clampToolWidth("pen", (_d = loadedWidths == null ? void 0 : loadedWidths.pen) != null ? _d : DEFAULT_SETTINGS.toolDefaults.widths.pen),
          highlighter: clampToolWidth("highlighter", (_e = loadedWidths == null ? void 0 : loadedWidths.highlighter) != null ? _e : DEFAULT_SETTINGS.toolDefaults.widths.highlighter),
          eraser: clampToolWidth("eraser", (_f = loadedWidths == null ? void 0 : loadedWidths.eraser) != null ? _f : DEFAULT_SETTINGS.toolDefaults.widths.eraser)
        }
      },
      presets: normalizedPresets,
      textColor: normalizeColor(loaded == null ? void 0 : loaded.textColor, DEFAULT_SETTINGS.textColor),
      preferInlineToolbar: typeof (loaded == null ? void 0 : loaded.preferInlineToolbar) === "boolean" ? loaded.preferInlineToolbar : DEFAULT_SETTINGS.preferInlineToolbar,
      showRegionToolbarButton: typeof (loaded == null ? void 0 : loaded.showRegionToolbarButton) === "boolean" ? loaded.showRegionToolbarButton : DEFAULT_SETTINGS.showRegionToolbarButton,
      showCopyEmbedToolbarButton: typeof (loaded == null ? void 0 : loaded.showCopyEmbedToolbarButton) === "boolean" ? loaded.showCopyEmbedToolbarButton : DEFAULT_SETTINGS.showCopyEmbedToolbarButton,
      autoCopyRegionEmbed: typeof (loaded == null ? void 0 : loaded.autoCopyRegionEmbed) === "boolean" ? loaded.autoCopyRegionEmbed : DEFAULT_SETTINGS.autoCopyRegionEmbed,
      showAnnotatedEmbedHeader: typeof (loaded == null ? void 0 : loaded.showAnnotatedEmbedHeader) === "boolean" ? loaded.showAnnotatedEmbedHeader : DEFAULT_SETTINGS.showAnnotatedEmbedHeader,
      showDrawingNotices: typeof (loaded == null ? void 0 : loaded.showDrawingNotices) === "boolean" ? loaded.showDrawingNotices : DEFAULT_SETTINGS.showDrawingNotices,
      showRenderTelemetry: typeof (loaded == null ? void 0 : loaded.showRenderTelemetry) === "boolean" ? loaded.showRenderTelemetry : DEFAULT_SETTINGS.showRenderTelemetry,
      inkInputPolicy: normalizeInkInputPolicy(loaded == null ? void 0 : loaded.inkInputPolicy),
      livePreviewMode: normalizeLivePreviewMode(loadedLivePreviewMode),
      inkRenderSettings,
      legacyInkRenderSettings: normalizeInkRenderSettings((_g = loaded == null ? void 0 : loaded.legacyInkRenderSettings) != null ? _g : inkRenderSettings),
      autosaveDelayMs: typeof (loaded == null ? void 0 : loaded.autosaveDelayMs) === "number" ? loaded.autosaveDelayMs : DEFAULT_SETTINGS.autosaveDelayMs
    };
    if (!(loaded == null ? void 0 : loaded.legacyInkRenderSettings) || shouldMigrateLegacyPressure || shouldMigrateLegacyPreview || JSON.stringify((_h = loaded == null ? void 0 : loaded.presets) != null ? _h : []) !== JSON.stringify(normalizedPresets)) {
      this.scheduleSave();
    }
  }
  dispose() {
    if (this.settingsSaveHandle !== null) {
      window.clearTimeout(this.settingsSaveHandle);
      this.settingsSaveHandle = null;
    }
  }
  getToolDefaults() {
    var _a2;
    return {
      ...this.settings.toolDefaults,
      selectedPresetIds: { ...(_a2 = this.settings.toolDefaults.selectedPresetIds) != null ? _a2 : {} },
      widths: { ...this.settings.toolDefaults.widths }
    };
  }
  getLegacyInkRenderSettings() {
    var _a2;
    return { ...(_a2 = this.settings.legacyInkRenderSettings) != null ? _a2 : this.settings.inkRenderSettings };
  }
  getTextColor() {
    return this.settings.textColor;
  }
  getInlineToolbarPreference() {
    return this.settings.preferInlineToolbar;
  }
  getAutosaveDelayMs() {
    return this.settings.autosaveDelayMs;
  }
  shouldShowRegionToolbarButton() {
    return this.settings.showRegionToolbarButton;
  }
  shouldShowCopyEmbedToolbarButton() {
    return this.settings.showCopyEmbedToolbarButton;
  }
  shouldAutoCopyRegionEmbed() {
    return this.settings.autoCopyRegionEmbed;
  }
  shouldShowAnnotatedEmbedHeader() {
    return this.settings.showAnnotatedEmbedHeader;
  }
  shouldShowDrawingNotices() {
    return this.settings.showDrawingNotices;
  }
  shouldShowRenderTelemetry() {
    return this.settings.showRenderTelemetry;
  }
  getInkInputPolicy() {
    return this.settings.inkInputPolicy;
  }
  getLivePreviewMode() {
    return this.settings.livePreviewMode;
  }
  getInkRenderSettings() {
    return { ...this.settings.inkRenderSettings };
  }
  getStoredPresets() {
    return this.settings.presets.map((preset) => ({ ...preset }));
  }
  updateToolPreferences(snapshot, presets) {
    var _a2;
    this.settings.toolDefaults = {
      ...snapshot,
      selectedPresetIds: { ...(_a2 = snapshot.selectedPresetIds) != null ? _a2 : {} },
      widths: {
        pen: clampToolWidth("pen", snapshot.widths.pen),
        highlighter: clampToolWidth("highlighter", snapshot.widths.highlighter),
        eraser: clampToolWidth("eraser", snapshot.widths.eraser)
      }
    };
    this.settings.presets = normalizeToolPresets(presets);
    this.scheduleSave();
  }
  updateTextColor(color) {
    this.settings.textColor = normalizeColor(color, this.settings.textColor);
    this.scheduleSave();
  }
  async updateBehaviorSettings(nextSettings) {
    this.settings = {
      ...this.settings,
      ...nextSettings
    };
    this.scheduleSave();
    this.onBehaviorChanged();
  }
  createDefaultSettings() {
    var _a2;
    return {
      pressureCaptureVersion: DEFAULT_SETTINGS.pressureCaptureVersion,
      toolDefaults: {
        ...DEFAULT_SETTINGS.toolDefaults,
        selectedPresetIds: { ...(_a2 = DEFAULT_SETTINGS.toolDefaults.selectedPresetIds) != null ? _a2 : {} },
        widths: { ...DEFAULT_SETTINGS.toolDefaults.widths }
      },
      presets: DEFAULT_SETTINGS.presets.map((preset) => ({ ...preset })),
      textColor: DEFAULT_SETTINGS.textColor,
      preferInlineToolbar: DEFAULT_SETTINGS.preferInlineToolbar,
      showRegionToolbarButton: DEFAULT_SETTINGS.showRegionToolbarButton,
      showCopyEmbedToolbarButton: DEFAULT_SETTINGS.showCopyEmbedToolbarButton,
      autoCopyRegionEmbed: DEFAULT_SETTINGS.autoCopyRegionEmbed,
      showAnnotatedEmbedHeader: DEFAULT_SETTINGS.showAnnotatedEmbedHeader,
      showDrawingNotices: DEFAULT_SETTINGS.showDrawingNotices,
      showRenderTelemetry: DEFAULT_SETTINGS.showRenderTelemetry,
      inkInputPolicy: DEFAULT_SETTINGS.inkInputPolicy,
      livePreviewMode: DEFAULT_SETTINGS.livePreviewMode,
      inkRenderSettings: { ...DEFAULT_SETTINGS.inkRenderSettings },
      autosaveDelayMs: DEFAULT_SETTINGS.autosaveDelayMs
    };
  }
  scheduleSave() {
    if (this.settingsSaveHandle !== null) {
      window.clearTimeout(this.settingsSaveHandle);
    }
    this.settingsSaveHandle = window.setTimeout(() => {
      this.settingsSaveHandle = null;
      void this.saveData(this.settings);
    }, 150);
  }
};

// src/stores/annotationStore.ts
var DEFAULT_STROKE_REFERENCE_WIDTH = 1524;
var MAX_STROKE_WIDTH_SCALE = 0.08;
var MAX_TEXT_FONT_SCALE = 0.08;
var SCALE_DRIFT_TOLERANCE = 2.25;
function getStableScale(width, maxScale, minScale) {
  return Math.min(maxScale, Math.max(minScale, width / DEFAULT_STROKE_REFERENCE_WIDTH));
}
function isUsableStoredScale(width, scale, maxScale, minScale) {
  if (scale === void 0 || !Number.isFinite(scale) || scale <= 0 || scale > maxScale) {
    return false;
  }
  const fallback = getStableScale(width, maxScale, minScale);
  return scale <= fallback * SCALE_DRIFT_TOLERANCE;
}
function getPdfIdentity(file) {
  return {
    path: file.path,
    name: file.name,
    basename: file.basename,
    size: file.stat.size,
    ctime: file.stat.ctime,
    mtime: file.stat.mtime
  };
}
function createEmptyDocument(file) {
  return {
    version: 8,
    sourceFile: file.path,
    sourcePdf: getPdfIdentity(file),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    strokes: [],
    eraserPaths: [],
    textItems: [],
    shapes: [],
    imageItems: [],
    pdfPageTemplates: [],
    nativePageTemplatesEditable: false,
    appendedPages: [],
    deletedPdfPages: [],
    permanentlyDeletedPdfPages: [],
    removedPages: []
  };
}
function cloneDocument(document) {
  return JSON.parse(JSON.stringify(document));
}
function normalizeAnnotationZIndexes(strokes, textItems, shapes, eraserPaths = []) {
  let changed = false;
  const renderables = [
    ...getAnnotationRenderables(strokes, textItems, shapes),
    ...eraserPaths.map((annotation, index) => ({
      kind: "eraser",
      annotation,
      fallbackOrder: 3e5 + index
    }))
  ].sort(
    (left, right) => {
      var _a2, _b;
      return ((_a2 = left.annotation.zIndex) != null ? _a2 : left.fallbackOrder) - ((_b = right.annotation.zIndex) != null ? _b : right.fallbackOrder);
    }
  );
  renderables.forEach((renderable, index) => {
    if (renderable.annotation.zIndex !== index) {
      renderable.annotation.zIndex = index;
      changed = true;
    }
  });
  return changed;
}
function normalizeDocumentZIndexes(document) {
  var _a2, _b;
  const pages = /* @__PURE__ */ new Set([
    ...document.strokes.map((stroke) => stroke.page),
    ...document.textItems.map((item) => item.page),
    ...document.shapes.map((shape) => shape.page),
    ...((_a2 = document.eraserPaths) != null ? _a2 : []).map((eraserPath) => eraserPath.page)
  ]);
  let changed = false;
  for (const page of pages) {
    const pageChanged = normalizeAnnotationZIndexes(
      document.strokes.filter((stroke) => stroke.page === page),
      document.textItems.filter((item) => item.page === page),
      document.shapes.filter((shape) => shape.page === page),
      ((_b = document.eraserPaths) != null ? _b : []).filter((eraserPath) => eraserPath.page === page)
    );
    changed = changed || pageChanged;
  }
  return changed;
}
function normalizeDocumentStrokeScales(document) {
  let changed = false;
  for (const stroke of document.strokes) {
    if (!isUsableStoredScale(stroke.width, stroke.widthScale, MAX_STROKE_WIDTH_SCALE, 5e-4)) {
      stroke.widthScale = getStableScale(stroke.width, MAX_STROKE_WIDTH_SCALE, 5e-4);
      changed = true;
    }
  }
  for (const shape of document.shapes) {
    if (!isUsableStoredScale(shape.width, shape.widthScale, MAX_STROKE_WIDTH_SCALE, 5e-4)) {
      shape.widthScale = getStableScale(shape.width, MAX_STROKE_WIDTH_SCALE, 5e-4);
      changed = true;
    }
  }
  for (const textItem of document.textItems) {
    if (!isUsableStoredScale(textItem.fontSize, textItem.fontScale, MAX_TEXT_FONT_SCALE, 4e-3)) {
      textItem.fontScale = getStableScale(textItem.fontSize, MAX_TEXT_FONT_SCALE, 4e-3);
      changed = true;
    }
  }
  return changed;
}
var AnnotationStore = class {
  constructor(app, legacyInkSettings = DEFAULT_SETTINGS.inkRenderSettings) {
    this.app = app;
    this.baselines = /* @__PURE__ */ new WeakMap();
    this.writes = /* @__PURE__ */ new Map();
    this.recoveryCopies = /* @__PURE__ */ new WeakMap();
    this.renames = /* @__PURE__ */ new Map();
    this.legacyInkSettings = normalizeInkRenderSettings(legacyInkSettings);
  }
  inheritBaseline(previous, next) {
    const baseline = previous ? this.baselines.get(previous) : void 0;
    if (baseline) {
      this.baselines.set(next, baseline);
    }
  }
  getSidecarPath(file) {
    return `${file.path}${ANNOTATION_FILE_SUFFIX}`;
  }
  async load(file) {
    return (await this.loadWithInfo(file)).document;
  }
  async loadWithInfo(file) {
    var _a2, _b, _c, _d, _e, _f, _g;
    const expectedSidecarPath = this.getSidecarPath(file);
    await this.writes.get(expectedSidecarPath);
    let path = this.getSidecarPath(file);
    let exists = await this.app.vault.adapter.exists(path);
    if (!exists) {
      const candidatePath = await this.findRenameCandidateSidecarPath(file);
      if (candidatePath) {
        path = candidatePath;
        exists = true;
        new import_obsidian.Notice(`Found annotation data for ${file.name}; using ${candidatePath}.`);
      }
    }
    if (!exists) {
      const document = createEmptyDocument(file);
      this.baselines.set(document, { path: expectedSidecarPath, raw: null });
      return {
        document,
        sidecarPath: null,
        expectedSidecarPath,
        recoveredFromDifferentPath: false,
        sourcePathMismatch: false
      };
    }
    try {
      const raw = await this.app.vault.adapter.read(path);
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.strokes)) {
        throw new Error("Invalid annotation document structure.");
      }
      const sourcePdfPath = typeof ((_a2 = parsed.sourcePdf) == null ? void 0 : _a2.path) === "string" ? parsed.sourcePdf.path : parsed.sourceFile;
      const document = {
        version: Math.max(8, (_b = parsed.version) != null ? _b : 4),
        sourceFile: (_c = parsed.sourceFile) != null ? _c : file.path,
        sourcePdf: this.normalizeSourcePdf(parsed.sourcePdf, file),
        updatedAt: (_d = parsed.updatedAt) != null ? _d : (/* @__PURE__ */ new Date()).toISOString(),
        strokes: Array.isArray(parsed.strokes) ? parsed.strokes.map((stroke) => {
          var _a3;
          return {
            ...stroke,
            page: (_a3 = stroke.page) != null ? _a3 : 1
          };
        }) : [],
        eraserPaths: Array.isArray(parsed.eraserPaths) ? parsed.eraserPaths.filter((eraserPath) => Array.isArray(eraserPath.points) && eraserPath.points.length > 0).map((eraserPath) => {
          var _a3;
          return {
            ...eraserPath,
            page: (_a3 = eraserPath.page) != null ? _a3 : 1,
            radiusScale: Math.max(5e-4, Number(eraserPath.radiusScale) || 4e-3)
          };
        }) : [],
        textItems: Array.isArray(parsed.textItems) ? parsed.textItems.map((item) => {
          var _a3;
          return {
            ...item,
            page: (_a3 = item.page) != null ? _a3 : 1
          };
        }) : [],
        shapes: Array.isArray(parsed.shapes) ? parsed.shapes.map((shape) => {
          var _a3;
          return {
            ...shape,
            page: (_a3 = shape.page) != null ? _a3 : 1
          };
        }) : [],
        imageItems: Array.isArray(parsed.imageItems) ? parsed.imageItems.map((image) => {
          var _a3;
          return {
            ...image,
            page: (_a3 = image.page) != null ? _a3 : 1,
            x: Number.isFinite(image.x) ? image.x : 0.32,
            y: Number.isFinite(image.y) ? image.y : 0.32,
            widthScale: Number.isFinite(image.widthScale) ? image.widthScale : 0.36,
            heightScale: Number.isFinite(image.heightScale) ? image.heightScale : 0.24
          };
        }) : [],
        pdfPageTemplates: Array.isArray(parsed.pdfPageTemplates) ? parsed.pdfPageTemplates.map((pageTemplate) => {
          var _a3, _b2, _c2;
          return {
            page: Math.max(1, Math.round(Number(pageTemplate.page) || 1)),
            template: (_a3 = pageTemplate.template) != null ? _a3 : "ruled",
            paperColor: (_b2 = pageTemplate.paperColor) != null ? _b2 : "#fffdf7",
            pageSize: (_c2 = pageTemplate.pageSize) != null ? _c2 : "a4"
          };
        }) : [],
        nativePageTemplatesEditable: typeof parsed.nativePageTemplatesEditable === "boolean" ? parsed.nativePageTemplatesEditable : void 0,
        appendedPages: Array.isArray(parsed.appendedPages) ? parsed.appendedPages.map((page, index) => {
          var _a3, _b2, _c2, _d2, _e2;
          return {
            id: (_a3 = page.id) != null ? _a3 : generateId("page"),
            title: (_b2 = page.title) != null ? _b2 : `Template ${index + 1}`,
            kind: "template",
            sourceLabel: "Template page",
            insertAfterPdfPage: typeof page.insertAfterPdfPage === "number" ? page.insertAfterPdfPage : null,
            template: (_c2 = page.template) != null ? _c2 : "ruled",
            paperColor: (_d2 = page.paperColor) != null ? _d2 : "#fffdf7",
            pageSize: (_e2 = page.pageSize) != null ? _e2 : "a4",
            strokes: [],
            textItems: [],
            shapes: [],
            imageItems: []
          };
        }) : [],
        deletedPdfPages: Array.isArray(parsed.deletedPdfPages) ? Array.from(new Set(parsed.deletedPdfPages.map((page) => Math.round(Number(page))).filter((page) => Number.isFinite(page) && page > 0))).sort((a2, b2) => a2 - b2) : [],
        permanentlyDeletedPdfPages: Array.isArray(parsed.permanentlyDeletedPdfPages) ? Array.from(new Set(parsed.permanentlyDeletedPdfPages.map((page) => Math.round(Number(page))).filter((page) => Number.isFinite(page) && page > 0))).sort((a2, b2) => a2 - b2) : [],
        removedPages: Array.isArray(parsed.removedPages) ? parsed.removedPages.filter((entry) => {
          var _a3;
          return !!((_a3 = entry == null ? void 0 : entry.page) == null ? void 0 : _a3.id);
        }).map((entry, index) => {
          var _a3, _b2, _c2, _d2, _e2, _f2, _g2, _h, _i, _j, _k;
          return {
            page: {
              ...entry.page,
              id: (_a3 = entry.page.id) != null ? _a3 : generateId("page"),
              title: (_b2 = entry.page.title) != null ? _b2 : `Removed page ${index + 1}`,
              kind: "template",
              sourceLabel: "Template page",
              insertAfterPdfPage: typeof entry.page.insertAfterPdfPage === "number" ? entry.page.insertAfterPdfPage : null,
              template: (_c2 = entry.page.template) != null ? _c2 : "ruled",
              paperColor: (_d2 = entry.page.paperColor) != null ? _d2 : "#fffdf7",
              pageSize: (_e2 = entry.page.pageSize) != null ? _e2 : "a4",
              strokes: [],
              textItems: [],
              shapes: [],
              imageItems: []
            },
            originalIndex: Math.max(0, Math.round(Number(entry.originalIndex) || 0)),
            removedAt: (_f2 = entry.removedAt) != null ? _f2 : (/* @__PURE__ */ new Date()).toISOString(),
            annotations: {
              strokes: Array.isArray((_g2 = entry.annotations) == null ? void 0 : _g2.strokes) ? entry.annotations.strokes.map((stroke) => {
                var _a4;
                return { ...stroke, page: (_a4 = stroke.page) != null ? _a4 : 1 };
              }) : [],
              eraserPaths: Array.isArray((_h = entry.annotations) == null ? void 0 : _h.eraserPaths) ? entry.annotations.eraserPaths.map((eraserPath) => {
                var _a4;
                return {
                  ...eraserPath,
                  page: (_a4 = eraserPath.page) != null ? _a4 : 1,
                  radiusScale: Math.max(5e-4, Number(eraserPath.radiusScale) || 4e-3)
                };
              }) : [],
              textItems: Array.isArray((_i = entry.annotations) == null ? void 0 : _i.textItems) ? entry.annotations.textItems.map((item) => {
                var _a4;
                return { ...item, page: (_a4 = item.page) != null ? _a4 : 1 };
              }) : [],
              shapes: Array.isArray((_j = entry.annotations) == null ? void 0 : _j.shapes) ? entry.annotations.shapes.map((shape) => {
                var _a4;
                return { ...shape, page: (_a4 = shape.page) != null ? _a4 : 1 };
              }) : [],
              imageItems: Array.isArray((_k = entry.annotations) == null ? void 0 : _k.imageItems) ? entry.annotations.imageItems.map((image) => {
                var _a4;
                return {
                  ...image,
                  page: (_a4 = image.page) != null ? _a4 : 1,
                  x: Number.isFinite(image.x) ? image.x : 0.32,
                  y: Number.isFinite(image.y) ? image.y : 0.32,
                  widthScale: Number.isFinite(image.widthScale) ? image.widthScale : 0.36,
                  heightScale: Number.isFinite(image.heightScale) ? image.heightScale : 0.24
                };
              }) : []
            }
          };
        }) : []
      };
      let migratedInkSettings = false;
      const allStrokes = [...document.strokes, ...((_e = document.removedPages) != null ? _e : []).flatMap((page) => page.annotations.strokes)];
      for (const stroke of allStrokes) {
        if (!stroke.inkSettings) {
          migratedInkSettings = true;
        }
        stroke.inkSettings = normalizeInkRenderSettings((_f = stroke.inkSettings) != null ? _f : this.legacyInkSettings);
      }
      let migratedStrokeMasks = migrateStrokeEraseMasks(document.strokes, () => generateId("stroke"));
      for (const removedPage of (_g = document.removedPages) != null ? _g : []) {
        migratedStrokeMasks = migrateStrokeEraseMasks(removedPage.annotations.strokes, () => generateId("stroke")) || migratedStrokeMasks;
      }
      const migratedLegacyErasers = migrateLegacyEraserPaths(document) || migratedStrokeMasks;
      this.baselines.set(document, { path, raw });
      return {
        document,
        sidecarPath: path,
        expectedSidecarPath,
        recoveredFromDifferentPath: path !== expectedSidecarPath,
        sourcePathMismatch: !!sourcePdfPath && sourcePdfPath !== file.path,
        sourcePdfPath,
        migratedLegacyErasers,
        migratedInkSettings
      };
    } catch (error) {
      console.error("freedraw-pdf: failed to load sidecar", error);
      throw new Error("Could not read annotation data. The original sidecar is preserved; repair it or restore a backup before editing.");
    }
  }
  async save(file, document) {
    var _a2;
    const path = this.getSidecarPath(file);
    const payload = JSON.stringify(
      {
        ...document,
        sourceFile: file.path,
        sourcePdf: getPdfIdentity(file),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      null,
      2
    );
    const previous = (_a2 = this.writes.get(path)) != null ? _a2 : Promise.resolve();
    const write = previous.catch(() => void 0).then(async () => {
      var _a3, _b;
      const baseline = this.baselines.get(document);
      const existing = await this.app.vault.adapter.exists(path) ? await this.app.vault.adapter.read(path) : null;
      let expectedPath = baseline == null ? void 0 : baseline.path;
      let expectedRaw = baseline == null ? void 0 : baseline.raw;
      const visited = /* @__PURE__ */ new Set();
      while (expectedPath && expectedPath !== path && !visited.has(expectedPath)) {
        visited.add(expectedPath);
        const rename = this.renames.get(expectedPath);
        if (!rename || rename.before !== expectedRaw) {
          break;
        }
        expectedPath = rename.to;
        expectedRaw = rename.after;
      }
      const expected = expectedPath === path ? expectedRaw : null;
      if (existing !== expected) {
        throw new Error("Annotation data changed in another view or device. Your edits remain in this view; reopen after resolving the conflict.");
      }
      const indexedFile = (_b = (_a3 = this.app.vault).getAbstractFileByPath) == null ? void 0 : _b.call(_a3, path);
      if (indexedFile instanceof import_obsidian.TFile) {
        await this.app.vault.process(indexedFile, (current) => {
          if (current !== expected) {
            throw new Error("Annotation data changed during saving. Both versions must be kept.");
          }
          return payload;
        });
      } else {
        await this.app.vault.adapter.write(path, payload);
      }
      if (baseline) {
        baseline.path = path;
        baseline.raw = payload;
      } else {
        this.baselines.set(document, { path, raw: payload });
      }
    });
    this.writes.set(path, write);
    try {
      await write;
    } finally {
      if (this.writes.get(path) === write) this.writes.delete(path);
    }
  }
  async saveRecoveryCopy(file, document) {
    const payload = JSON.stringify({ ...document, sourceFile: file.path, sourcePdf: getPdfIdentity(file) }, null, 2);
    const previous = this.recoveryCopies.get(document);
    if ((previous == null ? void 0 : previous.payload) === payload && await this.app.vault.adapter.exists(previous.path)) {
      return previous.path;
    }
    const path = `${file.path}.${generateId("recovery")}${ANNOTATION_FILE_SUFFIX}`;
    await this.app.vault.adapter.write(path, payload);
    this.recoveryCopies.set(document, { payload, path });
    return path;
  }
  async relinkSidecarToFile(file, document, sourceSidecarPath) {
    const expectedSidecarPath = this.getSidecarPath(file);
    await this.save(file, document);
    if (sourceSidecarPath && sourceSidecarPath !== expectedSidecarPath && await this.app.vault.adapter.exists(sourceSidecarPath)) {
      new import_obsidian.Notice("Original annotation data retained for recovery.");
    }
    return expectedSidecarPath;
  }
  async migrateForRename(file, oldPath) {
    const oldSidecarPath = `${oldPath}${ANNOTATION_FILE_SUFFIX}`;
    const newSidecarPath = this.getSidecarPath(file);
    if (oldSidecarPath === newSidecarPath) {
      return;
    }
    const identity = getPdfIdentity(file);
    const previous = Promise.all([this.writes.get(oldSidecarPath), this.writes.get(newSidecarPath)]);
    const migration = previous.then(async () => {
      if (!await this.app.vault.adapter.exists(oldSidecarPath)) {
        return;
      }
      const raw = await this.app.vault.adapter.read(oldSidecarPath);
      const parsed = JSON.parse(raw);
      const payload = JSON.stringify({ ...parsed, sourceFile: identity.path, sourcePdf: identity, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, null, 2);
      if (await this.app.vault.adapter.exists(newSidecarPath) && await this.app.vault.adapter.read(newSidecarPath) !== raw) {
        throw new Error("Annotation destination already exists. Both sidecars were preserved.");
      }
      await this.app.vault.adapter.write(newSidecarPath, payload);
      this.renames.set(oldSidecarPath, { to: newSidecarPath, before: raw, after: payload });
    });
    this.writes.set(newSidecarPath, migration);
    try {
      await migration;
    } finally {
      if (this.writes.get(newSidecarPath) === migration) this.writes.delete(newSidecarPath);
    }
  }
  async deleteForPdfPath(_pdfPath) {
    return false;
  }
  normalizeSourcePdf(sourcePdf, file) {
    return {
      path: typeof (sourcePdf == null ? void 0 : sourcePdf.path) === "string" ? sourcePdf.path : file.path,
      name: typeof (sourcePdf == null ? void 0 : sourcePdf.name) === "string" ? sourcePdf.name : file.name,
      basename: typeof (sourcePdf == null ? void 0 : sourcePdf.basename) === "string" ? sourcePdf.basename : file.basename,
      size: typeof (sourcePdf == null ? void 0 : sourcePdf.size) === "number" ? sourcePdf.size : file.stat.size,
      ctime: typeof (sourcePdf == null ? void 0 : sourcePdf.ctime) === "number" ? sourcePdf.ctime : file.stat.ctime,
      mtime: typeof (sourcePdf == null ? void 0 : sourcePdf.mtime) === "number" ? sourcePdf.mtime : file.stat.mtime
    };
  }
  async findRenameCandidateSidecarPath(_file) {
    return null;
  }
};

// src/markdown/annotatedEmbedController.ts
var import_obsidian3 = require("obsidian");

// src/utils/lruCache.ts
var LRUCache = class {
  constructor(maxSize = 10) {
    this.cache = /* @__PURE__ */ new Map();
    this.maxSize = Math.max(1, maxSize);
  }
  get(key) {
    if (!this.cache.has(key)) {
      return void 0;
    }
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== void 0) {
        this.cache.delete(firstKey);
      }
    }
  }
  has(key) {
    return this.cache.has(key);
  }
  delete(key) {
    return this.cache.delete(key);
  }
  clear() {
    this.cache.clear();
  }
  get size() {
    return this.cache.size;
  }
};

// src/notebook/pageModel.ts
var NOTEBOOK_TEMPLATES = ["blank", "ruled", "grid", "dot"];
var NOTEBOOK_PAGE_SIZES = ["a4", "letter", "compact", "long"];
function hasEditableNativePageTemplates(document, realPdfPageCount) {
  var _a2;
  if (document.nativePageTemplatesEditable === true) {
    return true;
  }
  if (document.nativePageTemplatesEditable === false || realPdfPageCount < 1) {
    return false;
  }
  const templatePages = new Set(((_a2 = document.pdfPageTemplates) != null ? _a2 : []).map((template) => template.page));
  if (templatePages.size !== realPdfPageCount) {
    return false;
  }
  for (let pageNumber = 1; pageNumber <= realPdfPageCount; pageNumber += 1) {
    if (!templatePages.has(pageNumber)) {
      return false;
    }
  }
  return true;
}
function createTemplateNotebookPage(title, template, pageSize, paperColor) {
  return {
    id: generateId("page"),
    title,
    kind: "template",
    sourceLabel: "Template page",
    template,
    paperColor,
    pageSize,
    strokes: [],
    textItems: [],
    shapes: []
  };
}
function getNotebookTemplateLabel(template) {
  switch (template) {
    case "blank":
      return "Blank";
    case "grid":
      return "Grid";
    case "dot":
      return "Dot grid";
    case "ruled":
    default:
      return "Ruled lines";
  }
}
function getNotebookPageSizeLabel(pageSize) {
  switch (pageSize) {
    case "compact":
      return "Compact";
    case "letter":
      return "Letter portrait";
    case "long":
      return "Long notes";
    case "a4":
    default:
      return "A4 portrait";
  }
}
function getNotebookPageSizeDimensions(pageSize) {
  switch (pageSize) {
    case "compact":
      return { width: 700, height: 980 };
    case "letter":
      return { width: 920, height: 1189 };
    case "long":
      return { width: 920, height: 1500 };
    case "a4":
    default:
      return { width: 920, height: 1301 };
  }
}
function getNotebookPageRenderDimensions(pageSize, a4ReferenceWidth) {
  const dimensions = getNotebookPageSizeDimensions(pageSize);
  const a4Dimensions = getNotebookPageSizeDimensions("a4");
  const width = Math.max(1, Math.round(a4ReferenceWidth * dimensions.width / Math.max(a4Dimensions.width, 1)));
  const height = Math.max(1, Math.round(width * dimensions.height / Math.max(dimensions.width, 1)));
  return { width, height };
}

// src/notebook/templateCanvas.ts
function drawTemplatePageBackground(context, width, height, page) {
  context.save();
  context.fillStyle = page.paperColor || "#fffdf7";
  context.fillRect(0, 0, width, height);
  const metrics = getPaperTemplateMetrics(width);
  context.lineWidth = Math.max(1, width / getNotebookPageSizeDimensions("a4").width);
  if (page.template === "ruled") {
    const step = Math.max(4, metrics.ruledStep);
    const start = Math.max(8, metrics.ruledOffset);
    context.strokeStyle = PAPER_TEMPLATE_LINE_COLOR;
    for (let y2 = start; y2 < height; y2 += step) {
      context.beginPath();
      context.moveTo(0, y2);
      context.lineTo(width, y2);
      context.stroke();
    }
  } else if (page.template === "grid") {
    const step = Math.max(3, metrics.graphStep);
    context.strokeStyle = PAPER_TEMPLATE_GRID_COLOR;
    for (let x2 = 0; x2 < width; x2 += step) {
      context.beginPath();
      context.moveTo(x2, 0);
      context.lineTo(x2, height);
      context.stroke();
    }
    for (let y2 = 0; y2 < height; y2 += step) {
      context.beginPath();
      context.moveTo(0, y2);
      context.lineTo(width, y2);
      context.stroke();
    }
  } else if (page.template === "dot") {
    const step = Math.max(3, metrics.dotStep);
    context.fillStyle = PAPER_TEMPLATE_DOT_COLOR;
    for (let x2 = step / 2; x2 < width; x2 += step) {
      for (let y2 = step / 2; y2 < height; y2 += step) {
        context.beginPath();
        context.arc(x2, y2, metrics.dotRadius, 0, Math.PI * 2);
        context.fill();
      }
    }
  }
  context.restore();
}

// src/pdf/nativePdfJs.ts
var import_obsidian2 = require("obsidian");
var PDF_JS_LOAD_ERROR_MESSAGE = "Obsidian PDF.js could not be loaded.";
function isNativePdfJsLib(value) {
  return typeof value === "object" && value !== null && typeof Reflect.get(value, "getDocument") === "function";
}
async function loadNativePdfJs() {
  try {
    const loadedPdfJs = await (0, import_obsidian2.loadPdfJs)();
    if (isNativePdfJsLib(loadedPdfJs)) {
      return loadedPdfJs;
    }
  } catch (e2) {
  }
  throw new Error(PDF_JS_LOAD_ERROR_MESSAGE);
}

// src/text/textLayout.ts
var INLINE_TEXT_BOX_PADDING_X = 10;
var INLINE_TEXT_BOX_PADDING_Y = 6;
var INLINE_TEXT_LINE_HEIGHT = 1.35;
var DEFAULT_INLINE_TEXT_BOX_WIDTH = 220;
var DEFAULT_INLINE_TEXT_BOX_HEIGHT = 64;
var MIN_TEXT_LINE_SPACING = 0.8;
var MAX_TEXT_LINE_SPACING = 3;
var TEXT_LAYOUT_REFERENCE_WIDTH = 1524;
function getZoomStableTextFrameLayout(point, widthScale, heightScale, pageWidth, pageHeight) {
  const safeWidth = Math.max(pageWidth, 1);
  const safeHeight = Math.max(pageHeight, 1);
  return {
    left: point.x * safeWidth,
    top: point.y * safeHeight,
    width: widthScale * safeWidth,
    height: heightScale * safeHeight
  };
}
function resolveTextFontWeight(textItem) {
  return textItem.fontWeight === "bold" ? "bold" : "normal";
}
function resolveTextFontStyle(textItem) {
  return textItem.fontStyle === "italic" ? "italic" : "normal";
}
function resolveTextAlignment(textItem) {
  return textItem.textAlign === "center" || textItem.textAlign === "right" ? textItem.textAlign : "left";
}
function resolveTextVerticalAlignment(textItem) {
  return textItem.verticalAlign === "top" || textItem.verticalAlign === "bottom" ? textItem.verticalAlign : "middle";
}
function resolveTextLineSpacing(textItem) {
  var _a2;
  return clamp2(
    Number.isFinite(textItem.lineSpacing) ? (_a2 = textItem.lineSpacing) != null ? _a2 : INLINE_TEXT_LINE_HEIGHT : INLINE_TEXT_LINE_HEIGHT,
    MIN_TEXT_LINE_SPACING,
    MAX_TEXT_LINE_SPACING
  );
}
function resolveTextWordWrap(textItem) {
  return textItem.wordWrap !== false;
}
function applyCanvasTextStyle(context, textItem, fontSize, fontFamily) {
  context.font = `${resolveTextFontStyle(textItem)} ${resolveTextFontWeight(textItem)} ${fontSize}px "${fontFamily}", sans-serif`;
  context.textAlign = resolveTextAlignment(textItem);
  context.textBaseline = "top";
}
function getAlignedTextX(left, width, alignment) {
  if (alignment === "center") {
    return left + width / 2;
  }
  if (alignment === "right") {
    return left + width;
  }
  return left;
}
function getRenderedTextPadding(value, pageWidth) {
  return value * (Math.max(pageWidth, 1) / TEXT_LAYOUT_REFERENCE_WIDTH);
}
function getRenderedTextLayoutMetrics(pageWidth) {
  return {
    paddingX: getRenderedTextPadding(INLINE_TEXT_BOX_PADDING_X, pageWidth),
    paddingY: getRenderedTextPadding(INLINE_TEXT_BOX_PADDING_Y, pageWidth),
    minimumInnerWidth: getRenderedTextPadding(24, pageWidth),
    boxExtraWidth: getRenderedTextPadding(4, pageWidth),
    boxExtraHeight: getRenderedTextPadding(2, pageWidth),
    minimumBoxWidth: getRenderedTextPadding(44, pageWidth),
    minimumBoxHeight: getRenderedTextPadding(36, pageWidth)
  };
}
function getRenderedTextFontSize(fontScale, pageWidth, minimumSize = 10) {
  const safeWidth = Math.max(pageWidth, 1);
  return Math.max(minimumSize / TEXT_LAYOUT_REFERENCE_WIDTH, fontScale) * safeWidth;
}
function getTextBlockHeight(fontSize, lineCount, lineSpacing = INLINE_TEXT_LINE_HEIGHT) {
  const safeLineCount = Math.max(1, lineCount);
  return fontSize + (safeLineCount - 1) * fontSize * clamp2(lineSpacing, MIN_TEXT_LINE_SPACING, MAX_TEXT_LINE_SPACING);
}
function getTextBlockTop(boxTop, boxHeight, fontSize, lineCount, verticalAlign, lineSpacing = INLINE_TEXT_LINE_HEIGHT, paddingY = INLINE_TEXT_BOX_PADDING_Y) {
  const blockHeight = getTextBlockHeight(fontSize, lineCount, lineSpacing);
  if (verticalAlign === "top") {
    return boxTop + paddingY;
  }
  if (verticalAlign === "bottom") {
    return boxTop + Math.max(paddingY, boxHeight - paddingY - blockHeight);
  }
  return boxTop + Math.max(0, (Math.max(boxHeight, blockHeight) - blockHeight) / 2);
}
function measureAutoFitTextBox(context, text, fontSize, maxWidth, lineSpacing = INLINE_TEXT_LINE_HEIGHT, wordWrap = true, metrics = getRenderedTextLayoutMetrics(TEXT_LAYOUT_REFERENCE_WIDTH)) {
  const safeMaxWidth = Math.max(metrics.minimumBoxWidth, maxWidth);
  const sourceLines = getTextLines(text || " ");
  const widestLine = sourceLines.reduce(
    (width2, line) => Math.max(width2, context.measureText(line || " ").width),
    0
  );
  const width = clamp2(
    Math.ceil(widestLine + metrics.paddingX * 2 + metrics.boxExtraWidth),
    metrics.minimumBoxWidth,
    safeMaxWidth
  );
  const innerWidth = Math.max(metrics.minimumInnerWidth, width - metrics.paddingX * 2);
  const lineCount = Math.max(1, getCanvasTextLines(context, text || " ", innerWidth, wordWrap).length);
  const height = Math.max(
    metrics.minimumBoxHeight,
    Math.ceil(metrics.paddingY * 2 + getTextBlockHeight(fontSize, lineCount, lineSpacing) + metrics.boxExtraHeight)
  );
  return { width, height, lineCount };
}
function getInlineTextEditorLayout(point, width, height, existingItem) {
  const safeWidth = Math.max(width, 1);
  const safeHeight = Math.max(height, 1);
  const left = clamp2(point.x * safeWidth, 8, Math.max(8, safeWidth - 56));
  const top = clamp2(point.y * safeHeight, 8, Math.max(8, safeHeight - 64));
  const savedWidth = (existingItem == null ? void 0 : existingItem.boxWidthScale) && existingItem.boxWidthScale > 0 ? existingItem.boxWidthScale * safeWidth : 0;
  const preferredWidth = savedWidth > 0 ? savedWidth : DEFAULT_INLINE_TEXT_BOX_WIDTH;
  const availableWidth = Math.max(44, safeWidth - left - 12);
  const maxWidth = Math.max(44, Math.min(availableWidth, safeWidth * 0.78, 560));
  const editorWidth = clamp2(preferredWidth, 44, maxWidth);
  const savedHeight = (existingItem == null ? void 0 : existingItem.boxHeightScale) && existingItem.boxHeightScale > 0 ? existingItem.boxHeightScale * safeHeight : 0;
  const preferredHeight = savedHeight > 0 ? savedHeight : DEFAULT_INLINE_TEXT_BOX_HEIGHT;
  const editorHeight = clamp2(preferredHeight, 36, Math.max(60, safeHeight - top - 12));
  return {
    left,
    top,
    width: editorWidth,
    height: editorHeight,
    point: {
      ...point,
      x: clamp2(left / safeWidth, 0.01, 0.96),
      y: clamp2(top / safeHeight, 0.01, 0.96)
    }
  };
}
function resizeInlineTextEditor(editor, maxHeight) {
  editor.setCssStyles({ height: "auto" });
  editor.setCssStyles({ height: `${Math.min(Math.max(40, editor.scrollHeight + 2), Math.max(80, maxHeight))}px` });
}
function getCanvasTextLines(context, text, maxWidth, wordWrap = true) {
  return wordWrap ? getWrappedCanvasTextLines(context, text, maxWidth) : getTextLines(text);
}
function getWrappedCanvasTextLines(context, text, maxWidth) {
  const lines = [];
  const safeMaxWidth = Math.max(20, maxWidth);
  for (const sourceLine of getTextLines(text)) {
    if (sourceLine.trim() === "") {
      lines.push("");
      continue;
    }
    let currentLine = "";
    for (const word of sourceLine.split(/(\s+)/)) {
      if (word === "") {
        continue;
      }
      const candidate = `${currentLine}${word}`;
      if (currentLine && context.measureText(candidate).width > safeMaxWidth) {
        lines.push(currentLine.trimEnd());
        currentLine = word.trimStart();
      } else {
        currentLine = candidate;
      }
      while (currentLine && context.measureText(currentLine).width > safeMaxWidth) {
        const characters = Array.from(currentLine);
        let splitIndex = Math.max(1, characters.length - 1);
        while (splitIndex > 1 && context.measureText(characters.slice(0, splitIndex).join("")).width > safeMaxWidth) {
          splitIndex -= 1;
        }
        lines.push(characters.slice(0, splitIndex).join("").trimEnd());
        currentLine = characters.slice(splitIndex).join("").trimStart();
      }
    }
    if (currentLine) {
      lines.push(currentLine.trimEnd());
    }
  }
  return lines.length > 0 ? lines : [""];
}

// src/utils/imageData.ts
function isEmbeddedImageDataUrl(value) {
  return typeof value === "string" && /^data:image\/[a-z0-9.+-]+(?:;[a-z0-9=+.-]+)*,/i.test(value);
}

// src/markdown/embedRender.ts
function normalizeRect2(rect) {
  const normalized = {
    left: clamp2(Math.min(rect.left, rect.right), 0, 1),
    top: clamp2(Math.min(rect.top, rect.bottom), 0, 1),
    right: clamp2(Math.max(rect.left, rect.right), 0, 1),
    bottom: clamp2(Math.max(rect.top, rect.bottom), 0, 1)
  };
  if (normalized.right <= normalized.left || normalized.bottom <= normalized.top) {
    return null;
  }
  return normalized;
}
function cloneCanvas(source) {
  const canvas = createEl("canvas");
  canvas.width = source.width;
  canvas.height = source.height;
  const context = canvas.getContext("2d");
  if (context) {
    context.drawImage(source, 0, 0);
  }
  return canvas;
}
function cropCanvasToNormalizedRect(source, rect, padding = 20) {
  const normalized = normalizeRect2(rect);
  if (!normalized) {
    return cloneCanvas(source);
  }
  const cropLeft = Math.max(0, Math.floor(normalized.left * source.width) - padding);
  const cropTop = Math.max(0, Math.floor(normalized.top * source.height) - padding);
  const cropRight = Math.min(source.width, Math.ceil(normalized.right * source.width) + padding);
  const cropBottom = Math.min(source.height, Math.ceil(normalized.bottom * source.height) + padding);
  const cropWidth = Math.max(1, cropRight - cropLeft);
  const cropHeight = Math.max(1, cropBottom - cropTop);
  const canvas = createEl("canvas");
  canvas.width = cropWidth;
  canvas.height = cropHeight;
  const context = canvas.getContext("2d");
  if (context) {
    context.drawImage(source, cropLeft, cropTop, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
  }
  return canvas;
}
function parseAnnotatedPdfEmbedSource(source) {
  var _a2, _b, _c, _d, _e;
  const config = {};
  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }
    const match = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.+)$/);
    if (match) {
      config[match[1].toLowerCase()] = match[2].trim();
    }
  }
  const rawPath = ((_b = (_a2 = config.path) != null ? _a2 : config.file) != null ? _b : "").replace(/^['"]|['"]$/g, "").replace(/^!?\[\[/, "").replace(/\]\]$/, "");
  const page = Math.max(1, Math.round(Number((_c = config.page) != null ? _c : "1") || 1));
  const width = clamp2(Math.round(Number((_d = config.width) != null ? _d : "720") || 720), 240, 1400);
  const rectValues = ((_e = config.rect) != null ? _e : "").split(",").map((value) => Number(value.trim()));
  const rect = rectValues.length === 4 && rectValues.every((value) => Number.isFinite(value)) ? normalizeRect2({ left: rectValues[0], top: rectValues[1], right: rectValues[2], bottom: rectValues[3] }) : null;
  return { path: rawPath, page, width, rect };
}
function formatAnnotatedPdfEmbedBlock(path, page, rect, width = 720) {
  const lines = [
    "```freedraw-pdf",
    `path: ${path}`,
    `page: ${page}`,
    `width: ${width}`
  ];
  if (rect) {
    lines.push(`rect: ${[rect.left, rect.top, rect.right, rect.bottom].map((value) => value.toFixed(4)).join(",")}`);
  }
  lines.push("```");
  return lines.join("\n");
}
function renderAnnotationDocumentPage(context, document, pageNumber, width, height) {
  const annotationCanvas = createEl("canvas");
  annotationCanvas.width = Math.max(1, Math.round(width));
  annotationCanvas.height = Math.max(1, Math.round(height));
  const annotationContext = annotationCanvas.getContext("2d");
  if (!annotationContext) {
    return;
  }
  const strokes = document.strokes.filter((stroke) => stroke.page === pageNumber);
  const textItems = document.textItems.filter((item) => item.page === pageNumber);
  const shapes = document.shapes.filter((shape) => shape.page === pageNumber);
  const renderables = getAnnotationRenderables(strokes, textItems, shapes);
  for (const renderable of renderables) {
    if (renderable.kind === "stroke") {
      renderEmbedStroke(annotationContext, renderable.annotation, width, height);
    } else if (renderable.kind === "text") {
      renderEmbedText(annotationContext, renderable.annotation, width, height);
    } else if (renderable.kind === "shape") {
      renderEmbedShape(annotationContext, renderable.annotation, width, height);
    }
  }
  context.drawImage(annotationCanvas, 0, 0);
}
async function renderAnnotationDocumentPageImages(context, document, pageNumber, width, height) {
  var _a2, _b;
  const imageItems = (_b = (_a2 = document.imageItems) == null ? void 0 : _a2.filter((image) => image.page === pageNumber)) != null ? _b : [];
  for (const imageItem of imageItems) {
    const image = await loadImageAnnotation(imageItem);
    context.drawImage(
      image,
      imageItem.x * width,
      imageItem.y * height,
      Math.max(1, imageItem.widthScale * width),
      Math.max(1, imageItem.heightScale * height)
    );
  }
}
function loadImageAnnotation(imageItem) {
  if (!isEmbeddedImageDataUrl(imageItem.dataUrl)) {
    return Promise.reject(new Error("Image annotations must contain embedded image data."));
  }
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load image annotation ${imageItem.name}.`));
    image.src = imageItem.dataUrl;
  });
}
function renderEmbedStroke(context, stroke, width, height) {
  if (stroke.points.length === 0) {
    return;
  }
  const baseWidth = stroke.widthScale ? Math.max(1, stroke.widthScale * width) : stroke.width;
  context.save();
  context.globalAlpha = stroke.tool === "highlighter" ? 0.24 : 0.96;
  context.fillStyle = stroke.color;
  context.strokeStyle = stroke.color;
  context.lineCap = "round";
  context.lineJoin = "round";
  drawSmoothInkStroke(context, stroke.points, width, height, baseWidth, stroke.tool !== "highlighter", false, {
    renderMode: "committed",
    inkSettings: stroke.inkSettings,
    startTaper: stroke.cutStart ? 0 : void 0,
    endTaper: stroke.cutEnd ? 0 : void 0,
    startCap: true,
    endCap: true
  });
  context.restore();
}
function renderEmbedText(context, textItem, width, height) {
  var _a2;
  context.save();
  context.fillStyle = textItem.color;
  const fontScale = textItem.fontScale && textItem.fontScale > 0 ? textItem.fontScale : textItem.fontSize / TEXT_LAYOUT_REFERENCE_WIDTH;
  const fontSize = getRenderedTextFontSize(fontScale, width);
  const metrics = getRenderedTextLayoutMetrics(width);
  const fontFamily = (_a2 = textItem.fontFamily) != null ? _a2 : TEXT_FONT_FAMILIES[0];
  applyCanvasTextStyle(context, textItem, fontSize, fontFamily);
  const boxWidth = textItem.boxWidthScale && textItem.boxWidthScale > 0 ? textItem.boxWidthScale * width : width * 0.48;
  const innerWidth = Math.max(metrics.minimumInnerWidth, boxWidth - metrics.paddingX * 2);
  const textLeft = textItem.x * width + metrics.paddingX;
  const lineSpacing = resolveTextLineSpacing(textItem);
  const lines = getCanvasTextLines(context, textItem.text, innerWidth, resolveTextWordWrap(textItem));
  const fallbackHeight = metrics.paddingY * 2 + getTextBlockHeight(fontSize, lines.length, lineSpacing) + metrics.boxExtraHeight;
  const boxHeight = textItem.boxHeightScale && textItem.boxHeightScale > 0 ? textItem.boxHeightScale * height : fallbackHeight;
  const textTop = getTextBlockTop(
    textItem.y * height,
    boxHeight,
    fontSize,
    lines.length,
    resolveTextVerticalAlignment(textItem),
    lineSpacing,
    metrics.paddingY
  );
  const textX = getAlignedTextX(textLeft, innerWidth, resolveTextAlignment(textItem));
  lines.forEach((line, index) => {
    context.fillText(line, textX, textTop + index * fontSize * lineSpacing);
  });
  context.restore();
}
function renderEmbedShape(context, shape, width, height) {
  const startX = shape.start.x * width;
  const startY = shape.start.y * height;
  const endX = shape.end.x * width;
  const endY = shape.end.y * height;
  context.save();
  context.strokeStyle = shape.color;
  context.lineWidth = shape.widthScale ? Math.max(1, shape.widthScale * width) : shape.width;
  context.globalAlpha = 0.96;
  context.lineCap = "round";
  context.lineJoin = "round";
  if (shape.tool === "line") {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
    context.restore();
    return;
  }
  if (shape.tool === "rectangle") {
    context.strokeRect(startX, startY, endX - startX, endY - startY);
    context.restore();
    return;
  }
  context.beginPath();
  context.ellipse((startX + endX) / 2, (startY + endY) / 2, Math.abs(endX - startX) / 2, Math.abs(endY - startY) / 2, 0, 0, Math.PI * 2);
  context.stroke();
  context.restore();
}

// src/markdown/annotatedEmbedController.ts
var AnnotatedEmbedController = class {
  constructor(app, store, host) {
    this.app = app;
    this.store = store;
    this.host = host;
    this.renderCache = new LRUCache(16);
    this.instances = /* @__PURE__ */ new Map();
  }
  buildBlock(file, page, rect, width = 720) {
    return formatAnnotatedPdfEmbedBlock(file.path, page, rect, width);
  }
  async copyBlock(file, page, rect) {
    const block = this.buildBlock(file, page, rect);
    try {
      await this.host.writeClipboardText(block);
      new import_obsidian3.Notice(rect ? `Copied annotated region embed for ${file.name} page ${page}.` : `Copied annotated embed for ${file.name} page ${page}.`);
    } catch (error) {
      console.error("freedraw-pdf: failed to copy annotated embed block", error);
      new import_obsidian3.Notice(`Copy failed. Embed block: ${block}`);
    }
  }
  insertBlock(markdownView, file, page, rect) {
    const editor = markdownView.editor;
    const block = this.buildBlock(file, page, rect);
    const prefix = editor.getCursor().ch === 0 ? "" : "\n";
    editor.replaceSelection(`${prefix}${block}
`);
    new import_obsidian3.Notice(rect ? `Inserted annotated region embed for ${file.name} page ${page}.` : `Inserted annotated embed for ${file.name} page ${page}.`);
  }
  refreshForPath(path) {
    for (const [id, instance] of Array.from(this.instances.entries())) {
      if (!instance.el.isConnected) {
        this.instances.delete(id);
        continue;
      }
      if (path === instance.filePath || path === instance.sidecarPath) {
        instance.render(true);
      }
    }
  }
  async renderMarkdownBlock(source, el, sourcePath) {
    var _a2, _b;
    el.empty();
    const config = parseAnnotatedPdfEmbedSource(source);
    const wrapper = el.createDiv({ cls: "freedraw-pdf-markdown-embed" });
    const showHeader = this.host.shouldShowAnnotatedEmbedHeader();
    wrapper.classList.toggle("is-header-hidden", !showHeader);
    const header = showHeader ? wrapper.createDiv({ cls: "freedraw-pdf-markdown-embed-header" }) : null;
    const title = (_a2 = header == null ? void 0 : header.createDiv({ cls: "freedraw-pdf-markdown-embed-title", text: "Annotated PDF page" })) != null ? _a2 : null;
    const actions = (_b = header == null ? void 0 : header.createDiv({ cls: "freedraw-pdf-markdown-embed-actions" })) != null ? _b : null;
    if (!config.path) {
      wrapper.createDiv({ cls: "freedraw-pdf-markdown-embed-error", text: "Missing `path:` in freedraw-pdf block." });
      return;
    }
    const file = this.resolveFile(config.path, sourcePath);
    if (!file) {
      wrapper.createDiv({ cls: "freedraw-pdf-markdown-embed-error", text: `Could not find PDF: ${config.path}` });
      return;
    }
    if (title) {
      title.textContent = config.rect ? `${file.name} - page ${config.page} region` : `${file.name} - page ${config.page}`;
    }
    wrapper.title = config.rect ? "Double-click to open this annotated region. Right-click for actions." : "Double-click to open this annotated page. Right-click for actions.";
    const body = wrapper.createDiv({ cls: "freedraw-pdf-markdown-embed-body" });
    let renderVersion = 0;
    const render = (forceRefresh = false) => {
      const version = ++renderVersion;
      body.empty();
      body.createDiv({ cls: "freedraw-pdf-markdown-embed-loading", text: forceRefresh ? "Refreshing annotated page..." : "Rendering annotated page..." });
      void this.renderPageToCanvas(file, config.page, config.width, config.rect, forceRefresh).then((canvas) => {
        if (version !== renderVersion || !wrapper.isConnected) {
          return;
        }
        body.empty();
        canvas.className = "freedraw-pdf-markdown-embed-canvas";
        canvas.setCssStyles({
          maxWidth: "100%",
          height: "auto"
        });
        body.appendChild(canvas);
      }).catch((error) => {
        if (version !== renderVersion || !wrapper.isConnected) {
          return;
        }
        console.error("freedraw-pdf: failed to render annotated markdown embed", error);
        this.showEmbedRenderError(body, error, file, config.page, config.rect);
      });
    };
    wrapper.addEventListener("dblclick", (event) => {
      event.preventDefault();
      void this.host.openPdfPage(file, config.page, config.rect);
    });
    wrapper.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.openEmbedContextMenu(event, file, config.page, config.rect, render);
    });
    if (actions) {
      const openButton = actions.createEl("button", { type: "button", text: "Open", cls: "freedraw-pdf-markdown-embed-action" });
      openButton.addEventListener("click", () => void this.host.openPdfPage(file, config.page, config.rect));
      const refreshButton = actions.createEl("button", { type: "button", text: "Refresh", cls: "freedraw-pdf-markdown-embed-action" });
      refreshButton.addEventListener("click", () => render(true));
      const copyButton = actions.createEl("button", { type: "button", text: "Copy block", cls: "freedraw-pdf-markdown-embed-action" });
      copyButton.addEventListener("click", () => void this.copyBlock(file, config.page, config.rect));
    }
    const instanceId = generateId("embed");
    this.instances.set(instanceId, {
      id: instanceId,
      filePath: file.path,
      sidecarPath: this.store.getSidecarPath(file),
      el: wrapper,
      render
    });
    render(false);
  }
  showEmbedRenderError(body, error, file, page, rect) {
    body.empty();
    const errorMessage = error instanceof Error ? error.message : "Could not render annotated PDF page.";
    const errorEl = body.createDiv({ cls: "freedraw-pdf-markdown-embed-error" });
    if (errorMessage === PDF_JS_LOAD_ERROR_MESSAGE) {
      errorEl.appendText(`${PDF_JS_LOAD_ERROR_MESSAGE} Open `);
      this.appendEmbedSourceLink(errorEl, file, page, rect);
      errorEl.appendText(" directly, then retry this action.");
      return;
    }
    errorEl.setText(errorMessage);
  }
  appendEmbedSourceLink(container, file, page, rect) {
    const link = container.createEl("a", {
      cls: "internal-link",
      text: file.name,
      href: file.path,
      attr: {
        "data-href": file.path
      }
    });
    link.addEventListener("click", (event) => {
      event.preventDefault();
      void this.host.openPdfPage(file, page, rect);
    });
  }
  openEmbedContextMenu(event, file, page, rect, render) {
    const menu = new import_obsidian3.Menu();
    menu.addItem((item) => item.setTitle(rect ? "Open annotated region" : "Open annotated page").setIcon("file-text").onClick(() => void this.host.openPdfPage(file, page, rect)));
    menu.addItem((item) => item.setTitle("Refresh preview").setIcon("refresh-cw").onClick(() => render(true)));
    menu.addSeparator();
    menu.addItem((item) => item.setTitle("Copy embed block").setIcon("code").onClick(() => void this.copyBlock(file, page, rect)));
    menu.addItem((item) => item.setTitle(rect ? "Copy region reference" : "Copy page link").setIcon("link").onClick(() => void this.copyReference(file, page, rect)));
    menu.showAtPosition({ x: event.clientX, y: event.clientY });
  }
  async copyReference(file, page, rect) {
    const reference = rect ? `[[${file.path}#page=${page}]] ::region[page=${page};rect=${[rect.left, rect.top, rect.right, rect.bottom].map((value) => value.toFixed(4)).join(",")}]` : `[[${file.path}#page=${page}]]`;
    try {
      await this.host.writeClipboardText(reference);
      new import_obsidian3.Notice(rect ? "Copied region reference." : `Copied page ${page} link.`);
    } catch (error) {
      console.error("freedraw-pdf: failed to copy embed reference", error);
      new import_obsidian3.Notice(`Copy failed. Reference: ${reference}`);
    }
  }
  resolveFile(rawPath, sourcePath) {
    var _a2;
    const cleanPath = (_a2 = rawPath.split("#")[0]) == null ? void 0 : _a2.trim();
    if (!cleanPath) {
      return null;
    }
    const direct = this.app.vault.getAbstractFileByPath(cleanPath);
    if (direct instanceof import_obsidian3.TFile && direct.extension.toLowerCase() === "pdf") {
      return direct;
    }
    const linked = this.app.metadataCache.getFirstLinkpathDest(cleanPath, sourcePath);
    return linked instanceof import_obsidian3.TFile && linked.extension.toLowerCase() === "pdf" ? linked : null;
  }
  async renderPageToCanvas(file, pageNumber, targetWidth, rect = null, forceRefresh = false) {
    var _a2, _b;
    const annotationDocument = await this.store.load(file);
    const rectKey = rect ? `${rect.left.toFixed(4)},${rect.top.toFixed(4)},${rect.right.toFixed(4)},${rect.bottom.toFixed(4)}` : "full";
    const normalizedRect = rect ? normalizeRect(rect) : null;
    const rectWidth = normalizedRect ? Math.max(0.12, normalizedRect.right - normalizedRect.left) : 1;
    const renderWidth = normalizedRect ? clamp2(Math.round(targetWidth / rectWidth), targetWidth, 2600) : targetWidth;
    const cacheKey = `${file.path}:${pageNumber}:${targetWidth}:${renderWidth}:${rectKey}:${annotationDocument.updatedAt}`;
    if (!forceRefresh) {
      const cached = this.renderCache.get(cacheKey);
      if (cached) {
        return cloneCanvas(cached);
      }
    }
    const binary = await this.app.vault.adapter.readBinary(file.path);
    const pdfjsLib = await loadNativePdfJs();
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(binary),
      disableWorker: true,
      isEvalSupported: false,
      useWorkerFetch: false
    });
    try {
      const pdfDocument = await loadingTask.promise;
      if (pageNumber <= pdfDocument.numPages) {
        const pdfPage = await pdfDocument.getPage(pageNumber);
        const baseViewport = pdfPage.getViewport({ scale: 1 });
        const scale = renderWidth / Math.max(baseViewport.width, 1);
        const viewport = pdfPage.getViewport({ scale });
        const canvas2 = createEl("canvas");
        canvas2.width = Math.max(1, Math.round(viewport.width));
        canvas2.height = Math.max(1, Math.round(viewport.height));
        const context2 = canvas2.getContext("2d");
        if (!context2) {
          throw new Error("Could not create embed canvas.");
        }
        context2.fillStyle = "#ffffff";
        context2.fillRect(0, 0, canvas2.width, canvas2.height);
        await pdfPage.render({ canvasContext: context2, viewport }).promise;
        const pageTemplate = hasEditableNativePageTemplates(annotationDocument, pdfDocument.numPages) ? (_a2 = annotationDocument.pdfPageTemplates) == null ? void 0 : _a2.find((template) => template.page === pageNumber) : null;
        if (pageTemplate) {
          drawTemplatePageBackground(context2, canvas2.width, canvas2.height, {
            id: `pdf-template-${pageNumber}`,
            title: `Page ${pageNumber}`,
            kind: "template",
            template: pageTemplate.template,
            paperColor: pageTemplate.paperColor,
            pageSize: pageTemplate.pageSize,
            strokes: [],
            textItems: [],
            shapes: []
          });
        }
        await renderAnnotationDocumentPageImages(context2, annotationDocument, pageNumber, canvas2.width, canvas2.height);
        renderAnnotationDocumentPage(context2, annotationDocument, pageNumber, canvas2.width, canvas2.height);
        await pdfDocument.destroy();
        const outputCanvas2 = normalizedRect ? cropCanvasToNormalizedRect(canvas2, normalizedRect) : canvas2;
        this.renderCache.set(cacheKey, cloneCanvas(outputCanvas2));
        return outputCanvas2;
      }
      const syntheticIndex = pageNumber - pdfDocument.numPages - 1;
      const syntheticPage = (_b = annotationDocument.appendedPages) == null ? void 0 : _b[syntheticIndex];
      if (!syntheticPage) {
        throw new Error(`Page ${pageNumber} is outside this PDF annotation session.`);
      }
      const dimensions = getNotebookPageSizeDimensions(syntheticPage.pageSize);
      const canvas = createEl("canvas");
      canvas.width = renderWidth;
      canvas.height = Math.max(1, Math.round(renderWidth * dimensions.height / Math.max(dimensions.width, 1)));
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Could not create embed canvas.");
      }
      drawTemplatePageBackground(context, canvas.width, canvas.height, syntheticPage);
      await renderAnnotationDocumentPageImages(context, annotationDocument, pageNumber, canvas.width, canvas.height);
      renderAnnotationDocumentPage(context, annotationDocument, pageNumber, canvas.width, canvas.height);
      await pdfDocument.destroy();
      const outputCanvas = normalizedRect ? cropCanvasToNormalizedRect(canvas, normalizedRect) : canvas;
      this.renderCache.set(cacheKey, cloneCanvas(outputCanvas));
      return outputCanvas;
    } finally {
      await loadingTask.destroy();
    }
  }
};

// src/pdf/pdfDom.ts
function resolvePdfPageContentWidth(measurements) {
  var _a2;
  const candidates = [
    measurements.canvasRectWidth,
    measurements.canvasClientWidth,
    measurements.hostRectWidth,
    measurements.hostClientWidth,
    measurements.pageRectWidth,
    measurements.pageClientWidth
  ];
  return (_a2 = candidates.find((width) => Number.isFinite(width) && width > 0)) != null ? _a2 : 0;
}
function getOverlayHost(pageEl) {
  var _a2;
  const candidate = pageEl.querySelector(PAGE_HOST_SELECTORS);
  if (!candidate) {
    return pageEl;
  }
  if (candidate.instanceOf(HTMLCanvasElement)) {
    return ((_a2 = candidate.parentElement) == null ? void 0 : _a2.instanceOf(HTMLElement)) ? candidate.parentElement : pageEl;
  }
  return candidate;
}
function findScrollParent(start) {
  let current = start;
  while (current) {
    const style = window.getComputedStyle(current);
    const overflowY = style.overflowY;
    if ((overflowY === "auto" || overflowY === "scroll") && current.scrollHeight > current.clientHeight) {
      return current;
    }
    current = current.parentElement;
  }
  return start;
}

// src/pdf/zoomAnchor.ts
function isTrackpadPinchWheel(event) {
  return event.ctrlKey || event.metaKey;
}
function captureZoomPageAnchor(pageNumber, viewportContentY, pageTop, pageHeight) {
  return {
    pageNumber,
    offsetRatio: clamp2((viewportContentY - pageTop) / Math.max(pageHeight, 1), 0, 1)
  };
}
function resolveZoomPageScrollTop(anchor, pageTop, pageHeight, maximumContentY) {
  return clamp2(
    pageTop + Math.max(pageHeight, 1) * anchor.offsetRatio,
    0,
    Math.max(maximumContentY, 0)
  );
}

// src/utils/clipboard.ts
async function writeClipboardText(text) {
  var _a2, _b, _c;
  const electronClipboard = (_b = (_a2 = window.require) == null ? void 0 : _a2.call(window, "electron")) == null ? void 0 : _b.clipboard;
  if (electronClipboard == null ? void 0 : electronClipboard.writeText) {
    electronClipboard.writeText(text);
    return;
  }
  if ((_c = navigator.clipboard) == null ? void 0 : _c.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  throw new Error("Clipboard write is unavailable in this Obsidian environment.");
}
async function readClipboardText() {
  var _a2, _b, _c;
  const electronClipboard = (_b = (_a2 = window.require) == null ? void 0 : _a2.call(window, "electron")) == null ? void 0 : _b.clipboard;
  if (electronClipboard == null ? void 0 : electronClipboard.readText) {
    return electronClipboard.readText();
  }
  if ((_c = navigator.clipboard) == null ? void 0 : _c.readText) {
    return navigator.clipboard.readText();
  }
  throw new Error("Clipboard read is unavailable in this Obsidian environment.");
}

// src/utils/deviceUtils.ts
function isTabletWebKitTouchDevice() {
  var _a2, _b, _c, _d;
  return typeof window !== "undefined" && ((_b = (_a2 = window.matchMedia) == null ? void 0 : _a2.call(window, "(pointer: coarse)")) == null ? void 0 : _b.matches) === true && ((_d = (_c = window.matchMedia) == null ? void 0 : _c.call(window, "(hover: none)")) == null ? void 0 : _d.matches) === true;
}
function getInputMethod(event) {
  var _a2;
  const type = (_a2 = event.pointerType) == null ? void 0 : _a2.toLowerCase();
  if (type === "pen") return "pen";
  if (type === "touch") return "touch";
  if (type === "mouse") return "mouse";
  if (event.isPrimary && event.pointerType === "touch") return "touch";
  if (event.pointerType === "mouse") return "mouse";
  return "unknown";
}
function estimatePressureFromVelocity(velocityX, velocityY) {
  const velocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
  const normalizedVelocity = Math.min(velocity / 0.8, 1);
  const pressure = Math.pow(1 - normalizedVelocity, 1.5);
  return Math.max(0.2, Math.min(1, pressure));
}
function calculateVelocity(prevX, prevY, currX, currY, deltaTimeMs) {
  if (deltaTimeMs <= 0) return 0;
  const dx = currX - prevX;
  const dy = currY - prevY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance / deltaTimeMs;
}

// src/notebook/pageLifecycle.ts
function shiftPages(items, fromPage, delta) {
  return items.map((item) => item.page >= fromPage ? { ...item, page: item.page + delta } : item);
}
function removePage(items, pageNumber) {
  const kept = [];
  const removed = [];
  for (const item of items) {
    (item.page === pageNumber ? removed : kept).push(item);
  }
  return { kept, removed };
}
function setAnnotationPage(items, pageNumber) {
  return items.map((item) => ({ ...item, page: pageNumber }));
}
function ensurePageCollections(document) {
  var _a2, _b, _c, _d, _e, _f;
  (_a2 = document.appendedPages) != null ? _a2 : document.appendedPages = [];
  (_b = document.eraserPaths) != null ? _b : document.eraserPaths = [];
  (_c = document.imageItems) != null ? _c : document.imageItems = [];
  (_d = document.deletedPdfPages) != null ? _d : document.deletedPdfPages = [];
  (_e = document.permanentlyDeletedPdfPages) != null ? _e : document.permanentlyDeletedPdfPages = [];
  (_f = document.removedPages) != null ? _f : document.removedPages = [];
}
function insertSyntheticPage(document, realPdfPageCount, insertIndex, page) {
  ensurePageCollections(document);
  const pages = document.appendedPages;
  const boundedIndex = Math.max(0, Math.min(Math.round(insertIndex), pages.length));
  const pageNumber = Math.max(0, realPdfPageCount) + boundedIndex + 1;
  document.strokes = shiftPages(document.strokes, pageNumber, 1);
  document.eraserPaths = shiftPages(document.eraserPaths, pageNumber, 1);
  document.textItems = shiftPages(document.textItems, pageNumber, 1);
  document.shapes = shiftPages(document.shapes, pageNumber, 1);
  document.imageItems = shiftPages(document.imageItems, pageNumber, 1);
  pages.splice(boundedIndex, 0, page);
  return pageNumber;
}
function removeSyntheticPageToTrash(document, realPdfPageCount, pageIndex, removedAt = (/* @__PURE__ */ new Date()).toISOString()) {
  ensurePageCollections(document);
  const pages = document.appendedPages;
  if (pageIndex < 0 || pageIndex >= pages.length) {
    return null;
  }
  const pageNumber = Math.max(0, realPdfPageCount) + pageIndex + 1;
  const strokeResult = removePage(document.strokes, pageNumber);
  const eraserResult = removePage(document.eraserPaths, pageNumber);
  const textResult = removePage(document.textItems, pageNumber);
  const shapeResult = removePage(document.shapes, pageNumber);
  const imageResult = removePage(document.imageItems, pageNumber);
  const [page] = pages.splice(pageIndex, 1);
  const removedPage = {
    page,
    originalIndex: pageIndex,
    removedAt,
    annotations: {
      strokes: strokeResult.removed,
      eraserPaths: eraserResult.removed,
      textItems: textResult.removed,
      shapes: shapeResult.removed,
      imageItems: imageResult.removed
    }
  };
  document.strokes = shiftPages(strokeResult.kept, pageNumber + 1, -1);
  document.eraserPaths = shiftPages(eraserResult.kept, pageNumber + 1, -1);
  document.textItems = shiftPages(textResult.kept, pageNumber + 1, -1);
  document.shapes = shiftPages(shapeResult.kept, pageNumber + 1, -1);
  document.imageItems = shiftPages(imageResult.kept, pageNumber + 1, -1);
  document.removedPages = document.removedPages.filter((entry) => entry.page.id !== page.id);
  document.removedPages.push(removedPage);
  return removedPage;
}
function restoreSyntheticPageFromTrash(document, realPdfPageCount, pageId) {
  ensurePageCollections(document);
  const removedIndex = document.removedPages.findIndex((entry) => entry.page.id === pageId);
  if (removedIndex < 0) {
    return null;
  }
  const [removedPage] = document.removedPages.splice(removedIndex, 1);
  const pageNumber = insertSyntheticPage(
    document,
    realPdfPageCount,
    Math.max(0, Math.min(removedPage.originalIndex, document.appendedPages.length)),
    removedPage.page
  );
  document.strokes.push(...setAnnotationPage(removedPage.annotations.strokes, pageNumber));
  document.eraserPaths.push(...setAnnotationPage(removedPage.annotations.eraserPaths, pageNumber));
  document.textItems.push(...setAnnotationPage(removedPage.annotations.textItems, pageNumber));
  document.shapes.push(...setAnnotationPage(removedPage.annotations.shapes, pageNumber));
  document.imageItems.push(...setAnnotationPage(removedPage.annotations.imageItems, pageNumber));
  return pageNumber;
}
function permanentlyDeleteRemovedPage(document, pageId) {
  ensurePageCollections(document);
  const previousLength = document.removedPages.length;
  document.removedPages = document.removedPages.filter((entry) => entry.page.id !== pageId);
  return document.removedPages.length !== previousLength;
}
function hidePdfPage(document, pageNumber) {
  ensurePageCollections(document);
  const normalizedPage = Math.max(1, Math.round(pageNumber));
  if (document.deletedPdfPages.includes(normalizedPage) || document.permanentlyDeletedPdfPages.includes(normalizedPage)) {
    return false;
  }
  document.deletedPdfPages.push(normalizedPage);
  document.deletedPdfPages.sort((left, right) => left - right);
  return true;
}
function restorePdfPage(document, pageNumber) {
  ensurePageCollections(document);
  const normalizedPage = Math.max(1, Math.round(pageNumber));
  if (document.permanentlyDeletedPdfPages.includes(normalizedPage)) {
    return false;
  }
  const previousLength = document.deletedPdfPages.length;
  document.deletedPdfPages = document.deletedPdfPages.filter((page) => page !== normalizedPage);
  return document.deletedPdfPages.length !== previousLength;
}
function permanentlyDeleteHiddenPdfPage(document, pageNumber) {
  ensurePageCollections(document);
  const normalizedPage = Math.max(1, Math.round(pageNumber));
  const wasHidden = document.deletedPdfPages.includes(normalizedPage);
  const wasPermanent = document.permanentlyDeletedPdfPages.includes(normalizedPage);
  if (!wasHidden && wasPermanent) {
    return false;
  }
  document.deletedPdfPages = document.deletedPdfPages.filter((page) => page !== normalizedPage);
  if (!wasPermanent) {
    document.permanentlyDeletedPdfPages.push(normalizedPage);
    document.permanentlyDeletedPdfPages.sort((left, right) => left - right);
  }
  return true;
}

// src/tools/toolState.ts
function isShapeTool(tool) {
  return tool === "rectangle" || tool === "ellipse" || tool === "line";
}
var ToolStateController = class {
  constructor(presets, initialState) {
    this.presets = /* @__PURE__ */ new Map();
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    for (const preset of presets) {
      this.presets.set(preset.id, preset);
    }
    this.state = {
      ...DEFAULT_TOOL_STATE,
      ...initialState,
      selectedPresetIds: {
        ...DEFAULT_TOOL_STATE.selectedPresetIds,
        ...(_a2 = initialState == null ? void 0 : initialState.selectedPresetIds) != null ? _a2 : {}
      },
      widths: {
        ...DEFAULT_TOOL_STATE.widths,
        ...(_b = initialState == null ? void 0 : initialState.widths) != null ? _b : {}
      }
    };
    this.state.widths = {
      pen: clampToolWidth("pen", this.state.widths.pen),
      highlighter: clampToolWidth("highlighter", this.state.widths.highlighter),
      eraser: clampToolWidth("eraser", this.state.widths.eraser)
    };
    if (this.state.selectionMode !== "single" && this.state.selectionMode !== "box" && this.state.selectionMode !== "lasso") {
      this.state.selectionMode = "single";
    }
    if (!(initialState == null ? void 0 : initialState.selectedPresetIds) && (initialState == null ? void 0 : initialState.selectedPresetId)) {
      const migratedPreset = this.presets.get(initialState.selectedPresetId);
      if (migratedPreset) {
        this.state.selectedPresetIds = {
          ...this.state.selectedPresetIds,
          [migratedPreset.kind]: migratedPreset.id
        };
      }
    }
    if (!((_c = this.state.selectedPresetIds) == null ? void 0 : _c.pen) || !this.presets.has(this.state.selectedPresetIds.pen)) {
      this.state.selectedPresetIds = {
        ...this.state.selectedPresetIds,
        pen: (_e = (_d = this.getPresetsByKind("pen")[0]) == null ? void 0 : _d.id) != null ? _e : "pen-slot-1"
      };
    }
    if (!((_f = this.state.selectedPresetIds) == null ? void 0 : _f.highlighter) || !this.presets.has(this.state.selectedPresetIds.highlighter)) {
      this.state.selectedPresetIds = {
        ...this.state.selectedPresetIds,
        highlighter: (_h = (_g = this.getPresetsByKind("highlighter")[0]) == null ? void 0 : _g.id) != null ? _h : "highlight-slot-1"
      };
    }
    if (!((_i = this.state.selectedPresetIds) == null ? void 0 : _i.eraser) || !this.presets.has(this.state.selectedPresetIds.eraser)) {
      this.state.selectedPresetIds = {
        ...this.state.selectedPresetIds,
        eraser: (_m = (_l = (_j = this.getPresetsByKind("eraser")[1]) == null ? void 0 : _j.id) != null ? _l : (_k = this.getPresetsByKind("eraser")[0]) == null ? void 0 : _k.id) != null ? _m : "eraser-slot-2"
      };
    }
    this.state.selectedPresetIds = {
      ...this.state.selectedPresetIds,
      pen: this.getVisiblePresetId("pen", (_n = this.state.selectedPresetIds) == null ? void 0 : _n.pen),
      highlighter: this.getVisiblePresetId("highlighter", (_o = this.state.selectedPresetIds) == null ? void 0 : _o.highlighter),
      eraser: this.getVisiblePresetId("eraser", (_p = this.state.selectedPresetIds) == null ? void 0 : _p.eraser)
    };
    if (this.state.selectedPresetId && this.presets.has(this.state.selectedPresetId)) {
      const selectedPresetId = this.state.selectedPresetId;
      this.state.selectedPresetId = null;
      this.applyPreset(selectedPresetId);
    } else {
      const defaultPreset = presets[0];
      if (defaultPreset) {
        this.applyPreset(defaultPreset.id);
      }
    }
  }
  get snapshot() {
    var _a2;
    return {
      ...this.state,
      selectedPresetIds: { ...(_a2 = this.state.selectedPresetIds) != null ? _a2 : {} },
      widths: { ...this.state.widths }
    };
  }
  get allPresets() {
    return Array.from(this.presets.values()).map((preset) => ({ ...preset }));
  }
  get presetsSnapshot() {
    return this.allPresets;
  }
  getPresetsByKind(kind) {
    return Array.from(this.presets.values()).filter((preset) => preset.kind === kind).slice(0, 3).map((preset) => ({ ...preset }));
  }
  getVisiblePresetId(kind, presetId) {
    var _a2, _b, _c, _d;
    const visiblePresets = this.getPresetsByKind(kind);
    if (presetId && visiblePresets.some((preset) => preset.id === presetId)) {
      return presetId;
    }
    return (_d = (_c = (_a2 = visiblePresets[0]) == null ? void 0 : _a2.id) != null ? _c : (_b = DEFAULT_TOOL_PRESETS.find((preset) => preset.kind === kind)) == null ? void 0 : _b.id) != null ? _d : "";
  }
  get activeTool() {
    return this.state.activeTool;
  }
  get activeColor() {
    return this.state.activeColor;
  }
  get activeOpacity() {
    return this.state.activeOpacity;
  }
  get eraserMode() {
    return this.state.eraserMode;
  }
  get selectionMode() {
    return this.state.selectionMode;
  }
  get selectedPresetId() {
    var _a2, _b;
    if (this.state.activeTool === "pen" || this.state.activeTool === "highlighter" || this.state.activeTool === "eraser") {
      return (_b = (_a2 = this.state.selectedPresetIds) == null ? void 0 : _a2[this.state.activeTool]) != null ? _b : this.state.selectedPresetId;
    }
    return this.state.selectedPresetId;
  }
  setActiveTool(tool) {
    var _a2;
    if (tool === "pen" || tool === "highlighter" || tool === "eraser") {
      const presetId = (_a2 = this.state.selectedPresetIds) == null ? void 0 : _a2[tool];
      if (presetId && this.presets.has(presetId)) {
        this.applyPreset(presetId);
        return;
      }
    }
    this.state.activeTool = tool;
    if (tool === "pen" || tool === "highlighter") {
      this.state.activeOpacity = tool === "highlighter" ? 0.24 : 0.96;
    }
  }
  setColor(color) {
    this.state.activeColor = color;
    this.syncSelectedPreset();
  }
  setEraserMode(mode) {
    this.state.eraserMode = mode;
  }
  setSelectionMode(mode) {
    this.state.selectionMode = mode;
  }
  getWidth(tool = this.state.activeTool) {
    if (tool === "highlighter") {
      return this.state.widths.highlighter;
    }
    if (tool === "eraser") {
      return this.state.widths.eraser;
    }
    return this.state.widths.pen;
  }
  setWidth(width, tool = this.state.activeTool) {
    const targetTool = isShapeTool(tool) ? "pen" : tool;
    if (targetTool === "highlighter") {
      this.state.widths.highlighter = clampToolWidth("highlighter", width);
      this.syncSelectedPreset();
      return;
    }
    if (targetTool === "eraser") {
      this.state.widths.eraser = clampToolWidth("eraser", width);
      this.syncSelectedPreset();
      return;
    }
    this.state.widths.pen = clampToolWidth("pen", width);
    this.syncSelectedPreset();
  }
  applyPreset(presetId) {
    const preset = this.presets.get(presetId);
    if (!preset) {
      return false;
    }
    this.state.selectedPresetId = preset.id;
    this.state.selectedPresetIds = {
      ...this.state.selectedPresetIds,
      [preset.kind]: preset.id
    };
    this.state.activeTool = preset.kind;
    this.state.activeColor = preset.color;
    this.state.activeOpacity = preset.opacity;
    this.setWidth(preset.width, preset.kind);
    return true;
  }
  syncSelectedPreset() {
    if (!this.state.selectedPresetId) {
      return;
    }
    const preset = this.presets.get(this.state.selectedPresetId);
    if (!preset || preset.kind !== this.state.activeTool) {
      return;
    }
    this.state.selectedPresetIds = {
      ...this.state.selectedPresetIds,
      [preset.kind]: preset.id
    };
    preset.color = this.state.activeColor;
    preset.width = this.getWidth(preset.kind);
    preset.opacity = this.state.activeOpacity;
  }
};
var PreviewStateController = class {
  constructor() {
    this.state = {
      clientX: null,
      clientY: null,
      visible: false,
      active: false,
      radius: 0
    };
  }
  get snapshot() {
    return { ...this.state };
  }
  recordPointer(clientX, clientY) {
    this.state.clientX = clientX;
    this.state.clientY = clientY;
  }
  show(radius, active) {
    this.state.radius = radius;
    this.state.active = active;
    this.state.visible = true;
  }
  hide() {
    this.state.visible = false;
    this.state.active = false;
    this.state.radius = 0;
  }
};

// src/pointer/pointerInput.ts
function isInkDrawingTool(tool) {
  return tool === "pen" || tool === "highlighter" || tool === "eraser" || isShapeTool(tool);
}
function shouldIgnoreInkPointerEvent(event, tool, policy = "pen-mouse-stylus-touch") {
  if (!isInkDrawingTool(tool)) {
    return false;
  }
  const inputMethod = getInputMethod(event);
  const stylusLike = isStylusLikePointerEvent(event);
  if (inputMethod === "pen" || stylusLike && event.isPrimary !== false) {
    return false;
  }
  if (inputMethod === "mouse") {
    return event.button !== 0;
  }
  if (inputMethod === "touch") {
    return policy === "pen-mouse-only" || event.isPrimary === false;
  }
  if (policy === "allow-touch" && inputMethod === "unknown") {
    return event.isPrimary === false;
  }
  if (policy === "pen-mouse-only" || inputMethod === "unknown" && !stylusLike) {
    return true;
  }
  if (stylusLike) {
    return false;
  }
  return true;
}
function shouldCaptureInkPointerEvent(event, tool, policy = "pen-mouse-stylus-touch") {
  if (!isInkDrawingTool(tool) || shouldIgnoreInkPointerEvent(event, tool, policy)) {
    return false;
  }
  const inputMethod = getInputMethod(event);
  return inputMethod === "pen" || inputMethod === "touch";
}
function shouldPanInkPointerEvent(event, tool, policy = "pen-mouse-stylus-touch") {
  return event.pointerType === "touch" && event.isPrimary !== false && isInkDrawingTool(tool) && policy === "pen-mouse-only" && !isStylusLikePointerEvent(event);
}
function isStylusLikePointerEvent(event) {
  if (event.pointerType === "pen") {
    return true;
  }
  if (event.pointerType === "mouse") {
    return false;
  }
  const webkitEvent = event;
  if (webkitEvent.touchType === "stylus" || webkitEvent.webkitTouchType === "stylus") {
    return true;
  }
  const compactContact = Number.isFinite(event.width) && event.width > 0 && event.width <= 8 && Number.isFinite(event.height) && event.height > 0 && event.height <= 8;
  if (typeof webkitEvent.altitudeAngle === "number" && Number.isFinite(webkitEvent.altitudeAngle) && webkitEvent.altitudeAngle > 0 && webkitEvent.altitudeAngle < Math.PI / 2 - 0.01 || typeof webkitEvent.azimuthAngle === "number" && Number.isFinite(webkitEvent.azimuthAngle) && Math.abs(webkitEvent.azimuthAngle) > 0.01) {
    return true;
  }
  const webkitForce = webkitEvent.webkitForce;
  if (compactContact && typeof webkitForce === "number" && webkitForce > 0.01) {
    return true;
  }
  const tiltX = event.tiltX;
  const tiltY = event.tiltY;
  if (typeof tiltX === "number" && tiltX !== 0 || typeof tiltY === "number" && tiltY !== 0) {
    return true;
  }
  return false;
}
function isWebKitStylusTouch(touch) {
  if (touch.touchType === "stylus") {
    return true;
  }
  const compactContact = typeof touch.radiusX === "number" && touch.radiusX > 0 && touch.radiusX <= 4 && typeof touch.radiusY === "number" && touch.radiusY > 0 && touch.radiusY <= 4;
  const angledStylus = typeof touch.altitudeAngle === "number" && Number.isFinite(touch.altitudeAngle) && touch.altitudeAngle > 0 && touch.altitudeAngle < Math.PI / 2 - 0.01;
  const directedStylus = typeof touch.azimuthAngle === "number" && Number.isFinite(touch.azimuthAngle) && Math.abs(touch.azimuthAngle) > 0.01;
  return angledStylus || directedStylus || compactContact && typeof touch.force === "number" && touch.force > 0.01;
}
function getCoalescedPointerEvents(event) {
  if ((event.pointerType === "touch" || event.pointerType === "pen") && typeof event.getCoalescedEvents === "function") {
    const samples = event.getCoalescedEvents();
    if (samples.length > 0) {
      const last = samples[samples.length - 1];
      if (last.clientX !== event.clientX || last.clientY !== event.clientY || last.timeStamp !== event.timeStamp) {
        return [...samples, event];
      }
      return samples;
    }
  }
  return [event];
}
function resolvePointerPressure(event, lastPoint, lastPointTime, pressureMode = "auto", forceStylus = false) {
  const inputMethod = getInputMethod(event);
  const useReportedPressure = pressureMode !== "simulate" && (forceStylus || inputMethod === "pen" || isStylusLikePointerEvent(event));
  if (useReportedPressure) {
    if (event.pressure > 0) {
      return clamp2(event.pressure, 0.06, 1);
    }
    const webkitForce = event.webkitForce;
    if (typeof webkitForce === "number" && webkitForce > 0) {
      return clamp2(webkitForce, 0.06, 1);
    }
  }
  if (pressureMode === "stylus") {
    return 0.5;
  }
  if (pressureMode === "auto" && inputMethod === "touch") {
    const webkitForce = event.webkitForce;
    if (typeof webkitForce === "number" && webkitForce > 0) {
      return clamp2(webkitForce, 0.18, 1);
    }
  }
  if (lastPoint && event.timeStamp > lastPointTime) {
    const deltaTimeMs = Math.max(1, event.timeStamp - lastPointTime);
    const velocity = calculateVelocity(
      lastPoint.clientX,
      lastPoint.clientY,
      event.clientX,
      event.clientY,
      deltaTimeMs
    );
    return clamp2(estimatePressureFromVelocity(velocity, 0), 0.2, 1);
  }
  return inputMethod === "touch" && isTabletWebKitTouchDevice() ? 0.42 : 0.5;
}

// src/settings/settingTab.ts
var import_obsidian4 = require("obsidian");
var PDFAnnotatorSettingTab = class extends import_obsidian4.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  getSettingDefinitions() {
    return [
      {
        name: "Toolbar placement",
        desc: "Keep annotation controls inside the PDF toolbar, or use a floating toolbar when another extension causes overlap.",
        render: (setting) => {
          setting.setName("Toolbar placement").setDesc("Keep annotation controls inside the PDF toolbar, or use a floating toolbar when another extension causes overlap.").addDropdown((dropdown) => {
            dropdown.addOption("inline", "Inside PDF toolbar").addOption("floating", "Floating").setValue(this.plugin.getInlineToolbarPreference() ? "inline" : "floating").onChange(async (value) => {
              await this.plugin.updateBehaviorSettings({ preferInlineToolbar: value === "inline" });
            });
          });
        }
      },
      {
        name: "Region capture button",
        desc: "Show Region directly in the toolbar. When hidden, Region remains available from More.",
        render: (setting) => {
          setting.setName("Region capture button").setDesc("Show Region directly in the toolbar. When hidden, Region remains available from More.").addToggle((toggle) => {
            toggle.setValue(this.plugin.shouldShowRegionToolbarButton()).onChange(async (value) => {
              await this.plugin.updateBehaviorSettings({ showRegionToolbarButton: value });
            });
          });
        }
      },
      {
        name: "Copy embed button",
        desc: "Show Copy embed after selecting a region. When hidden, the action remains in the Region menu.",
        render: (setting) => {
          setting.setName("Copy embed button").setDesc("Show Copy embed after selecting a region. When hidden, the action remains in the Region menu.").addToggle((toggle) => {
            toggle.setValue(this.plugin.shouldShowCopyEmbedToolbarButton()).onChange(async (value) => {
              await this.plugin.updateBehaviorSettings({ showCopyEmbedToolbarButton: value });
            });
          });
        }
      },
      {
        name: "Automatic region embed copy",
        desc: "Copy the annotated Markdown embed block as soon as a region is captured.",
        render: (setting) => {
          setting.setName("Automatic region embed copy").setDesc("Copy the annotated Markdown embed block as soon as a region is captured.").addToggle((toggle) => {
            toggle.setValue(this.plugin.shouldAutoCopyRegionEmbed()).onChange(async (value) => {
              await this.plugin.updateBehaviorSettings({ autoCopyRegionEmbed: value });
            });
          });
        }
      },
      {
        name: "Embed controls",
        desc: "Show the title and Open, Refresh, and Copy controls above annotated PDF embeds in notes.",
        render: (setting) => {
          setting.setName("Embed controls").setDesc("Show the title and Open, Refresh, and Copy controls above annotated PDF embeds in notes.").addToggle((toggle) => {
            toggle.setValue(this.plugin.shouldShowAnnotatedEmbedHeader()).onChange(async (value) => {
              await this.plugin.updateBehaviorSettings({ showAnnotatedEmbedHeader: value });
            });
          });
        }
      },
      {
        name: "Action notices",
        desc: "Show brief confirmations after drawing, undo, and redo actions.",
        render: (setting) => {
          setting.setName("Action notices").setDesc("Show brief confirmations after drawing, undo, and redo actions.").addToggle((toggle) => {
            toggle.setValue(this.plugin.shouldShowDrawingNotices()).onChange(async (value) => {
              await this.plugin.updateBehaviorSettings({ showDrawingNotices: value });
            });
          });
        }
      },
      {
        name: "Rendering diagnostics",
        desc: "Show live input and rendering timings. Enable only while investigating drawing problems.",
        render: (setting) => {
          setting.setName("Rendering diagnostics").setDesc("Show live input and rendering timings. Enable only while investigating drawing problems.").addToggle((toggle) => {
            toggle.setValue(this.plugin.shouldShowRenderTelemetry()).onChange(async (value) => {
              await this.plugin.updateBehaviorSettings({ showRenderTelemetry: value });
            });
          });
        }
      },
      {
        name: "Finger input",
        desc: "Choose what one finger does on the page. Apple Pencil and mouse draw in both modes.",
        render: (setting) => {
          setting.setName("Finger input").setDesc("Choose what one finger does on the page. Apple Pencil and mouse draw in both modes.").addDropdown((dropdown) => {
            dropdown.addOption("allow-touch", "Draw with finger").addOption("pen-mouse-only", "Pan with finger").setValue(this.plugin.getInkInputPolicy()).onChange(async (value) => {
              await this.plugin.updateBehaviorSettings({ inkInputPolicy: value });
            });
          });
        }
      },
      {
        name: "Stroke preview",
        desc: "Balance an exact match to the saved stroke against a smoother, more responsive tip. Pressure rendering stays enabled in every mode.",
        render: (setting) => {
          setting.setName("Stroke preview").setDesc("Balance an exact match to the saved stroke against a smoother, more responsive tip. Pressure rendering stays enabled in every mode.").addDropdown((dropdown) => {
            dropdown.addOption("accurate", "Closest to saved").addOption("balanced", "Balanced").addOption("smooth", "Smoothest").setValue(this.plugin.getLivePreviewMode()).onChange(async (value) => {
              await this.plugin.updateBehaviorSettings({ livePreviewMode: value });
            });
          });
        }
      },
      ...this.getInkSettingDefinitions(),
      ...this.getDefaultToolSettingDefinitions()
    ];
  }
  getInkSettingDefinitions() {
    const updateInkRenderSettings = async (patch) => {
      await this.plugin.updateBehaviorSettings({
        inkRenderSettings: {
          ...this.plugin.getInkRenderSettings(),
          ...patch
        }
      });
    };
    return [
      {
        name: "Pressure input",
        desc: "Applies to new strokes only. Use drawing speed or pressure reported by an active stylus.",
        render: (setting) => {
          setting.setName("Pressure input").setDesc("Applies to new strokes only. Use drawing speed or pressure reported by an active stylus.").addDropdown((dropdown) => {
            dropdown.addOption("auto", "Automatic").addOption("simulate", "Drawing speed").addOption("stylus", "Stylus pressure").setValue(this.plugin.getInkRenderSettings().pressureMode).onChange(async (value) => {
              await updateInkRenderSettings({ pressureMode: value });
            });
          });
        }
      },
      {
        name: "Stroke width response",
        desc: "How strongly pressure changes line width. Higher values produce more variation.",
        render: (setting) => {
          setting.setName("Stroke width response").setDesc("How strongly pressure changes line width. Higher values produce more variation.").addSlider((slider) => {
            slider.setLimits(-1, 1, 0.05).setValue(this.plugin.getInkRenderSettings().thinning).setDynamicTooltip().onChange(async (value) => {
              await updateInkRenderSettings({ thinning: value });
            });
          });
        }
      },
      {
        name: "Stabilization",
        desc: "0 disables path stabilization. Higher values smooth hand wobble more strongly and follow the pen less immediately. Changes apply only to new strokes.",
        render: (setting) => {
          setting.setName("Stabilization").setDesc("0 disables path stabilization. Higher values smooth hand wobble more strongly and follow the pen less immediately. Changes apply only to new strokes.").addSlider((slider) => {
            slider.setLimits(0, 1, 0.05).setValue(this.plugin.getInkRenderSettings().streamline).setDynamicTooltip().onChange(async (value) => {
              await updateInkRenderSettings({ streamline: value });
            });
          });
        }
      },
      {
        name: "Stroke smoothing",
        desc: "Round sharp changes in the freehand outline.",
        render: (setting) => {
          setting.setName("Stroke smoothing").setDesc("Round sharp changes in the freehand outline.").addSlider((slider) => {
            slider.setLimits(0, 1, 0.05).setValue(this.plugin.getInkRenderSettings().smoothing).setDynamicTooltip().onChange(async (value) => {
              await updateInkRenderSettings({ smoothing: value });
            });
          });
        }
      },
      {
        name: "Pressure curve",
        desc: "Choose how gradually pressure changes are applied to line width.",
        render: (setting) => {
          setting.setName("Pressure curve").setDesc("Choose how gradually pressure changes are applied to line width.").addDropdown((dropdown) => {
            dropdown.addOption("linear", "Linear").addOption("ease-in", "Ease in").addOption("ease-out", "Ease out").addOption("ease-in-out", "Ease in-out").setValue(this.plugin.getInkRenderSettings().easing).onChange(async (value) => {
              await updateInkRenderSettings({ easing: value });
            });
          });
        }
      },
      {
        name: "Taper start",
        desc: "How far the beginning narrows. 0 keeps a flat start.",
        render: (setting) => this.renderInkSlider(setting, "Taper start", "How far the beginning narrows. 0 keeps a flat start.", "taperStart", updateInkRenderSettings)
      },
      {
        name: "Taper end",
        desc: "How far the ending narrows. 0 keeps a flat end.",
        render: (setting) => this.renderInkSlider(setting, "Taper end", "How far the ending narrows. 0 keeps a flat end.", "taperEnd", updateInkRenderSettings)
      },
      {
        name: "Save delay",
        desc: "Wait after the last edit before saving annotation data. Lower values save sooner.",
        render: (setting) => {
          setting.setName("Save delay").setDesc("Wait after the last edit before saving annotation data. Lower values save sooner.").addSlider((slider) => {
            slider.setLimits(200, 2e3, 100).setValue(this.plugin.getAutosaveDelayMs()).setDynamicTooltip().onChange(async (value) => {
              await this.plugin.updateBehaviorSettings({ autosaveDelayMs: value });
            });
          });
        }
      }
    ];
  }
  renderInkSlider(setting, name, desc, key, updateInkRenderSettings) {
    setting.setName(name).setDesc(desc).addSlider((slider) => {
      slider.setLimits(0, 120, 1).setValue(this.plugin.getInkRenderSettings()[key]).setDynamicTooltip().onChange(async (value) => {
        await updateInkRenderSettings({ [key]: value });
      });
    });
  }
  getDefaultToolSettingDefinitions() {
    return [
      {
        name: "Pen width",
        desc: "Starting width for new pen strokes.",
        render: (setting) => this.renderDefaultWidthSetting(setting, "Pen width", "Starting width for new pen strokes.", "pen", TOOL_WIDTH_RANGES.pen.min, TOOL_WIDTH_RANGES.pen.max)
      },
      {
        name: "Highlighter width",
        desc: "Starting width for new highlighter strokes.",
        render: (setting) => this.renderDefaultWidthSetting(setting, "Highlighter width", "Starting width for new highlighter strokes.", "highlighter", TOOL_WIDTH_RANGES.highlighter.min, TOOL_WIDTH_RANGES.highlighter.max)
      },
      {
        name: "Eraser size",
        desc: "Starting contact area for the eraser.",
        render: (setting) => this.renderDefaultWidthSetting(setting, "Eraser size", "Starting contact area for the eraser.", "eraser", TOOL_WIDTH_RANGES.eraser.min, TOOL_WIDTH_RANGES.eraser.max)
      }
    ];
  }
  renderDefaultWidthSetting(setting, name, desc, tool, min, max) {
    setting.setName(name).setDesc(desc).addSlider((slider) => {
      slider.setLimits(min, max, TOOL_WIDTH_RANGES[tool].step).setValue(this.plugin.getToolDefaults().widths[tool]).setDynamicTooltip().onChange((value) => {
        const next = this.plugin.getToolDefaults();
        next.widths[tool] = value;
        this.plugin.updateToolPreferences(next, this.plugin.getStoredPresets());
      });
    });
  }
  renderSettingDefinitions(containerEl, definitions, names) {
    for (const name of names) {
      const definition = definitions.get(name);
      if (!definition) {
        continue;
      }
      definition.render(new import_obsidian4.Setting(containerEl));
    }
  }
  renderSettingsSection(containerEl, name, description) {
    new import_obsidian4.Setting(containerEl).setName(name).setHeading();
    containerEl.createEl("p", {
      cls: "freedraw-pdf-settings-section-description",
      text: description
    });
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("freedraw-pdf-settings");
    const definitions = new Map(
      this.getSettingDefinitions().map((definition) => [definition.name, definition])
    );
    new import_obsidian4.Setting(containerEl).setName("Drawing and annotation").setHeading();
    containerEl.createEl("p", {
      cls: "freedraw-pdf-settings-intro",
      text: "Choose how drawing feels and which controls stay visible. Changes apply to open PDFs immediately."
    });
    this.renderSettingsSection(
      containerEl,
      "Input",
      "Set what finger, stylus, and mouse input do while annotation mode is active."
    );
    this.renderSettingDefinitions(containerEl, definitions, [
      "Finger input",
      "Stroke preview",
      "Pressure input"
    ]);
    this.renderSettingsSection(
      containerEl,
      "Tool defaults",
      "Choose the starting size used when each tool is selected."
    );
    this.renderSettingDefinitions(containerEl, definitions, [
      "Pen width",
      "Highlighter width",
      "Eraser size"
    ]);
    this.renderSettingsSection(
      containerEl,
      "Toolbar",
      "Keep frequent actions visible and move optional controls into menus."
    );
    this.renderSettingDefinitions(containerEl, definitions, [
      "Toolbar placement",
      "Region capture button",
      "Copy embed button"
    ]);
    this.renderSettingsSection(
      containerEl,
      "Markdown embeds",
      "Control the appearance of annotated PDF previews placed in notes."
    );
    this.renderSettingDefinitions(containerEl, definitions, [
      "Automatic region embed copy",
      "Embed controls"
    ]);
    this.renderSettingsSection(
      containerEl,
      "Saving and feedback",
      "Control when annotation data is saved and how actions are confirmed."
    );
    this.renderSettingDefinitions(containerEl, definitions, [
      "Save delay",
      "Action notices"
    ]);
    const advancedEl = containerEl.createEl("details", {
      cls: "freedraw-pdf-settings-advanced"
    });
    advancedEl.createEl("summary", { text: "Advanced ink tuning" });
    advancedEl.createEl("p", {
      text: "Adjust stroke geometry only when the default ink feel needs fine tuning."
    });
    const advancedBodyEl = advancedEl.createDiv({
      cls: "freedraw-pdf-settings-advanced-body"
    });
    this.renderSettingDefinitions(advancedBodyEl, definitions, [
      "Stroke width response",
      "Stabilization",
      "Stroke smoothing",
      "Pressure curve",
      "Taper start",
      "Taper end"
    ]);
    this.renderSettingsSection(
      containerEl,
      "Troubleshooting",
      "Leave diagnostics off during normal use."
    );
    this.renderSettingDefinitions(containerEl, definitions, ["Rendering diagnostics"]);
  }
};

// src/export/mixedDocumentExport.ts
var import_obsidian5 = require("obsidian");

// src/export/simplePdfWriter.ts
var PDF_EXPORT_DPI = 144;
function encodeAscii(value) {
  return new TextEncoder().encode(value);
}
function concatBytes(chunks) {
  const length = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const output = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }
  return output;
}
function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}
function buildPdfFromJpegPages(pages) {
  var _a2;
  if (pages.length === 0) {
    throw new Error("Cannot build a PDF without pages.");
  }
  const chunks = [encodeAscii("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n")];
  const offsets = [0];
  let byteOffset = chunks[0].length;
  const push = (chunk) => {
    chunks.push(chunk);
    byteOffset += chunk.length;
  };
  const pushObject = (objectNumber, body) => {
    offsets[objectNumber] = byteOffset;
    push(encodeAscii(`${objectNumber} 0 obj
`));
    push(typeof body === "string" ? encodeAscii(body) : body);
    push(encodeAscii("\nendobj\n"));
  };
  const pageObjectNumbers = pages.map((_2, index) => 3 + index * 3);
  const kids = pageObjectNumbers.map((objectNumber) => `${objectNumber} 0 R`).join(" ");
  pushObject(1, "<< /Type /Catalog /Pages 2 0 R >>");
  pushObject(2, `<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`);
  pages.forEach((page, index) => {
    var _a3, _b;
    const pageObject = 3 + index * 3;
    const contentObject = pageObject + 1;
    const imageObject = pageObject + 2;
    const widthPt = (_a3 = page.widthPt) != null ? _a3 : page.widthPx * 72 / PDF_EXPORT_DPI;
    const heightPt = (_b = page.heightPt) != null ? _b : page.heightPx * 72 / PDF_EXPORT_DPI;
    const drawCommand = `q
${formatNumber(widthPt)} 0 0 ${formatNumber(heightPt)} 0 0 cm
/Im${index} Do
Q
`;
    const contentBytes = encodeAscii(drawCommand);
    pushObject(pageObject, [
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${formatNumber(widthPt)} ${formatNumber(heightPt)}] `,
      `/Resources << /XObject << /Im${index} ${imageObject} 0 R >> >> /Contents ${contentObject} 0 R >>`
    ].join(""));
    pushObject(contentObject, concatBytes([
      encodeAscii(`<< /Length ${contentBytes.length} >>
stream
`),
      contentBytes,
      encodeAscii("endstream")
    ]));
    pushObject(imageObject, concatBytes([
      encodeAscii([
        `<< /Type /XObject /Subtype /Image /Width ${page.widthPx} /Height ${page.heightPx}`,
        " /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode",
        ` /Length ${page.jpegBytes.length} >>
stream
`
      ].join("")),
      page.jpegBytes,
      encodeAscii("\nendstream")
    ]));
  });
  const xrefOffset = byteOffset;
  const objectCount = 2 + pages.length * 3;
  push(encodeAscii(`xref
0 ${objectCount + 1}
0000000000 65535 f 
`));
  for (let objectNumber = 1; objectNumber <= objectCount; objectNumber += 1) {
    push(encodeAscii(`${String((_a2 = offsets[objectNumber]) != null ? _a2 : 0).padStart(10, "0")} 00000 n 
`));
  }
  push(encodeAscii(`trailer
<< /Size ${objectCount + 1} /Root 1 0 R >>
startxref
${xrefOffset}
%%EOF
`));
  return concatBytes(chunks);
}

// src/export/mixedDocumentExport.ts
var EXPORT_PAGE_WIDTH_PX = 1600;
var EXPORT_JPEG_QUALITY = 0.92;
function uint8FromArrayBuffer(buffer) {
  return new Uint8Array(buffer);
}
async function createUniquePdfFile(app, sourceFile, bytes, suffix) {
  var _a2;
  const folderPrefix = ((_a2 = sourceFile.parent) == null ? void 0 : _a2.path) ? `${sourceFile.parent.path}/` : "";
  const baseName = `${getBaseName(sourceFile)} ${suffix}`;
  let outputPath = `${folderPrefix}${baseName}.pdf`;
  let counter = 2;
  while (app.vault.getAbstractFileByPath(outputPath)) {
    outputPath = `${folderPrefix}${baseName} ${counter}.pdf`;
    counter += 1;
  }
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return app.vault.createBinary(outputPath, buffer);
}
function canvasToJpegPage(canvas) {
  const jpegBytes = uint8FromArrayBuffer(dataUrlToArrayBuffer(canvas.toDataURL("image/jpeg", EXPORT_JPEG_QUALITY)));
  return {
    widthPx: canvas.width,
    heightPx: canvas.height,
    jpegBytes
  };
}
async function renderSyntheticPageToCanvas(annotationDocument, pageNumber, realPdfPageCount, includeAnnotations) {
  var _a2;
  const syntheticIndex = pageNumber - realPdfPageCount - 1;
  const syntheticPage = (_a2 = annotationDocument.appendedPages) == null ? void 0 : _a2[syntheticIndex];
  if (!syntheticPage) {
    throw new Error(`Missing inserted notebook page ${pageNumber}.`);
  }
  const dimensions = getNotebookPageRenderDimensions(syntheticPage.pageSize, EXPORT_PAGE_WIDTH_PX);
  const canvas = createEl("canvas");
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not create export canvas.");
  }
  drawTemplatePageBackground(context, canvas.width, canvas.height, syntheticPage);
  if (includeAnnotations) {
    await renderAnnotationDocumentPageImages(context, annotationDocument, pageNumber, canvas.width, canvas.height);
    renderAnnotationDocumentPage(context, annotationDocument, pageNumber, canvas.width, canvas.height);
  }
  return canvas;
}
async function renderPdfPageToCanvas(pdfDocument, annotationDocument, pageNumber, realPdfPageCount, includeAnnotations) {
  var _a2;
  const pdfPage = await pdfDocument.getPage(pageNumber);
  const baseViewport = pdfPage.getViewport({ scale: 1 });
  const scale = EXPORT_PAGE_WIDTH_PX / Math.max(baseViewport.width, 1);
  const viewport = pdfPage.getViewport({ scale });
  const canvas = createEl("canvas");
  canvas.width = Math.max(1, Math.round(viewport.width));
  canvas.height = Math.max(1, Math.round(viewport.height));
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not create export canvas.");
  }
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  await pdfPage.render({ canvasContext: context, viewport }).promise;
  const pageTemplate = hasEditableNativePageTemplates(annotationDocument, realPdfPageCount) ? (_a2 = annotationDocument.pdfPageTemplates) == null ? void 0 : _a2.find((template) => template.page === pageNumber) : null;
  if (pageTemplate) {
    drawTemplatePageBackground(context, canvas.width, canvas.height, {
      id: `pdf-template-${pageNumber}`,
      title: `Page ${pageNumber}`,
      kind: "template",
      template: pageTemplate.template,
      paperColor: pageTemplate.paperColor,
      pageSize: pageTemplate.pageSize,
      strokes: [],
      textItems: [],
      shapes: []
    });
  }
  if (includeAnnotations) {
    await renderAnnotationDocumentPageImages(context, annotationDocument, pageNumber, canvas.width, canvas.height);
    renderAnnotationDocumentPage(context, annotationDocument, pageNumber, canvas.width, canvas.height);
  }
  return canvas;
}
async function renderMixedPagesToPdfBytes(app, sourceFile, annotationDocument, mixedEntries, realPdfPageCount, includeAnnotations) {
  var _a2, _b, _c;
  const binary = await app.vault.adapter.readBinary(sourceFile.path);
  const pdfjsLib = await loadNativePdfJs();
  const loadingTask = pdfjsLib.getDocument({
    data: new Uint8Array(binary),
    disableWorker: true,
    isEvalSupported: false,
    useWorkerFetch: false
  });
  try {
    const pdfDocument = await loadingTask.promise;
    const pages = [];
    const pageMap = /* @__PURE__ */ new Map();
    for (const entry of mixedEntries) {
      const canvas = entry.pageNumber <= pdfDocument.numPages ? await renderPdfPageToCanvas(pdfDocument, annotationDocument, entry.pageNumber, realPdfPageCount, includeAnnotations) : await renderSyntheticPageToCanvas(annotationDocument, entry.pageNumber, realPdfPageCount, includeAnnotations);
      const imagePage = canvasToJpegPage(canvas);
      if (entry.pageNumber <= pdfDocument.numPages) {
        const sourcePage = await pdfDocument.getPage(entry.pageNumber);
        const physical = sourcePage.getViewport({ scale: 1 });
        imagePage.widthPt = physical.width;
        imagePage.heightPt = physical.height;
      } else {
        const pageSize = (_c = (_b = (_a2 = annotationDocument.appendedPages) == null ? void 0 : _a2[entry.pageNumber - pdfDocument.numPages - 1]) == null ? void 0 : _b.pageSize) != null ? _c : "a4";
        const dimensions = getNotebookPageSizeDimensions(pageSize);
        imagePage.widthPt = pageSize === "letter" ? 612 : 595.276 * dimensions.width / 920;
        imagePage.heightPt = pageSize === "letter" ? 792 : imagePage.widthPt * dimensions.height / dimensions.width;
      }
      pages.push(imagePage);
      canvas.width = 0;
      canvas.height = 0;
      pageMap.set(entry.pageNumber, pages.length);
    }
    return {
      pdfBytes: buildPdfFromJpegPages(pages),
      pageMap
    };
  } finally {
    await loadingTask.destroy();
  }
}
async function exportAnnotatedMixedDocumentPdf(app, sourceFile, annotationDocument, mixedEntries, realPdfPageCount) {
  if (mixedEntries.length === 0) {
    new import_obsidian5.Notice("No pages available to export.");
    return null;
  }
  try {
    const { pdfBytes } = await renderMixedPagesToPdfBytes(app, sourceFile, annotationDocument, mixedEntries, realPdfPageCount, true);
    const outputFile = await createUniquePdfFile(app, sourceFile, pdfBytes, "annotated mixed");
    new import_obsidian5.Notice(`Exported ${outputFile.name}`);
    return outputFile;
  } catch (error) {
    console.error("freedraw-pdf: failed to export mixed annotated PDF", error);
    new import_obsidian5.Notice("Could not export annotated mixed PDF.");
    return null;
  }
}
async function createNativeMixedWorkingPdf(app, sourceFile, annotationDocument, mixedEntries, realPdfPageCount) {
  if (mixedEntries.length === 0) {
    new import_obsidian5.Notice("No pages available to materialize.");
    return null;
  }
  try {
    const { pdfBytes, pageMap } = await renderMixedPagesToPdfBytes(app, sourceFile, annotationDocument, mixedEntries, realPdfPageCount, false);
    const file = await createUniquePdfFile(app, sourceFile, pdfBytes, "native mixed working");
    new import_obsidian5.Notice(`Created ${file.name}`);
    return { file, pageMap };
  } catch (error) {
    console.error("freedraw-pdf: failed to create native mixed working PDF", error);
    new import_obsidian5.Notice("Could not create native mixed working PDF.");
    return null;
  }
}

// src/interaction/cursorState.ts
var SELECT_ACTION_CURSORS = /* @__PURE__ */ new Set([
  "crosshair",
  "move",
  "grabbing",
  "nwse-resize",
  "ns-resize",
  "nesw-resize",
  "ew-resize"
]);
function resolveOverlayModeCursor(activeTool, previousTool, previousCursor, defaultCursor) {
  if (activeTool === "select" && previousTool === "select" && SELECT_ACTION_CURSORS.has(previousCursor)) {
    return previousCursor;
  }
  return defaultCursor;
}

// src/ui/popoverPlacement.ts
function clampPlacement(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}
function resolveAnchoredPopoverPlacement(anchor, popover, viewport, mode = "center", margin = 12, gap = 10) {
  const minimumLeft = viewport.left + margin;
  const maximumLeft = Math.max(minimumLeft, viewport.right - popover.width - margin);
  const desiredLeft = mode === "left" ? anchor.left : anchor.left + anchor.width / 2 - popover.width / 2;
  const left = clampPlacement(desiredLeft, minimumLeft, maximumLeft);
  const belowTop = anchor.bottom + gap;
  const aboveBottom = anchor.top - gap;
  const availableBelow = Math.max(0, viewport.bottom - margin - belowTop);
  const availableAbove = Math.max(0, aboveBottom - (viewport.top + margin));
  const fitsBelow = popover.height <= availableBelow;
  const fitsAbove = popover.height <= availableAbove;
  const side = fitsBelow || !fitsAbove && availableBelow >= availableAbove ? "below" : "above";
  const maxHeight = side === "below" ? availableBelow : availableAbove;
  const renderedHeight = Math.min(popover.height, maxHeight);
  const top = side === "below" ? belowTop : aboveBottom - renderedHeight;
  return { left, top, maxHeight, side };
}

// src/ui/transientPopoverRegistry.ts
function createTransientPopoverEnvironment(ownerDocument) {
  const ownerWindow = ownerDocument.defaultView;
  return {
    mountBackdrop: (onDismiss) => {
      const backdrop = ownerDocument.body.createDiv({
        cls: "modal-container pdf-native-annotator-popover-backdrop"
      });
      backdrop.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        event.stopPropagation();
        onDismiss();
      });
      return backdrop;
    },
    mountPopover: (backdrop, popover) => {
      popover.addEventListener("pointerdown", (event) => event.stopPropagation());
      backdrop.appendChild(popover);
    },
    listenForEscape: (onDismiss) => {
      if (!ownerWindow) {
        return () => void 0;
      }
      const handleKeyDown = (event) => {
        if (event.key !== "Escape") {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        onDismiss();
      };
      ownerWindow.addEventListener("keydown", handleKeyDown, { capture: true });
      return () => ownerWindow.removeEventListener("keydown", handleKeyDown, { capture: true });
    }
  };
}
var TransientPopoverRegistry = class {
  constructor(environment) {
    this.environment = environment;
    this.active = null;
    this.backdrop = null;
    this.stopListeningForEscape = null;
  }
  open(key, element, options = {}) {
    this.closeAll();
    this.ensureMounted();
    this.active = { key, element, onClose: options.onClose };
    this.environment.mountPopover(this.backdrop, element);
  }
  get(key) {
    var _a2;
    return ((_a2 = this.active) == null ? void 0 : _a2.key) === key ? this.active.element : null;
  }
  hasOpen() {
    return this.active !== null;
  }
  close(key) {
    var _a2;
    if (((_a2 = this.active) == null ? void 0 : _a2.key) === key) {
      this.closeAll();
    }
  }
  closeAll() {
    var _a2;
    const closing = this.active;
    this.active = null;
    closing == null ? void 0 : closing.element.remove();
    (_a2 = closing == null ? void 0 : closing.onClose) == null ? void 0 : _a2.call(closing);
    if (!this.active) {
      this.unmountInfrastructure();
    }
  }
  dispose() {
    this.closeAll();
  }
  ensureMounted() {
    if (!this.backdrop) {
      this.backdrop = this.environment.mountBackdrop(() => this.closeAll());
    }
    if (!this.stopListeningForEscape) {
      this.stopListeningForEscape = this.environment.listenForEscape(() => this.closeAll());
    }
  }
  unmountInfrastructure() {
    var _a2, _b;
    (_a2 = this.backdrop) == null ? void 0 : _a2.remove();
    this.backdrop = null;
    (_b = this.stopListeningForEscape) == null ? void 0 : _b.call(this);
    this.stopListeningForEscape = null;
  }
};

// src/ui/menuDescriptors.ts
var menuSeparator = { type: "separator" };
function addMenuDescriptors(menu, descriptors) {
  for (const descriptor of descriptors) {
    if (descriptor.type === "separator") {
      menu.addSeparator();
      continue;
    }
    menu.addItem((item) => {
      item.setTitle(descriptor.title);
      if (descriptor.icon) {
        item.setIcon(descriptor.icon);
      }
      if (descriptor.checked !== void 0) {
        item.setChecked(descriptor.checked);
      }
      if (descriptor.disabled !== void 0) {
        item.setDisabled(descriptor.disabled);
      }
      if (descriptor.warning !== void 0) {
        item.setWarning(descriptor.warning);
      }
      if (descriptor.run) {
        item.onClick((event) => {
          var _a2;
          return void ((_a2 = descriptor.run) == null ? void 0 : _a2.call(descriptor, event));
        });
      }
    });
  }
}

// src/commands/sessionCommands.ts
function registerSessionCommands(register, resolveSession, definitions) {
  for (const definition of definitions) {
    register({
      id: definition.id,
      name: definition.name,
      checkCallback: (checking) => {
        var _a2, _b;
        const session = resolveSession();
        if (!session) {
          return false;
        }
        const canRun = (_b = (_a2 = definition.isEnabled) == null ? void 0 : _a2.call(definition, session)) != null ? _b : true;
        if (canRun && !checking) {
          void definition.run(session);
        }
        return canRun;
      }
    });
  }
}

// src/render/cooperativeRender.ts
function prioritizeRenderPages(pageNumbers, currentPage, pointerPage) {
  const uniquePages = Array.from(new Set(pageNumbers));
  return uniquePages.sort((left, right) => {
    const getPriority = (pageNumber) => {
      if (pointerPage !== null && pageNumber === pointerPage) {
        return -1;
      }
      if (pageNumber === currentPage) {
        return 0;
      }
      return Math.abs(pageNumber - currentPage) + 1;
    };
    return getPriority(left) - getPriority(right) || left - right;
  });
}
function runCooperativeRenderSlice(steps, startStep, options) {
  const deadline = options.now() + Math.max(1, options.budgetMs);
  let nextStep = startStep;
  while (nextStep < steps.length) {
    if (options.isInputPending()) {
      return { nextStep, inputPending: true };
    }
    const step = steps[nextStep];
    step.run();
    nextStep += 1;
    if (options.now() >= deadline) {
      break;
    }
  }
  return { nextStep, inputPending: false };
}

// src/debug/renderTelemetry.ts
var RENDER_TELEMETRY_EVENT = "freedraw-pdf:render-telemetry";
var INITIAL_SNAPSHOT = {
  inputPhase: "idle",
  inputTool: "-",
  inputPage: null,
  pointerType: "-",
  pointerEvents: 0,
  inputSamples: 0,
  strokePoints: 0,
  inputDelayMs: 0,
  lastCommittedPoints: 0,
  totalStrokes: 0,
  renderPhase: "idle",
  renderPage: null,
  renderCompleted: 0,
  renderTotal: 0,
  renderJobs: 0,
  renderSliceMs: 0,
  renderReason: "waiting",
  updatedAt: 0
};
var RenderTelemetryBroadcaster = class {
  constructor() {
    this.snapshot = { ...INITIAL_SNAPSHOT };
    this.rootEl = null;
    this.inputEl = null;
    this.renderEl = null;
    this.detailEl = null;
    this.hostWindow = null;
    this.publishHandle = null;
  }
  attach(host) {
    var _a2;
    if ((_a2 = this.rootEl) == null ? void 0 : _a2.isConnected) {
      return;
    }
    this.dispose();
    this.hostWindow = host.ownerDocument.defaultView;
    this.rootEl = host.createDiv({ cls: "pdf-native-annotator-telemetry" });
    this.rootEl.setAttribute("role", "status");
    this.rootEl.setAttribute("aria-live", "off");
    this.inputEl = this.rootEl.createDiv({ cls: "pdf-native-annotator-telemetry-row is-input" });
    this.renderEl = this.rootEl.createDiv({ cls: "pdf-native-annotator-telemetry-row is-render" });
    this.detailEl = this.rootEl.createDiv({ cls: "pdf-native-annotator-telemetry-detail" });
    this.publishNow();
  }
  recordPointerDown(tool, page, event) {
    this.update({
      inputPhase: "recording",
      inputTool: tool,
      inputPage: page,
      pointerType: event.pointerType || "unknown",
      pointerEvents: 1,
      inputSamples: 1,
      strokePoints: 1,
      inputDelayMs: this.getInputDelay(event)
    });
  }
  recordPointerSamples(event, sampleCount, strokePoints) {
    this.update({
      inputPhase: "recording",
      pointerEvents: this.snapshot.pointerEvents + 1,
      inputSamples: this.snapshot.inputSamples + sampleCount,
      strokePoints,
      inputDelayMs: this.getInputDelay(event)
    });
  }
  recordPointerUp(event) {
    this.update({
      pointerEvents: this.snapshot.pointerEvents + 1,
      inputDelayMs: this.getInputDelay(event)
    });
  }
  recordStrokeCommit(pointCount, totalStrokes) {
    this.update({
      inputPhase: "committed",
      strokePoints: pointCount,
      lastCommittedPoints: pointCount,
      totalStrokes
    });
  }
  recordInputCancelled() {
    this.update({ inputPhase: "cancelled" });
  }
  recordRenderQueued(page, totalSteps, activeJobs) {
    this.update({
      renderPhase: "queued",
      renderPage: page,
      renderCompleted: 0,
      renderTotal: totalSteps,
      renderJobs: activeJobs,
      renderSliceMs: 0,
      renderReason: "scheduled"
    });
  }
  recordRenderProgress(page, completed, total, activeJobs, sliceMs, inputPending) {
    this.update({
      renderPhase: inputPending ? "yielded" : "running",
      renderPage: page,
      renderCompleted: completed,
      renderTotal: total,
      renderJobs: activeJobs,
      renderSliceMs: sliceMs,
      renderReason: inputPending ? "input pending" : "rendering"
    });
  }
  recordRenderComplete(page) {
    this.update({
      renderPhase: "complete",
      renderPage: page,
      renderCompleted: this.snapshot.renderTotal,
      renderJobs: Math.max(0, this.snapshot.renderJobs - 1),
      renderReason: "atomic swap complete"
    });
  }
  recordRenderPublishing(page, activeJobs) {
    this.update({
      renderPhase: "publishing",
      renderPage: page,
      renderCompleted: this.snapshot.renderTotal,
      renderJobs: activeJobs,
      renderReason: "snapshotting off the input path"
    });
  }
  recordRenderCancelled(reason, activeJobs = 0) {
    this.update({
      renderPhase: "cancelled",
      renderJobs: activeJobs,
      renderReason: reason
    });
  }
  recordRenderIdle(reason) {
    this.update({
      renderPhase: "idle",
      renderPage: null,
      renderCompleted: 0,
      renderTotal: 0,
      renderJobs: 0,
      renderSliceMs: 0,
      renderReason: reason
    });
  }
  dispose() {
    var _a2;
    if (this.publishHandle !== null && this.hostWindow) {
      this.hostWindow.cancelAnimationFrame(this.publishHandle);
    }
    this.publishHandle = null;
    (_a2 = this.rootEl) == null ? void 0 : _a2.remove();
    this.rootEl = null;
    this.inputEl = null;
    this.renderEl = null;
    this.detailEl = null;
    this.hostWindow = null;
  }
  getInputDelay(event) {
    var _a2, _b;
    const now = (_b = (_a2 = this.hostWindow) == null ? void 0 : _a2.performance.now()) != null ? _b : performance.now();
    if (!Number.isFinite(event.timeStamp) || event.timeStamp <= 0) {
      return 0;
    }
    return Math.max(0, now - event.timeStamp);
  }
  update(update) {
    var _a2, _b;
    this.snapshot = {
      ...this.snapshot,
      ...update,
      updatedAt: (_b = (_a2 = this.hostWindow) == null ? void 0 : _a2.performance.now()) != null ? _b : performance.now()
    };
    if (!this.hostWindow || this.publishHandle !== null) {
      return;
    }
    this.publishHandle = this.hostWindow.requestAnimationFrame(() => {
      this.publishHandle = null;
      this.publishNow();
    });
  }
  publishNow() {
    if (!this.rootEl || !this.inputEl || !this.renderEl || !this.detailEl) {
      return;
    }
    const inputPage = this.snapshot.inputPage ? ` p${this.snapshot.inputPage}` : "";
    const renderPage = this.snapshot.renderPage ? ` p${this.snapshot.renderPage}` : "";
    this.inputEl.textContent = `INPUT ${this.snapshot.inputPhase.toUpperCase()}${inputPage} | ${this.snapshot.strokePoints} pts | ${this.snapshot.pointerEvents} events | ${this.snapshot.inputDelayMs.toFixed(1)} ms delay`;
    this.renderEl.textContent = `RENDER ${this.snapshot.renderPhase.toUpperCase()}${renderPage} | ${this.snapshot.renderCompleted}/${this.snapshot.renderTotal} | ${this.snapshot.renderJobs} jobs`;
    this.detailEl.textContent = `${this.snapshot.inputTool}/${this.snapshot.pointerType} | ${this.snapshot.inputSamples} samples | slice ${this.snapshot.renderSliceMs.toFixed(1)} ms | ${this.snapshot.renderReason}`;
    this.rootEl.dataset.inputPhase = this.snapshot.inputPhase;
    this.rootEl.dataset.renderPhase = this.snapshot.renderPhase;
    if (this.hostWindow) {
      this.hostWindow.dispatchEvent(new this.hostWindow.CustomEvent(RENDER_TELEMETRY_EVENT, {
        detail: { ...this.snapshot }
      }));
    }
  }
};

// main.ts
var DEFAULT_STROKE_REFERENCE_WIDTH2 = 1524;
var MAX_STROKE_WIDTH_SCALE2 = 0.08;
var MAX_TEXT_FONT_SCALE2 = 0.08;
var SCALE_DRIFT_TOLERANCE2 = 2.25;
var BLANK_PDF_EXPORT_WIDTH_PX = 1600;
var SELECTION_OUTLINE_COLOR = "#6b6b6b";
var SELECTION_FILL_COLOR = "rgba(107, 107, 107, 0.04)";
var SELECTION_HANDLE_FILL_COLOR = "#ffffff";
var SELECTION_LINE_DASH = [2, 2];
function isDomNode(value) {
  const candidate = value;
  return typeof (candidate == null ? void 0 : candidate.instanceOf) === "function" && candidate.instanceOf(Node);
}
function isDomElement(value) {
  return isDomNode(value) && value.instanceOf(Element);
}
function isHtmlElement(value) {
  return isDomNode(value) && value.instanceOf(HTMLElement);
}
function isHtmlCanvasElement(value) {
  return isDomNode(value) && value.instanceOf(HTMLCanvasElement);
}
var BlankAnnotatablePdfModal = class extends import_obsidian6.Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
    this.options = {
      title: "New annotatable PDF",
      pageCount: 1,
      template: "blank",
      pageSize: "a4",
      paperColor: "#ffffff"
    };
    this.titleEl.setText("Create annotatable PDF");
    this.modalEl.addClass("pdf-native-annotator-native-modal");
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("p", {
      text: "Creates a real PDF in the vault and opens it in Obsidian's native PDF viewer.",
      cls: "setting-item-description"
    });
    new import_obsidian6.Setting(contentEl).setName("Title").setDesc("The PDF filename.").addText((text) => {
      text.setValue(this.options.title);
      text.onChange((value) => {
        this.options.title = value.trim() || "New annotatable PDF";
      });
    });
    new import_obsidian6.Setting(contentEl).setName("Pages").setDesc("Number of template pages to create.").addText((text) => {
      text.inputEl.type = "number";
      text.inputEl.min = "1";
      text.inputEl.max = "200";
      text.setValue(String(this.options.pageCount));
      text.onChange((value) => {
        const next = Math.round(Number(value));
        this.options.pageCount = clamp2(Number.isFinite(next) ? next : 1, 1, 200);
      });
    });
    new import_obsidian6.Setting(contentEl).setName("Template").addDropdown((dropdown) => {
      NOTEBOOK_TEMPLATES.forEach((template) => {
        dropdown.addOption(template, getNotebookTemplateLabel(template));
      });
      dropdown.setValue(this.options.template);
      dropdown.onChange((value) => {
        this.options.template = value;
      });
    });
    new import_obsidian6.Setting(contentEl).setName("Paper size").addDropdown((dropdown) => {
      NOTEBOOK_PAGE_SIZES.forEach((pageSize) => {
        dropdown.addOption(pageSize, getNotebookPageSizeLabel(pageSize));
      });
      dropdown.setValue(this.options.pageSize);
      dropdown.onChange((value) => {
        this.options.pageSize = value;
      });
    });
    new import_obsidian6.Setting(contentEl).setName("Paper color").addDropdown((dropdown) => {
      PAPER_COLOR_PRESETS.forEach((preset) => {
        dropdown.addOption(preset.color, preset.label);
      });
      dropdown.setValue(this.options.paperColor);
      dropdown.onChange((value) => {
        this.options.paperColor = value;
      });
    });
    contentEl.createDiv("modal-button-container", (buttonContainer) => {
      buttonContainer.createEl("button", { cls: "mod-cta", text: "Create PDF" }, (button) => {
        button.addEventListener("click", () => {
          const options = { ...this.options };
          this.close();
          this.onSubmit(options);
        });
      });
      buttonContainer.createEl("button", { text: "Cancel" }, (button) => {
        button.addEventListener("click", () => this.close());
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};
var NativeInsertPageModal = class extends import_obsidian6.Modal {
  constructor(app, position, anchorLabel, defaults, onSubmit, mode = "native") {
    super(app);
    this.position = position;
    this.anchorLabel = anchorLabel;
    this.onSubmit = onSubmit;
    this.mode = mode;
    this.options = { ...defaults };
    this.titleEl.setText(this.mode === "temporary" ? "Add template page" : "Insert native template page");
    this.modalEl.addClass("pdf-native-annotator-native-modal");
  }
  onOpen() {
    const { contentEl } = this;
    this.titleEl.setText(this.mode === "temporary" ? "Add template page" : "Insert native template page");
    contentEl.empty();
    contentEl.createEl("p", {
      text: this.mode === "temporary" ? `Adds a temporary template page ${this.position} ${this.anchorLabel}. It stays editable and is included when you export the finished PDF.` : `Creates a new native working PDF with this template page inserted ${this.position} ${this.anchorLabel}. Existing annotations are remapped and remain editable.`,
      cls: "setting-item-description"
    });
    new import_obsidian6.Setting(contentEl).setName("Page title").addText((text) => {
      text.setValue(this.options.title);
      text.onChange((value) => {
        this.options.title = value.trim() || "Inserted page";
      });
    });
    new import_obsidian6.Setting(contentEl).setName("Template").addDropdown((dropdown) => {
      NOTEBOOK_TEMPLATES.forEach((template) => {
        dropdown.addOption(template, getNotebookTemplateLabel(template));
      });
      dropdown.setValue(this.options.template);
      dropdown.onChange((value) => {
        this.options.template = value;
      });
    });
    new import_obsidian6.Setting(contentEl).setName("Paper size").addDropdown((dropdown) => {
      NOTEBOOK_PAGE_SIZES.forEach((pageSize) => {
        dropdown.addOption(pageSize, getNotebookPageSizeLabel(pageSize));
      });
      dropdown.setValue(this.options.pageSize);
      dropdown.onChange((value) => {
        this.options.pageSize = value;
      });
    });
    new import_obsidian6.Setting(contentEl).setName("Paper color").addDropdown((dropdown) => {
      PAPER_COLOR_PRESETS.forEach((preset) => {
        dropdown.addOption(preset.color, preset.label);
      });
      dropdown.setValue(this.options.paperColor);
      dropdown.onChange((value) => {
        this.options.paperColor = value;
      });
    });
    contentEl.createDiv("modal-button-container", (buttonContainer) => {
      buttonContainer.createEl("button", { cls: "mod-cta", text: "Insert page" }, (button) => {
        button.addEventListener("click", () => {
          const options = { ...this.options };
          this.close();
          this.onSubmit(options);
        });
      });
      buttonContainer.createEl("button", { text: "Cancel" }, (button) => {
        button.addEventListener("click", () => this.close());
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};
var ImageInsertModal = class extends import_obsidian6.Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
    this.selectedFile = null;
    this.insertButtonEl = null;
    this.statusEl = null;
    this.titleEl.setText("Insert photo");
    this.modalEl.addClass("pdf-native-annotator-native-modal");
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("p", {
      text: "Choose an image file to place on the current PDF or template page.",
      cls: "setting-item-description"
    });
    const fileSetting = new import_obsidian6.Setting(contentEl).setName("Photo").setDesc("PNG, JPEG, WebP, GIF, or any image format supported by Obsidian.");
    const input = fileSetting.controlEl.createEl("input", { type: "file" });
    input.accept = "image/*";
    input.addEventListener("change", () => {
      var _a2, _b, _c;
      this.selectedFile = (_b = (_a2 = input.files) == null ? void 0 : _a2[0]) != null ? _b : null;
      (_c = this.statusEl) == null ? void 0 : _c.setText(this.selectedFile ? this.selectedFile.name : "No image selected");
      if (this.insertButtonEl) {
        this.insertButtonEl.disabled = !this.selectedFile;
      }
    });
    this.statusEl = contentEl.createEl("p", {
      text: "No image selected",
      cls: "setting-item-description"
    });
    contentEl.createDiv("modal-button-container", (buttonContainer) => {
      this.insertButtonEl = buttonContainer.createEl("button", { cls: "mod-cta", text: "Insert" }, (button) => {
        button.disabled = true;
        button.addEventListener("click", () => {
          if (!this.selectedFile) {
            return;
          }
          const file = this.selectedFile;
          this.close();
          this.onSubmit(file);
        });
      });
      buttonContainer.createEl("button", { text: "Cancel" }, (button) => {
        button.addEventListener("click", () => this.close());
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};
var NativePdfAnnotatorSession = class {
  constructor(plugin, leaf, store) {
    this.plugin = plugin;
    this.leaf = leaf;
    this.store = store;
    this.selectionBackground = null;
    this.publishedFrames = /* @__PURE__ */ new WeakMap();
    this.file = null;
    this.annotationDocument = null;
    this.annotationLoadInfo = null;
    this.rootEl = null;
    this.toolbarEl = null;
    this.statusEl = null;
    this.activeNativeMenu = null;
    this.pageListFilter = "all";
    this.pageListQuery = "";
    this.nativeMixedPageInputEl = null;
    this.nativeMixedPageCountEl = null;
    this.inlineTextEditorEl = null;
    this.inlineTextEditorFrameEl = null;
    this.inlineTextCaretMirrorEl = null;
    this.inlineTextTargetId = null;
    this.inlineTextPoint = null;
    this.inlineTextPageNumber = null;
    this.inlineTextAutoFit = false;
    this.toolPreviewEl = null;
    this.mutationObserver = null;
    this.viewResizeObserver = null;
    this.syncHandle = null;
    this.scrollHandle = null;
    this.scrollIdleHandle = null;
    this.redrawHandle = null;
    this.interactionRedrawHandle = null;
    this.committedRedrawHandle = null;
    this.popoverRepositionHandle = null;
    this.toolbarScrollRestoreHandle = null;
    this.thumbnailScrollRestoreHandle = null;
    this.keyboardAvoidanceHandle = null;
    this.pendingWebKitTouchHandle = null;
    this.fingerPanFrameHandle = null;
    this.fingerPanInertiaHandle = null;
    this.visualViewportBaselineHeight = 0;
    this.layoutRefreshHandles = [];
    this.zoomSettleHandle = null;
    this.autosaveHandle = null;
    this.statusResetHandle = null;
    this.pointerPage = null;
    this.activePdfPointerId = null;
    this.activePdfPointerCanvas = null;
    this.activePdfPointerRect = null;
    this.pendingWebKitTouchPointer = null;
    this.webKitStylusPointerId = null;
    this.fingerPanPointerId = null;
    this.fingerPanCanvas = null;
    this.fingerPanScrollEl = null;
    this.fingerPanLastPoint = null;
    this.fingerPanPendingDelta = { x: 0, y: 0 };
    this.fingerPanVelocity = { x: 0, y: 0 };
    this.zoomScrollAnchor = null;
    this.zoomAnchorRestoreHandle = null;
    this.syntheticZoomPreviewHandle = null;
    this.currentStroke = null;
    this.currentStrokeRenderedPointCount = 0;
    this.currentShape = null;
    this.selectedTarget = null;
    this.selectedTargets = [];
    this.currentLasso = null;
    this.lastSelectionRegion = null;
    this.dragAnchor = null;
    this.dragMoved = false;
    this.activeResizeHandle = null;
    this.erasingSession = false;
    this.lastEraserPoint = null;
    this.eraserSessionPoints = [];
    this.objectErasePreviewTargets = /* @__PURE__ */ new Map();
    this.scrollParent = null;
    this.nativeEventBus = null;
    this.nativeEventHandlers = [];
    this.currentPage = 1;
    this.visiblePageRange = null;
    this.previewState = new PreviewStateController();
    this.annotationMode = false;
    this.isDirty = false;
    this.documentRevision = 0;
    this.attachmentGeneration = 0;
    this.attachPromise = null;
    this.savePromise = null;
    this.undoStack = [];
    this.redoStack = [];
    this.pageSurfaces = /* @__PURE__ */ new Map();
    this.pageResizeObservers = /* @__PURE__ */ new Map();
    this.pendingRedrawPages = /* @__PURE__ */ new Set();
    this.pendingInteractionRedrawPages = /* @__PURE__ */ new Set();
    this.pendingCommittedRedrawPages = /* @__PURE__ */ new Set();
    this.strokePathCache = /* @__PURE__ */ new Map();
    this.pageRenderSlots = /* @__PURE__ */ new Map();
    this.pageRenderJobs = /* @__PURE__ */ new Map();
    this.pageRenderVersions = /* @__PURE__ */ new Map();
    this.pageRenderPublications = /* @__PURE__ */ new Map();
    this.renderInputEpoch = 0;
    this.pageRenderTaskHandle = null;
    this.renderTelemetry = new RenderTelemetryBroadcaster();
    this.imageElementCache = /* @__PURE__ */ new Map();
    this.zoomingPages = /* @__PURE__ */ new Set();
    this.annotationPageCache = null;
    this.nextPageZIndexCache = /* @__PURE__ */ new Map();
    this.realPdfPageCount = 0;
    this.syntheticPageContainer = null;
    this.nativeMixedThumbnailViewEl = null;
    this.nativeMixedThumbnailSignature = "";
    this.isSyncingSyntheticPages = false;
    this.isPdfScrolling = false;
    this.needsToolbarRefreshAfterScroll = false;
    this.startupErrorShown = false;
    this.focusedRegion = null;
    this.focusedRegionPage = null;
    this.focusedRegionHandle = null;
    this.lastPdfPoint = null;
    this.lastPdfPointTime = 0;
    this.lastInkInputTimestamp = 0;
    this.floatingToolbarOffset = { right: 12, top: 8 };
    this.floatingToolbarDrag = null;
    this.currentTextFontFamily = TEXT_FONT_FAMILIES[0];
    this.currentTextFontSize = 18;
    this.currentTextColor = TEXT_COLOR_PRESETS[0].color;
    this.currentTextFontWeight = "normal";
    this.currentTextFontStyle = "normal";
    this.currentTextAlignment = "left";
    this.currentTextVerticalAlignment = "middle";
    this.currentTextLineSpacing = INLINE_TEXT_LINE_HEIGHT;
    this.currentTextWordWrap = true;
    this.sessionKeyListenerBound = false;
    this.keyboardNudgeHistoryOpen = false;
    this.handleNativeMixedPageInputEvent = (event) => {
      const input = this.nativeMixedPageInputEl;
      if (!input || event.target !== input) {
        return;
      }
      event.stopImmediatePropagation();
      if (event.type === "focus") {
        input.dataset.freedrawEditing = "true";
        input.value = String(this.getCurrentMixedPageOrdinal());
        input.select();
        return;
      }
      if (event.type === "input") {
        return;
      }
      if (event.type === "change") {
        event.preventDefault();
        this.commitNativeMixedPageInput();
        return;
      }
      if (event.type === "blur") {
        delete input.dataset.freedrawEditing;
        this.commitNativeMixedPageInput();
      }
    };
    this.handleNativeMixedPageInputKeyDown = (event) => {
      const input = this.nativeMixedPageInputEl;
      if (!input || event.target !== input) {
        return;
      }
      event.stopImmediatePropagation();
      const entries = this.getMixedPageEntries();
      if (entries.length === 0) {
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        this.commitNativeMixedPageInput();
        input.blur();
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        input.value = String(this.getCurrentMixedPageOrdinal(entries));
        input.blur();
        return;
      }
      if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "PageUp" || event.key === "PageDown") {
        event.preventDefault();
        const direction = event.key === "ArrowUp" || event.key === "PageUp" ? -1 : 1;
        const currentOrdinal = clamp2(Math.round(Number(input.value) || this.getCurrentMixedPageOrdinal(entries)), 1, entries.length);
        input.value = String(clamp2(currentOrdinal + direction, 1, entries.length));
        this.commitNativeMixedPageInput();
      }
    };
    this.handleToolbarDragStart = (event) => {
      var _a2;
      if (!((_a2 = this.rootEl) == null ? void 0 : _a2.classList.contains("is-floating"))) {
        return;
      }
      if (this.isToolbarInteractiveTarget(event.target)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      this.floatingToolbarDrag = {
        startX: event.clientX,
        startY: event.clientY,
        startRight: this.floatingToolbarOffset.right,
        startTop: this.floatingToolbarOffset.top
      };
      this.rootEl.classList.add("is-dragging");
      this.ownerWindow.addEventListener("pointermove", this.handleToolbarDragMove, { passive: false });
      this.ownerWindow.addEventListener("pointerup", this.handleToolbarDragEnd, { once: true });
      this.ownerWindow.addEventListener("pointercancel", this.handleToolbarDragEnd, { once: true });
    };
    this.handleToolbarDragMove = (event) => {
      var _a2, _b, _c;
      if (!this.rootEl || !this.floatingToolbarDrag) {
        return;
      }
      event.preventDefault();
      const viewContentEl = this.getViewContentEl();
      const bounds = viewContentEl == null ? void 0 : viewContentEl.getBoundingClientRect();
      const toolbarRect = this.rootEl.getBoundingClientRect();
      const maxTop = Math.max(0, ((_a2 = bounds == null ? void 0 : bounds.height) != null ? _a2 : this.ownerWindow.innerHeight) - toolbarRect.height - 8);
      const maxRight = Math.max(0, ((_b = bounds == null ? void 0 : bounds.width) != null ? _b : this.ownerWindow.innerWidth) - Math.min(toolbarRect.width, (_c = bounds == null ? void 0 : bounds.width) != null ? _c : this.ownerWindow.innerWidth) - 8);
      this.floatingToolbarOffset = {
        right: clamp2(this.floatingToolbarDrag.startRight - (event.clientX - this.floatingToolbarDrag.startX), 8, maxRight),
        top: clamp2(this.floatingToolbarDrag.startTop + (event.clientY - this.floatingToolbarDrag.startY), 8, maxTop)
      };
      this.applyFloatingToolbarPosition();
    };
    this.handleToolbarDragEnd = () => {
      var _a2;
      (_a2 = this.rootEl) == null ? void 0 : _a2.classList.remove("is-dragging");
      this.floatingToolbarDrag = null;
      this.ownerWindow.removeEventListener("pointermove", this.handleToolbarDragMove);
      this.ownerWindow.removeEventListener("pointerup", this.handleToolbarDragEnd);
      this.ownerWindow.removeEventListener("pointercancel", this.handleToolbarDragEnd);
    };
    this.handleNativePdfThumbnailContextMenu = (event) => {
      if (!this.annotationDocument) {
        return;
      }
      const linkEl = event.currentTarget instanceof HTMLElement ? event.currentTarget : null;
      if (!linkEl) {
        return;
      }
      const pageNumber = this.getNativePdfThumbnailPageNumber(linkEl);
      if (!pageNumber || this.isPdfPageDeleted(pageNumber)) {
        return;
      }
      const entry = this.getMixedPageEntries().find((candidate) => !candidate.isAdded && candidate.pageNumber === pageNumber);
      if (!entry) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      this.openMixedPageEntryMenu(entry, event, linkEl);
    };
    this.handleScroll = () => {
      if (this.hasOpenTransientPopover()) {
        this.scheduleRepositionOpenPopovers();
      }
      if (!this.isPdfScrolling) {
        this.pauseCommittedRenderingForViewportMotion();
      }
      this.isPdfScrolling = true;
      if (this.scrollIdleHandle !== null) {
        this.ownerWindow.clearTimeout(this.scrollIdleHandle);
      }
      this.scrollIdleHandle = this.ownerWindow.setTimeout(() => {
        this.scrollIdleHandle = null;
        this.isPdfScrolling = false;
        this.updateCurrentPageFromScroll();
        if (this.needsToolbarRefreshAfterScroll) {
          this.needsToolbarRefreshAfterScroll = false;
          this.refreshToolbar();
        }
        this.updateVisiblePageRange(true);
        this.flushDeferredScrollRedraws();
      }, 160);
    };
    this.handleViewportResize = () => {
      this.scheduleRepositionOpenPopovers();
      this.scheduleLayoutRefresh();
    };
    this.handleVisualViewportChange = () => {
      this.scheduleRepositionOpenPopovers();
      const frame = this.inlineTextEditorFrameEl;
      const editor = this.inlineTextEditorEl;
      const viewport = this.ownerWindow.visualViewport;
      const editorFocused = !!editor && editor.ownerDocument.activeElement === editor;
      if (!editorFocused) {
        this.captureVisualViewportBaseline();
      }
      const baselineHeight = Math.max(this.visualViewportBaselineHeight, this.ownerWindow.innerHeight);
      const keyboardRaised = !!viewport && Math.abs(viewport.scale - 1) < 0.05 && viewport.height < baselineHeight - 80;
      if (!frame || !editor || !viewport || !editorFocused || !keyboardRaised) {
        return;
      }
      if (this.keyboardAvoidanceHandle !== null) {
        return;
      }
      this.keyboardAvoidanceHandle = this.ownerWindow.requestAnimationFrame(() => {
        this.keyboardAvoidanceHandle = null;
        this.keepInlineTextEditorAboveKeyboard();
      });
    };
    this.handleSessionKeyDown = (event) => {
      if (this.handleInlineTextEditorShortcut(event)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (event.key === "Escape" && this.isSessionEscapeEligible(event) && this.cancelActiveSessionInteraction()) {
        event.preventDefault();
        return;
      }
      if (event.key === "Escape" && this.isSessionEscapeEligible(event)) {
        event.preventDefault();
        event.stopPropagation();
        this.exitAnnotationModeFromEscape();
        return;
      }
      const isModifierShortcut = event.ctrlKey || event.metaKey;
      if (isModifierShortcut && this.isSessionShortcutActive(event)) {
        const key = event.key.toLowerCase();
        if (key === "z") {
          event.preventDefault();
          if (event.shiftKey) {
            this.redo();
          } else {
            this.undo();
          }
          return;
        }
        if (key === "y") {
          event.preventDefault();
          this.redo();
          return;
        }
      }
      const toolShortcut = resolveToolShortcut(event);
      if (toolShortcut && this.isSessionShortcutActive(event) && !this.hasActiveTransientRender()) {
        event.preventDefault();
        event.stopPropagation();
        this.closeTransientPopovers();
        this.setActiveTool(toolShortcut);
        this.applyOverlayMode();
        this.refreshToolbar();
        return;
      }
      if (!this.isSessionKeyboardActive(event)) {
        return;
      }
      if ((event.key === "Delete" || event.key === "Backspace") && this.selectedTargets.length > 0) {
        event.preventDefault();
        this.deleteSelectedTargets();
        return;
      }
      if (event.key === "Enter" && this.selectedTargets.length === 1 && this.selectedTargets[0].kind === "text") {
        event.preventDefault();
        this.beginEditingSelectedTextTarget(this.selectedTargets[0]);
        return;
      }
      if (isModifierShortcut && event.key.toLowerCase() === "a") {
        event.preventDefault();
        this.selectAllCurrentPageAnnotations();
        return;
      }
      if (isModifierShortcut && event.key.toLowerCase() === "c" && this.selectedTargets.length > 0) {
        event.preventDefault();
        this.copySelectedTargets();
        return;
      }
      if (isModifierShortcut && event.key.toLowerCase() === "x" && this.selectedTargets.length > 0) {
        event.preventDefault();
        this.cutSelectedTargets();
        return;
      }
      if (isModifierShortcut && event.key === "]" && this.selectedTargets.length > 0) {
        event.preventDefault();
        this.reorderSelectedTargets(event.shiftKey ? "front" : "forward");
        return;
      }
      if (isModifierShortcut && event.key === "[" && this.selectedTargets.length > 0) {
        event.preventDefault();
        this.reorderSelectedTargets(event.shiftKey ? "back" : "backward");
        return;
      }
      const nudgeAmount = this.getKeyboardNudgeAmount(event.shiftKey);
      const nudges = {
        ArrowLeft: { x: -nudgeAmount, y: 0 },
        ArrowRight: { x: nudgeAmount, y: 0 },
        ArrowUp: { x: 0, y: -nudgeAmount },
        ArrowDown: { x: 0, y: nudgeAmount }
      };
      const nudge = nudges[event.key];
      if (nudge && this.selectedTargets.length > 0) {
        event.preventDefault();
        this.nudgeSelectedTargets(nudge.x, nudge.y, !this.keyboardNudgeHistoryOpen);
        this.keyboardNudgeHistoryOpen = true;
      }
    };
    this.handleSessionKeyUp = (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown") {
        this.keyboardNudgeHistoryOpen = false;
      }
    };
    this.handleSessionWindowBlur = () => {
      this.keyboardNudgeHistoryOpen = false;
    };
    this.handleViewPointerMove = (event) => {
      if (!this.annotationMode) {
        return;
      }
      if (this.fingerPanPointerId === event.pointerId || shouldPanInkPointerEvent(event, this.currentTool, this.getInkInputPolicy())) {
        this.hideToolPreview();
        return;
      }
      if (this.currentTool === "eraser") {
        this.updateToolPreview(event.clientX, event.clientY, this.erasingSession);
      }
      this.updateOverlayCursorForPointer(event);
    };
    this.handleViewPointerLeave = () => {
      if (!this.erasingSession) {
        this.hideToolPreview();
      }
      for (const surface of this.pageSurfaces.values()) {
        this.setOverlayCursor(surface, this.getDefaultOverlayCursor());
      }
    };
    this.handleViewPointerDown = (event) => {
      if (shouldPanInkPointerEvent(event, this.currentTool, this.getInkInputPolicy())) {
        return;
      }
      this.handleFallbackPointerDown(event);
    };
    this.handleZoomGestureTouchStart = (event) => {
      if (event.touches.length < 2) {
        return;
      }
      this.captureZoomScrollAnchor();
    };
    this.handleZoomGestureWheel = (event) => {
      if (!isTrackpadPinchWheel(event)) {
        return;
      }
      this.captureZoomScrollAnchor();
    };
    this.handleZoomGestureStart = () => {
      this.captureZoomScrollAnchor();
    };
    this.handleDocumentPointerDown = (event) => {
      if (this.handleFingerPanPointerDown(event)) {
        return;
      }
      if (this.handleCapturedInkPointerDown(event)) {
        return;
      }
      this.handleFallbackPointerDown(event);
    };
    this.handleDocumentTouchStart = (event) => {
      var _a2;
      const pendingPointer = this.pendingWebKitTouchPointer;
      const touches = Array.from(event.changedTouches);
      const matchingTouch = pendingPointer ? (_a2 = touches.find((touch) => Math.hypot(
        pendingPointer.clientX - touch.clientX,
        pendingPointer.clientY - touch.clientY
      ) <= 32)) != null ? _a2 : null : null;
      if (!pendingPointer || !matchingTouch || !this.annotationMode || this.getInkInputPolicy() !== "pen-mouse-only") {
        this.clearPendingWebKitTouchPointer();
        return;
      }
      const target = isDomElement(event.target) ? event.target : null;
      if (!target || !this.isPointerTargetInsidePdfPage(target)) {
        this.clearPendingWebKitTouchPointer();
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      const stylusTouch = isWebKitStylusTouch(
        matchingTouch
      );
      this.clearPendingWebKitTouchPointer();
      if (!stylusTouch) {
        return;
      }
      this.finishFingerPan(false);
      const surface = this.ensureSurfaceAtClientPoint(matchingTouch.clientX, matchingTouch.clientY);
      if (!surface) {
        this.scheduleSyncPages();
        return;
      }
      this.handlePointerDownForCanvas(pendingPointer, surface.overlayEl, true);
    };
    this.handleFingerPanPointerMove = (event) => {
      if (event.pointerId !== this.fingerPanPointerId || !this.fingerPanLastPoint) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      const now = event.timeStamp || performance.now();
      const deltaTime = Math.max(1, now - this.fingerPanLastPoint.time);
      const deltaX = this.fingerPanLastPoint.clientX - event.clientX;
      const deltaY = this.fingerPanLastPoint.clientY - event.clientY;
      this.fingerPanPendingDelta.x += deltaX;
      this.fingerPanPendingDelta.y += deltaY;
      this.fingerPanVelocity.x = this.fingerPanVelocity.x * 0.68 + deltaX / deltaTime * 0.32;
      this.fingerPanVelocity.y = this.fingerPanVelocity.y * 0.68 + deltaY / deltaTime * 0.32;
      this.fingerPanLastPoint = { clientX: event.clientX, clientY: event.clientY, time: now };
      if (this.fingerPanFrameHandle === null) {
        this.fingerPanFrameHandle = this.ownerWindow.requestAnimationFrame(() => {
          this.fingerPanFrameHandle = null;
          this.applyPendingFingerPan();
        });
      }
    };
    this.handleFingerPanPointerUp = (event) => {
      if (event.pointerId !== this.fingerPanPointerId) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      this.finishFingerPan(true);
    };
    this.handleFingerPanPointerCancel = (event) => {
      if (event.pointerId !== this.fingerPanPointerId) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      this.finishFingerPan(false);
    };
    this.handlePointerDown = (event) => {
      if (this.activePdfPointerId !== null) {
        if (this.activePdfPointerId !== event.pointerId) {
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }
      const canvas = isHtmlCanvasElement(event.currentTarget) ? event.currentTarget : null;
      if (!canvas) {
        this.refreshStatus("Could not start ink: pointer target is not the annotator canvas", 4e3);
        return;
      }
      this.handlePointerDownForCanvas(event, canvas);
    };
    this.handleDocumentPointerMove = (event) => {
      if (!this.shouldHandleDocumentPointer(event) || !this.activePdfPointerCanvas) {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      this.handlePointerMoveForCanvas(event, this.activePdfPointerCanvas);
    };
    this.handleDocumentPointerUp = (event) => {
      if (!this.shouldHandleDocumentPointer(event) || !this.activePdfPointerCanvas) {
        return;
      }
      const canvas = this.activePdfPointerCanvas;
      event.preventDefault();
      event.stopImmediatePropagation();
      this.handlePointerUpForCanvas(event, canvas);
    };
    this.handleDocumentPointerCancel = (event) => {
      if (!this.shouldHandleDocumentPointer(event) || !this.activePdfPointerCanvas) {
        return;
      }
      const canvas = this.activePdfPointerCanvas;
      event.preventDefault();
      event.stopImmediatePropagation();
      this.handlePointerCancelForCanvas(event, canvas);
    };
    this.handlePointerMove = (event) => {
      if (this.activePdfPointerId !== null && this.activePdfPointerId !== event.pointerId) {
        return;
      }
      if (this.shouldHandleDocumentPointer(event)) {
        return;
      }
      const canvas = isHtmlCanvasElement(event.currentTarget) ? event.currentTarget : null;
      if (!canvas) {
        return;
      }
      this.handlePointerMoveForCanvas(event, canvas);
    };
    this.handlePointerEnter = (event) => {
      this.handleViewPointerMove(event);
    };
    this.handlePointerUp = (event) => {
      if (this.activePdfPointerId !== null && this.activePdfPointerId !== event.pointerId) {
        return;
      }
      if (this.shouldHandleDocumentPointer(event)) {
        return;
      }
      const canvas = isHtmlCanvasElement(event.currentTarget) ? event.currentTarget : null;
      this.handlePointerUpForCanvas(event, canvas);
    };
    this.handlePointerCancel = (event) => {
      if (this.activePdfPointerId !== null && this.activePdfPointerId !== event.pointerId) {
        return;
      }
      if (this.shouldHandleDocumentPointer(event)) {
        return;
      }
      const canvas = isHtmlCanvasElement(event.currentTarget) ? event.currentTarget : null;
      this.handlePointerCancelForCanvas(event, canvas);
    };
    this.handlePointerLeave = () => {
      if (!this.erasingSession) {
        this.refreshToolPreviewFromLastPointer(false);
      }
    };
    var _a2;
    this.ownerDocument = this.leaf.view.containerEl.ownerDocument;
    this.ownerWindow = (_a2 = this.ownerDocument.defaultView) != null ? _a2 : window;
    this.toolState = new ToolStateController(this.plugin.getStoredPresets(), this.plugin.getToolDefaults());
    this.transientPopovers = new TransientPopoverRegistry(
      createTransientPopoverEnvironment(this.leaf.view.containerEl.ownerDocument)
    );
    this.currentTextColor = this.plugin.getTextColor();
  }
  get currentFile() {
    return this.file;
  }
  get activePage() {
    return this.currentPage;
  }
  isForLeaf(leaf) {
    return leaf === this.leaf;
  }
  isActive() {
    return !!this.file;
  }
  refreshUiState() {
    this.refreshToolbar();
  }
  refreshSettings() {
    this.mountUi();
    this.applyOverlayMode();
    this.syncRenderTelemetry();
    this.refreshToolbar();
  }
  refreshLayout() {
    this.commitActiveInkBeforeLayoutRefresh();
    this.scheduleLayoutRefresh();
  }
  async refreshLayoutAndFlush() {
    this.commitActiveInkBeforeLayoutRefresh();
    await this.flushSave();
    this.scheduleLayoutRefresh();
  }
  focusRegion(page, rect) {
    this.focusedRegionPage = page;
    this.focusedRegion = rect;
    const surface = this.pageSurfaces.get(page);
    if (surface) {
      this.scrollPageElementIntoView(surface.pageEl);
      this.currentPage = page;
      this.drawPageAnnotations(page);
    } else {
      this.scheduleSyncPages();
    }
    if (this.focusedRegionHandle !== null) {
      this.ownerWindow.clearTimeout(this.focusedRegionHandle);
    }
    this.focusedRegionHandle = this.ownerWindow.setTimeout(() => {
      this.focusedRegionHandle = null;
      this.focusedRegion = null;
      this.focusedRegionPage = null;
      this.drawAllAnnotations();
    }, 5e3);
    this.refreshStatus(`Focused region on page ${page}`);
  }
  focusPage(page) {
    this.goToMixedPage(page);
  }
  async attach() {
    const generation = this.attachmentGeneration;
    if (this.attachPromise) {
      await this.attachPromise;
      if (generation !== this.attachmentGeneration) {
        return;
      }
      return this.attach();
    }
    const attaching = this.attachFile();
    this.attachPromise = attaching;
    try {
      await attaching;
    } finally {
      if (this.attachPromise === attaching) this.attachPromise = null;
    }
  }
  async attachFile() {
    var _a2;
    const generation = this.attachmentGeneration;
    try {
      const nextFile = this.getPdfFile();
      if (!nextFile) {
        this.detach();
        return;
      }
      this.bindSessionKeyListener();
      const fileChanged = !this.file || this.file.path !== nextFile.path;
      this.ensureUi();
      if (fileChanged) {
        this.applyOverlayMode();
        this.commitActiveInkBeforeLayoutRefresh();
        this.finishSessionInlineTextEditor(true);
        await this.flushSave();
        if (this.isDirty) {
          throw new Error("Save the current annotations before switching PDFs.");
        }
        const loadInfo = await this.store.loadWithInfo(nextFile);
        if (generation !== this.attachmentGeneration || ((_a2 = this.getPdfFile()) == null ? void 0 : _a2.path) !== nextFile.path) {
          return;
        }
        this.file = nextFile;
        this.annotationDocument = loadInfo.document;
        this.nextPageZIndexCache.clear();
        this.annotationLoadInfo = loadInfo;
        this.isDirty = false;
        const zIndexesChanged = normalizeDocumentZIndexes(this.annotationDocument);
        const strokeScalesChanged = normalizeDocumentStrokeScales(this.annotationDocument);
        if (loadInfo.migratedLegacyErasers || loadInfo.migratedInkSettings) {
          this.documentRevision += 1;
          this.isDirty = true;
          try {
            await this.store.save(nextFile, this.annotationDocument);
            this.isDirty = false;
          } catch (error) {
            console.warn("freedraw-pdf: could not persist legacy eraser migration immediately", error);
            this.scheduleSave();
          }
        } else if (zIndexesChanged || strokeScalesChanged) {
          this.documentRevision += 1;
          this.isDirty = true;
          this.scheduleSave();
        }
        this.invalidateAnnotationPageCache();
        this.undoStack = [];
        this.redoStack = [];
        this.currentPage = 1;
        this.realPdfPageCount = 0;
        this.startupErrorShown = false;
        const temporaryPageCount = this.getTemporarySidecarPageCount();
        this.refreshStatus(
          temporaryPageCount > 0 ? `${temporaryPageCount} temporary template page${temporaryPageCount === 1 ? "" : "s"} found. Export when you want a finished PDF.` : `Attached to native PDF viewer: ${nextFile.name}`,
          temporaryPageCount > 0 ? 8e3 : 2500
        );
      }
      this.observePdfDom();
      this.bindNativePdfEvents();
      this.syncPages();
      this.applyOverlayMode();
      this.refreshToolbar();
    } catch (error) {
      console.error("freedraw-pdf: failed to attach to PDF view", error);
      this.showStartupError("freedraw-pdf could not attach safely to this PDF view.");
    }
  }
  async flushSave() {
    if (this.savePromise) {
      return this.savePromise;
    }
    const saving = this.savePendingDocument();
    this.savePromise = saving;
    try {
      await saving;
    } finally {
      if (this.savePromise === saving) this.savePromise = null;
    }
  }
  async savePendingDocument() {
    if (this.autosaveHandle !== null) {
      this.ownerWindow.clearTimeout(this.autosaveHandle);
      this.autosaveHandle = null;
    }
    while (this.file && this.annotationDocument && this.isDirty) {
      const file = this.file;
      const document = this.annotationDocument;
      const revision = this.documentRevision;
      try {
        await this.store.save(file, document);
        if (this.file !== file || this.annotationDocument !== document) {
          return;
        }
        this.isDirty = revision !== this.documentRevision;
        if (!this.isDirty) {
          this.refreshStatus(`Saved ${this.store.getSidecarPath(file)}`);
        }
      } catch (error) {
        console.error("freedraw-pdf: failed to save", error);
        new import_obsidian6.Notice(error instanceof Error ? error.message : "Could not save PDF annotations.");
        this.refreshStatus("Unsaved changes \u2014 save failed");
        await this.preserveFailedSave(file, document);
        return;
      }
    }
  }
  async preserveFailedSave(file, document) {
    try {
      const path = await this.store.saveRecoveryCopy(file, document);
      new import_obsidian6.Notice(`Unsaved annotations preserved in ${path}`, 12e3);
    } catch (error) {
      console.error("freedraw-pdf: recovery save failed", error);
      new import_obsidian6.Notice("Annotation save and recovery failed. Check available storage and vault access.", 12e3);
    }
  }
  detach() {
    var _a2, _b;
    this.attachmentGeneration += 1;
    this.commitActiveInkBeforeLayoutRefresh();
    this.finishSessionInlineTextEditor(true);
    const closingFile = this.file;
    const closingDocument = this.annotationDocument;
    const closingDirty = this.isDirty;
    void this.flushSave().then(async () => {
      if (closingDirty && closingFile && closingDocument) {
        await this.store.save(closingFile, closingDocument);
      }
    }).catch(async () => {
      if (closingFile && closingDocument) {
        await this.preserveFailedSave(closingFile, closingDocument);
      }
    });
    this.detachNativeMixedPageNavigator();
    this.file = null;
    this.annotationDocument = null;
    this.nextPageZIndexCache.clear();
    this.selectionBackground = null;
    this.annotationLoadInfo = null;
    this.invalidateAnnotationPageCache();
    this.currentStroke = null;
    this.currentShape = null;
    this.selectedTarget = null;
    this.selectedTargets = [];
    this.currentLasso = null;
    this.dragAnchor = null;
    this.dragMoved = false;
    this.activeResizeHandle = null;
    this.erasingSession = false;
    this.lastEraserPoint = null;
    this.eraserSessionPoints = [];
    this.objectErasePreviewTargets.clear();
    this.previewState.hide();
    this.pointerPage = null;
    this.visiblePageRange = null;
    this.realPdfPageCount = 0;
    this.cleanupNativeMixedPageThumbnails();
    (_a2 = this.syntheticPageContainer) == null ? void 0 : _a2.querySelectorAll(".pdf-native-annotator-synthetic-page").forEach((page) => page.remove());
    this.syntheticPageContainer = null;
    this.undoStack = [];
    this.redoStack = [];
    if (this.focusedRegionHandle !== null) {
      this.ownerWindow.clearTimeout(this.focusedRegionHandle);
      this.focusedRegionHandle = null;
    }
    this.focusedRegion = null;
    this.focusedRegionPage = null;
    this.destroyObservers();
    this.unbindNativePdfEvents();
    this.destroyPageSurfaces();
    this.renderTelemetry.dispose();
    (_b = this.rootEl) == null ? void 0 : _b.remove();
    this.rootEl = null;
    this.toolbarEl = null;
    this.statusEl = null;
    this.closeActiveNativeMenu();
    this.transientPopovers.dispose();
    this.unbindSessionKeyListener();
  }
  bindSessionKeyListener() {
    if (this.sessionKeyListenerBound) {
      return;
    }
    this.ownerWindow.addEventListener("keydown", this.handleSessionKeyDown, { capture: true });
    this.ownerWindow.addEventListener("keyup", this.handleSessionKeyUp);
    this.ownerWindow.addEventListener("blur", this.handleSessionWindowBlur);
    this.sessionKeyListenerBound = true;
  }
  unbindSessionKeyListener() {
    if (!this.sessionKeyListenerBound) {
      return;
    }
    this.ownerWindow.removeEventListener("keydown", this.handleSessionKeyDown, { capture: true });
    this.ownerWindow.removeEventListener("keyup", this.handleSessionKeyUp);
    this.ownerWindow.removeEventListener("blur", this.handleSessionWindowBlur);
    this.keyboardNudgeHistoryOpen = false;
    this.sessionKeyListenerBound = false;
  }
  toggleAnnotationMode() {
    this.annotationMode = !this.annotationMode;
    if (!this.annotationMode) {
      this.finishSessionInlineTextEditor(true);
      this.flushPendingCommittedPageRedraws();
    }
    if (this.annotationMode && this.currentTool === "select") {
      this.setActiveTool("pen");
    }
    this.applyOverlayMode();
    this.refreshToolbar();
    this.syncPages();
    this.forceRedrawVisibleAnnotations();
    this.scheduleLayoutRefresh();
    this.refreshStatus(this.annotationMode ? "Annotation mode enabled" : "Annotation mode disabled");
  }
  async copyCurrentPageLink() {
    this.syncCurrentPageForPageAction();
    await this.copyPageLink(this.currentPage);
  }
  async copyPageLink(pageNumber) {
    if (!this.file) {
      new import_obsidian6.Notice("Open a PDF first.");
      return;
    }
    const link = this.buildPageLink(pageNumber);
    try {
      await writeClipboardText(link);
      new import_obsidian6.Notice(`Copied page ${pageNumber} link.`);
      this.refreshStatus(`Copied ${link}`);
    } catch (error) {
      console.error("freedraw-pdf: failed to copy link", error);
      new import_obsidian6.Notice(`Copy failed. Link: ${link}`);
    }
  }
  async copyCurrentPageEmbedBlock() {
    if (!this.file) {
      new import_obsidian6.Notice("Open a PDF first.");
      return;
    }
    this.syncCurrentPageForPageAction();
    await this.plugin.copyAnnotatedPdfEmbedBlock(this.file, this.currentPage);
    this.refreshStatus(`Copied annotated embed for page ${this.currentPage}`);
  }
  async openAnnotationDataJson() {
    var _a2, _b;
    if (!this.file) {
      new import_obsidian6.Notice("Open a PDF first.");
      return;
    }
    await this.flushSave();
    const sidecarPath = (_b = (_a2 = this.annotationLoadInfo) == null ? void 0 : _a2.sidecarPath) != null ? _b : this.store.getSidecarPath(this.file);
    const sidecar = this.plugin.app.vault.getAbstractFileByPath(sidecarPath);
    if (sidecar instanceof import_obsidian6.TFile) {
      await this.plugin.app.workspace.getLeaf(true).openFile(sidecar);
      this.refreshStatus(`Opened ${sidecar.name}`);
      return;
    }
    if (await this.plugin.app.vault.adapter.exists(sidecarPath)) {
      await this.plugin.app.workspace.openLinkText(sidecarPath, "", true);
      this.refreshStatus(`Opened ${sidecarPath}`);
      return;
    }
    new import_obsidian6.Notice("Annotation data JSON does not exist yet.");
  }
  shouldShowRelinkAnnotationDataAction() {
    return !!(this.annotationLoadInfo && (this.annotationLoadInfo.recoveredFromDifferentPath || this.annotationLoadInfo.sourcePathMismatch));
  }
  async relinkAnnotationDataToCurrentPdf() {
    var _a2, _b;
    if (!this.file || !this.annotationDocument) {
      new import_obsidian6.Notice("Open a PDF first.");
      return;
    }
    const previousSidecarPath = (_b = (_a2 = this.annotationLoadInfo) == null ? void 0 : _a2.sidecarPath) != null ? _b : null;
    try {
      const expectedSidecarPath = await this.store.relinkSidecarToFile(this.file, this.annotationDocument, previousSidecarPath);
      this.annotationLoadInfo = {
        document: this.annotationDocument,
        sidecarPath: expectedSidecarPath,
        expectedSidecarPath,
        recoveredFromDifferentPath: false,
        sourcePathMismatch: false,
        sourcePdfPath: this.file.path
      };
      this.isDirty = false;
      this.refreshStatus(`Relinked annotations to ${this.file.name}`);
      new import_obsidian6.Notice("Annotation data relinked to the current PDF.");
      this.plugin.refreshAnnotatedEmbedsForPath(this.file.path);
      if (previousSidecarPath) {
        this.plugin.refreshAnnotatedEmbedsForPath(previousSidecarPath);
      }
    } catch (error) {
      console.error("freedraw-pdf: failed to relink annotation data", error);
      new import_obsidian6.Notice("Could not relink annotation data JSON.");
    }
  }
  async exportCurrentPageSnapshot() {
    this.syncCurrentPageForPageAction();
    return this.exportPageSnapshot(this.currentPage);
  }
  insertPhotoOnCurrentPage() {
    if (!this.annotationDocument) {
      new import_obsidian6.Notice("Open an annotated PDF first.");
      return;
    }
    this.syncCurrentPageForPageAction();
    new ImageInsertModal(this.plugin.app, (file) => {
      void this.insertPhotoFileOnCurrentPage(file);
    }).open();
  }
  async insertPhotoFileOnCurrentPage(file, placementPoint) {
    if (!this.annotationDocument) {
      new import_obsidian6.Notice("Open an annotated PDF first.");
      return;
    }
    try {
      const dataUrl = await this.readFileAsDataUrl(file);
      await this.insertImageDataUrlOnCurrentPage(dataUrl, file.name, placementPoint);
    } catch (error) {
      console.error("freedraw-pdf: failed to insert photo", error);
      new import_obsidian6.Notice("Could not insert the selected image.");
    }
  }
  async insertImageDataUrlOnCurrentPage(dataUrl, name, placementPoint) {
    var _a2;
    if (!this.annotationDocument) {
      new import_obsidian6.Notice("Open an annotated PDF first.");
      return;
    }
    try {
      const dimensions = await this.getImageDataUrlDimensions(dataUrl);
      const surface = this.pageSurfaces.get(this.currentPage);
      const pageAspect = surface && surface.lastWidth > 0 && surface.lastHeight > 0 ? surface.lastWidth / surface.lastHeight : 0.72;
      const imageAspect = dimensions.width / Math.max(1, dimensions.height);
      const widthScale = 0.38;
      const heightScale = Math.min(0.42, Math.max(0.08, widthScale / imageAspect * pageAspect));
      const point = (_a2 = placementPoint != null ? placementPoint : this.getRecentPdfPastePoint(this.currentPage)) != null ? _a2 : { x: 0.5, y: 0.5, pressure: 0.5 };
      const imageItem = {
        id: generateId("image"),
        page: this.currentPage,
        name,
        dataUrl,
        x: clamp2(point.x - widthScale / 2, 0.02, 0.98 - widthScale),
        y: clamp2(point.y - heightScale / 2, 0.02, 0.98 - heightScale),
        widthScale,
        heightScale,
        zIndex: this.getNextPageZIndex(this.currentPage),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.pushHistory();
      if (!Array.isArray(this.annotationDocument.imageItems)) {
        this.annotationDocument.imageItems = [];
      }
      this.annotationDocument.imageItems.push(imageItem);
      this.toolState.setActiveTool("select");
      this.selectedTarget = { kind: "image", id: imageItem.id, page: imageItem.page };
      this.selectedTargets = [this.selectedTarget];
      this.markDirtyAndRedraw(`Inserted ${name}`);
    } catch (error) {
      console.error("freedraw-pdf: failed to insert photo", error);
      new import_obsidian6.Notice("Could not insert the selected image.");
    }
  }
  readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Could not read image file."));
      reader.onerror = () => {
        var _a2;
        return reject((_a2 = reader.error) != null ? _a2 : new Error("Could not read image file."));
      };
      reader.readAsDataURL(file);
    });
  }
  getImageDataUrlDimensions(dataUrl) {
    if (!isEmbeddedImageDataUrl(dataUrl)) {
      return Promise.reject(new Error("Image annotations must contain embedded image data."));
    }
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve({ width: image.naturalWidth || 1, height: image.naturalHeight || 1 });
      image.onerror = () => reject(new Error("Could not load selected image."));
      image.src = dataUrl;
    });
  }
  async exportAnnotatedMixedDocumentPdf() {
    if (!this.file || !this.annotationDocument) {
      new import_obsidian6.Notice("Open a PDF first.");
      return null;
    }
    if (this.realPdfPageCount <= 0) {
      this.syncPages();
    }
    const entries = this.getMixedPageEntries();
    if (entries.length === 0) {
      new import_obsidian6.Notice("No pages available to export.");
      return null;
    }
    await this.flushSave();
    this.refreshStatus("Exporting annotated mixed PDF...", 6e3);
    const outputFile = await exportAnnotatedMixedDocumentPdf(
      this.plugin.app,
      this.file,
      this.annotationDocument,
      entries,
      this.realPdfPageCount
    );
    if (outputFile) {
      this.refreshStatus(`Exported ${outputFile.name}`);
      await this.plugin.openPdfFileAtPage(outputFile, 1);
    }
    return outputFile;
  }
  async materializeNativeMixedWorkingPdf() {
    if (!this.file || !this.annotationDocument) {
      new import_obsidian6.Notice("Open a PDF first.");
      return null;
    }
    if (this.realPdfPageCount <= 0) {
      this.syncPages();
    }
    const entries = this.getMixedPageEntries();
    if (entries.length === 0) {
      new import_obsidian6.Notice("No pages available to materialize.");
      return null;
    }
    await this.flushSave();
    this.refreshStatus("Creating native mixed working PDF...", 8e3);
    return this.createNativeWorkingPdfFromDocument(this.annotationDocument, entries, this.currentPage);
  }
  openNativeTemplatePageInsertModal(position) {
    if (!this.file || !this.annotationDocument) {
      new import_obsidian6.Notice("Open a PDF first.");
      return;
    }
    if (this.realPdfPageCount <= 0) {
      this.syncPages();
    }
    this.syncCurrentPageForPageAction();
    const location = this.getNativeInsertPageLocation(position);
    this.openNativeTemplatePageInsertModalAtLocation(position, location);
  }
  openTemplatePageInsertModal(position) {
    if (!this.file || !this.annotationDocument) {
      new import_obsidian6.Notice("Open a PDF first.");
      return;
    }
    if (this.realPdfPageCount <= 0) {
      this.syncPages();
    }
    this.syncCurrentPageForPageAction();
    const location = this.getNativeInsertPageLocation(position);
    this.openTemplatePageInsertModalAtLocation(position, location);
  }
  openNativeTemplatePageInsertModalAtLocation(position, location, defaultsOverride) {
    if (!this.file || !this.annotationDocument) {
      new import_obsidian6.Notice("Open a PDF first.");
      return;
    }
    const defaults = defaultsOverride != null ? defaultsOverride : this.getNativeInsertPageDefaults(position, location);
    new NativeInsertPageModal(
      this.plugin.app,
      position,
      location.anchorLabel,
      defaults,
      (options) => {
        void this.insertNativeTemplatePageAtLocation(location, options);
      }
    ).open();
  }
  openTemplatePageInsertModalAtLocation(position, location, defaultsOverride) {
    if (!this.file || !this.annotationDocument) {
      new import_obsidian6.Notice("Open a PDF first.");
      return;
    }
    const defaults = defaultsOverride != null ? defaultsOverride : this.getNativeInsertPageDefaults(position, location);
    new NativeInsertPageModal(
      this.plugin.app,
      position,
      location.anchorLabel,
      defaults,
      (options) => {
        this.insertTemplatePageAtLocation(location, options);
      },
      "temporary"
    ).open();
  }
  async insertNativeTemplatePageAfterCurrent(options) {
    return this.insertNativeTemplatePageNearCurrent("after", options);
  }
  async insertNativeTemplatePageBeforeCurrent(options) {
    return this.insertNativeTemplatePageNearCurrent("before", options);
  }
  getNativeInsertPageDefaults(position, location = this.getNativeInsertPageLocation(position)) {
    var _a2, _b, _c;
    const currentSyntheticPage = this.getCurrentSyntheticPage();
    return {
      title: `Inserted page ${position} ${location.anchorLabel}`,
      template: (_a2 = currentSyntheticPage == null ? void 0 : currentSyntheticPage.template) != null ? _a2 : "ruled",
      pageSize: (_b = currentSyntheticPage == null ? void 0 : currentSyntheticPage.pageSize) != null ? _b : "a4",
      paperColor: (_c = currentSyntheticPage == null ? void 0 : currentSyntheticPage.paperColor) != null ? _c : "#fffdf7"
    };
  }
  getNativeInsertPageLocation(position) {
    const currentSyntheticIndex = this.getSyntheticPageIndex();
    if (currentSyntheticIndex >= 0) {
      const currentSyntheticPage = this.getAppendedPages()[currentSyntheticIndex];
      const anchor2 = this.getSyntheticPageInsertAfterPdfPage(currentSyntheticPage);
      return {
        insertIndex: position === "before" ? currentSyntheticIndex : currentSyntheticIndex + 1,
        anchor: anchor2,
        anchorLabel: currentSyntheticPage.title.trim() || `added page ${this.currentPage}`
      };
    }
    if (position === "before") {
      const anchor2 = clamp2(this.currentPage - 1, 0, Math.max(0, this.realPdfPageCount));
      return {
        insertIndex: this.findSyntheticInsertIndexAfterPdfPage(anchor2),
        anchor: anchor2,
        anchorLabel: `PDF page ${this.currentPage}`
      };
    }
    const anchor = clamp2(this.currentPage, 0, Math.max(0, this.realPdfPageCount));
    return {
      insertIndex: this.findFirstSyntheticInsertIndexAfterPdfPage(anchor),
      anchor,
      anchorLabel: `PDF page ${this.currentPage}`
    };
  }
  async insertNativeTemplatePageNearCurrent(position, options) {
    return this.insertNativeTemplatePageAtLocation(this.getNativeInsertPageLocation(position), options != null ? options : this.getNativeInsertPageDefaults(position));
  }
  async insertNativeTemplatePageAtLocation(location, options) {
    var _a2, _b, _c, _d, _e, _f;
    if (!this.file || !this.annotationDocument) {
      new import_obsidian6.Notice("Open a PDF first.");
      return null;
    }
    if (this.realPdfPageCount <= 0) {
      this.syncPages();
    }
    const sourceDocument = cloneDocument(this.annotationDocument);
    if (!Array.isArray(sourceDocument.appendedPages)) {
      sourceDocument.appendedPages = [];
    }
    const fallbackOptions = {
      title: `Inserted page after ${location.anchorLabel}`,
      template: (_b = (_a2 = this.getCurrentSyntheticPage()) == null ? void 0 : _a2.template) != null ? _b : "ruled",
      pageSize: (_d = (_c = this.getCurrentSyntheticPage()) == null ? void 0 : _c.pageSize) != null ? _d : "a4",
      paperColor: (_f = (_e = this.getCurrentSyntheticPage()) == null ? void 0 : _e.paperColor) != null ? _f : "#fffdf7"
    };
    const pageOptions = options != null ? options : fallbackOptions;
    const insertIndex = clamp2(location.insertIndex, 0, sourceDocument.appendedPages.length);
    const templatePage = createTemplateNotebookPage(
      pageOptions.title.trim() || fallbackOptions.title,
      pageOptions.template,
      pageOptions.pageSize,
      pageOptions.paperColor
    );
    templatePage.insertAfterPdfPage = location.anchor;
    const insertedPageNumber = insertSyntheticPage(
      sourceDocument,
      this.realPdfPageCount,
      insertIndex,
      templatePage
    );
    const entries = this.getMixedPageEntries(sourceDocument);
    await this.flushSave();
    this.refreshStatus("Creating native PDF with inserted page...", 8e3);
    return this.createNativeWorkingPdfFromDocument(sourceDocument, entries, insertedPageNumber);
  }
  async createNativeWorkingPdfFromDocument(document, entries, targetPage) {
    var _a2, _b;
    if (!this.file) {
      new import_obsidian6.Notice("Open a PDF first.");
      return null;
    }
    const result = await createNativeMixedWorkingPdf(
      this.plugin.app,
      this.file,
      document,
      entries,
      this.realPdfPageCount
    );
    if (!result) {
      return null;
    }
    const nextDocument = cloneDocument(document);
    const activePageNumbers = new Set(entries.map((entry) => entry.pageNumber));
    const mapPage = (pageNumber) => {
      var _a3;
      return (_a3 = result.pageMap.get(pageNumber)) != null ? _a3 : pageNumber;
    };
    nextDocument.strokes = nextDocument.strokes.filter((stroke) => activePageNumbers.has(stroke.page)).map((stroke) => ({ ...stroke, page: mapPage(stroke.page) }));
    nextDocument.eraserPaths = ((_a2 = nextDocument.eraserPaths) != null ? _a2 : []).filter((eraserPath) => activePageNumbers.has(eraserPath.page)).map((eraserPath) => ({ ...eraserPath, page: mapPage(eraserPath.page) }));
    nextDocument.textItems = nextDocument.textItems.filter((item) => activePageNumbers.has(item.page)).map((item) => ({ ...item, page: mapPage(item.page) }));
    nextDocument.shapes = nextDocument.shapes.filter((shape) => activePageNumbers.has(shape.page)).map((shape) => ({ ...shape, page: mapPage(shape.page) }));
    nextDocument.imageItems = ((_b = nextDocument.imageItems) != null ? _b : []).filter((image) => activePageNumbers.has(image.page)).map((image) => ({ ...image, page: mapPage(image.page) }));
    nextDocument.appendedPages = [];
    nextDocument.pdfPageTemplates = [];
    nextDocument.nativePageTemplatesEditable = false;
    nextDocument.deletedPdfPages = [];
    nextDocument.permanentlyDeletedPdfPages = [];
    nextDocument.removedPages = [];
    nextDocument.sourceFile = result.file.path;
    nextDocument.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    await this.store.save(result.file, nextDocument);
    const mappedTargetPage = mapPage(targetPage);
    this.refreshStatus(`Created ${result.file.name}`);
    await this.plugin.openPdfFileAtPage(result.file, mappedTargetPage);
    return result.file;
  }
  async exportPageSnapshot(pageNumber) {
    var _a2, _b;
    if (!this.file) {
      new import_obsidian6.Notice("Open a PDF first.");
      return null;
    }
    const surface = this.pageSurfaces.get(pageNumber);
    if (!surface) {
      new import_obsidian6.Notice("That page is not ready to export yet.");
      return null;
    }
    const pdfCanvas = surface.hostEl.querySelector("canvas");
    const syntheticPage = this.getSyntheticPageIndex(pageNumber) >= 0 ? (_a2 = this.getAppendedPages()[this.getSyntheticPageIndex(pageNumber)]) != null ? _a2 : null : null;
    if (!isHtmlCanvasElement(pdfCanvas) && !syntheticPage) {
      new import_obsidian6.Notice("Could not find the native PDF page canvas for export.");
      return null;
    }
    const exportCanvas = createEl("canvas");
    const ratio = this.ownerWindow.devicePixelRatio || 1;
    const exportWidth = isHtmlCanvasElement(pdfCanvas) ? pdfCanvas.width : Math.max(1, Math.floor(surface.lastWidth * ratio));
    const exportHeight = isHtmlCanvasElement(pdfCanvas) ? pdfCanvas.height : Math.max(1, Math.floor(surface.lastHeight * ratio));
    exportCanvas.width = exportWidth;
    exportCanvas.height = exportHeight;
    const context = exportCanvas.getContext("2d");
    if (!context) {
      new import_obsidian6.Notice("Could not create export canvas.");
      return null;
    }
    if (isHtmlCanvasElement(pdfCanvas)) {
      context.drawImage(pdfCanvas, 0, 0);
    } else if (syntheticPage) {
      this.drawSyntheticSnapshotBackground(context, exportWidth, exportHeight, syntheticPage);
    }
    context.drawImage(surface.overlayEl, 0, 0, exportCanvas.width, exportCanvas.height);
    const folderPrefix = ((_b = this.file.parent) == null ? void 0 : _b.path) ? `${this.file.parent.path}/` : "";
    const baseName = `${getBaseName(this.file)} page ${pageNumber} annotated`;
    let imagePath = `${folderPrefix}${baseName}.png`;
    let counter = 2;
    while (this.plugin.app.vault.getAbstractFileByPath(imagePath)) {
      imagePath = `${folderPrefix}${baseName} ${counter}.png`;
      counter += 1;
    }
    const buffer = dataUrlToArrayBuffer(exportCanvas.toDataURL("image/png"));
    const imageFile = await this.plugin.app.vault.createBinary(imagePath, buffer);
    this.refreshStatus(`Exported ${imageFile.name}`);
    new import_obsidian6.Notice(`Exported ${imageFile.name}`);
    return imageFile;
  }
  drawSyntheticSnapshotBackground(context, width, height, page) {
    drawTemplatePageBackground(context, width, height, page);
  }
  async exportSelectionSnapshot() {
    var _a2;
    const region = this.getSelectionRegion();
    if (!region) {
      new import_obsidian6.Notice("Drag a box region first.");
      return null;
    }
    const selectionPage = region.page;
    const bounds = region.rect;
    const surface = this.pageSurfaces.get(selectionPage);
    if (!surface) {
      new import_obsidian6.Notice("Selection snapshot is not ready yet.");
      return null;
    }
    const pdfCanvas = surface.hostEl.querySelector("canvas");
    if (!isHtmlCanvasElement(pdfCanvas)) {
      new import_obsidian6.Notice("Could not find the native PDF page canvas for selection export.");
      return null;
    }
    const cropLeft = Math.max(0, Math.floor(bounds.left * pdfCanvas.width) - 20);
    const cropTop = Math.max(0, Math.floor(bounds.top * pdfCanvas.height) - 20);
    const cropRight = Math.min(pdfCanvas.width, Math.ceil(bounds.right * pdfCanvas.width) + 20);
    const cropBottom = Math.min(pdfCanvas.height, Math.ceil(bounds.bottom * pdfCanvas.height) + 20);
    const cropWidth = Math.max(1, cropRight - cropLeft);
    const cropHeight = Math.max(1, cropBottom - cropTop);
    const exportCanvas = createEl("canvas");
    exportCanvas.width = cropWidth;
    exportCanvas.height = cropHeight;
    const context = exportCanvas.getContext("2d");
    if (!context) {
      new import_obsidian6.Notice("Could not create selection export canvas.");
      return null;
    }
    context.drawImage(pdfCanvas, cropLeft, cropTop, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    context.drawImage(surface.overlayEl, cropLeft, cropTop, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
    const file = this.file;
    if (!file) {
      new import_obsidian6.Notice("Open a PDF before exporting a selection snapshot.");
      return null;
    }
    const folderPrefix = ((_a2 = file.parent) == null ? void 0 : _a2.path) ? `${file.parent.path}/` : "";
    const baseName = `${getBaseName(file)} page ${selectionPage} selection`;
    let imagePath = `${folderPrefix}${baseName}.png`;
    let counter = 2;
    while (this.plugin.app.vault.getAbstractFileByPath(imagePath)) {
      imagePath = `${folderPrefix}${baseName} ${counter}.png`;
      counter += 1;
    }
    const buffer = dataUrlToArrayBuffer(exportCanvas.toDataURL("image/png"));
    const imageFile = await this.plugin.app.vault.createBinary(imagePath, buffer);
    this.refreshStatus(`Exported ${imageFile.name}`);
    new import_obsidian6.Notice(`Exported ${imageFile.name}`);
    return imageFile;
  }
  async copySelectionRegionReference() {
    const reference = this.buildSelectionRegionReference();
    if (!reference) {
      new import_obsidian6.Notice("Drag a box region on one page first.");
      return;
    }
    try {
      await this.plugin.writeClipboardText(reference);
      new import_obsidian6.Notice("Copied selection region reference.");
      this.refreshStatus(`Copied ${reference}`);
    } catch (error) {
      console.error("freedraw-pdf: failed to copy selection region reference", error);
      new import_obsidian6.Notice(`Copy failed. Region: ${reference}`);
    }
  }
  async copySelectionAnnotatedEmbedBlock() {
    const region = this.getSelectionRegion();
    if (!region) {
      new import_obsidian6.Notice("Drag a box region on one page first.");
      return;
    }
    await this.plugin.copyAnnotatedPdfEmbedBlock(region.file, region.page, region.rect);
    this.refreshStatus(`Copied region embed for page ${region.page}`);
  }
  getActiveRegionEmbedSource() {
    return this.getSelectionRegion();
  }
  copySelectedTargets() {
    var _a2, _b, _c;
    if (!this.annotationDocument || this.selectedTargets.length === 0) {
      this.refreshStatus("Nothing selected");
      return;
    }
    const strokeIds = new Set(this.selectedTargets.filter((target) => target.kind === "stroke").map((target) => target.id));
    const textIds = new Set(this.selectedTargets.filter((target) => target.kind === "text").map((target) => target.id));
    const shapeIds = new Set(this.selectedTargets.filter((target) => target.kind === "shape").map((target) => target.id));
    const imageIds = new Set(this.selectedTargets.filter((target) => target.kind === "image").map((target) => target.id));
    const payload = {
      strokes: this.annotationDocument.strokes.filter((stroke) => strokeIds.has(stroke.id)).map((stroke) => cloneDocument({
        version: 4,
        sourceFile: "",
        updatedAt: "",
        strokes: [stroke],
        textItems: [],
        shapes: []
      }).strokes[0]),
      textItems: this.annotationDocument.textItems.filter((item) => textIds.has(item.id)).map((item) => cloneDocument({
        version: 4,
        sourceFile: "",
        updatedAt: "",
        strokes: [],
        textItems: [item],
        shapes: []
      }).textItems[0]),
      shapes: this.annotationDocument.shapes.filter((shape) => shapeIds.has(shape.id)).map((shape) => cloneDocument({
        version: 4,
        sourceFile: "",
        updatedAt: "",
        strokes: [],
        textItems: [],
        shapes: [shape]
      }).shapes[0]),
      imageItems: ((_a2 = this.annotationDocument.imageItems) != null ? _a2 : []).filter((image) => imageIds.has(image.id)).map((image) => JSON.parse(JSON.stringify(image)))
    };
    this.plugin.setClipboard(payload);
    const total = payload.strokes.length + payload.textItems.length + payload.shapes.length + ((_c = (_b = payload.imageItems) == null ? void 0 : _b.length) != null ? _c : 0);
    this.refreshStatus(total === 1 ? "Copied selection" : `Copied ${total} selections`);
  }
  cutSelectedTargets() {
    var _a2, _b, _c, _d;
    if (!this.annotationDocument || this.selectedTargets.length === 0) {
      this.refreshStatus("Nothing selected");
      return;
    }
    const strokeIds = new Set(this.selectedTargets.filter((target) => target.kind === "stroke").map((target) => target.id));
    const textIds = new Set(this.selectedTargets.filter((target) => target.kind === "text").map((target) => target.id));
    const shapeIds = new Set(this.selectedTargets.filter((target) => target.kind === "shape").map((target) => target.id));
    const imageIds = new Set(this.selectedTargets.filter((target) => target.kind === "image").map((target) => target.id));
    const payload = {
      strokes: this.annotationDocument.strokes.filter((stroke) => strokeIds.has(stroke.id)).map((stroke) => cloneDocument({
        version: 4,
        sourceFile: "",
        updatedAt: "",
        strokes: [stroke],
        textItems: [],
        shapes: []
      }).strokes[0]),
      textItems: this.annotationDocument.textItems.filter((item) => textIds.has(item.id)).map((item) => cloneDocument({
        version: 4,
        sourceFile: "",
        updatedAt: "",
        strokes: [],
        textItems: [item],
        shapes: []
      }).textItems[0]),
      shapes: this.annotationDocument.shapes.filter((shape) => shapeIds.has(shape.id)).map((shape) => cloneDocument({
        version: 4,
        sourceFile: "",
        updatedAt: "",
        strokes: [],
        textItems: [],
        shapes: [shape]
      }).shapes[0]),
      imageItems: ((_a2 = this.annotationDocument.imageItems) != null ? _a2 : []).filter((image) => imageIds.has(image.id)).map((image) => JSON.parse(JSON.stringify(image)))
    };
    const total = payload.strokes.length + payload.textItems.length + payload.shapes.length + ((_c = (_b = payload.imageItems) == null ? void 0 : _b.length) != null ? _c : 0);
    if (total === 0) {
      this.refreshStatus("Nothing selected");
      return;
    }
    this.plugin.setClipboard(payload);
    this.pushHistory();
    this.annotationDocument.strokes = this.annotationDocument.strokes.filter((stroke) => !strokeIds.has(stroke.id));
    this.annotationDocument.textItems = this.annotationDocument.textItems.filter((item) => !textIds.has(item.id));
    this.annotationDocument.shapes = this.annotationDocument.shapes.filter((shape) => !shapeIds.has(shape.id));
    this.annotationDocument.imageItems = ((_d = this.annotationDocument.imageItems) != null ? _d : []).filter((image) => !imageIds.has(image.id));
    this.selectedTarget = null;
    this.selectedTargets = [];
    this.lastSelectionRegion = null;
    this.markDirtyAndRedraw(total === 1 ? "Cut selection" : `Cut ${total} selections`);
    this.refreshToolbar();
  }
  pasteClipboard(pasteInPlace = false) {
    var _a2, _b;
    if (!this.annotationDocument) {
      this.refreshStatus("Open a PDF first.");
      return;
    }
    const clipboard = this.plugin.getClipboard();
    if (!clipboard) {
      this.refreshStatus("Clipboard is empty");
      return;
    }
    const pastePoint = pasteInPlace ? null : this.getRecentPdfPastePoint(this.currentPage);
    const pasteOffset = pasteInPlace ? { x: 0, y: 0 } : getClipboardPasteOffset(clipboard, pastePoint);
    const nextSelections = [];
    this.pushHistory();
    for (const stroke of clipboard.strokes) {
      const nextStroke = {
        ...stroke,
        id: generateId("stroke"),
        page: this.currentPage,
        points: stroke.points.map((point) => ({
          ...point,
          x: clamp2(point.x + pasteOffset.x, 0, 1),
          y: clamp2(point.y + pasteOffset.y, 0, 1)
        })),
        zIndex: this.getNextPageZIndex(this.currentPage),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.annotationDocument.strokes.push(nextStroke);
      nextSelections.push({ kind: "stroke", id: nextStroke.id, page: nextStroke.page });
    }
    for (const item of clipboard.textItems) {
      const nextItem = {
        ...item,
        id: generateId("text"),
        page: this.currentPage,
        x: clamp2(item.x + pasteOffset.x, 0, 1),
        y: clamp2(item.y + pasteOffset.y, 0, 1),
        zIndex: this.getNextPageZIndex(this.currentPage),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.annotationDocument.textItems.push(nextItem);
      nextSelections.push({ kind: "text", id: nextItem.id, page: nextItem.page });
    }
    for (const shape of clipboard.shapes) {
      const nextShape = {
        ...shape,
        id: generateId("shape"),
        page: this.currentPage,
        start: {
          ...shape.start,
          x: clamp2(shape.start.x + pasteOffset.x, 0, 1),
          y: clamp2(shape.start.y + pasteOffset.y, 0, 1)
        },
        end: {
          ...shape.end,
          x: clamp2(shape.end.x + pasteOffset.x, 0, 1),
          y: clamp2(shape.end.y + pasteOffset.y, 0, 1)
        },
        zIndex: this.getNextPageZIndex(this.currentPage),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.annotationDocument.shapes.push(nextShape);
      nextSelections.push({ kind: "shape", id: nextShape.id, page: nextShape.page });
    }
    for (const image of (_a2 = clipboard.imageItems) != null ? _a2 : []) {
      const nextImage = {
        ...image,
        id: generateId("image"),
        page: this.currentPage,
        x: clamp2(image.x + pasteOffset.x, 0, Math.max(0, 1 - image.widthScale)),
        y: clamp2(image.y + pasteOffset.y, 0, Math.max(0, 1 - image.heightScale)),
        zIndex: this.getNextPageZIndex(this.currentPage),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (!Array.isArray(this.annotationDocument.imageItems)) {
        this.annotationDocument.imageItems = [];
      }
      this.annotationDocument.imageItems.push(nextImage);
      nextSelections.push({ kind: "image", id: nextImage.id, page: nextImage.page });
    }
    if (nextSelections.length === 0) {
      if (this.undoStack.length > 0) {
        this.undoStack.pop();
      }
      this.refreshStatus("Clipboard is empty");
      return;
    }
    this.selectedTargets = nextSelections;
    this.selectedTarget = (_b = nextSelections[0]) != null ? _b : null;
    this.lastSelectionRegion = null;
    this.markDirtyAndRedraw(nextSelections.length === 1 ? "Pasted selection" : `Pasted ${nextSelections.length} selections`);
    this.refreshToolbar();
  }
  getRecentPdfPastePoint(pageNumber) {
    const surface = this.pageSurfaces.get(pageNumber);
    if (!surface || !this.lastPdfPoint) {
      return null;
    }
    if (performance.now() - this.lastPdfPointTime > 8e3) {
      return null;
    }
    const rect = surface.overlayEl.getBoundingClientRect();
    if (this.lastPdfPoint.clientX < rect.left || this.lastPdfPoint.clientX > rect.right || this.lastPdfPoint.clientY < rect.top || this.lastPdfPoint.clientY > rect.bottom) {
      return null;
    }
    return {
      x: clamp2((this.lastPdfPoint.clientX - rect.left) / Math.max(rect.width, 1), 0, 1),
      y: clamp2((this.lastPdfPoint.clientY - rect.top) / Math.max(rect.height, 1), 0, 1),
      pressure: 0.5
    };
  }
  deleteSelectedTargets() {
    var _a2;
    if (!this.annotationDocument || this.selectedTargets.length === 0) {
      this.refreshStatus("Nothing selected");
      return;
    }
    this.pushHistory();
    const selectedStrokeIds = new Set(this.selectedTargets.filter((target) => target.kind === "stroke").map((target) => target.id));
    const selectedTextIds = new Set(this.selectedTargets.filter((target) => target.kind === "text").map((target) => target.id));
    const selectedShapeIds = new Set(this.selectedTargets.filter((target) => target.kind === "shape").map((target) => target.id));
    const selectedImageIds = new Set(this.selectedTargets.filter((target) => target.kind === "image").map((target) => target.id));
    const removedCount = selectedStrokeIds.size + selectedTextIds.size + selectedShapeIds.size + selectedImageIds.size;
    this.annotationDocument.strokes = this.annotationDocument.strokes.filter((stroke) => !selectedStrokeIds.has(stroke.id));
    this.annotationDocument.textItems = this.annotationDocument.textItems.filter((item) => !selectedTextIds.has(item.id));
    this.annotationDocument.shapes = this.annotationDocument.shapes.filter((shape) => !selectedShapeIds.has(shape.id));
    this.annotationDocument.imageItems = ((_a2 = this.annotationDocument.imageItems) != null ? _a2 : []).filter((image) => !selectedImageIds.has(image.id));
    this.selectedTarget = null;
    this.selectedTargets = [];
    this.lastSelectionRegion = null;
    this.markDirtyAndRedraw(removedCount === 1 ? "Deleted selection" : `Deleted ${removedCount} selections`);
    this.refreshToolbar();
  }
  selectAllCurrentPageAnnotations() {
    var _a2;
    if (!this.annotationDocument) {
      return;
    }
    const bucket = this.getPageAnnotationBucket(this.currentPage);
    const nextSelections = [
      ...bucket.strokes.map((stroke) => ({ kind: "stroke", id: stroke.id, page: stroke.page })),
      ...bucket.textItems.map((item) => ({ kind: "text", id: item.id, page: item.page })),
      ...bucket.shapes.map((shape) => ({ kind: "shape", id: shape.id, page: shape.page })),
      ...bucket.imageItems.map((image) => ({ kind: "image", id: image.id, page: image.page }))
    ];
    this.selectedTargets = nextSelections;
    this.selectedTarget = (_a2 = nextSelections[0]) != null ? _a2 : null;
    this.activeResizeHandle = null;
    this.dragAnchor = null;
    this.drawPageAnnotations(this.currentPage);
    this.refreshToolbar();
    this.refreshStatus(nextSelections.length === 0 ? "No annotations on current page" : `Selected ${nextSelections.length} annotations on page ${this.currentPage}`);
  }
  clearSelection(message = "Selection cleared") {
    if (this.selectedTargets.length === 0 && !this.selectedTarget && !this.lastSelectionRegion) {
      return;
    }
    const pages = new Set(this.selectedTargets.map((target) => target.page));
    if (this.lastSelectionRegion) {
      pages.add(this.lastSelectionRegion.page);
    }
    this.selectedTarget = null;
    this.selectedTargets = [];
    this.lastSelectionRegion = null;
    this.activeResizeHandle = null;
    this.dragAnchor = null;
    if (pages.size > 0) {
      for (const page of pages) {
        this.drawPageAnnotations(page);
      }
    } else {
      this.drawAllAnnotations();
    }
    this.refreshToolbar();
    this.refreshStatus(message);
  }
  clearRegion() {
    if (!this.lastSelectionRegion) {
      return;
    }
    const page = this.lastSelectionRegion.page;
    this.lastSelectionRegion = null;
    this.drawPageAnnotations(page);
    this.refreshToolbar();
    this.refreshStatus("Region cleared");
  }
  cancelActiveSessionInteraction() {
    var _a2, _b, _c, _d, _e, _f, _g;
    this.unbindPdfPointerDocumentTracking();
    const hasActiveInteraction = this.currentStroke !== null || this.currentShape !== null || this.currentLasso !== null || this.dragAnchor !== null || this.activeResizeHandle !== null || this.erasingSession;
    if (!hasActiveInteraction) {
      return false;
    }
    const shouldRestoreHistory = this.erasingSession || this.currentTool === "select" && this.dragAnchor !== null && this.currentLasso === null;
    const previousEntry = shouldRestoreHistory ? this.undoStack.pop() : null;
    const affectedPage = (_g = (_f = (_d = (_b = this.pointerPage) != null ? _b : (_a2 = this.currentStroke) == null ? void 0 : _a2.page) != null ? _d : (_c = this.currentShape) == null ? void 0 : _c.page) != null ? _f : (_e = this.currentLasso) == null ? void 0 : _e.page) != null ? _g : this.currentPage;
    this.currentStroke = null;
    this.currentShape = null;
    this.currentLasso = null;
    this.dragAnchor = null;
    this.activeResizeHandle = null;
    this.dragMoved = false;
    this.erasingSession = false;
    this.lastEraserPoint = null;
    this.eraserSessionPoints = [];
    this.objectErasePreviewTargets.clear();
    this.pointerPage = null;
    if ((previousEntry == null ? void 0 : previousEntry.kind) === "document") {
      this.store.inheritBaseline(this.annotationDocument, previousEntry.document);
      this.annotationDocument = previousEntry.document;
      this.nextPageZIndexCache.clear();
      this.invalidateAnnotationPageCache();
      this.documentRevision += 1;
      this.isDirty = true;
      this.scheduleSave();
      this.drawAllAnnotations();
    } else {
      if (previousEntry) {
        this.undoStack.push(previousEntry);
      }
      if (isShapeTool(this.currentTool) && this.undoStack.length > 0) {
        this.undoStack.pop();
      }
      this.drawPageAnnotations(affectedPage);
    }
    this.refreshStatus("Cancelled interaction");
    this.refreshToolPreviewFromLastPointer(false);
    return true;
  }
  nudgeSelectedTargets(deltaX, deltaY, pushHistory = true) {
    if (!this.annotationDocument || this.selectedTargets.length === 0) {
      return;
    }
    if (pushHistory) {
      this.pushHistory();
    }
    const pages = new Set(this.selectedTargets.map((target) => target.page));
    this.moveSelectedTargetsWithinPage(this.selectedTargets, deltaX, deltaY);
    this.invalidateAnnotationPageCache();
    this.documentRevision += 1;
    this.isDirty = true;
    this.scheduleSave();
    for (const page of pages) {
      this.drawPageAnnotations(page);
    }
    this.refreshStatus(this.selectedTargets.length === 1 ? "Selection nudged" : `Nudged ${this.selectedTargets.length} selections`);
  }
  reorderSelectedTargets(direction) {
    if (!this.annotationDocument || this.selectedTargets.length === 0) {
      this.refreshStatus("Nothing selected");
      return;
    }
    const selectedByPage = /* @__PURE__ */ new Map();
    for (const target of this.selectedTargets) {
      let keys = selectedByPage.get(target.page);
      if (!keys) {
        keys = /* @__PURE__ */ new Set();
        selectedByPage.set(target.page, keys);
      }
      keys.add(`${target.kind}:${target.id}`);
    }
    this.pushHistory();
    let changed = false;
    for (const [pageNumber, selectedKeys] of selectedByPage.entries()) {
      const bucket = this.getPageAnnotationBucket(pageNumber);
      const renderables = getAnnotationRenderables(bucket.strokes, bucket.textItems, bucket.shapes);
      if (reorderRenderables(renderables, selectedKeys, direction)) {
        changed = true;
      }
    }
    if (!changed) {
      if (this.undoStack.length > 0) {
        this.undoStack.pop();
      }
      this.refreshStatus("Nothing selected");
      return;
    }
    const message = direction === "front" ? "Brought selection to front" : direction === "back" ? "Sent selection to back" : direction === "forward" ? "Brought selection forward" : "Sent selection backward";
    this.markDirtyAndRedraw(message);
    this.refreshToolbar();
  }
  getNextPageZIndex(pageNumber) {
    const cached = this.nextPageZIndexCache.get(pageNumber);
    if (cached !== void 0) {
      this.nextPageZIndexCache.set(pageNumber, cached + 1);
      return cached;
    }
    const bucket = this.getPageAnnotationBucket(pageNumber);
    const renderables = getAnnotationRenderables(bucket.strokes, bucket.textItems, bucket.shapes);
    const imageOrders = bucket.imageItems.map((image) => {
      var _a2;
      return (_a2 = image.zIndex) != null ? _a2 : 0;
    });
    const eraserOrders = bucket.eraserPaths.map((eraserPath) => {
      var _a2;
      return (_a2 = eraserPath.zIndex) != null ? _a2 : 0;
    });
    if (renderables.length === 0 && imageOrders.length === 0 && eraserOrders.length === 0) {
      this.nextPageZIndexCache.set(pageNumber, 1);
      return 0;
    }
    const next = Math.max(...renderables.map((renderable) => getRenderableOrder(renderable)), ...imageOrders, ...eraserOrders) + 1;
    this.nextPageZIndexCache.set(pageNumber, next + 1);
    return next;
  }
  duplicateSelectedTargets() {
    var _a2;
    if (!this.annotationDocument || this.selectedTargets.length === 0) {
      this.refreshStatus("Nothing selected");
      return;
    }
    const offsetX = 0.018;
    const offsetY = 0.018;
    const nextSelections = [];
    this.pushHistory();
    for (const target of this.selectedTargets) {
      if (target.kind === "stroke") {
        const stroke = this.annotationDocument.strokes.find((entry) => entry.id === target.id);
        if (!stroke) {
          continue;
        }
        const nextStroke = {
          ...stroke,
          id: generateId("stroke"),
          points: stroke.points.map((point) => ({
            ...point,
            x: clamp2(point.x + offsetX, 0, 1),
            y: clamp2(point.y + offsetY, 0, 1)
          })),
          zIndex: this.getNextPageZIndex(stroke.page),
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        this.annotationDocument.strokes.push(nextStroke);
        nextSelections.push({ kind: "stroke", id: nextStroke.id, page: nextStroke.page });
        continue;
      }
      if (target.kind === "text") {
        const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
        if (!item) {
          continue;
        }
        const nextItem = {
          ...item,
          id: generateId("text"),
          x: clamp2(item.x + offsetX, 0, 1),
          y: clamp2(item.y + offsetY, 0, 1),
          zIndex: this.getNextPageZIndex(item.page),
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        this.annotationDocument.textItems.push(nextItem);
        nextSelections.push({ kind: "text", id: nextItem.id, page: nextItem.page });
        continue;
      }
      const shape = this.annotationDocument.shapes.find((entry) => entry.id === target.id);
      if (!shape) {
        continue;
      }
      const nextShape = {
        ...shape,
        id: generateId("shape"),
        start: {
          ...shape.start,
          x: clamp2(shape.start.x + offsetX, 0, 1),
          y: clamp2(shape.start.y + offsetY, 0, 1)
        },
        end: {
          ...shape.end,
          x: clamp2(shape.end.x + offsetX, 0, 1),
          y: clamp2(shape.end.y + offsetY, 0, 1)
        },
        zIndex: this.getNextPageZIndex(shape.page),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.annotationDocument.shapes.push(nextShape);
      nextSelections.push({ kind: "shape", id: nextShape.id, page: nextShape.page });
    }
    if (nextSelections.length === 0) {
      if (this.undoStack.length > 0) {
        this.undoStack.pop();
      }
      this.refreshStatus("Nothing duplicated");
      return;
    }
    this.selectedTargets = nextSelections;
    this.selectedTarget = (_a2 = nextSelections[0]) != null ? _a2 : null;
    this.lastSelectionRegion = null;
    this.markDirtyAndRedraw(nextSelections.length === 1 ? "Duplicated selection" : `Duplicated ${nextSelections.length} selections`);
    this.refreshToolbar();
  }
  undo() {
    if (!this.annotationDocument || this.undoStack.length === 0) {
      this.showDrawingNotice("Nothing to undo", 1200);
      this.refreshStatus("Nothing to undo");
      return;
    }
    const entry = this.undoStack.pop();
    if (!entry) {
      return;
    }
    const affectedPage = entry.kind === "stroke-add" ? entry.stroke.page : this.currentPage;
    if (entry.kind === "document") {
      this.redoStack.push({ kind: "document", document: cloneDocument(this.annotationDocument) });
      this.store.inheritBaseline(this.annotationDocument, entry.document);
      this.annotationDocument = entry.document;
      this.nextPageZIndexCache.clear();
    } else {
      const strokeIndex = this.annotationDocument.strokes.findIndex((stroke) => stroke.id === entry.stroke.id);
      if (strokeIndex >= 0) {
        this.annotationDocument.strokes.splice(strokeIndex, 1);
      }
      this.redoStack.push({ kind: "stroke-add", stroke: this.cloneStroke(entry.stroke) });
    }
    this.lastSelectionRegion = null;
    this.invalidateAnnotationPageCache();
    this.documentRevision += 1;
    this.isDirty = true;
    this.scheduleSave();
    this.scheduleSyncPages();
    this.redrawHistoryChangeImmediately(affectedPage);
    this.refreshToolbar();
    this.showDrawingNotice(`Undo applied (${this.annotationDocument.strokes.length} strokes)`, 1600);
    this.refreshStatus("Undo applied");
  }
  redo() {
    if (!this.annotationDocument || this.redoStack.length === 0) {
      this.showDrawingNotice("Nothing to redo", 1200);
      this.refreshStatus("Nothing to redo");
      return;
    }
    const entry = this.redoStack.pop();
    if (!entry) {
      return;
    }
    const affectedPage = entry.kind === "stroke-add" ? entry.stroke.page : this.currentPage;
    if (entry.kind === "document") {
      this.undoStack.push({ kind: "document", document: cloneDocument(this.annotationDocument) });
      this.store.inheritBaseline(this.annotationDocument, entry.document);
      this.annotationDocument = entry.document;
      this.nextPageZIndexCache.clear();
    } else {
      this.undoStack.push({ kind: "stroke-add", stroke: this.cloneStroke(entry.stroke) });
      if (!this.annotationDocument.strokes.some((stroke) => stroke.id === entry.stroke.id)) {
        this.annotationDocument.strokes.push(this.cloneStroke(entry.stroke));
      }
    }
    this.lastSelectionRegion = null;
    this.invalidateAnnotationPageCache();
    this.documentRevision += 1;
    this.isDirty = true;
    this.scheduleSave();
    this.scheduleSyncPages();
    this.redrawHistoryChangeImmediately(affectedPage);
    this.refreshToolbar();
    this.showDrawingNotice(`Redo applied (${this.annotationDocument.strokes.length} strokes)`, 1600);
    this.refreshStatus("Redo applied");
  }
  undoFromToolbar() {
    this.finishSessionInlineTextEditor(true);
    this.forceFinishStalePdfInteraction("Finished active annotation before undo");
    this.undo();
  }
  redoFromToolbar() {
    this.finishSessionInlineTextEditor(true);
    this.forceFinishStalePdfInteraction("Finished active annotation before redo");
    this.redo();
  }
  redrawHistoryChangeImmediately(affectedPage) {
    this.cancelPageRenderJobs("history changed");
    this.cancelPendingInteractionRedraw();
    if (this.redrawHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.redrawHandle);
      this.redrawHandle = null;
    }
    this.pendingRedrawPages.clear();
    this.retainCommittedPagePixels(affectedPage);
    this.drawPageAnnotations(affectedPage);
    for (const pageNumber of this.pageSurfaces.keys()) {
      if (pageNumber !== affectedPage) {
        this.schedulePageRedraw(pageNumber);
      }
    }
  }
  getPdfFile() {
    const view = this.leaf.view;
    const file = view.file;
    return file && file.extension.toLowerCase() === "pdf" ? file : null;
  }
  getViewContentEl() {
    var _a2, _b;
    const view = this.leaf.view;
    return (_b = (_a2 = view.contentEl) != null ? _a2 : view.containerEl.querySelector(".view-content")) != null ? _b : view.containerEl;
  }
  getNativeToolbarEl() {
    if (!this.plugin.shouldPreferInlineToolbar()) {
      return null;
    }
    const viewContentEl = this.getViewContentEl();
    if (!viewContentEl) {
      return null;
    }
    return viewContentEl.querySelector(TOOLBAR_SELECTORS);
  }
  getCurrentMixedPageOrdinal(entries = this.getMixedPageEntries()) {
    const index = entries.findIndex((entry) => entry.pageNumber === this.currentPage);
    return index >= 0 ? index + 1 : 1;
  }
  commitNativeMixedPageInput() {
    const input = this.nativeMixedPageInputEl;
    const entries = this.getMixedPageEntries();
    if (!input || entries.length === 0) {
      return;
    }
    const requestedOrdinal = clamp2(Math.round(Number(input.value) || 1), 1, entries.length);
    input.value = String(requestedOrdinal);
    const entry = entries[requestedOrdinal - 1];
    if (entry) {
      this.goToMixedPage(entry.pageNumber);
    }
  }
  detachNativeMixedPageNavigator() {
    var _a2, _b, _c, _d;
    const input = this.nativeMixedPageInputEl;
    if (input) {
      input.removeEventListener("focus", this.handleNativeMixedPageInputEvent, true);
      input.removeEventListener("input", this.handleNativeMixedPageInputEvent, true);
      input.removeEventListener("change", this.handleNativeMixedPageInputEvent, true);
      input.removeEventListener("blur", this.handleNativeMixedPageInputEvent, true);
      input.removeEventListener("keydown", this.handleNativeMixedPageInputKeyDown, true);
      input.classList.remove("pdf-native-annotator-native-mixed-page-input");
      const nativePage = (_a2 = this.getNativePdfCurrentPageNumber()) != null ? _a2 : 1;
      input.value = String(nativePage);
      input.min = (_b = input.dataset.freedrawOriginalMin) != null ? _b : "1";
      input.max = (_c = input.dataset.freedrawOriginalMax) != null ? _c : String(Math.max(1, this.realPdfPageCount));
      const originalLabel = input.dataset.freedrawOriginalAriaLabel;
      if (originalLabel) {
        input.setAttribute("aria-label", originalLabel);
      } else {
        input.removeAttribute("aria-label");
      }
      delete input.dataset.freedrawOriginalMin;
      delete input.dataset.freedrawOriginalMax;
      delete input.dataset.freedrawOriginalAriaLabel;
      delete input.dataset.freedrawEditing;
      input.removeAttribute("aria-valuetext");
    }
    const countEl = this.nativeMixedPageCountEl;
    if (countEl) {
      countEl.textContent = (_d = countEl.dataset.freedrawOriginalText) != null ? _d : `of ${Math.max(1, this.realPdfPageCount)}`;
      countEl.classList.remove("pdf-native-annotator-native-mixed-page-count");
      delete countEl.dataset.freedrawOriginalText;
    }
    this.nativeMixedPageInputEl = null;
    this.nativeMixedPageCountEl = null;
  }
  syncNativeMixedPageNavigator() {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
    const hasMixedPages = this.getAppendedPages().length > 0 || ((_c = (_b = (_a2 = this.annotationDocument) == null ? void 0 : _a2.deletedPdfPages) == null ? void 0 : _b.length) != null ? _c : 0) > 0;
    if (!hasMixedPages) {
      this.detachNativeMixedPageNavigator();
      return;
    }
    const view = this.leaf.view;
    const nativeToolbar = (_f = (_e = view.containerEl.querySelector(TOOLBAR_SELECTORS)) != null ? _e : (_d = this.getViewContentEl()) == null ? void 0 : _d.querySelector(TOOLBAR_SELECTORS)) != null ? _f : null;
    const input = (_h = Array.from((_g = nativeToolbar == null ? void 0 : nativeToolbar.querySelectorAll('input[type="number"], input')) != null ? _g : []).find((candidate) => !candidate.closest(`.${SESSION_ROOT_CLASS}`) && candidate.offsetParent !== null)) != null ? _h : null;
    if (!input) {
      return;
    }
    if (this.nativeMixedPageInputEl && this.nativeMixedPageInputEl !== input) {
      this.detachNativeMixedPageNavigator();
    }
    if (!this.nativeMixedPageInputEl) {
      this.nativeMixedPageInputEl = input;
      input.dataset.freedrawOriginalMin = (_i = input.getAttribute("min")) != null ? _i : "";
      input.dataset.freedrawOriginalMax = (_j = input.getAttribute("max")) != null ? _j : "";
      input.dataset.freedrawOriginalAriaLabel = (_k = input.getAttribute("aria-label")) != null ? _k : "";
      input.addEventListener("focus", this.handleNativeMixedPageInputEvent, true);
      input.addEventListener("input", this.handleNativeMixedPageInputEvent, true);
      input.addEventListener("change", this.handleNativeMixedPageInputEvent, true);
      input.addEventListener("blur", this.handleNativeMixedPageInputEvent, true);
      input.addEventListener("keydown", this.handleNativeMixedPageInputKeyDown, true);
      input.classList.add("pdf-native-annotator-native-mixed-page-input");
    }
    const entries = this.getMixedPageEntries();
    const ordinal = this.getCurrentMixedPageOrdinal(entries);
    input.min = "1";
    input.max = String(Math.max(1, entries.length));
    input.setAttribute("aria-label", "Mixed page");
    input.setAttribute("aria-valuetext", `Page ${ordinal} of ${entries.length}`);
    if (input.dataset.freedrawEditing !== "true") {
      input.value = String(ordinal);
    }
    if (!((_l = this.nativeMixedPageCountEl) == null ? void 0 : _l.isConnected)) {
      const scope = (_n = (_m = input.parentElement) == null ? void 0 : _m.parentElement) != null ? _n : nativeToolbar;
      const inputRect = input.getBoundingClientRect();
      const candidates = Array.from((_o = scope == null ? void 0 : scope.querySelectorAll("span, div")) != null ? _o : []).filter((candidate) => {
        var _a3, _b2;
        return candidate !== input.parentElement && /^of\s+\d+$/i.test((_b2 = (_a3 = candidate.textContent) == null ? void 0 : _a3.trim()) != null ? _b2 : "");
      }).sort((first, second) => {
        const firstRect = first.getBoundingClientRect();
        const secondRect = second.getBoundingClientRect();
        return Math.abs(firstRect.left - inputRect.right) - Math.abs(secondRect.left - inputRect.right);
      });
      this.nativeMixedPageCountEl = (_p = candidates[0]) != null ? _p : null;
      if (this.nativeMixedPageCountEl) {
        this.nativeMixedPageCountEl.dataset.freedrawOriginalText = (_q = this.nativeMixedPageCountEl.textContent) != null ? _q : "";
        this.nativeMixedPageCountEl.classList.add("pdf-native-annotator-native-mixed-page-count");
      }
    }
    if (this.nativeMixedPageCountEl) {
      this.nativeMixedPageCountEl.textContent = `of ${entries.length}`;
    }
  }
  getNativePdfEventBus() {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
    const view = this.leaf.view;
    return (_i = (_h = (_c = (_b = (_a2 = view.viewer) == null ? void 0 : _a2.child) == null ? void 0 : _b.pdfViewer) == null ? void 0 : _c.eventBus) != null ? _h : (_g = (_f = (_e = (_d = view.viewer) == null ? void 0 : _d.child) == null ? void 0 : _e.pdfViewer) == null ? void 0 : _f.pdfViewer) == null ? void 0 : _g.eventBus) != null ? _i : null;
  }
  getNativePdfCurrentPageNumber() {
    var _a2, _b, _c;
    const view = this.leaf.view;
    const wrapper = (_b = (_a2 = view.viewer) == null ? void 0 : _a2.child) == null ? void 0 : _b.pdfViewer;
    const candidates = [
      (_c = wrapper == null ? void 0 : wrapper.pdfViewer) == null ? void 0 : _c.currentPageNumber,
      wrapper == null ? void 0 : wrapper.currentPageNumber
    ];
    for (const candidate of candidates) {
      const pageNumber = Number(candidate);
      if (Number.isFinite(pageNumber) && pageNumber >= 1 && pageNumber <= this.realPdfPageCount) {
        return Math.round(pageNumber);
      }
    }
    const toolbar = this.getNativeToolbarEl();
    const pageInput = toolbar == null ? void 0 : toolbar.querySelector(
      'input[type="number"], input.pdf-page-input, input.toolbarField.pageNumber'
    );
    const inputPage = Number(pageInput == null ? void 0 : pageInput.value);
    return Number.isFinite(inputPage) && inputPage >= 1 && inputPage <= this.realPdfPageCount ? Math.round(inputPage) : null;
  }
  syncCurrentPageForPageAction() {
    this.updateCurrentPageFromScroll();
    if (this.currentPage > this.realPdfPageCount) {
      return;
    }
    const nativePageNumber = this.getNativePdfCurrentPageNumber();
    if (nativePageNumber !== null) {
      this.currentPage = nativePageNumber;
    }
  }
  bindNativePdfEvents() {
    const eventBus = this.getNativePdfEventBus();
    if (!eventBus || eventBus === this.nativeEventBus || typeof eventBus.on !== "function") {
      return;
    }
    this.unbindNativePdfEvents();
    this.nativeEventBus = eventBus;
    const addHandler = (name, callback) => {
      var _a2;
      (_a2 = eventBus.on) == null ? void 0 : _a2.call(eventBus, name, callback);
      this.nativeEventHandlers.push({ name, callback });
    };
    addHandler("pagerendered", () => this.scheduleLayoutRefresh());
    addHandler("pagesloaded", () => this.scheduleLayoutRefresh());
    addHandler("pagechanging", (data) => {
      const pageNumber = typeof data === "object" && data !== null && "pageNumber" in data ? Number(data.pageNumber) : NaN;
      if (Number.isFinite(pageNumber) && pageNumber > 0) {
        this.currentPage = pageNumber;
        this.updateNativeMixedPageThumbnailSelection();
        this.syncNativeMixedPageNavigator();
      }
    });
    addHandler("scalechanging", () => {
      this.captureZoomScrollAnchor();
      this.markRealPagesZooming();
      this.scheduleSyntheticPageZoomPreview();
    });
    addHandler("scalechanged", () => {
      this.scheduleFinishZoomingPages();
      this.scheduleSyntheticPageZoomPreview();
      this.scheduleZoomScrollAnchorRestore();
      this.scheduleLayoutRefresh();
    });
  }
  unbindNativePdfEvents() {
    var _a2;
    if ((_a2 = this.nativeEventBus) == null ? void 0 : _a2.off) {
      for (const { name, callback } of this.nativeEventHandlers) {
        this.nativeEventBus.off(name, callback);
      }
    }
    this.nativeEventBus = null;
    this.nativeEventHandlers = [];
  }
  markRealPagesZooming() {
    var _a2;
    for (const pageNumber of this.pageSurfaces.keys()) {
      if (this.shouldKeepPageHot(pageNumber) || ((_a2 = this.zoomScrollAnchor) == null ? void 0 : _a2.pageNumber) === pageNumber || this.inlineTextPageNumber === pageNumber) {
        this.zoomingPages.add(pageNumber);
      }
    }
  }
  captureZoomScrollAnchor() {
    var _a2;
    if (this.zoomScrollAnchor) {
      return;
    }
    const scrollEl = this.scrollParent;
    if (!(scrollEl == null ? void 0 : scrollEl.isConnected) || this.pageSurfaces.size === 0) {
      return;
    }
    const containerRect = scrollEl.getBoundingClientRect();
    const viewportY = containerRect.height / 2;
    const clientY = containerRect.top + viewportY;
    const ownerDocument = scrollEl.ownerDocument;
    const clientX = containerRect.left + containerRect.width / 2;
    const sampleOffsets = [0, -0.12, 0.12, -0.28, 0.28];
    let surface = null;
    for (const offset of sampleOffsets) {
      const sampleY = clientY + containerRect.height * offset;
      const hitTarget = ownerDocument.elementFromPoint(clientX, sampleY);
      const hitPageEl = (_a2 = hitTarget == null ? void 0 : hitTarget.closest(
        ".page[data-page-number], .pdf-page[data-page-number], .pdf-native-annotator-synthetic-page[data-page-number]"
      )) != null ? _a2 : null;
      const hitPageNumber = Number(hitPageEl == null ? void 0 : hitPageEl.dataset.pageNumber);
      const candidate = Number.isFinite(hitPageNumber) ? this.pageSurfaces.get(hitPageNumber) : null;
      if (candidate == null ? void 0 : candidate.pageEl.isConnected) {
        surface = candidate;
        break;
      }
    }
    if (!surface) {
      const currentSurface = this.pageSurfaces.get(this.currentPage);
      if (currentSurface == null ? void 0 : currentSurface.pageEl.isConnected) {
        const currentRect = currentSurface.pageEl.getBoundingClientRect();
        const closeToViewport = currentRect.bottom >= containerRect.top - containerRect.height && currentRect.top <= containerRect.bottom + containerRect.height;
        if (closeToViewport) {
          surface = currentSurface;
        }
      }
    }
    if (!surface) {
      return;
    }
    const pageRect = surface.pageEl.getBoundingClientRect();
    if (pageRect.height <= 0) {
      return;
    }
    const pageTop = pageRect.top - containerRect.top + scrollEl.scrollTop;
    const anchor = captureZoomPageAnchor(
      surface.pageNumber,
      scrollEl.scrollTop + viewportY,
      pageTop,
      pageRect.height
    );
    this.zoomScrollAnchor = {
      ...anchor,
      viewportY
    };
  }
  scheduleZoomScrollAnchorRestore(clearAfterRestore = false) {
    if (!this.zoomScrollAnchor) {
      return;
    }
    if (this.zoomAnchorRestoreHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.zoomAnchorRestoreHandle);
    }
    this.zoomAnchorRestoreHandle = this.ownerWindow.requestAnimationFrame(() => {
      this.zoomAnchorRestoreHandle = null;
      this.restoreZoomScrollAnchor();
      if (clearAfterRestore) {
        this.zoomScrollAnchor = null;
      }
    });
  }
  restoreZoomScrollAnchor() {
    const anchor = this.zoomScrollAnchor;
    const scrollEl = this.scrollParent;
    const surface = anchor ? this.pageSurfaces.get(anchor.pageNumber) : null;
    if (!anchor || !(scrollEl == null ? void 0 : scrollEl.isConnected) || !(surface == null ? void 0 : surface.pageEl.isConnected)) {
      return;
    }
    const containerRect = scrollEl.getBoundingClientRect();
    const pageRect = surface.pageEl.getBoundingClientRect();
    if (pageRect.height <= 0) {
      return;
    }
    const pageTop = pageRect.top - containerRect.top + scrollEl.scrollTop;
    const maxScrollTop = Math.max(0, scrollEl.scrollHeight - scrollEl.clientHeight);
    const anchoredContentY = resolveZoomPageScrollTop(
      anchor,
      pageTop,
      pageRect.height,
      maxScrollTop + anchor.viewportY
    );
    const targetScrollTop = clamp2(anchoredContentY - anchor.viewportY, 0, maxScrollTop);
    if (Math.abs(scrollEl.scrollTop - targetScrollTop) >= 0.5) {
      scrollEl.scrollTop = targetScrollTop;
    }
  }
  ensureUi() {
    var _a2, _b;
    const viewContentEl = this.getViewContentEl();
    if (!viewContentEl || this.rootEl) {
      return;
    }
    viewContentEl.classList.add("pdf-native-annotator-host");
    this.rootEl = createDiv();
    this.rootEl.className = SESSION_ROOT_CLASS;
    this.toolbarEl = createDiv();
    this.toolbarEl.className = "pdf-native-annotator-toolbar";
    this.toolbarEl.title = "Drag empty space to move the annotation toolbar";
    this.toolbarEl.addEventListener("pointerdown", this.handleToolbarDragStart);
    this.statusEl = createDiv();
    this.statusEl.className = "pdf-native-annotator-status";
    this.statusEl.textContent = "";
    this.toolPreviewEl = createDiv();
    this.toolPreviewEl.className = "pdf-native-annotator-tool-preview is-hidden";
    this.rootEl.appendChild(this.toolbarEl);
    this.mountUi();
    viewContentEl.appendChild(this.toolPreviewEl);
    this.syncRenderTelemetry();
    viewContentEl.addEventListener("touchstart", this.handleZoomGestureTouchStart, { capture: true, passive: true });
    viewContentEl.addEventListener("wheel", this.handleZoomGestureWheel, { capture: true, passive: true });
    viewContentEl.addEventListener("gesturestart", this.handleZoomGestureStart, { capture: true, passive: true });
    viewContentEl.addEventListener("pointerdown", this.handleViewPointerDown, { capture: true });
    viewContentEl.addEventListener("pointermove", this.handleViewPointerMove, { passive: true });
    viewContentEl.addEventListener("pointerleave", this.handleViewPointerLeave, { passive: true });
    this.ownerDocument.addEventListener("pointerdown", this.handleDocumentPointerDown, true);
    this.ownerDocument.addEventListener("touchstart", this.handleDocumentTouchStart, { capture: true, passive: false });
    this.ownerWindow.addEventListener("resize", this.handleViewportResize, { passive: true });
    this.captureVisualViewportBaseline();
    (_a2 = this.ownerWindow.visualViewport) == null ? void 0 : _a2.addEventListener("resize", this.handleVisualViewportChange, { passive: true });
    (_b = this.ownerWindow.visualViewport) == null ? void 0 : _b.addEventListener("scroll", this.handleVisualViewportChange, { passive: true });
  }
  mountUi() {
    if (!this.rootEl) {
      return;
    }
    const nativeToolbarEl = this.getNativeToolbarEl();
    const viewContentEl = this.getViewContentEl();
    if (nativeToolbarEl) {
      this.rootEl.classList.add("is-inline");
      this.rootEl.classList.remove("is-floating");
      this.rootEl.setCssStyles({
        top: "",
        right: "",
        left: ""
      });
      if (this.rootEl.parentElement !== nativeToolbarEl) {
        nativeToolbarEl.appendChild(this.rootEl);
      }
      return;
    }
    if (viewContentEl) {
      viewContentEl.classList.add("pdf-native-annotator-host");
      this.rootEl.classList.add("is-floating");
      this.rootEl.classList.remove("is-inline");
      this.applyFloatingToolbarPosition();
      if (this.rootEl.parentElement !== viewContentEl) {
        viewContentEl.appendChild(this.rootEl);
      }
    }
  }
  syncRenderTelemetry() {
    const viewContentEl = this.getViewContentEl();
    if (viewContentEl && this.plugin.shouldShowRenderTelemetry()) {
      this.renderTelemetry.attach(viewContentEl);
      return;
    }
    this.renderTelemetry.dispose();
  }
  applyFloatingToolbarPosition() {
    if (!this.rootEl) {
      return;
    }
    this.rootEl.setCssStyles({
      top: `${this.floatingToolbarOffset.top}px`,
      right: `${this.floatingToolbarOffset.right}px`,
      left: "auto"
    });
  }
  isToolbarInteractiveTarget(target) {
    const element = isDomElement(target) ? target : null;
    return !!(element == null ? void 0 : element.closest("button, input, select, textarea, a, .clickable-icon, .pdf-native-annotator-preset, .pdf-native-annotator-swatch"));
  }
  observePdfDom() {
    var _a2;
    const viewContentEl = this.getViewContentEl();
    if (!viewContentEl) {
      return;
    }
    const observationRoot = (_a2 = this.leaf.view.containerEl) != null ? _a2 : viewContentEl;
    this.destroyObservers();
    this.mutationObserver = new MutationObserver((records) => {
      const externalChange = records.some((record) => this.isExternalPdfMutation(record));
      if (!externalChange) {
        return;
      }
      this.mountUi();
      this.scheduleLayoutRefresh();
    });
    this.mutationObserver.observe(observationRoot, {
      childList: true,
      subtree: true
    });
    if (typeof ResizeObserver !== "undefined") {
      this.viewResizeObserver = new ResizeObserver(() => {
        this.scheduleRepositionOpenPopovers();
        this.scheduleLayoutRefresh();
      });
      this.viewResizeObserver.observe(viewContentEl);
      const scrollParent = findScrollParent(viewContentEl);
      if (scrollParent !== viewContentEl) {
        this.viewResizeObserver.observe(scrollParent);
      }
    }
  }
  isExternalPdfMutation(record) {
    if (!isDomNode(record.target)) {
      return true;
    }
    if (record.type === "childList") {
      const changedNodes = [...Array.from(record.addedNodes), ...Array.from(record.removedNodes)];
      return changedNodes.some((node) => !this.isOwnedAnnotatorDom(node));
    }
    if (this.isOwnedAnnotatorDom(record.target)) {
      return false;
    }
    const element = isDomElement(record.target) ? record.target : record.target.parentElement;
    return !!(element == null ? void 0 : element.closest(".pdfViewer, .page[data-page-number], .pdf-page[data-page-number], .canvasWrapper"));
  }
  isOwnedAnnotatorDom(target) {
    var _a2, _b;
    if (this.isSyncingSyntheticPages) {
      return true;
    }
    if ((_a2 = this.rootEl) == null ? void 0 : _a2.contains(target)) {
      return true;
    }
    if ((_b = this.toolPreviewEl) == null ? void 0 : _b.contains(target)) {
      return true;
    }
    const element = isDomElement(target) ? target : target.parentElement;
    return !!(element == null ? void 0 : element.closest(".pdf-native-annotator-synthetic-pages, .pdf-native-annotator-synthetic-page, .pdf-native-annotator-overlay, .pdf-native-annotator-transient, .pdf-native-annotator-template-background, .pdf-native-annotator-native-page-entry, .pdf-native-annotator-native-page-footer"));
  }
  destroyObservers() {
    var _a2, _b, _c, _d;
    this.finishFingerPan(false);
    this.cancelFingerPanInertia();
    if (this.syncHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.syncHandle);
      this.syncHandle = null;
    }
    if (this.scrollHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.scrollHandle);
      this.scrollHandle = null;
    }
    if (this.scrollIdleHandle !== null) {
      this.ownerWindow.clearTimeout(this.scrollIdleHandle);
      this.scrollIdleHandle = null;
    }
    if (this.redrawHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.redrawHandle);
      this.redrawHandle = null;
    }
    if (this.committedRedrawHandle !== null) {
      this.ownerWindow.clearTimeout(this.committedRedrawHandle);
      this.committedRedrawHandle = null;
    }
    if (this.interactionRedrawHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.interactionRedrawHandle);
      this.interactionRedrawHandle = null;
    }
    this.cancelPageRenderJobs();
    this.pageRenderSlots.clear();
    if (this.popoverRepositionHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.popoverRepositionHandle);
      this.popoverRepositionHandle = null;
    }
    if (this.toolbarScrollRestoreHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.toolbarScrollRestoreHandle);
      this.toolbarScrollRestoreHandle = null;
    }
    if (this.thumbnailScrollRestoreHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.thumbnailScrollRestoreHandle);
      this.thumbnailScrollRestoreHandle = null;
    }
    if (this.keyboardAvoidanceHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.keyboardAvoidanceHandle);
      this.keyboardAvoidanceHandle = null;
    }
    this.clearPendingWebKitTouchPointer();
    this.clearLayoutRefreshHandles();
    if (this.zoomSettleHandle !== null) {
      this.ownerWindow.clearTimeout(this.zoomSettleHandle);
      this.zoomSettleHandle = null;
    }
    if (this.zoomAnchorRestoreHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.zoomAnchorRestoreHandle);
      this.zoomAnchorRestoreHandle = null;
    }
    if (this.syntheticZoomPreviewHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.syntheticZoomPreviewHandle);
      this.syntheticZoomPreviewHandle = null;
    }
    this.zoomScrollAnchor = null;
    if (this.statusResetHandle !== null) {
      this.ownerWindow.clearTimeout(this.statusResetHandle);
      this.statusResetHandle = null;
    }
    (_a2 = this.mutationObserver) == null ? void 0 : _a2.disconnect();
    this.mutationObserver = null;
    (_b = this.viewResizeObserver) == null ? void 0 : _b.disconnect();
    this.viewResizeObserver = null;
    for (const observer of this.pageResizeObservers.values()) {
      observer.disconnect();
    }
    this.pageResizeObservers.clear();
    this.pendingRedrawPages.clear();
    this.pendingInteractionRedrawPages.clear();
    this.pendingCommittedRedrawPages.clear();
    this.zoomingPages.clear();
    this.isPdfScrolling = false;
    this.visualViewportBaselineHeight = 0;
    this.needsToolbarRefreshAfterScroll = false;
    if (this.scrollParent) {
      this.scrollParent.removeEventListener("scroll", this.handleScroll, { capture: false });
      this.scrollParent = null;
    }
    this.ownerWindow.removeEventListener("resize", this.handleViewportResize);
    (_c = this.ownerWindow.visualViewport) == null ? void 0 : _c.removeEventListener("resize", this.handleVisualViewportChange);
    (_d = this.ownerWindow.visualViewport) == null ? void 0 : _d.removeEventListener("scroll", this.handleVisualViewportChange);
  }
  scheduleSyncPages() {
    if (this.syncHandle !== null) {
      return;
    }
    this.syncHandle = this.ownerWindow.requestAnimationFrame(() => {
      this.syncHandle = null;
      this.syncPages();
    });
  }
  syncPages(redrawAnnotations = true) {
    var _a2, _b;
    if (!this.file || !this.annotationDocument) {
      return;
    }
    const viewContentEl = this.getViewContentEl();
    if (!viewContentEl) {
      return;
    }
    const rawRealPageEls = this.getRealPdfPageElements(viewContentEl);
    if (rawRealPageEls.length === 0) {
      this.refreshStatus(`Waiting for ${this.file.name} pages...`, 1800);
      return;
    }
    this.realPdfPageCount = rawRealPageEls.reduce((maxPage, entry) => Math.max(maxPage, entry.pageNumber), 0);
    this.applyDeletedPdfPageVisibility(rawRealPageEls);
    this.syncSyntheticPages(rawRealPageEls);
    const syntheticPageEls = Array.from(viewContentEl.querySelectorAll(".pdf-native-annotator-synthetic-page[data-page-number]")).map((pageEl) => {
      const rawPage = Number(pageEl.getAttribute("data-page-number"));
      return Number.isFinite(rawPage) && rawPage > 0 ? { pageEl, pageNumber: rawPage } : null;
    }).filter((entry) => !!entry);
    const realPageEls = rawRealPageEls.filter((entry) => !this.isPdfPageDeleted(entry.pageNumber));
    const pageEls = [...realPageEls, ...syntheticPageEls];
    const nextPages = /* @__PURE__ */ new Set();
    for (const { pageEl, pageNumber } of pageEls) {
      nextPages.add(pageNumber);
      try {
        this.ensurePageSurface(pageEl, pageNumber);
      } catch (error) {
        console.error(`freedraw-pdf: failed to attach overlay to page ${pageNumber}`, error);
      }
    }
    for (const [pageNumber, surface] of this.pageSurfaces.entries()) {
      if (!nextPages.has(pageNumber)) {
        (_a2 = this.pageResizeObservers.get(pageNumber)) == null ? void 0 : _a2.disconnect();
        this.pageResizeObservers.delete(pageNumber);
        surface.overlayEl.remove();
        surface.transientEl.remove();
        this.pageSurfaces.delete(pageNumber);
      }
    }
    this.applyOverlayMode();
    this.bindScrollParent(((_b = realPageEls[0]) != null ? _b : rawRealPageEls[0]).pageEl);
    this.updateCurrentPageFromScroll();
    this.syncNativeMixedPageNavigator();
    this.syncNativeMixedPageThumbnails(viewContentEl);
    this.updateVisiblePageRange();
    if (redrawAnnotations) {
      this.drawAllAnnotations();
      this.refreshToolbar();
    }
  }
  applyDeletedPdfPageVisibility(realPageEls) {
    for (const { pageEl, pageNumber } of realPageEls) {
      const isDeleted = this.isPdfPageDeleted(pageNumber);
      pageEl.classList.toggle("pdf-native-annotator-deleted-pdf-page", isDeleted);
      this.setStyleIfChanged(pageEl, "display", isDeleted ? "none" : "");
      pageEl.setAttribute("aria-hidden", isDeleted ? "true" : "false");
    }
  }
  getPrimaryPdfViewerEl(viewContentEl) {
    var _a2;
    const viewers = Array.from(viewContentEl.querySelectorAll(".pdfViewer"));
    if (viewers.length === 0) {
      return null;
    }
    let bestViewer = null;
    for (const viewer of viewers) {
      if (!viewer.isConnected) {
        continue;
      }
      const style = this.ownerWindow.getComputedStyle(viewer);
      if (style.display === "none" || style.visibility === "hidden") {
        continue;
      }
      const rect = viewer.getBoundingClientRect();
      const pageCount = viewer.querySelectorAll(".page[data-page-number], .pdf-page[data-page-number]").length;
      if (pageCount === 0) {
        continue;
      }
      const area = Math.max(1, rect.width * rect.height);
      const score = area + pageCount * 1e3;
      if (!bestViewer || score > bestViewer.score) {
        bestViewer = { element: viewer, score };
      }
    }
    return (_a2 = bestViewer == null ? void 0 : bestViewer.element) != null ? _a2 : null;
  }
  getRealPdfPageElements(viewContentEl) {
    var _a2;
    const pdfViewerEl = this.getPrimaryPdfViewerEl(viewContentEl);
    const candidates = pdfViewerEl ? Array.from(pdfViewerEl.querySelectorAll(".page[data-page-number], .pdf-page[data-page-number]")) : Array.from(viewContentEl.querySelectorAll(PAGE_SELECTORS));
    const viewportHeight = this.ownerWindow.innerHeight || this.ownerDocument.documentElement.clientHeight || 0;
    const bestByPage = /* @__PURE__ */ new Map();
    for (const pageEl of candidates) {
      if (!pageEl.isConnected) {
        continue;
      }
      if (pageEl.classList.contains("pdf-native-annotator-synthetic-page")) {
        continue;
      }
      if (pageEl.closest(".pdf-native-annotator-synthetic-pages")) {
        continue;
      }
      const rawPage = Number(pageEl.getAttribute("data-page-number"));
      if (!Number.isFinite(rawPage) || rawPage <= 0) {
        continue;
      }
      const hostEl = getOverlayHost(pageEl);
      if (!hostEl.isConnected) {
        continue;
      }
      const isDeletedPdfPage = pageEl.classList.contains("pdf-native-annotator-deleted-pdf-page");
      const pageStyle = this.ownerWindow.getComputedStyle(pageEl);
      const hostStyle = this.ownerWindow.getComputedStyle(hostEl);
      if (!isDeletedPdfPage && (pageStyle.display === "none" || hostStyle.display === "none" || pageStyle.visibility === "hidden" || hostStyle.visibility === "hidden")) {
        continue;
      }
      const canvas = (_a2 = hostEl.querySelector("canvas")) != null ? _a2 : pageEl.querySelector("canvas");
      const rect = hostEl.getBoundingClientRect();
      const pageRect = pageEl.getBoundingClientRect();
      const width = Math.max(rect.width, pageRect.width, hostEl.clientWidth, pageEl.clientWidth, isHtmlCanvasElement(canvas) ? canvas.clientWidth : 0);
      const height = Math.max(rect.height, pageRect.height, hostEl.clientHeight, pageEl.clientHeight, isHtmlCanvasElement(canvas) ? canvas.clientHeight : 0);
      const hasCanvas = isHtmlCanvasElement(canvas);
      if (!isDeletedPdfPage && (!hasCanvas && width < 180 || width <= 2 || height <= 2)) {
        continue;
      }
      const area = Math.max(1, width * height);
      const intersectsViewport = rect.bottom > 0 && (!viewportHeight || rect.top < viewportHeight);
      const visibleScore = (intersectsViewport ? 2 : 0) + (hasCanvas ? 1 : 0);
      const existing = bestByPage.get(rawPage);
      if (!existing || visibleScore > existing.visibleScore || visibleScore === existing.visibleScore && area > existing.area) {
        bestByPage.set(rawPage, { pageEl, pageNumber: rawPage, area, visibleScore, hasCanvas });
      }
    }
    return Array.from(bestByPage.values()).sort((first, second) => first.pageNumber - second.pageNumber).map(({ pageEl, pageNumber }) => ({ pageEl, pageNumber }));
  }
  getNativePdfThumbnailPageNumber(linkEl) {
    var _a2;
    const thumbnailEl = linkEl.querySelector(".thumbnail");
    const candidates = [
      thumbnailEl == null ? void 0 : thumbnailEl.dataset.pageNumber,
      thumbnailEl == null ? void 0 : thumbnailEl.dataset.pageLabel,
      linkEl.dataset.pageNumber,
      linkEl.getAttribute("aria-label")
    ];
    for (const candidate of candidates) {
      const match = candidate == null ? void 0 : candidate.match(/\d+/);
      if (!match) {
        continue;
      }
      const pageNumber2 = Number(match[0]);
      if (Number.isInteger(pageNumber2) && pageNumber2 > 0) {
        return pageNumber2;
      }
    }
    const href = (_a2 = linkEl.getAttribute("href")) != null ? _a2 : "";
    const hrefMatch = href.match(/(?:page=|page-)(\d+)/i);
    if (!hrefMatch) {
      return null;
    }
    const pageNumber = Number(hrefMatch[1]);
    return Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : null;
  }
  getNativePdfThumbnailView(viewContentEl) {
    const view = this.leaf.view;
    const roots = /* @__PURE__ */ new Set([viewContentEl, view.containerEl]);
    const candidates = Array.from(roots).flatMap((root) => Array.from(root.querySelectorAll(".pdf-sidebar-container .pdf-thumbnail-view")));
    if (candidates.length === 0) {
      return null;
    }
    return candidates.reduce((best, candidate) => {
      const candidateCount = candidate.querySelectorAll(":scope > a .thumbnail").length;
      const bestCount = best.querySelectorAll(":scope > a .thumbnail").length;
      return candidateCount > bestCount ? candidate : best;
    });
  }
  cleanupNativeMixedPageThumbnails() {
    var _a2;
    const thumbnailViews = /* @__PURE__ */ new Set();
    if (this.nativeMixedThumbnailViewEl) {
      thumbnailViews.add(this.nativeMixedThumbnailViewEl);
    }
    const viewContentEl = this.getViewContentEl();
    const view = this.leaf.view;
    for (const root of [viewContentEl, view.containerEl]) {
      for (const thumbnailView of Array.from((_a2 = root == null ? void 0 : root.querySelectorAll(".pdf-thumbnail-view")) != null ? _a2 : [])) {
        thumbnailViews.add(thumbnailView);
      }
    }
    for (const thumbnailView of thumbnailViews) {
      thumbnailView.classList.remove("pdf-native-annotator-has-synthetic-selection");
      thumbnailView.querySelectorAll(".pdf-native-annotator-native-page-entry, .pdf-native-annotator-native-page-footer").forEach((element) => element.remove());
      thumbnailView.querySelectorAll(".pdf-native-annotator-native-pdf-page-hidden").forEach((element) => element.classList.remove("pdf-native-annotator-native-pdf-page-hidden"));
      thumbnailView.querySelectorAll("[data-freedraw-native-context-bound='true']").forEach((element) => {
        element.removeEventListener("contextmenu", this.handleNativePdfThumbnailContextMenu);
        delete element.dataset.freedrawNativeContextBound;
      });
    }
    this.nativeMixedThumbnailViewEl = null;
    this.nativeMixedThumbnailSignature = "";
  }
  getNativeThumbnailScrollParent(thumbnailView) {
    const sidebar = thumbnailView.closest(".pdf-sidebar-container");
    if (!sidebar) {
      return null;
    }
    let current = thumbnailView;
    while (current && sidebar.contains(current)) {
      const style = this.ownerWindow.getComputedStyle(current);
      if (style.overflowY === "auto" || style.overflowY === "scroll") {
        return current;
      }
      if (current === sidebar) {
        break;
      }
      current = current.parentElement;
    }
    return null;
  }
  updateNativeMixedPageThumbnailSelection() {
    var _a2;
    const thumbnailView = this.nativeMixedThumbnailViewEl;
    if (!(thumbnailView == null ? void 0 : thumbnailView.isConnected)) {
      return;
    }
    const syntheticSelected = this.currentPage > this.realPdfPageCount;
    thumbnailView.classList.toggle("pdf-native-annotator-has-synthetic-selection", syntheticSelected);
    for (const entryEl of Array.from(thumbnailView.querySelectorAll(".pdf-native-annotator-native-page-entry"))) {
      const selected = Number(entryEl.dataset.pageNumber) === this.currentPage;
      entryEl.classList.toggle("is-selected", selected);
      (_a2 = entryEl.querySelector(".thumbnail")) == null ? void 0 : _a2.classList.toggle("selected", selected);
      entryEl.setAttribute("aria-current", selected ? "page" : "false");
    }
  }
  syncNativeMixedPageThumbnails(viewContentEl) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    if (!this.annotationDocument) {
      return;
    }
    const thumbnailView = this.getNativePdfThumbnailView(viewContentEl);
    if (!thumbnailView) {
      this.cleanupNativeMixedPageThumbnails();
      return;
    }
    if (this.nativeMixedThumbnailViewEl && this.nativeMixedThumbnailViewEl !== thumbnailView) {
      this.cleanupNativeMixedPageThumbnails();
    }
    this.nativeMixedThumbnailViewEl = thumbnailView;
    const mixedEntries = this.getMixedPageEntries();
    const addedEntries = mixedEntries.filter((entry) => entry.isAdded);
    const nativeLinks = Array.from(thumbnailView.querySelectorAll(":scope > a"));
    const signature = JSON.stringify({
      added: addedEntries.map((entry) => [
        entry.pageNumber,
        entry.pageId,
        entry.label,
        entry.template,
        entry.pageSize,
        entry.paperColor,
        entry.annotationCount
      ]),
      deleted: (_a2 = this.annotationDocument.deletedPdfPages) != null ? _a2 : [],
      removed: this.getRemovedPageEntries().length,
      native: nativeLinks.map((linkEl) => this.getNativePdfThumbnailPageNumber(linkEl))
    });
    const structureIsCurrent = this.nativeMixedThumbnailSignature === signature && thumbnailView.querySelectorAll(":scope > .pdf-native-annotator-native-page-entry").length === addedEntries.length && !!thumbnailView.querySelector(":scope > .pdf-native-annotator-native-page-footer") && nativeLinks.every((linkEl) => linkEl.dataset.freedrawNativeContextBound === "true");
    if (structureIsCurrent) {
      this.updateNativeMixedPageThumbnailSelection();
      return;
    }
    const scrollParent = this.getNativeThumbnailScrollParent(thumbnailView);
    const restoreScroll = !!scrollParent && scrollParent.scrollHeight > scrollParent.clientHeight;
    const previousScrollTop = (_b = scrollParent == null ? void 0 : scrollParent.scrollTop) != null ? _b : 0;
    const previousScrollHeight = (_c = scrollParent == null ? void 0 : scrollParent.scrollHeight) != null ? _c : 0;
    thumbnailView.querySelectorAll(".pdf-native-annotator-native-page-entry").forEach((element) => element.remove());
    const nativeByPage = /* @__PURE__ */ new Map();
    for (const linkEl of Array.from(thumbnailView.querySelectorAll(":scope > a"))) {
      const pageNumber = this.getNativePdfThumbnailPageNumber(linkEl);
      const thumbnailEl = linkEl.querySelector(".thumbnail");
      if (!pageNumber || !thumbnailEl || nativeByPage.has(pageNumber)) {
        continue;
      }
      nativeByPage.set(pageNumber, { linkEl, thumbnailEl });
      linkEl.classList.toggle("pdf-native-annotator-native-pdf-page-hidden", this.isPdfPageDeleted(pageNumber));
      if (linkEl.dataset.freedrawNativeContextBound !== "true") {
        linkEl.addEventListener("contextmenu", this.handleNativePdfThumbnailContextMenu);
        linkEl.dataset.freedrawNativeContextBound = "true";
      }
    }
    if (nativeByPage.size === 0) {
      return;
    }
    const referenceThumbnail = (_d = nativeByPage.values().next().value) == null ? void 0 : _d.thumbnailEl;
    const referenceStyles = referenceThumbnail ? this.ownerWindow.getComputedStyle(referenceThumbnail) : null;
    const thumbnailWidth = (referenceStyles == null ? void 0 : referenceStyles.getPropertyValue("--thumbnail-width").trim()) || "96px";
    const thumbnailHeight = (referenceStyles == null ? void 0 : referenceStyles.getPropertyValue("--thumbnail-height").trim()) || "136px";
    const addedByAnchor = /* @__PURE__ */ new Map();
    for (const entry of mixedEntries) {
      if (!entry.isAdded || !entry.pageId) {
        continue;
      }
      const page = (_e = this.getSyntheticPageById(entry.pageId)) == null ? void 0 : _e.page;
      const anchorPage = page ? this.getSyntheticPageInsertAfterPdfPage(page) : this.realPdfPageCount;
      const group = (_f = addedByAnchor.get(anchorPage)) != null ? _f : [];
      group.push(entry);
      addedByAnchor.set(anchorPage, group);
    }
    const createAddedEntry = (entry) => {
      var _a3, _b2;
      const entryEl = createDiv();
      entryEl.className = "pdf-native-annotator-native-page-entry";
      entryEl.dataset.pageNumber = String(entry.pageNumber);
      entryEl.dataset.pageId = (_a3 = entry.pageId) != null ? _a3 : "";
      entryEl.setAttribute("aria-label", `${entry.label}. Added page. ${entry.detail}`);
      const thumbnailEl = entryEl.createDiv({ cls: "thumbnail pdf-native-annotator-native-thumbnail" });
      thumbnailEl.dataset.pageLabel = String(entry.pageNumber);
      thumbnailEl.dataset.loaded = "true";
      thumbnailEl.tabIndex = 0;
      thumbnailEl.setAttribute("role", "link");
      thumbnailEl.setAttribute("aria-label", `Open ${entry.label}`);
      thumbnailEl.setCssProps({
        "--thumbnail-width": thumbnailWidth,
        "--thumbnail-height": thumbnailHeight,
        "--page-list-paper": (_b2 = entry.paperColor) != null ? _b2 : "#fffdf7"
      });
      if (entry.template) {
        thumbnailEl.classList.add(`is-template-${entry.template}`);
      }
      const paperEl = thumbnailEl.createDiv({ cls: "pdf-native-annotator-native-thumbnail-paper" });
      paperEl.createDiv({ cls: "pdf-native-annotator-native-thumbnail-pattern" });
      const addedLabel = paperEl.createSpan({ cls: "pdf-native-annotator-native-thumbnail-kind", text: "Added" });
      addedLabel.setAttribute("aria-hidden", "true");
      if (entry.annotationCount > 0) {
        thumbnailEl.createSpan({
          cls: "pdf-native-annotator-native-thumbnail-count",
          text: String(entry.annotationCount)
        });
      }
      const openPage = () => this.goToMixedPage(entry.pageNumber);
      thumbnailEl.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        openPage();
      });
      thumbnailEl.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        openPage();
      });
      thumbnailEl.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.openMixedPageEntryMenu(entry, event, thumbnailEl);
      });
      return entryEl;
    };
    const firstNativeLink = (_h = (_g = Array.from(nativeByPage.values()).sort((first, second) => {
      var _a3, _b2;
      return ((_a3 = this.getNativePdfThumbnailPageNumber(first.linkEl)) != null ? _a3 : 0) - ((_b2 = this.getNativePdfThumbnailPageNumber(second.linkEl)) != null ? _b2 : 0);
    })[0]) == null ? void 0 : _g.linkEl) != null ? _h : null;
    for (let anchorPage = 0; anchorPage <= this.realPdfPageCount; anchorPage += 1) {
      const group = (_i = addedByAnchor.get(anchorPage)) != null ? _i : [];
      let cursor = anchorPage === 0 ? null : (_k = (_j = nativeByPage.get(anchorPage)) == null ? void 0 : _j.linkEl) != null ? _k : null;
      for (const entry of group) {
        const entryEl = createAddedEntry(entry);
        if (cursor) {
          cursor.insertAdjacentElement("afterend", entryEl);
        } else if (firstNativeLink) {
          firstNativeLink.insertAdjacentElement("beforebegin", entryEl);
        } else {
          thumbnailView.appendChild(entryEl);
        }
        cursor = entryEl;
      }
    }
    let footer = thumbnailView.querySelector(":scope > .pdf-native-annotator-native-page-footer");
    if (!footer) {
      footer = createEl("button");
      footer.type = "button";
      footer.className = "pdf-native-annotator-native-page-footer";
      (0, import_obsidian6.setIcon)(footer, "files");
      footer.createSpan({ cls: "pdf-native-annotator-native-page-footer-label", text: "Pages" });
      footer.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.openPageListPopover(event.currentTarget);
      });
      thumbnailView.appendChild(footer);
    }
    const removedCount = this.getRemovedPageEntries().length;
    footer.setAttribute("aria-label", removedCount > 0 ? `Manage pages, ${removedCount} removed` : "Manage pages");
    footer.title = removedCount > 0 ? `Pages - ${removedCount} removed` : "Pages";
    this.nativeMixedThumbnailSignature = signature;
    this.updateNativeMixedPageThumbnailSelection();
    if (restoreScroll && scrollParent) {
      this.restoreNativeThumbnailScroll(scrollParent, previousScrollTop, previousScrollHeight);
    }
  }
  restoreNativeThumbnailScroll(scrollParent, previousScrollTop, previousScrollHeight) {
    const restore = () => {
      if (!scrollParent.isConnected) {
        return;
      }
      const scrollHeightDelta = scrollParent.scrollHeight - previousScrollHeight;
      const maxScrollTop = Math.max(0, scrollParent.scrollHeight - scrollParent.clientHeight);
      scrollParent.scrollTop = clamp2(previousScrollTop + scrollHeightDelta, 0, maxScrollTop);
    };
    restore();
    if (this.thumbnailScrollRestoreHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.thumbnailScrollRestoreHandle);
    }
    this.thumbnailScrollRestoreHandle = this.ownerWindow.requestAnimationFrame(() => {
      this.thumbnailScrollRestoreHandle = null;
      restore();
    });
  }
  syncSyntheticPages(realPageEls) {
    var _a2;
    if (!this.annotationDocument || realPageEls.length === 0) {
      return;
    }
    const pages = (_a2 = this.annotationDocument.appendedPages) != null ? _a2 : [];
    const firstRealPage = realPageEls[0].pageEl;
    const pageContainer = this.getSyntheticPageContainer(firstRealPage);
    if (!pageContainer) {
      return;
    }
    this.syntheticPageContainer = pageContainer;
    this.isSyncingSyntheticPages = true;
    try {
      for (const existingPage of Array.from(pageContainer.querySelectorAll(".pdf-native-annotator-synthetic-page"))) {
        const index = Number(existingPage.dataset.pageNumber) - this.realPdfPageCount - 1;
        if (!Number.isInteger(index) || index < 0 || index >= pages.length) {
          existingPage.remove();
        }
      }
      const lastByAnchor = /* @__PURE__ */ new Map();
      pages.forEach((page, index) => {
        var _a3, _b;
        const pageNumber = this.realPdfPageCount + index + 1;
        let pageEl = pageContainer.querySelector(`.pdf-native-annotator-synthetic-page[data-page-number="${pageNumber}"]`);
        if (!pageEl) {
          pageEl = createDiv();
        }
        pageEl.classList.remove("page");
        pageEl.classList.add("pdf-native-annotator-synthetic-page");
        const anchor = this.getSyntheticPageInsertAfterPdfPage(page);
        this.updateSyntheticPageElement(pageEl, page, pageNumber, this.getSyntheticReferenceWidth(realPageEls, anchor));
        const previous = (_b = lastByAnchor.get(anchor)) != null ? _b : (_a3 = [...realPageEls].reverse().find((entry) => entry.pageNumber <= anchor)) == null ? void 0 : _a3.pageEl;
        const next = previous ? previous.nextElementSibling : firstRealPage;
        if (next !== pageEl) {
          pageContainer.insertBefore(pageEl, next);
        }
        lastByAnchor.set(anchor, pageEl);
      });
    } finally {
      this.isSyncingSyntheticPages = false;
    }
  }
  getSyntheticPageContainer(firstRealPage) {
    return firstRealPage.parentElement;
  }
  getSyntheticReferenceWidth(realPageEls, anchorPageNumber) {
    var _a2, _b;
    const exactAnchor = realPageEls.find((entry) => entry.pageNumber === anchorPageNumber);
    const previousAnchor = [...realPageEls].reverse().find((entry) => entry.pageNumber <= anchorPageNumber);
    const nextAnchor = realPageEls.find((entry) => entry.pageNumber >= anchorPageNumber);
    const anchor = (_b = (_a2 = exactAnchor != null ? exactAnchor : previousAnchor) != null ? _a2 : nextAnchor) != null ? _b : realPageEls[0];
    const width = anchor ? this.getRenderedPdfPageWidth(anchor.pageEl) : 0;
    if (width > 0) {
      return Math.floor(width);
    }
    const fallbackWidth = realPageEls.reduce((largest, entry) => Math.max(largest, this.getRenderedPdfPageWidth(entry.pageEl)), 0);
    return Math.max(24, Math.floor(fallbackWidth || 920));
  }
  getRenderedPdfPageWidth(pageEl) {
    var _a2;
    const hostEl = getOverlayHost(pageEl);
    const canvas = (_a2 = hostEl.querySelector("canvas")) != null ? _a2 : pageEl.querySelector("canvas");
    const hostRect = hostEl.getBoundingClientRect();
    const pageRect = pageEl.getBoundingClientRect();
    const canvasRectWidth = isHtmlCanvasElement(canvas) ? canvas.getBoundingClientRect().width : 0;
    return resolvePdfPageContentWidth({
      canvasRectWidth,
      canvasClientWidth: isHtmlCanvasElement(canvas) ? canvas.clientWidth : 0,
      hostRectWidth: hostRect.width,
      hostClientWidth: hostEl.clientWidth,
      pageRectWidth: pageRect.width,
      pageClientWidth: pageEl.clientWidth
    });
  }
  updateSyntheticPageElement(pageEl, page, pageNumber, referenceWidth) {
    var _a2;
    pageEl.dataset.pageNumber = String(pageNumber);
    pageEl.dataset.template = page.template;
    pageEl.dataset.pageSize = page.pageSize;
    pageEl.dataset.insertAfterPdfPage = String(this.getSyntheticPageInsertAfterPdfPage(page));
    const { width } = this.applySyntheticPageSize(pageEl, page, referenceWidth);
    this.applyPaperTemplateCssVariables(pageEl, width, page.paperColor);
    this.setStyleIfChanged(pageEl, "backgroundColor", page.paperColor);
    let hostEl = pageEl.querySelector(":scope > .canvasWrapper");
    if (!hostEl) {
      hostEl = createDiv();
      hostEl.className = "canvasWrapper pdf-native-annotator-synthetic-wrapper";
      pageEl.appendChild(hostEl);
    }
    this.setStyleIfChanged(hostEl, "width", "100%");
    this.setStyleIfChanged(hostEl, "height", "100%");
    this.setStyleIfChanged(hostEl, "backgroundColor", page.paperColor);
    let backgroundEl = hostEl.querySelector(":scope > .pdf-native-annotator-synthetic-background");
    if (!backgroundEl) {
      backgroundEl = createDiv();
      backgroundEl.className = "pdf-native-annotator-synthetic-background";
      hostEl.prepend(backgroundEl);
    }
    backgroundEl.dataset.template = page.template;
    this.applyCssTemplateBackground(backgroundEl, width, page.paperColor);
    (_a2 = hostEl.querySelector(":scope > .pdf-native-annotator-synthetic-label")) == null ? void 0 : _a2.remove();
  }
  applySyntheticPageSize(pageEl, page, referenceWidth) {
    const dimensions = getNotebookPageSizeDimensions(page.pageSize);
    const a4Dimensions = getNotebookPageSizeDimensions("a4");
    const scale = referenceWidth / a4Dimensions.width;
    const width = Math.max(24, Math.round(dimensions.width * scale));
    const height = Math.max(32, Math.round(dimensions.height * scale));
    this.setStyleIfChanged(pageEl, "width", `${width}px`);
    this.setStyleIfChanged(pageEl, "height", `${height}px`);
    this.setStyleIfChanged(pageEl, "aspectRatio", `${dimensions.width} / ${dimensions.height}`);
    return { width, height };
  }
  scheduleSyntheticPageZoomPreview() {
    var _a2, _b;
    if (this.syntheticZoomPreviewHandle !== null || !((_b = (_a2 = this.annotationDocument) == null ? void 0 : _a2.appendedPages) == null ? void 0 : _b.length)) {
      return;
    }
    this.syntheticZoomPreviewHandle = this.ownerWindow.requestAnimationFrame(() => {
      this.syntheticZoomPreviewHandle = null;
      this.previewSyntheticPageZoom();
    });
  }
  previewSyntheticPageZoom() {
    var _a2, _b;
    const pageContainer = this.syntheticPageContainer;
    const pages = (_b = (_a2 = this.annotationDocument) == null ? void 0 : _a2.appendedPages) != null ? _b : [];
    if (!(pageContainer == null ? void 0 : pageContainer.isConnected) || pages.length === 0) {
      return;
    }
    pages.forEach((page, index) => {
      const pageNumber = this.realPdfPageCount + index + 1;
      const pageEl = pageContainer.querySelector(
        `.pdf-native-annotator-synthetic-page[data-page-number="${pageNumber}"]`
      );
      if (!pageEl) {
        return;
      }
      const anchorPageNumber = this.getSyntheticPageInsertAfterPdfPage(page);
      const referenceWidth = this.getSyntheticPreviewReferenceWidth(anchorPageNumber);
      const { width } = this.applySyntheticPageSize(pageEl, page, referenceWidth);
      this.applyPaperTemplateCssVariables(pageEl, width, page.paperColor);
      const backgroundEl = pageEl.querySelector(
        ":scope > .canvasWrapper > .pdf-native-annotator-synthetic-background"
      );
      if (backgroundEl) {
        this.applyCssTemplateBackground(backgroundEl, width, page.paperColor);
      }
    });
  }
  getSyntheticPreviewReferenceWidth(anchorPageNumber) {
    var _a2, _b;
    const candidates = [
      clamp2(anchorPageNumber, 1, Math.max(this.realPdfPageCount, 1)),
      (_b = (_a2 = this.zoomScrollAnchor) == null ? void 0 : _a2.pageNumber) != null ? _b : 0,
      this.currentPage,
      1
    ];
    for (const pageNumber of candidates) {
      if (pageNumber < 1 || pageNumber > this.realPdfPageCount) {
        continue;
      }
      const surface = this.pageSurfaces.get(pageNumber);
      if (!(surface == null ? void 0 : surface.pageEl.isConnected)) {
        continue;
      }
      const width = this.getRenderedPdfPageWidth(surface.pageEl);
      if (width > 0) {
        return Math.floor(width);
      }
    }
    return 920;
  }
  applyPaperTemplateCssVariables(element, width, paperColor) {
    const metrics = getPaperTemplateMetrics(width);
    this.setStylePropertyIfChanged(element, "--annotator-template-step", `${Math.max(3, metrics.graphStep)}px`);
    this.setStylePropertyIfChanged(element, "--annotator-template-ruled-step", `${Math.max(4, metrics.ruledStep)}px`);
    this.setStylePropertyIfChanged(element, "--annotator-template-dot-step", `${Math.max(3, metrics.dotStep)}px`);
    this.setStylePropertyIfChanged(element, "--annotator-template-dot-size", `${metrics.dotRadius}px`);
    this.setStylePropertyIfChanged(element, "--annotator-template-ruled-offset", `${Math.max(8, metrics.ruledOffset)}px`);
    this.setStylePropertyIfChanged(element, "--annotator-template-line-width", `${Math.max(1, width / getNotebookPageSizeDimensions("a4").width)}px`);
    this.setStylePropertyIfChanged(element, "--annotator-template-line-color", PAPER_TEMPLATE_LINE_COLOR);
    this.setStylePropertyIfChanged(element, "--annotator-template-grid-color", PAPER_TEMPLATE_GRID_COLOR);
    this.setStylePropertyIfChanged(element, "--annotator-template-dot-color", PAPER_TEMPLATE_DOT_COLOR);
    this.setStylePropertyIfChanged(element, "--annotator-template-paper-color", paperColor);
  }
  setStyleIfChanged(element, property, value) {
    const cssProperty = String(property).replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
    if (element.style.getPropertyValue(cssProperty) === value) {
      return;
    }
    element.setCssProps({ [cssProperty]: value });
  }
  setStylePropertyIfChanged(element, property, value) {
    if (element.style.getPropertyValue(property) === value) {
      return;
    }
    element.setCssProps({ [property]: value });
  }
  ensurePageSurface(pageEl, pageNumber) {
    var _a2;
    const hostEl = getOverlayHost(pageEl);
    if (!hostEl.isConnected) {
      return;
    }
    const existing = this.pageSurfaces.get(pageNumber);
    if (existing && existing.pageEl === pageEl && existing.hostEl === hostEl) {
      this.ensureOverlayLayerOrder(existing);
      this.resizeOverlay(existing, true);
      return;
    }
    if (existing) {
      (_a2 = this.pageResizeObservers.get(pageNumber)) == null ? void 0 : _a2.disconnect();
      this.pageResizeObservers.delete(pageNumber);
      this.cancelPageRenderJob(pageNumber);
      this.pageRenderSlots.delete(pageNumber);
      existing.overlayEl.remove();
      existing.transientEl.remove();
    }
    if (this.ownerWindow.getComputedStyle(hostEl).position === "static") {
      hostEl.setCssStyles({ position: "relative" });
    }
    let overlayEl = hostEl.querySelector(`:scope > .${OVERLAY_CLASS}`);
    if (!overlayEl) {
      overlayEl = createEl("canvas");
      overlayEl.className = OVERLAY_CLASS;
      hostEl.appendChild(overlayEl);
      overlayEl.addEventListener("pointerenter", this.handlePointerEnter);
      overlayEl.addEventListener("pointerdown", this.handlePointerDown);
      overlayEl.addEventListener("pointermove", this.handlePointerMove);
      overlayEl.addEventListener("pointerup", this.handlePointerUp);
      overlayEl.addEventListener("pointercancel", this.handlePointerCancel);
      overlayEl.addEventListener("pointerleave", this.handlePointerLeave);
    }
    overlayEl.dataset.pageNumber = String(pageNumber);
    let transientEl = hostEl.querySelector(":scope > .pdf-native-annotator-transient");
    if (!transientEl) {
      transientEl = createEl("canvas");
      transientEl.className = "pdf-native-annotator-transient";
      hostEl.appendChild(transientEl);
    }
    const surface = {
      pageNumber,
      pageEl,
      hostEl,
      overlayEl,
      transientEl,
      lastWidth: 0,
      lastHeight: 0,
      pendingWidth: 0,
      pendingHeight: 0
    };
    this.pageSurfaces.set(pageNumber, surface);
    this.observePageSurface(surface);
    this.ensureOverlayLayerOrder(surface);
    this.resizeOverlay(surface);
  }
  ensureOverlayLayerOrder(surface) {
    if (!surface.overlayEl.isConnected || surface.overlayEl.parentElement !== surface.hostEl) {
      surface.hostEl.appendChild(surface.overlayEl);
    }
    if (!surface.transientEl.isConnected || surface.transientEl.parentElement !== surface.hostEl) {
      surface.hostEl.appendChild(surface.transientEl);
    }
    if (surface.transientEl.previousElementSibling !== surface.overlayEl || surface.hostEl.lastElementChild !== surface.transientEl) {
      surface.hostEl.appendChild(surface.overlayEl);
      surface.hostEl.appendChild(surface.transientEl);
    }
    surface.overlayEl.setCssStyles({ zIndex: "9990" });
    surface.transientEl.setCssStyles({ zIndex: "9991" });
  }
  observePageSurface(surface) {
    var _a2;
    if (typeof ResizeObserver === "undefined") {
      return;
    }
    (_a2 = this.pageResizeObservers.get(surface.pageNumber)) == null ? void 0 : _a2.disconnect();
    const observer = new ResizeObserver(() => {
      var _a3, _b;
      const shouldPreview = this.shouldKeepPageHot(surface.pageNumber) || ((_a3 = this.zoomScrollAnchor) == null ? void 0 : _a3.pageNumber) === surface.pageNumber || this.inlineTextPageNumber === surface.pageNumber;
      if (!shouldPreview) {
        return;
      }
      this.previewResizeOverlay(surface);
      if (!surface.pageEl.classList.contains("pdf-native-annotator-synthetic-page")) {
        this.scheduleSyntheticPageZoomPreview();
      }
      if (((_b = this.zoomScrollAnchor) == null ? void 0 : _b.pageNumber) === surface.pageNumber) {
        this.restoreZoomScrollAnchor();
      }
      this.markPageZooming(surface.pageNumber);
    });
    observer.observe(surface.hostEl);
    this.pageResizeObservers.set(surface.pageNumber, observer);
  }
  markPageZooming(pageNumber) {
    this.zoomingPages.add(pageNumber);
    this.scheduleFinishZoomingPages();
  }
  scheduleFinishZoomingPages() {
    if (this.zoomSettleHandle !== null) {
      this.ownerWindow.clearTimeout(this.zoomSettleHandle);
    }
    this.zoomSettleHandle = this.ownerWindow.setTimeout(() => {
      this.finishZoomingPages();
    }, ZOOM_SETTLE_DELAY_MS);
  }
  finishZoomingPages() {
    var _a2, _b;
    if (this.zoomSettleHandle !== null) {
      this.ownerWindow.clearTimeout(this.zoomSettleHandle);
      this.zoomSettleHandle = null;
    }
    const pages = Array.from(this.zoomingPages);
    this.zoomingPages.clear();
    let needsSurfaceSync = false;
    for (const pageNumber of pages) {
      const surface = this.pageSurfaces.get(pageNumber);
      if (!surface || !surface.hostEl.isConnected || surface.overlayEl.parentElement !== surface.hostEl || surface.transientEl.parentElement !== surface.hostEl) {
        needsSurfaceSync = true;
        continue;
      }
      this.ensureOverlayLayerOrder(surface);
      this.resizeOverlay(surface, true);
      surface.overlayEl.setCssStyles({ opacity: "1" });
      this.schedulePageRedraw(pageNumber);
    }
    if (needsSurfaceSync || ((_b = (_a2 = this.annotationDocument) == null ? void 0 : _a2.appendedPages) == null ? void 0 : _b.length)) {
      this.scheduleSyncPages();
    }
    this.scheduleZoomScrollAnchorRestore();
  }
  previewResizeOverlay(surface) {
    const size = this.getStableSurfaceSize(surface);
    if (!size) {
      return;
    }
    const { width, height } = size;
    const previousWidth = surface.pendingWidth || surface.lastWidth;
    const previousHeight = surface.pendingHeight || surface.lastHeight;
    surface.pendingWidth = width;
    surface.pendingHeight = height;
    if (width !== previousWidth || height !== previousHeight) {
      this.resizeInlineTextEditorForSurface(surface, previousWidth, previousHeight, width, height);
    }
    const previewScale = width / Math.max(surface.lastWidth, 1);
    surface.overlayEl.setCssStyles({
      width: `${surface.lastWidth}px`,
      height: `${surface.lastHeight}px`,
      transformOrigin: "0 0",
      transform: `scale(${previewScale})`
    });
    surface.transientEl.setCssStyles({
      width: `${surface.lastWidth}px`,
      height: `${surface.lastHeight}px`,
      transformOrigin: "0 0",
      transform: `scale(${previewScale})`
    });
  }
  syncCanvasBackingSize(canvas, width, height, preservePixels = false) {
    var _a2, _b;
    const ownerWindow = canvas.ownerDocument.defaultView;
    const ratio = (ownerWindow == null ? void 0 : ownerWindow.devicePixelRatio) || this.ownerWindow.devicePixelRatio || 1;
    const pixelWidth = Math.max(1, Math.floor(width * ratio));
    const pixelHeight = Math.max(1, Math.floor(height * ratio));
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      this.publishedFrames.delete(canvas);
      let previousFrame = null;
      if (preservePixels && canvas.width > 0 && canvas.height > 0) {
        previousFrame = canvas.ownerDocument.createElement("canvas");
        previousFrame.width = canvas.width;
        previousFrame.height = canvas.height;
        (_a2 = previousFrame.getContext("2d")) == null ? void 0 : _a2.drawImage(canvas, 0, 0);
      }
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
      if (previousFrame) {
        (_b = canvas.getContext("2d")) == null ? void 0 : _b.drawImage(previousFrame, 0, 0, pixelWidth, pixelHeight);
      }
    }
  }
  resizeOverlay(surface, preserveVisibleFrame = false) {
    const size = this.getStableSurfaceSize(surface, true);
    if (!size) {
      return;
    }
    const { width, height } = size;
    const previousWidth = surface.pendingWidth || surface.lastWidth;
    const previousHeight = surface.pendingHeight || surface.lastHeight;
    const sizeChanged = width !== surface.lastWidth || height !== surface.lastHeight;
    this.syncPdfPageTemplateBackground(surface, width, height);
    surface.overlayEl.setCssStyles({
      width: `${width}px`,
      height: `${height}px`,
      transformOrigin: "0 0",
      transform: "none"
    });
    surface.transientEl.setCssStyles({
      width: `${width}px`,
      height: `${height}px`,
      transformOrigin: "0 0",
      transform: "none"
    });
    if (!sizeChanged && preserveVisibleFrame) {
      return;
    }
    if (!preserveVisibleFrame) {
      this.syncCanvasBackingSize(surface.overlayEl, width, height);
      this.syncCanvasBackingSize(surface.transientEl, width, height);
    }
    surface.lastWidth = width;
    surface.lastHeight = height;
    surface.pendingWidth = width;
    surface.pendingHeight = height;
    if (sizeChanged) {
      this.resizeInlineTextEditorForSurface(surface, previousWidth, previousHeight);
    }
  }
  syncPdfPageTemplateBackground(surface, width, height) {
    const pageTemplate = this.getPdfPageTemplate(surface.pageNumber);
    let backgroundEl = surface.hostEl.querySelector(":scope > .pdf-native-annotator-template-background");
    if (!pageTemplate || !this.canEditPdfPageTemplate(surface.pageNumber)) {
      backgroundEl == null ? void 0 : backgroundEl.remove();
      return;
    }
    if (!backgroundEl) {
      backgroundEl = createDiv();
      backgroundEl.className = "pdf-native-annotator-template-background pdf-native-annotator-synthetic-background";
      surface.hostEl.appendChild(backgroundEl);
      this.ensureOverlayLayerOrder(surface);
    }
    backgroundEl.dataset.template = pageTemplate.template;
    this.applyCssTemplateBackground(backgroundEl, width, pageTemplate.paperColor);
    this.setStyleIfChanged(backgroundEl, "width", `${width}px`);
    this.setStyleIfChanged(backgroundEl, "height", `${height}px`);
  }
  applyCssTemplateBackground(element, width, paperColor) {
    this.applyPaperTemplateCssVariables(element, width, paperColor);
    this.setStyleIfChanged(element, "backgroundColor", paperColor);
    this.setStyleIfChanged(element, "backgroundImage", "");
    this.setStyleIfChanged(element, "backgroundSize", "");
    this.setStyleIfChanged(element, "backgroundRepeat", "");
    this.setStyleIfChanged(element, "backgroundPosition", "");
  }
  getPdfPageTemplate(pageNumber) {
    var _a2, _b;
    const pageTemplates = (_a2 = this.annotationDocument) == null ? void 0 : _a2.pdfPageTemplates;
    if (!(pageTemplates == null ? void 0 : pageTemplates.length) || pageNumber < 1 || pageNumber > this.realPdfPageCount) {
      return null;
    }
    return (_b = pageTemplates.find((pageTemplate) => pageTemplate.page === pageNumber)) != null ? _b : null;
  }
  canEditPdfPageTemplate(pageNumber) {
    return !!this.annotationDocument && hasEditableNativePageTemplates(this.annotationDocument, this.realPdfPageCount) && this.getPdfPageTemplate(pageNumber) !== null;
  }
  ensurePdfPageTemplate(pageNumber) {
    return this.canEditPdfPageTemplate(pageNumber) ? this.getPdfPageTemplate(pageNumber) : null;
  }
  setPdfPageTemplateByPage(pageNumber, template) {
    const pageTemplate = this.ensurePdfPageTemplate(pageNumber);
    if (!pageTemplate) {
      new import_obsidian6.Notice("Template editing is only available for PDFs created by this plugin.");
      return;
    }
    if (pageTemplate.template === template) {
      return;
    }
    this.pushHistory();
    pageTemplate.template = template;
    this.markDirtyAndRedraw(`Template changed to ${getNotebookTemplateLabel(template)}`);
    this.refreshSyntheticPages(pageNumber);
    this.drawPageAnnotations(pageNumber);
  }
  setPdfPagePaperColorByPage(pageNumber, color) {
    const pageTemplate = this.ensurePdfPageTemplate(pageNumber);
    if (!pageTemplate) {
      new import_obsidian6.Notice("Paper color editing is only available for PDFs created by this plugin.");
      return;
    }
    if (pageTemplate.paperColor.toLowerCase() === color.toLowerCase()) {
      return;
    }
    this.pushHistory();
    pageTemplate.paperColor = color;
    this.markDirtyAndRedraw("Paper color changed");
    this.refreshSyntheticPages(pageNumber);
    this.drawPageAnnotations(pageNumber);
  }
  getStableSurfaceSize(surface, allowLastKnown = false) {
    const rect = surface.hostEl.getBoundingClientRect();
    const width = Math.floor(rect.width || surface.hostEl.clientWidth || surface.pageEl.clientWidth || 0);
    const height = Math.floor(rect.height || surface.hostEl.clientHeight || surface.pageEl.clientHeight || 0);
    if (width > 2 && height > 2) {
      return { width, height };
    }
    if (allowLastKnown && surface.lastWidth > 2 && surface.lastHeight > 2) {
      return { width: surface.lastWidth, height: surface.lastHeight };
    }
    if (allowLastKnown && surface.pendingWidth > 2 && surface.pendingHeight > 2) {
      return { width: surface.pendingWidth, height: surface.pendingHeight };
    }
    return null;
  }
  bindScrollParent(pageEl) {
    const nextScrollParent = findScrollParent(pageEl);
    if (this.scrollParent === nextScrollParent) {
      return;
    }
    if (this.scrollParent) {
      this.scrollParent.removeEventListener("scroll", this.handleScroll, { capture: false });
    }
    this.scrollParent = nextScrollParent;
    this.scrollParent.addEventListener("scroll", this.handleScroll, { passive: true });
  }
  captureVisualViewportBaseline() {
    const viewport = this.ownerWindow.visualViewport;
    if (!viewport || Math.abs(viewport.scale - 1) >= 0.05) {
      return;
    }
    this.visualViewportBaselineHeight = Math.max(
      this.visualViewportBaselineHeight,
      viewport.height,
      this.ownerWindow.innerHeight
    );
  }
  keepInlineTextEditorAboveKeyboard() {
    var _a2;
    const frame = this.inlineTextEditorFrameEl;
    const editor = this.inlineTextEditorEl;
    const viewport = this.ownerWindow.visualViewport;
    const scrollEl = ((_a2 = this.scrollParent) == null ? void 0 : _a2.isConnected) ? this.scrollParent : frame ? findScrollParent(frame) : null;
    if (!frame || !editor || !viewport || !scrollEl || editor.ownerDocument.activeElement !== editor) {
      return;
    }
    const keyboardRaised = Math.abs(viewport.scale - 1) < 0.05 && viewport.height < Math.max(this.visualViewportBaselineHeight, this.ownerWindow.innerHeight) - 80;
    if (!keyboardRaised) {
      return;
    }
    const rect = frame.getBoundingClientRect();
    const safeTop = viewport.offsetTop + 72;
    const safeBottom = viewport.offsetTop + viewport.height - 48;
    let deltaY = 0;
    if (rect.height >= safeBottom - safeTop) {
      deltaY = rect.top - safeTop;
    } else if (rect.bottom > safeBottom) {
      deltaY = rect.bottom - safeBottom;
    } else if (rect.top < safeTop) {
      deltaY = rect.top - safeTop;
    }
    if (Math.abs(deltaY) < 1) {
      return;
    }
    const maxScrollTop = Math.max(0, scrollEl.scrollHeight - scrollEl.clientHeight);
    scrollEl.scrollTop = clamp2(scrollEl.scrollTop + deltaY, 0, maxScrollTop);
  }
  clearLayoutRefreshHandles() {
    for (const handle of this.layoutRefreshHandles) {
      this.ownerWindow.clearTimeout(handle);
    }
    this.layoutRefreshHandles = [];
  }
  scheduleLayoutRefresh() {
    if (!this.file || !this.annotationDocument) {
      return;
    }
    this.clearLayoutRefreshHandles();
    const handle = this.ownerWindow.setTimeout(() => {
      this.layoutRefreshHandles = this.layoutRefreshHandles.filter((pendingHandle) => pendingHandle !== handle);
      if (this.hasActiveTransientRender() || this.isViewportMotionActive()) {
        this.scheduleLayoutRefresh();
        return;
      }
      this.syncPages(false);
      this.forceRedrawVisibleAnnotations();
      this.scheduleZoomScrollAnchorRestore(true);
    }, 220);
    this.layoutRefreshHandles.push(handle);
  }
  forceRedrawAllAnnotations() {
    if (!this.annotationDocument) {
      return;
    }
    this.zoomingPages.clear();
    this.pendingRedrawPages.clear();
    this.updateCurrentPageFromScroll();
    this.updateVisiblePageRange(false);
    const pageNumbers = prioritizeRenderPages(this.pageSurfaces.keys(), this.currentPage, this.pointerPage);
    for (const pageNumber of pageNumbers) {
      const surface = this.pageSurfaces.get(pageNumber);
      if (!surface) {
        continue;
      }
      surface.overlayEl.setCssStyles({ visibility: "visible" });
      this.ensureOverlayLayerOrder(surface);
      this.startPageRenderJob(pageNumber);
    }
  }
  getPageFrameKey(surface) {
    return JSON.stringify([this.documentRevision, surface.lastWidth, surface.lastHeight, this.ownerWindow.devicePixelRatio, this.selectedTargets, this.inlineTextTargetId, this.inlineTextPageNumber, this.lastSelectionRegion, this.focusedRegion]);
  }
  forceRedrawVisibleAnnotations() {
    if (!this.annotationDocument) {
      return;
    }
    this.updateCurrentPageFromScroll();
    this.updateVisiblePageRange(false);
    const visiblePages = [];
    for (const pageNumber of this.pageSurfaces.keys()) {
      const shouldDraw = pageNumber === this.currentPage || pageNumber === this.pointerPage || this.isPageNearViewport(pageNumber) || !!this.visiblePageRange && pageNumber >= this.visiblePageRange.start && pageNumber <= this.visiblePageRange.end;
      if (!shouldDraw) {
        continue;
      }
      visiblePages.push(pageNumber);
    }
    for (const pageNumber of prioritizeRenderPages(visiblePages, this.currentPage, this.pointerPage)) {
      const surface = this.pageSurfaces.get(pageNumber);
      if (!surface) {
        continue;
      }
      this.zoomingPages.delete(pageNumber);
      surface.overlayEl.setCssStyles({ visibility: "visible" });
      this.ensureOverlayLayerOrder(surface);
      if (this.publishedFrames.get(surface.overlayEl) !== this.getPageFrameKey(surface)) {
        this.startPageRenderJob(pageNumber);
      }
    }
    if (visiblePages.length === 0) {
      this.syncPages();
      this.forceRedrawAllAnnotations();
    }
  }
  schedulePageRedraw(pageNumber) {
    if (!this.shouldKeepPageHot(pageNumber)) {
      return;
    }
    if (this.zoomingPages.has(pageNumber)) {
      return;
    }
    this.pendingRedrawPages.add(pageNumber);
    if (this.hasActiveTransientRender()) {
      return;
    }
    if (this.isPdfScrolling && !this.currentStroke && !this.currentShape && !this.currentLasso) {
      return;
    }
    if (this.redrawHandle !== null) {
      return;
    }
    this.redrawHandle = this.ownerWindow.requestAnimationFrame(() => {
      this.redrawHandle = null;
      if (this.hasActiveTransientRender()) {
        return;
      }
      const pendingPages = Array.from(this.pendingRedrawPages);
      this.pendingRedrawPages.clear();
      for (const pendingPage of pendingPages) {
        const shouldDraw = pendingPage === this.currentPage || pendingPage === this.pointerPage || this.shouldKeepPageHot(pendingPage);
        if (shouldDraw) {
          this.startPageRenderJob(pendingPage);
        }
      }
    });
  }
  getNextPageRenderSlot(surface) {
    let pool = this.pageRenderSlots.get(surface.pageNumber);
    if (!pool) {
      pool = {
        canvases: [createEl("canvas"), createEl("canvas"), createEl("canvas")],
        nextIndex: 0
      };
      this.pageRenderSlots.set(surface.pageNumber, pool);
    }
    const canvas = pool.canvases[pool.nextIndex];
    pool.nextIndex = (pool.nextIndex + 1) % pool.canvases.length;
    const ratio = this.ownerWindow.devicePixelRatio || 1;
    const pixelWidth = Math.max(1, Math.floor(surface.lastWidth * ratio));
    const pixelHeight = Math.max(1, Math.floor(surface.lastHeight * ratio));
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth;
      canvas.height = pixelHeight;
    }
    return canvas;
  }
  startPageRenderJob(pageNumber) {
    var _a2, _b;
    if (this.isViewportMotionActive()) {
      this.pendingRedrawPages.add(pageNumber);
      return;
    }
    if (this.hasActiveTransientRender() || !this.annotationDocument) {
      return;
    }
    const surface = this.pageSurfaces.get(pageNumber);
    if (!surface || !surface.overlayEl.isConnected || !surface.hostEl.isConnected) {
      return;
    }
    this.ensureOverlayLayerOrder(surface);
    this.resizeOverlay(surface, true);
    const canvas = this.getNextPageRenderSlot(surface);
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    const ratio = this.ownerWindow.devicePixelRatio || 1;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const bucket = this.getPageAnnotationBucket(pageNumber);
    const steps = [];
    for (const imageItem of bucket.imageItems) {
      steps.push({
        run: () => this.drawImageAnnotation(context, surface, imageItem),
        expensive: true
      });
    }
    const renderables = getAnnotationRenderables(bucket.strokes, bucket.textItems, bucket.shapes);
    for (const renderable of renderables) {
      if (renderable.kind === "stroke") {
        steps.push({
          run: () => this.drawStroke(context, surface, renderable.annotation),
          expensive: true
        });
      } else if (renderable.kind === "text") {
        if (this.inlineTextTargetId !== renderable.annotation.id || this.inlineTextPageNumber !== pageNumber) {
          steps.push({
            run: () => this.drawText(context, surface, renderable.annotation),
            expensive: false
          });
        }
      } else if (renderable.kind === "shape") {
        steps.push({
          run: () => this.drawShape(context, surface, renderable.annotation),
          expensive: false
        });
      }
    }
    const inlinePreviewText = this.getInlineTextPreviewItem(pageNumber);
    if (inlinePreviewText && !this.inlineTextEditorEl) {
      steps.push({
        run: () => this.drawText(context, surface, inlinePreviewText),
        expensive: false
      });
    }
    const pageSelections = this.selectedTargets.filter((target) => target.page === pageNumber);
    if (pageSelections.length > 0) {
      steps.push({
        run: () => this.drawSelection(context, surface, pageSelections),
        expensive: false
      });
    }
    if (((_a2 = this.lastSelectionRegion) == null ? void 0 : _a2.page) === pageNumber) {
      const rect = this.lastSelectionRegion.rect;
      steps.push({
        run: () => this.drawFocusedRegion(context, surface, rect),
        expensive: false
      });
    }
    if (this.focusedRegion && this.focusedRegionPage === pageNumber) {
      const rect = this.focusedRegion;
      steps.push({
        run: () => this.drawFocusedRegion(context, surface, rect),
        expensive: false
      });
    }
    const version = ((_b = this.pageRenderVersions.get(pageNumber)) != null ? _b : 0) + 1;
    this.pageRenderVersions.set(pageNumber, version);
    this.pageRenderJobs.set(pageNumber, {
      pageNumber,
      canvas,
      steps,
      nextStep: 0,
      lastProgressAt: performance.now(),
      width: surface.lastWidth,
      height: surface.lastHeight,
      version,
      frameKey: this.getPageFrameKey(surface),
      inputEpoch: this.renderInputEpoch
    });
    this.renderTelemetry.recordRenderQueued(pageNumber, steps.length, this.pageRenderJobs.size);
    this.schedulePageRenderJobs();
  }
  schedulePageRenderJobs() {
    if (this.pageRenderTaskHandle !== null || this.pageRenderJobs.size === 0) {
      return;
    }
    this.pageRenderTaskHandle = this.ownerWindow.setTimeout(() => {
      this.pageRenderTaskHandle = null;
      if (this.isFingerPanRenderingPaused()) {
        this.cancelPageRenderJobs("cancelled by finger pan");
        return;
      }
      if (this.hasActiveTransientRender()) {
        this.cancelPageRenderJobs();
        return;
      }
      const pageNumber = prioritizeRenderPages(Array.from(this.pageRenderJobs.keys()), this.currentPage, this.pointerPage)[0];
      const job = this.pageRenderJobs.get(pageNumber);
      if (!job) {
        this.renderTelemetry.recordRenderIdle("no active render jobs");
        return;
      }
      const surface = this.pageSurfaces.get(pageNumber);
      if (!surface || surface.lastWidth !== job.width || surface.lastHeight !== job.height) {
        this.pageRenderJobs.delete(pageNumber);
        if (this.pageRenderJobs.size === 0) {
          this.renderTelemetry.recordRenderIdle("render invalidated by layout");
        }
        this.schedulePageRenderJobs();
        return;
      }
      const sliceStart = performance.now();
      const allowInputYield = sliceStart - job.lastProgressAt < 48;
      const previousStep = job.nextStep;
      const result = runCooperativeRenderSlice(job.steps, job.nextStep, {
        budgetMs: 4,
        now: () => performance.now(),
        isInputPending: () => allowInputYield && this.isBrowserInputPending()
      });
      job.nextStep = result.nextStep;
      if (job.nextStep > previousStep) {
        job.lastProgressAt = performance.now();
      }
      this.renderTelemetry.recordRenderProgress(
        pageNumber,
        job.nextStep,
        job.steps.length,
        this.pageRenderJobs.size,
        performance.now() - sliceStart,
        result.inputPending
      );
      const canSwap = !allowInputYield || !result.inputPending && !this.isBrowserInputPending();
      if (job.nextStep >= job.steps.length && canSwap) {
        this.pageRenderJobs.delete(pageNumber);
        if (!this.hasActiveTransientRender()) {
          this.pageRenderPublications.set(pageNumber, job.version);
          this.renderTelemetry.recordRenderPublishing(pageNumber, this.pageRenderJobs.size + this.pageRenderPublications.size);
          void this.publishPageRenderSnapshot(job, surface);
        }
      }
      this.schedulePageRenderJobs();
    }, 0);
  }
  isBrowserInputPending() {
    var _a2, _b;
    const scheduling = navigator.scheduling;
    return (_b = (_a2 = scheduling == null ? void 0 : scheduling.isInputPending) == null ? void 0 : _a2.call(scheduling)) != null ? _b : false;
  }
  cancelPageRenderJob(pageNumber) {
    var _a2;
    const cancelled = this.pageRenderJobs.delete(pageNumber);
    const publishing = this.pageRenderPublications.delete(pageNumber);
    this.pageRenderVersions.set(pageNumber, ((_a2 = this.pageRenderVersions.get(pageNumber)) != null ? _a2 : 0) + 1);
    if (this.pageRenderJobs.size === 0 && this.pageRenderTaskHandle !== null) {
      this.ownerWindow.clearTimeout(this.pageRenderTaskHandle);
      this.pageRenderTaskHandle = null;
    }
    if ((cancelled || publishing) && this.pageRenderJobs.size === 0 && this.pageRenderPublications.size === 0) {
      this.renderTelemetry.recordRenderCancelled("page render invalidated");
    }
  }
  async publishPageRenderSnapshot(job, surface) {
    let snapshot = null;
    try {
      snapshot = await this.createCanvasSnapshot(job.canvas);
      const currentSurface = this.pageSurfaces.get(job.pageNumber);
      const isCurrent = currentSurface === surface && surface.overlayEl.isConnected && surface.lastWidth === job.width && surface.lastHeight === job.height && this.pageRenderVersions.get(job.pageNumber) === job.version && this.pageRenderPublications.get(job.pageNumber) === job.version && this.renderInputEpoch === job.inputEpoch && job.frameKey === this.getPageFrameKey(surface) && !this.hasActiveTransientRender();
      if (!isCurrent) {
        return;
      }
      const targetContext = surface.overlayEl.getContext("2d");
      if (!targetContext) {
        return;
      }
      this.syncCanvasBackingSize(surface.overlayEl, job.width, job.height);
      targetContext.save();
      targetContext.setTransform(1, 0, 0, 1, 0, 0);
      targetContext.clearRect(0, 0, surface.overlayEl.width, surface.overlayEl.height);
      targetContext.drawImage(snapshot.image, 0, 0, surface.overlayEl.width, surface.overlayEl.height);
      targetContext.restore();
      this.publishedFrames.set(surface.overlayEl, job.frameKey);
      this.renderTelemetry.recordRenderComplete(job.pageNumber);
    } catch (error) {
      console.warn("freedraw-pdf: asynchronous canvas publication failed", error);
      this.renderTelemetry.recordRenderCancelled("snapshot publication failed");
    } finally {
      snapshot == null ? void 0 : snapshot.dispose();
      if (this.pageRenderPublications.get(job.pageNumber) === job.version) {
        this.pageRenderPublications.delete(job.pageNumber);
      }
      if (this.pageRenderJobs.size === 0 && this.pageRenderPublications.size === 0) {
        this.renderTelemetry.recordRenderIdle("render queue empty");
      }
    }
  }
  async createCanvasSnapshot(source) {
    var _a2;
    const ownerWindow = source.ownerDocument.defaultView;
    if (ownerWindow && typeof ownerWindow.createImageBitmap === "function") {
      const bitmap = await ownerWindow.createImageBitmap(source);
      return {
        image: bitmap,
        dispose: () => bitmap.close()
      };
    }
    const blob = await new Promise((resolve, reject) => {
      source.toBlob((result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new Error("Canvas snapshot returned no image data"));
        }
      }, "image/png");
    });
    const image = createEl("img");
    const urlApi = (_a2 = ownerWindow == null ? void 0 : ownerWindow.URL) != null ? _a2 : URL;
    const objectUrl = urlApi.createObjectURL(blob);
    image.src = objectUrl;
    if (typeof image.decode === "function") {
      await image.decode();
    } else {
      await new Promise((resolve, reject) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => reject(new Error("Canvas snapshot image failed to load")), { once: true });
      });
    }
    return {
      image,
      dispose: () => urlApi.revokeObjectURL(objectUrl)
    };
  }
  publishRenderedCanvas(source, target) {
    const context = target.getContext("2d");
    if (!context) {
      return;
    }
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, target.width, target.height);
    context.drawImage(source, 0, 0, target.width, target.height);
    context.restore();
  }
  cancelPageRenderJobs(reason = "cancelled") {
    const hadJobs = this.pageRenderJobs.size > 0 || this.pageRenderPublications.size > 0;
    this.renderInputEpoch += 1;
    if (this.pageRenderTaskHandle !== null) {
      this.ownerWindow.clearTimeout(this.pageRenderTaskHandle);
      this.pageRenderTaskHandle = null;
    }
    this.pageRenderJobs.clear();
    this.pageRenderPublications.clear();
    if (hadJobs) {
      this.renderTelemetry.recordRenderCancelled(reason);
    }
  }
  flushDeferredScrollRedraws() {
    if (this.redrawHandle !== null) {
      return;
    }
    if (this.hasActiveTransientRender()) {
      return;
    }
    const pendingPages = Array.from(this.pendingRedrawPages);
    this.pendingRedrawPages.clear();
    for (const pendingPage of pendingPages) {
      if (this.shouldKeepPageHot(pendingPage) && !this.zoomingPages.has(pendingPage)) {
        this.startPageRenderJob(pendingPage);
      }
    }
  }
  scheduleInteractionRedraw(pageNumber) {
    if (this.currentStroke || this.currentShape || this.currentLasso || this.erasingSession) {
      this.pendingInteractionRedrawPages.add(pageNumber);
      if (this.interactionRedrawHandle !== null) {
        return;
      }
      this.interactionRedrawHandle = this.ownerWindow.requestAnimationFrame(() => {
        this.interactionRedrawHandle = null;
        const pages = Array.from(this.pendingInteractionRedrawPages);
        this.pendingInteractionRedrawPages.clear();
        for (const pendingPage of pages) {
          this.drawTransientPageAnnotations(pendingPage);
        }
      });
      return;
    }
    this.pendingInteractionRedrawPages.add(pageNumber);
    if (this.interactionRedrawHandle !== null) {
      return;
    }
    this.interactionRedrawHandle = this.ownerWindow.requestAnimationFrame(() => {
      this.interactionRedrawHandle = null;
      const pages = Array.from(this.pendingInteractionRedrawPages);
      this.pendingInteractionRedrawPages.clear();
      for (const pendingPage of pages) {
        this.drawPageAnnotations(pendingPage);
      }
    });
  }
  flushInteractionRedraw(pageNumber) {
    if (this.interactionRedrawHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.interactionRedrawHandle);
      this.interactionRedrawHandle = null;
    }
    const pages = pageNumber ? [pageNumber] : Array.from(this.pendingInteractionRedrawPages);
    this.pendingInteractionRedrawPages.clear();
    for (const pendingPage of pages) {
      this.drawPageAnnotations(pendingPage);
    }
  }
  deferCommittedPageRedraw(pageNumber, clearTransient = true) {
    this.cancelPendingInteractionRedraw();
    const surface = this.pageSurfaces.get(pageNumber);
    if (surface && clearTransient) {
      this.clearTransientLayer(surface);
    }
    this.pendingCommittedRedrawPages.add(pageNumber);
    this.scheduleCommittedRedrawAfterIdle(160);
  }
  retainCommittedPagePixels(pageNumber) {
    this.pendingCommittedRedrawPages.delete(pageNumber);
    if (this.pendingCommittedRedrawPages.size === 0 && this.committedRedrawHandle !== null) {
      this.ownerWindow.clearTimeout(this.committedRedrawHandle);
      this.committedRedrawHandle = null;
    }
  }
  retainTouchErasePixels(pageNumber) {
    this.cancelPageRenderJob(pageNumber);
    this.pendingInteractionRedrawPages.delete(pageNumber);
    this.retainCommittedPagePixels(pageNumber);
  }
  scheduleCommittedRedrawAfterIdle(delayMs = 700) {
    if (this.committedRedrawHandle !== null) {
      this.ownerWindow.clearTimeout(this.committedRedrawHandle);
    }
    const waitMs = Math.max(16, delayMs);
    this.committedRedrawHandle = this.ownerWindow.setTimeout(() => {
      this.committedRedrawHandle = null;
      if (this.hasActiveTransientRender()) {
        this.scheduleCommittedRedrawAfterIdle(waitMs);
        return;
      }
      const remainingIdleMs = Math.max(0, waitMs - (performance.now() - this.lastInkInputTimestamp));
      if (remainingIdleMs > 0) {
        this.scheduleCommittedRedrawAfterIdle(remainingIdleMs);
        return;
      }
      const pages = Array.from(this.pendingCommittedRedrawPages);
      this.pendingCommittedRedrawPages.clear();
      for (const pageNumber of pages) {
        this.schedulePageRedraw(pageNumber);
      }
    }, waitMs);
  }
  cancelPendingInteractionRedraw() {
    if (this.interactionRedrawHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.interactionRedrawHandle);
      this.interactionRedrawHandle = null;
    }
    this.pendingInteractionRedrawPages.clear();
  }
  hasActiveTransientRender() {
    return !!(this.currentStroke || this.currentShape || this.currentLasso || this.erasingSession);
  }
  flushPendingCommittedPageRedraws() {
    if (this.committedRedrawHandle !== null) {
      this.ownerWindow.clearTimeout(this.committedRedrawHandle);
      this.committedRedrawHandle = null;
    }
    const pages = Array.from(this.pendingCommittedRedrawPages);
    this.pendingCommittedRedrawPages.clear();
    for (const pageNumber of pages) {
      this.schedulePageRedraw(pageNumber);
    }
  }
  pauseCommittedRenderingForInkInput() {
    this.lastInkInputTimestamp = performance.now();
    this.queueInterruptedPageRenders();
    this.cancelPageRenderJobs("cancelled by pointer input");
    this.cancelPendingInteractionRedraw();
    if (this.committedRedrawHandle !== null) {
      this.ownerWindow.clearTimeout(this.committedRedrawHandle);
      this.committedRedrawHandle = null;
    }
    if (this.redrawHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.redrawHandle);
      this.redrawHandle = null;
    }
  }
  queueInterruptedPageRenders() {
    for (const pageNumber of this.pageRenderJobs.keys()) {
      this.pendingRedrawPages.add(pageNumber);
    }
    for (const pageNumber of this.pageRenderPublications.keys()) {
      this.pendingRedrawPages.add(pageNumber);
    }
  }
  resumeCommittedRenderingAfterInkInput() {
    if (!this.annotationDocument || this.redrawHandle !== null) {
      return;
    }
    this.redrawHandle = this.ownerWindow.requestAnimationFrame(() => {
      this.redrawHandle = null;
      if (this.hasActiveTransientRender() || this.isViewportMotionActive()) {
        return;
      }
      this.flushDeferredScrollRedraws();
    });
  }
  isFingerPanRenderingPaused() {
    return this.fingerPanPointerId !== null || this.fingerPanInertiaHandle !== null;
  }
  isViewportMotionActive() {
    return this.isPdfScrolling || this.isFingerPanRenderingPaused();
  }
  pauseCommittedRenderingForViewportMotion() {
    for (const pageNumber of this.pageRenderJobs.keys()) {
      this.pendingRedrawPages.add(pageNumber);
    }
    for (const pageNumber of this.pageRenderPublications.keys()) {
      this.pendingRedrawPages.add(pageNumber);
    }
    for (const pageNumber of this.pageSurfaces.keys()) {
      if (this.shouldKeepPageHot(pageNumber)) {
        this.pendingRedrawPages.add(pageNumber);
      }
    }
    this.cancelPageRenderJobs("cancelled by viewport motion");
    this.cancelPendingInteractionRedraw();
    if (this.committedRedrawHandle !== null) {
      this.ownerWindow.clearTimeout(this.committedRedrawHandle);
      this.committedRedrawHandle = null;
    }
    if (this.redrawHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.redrawHandle);
      this.redrawHandle = null;
    }
  }
  resumeCommittedRenderingAfterFingerPan() {
    if (this.isViewportMotionActive() || !this.annotationDocument || this.redrawHandle !== null) {
      return;
    }
    this.redrawHandle = this.ownerWindow.requestAnimationFrame(() => {
      this.redrawHandle = null;
      if (this.isViewportMotionActive() || this.hasActiveTransientRender()) {
        return;
      }
      this.forceRedrawVisibleAnnotations();
    });
  }
  isPageNearViewport(pageNumber) {
    const surface = this.pageSurfaces.get(pageNumber);
    if (!surface || !this.scrollParent) {
      return false;
    }
    const containerRect = this.scrollParent.getBoundingClientRect();
    const rect = surface.pageEl.getBoundingClientRect();
    const margin = 120;
    return rect.bottom >= containerRect.top - margin && rect.top <= containerRect.bottom + margin;
  }
  shouldKeepPageHot(pageNumber) {
    if (pageNumber === this.currentPage || pageNumber === this.pointerPage) {
      return true;
    }
    if (this.visiblePageRange) {
      return pageNumber >= this.visiblePageRange.start && pageNumber <= this.visiblePageRange.end;
    }
    return this.isPageNearViewport(pageNumber);
  }
  updateVisiblePageRange(allowRedraw = true) {
    if (this.pageSurfaces.size === 0 || !this.scrollParent) {
      return;
    }
    const visiblePages = Array.from(this.pageSurfaces.keys()).filter((pageNumber) => this.isPageNearViewport(pageNumber)).sort((left, right) => left - right);
    if (visiblePages.length === 0) {
      return;
    }
    const previousRange = this.visiblePageRange;
    const nextRange = {
      start: Math.max(1, visiblePages[0] - PAGE_VIRTUALIZATION_MARGIN),
      end: visiblePages[visiblePages.length - 1] + PAGE_VIRTUALIZATION_MARGIN
    };
    if (previousRange && previousRange.start === nextRange.start && previousRange.end === nextRange.end) {
      return;
    }
    this.visiblePageRange = nextRange;
    for (const [pageNumber, surface] of this.pageSurfaces.entries()) {
      const hot = this.shouldKeepPageHot(pageNumber);
      surface.overlayEl.setCssStyles({ visibility: "visible" });
      const wasHot = previousRange ? pageNumber >= previousRange.start && pageNumber <= previousRange.end : false;
      if (allowRedraw && hot && !wasHot) {
        this.schedulePageRedraw(pageNumber);
      }
    }
  }
  updateCurrentPageFromScroll() {
    if (!this.scrollParent || this.pageSurfaces.size === 0) {
      return;
    }
    const containerRect = this.scrollParent.getBoundingClientRect();
    let nearestPage = this.currentPage;
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (const [pageNumber, surface] of this.pageSurfaces.entries()) {
      const rect = surface.pageEl.getBoundingClientRect();
      const distance = Math.abs(rect.top - containerRect.top - 28);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPage = pageNumber;
      }
    }
    if (nearestPage !== this.currentPage) {
      this.currentPage = nearestPage;
      this.updateNativeMixedPageThumbnailSelection();
      this.syncNativeMixedPageNavigator();
    }
  }
  buildPageLink(pageNumber) {
    if (!this.file) {
      return "";
    }
    return `[[${this.file.path}#page=${pageNumber}]]`;
  }
  buildSelectionRegionReference() {
    const region = this.getSelectionRegion();
    if (!region) {
      return null;
    }
    const rect = [region.rect.left, region.rect.top, region.rect.right, region.rect.bottom].map((value) => value.toFixed(4)).join(",");
    return `[[${region.file.path}#page=${region.page}]] ::region[page=${region.page};rect=${rect}]`;
  }
  getSelectionRegion() {
    if (!this.file) {
      return null;
    }
    if (this.lastSelectionRegion) {
      return { file: this.file, page: this.lastSelectionRegion.page, rect: this.lastSelectionRegion.rect };
    }
    if (this.selectedTargets.length === 0) {
      return null;
    }
    const selectionPage = this.getSelectionPage();
    if (!selectionPage) {
      return null;
    }
    const bounds = this.getCombinedBounds(this.selectedTargets.filter((target) => target.page === selectionPage));
    const rect = bounds ? normalizeRect(bounds) : null;
    return rect ? { file: this.file, page: selectionPage, rect } : null;
  }
  async insertSessionTextAtPoint(pageNumber, point, boxWidthScale, boxHeightScale) {
    this.beginSessionInlineTextEditor(pageNumber, point, void 0, boxWidthScale, boxHeightScale);
  }
  beginSessionInlineTextEditor(pageNumber, point, existingItem, boxWidthScale, boxHeightScale) {
    var _a2, _b, _c, _d;
    if (!this.annotationDocument) {
      return;
    }
    const surface = this.pageSurfaces.get(pageNumber);
    if (!surface || this.inlineTextEditorEl) {
      return;
    }
    const editingExistingText = !!existingItem;
    const autoFitTextBox = existingItem ? existingItem.manualBoxSize !== true : false;
    if (existingItem) {
      this.selectedTarget = { kind: "text", id: existingItem.id, page: pageNumber };
      this.selectedTargets = [this.selectedTarget];
      this.syncCurrentTextStyleFromItem(existingItem);
    }
    const autoFitSize = autoFitTextBox && existingItem ? this.measureAutoFitTextAnnotation(surface, {
      ...existingItem,
      autoFit: true,
      boxWidthScale: void 0
    }) : null;
    const layoutSource = autoFitSize ? {
      ...existingItem,
      autoFit: true,
      boxWidthScale: autoFitSize.width / Math.max(surface.lastWidth, 1),
      boxHeightScale: autoFitSize.height / Math.max(surface.lastHeight, 1)
    } : boxWidthScale && boxWidthScale > 0 || boxHeightScale && boxHeightScale > 0 ? { ...existingItem, boxWidthScale, boxHeightScale } : existingItem;
    const layout = getInlineTextEditorLayout(point, surface.lastWidth, surface.lastHeight, layoutSource);
    const frame = createDiv();
    frame.className = "pdf-native-annotator-inline-text-frame";
    frame.classList.toggle("is-auto-fit", autoFitTextBox);
    if (editingExistingText) {
      frame.classList.add("is-editing-selected");
    }
    frame.setCssStyles({
      left: `${layout.left}px`,
      top: `${layout.top}px`,
      width: `${layout.width}px`,
      height: `${layout.height}px`
    });
    frame.dataset.left = String(layout.left);
    frame.dataset.top = String(layout.top);
    frame.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
      if (event.target !== frame) {
        return;
      }
      event.preventDefault();
      const startClientX = event.clientX;
      const startClientY = event.clientY;
      const startLeft = Number(frame.dataset.left) || 0;
      const startTop = Number(frame.dataset.top) || 0;
      const frameRect = frame.getBoundingClientRect();
      const onMove = (moveEvent) => {
        moveEvent.preventDefault();
        const nextLeft = clamp2(startLeft + (moveEvent.clientX - startClientX), 8, Math.max(8, surface.lastWidth - frameRect.width - 8));
        const nextTop = clamp2(startTop + (moveEvent.clientY - startClientY), 8, Math.max(8, surface.lastHeight - frameRect.height - 8));
        frame.setCssStyles({
          left: `${nextLeft}px`,
          top: `${nextTop}px`
        });
        frame.dataset.left = String(nextLeft);
        frame.dataset.top = String(nextTop);
        this.inlineTextPoint = {
          x: clamp2(nextLeft / Math.max(surface.lastWidth, 1), 0.01, 0.96),
          y: clamp2(nextTop / Math.max(surface.lastHeight, 1), 0.01, 0.96),
          pressure: 0.5
        };
      };
      const onUp = () => {
        this.ownerWindow.removeEventListener("pointermove", onMove, true);
        this.ownerWindow.removeEventListener("pointerup", onUp, true);
      };
      this.ownerWindow.addEventListener("pointermove", onMove, true);
      this.ownerWindow.addEventListener("pointerup", onUp, true);
    });
    frame.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    const editor = createEl("textarea");
    editor.className = "pdf-native-annotator-inline-text-editor";
    editor.value = (_a2 = existingItem == null ? void 0 : existingItem.text) != null ? _a2 : "";
    const editorFontScale = existingItem ? this.resolveStoredFontScale(existingItem) : this.getStableTextFontScale(this.currentTextFontSize);
    const baseFontSize = getRenderedTextFontSize(editorFontScale, surface.lastWidth);
    const fontFamily = (_b = existingItem == null ? void 0 : existingItem.fontFamily) != null ? _b : this.currentTextFontFamily;
    const fontWeight = existingItem ? resolveTextFontWeight(existingItem) : this.currentTextFontWeight;
    const fontStyle = existingItem ? resolveTextFontStyle(existingItem) : this.currentTextFontStyle;
    const textAlign = existingItem ? resolveTextAlignment(existingItem) : this.currentTextAlignment;
    const verticalAlign = existingItem ? resolveTextVerticalAlignment(existingItem) : this.currentTextVerticalAlignment;
    const lineSpacing = existingItem ? resolveTextLineSpacing(existingItem) : this.currentTextLineSpacing;
    const wordWrap = existingItem ? resolveTextWordWrap(existingItem) : this.currentTextWordWrap;
    editor.wrap = wordWrap ? "soft" : "off";
    editor.placeholder = "Type text";
    editor.spellcheck = true;
    editor.autocomplete = "off";
    editor.autocapitalize = "sentences";
    editor.inputMode = "text";
    editor.enterKeyHint = "enter";
    const textColor = (_c = existingItem == null ? void 0 : existingItem.color) != null ? _c : this.currentTextColor;
    if (existingItem) {
      this.currentTextFontFamily = fontFamily;
      this.currentTextColor = textColor;
      this.currentTextFontWeight = fontWeight;
      this.currentTextFontStyle = fontStyle;
      this.currentTextAlignment = textAlign;
      this.currentTextVerticalAlignment = verticalAlign;
      this.currentTextLineSpacing = lineSpacing;
      this.currentTextWordWrap = wordWrap;
    }
    editor.dataset.textColor = textColor;
    editor.dataset.fontScale = String(editorFontScale);
    editor.setCssStyles({
      color: textColor,
      fontSize: `${baseFontSize}px`,
      fontFamily: `"${fontFamily}", sans-serif`,
      fontWeight,
      fontStyle,
      textAlign,
      lineHeight: String(lineSpacing),
      whiteSpace: wordWrap ? "pre-wrap" : "pre",
      overflowWrap: wordWrap ? "break-word" : "normal"
    });
    editor.setCssProps({ "--annotator-inline-text-color": textColor });
    frame.appendChild(editor);
    const focusEditor = () => {
      if (!editor.isConnected) {
        return;
      }
      editor.focus({ preventScroll: true });
    };
    editor.addEventListener("pointerdown", () => focusEditor());
    editor.addEventListener("pointerup", () => focusEditor());
    const caretMirror = createDiv({ cls: "pdf-native-annotator-inline-text-caret-mirror" });
    caretMirror.setCssStyles({
      fontSize: `${baseFontSize}px`,
      fontFamily: `"${fontFamily}", sans-serif`,
      fontWeight,
      fontStyle,
      textAlign,
      lineHeight: String(lineSpacing),
      whiteSpace: wordWrap ? "pre-wrap" : "pre",
      overflowWrap: wordWrap ? "break-word" : "normal"
    });
    frame.appendChild(caretMirror);
    this.addInlineTextFrameHandles(frame, editor, surface.lastWidth, surface.lastHeight);
    surface.hostEl.appendChild(frame);
    this.inlineTextEditorFrameEl = frame;
    this.inlineTextEditorEl = editor;
    this.inlineTextCaretMirrorEl = caretMirror;
    this.inlineTextTargetId = (_d = existingItem == null ? void 0 : existingItem.id) != null ? _d : null;
    this.inlineTextPoint = layout.point;
    this.inlineTextPageNumber = pageNumber;
    this.inlineTextAutoFit = autoFitTextBox;
    this.applyInlineTextEditorScale(editor, surface.lastWidth);
    this.captureVisualViewportBaseline();
    focusEditor();
    editor.setSelectionRange(editor.value.length, editor.value.length);
    const resizeEditor = () => {
      if (!autoFitTextBox || editingExistingText || boxWidthScale || boxHeightScale) {
        editor.setCssStyles({ height: "100%" });
        return;
      }
      resizeInlineTextEditor(editor, surface.lastHeight * 0.42);
    };
    const commit = () => {
      this.finishSessionInlineTextEditor(true);
    };
    editor.addEventListener("input", resizeEditor);
    editor.addEventListener("input", () => {
      this.updateInlineTextEditorBoxFromContent(pageNumber);
      this.updateInlineTextCaretMirror();
    });
    editor.addEventListener("select", () => this.updateInlineTextCaretMirror());
    editor.addEventListener("keyup", () => this.updateInlineTextCaretMirror());
    editor.addEventListener("pointerup", () => this.updateInlineTextCaretMirror());
    editor.addEventListener("blur", () => {
      this.ownerWindow.setTimeout(() => {
        if (this.inlineTextEditorEl !== editor) {
          return;
        }
        const activeElement = editor.ownerDocument.activeElement;
        if (activeElement === editor) {
          return;
        }
        if (isHtmlElement(activeElement) && activeElement.closest(
          ".pdf-native-annotator-toolbar, .pdf-native-annotator-font-popover, .pdf-native-annotator-color-popover"
        )) {
          return;
        }
        commit();
      }, 0);
    });
    editor.addEventListener("keydown", (event) => {
      event.stopPropagation();
    });
    resizeEditor();
    this.updateInlineTextEditorBoxFromContent(pageNumber);
    this.drawPageAnnotations(pageNumber);
    this.updateInlineTextCaretMirror();
    this.ownerWindow.setTimeout(() => {
      if (this.inlineTextEditorEl === editor && editor.isConnected && editor.ownerDocument.activeElement !== editor) {
        focusEditor();
        editor.setSelectionRange(editor.value.length, editor.value.length);
        this.updateInlineTextCaretMirror();
      }
    }, 0);
    this.refreshStatus("Type on page. Enter adds a line, Ctrl/Cmd+Enter saves, Esc cancels.");
  }
  finishSessionInlineTextEditor(apply) {
    var _a2, _b, _c, _d, _e, _f, _g;
    const editor = this.inlineTextEditorEl;
    const frame = this.inlineTextEditorFrameEl;
    const pageNumber = this.inlineTextPageNumber;
    const point = pageNumber === null ? this.inlineTextPoint : this.getInlineTextFramePoint(pageNumber);
    const targetId = this.inlineTextTargetId;
    const autoFit = this.inlineTextAutoFit;
    const value = (_a2 = editor == null ? void 0 : editor.value) != null ? _a2 : "";
    const editorColor = (editor == null ? void 0 : editor.dataset.textColor) || this.currentTextColor;
    const frameRect = (_b = frame == null ? void 0 : frame.getBoundingClientRect()) != null ? _b : null;
    const editorRect = (_c = editor == null ? void 0 : editor.getBoundingClientRect()) != null ? _c : null;
    const preview = pageNumber === null ? null : this.getInlineTextPreviewItem(pageNumber);
    if (frame) {
      frame.remove();
    } else if (editor) {
      editor.remove();
    }
    this.inlineTextEditorEl = null;
    this.inlineTextEditorFrameEl = null;
    this.inlineTextCaretMirrorEl = null;
    this.inlineTextTargetId = null;
    this.inlineTextPoint = null;
    this.inlineTextPageNumber = null;
    this.inlineTextAutoFit = false;
    if (!apply || !this.annotationDocument || !point || pageNumber === null) {
      return;
    }
    const surface = this.pageSurfaces.get(pageNumber);
    const pageWidth = Math.max((_d = surface == null ? void 0 : surface.lastWidth) != null ? _d : 1, 1);
    const editorWidth = frameRect ? frameRect.width : editorRect ? editorRect.width : Number.NaN;
    const pageHeight = Math.max((_e = surface == null ? void 0 : surface.lastHeight) != null ? _e : 1, 1);
    const editorHeight = frameRect ? frameRect.height : editorRect ? editorRect.height : Number.NaN;
    const boxWidthScale = Number.isFinite(editorWidth) ? clamp2(editorWidth / pageWidth, 0.04, 0.9) : void 0;
    const boxHeightScale = (_f = preview == null ? void 0 : preview.boxHeightScale) != null ? _f : Number.isFinite(editorHeight) ? clamp2(editorHeight / pageHeight, 0.025, 0.9) : void 0;
    const nextX = clamp2(point.x, 0.01, 0.96);
    const nextY = clamp2(point.y, 0.01, 0.96);
    if (!value && !targetId) {
      return;
    }
    this.pushHistory();
    if (targetId) {
      const existing = this.annotationDocument.textItems.find((entry) => entry.id === targetId);
      if (existing) {
        if (!value.trim()) {
          this.annotationDocument.textItems = this.annotationDocument.textItems.filter((entry) => entry.id !== targetId);
          this.selectedTargets = this.selectedTargets.filter((target) => target.id !== targetId);
          this.selectedTarget = (_g = this.selectedTargets[0]) != null ? _g : null;
          this.markDirtyAndRedraw("Text annotation deleted");
          return;
        }
        existing.text = value;
        existing.x = nextX;
        existing.y = nextY;
        existing.color = editorColor || existing.color || this.currentTextColor;
        existing.fontFamily = this.currentTextFontFamily;
        existing.fontSize = this.currentTextFontSize;
        existing.fontScale = this.getStableTextFontScale(this.currentTextFontSize);
        existing.fontWeight = this.currentTextFontWeight;
        existing.fontStyle = this.currentTextFontStyle;
        existing.textAlign = this.currentTextAlignment;
        existing.verticalAlign = this.currentTextVerticalAlignment;
        existing.lineSpacing = this.currentTextLineSpacing;
        existing.wordWrap = this.currentTextWordWrap;
        existing.autoFit = autoFit;
        existing.manualBoxSize = !autoFit;
        existing.boxWidthScale = boxWidthScale != null ? boxWidthScale : existing.boxWidthScale;
        existing.boxHeightScale = boxHeightScale != null ? boxHeightScale : existing.boxHeightScale;
        if (this.currentTool === "text") {
          this.selectedTarget = null;
          this.selectedTargets = [];
        } else {
          this.selectedTarget = { kind: "text", id: existing.id, page: pageNumber };
          this.selectedTargets = [this.selectedTarget];
        }
        this.markDirtyAndRedraw("Text annotation updated");
        return;
      }
    }
    if (!value.trim()) {
      return;
    }
    const nextText = {
      id: generateId("text"),
      page: pageNumber,
      text: value,
      x: nextX,
      y: nextY,
      color: editorColor || this.currentTextColor,
      fontSize: this.currentTextFontSize,
      fontFamily: this.currentTextFontFamily,
      fontScale: this.getStableTextFontScale(this.currentTextFontSize),
      fontWeight: this.currentTextFontWeight,
      fontStyle: this.currentTextFontStyle,
      textAlign: this.currentTextAlignment,
      verticalAlign: this.currentTextVerticalAlignment,
      lineSpacing: this.currentTextLineSpacing,
      wordWrap: this.currentTextWordWrap,
      autoFit,
      manualBoxSize: !autoFit,
      boxWidthScale,
      boxHeightScale,
      zIndex: this.getNextPageZIndex(pageNumber),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.annotationDocument.textItems.push(nextText);
    if (this.currentTool === "text") {
      this.selectedTarget = null;
      this.selectedTargets = [];
    } else {
      this.selectedTarget = { kind: "text", id: nextText.id, page: pageNumber };
      this.selectedTargets = [this.selectedTarget];
    }
    this.markDirtyAndRedraw("Text annotation added");
  }
  getInlineTextFramePoint(pageNumber) {
    var _a2;
    const fallback = this.inlineTextPoint;
    const frame = this.inlineTextEditorFrameEl;
    const surface = this.pageSurfaces.get(pageNumber);
    if (!frame || !surface) {
      return fallback;
    }
    const left = Number(frame.dataset.left);
    const top = Number(frame.dataset.top);
    if (!Number.isFinite(left) || !Number.isFinite(top)) {
      return fallback;
    }
    return {
      x: clamp2(left / Math.max(surface.lastWidth, 1), 0.01, 0.96),
      y: clamp2(top / Math.max(surface.lastHeight, 1), 0.01, 0.96),
      pressure: (_a2 = fallback == null ? void 0 : fallback.pressure) != null ? _a2 : 0.5
    };
  }
  resizeInlineTextEditorForSurface(surface, previousWidth, previousHeight, nextWidth = surface.lastWidth, nextHeight = surface.lastHeight) {
    const frame = this.inlineTextEditorFrameEl;
    const editor = this.inlineTextEditorEl;
    const point = this.inlineTextPoint;
    if (!frame || !editor || !point || this.inlineTextPageNumber !== surface.pageNumber || previousWidth <= 0 || previousHeight <= 0) {
      return;
    }
    const renderedRect = frame.getBoundingClientRect();
    const frameWidth = Number.parseFloat(frame.style.width) || renderedRect.width;
    const frameHeight = Number.parseFloat(frame.style.height) || renderedRect.height;
    const widthScale = clamp2(frameWidth / previousWidth, 0.04, 0.9);
    const heightScale = clamp2(frameHeight / previousHeight, 0.025, 0.9);
    const layout = getZoomStableTextFrameLayout(
      point,
      widthScale,
      heightScale,
      nextWidth,
      nextHeight
    );
    frame.setCssStyles({
      left: `${layout.left}px`,
      top: `${layout.top}px`,
      width: `${layout.width}px`,
      height: `${layout.height}px`
    });
    frame.dataset.left = String(layout.left);
    frame.dataset.top = String(layout.top);
    editor.setCssStyles({ height: "100%" });
    this.applyInlineTextEditorScale(editor, nextWidth);
    this.updateInlineTextVerticalAlignment(surface.pageNumber);
    this.updateInlineTextCaretMirror();
  }
  applyInlineTextEditorScale(editor, pageWidth) {
    var _a2, _b;
    const fontScale = Number(editor.dataset.fontScale);
    const metrics = getRenderedTextLayoutMetrics(pageWidth);
    const fontSize = getRenderedTextFontSize(
      Number.isFinite(fontScale) && fontScale > 0 ? fontScale : this.getStableTextFontScale(this.currentTextFontSize),
      pageWidth
    );
    const horizontalPadding = `${metrics.paddingX}px`;
    editor.setCssStyles({
      fontSize: `${fontSize}px`,
      paddingLeft: horizontalPadding,
      paddingRight: horizontalPadding,
      minHeight: `${metrics.minimumBoxHeight}px`
    });
    (_a2 = this.inlineTextEditorFrameEl) == null ? void 0 : _a2.setCssStyles({
      minWidth: `${metrics.minimumBoxWidth}px`,
      minHeight: `${metrics.minimumBoxHeight}px`
    });
    (_b = this.inlineTextCaretMirrorEl) == null ? void 0 : _b.setCssStyles({
      fontSize: `${fontSize}px`,
      paddingLeft: horizontalPadding,
      paddingRight: horizontalPadding
    });
  }
  addInlineTextFrameHandles(frame, editor, pageWidth, pageHeight) {
    const handles = [
      { name: "nw", cls: "is-nw" },
      { name: "n", cls: "is-n" },
      { name: "ne", cls: "is-ne" },
      { name: "e", cls: "is-e" },
      { name: "se", cls: "is-se" },
      { name: "s", cls: "is-s" },
      { name: "sw", cls: "is-sw" },
      { name: "w", cls: "is-w" }
    ];
    for (const handle of handles) {
      const handleEl = createEl("button");
      handleEl.type = "button";
      handleEl.className = `pdf-native-annotator-inline-text-handle ${handle.cls}`;
      handleEl.setAttribute("aria-label", `Resize text box ${handle.name}`);
      handleEl.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.inlineTextAutoFit = false;
        frame.classList.remove("is-auto-fit");
        const startClientX = event.clientX;
        const startClientY = event.clientY;
        const startWidth = frame.getBoundingClientRect().width;
        const startHeight = frame.getBoundingClientRect().height;
        const startLeft = Number(frame.dataset.left) || 0;
        const startTop = Number(frame.dataset.top) || 0;
        const onMove = (moveEvent) => {
          moveEvent.preventDefault();
          const delta = moveEvent.clientX - startClientX;
          const deltaY = moveEvent.clientY - startClientY;
          let nextLeft = startLeft;
          let nextTop = startTop;
          let nextWidth = startWidth;
          let nextHeight = startHeight;
          if (handle.name.includes("e")) {
            nextWidth = clamp2(startWidth + delta, 44, Math.max(44, pageWidth - startLeft - 12));
          }
          if (handle.name.includes("w")) {
            nextLeft = clamp2(startLeft + delta, 8, startLeft + startWidth - 44);
            nextWidth = clamp2(startWidth - (nextLeft - startLeft), 44, Math.max(44, pageWidth - 12));
          }
          if (handle.name.includes("s")) {
            nextHeight = clamp2(startHeight + deltaY, 36, Math.max(36, pageHeight - startTop - 12));
          }
          if (handle.name.includes("n")) {
            nextTop = clamp2(startTop + deltaY, 8, startTop + startHeight - 36);
            nextHeight = clamp2(startHeight - (nextTop - startTop), 36, Math.max(36, pageHeight - 12));
          }
          frame.setCssStyles({
            left: `${nextLeft}px`,
            top: `${nextTop}px`,
            width: `${nextWidth}px`,
            height: `${nextHeight}px`
          });
          frame.dataset.left = String(nextLeft);
          frame.dataset.top = String(nextTop);
          editor.setCssStyles({ height: `${Math.max(36, nextHeight)}px` });
          if (this.inlineTextPageNumber !== null) {
            this.updateInlineTextVerticalAlignment(this.inlineTextPageNumber);
            this.scheduleInteractionRedraw(this.inlineTextPageNumber);
          }
          if (this.inlineTextPoint) {
            this.inlineTextPoint = {
              ...this.inlineTextPoint,
              x: clamp2(nextLeft / Math.max(pageWidth, 1), 0.01, 0.96),
              y: clamp2(nextTop / Math.max(pageHeight, 1), 0.01, 0.96)
            };
          }
        };
        const onUp = () => {
          this.ownerWindow.removeEventListener("pointermove", onMove, true);
          this.ownerWindow.removeEventListener("pointerup", onUp, true);
          editor.focus();
        };
        this.ownerWindow.addEventListener("pointermove", onMove, true);
        this.ownerWindow.addEventListener("pointerup", onUp, true);
      });
      frame.appendChild(handleEl);
    }
  }
  get currentTool() {
    return this.toolState.activeTool;
  }
  get eraserMode() {
    return this.toolState.eraserMode;
  }
  get currentColor() {
    return this.toolState.activeColor;
  }
  getStableAnnotationWidthScale(width) {
    return clamp2(width / DEFAULT_STROKE_REFERENCE_WIDTH2, 5e-4, MAX_STROKE_WIDTH_SCALE2);
  }
  getStableTextFontScale(fontSize) {
    return clamp2(fontSize / DEFAULT_STROKE_REFERENCE_WIDTH2, 4e-3, MAX_TEXT_FONT_SCALE2);
  }
  syncCurrentTextStyleFromItem(item) {
    var _a2, _b;
    this.currentTextFontFamily = (_a2 = item.fontFamily) != null ? _a2 : this.currentTextFontFamily;
    this.currentTextFontSize = Math.round(item.fontSize);
    this.currentTextColor = (_b = item.color) != null ? _b : this.currentTextColor;
    this.currentTextFontWeight = resolveTextFontWeight(item);
    this.currentTextFontStyle = resolveTextFontStyle(item);
    this.currentTextAlignment = resolveTextAlignment(item);
    this.currentTextVerticalAlignment = resolveTextVerticalAlignment(item);
    this.currentTextLineSpacing = resolveTextLineSpacing(item);
    this.currentTextWordWrap = resolveTextWordWrap(item);
  }
  resolveStoredScale(width, storedScale, maxScale) {
    const fallbackScale = width > 0 ? clamp2(width / DEFAULT_STROKE_REFERENCE_WIDTH2, 5e-4, maxScale) : 5e-4;
    if (typeof storedScale === "number" && Number.isFinite(storedScale) && storedScale > 0 && storedScale <= maxScale && storedScale <= fallbackScale * SCALE_DRIFT_TOLERANCE2) {
      return storedScale;
    }
    return fallbackScale;
  }
  resolveStoredFontScale(textItem) {
    const fallbackScale = this.getStableTextFontScale(textItem.fontSize);
    const storedScale = textItem.fontScale;
    if (typeof storedScale === "number" && Number.isFinite(storedScale) && storedScale > 0 && storedScale <= MAX_TEXT_FONT_SCALE2 && storedScale <= fallbackScale * SCALE_DRIFT_TOLERANCE2) {
      return storedScale;
    }
    return fallbackScale;
  }
  setActiveTool(tool) {
    if (this.inlineTextEditorEl && tool !== "text") {
      this.finishSessionInlineTextEditor(true);
    }
    if (tool !== "select" && this.selectedTargets.length > 0) {
      this.clearSelection();
    }
    this.toolState.setActiveTool(tool);
    if (!isInkDrawingTool(tool) && this.pendingCommittedRedrawPages.size > 0) {
      this.flushPendingCommittedPageRedraws();
    }
    if (!this.annotationMode) {
      this.annotationMode = true;
      this.applyOverlayMode();
      this.refreshStatus("Annotation mode enabled");
    }
    this.persistToolDefaults();
  }
  setCurrentColor(color) {
    this.toolState.setColor(color);
    this.persistToolDefaults();
    this.updateInlineTextEditorStyle();
  }
  shouldApplyStyleToSelection() {
    return this.currentTool === "select" && this.selectedTargets.length > 0;
  }
  hasSelectedText() {
    return this.selectedTargets.some((target) => target.kind === "text");
  }
  shouldApplyTextStyleToSelection() {
    return !this.inlineTextEditorEl && this.selectedTargets.some((target) => target.kind === "text");
  }
  applyColorToSelection(color, pushHistory = true) {
    if (!this.annotationDocument || this.selectedTargets.length === 0) {
      return;
    }
    if (pushHistory) {
      this.pushHistory();
    }
    for (const target of this.selectedTargets) {
      if (target.kind === "stroke") {
        const stroke = this.annotationDocument.strokes.find((entry) => entry.id === target.id);
        if (stroke) {
          stroke.color = color;
        }
        continue;
      }
      if (target.kind === "text") {
        const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
        if (item) {
          item.color = color;
        }
        continue;
      }
      const shape = this.annotationDocument.shapes.find((entry) => entry.id === target.id);
      if (shape) {
        shape.color = color;
      }
    }
    this.markDirtyAndRedraw(this.selectedTargets.length === 1 ? "Selection color updated" : `Updated ${this.selectedTargets.length} selection colors`);
  }
  applyTextColorToSelection(color, pushHistory = true) {
    if (!this.annotationDocument || !this.hasSelectedText()) {
      return;
    }
    if (pushHistory) {
      this.pushHistory();
    }
    for (const target of this.selectedTargets) {
      if (target.kind !== "text") {
        continue;
      }
      const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
      if (item) {
        item.color = color;
      }
    }
    this.markDirtyAndRedraw("Text color updated");
  }
  applyWidthToSelection(width, pushHistory = true) {
    if (!this.annotationDocument || this.selectedTargets.length === 0) {
      return;
    }
    if (pushHistory) {
      this.pushHistory();
    }
    for (const target of this.selectedTargets) {
      if (target.kind === "stroke") {
        const stroke = this.annotationDocument.strokes.find((entry) => entry.id === target.id);
        if (stroke) {
          stroke.width = width;
          stroke.widthScale = this.getStableAnnotationWidthScale(width);
        }
        continue;
      }
      if (target.kind === "shape") {
        const shape = this.annotationDocument.shapes.find((entry) => entry.id === target.id);
        if (shape) {
          shape.width = width;
          shape.widthScale = this.getStableAnnotationWidthScale(width);
        }
        continue;
      }
      const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
      if (item) {
        item.fontSize = clamp2(width * 4, 10, 96);
        item.fontScale = this.getStableTextFontScale(item.fontSize);
      }
    }
    this.markDirtyAndRedraw(this.selectedTargets.length === 1 ? "Selection width updated" : `Updated ${this.selectedTargets.length} selection widths`);
  }
  applyFontFamilyToSelection(fontFamily) {
    if (!this.annotationDocument || !this.hasSelectedText()) {
      return;
    }
    this.pushHistory();
    for (const target of this.selectedTargets) {
      if (target.kind !== "text") {
        continue;
      }
      const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
      if (item) {
        item.fontFamily = fontFamily;
        this.updateAutoFitTextAnnotation(item, target.page);
      }
    }
    this.markDirtyAndRedraw("Text font updated");
  }
  applyTextSizeToSelection(fontSize) {
    if (!this.annotationDocument || !this.hasSelectedText()) {
      return;
    }
    this.pushHistory();
    for (const target of this.selectedTargets) {
      if (target.kind !== "text") {
        continue;
      }
      const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
      if (item) {
        item.fontSize = fontSize;
        item.fontScale = this.getStableTextFontScale(fontSize);
        this.updateAutoFitTextAnnotation(item, target.page);
      }
    }
    this.markDirtyAndRedraw("Text size updated");
  }
  applyTextFormattingToSelection(update, message) {
    if (!this.annotationDocument || !this.hasSelectedText()) {
      return;
    }
    this.pushHistory();
    for (const target of this.selectedTargets) {
      if (target.kind !== "text") {
        continue;
      }
      const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
      if (item) {
        Object.assign(item, update);
        this.updateAutoFitTextAnnotation(item, target.page);
      }
    }
    this.markDirtyAndRedraw(message);
  }
  applyTextAutoFitToSelection(autoFit) {
    if (!this.annotationDocument || !this.hasSelectedText()) {
      return;
    }
    this.pushHistory();
    for (const target of this.selectedTargets) {
      if (target.kind !== "text") {
        continue;
      }
      const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
      if (!item) {
        continue;
      }
      item.autoFit = autoFit;
      item.manualBoxSize = !autoFit;
      if (autoFit) {
        this.updateAutoFitTextAnnotation(item, target.page);
      }
    }
    this.markDirtyAndRedraw(autoFit ? "Text box will resize to fit" : "Text box size fixed");
  }
  setTextFontFamily(fontFamily) {
    this.currentTextFontFamily = fontFamily;
    this.updateInlineTextEditorStyle();
    if (this.shouldApplyTextStyleToSelection()) {
      this.applyFontFamilyToSelection(fontFamily);
    }
    this.refreshToolbar();
  }
  setTextFontSize(fontSize) {
    this.currentTextFontSize = fontSize;
    this.updateInlineTextEditorStyle();
    if (this.shouldApplyTextStyleToSelection()) {
      this.applyTextSizeToSelection(fontSize);
    }
    this.refreshToolbar();
  }
  setTextFontWeight(fontWeight) {
    this.currentTextFontWeight = fontWeight;
    this.updateInlineTextEditorStyle();
    if (this.shouldApplyTextStyleToSelection()) {
      this.applyTextFormattingToSelection({ fontWeight }, "Text weight updated");
    }
    this.refreshToolbar();
  }
  setTextFontStyle(fontStyle) {
    this.currentTextFontStyle = fontStyle;
    this.updateInlineTextEditorStyle();
    if (this.shouldApplyTextStyleToSelection()) {
      this.applyTextFormattingToSelection({ fontStyle }, "Text style updated");
    }
    this.refreshToolbar();
  }
  setTextAlignment(textAlign) {
    this.currentTextAlignment = textAlign;
    this.updateInlineTextEditorStyle();
    if (this.shouldApplyTextStyleToSelection()) {
      this.applyTextFormattingToSelection({ textAlign }, "Text alignment updated");
    }
    this.refreshToolbar();
  }
  setTextVerticalAlignment(verticalAlign) {
    this.currentTextVerticalAlignment = verticalAlign;
    this.updateInlineTextEditorStyle();
    if (this.shouldApplyTextStyleToSelection()) {
      this.applyTextFormattingToSelection({ verticalAlign }, "Text vertical alignment updated");
    }
    this.refreshToolbar();
  }
  setTextLineSpacing(lineSpacing) {
    this.currentTextLineSpacing = clamp2(
      Number.isFinite(lineSpacing) ? lineSpacing : INLINE_TEXT_LINE_HEIGHT,
      0.8,
      3
    );
    this.updateInlineTextEditorStyle();
    if (this.shouldApplyTextStyleToSelection()) {
      this.applyTextFormattingToSelection(
        { lineSpacing: this.currentTextLineSpacing },
        "Text line spacing updated"
      );
    }
    this.refreshToolbar();
  }
  setTextWordWrap(wordWrap) {
    this.currentTextWordWrap = wordWrap;
    if (this.inlineTextEditorEl) {
      this.inlineTextEditorEl.wrap = wordWrap ? "soft" : "off";
    }
    this.updateInlineTextEditorStyle();
    if (this.shouldApplyTextStyleToSelection()) {
      this.applyTextFormattingToSelection({ wordWrap }, wordWrap ? "Text wrapping enabled" : "Text wrapping disabled");
    }
    this.refreshToolbar();
  }
  setTextAutoFit(autoFit) {
    if (this.inlineTextEditorFrameEl && this.inlineTextEditorEl) {
      this.inlineTextAutoFit = autoFit;
      this.inlineTextEditorFrameEl.classList.toggle("is-auto-fit", autoFit);
      if (this.inlineTextPageNumber !== null) {
        this.updateInlineTextEditorBoxFromContent(this.inlineTextPageNumber);
        this.drawPageAnnotations(this.inlineTextPageNumber);
      }
    }
    if (this.shouldApplyTextStyleToSelection()) {
      this.applyTextAutoFitToSelection(autoFit);
    }
    this.refreshToolbar();
  }
  transformTextCase(mode) {
    const transform = (value) => {
      if (mode === "lower") {
        return value.toLocaleLowerCase();
      }
      if (mode === "upper") {
        return value.toLocaleUpperCase();
      }
      if (mode === "title") {
        return value.toLocaleLowerCase().replace(/(^|[\s\-/])([a-z])/g, (_match, prefix, letter) => `${prefix}${letter.toLocaleUpperCase()}`);
      }
      if (mode === "sentence") {
        return value.toLocaleLowerCase().replace(/(^|[.!?]\s+)([a-z])/g, (_match, prefix, letter) => `${prefix}${letter.toLocaleUpperCase()}`);
      }
      return Array.from(value).map((character) => {
        const upper = character.toLocaleUpperCase();
        const lower = character.toLocaleLowerCase();
        return character === upper && character !== lower ? lower : upper;
      }).join("");
    };
    if (this.inlineTextEditorEl) {
      const start = this.inlineTextEditorEl.selectionStart;
      const end = this.inlineTextEditorEl.selectionEnd;
      this.inlineTextEditorEl.value = transform(this.inlineTextEditorEl.value);
      this.inlineTextEditorEl.setSelectionRange(start, end);
      if (this.inlineTextPageNumber !== null) {
        this.updateInlineTextEditorBoxFromContent(this.inlineTextPageNumber);
        this.drawPageAnnotations(this.inlineTextPageNumber);
      }
      this.updateInlineTextCaretMirror();
      return;
    }
    if (!this.annotationDocument || !this.hasSelectedText()) {
      this.refreshStatus("Select or edit text before changing case");
      return;
    }
    this.pushHistory();
    for (const target of this.selectedTargets) {
      if (target.kind !== "text") {
        continue;
      }
      const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
      if (item) {
        item.text = transform(item.text);
        this.updateAutoFitTextAnnotation(item, target.page);
      }
    }
    this.markDirtyAndRedraw("Text case updated");
  }
  setTextColor(color, pushHistory = true, refreshToolbar = true) {
    this.currentTextColor = color;
    this.plugin.updateTextColor(color);
    if (this.inlineTextEditorEl) {
      this.inlineTextEditorEl.dataset.textColor = color;
      this.inlineTextEditorEl.setCssStyles({ color });
      this.inlineTextEditorEl.setCssProps({ "--annotator-inline-text-color": color });
      if (this.inlineTextPageNumber !== null) {
        this.drawPageAnnotations(this.inlineTextPageNumber);
      }
    }
    if (this.shouldApplyTextStyleToSelection()) {
      this.applyTextColorToSelection(color, pushHistory);
    }
    if (refreshToolbar) {
      this.refreshToolbar();
    }
  }
  updateInlineTextEditorStyle() {
    var _a2, _b, _c;
    if (!this.inlineTextEditorEl) {
      return;
    }
    const surface = this.inlineTextPageNumber ? this.pageSurfaces.get(this.inlineTextPageNumber) : null;
    const displayFontSize = surface ? getRenderedTextFontSize(this.getStableTextFontScale(this.currentTextFontSize), surface.lastWidth) : this.currentTextFontSize;
    this.inlineTextEditorEl.dataset.textColor = this.currentTextColor;
    this.inlineTextEditorEl.setCssProps({ "--annotator-inline-text-color": this.currentTextColor });
    this.inlineTextEditorEl.wrap = this.currentTextWordWrap ? "soft" : "off";
    this.inlineTextEditorEl.setCssStyles({
      color: this.currentTextColor,
      fontFamily: `"${this.currentTextFontFamily}", sans-serif`,
      fontSize: `${displayFontSize}px`,
      fontWeight: this.currentTextFontWeight,
      fontStyle: this.currentTextFontStyle,
      textAlign: this.currentTextAlignment,
      lineHeight: String(this.currentTextLineSpacing),
      whiteSpace: this.currentTextWordWrap ? "pre-wrap" : "pre",
      overflowWrap: this.currentTextWordWrap ? "break-word" : "normal"
    });
    (_a2 = this.inlineTextCaretMirrorEl) == null ? void 0 : _a2.setCssStyles({
      fontFamily: `"${this.currentTextFontFamily}", sans-serif`,
      fontSize: `${displayFontSize}px`,
      fontWeight: this.currentTextFontWeight,
      fontStyle: this.currentTextFontStyle,
      textAlign: this.currentTextAlignment,
      lineHeight: String(this.currentTextLineSpacing),
      whiteSpace: this.currentTextWordWrap ? "pre-wrap" : "pre",
      overflowWrap: this.currentTextWordWrap ? "break-word" : "normal"
    });
    if ((_b = this.inlineTextEditorFrameEl) == null ? void 0 : _b.classList.contains("is-editing-selected")) {
      this.inlineTextEditorEl.setCssStyles({ height: "100%" });
    } else {
      resizeInlineTextEditor(this.inlineTextEditorEl, ((_c = surface == null ? void 0 : surface.lastHeight) != null ? _c : 600) * 0.42);
    }
    if (this.inlineTextPageNumber !== null) {
      this.updateInlineTextEditorBoxFromContent(this.inlineTextPageNumber);
      this.drawPageAnnotations(this.inlineTextPageNumber);
      this.updateInlineTextCaretMirror();
    }
  }
  updateInlineTextCaretMirror() {
    var _a2;
    (_a2 = this.inlineTextCaretMirrorEl) == null ? void 0 : _a2.replaceChildren();
  }
  applyPreset(presetId) {
    var _a2, _b;
    if (!this.toolState.applyPreset(presetId)) {
      return;
    }
    if (!this.annotationMode) {
      this.annotationMode = true;
      this.refreshStatus("Annotation mode enabled");
    }
    if (this.shouldApplyStyleToSelection()) {
      this.applyColorToSelection(this.currentColor);
      this.applyWidthToSelection(this.getActiveWidth());
    }
    this.persistToolDefaults();
    this.applyOverlayMode();
    this.refreshToolbar();
    this.refreshStatus(`Preset: ${(_b = (_a2 = this.toolState.allPresets.find((preset) => preset.id === presetId)) == null ? void 0 : _a2.label) != null ? _b : "Custom"}`);
  }
  setSelectionMode(mode) {
    this.toolState.setSelectionMode(mode);
    this.persistToolDefaults();
    if (mode !== "lasso") {
      this.currentLasso = null;
    }
    this.drawAllAnnotations();
    this.refreshToolbar();
  }
  persistToolDefaults() {
    this.plugin.updateToolPreferences(this.toolState.snapshot, this.toolState.presetsSnapshot);
  }
  getAppendedPages() {
    if (!this.annotationDocument) {
      return [];
    }
    if (!Array.isArray(this.annotationDocument.appendedPages)) {
      this.annotationDocument.appendedPages = [];
    }
    return this.annotationDocument.appendedPages;
  }
  getTemporarySidecarPageCount() {
    var _a2, _b, _c;
    return (_c = (_b = (_a2 = this.annotationDocument) == null ? void 0 : _a2.appendedPages) == null ? void 0 : _b.length) != null ? _c : 0;
  }
  getRemovedPages() {
    if (!this.annotationDocument) {
      return [];
    }
    if (!Array.isArray(this.annotationDocument.removedPages)) {
      this.annotationDocument.removedPages = [];
    }
    return this.annotationDocument.removedPages;
  }
  isPdfPageDeleted(pageNumber, document = this.annotationDocument) {
    var _a2, _b;
    return !!document && (!!((_a2 = document.deletedPdfPages) == null ? void 0 : _a2.includes(pageNumber)) || !!((_b = document.permanentlyDeletedPdfPages) == null ? void 0 : _b.includes(pageNumber)));
  }
  getSyntheticPageIndex(pageNumber = this.currentPage) {
    return pageNumber > this.realPdfPageCount ? pageNumber - this.realPdfPageCount - 1 : -1;
  }
  getCurrentSyntheticPage() {
    var _a2;
    const index = this.getSyntheticPageIndex();
    return index >= 0 ? (_a2 = this.getAppendedPages()[index]) != null ? _a2 : null : null;
  }
  getSyntheticPageById(pageId) {
    const pages = this.getAppendedPages();
    const index = pages.findIndex((page) => page.id === pageId);
    if (index < 0) {
      return null;
    }
    return {
      page: pages[index],
      index,
      pageNumber: this.realPdfPageCount + index + 1
    };
  }
  getSyntheticPageInsertAfterPdfPage(page) {
    const rawAnchor = typeof page.insertAfterPdfPage === "number" ? page.insertAfterPdfPage : this.realPdfPageCount;
    return clamp2(Math.round(rawAnchor), 0, Math.max(0, this.realPdfPageCount));
  }
  findSyntheticInsertIndexAfterPdfPage(pdfPageNumber) {
    const anchor = clamp2(Math.round(pdfPageNumber), 0, Math.max(0, this.realPdfPageCount));
    const pages = this.getAppendedPages();
    let lastMatchingIndex = -1;
    for (let index = 0; index < pages.length; index += 1) {
      const pageAnchor = this.getSyntheticPageInsertAfterPdfPage(pages[index]);
      if (pageAnchor === anchor) {
        lastMatchingIndex = index;
      }
      if (lastMatchingIndex < 0 && pageAnchor > anchor) {
        return index;
      }
    }
    return lastMatchingIndex >= 0 ? lastMatchingIndex + 1 : pages.length;
  }
  findFirstSyntheticInsertIndexAfterPdfPage(pdfPageNumber) {
    const anchor = clamp2(Math.round(pdfPageNumber), 0, Math.max(0, this.realPdfPageCount));
    const pages = this.getAppendedPages();
    for (let index = 0; index < pages.length; index += 1) {
      const pageAnchor = this.getSyntheticPageInsertAfterPdfPage(pages[index]);
      if (pageAnchor >= anchor) {
        return index;
      }
    }
    return pages.length;
  }
  getPageMenuAnchor() {
    var _a2, _b, _c, _d;
    return (_d = (_c = (_a2 = this.toolbarEl) == null ? void 0 : _a2.querySelector(".pdf-native-annotator-page-menu-button")) != null ? _c : (_b = this.toolbarEl) == null ? void 0 : _b.querySelector(".pdf-native-annotator-page-chip")) != null ? _d : this.toolbarEl;
  }
  getMixedPageCount() {
    return Math.max(this.realPdfPageCount, 0) + this.getAppendedPages().length;
  }
  getAnnotationCountForPage(pageNumber, document = this.annotationDocument) {
    return this.getAnnotationBreakdownForPage(pageNumber, document).total;
  }
  getAnnotationBreakdownForPage(pageNumber, document = this.annotationDocument) {
    var _a2, _b, _c, _d, _e;
    const strokes = (_a2 = document == null ? void 0 : document.strokes.filter((stroke) => stroke.page === pageNumber).length) != null ? _a2 : 0;
    const text = (_b = document == null ? void 0 : document.textItems.filter((item) => item.page === pageNumber).length) != null ? _b : 0;
    const shapes = (_c = document == null ? void 0 : document.shapes.filter((shape) => shape.page === pageNumber).length) != null ? _c : 0;
    const images = (_e = (_d = document == null ? void 0 : document.imageItems) == null ? void 0 : _d.filter((image) => image.page === pageNumber).length) != null ? _e : 0;
    return {
      strokes,
      text,
      shapes,
      images,
      total: strokes + text + shapes + images
    };
  }
  getMixedPageEntries(document = this.annotationDocument) {
    var _a2, _b, _c, _d, _e, _f;
    const entries = [];
    const addedEntriesByAnchor = /* @__PURE__ */ new Map();
    const appendedPages = (_a2 = document == null ? void 0 : document.appendedPages) != null ? _a2 : [];
    appendedPages.forEach((page, index) => {
      var _a3;
      const pageNumber = this.realPdfPageCount + index + 1;
      const annotationCount = this.getAnnotationCountForPage(pageNumber, document);
      const insertAfter = this.getSyntheticPageInsertAfterPdfPage(page);
      const group = (_a3 = addedEntriesByAnchor.get(insertAfter)) != null ? _a3 : [];
      group.push({
        pageNumber,
        label: page.title.trim() || `Added page ${index + 1}`,
        detail: `${getNotebookTemplateLabel(page.template)} - ${getNotebookPageSizeLabel(page.pageSize)} - ${page.title.trim() || `Added page ${index + 1}`}`,
        isAdded: true,
        annotationCount,
        pageId: page.id,
        template: page.template,
        pageSize: page.pageSize,
        paperColor: page.paperColor
      });
      addedEntriesByAnchor.set(insertAfter, group);
    });
    entries.push(...(_b = addedEntriesByAnchor.get(0)) != null ? _b : []);
    for (let pageNumber = 1; pageNumber <= this.realPdfPageCount; pageNumber += 1) {
      if (this.isPdfPageDeleted(pageNumber, document)) {
        entries.push(...(_c = addedEntriesByAnchor.get(pageNumber)) != null ? _c : []);
        continue;
      }
      const annotationCount = this.getAnnotationCountForPage(pageNumber, document);
      const pageTemplate = document && hasEditableNativePageTemplates(document, this.realPdfPageCount) ? (_e = ((_d = document.pdfPageTemplates) != null ? _d : []).find((template) => template.page === pageNumber)) != null ? _e : null : null;
      entries.push({
        pageNumber,
        label: `Page ${pageNumber}`,
        detail: pageTemplate ? `${getNotebookTemplateLabel(pageTemplate.template)} - ${getNotebookPageSizeLabel(pageTemplate.pageSize)} - Plugin-created PDF page ${pageNumber}` : `PDF page - Page ${pageNumber}`,
        isAdded: false,
        annotationCount,
        template: pageTemplate == null ? void 0 : pageTemplate.template,
        pageSize: pageTemplate == null ? void 0 : pageTemplate.pageSize,
        paperColor: pageTemplate == null ? void 0 : pageTemplate.paperColor
      });
      entries.push(...(_f = addedEntriesByAnchor.get(pageNumber)) != null ? _f : []);
    }
    return entries;
  }
  getRemovedPageEntries(document = this.annotationDocument) {
    var _a2, _b, _c;
    if (!document) {
      return [];
    }
    const permanentPdfPages = new Set((_a2 = document.permanentlyDeletedPdfPages) != null ? _a2 : []);
    const hiddenPdfEntries = ((_b = document.deletedPdfPages) != null ? _b : []).filter((pageNumber) => pageNumber >= 1 && pageNumber <= this.realPdfPageCount).filter((pageNumber) => !permanentPdfPages.has(pageNumber)).map((pageNumber) => ({
      pageNumber,
      label: `Page ${pageNumber}`,
      detail: `Removed PDF page - annotations preserved`,
      isAdded: false,
      annotationCount: this.getAnnotationCountForPage(pageNumber, document),
      isRemoved: true,
      removedKind: "pdf"
    }));
    const removedAddedEntries = ((_c = document.removedPages) != null ? _c : []).map((entry) => ({
      pageNumber: 0,
      label: entry.page.title.trim() || "Removed added page",
      detail: `${getNotebookTemplateLabel(entry.page.template)} - ${getNotebookPageSizeLabel(entry.page.pageSize)} - removed`,
      isAdded: true,
      annotationCount: entry.annotations.strokes.length + entry.annotations.textItems.length + entry.annotations.shapes.length + entry.annotations.imageItems.length,
      pageId: entry.page.id,
      template: entry.page.template,
      pageSize: entry.page.pageSize,
      paperColor: entry.page.paperColor,
      isRemoved: true,
      removedKind: "added"
    }));
    return [...hiddenPdfEntries, ...removedAddedEntries];
  }
  canNavigateMixedPage(direction) {
    const entries = this.getMixedPageEntries();
    const index = entries.findIndex((entry) => entry.pageNumber === this.currentPage);
    const nextIndex = index + direction;
    return index >= 0 && nextIndex >= 0 && nextIndex < entries.length;
  }
  navigateMixedPage(direction) {
    const entries = this.getMixedPageEntries();
    if (entries.length === 0) {
      return;
    }
    const index = entries.findIndex((entry) => entry.pageNumber === this.currentPage);
    const nextEntry = entries[clamp2((index >= 0 ? index : 0) + direction, 0, entries.length - 1)];
    if (!nextEntry || nextEntry.pageNumber === this.currentPage) {
      return;
    }
    this.goToMixedPage(nextEntry.pageNumber);
  }
  goToMixedPage(pageNumber) {
    const totalPages = this.getMixedPageCount();
    if (totalPages <= 0) {
      return;
    }
    const nextPage = clamp2(Math.round(pageNumber), 1, totalPages);
    this.currentPage = nextPage;
    const surface = this.pageSurfaces.get(nextPage);
    if (surface) {
      this.scrollPageElementIntoView(surface.pageEl);
    } else {
      this.scheduleSyncPages();
    }
    this.refreshToolbar();
    this.refreshStatus(this.getCurrentSyntheticPage() ? `Added page ${nextPage}` : `PDF page ${nextPage}`);
  }
  scrollPageElementIntoView(pageEl) {
    pageEl.scrollIntoView({
      block: "center",
      behavior: isTabletWebKitTouchDevice() ? "auto" : "smooth"
    });
  }
  hasCurrentAddedPage() {
    this.syncCurrentPageForPageAction();
    return !!this.getCurrentSyntheticPage();
  }
  addTemplatePageBeforeCurrent() {
    this.syncCurrentPageForPageAction();
    this.insertTemplatePageBeforeCurrent();
  }
  addTemplatePageAfterCurrent() {
    this.syncCurrentPageForPageAction();
    this.insertTemplatePageAfterCurrent();
  }
  addTemplatePageToEnd() {
    this.insertTemplatePageAtEnd();
  }
  duplicateCurrentAddedPage(includeAnnotations = true) {
    this.syncCurrentPageForPageAction();
    this.duplicateCurrentTemplatePage(includeAnnotations);
  }
  clearCurrentAddedPageContents() {
    this.syncCurrentPageForPageAction();
    this.clearCurrentTemplatePageContents();
  }
  deleteCurrentAddedPage() {
    this.deleteCurrentTemplatePage();
  }
  deleteCurrentPage(syncFromViewer = true) {
    if (syncFromViewer) {
      this.syncCurrentPageForPageAction();
    }
    if (this.getCurrentSyntheticPage()) {
      this.deleteCurrentTemplatePage();
      return;
    }
    this.deleteCurrentPdfPageFromSession();
  }
  canNavigatePage(direction) {
    this.syncCurrentPageForPageAction();
    return this.canNavigateMixedPage(direction);
  }
  goToPreviousPage() {
    this.navigateMixedPage(-1);
  }
  goToNextPage() {
    this.navigateMixedPage(1);
  }
  openMixedPageList() {
    this.syncCurrentPageForPageAction();
    const anchor = this.getPageMenuAnchor();
    if (!anchor) {
      new import_obsidian6.Notice("The PDF toolbar is not ready yet.");
      return;
    }
    this.openPageListPopover(anchor);
  }
  openGoToPage() {
    this.syncCurrentPageForPageAction();
    const anchor = this.getPageMenuAnchor();
    if (!anchor) {
      new import_obsidian6.Notice("The PDF toolbar is not ready yet.");
      return;
    }
    this.openGoToPagePopover(anchor);
  }
  renumberTemplatePageTitles() {
    this.getAppendedPages().forEach((page, index) => {
      if (/^Page \d+( copy)?$/.test(page.title)) {
        page.title = `Page ${this.realPdfPageCount + index + 1}`;
      }
    });
  }
  refreshSyntheticPages(targetPageNumber) {
    this.finishSessionInlineTextEditor(true);
    this.renumberTemplatePageTitles();
    this.syncPages();
    if (targetPageNumber) {
      this.currentPage = targetPageNumber;
      const surface = this.pageSurfaces.get(targetPageNumber);
      if (surface) {
        surface.overlayEl.setCssStyles({ visibility: "visible" });
        this.scrollPageElementIntoView(surface.pageEl);
        this.resizeOverlay(surface);
        this.applyOverlayMode();
        this.drawPageAnnotations(targetPageNumber);
      }
    }
    this.refreshToolbar();
  }
  insertTemplatePageAtIndex(insertIndex, insertAfterPdfPage, options) {
    var _a2, _b, _c, _d, _e, _f;
    if (!this.annotationDocument) {
      return;
    }
    this.finishSessionInlineTextEditor(true);
    const pages = this.getAppendedPages();
    const boundedInsertIndex = clamp2(insertIndex, 0, pages.length);
    const anchor = insertAfterPdfPage === void 0 ? this.realPdfPageCount : clamp2(Math.round(insertAfterPdfPage != null ? insertAfterPdfPage : this.realPdfPageCount), 0, Math.max(0, this.realPdfPageCount));
    const pageOptions = options != null ? options : {
      title: `Page ${this.realPdfPageCount + pages.length + 1}`,
      template: (_b = (_a2 = this.getCurrentSyntheticPage()) == null ? void 0 : _a2.template) != null ? _b : "ruled",
      pageSize: (_d = (_c = this.getCurrentSyntheticPage()) == null ? void 0 : _c.pageSize) != null ? _d : "a4",
      paperColor: (_f = (_e = this.getCurrentSyntheticPage()) == null ? void 0 : _e.paperColor) != null ? _f : "#fffdf7"
    };
    const nextPage = createTemplateNotebookPage(
      pageOptions.title.trim() || `Page ${this.realPdfPageCount + pages.length + 1}`,
      pageOptions.template,
      pageOptions.pageSize,
      pageOptions.paperColor
    );
    nextPage.insertAfterPdfPage = anchor;
    this.pushHistory();
    const insertedPageNumber = insertSyntheticPage(
      this.annotationDocument,
      this.realPdfPageCount,
      boundedInsertIndex,
      nextPage
    );
    this.selectedTargets = this.selectedTargets.map((target) => target.page >= insertedPageNumber ? { ...target, page: target.page + 1 } : target);
    this.currentPage = insertedPageNumber;
    this.annotationMode = true;
    this.markDirtyAndRedraw("Added template page to PDF");
    this.refreshSyntheticPages(insertedPageNumber);
  }
  insertTemplatePageAtLocation(location, options) {
    const insertIndex = clamp2(location.insertIndex, 0, this.getAppendedPages().length);
    this.insertTemplatePageAtIndex(insertIndex, location.anchor, options);
  }
  insertTemplatePageAfterCurrent() {
    const currentSyntheticIndex = this.getSyntheticPageIndex();
    if (currentSyntheticIndex >= 0) {
      const currentSyntheticPage = this.getAppendedPages()[currentSyntheticIndex];
      this.insertTemplatePageAtIndex(currentSyntheticIndex + 1, this.getSyntheticPageInsertAfterPdfPage(currentSyntheticPage));
      return;
    }
    const anchor = clamp2(this.currentPage, 0, Math.max(0, this.realPdfPageCount));
    this.insertTemplatePageAtIndex(this.findFirstSyntheticInsertIndexAfterPdfPage(anchor), anchor);
  }
  openTemplatePageInsertModalAfterPageId(pageId) {
    const target = this.getSyntheticPageById(pageId);
    if (!target) {
      new import_obsidian6.Notice("That added page is no longer available.");
      return;
    }
    this.closePageListPopover();
    this.openTemplatePageInsertModalAtLocation("after", {
      insertIndex: target.index + 1,
      anchor: this.getSyntheticPageInsertAfterPdfPage(target.page),
      anchorLabel: target.page.title.trim() || `added page ${target.pageNumber}`
    }, {
      title: `Inserted page after ${target.page.title.trim() || `added page ${target.pageNumber}`}`,
      template: target.page.template,
      pageSize: target.page.pageSize,
      paperColor: target.page.paperColor
    });
  }
  openTemplatePageInsertModalAfterPdfPage(pdfPageNumber) {
    const anchor = clamp2(Math.round(pdfPageNumber), 0, Math.max(0, this.realPdfPageCount));
    this.closePageListPopover();
    this.openTemplatePageInsertModalAtLocation("after", {
      insertIndex: this.findFirstSyntheticInsertIndexAfterPdfPage(anchor),
      anchor,
      anchorLabel: `PDF page ${anchor}`
    });
  }
  insertTemplatePageBeforeCurrent() {
    const currentSyntheticIndex = this.getSyntheticPageIndex();
    if (currentSyntheticIndex < 0) {
      const anchor = clamp2(this.currentPage - 1, 0, Math.max(0, this.realPdfPageCount));
      this.insertTemplatePageAtIndex(this.findSyntheticInsertIndexAfterPdfPage(anchor), anchor);
      return;
    }
    const currentSyntheticPage = this.getAppendedPages()[currentSyntheticIndex];
    this.insertTemplatePageAtIndex(currentSyntheticIndex, this.getSyntheticPageInsertAfterPdfPage(currentSyntheticPage));
  }
  insertTemplatePageAtEnd() {
    this.insertTemplatePageAtIndex(this.getAppendedPages().length, this.realPdfPageCount);
  }
  deleteCurrentTemplatePage() {
    if (!this.annotationDocument) {
      return;
    }
    this.finishSessionInlineTextEditor(false);
    const pageIndex = this.getSyntheticPageIndex();
    const pages = this.getAppendedPages();
    if (pageIndex < 0 || pageIndex >= pages.length) {
      new import_obsidian6.Notice("Only added template pages can be deleted here.");
      return;
    }
    const pageNumber = this.realPdfPageCount + pageIndex + 1;
    const title = pages[pageIndex].title;
    this.requestDangerConfirmation(
      "Remove added page?",
      `${title} and its annotations will move to Removed pages, where they can be restored or deleted permanently.`,
      "Move to Removed",
      () => {
        if (!this.annotationDocument) {
          return;
        }
        this.pushHistory();
        const removedPage = removeSyntheticPageToTrash(
          this.annotationDocument,
          this.realPdfPageCount,
          pageIndex
        );
        if (!removedPage) {
          return;
        }
        this.selectedTargets = [];
        this.selectedTarget = null;
        this.currentPage = Math.max(1, Math.min(pageNumber, this.realPdfPageCount + pages.length));
        this.markDirtyAndRedraw("Moved added page to Removed");
        this.refreshSyntheticPages(this.currentPage);
      }
    );
  }
  deleteCurrentPdfPageFromSession() {
    var _a2, _b;
    if (!this.annotationDocument || this.currentPage < 1 || this.currentPage > this.realPdfPageCount) {
      new import_obsidian6.Notice("Open a PDF page first.");
      return;
    }
    const pageNumber = this.currentPage;
    if (this.isPdfPageDeleted(pageNumber)) {
      new import_obsidian6.Notice(`PDF page ${pageNumber} is already hidden from this session.`);
      return;
    }
    this.finishSessionInlineTextEditor(false);
    this.pushHistory();
    if (!hidePdfPage(this.annotationDocument, pageNumber)) {
      return;
    }
    this.selectedTargets = [];
    this.selectedTarget = null;
    const entries = this.getMixedPageEntries();
    const nextEntry = (_a2 = entries.find((entry) => entry.pageNumber > pageNumber)) != null ? _a2 : entries[entries.length - 1];
    this.currentPage = (_b = nextEntry == null ? void 0 : nextEntry.pageNumber) != null ? _b : 1;
    this.markDirtyAndRedraw(`Moved PDF page ${pageNumber} to Removed`);
    this.syncPages();
    this.goToMixedPage(this.currentPage);
  }
  deleteAddedPageById(pageId) {
    const target = this.getSyntheticPageById(pageId);
    if (!target) {
      new import_obsidian6.Notice("That added page is no longer available.");
      return;
    }
    this.closePageListPopover();
    this.currentPage = target.pageNumber;
    this.deleteCurrentTemplatePage();
  }
  restoreRemovedAddedPageById(pageId) {
    if (!this.annotationDocument) {
      return;
    }
    this.closePageListPopover();
    this.pushHistory();
    const restoredPageNumber = restoreSyntheticPageFromTrash(
      this.annotationDocument,
      this.realPdfPageCount,
      pageId
    );
    if (restoredPageNumber === null) {
      new import_obsidian6.Notice("That removed page is no longer available.");
      return;
    }
    this.selectedTargets = [];
    this.selectedTarget = null;
    this.currentPage = restoredPageNumber;
    this.markDirtyAndRedraw("Restored added page");
    this.refreshSyntheticPages(restoredPageNumber);
  }
  permanentlyDeleteRemovedAddedPageById(pageId) {
    const removedPage = this.getRemovedPages().find((entry) => entry.page.id === pageId);
    if (!removedPage) {
      new import_obsidian6.Notice("That removed page is no longer available.");
      return;
    }
    this.closePageListPopover();
    this.requestDangerConfirmation(
      "Delete removed page permanently?",
      `${removedPage.page.title} and its stored annotations will be permanently deleted. This cannot be restored after the session is saved and reopened.`,
      "Delete permanently",
      () => {
        if (!this.annotationDocument) {
          return;
        }
        this.pushHistory();
        if (!permanentlyDeleteRemovedPage(this.annotationDocument, pageId)) {
          return;
        }
        this.markDirtyAndRedraw("Permanently deleted removed page");
        this.refreshToolbar();
      }
    );
  }
  permanentlyDeleteRemovedPdfPageByNumber(pageNumber) {
    var _a2;
    if (!this.annotationDocument || pageNumber < 1 || pageNumber > this.realPdfPageCount) {
      new import_obsidian6.Notice("That removed PDF page is no longer available.");
      return;
    }
    if (!((_a2 = this.annotationDocument.deletedPdfPages) == null ? void 0 : _a2.includes(pageNumber))) {
      new import_obsidian6.Notice("That PDF page is not in Removed.");
      return;
    }
    this.closePageListPopover();
    this.requestDangerConfirmation(
      "Delete removed PDF page permanently?",
      `PDF page ${pageNumber} will be permanently omitted from this working session and future mixed exports. The original source PDF bytes are not rewritten.`,
      "Delete permanently",
      () => {
        if (!this.annotationDocument) {
          return;
        }
        this.pushHistory();
        if (!permanentlyDeleteHiddenPdfPage(this.annotationDocument, pageNumber)) {
          return;
        }
        this.selectedTargets = [];
        this.selectedTarget = null;
        this.markDirtyAndRedraw(`Permanently deleted PDF page ${pageNumber}`);
        this.syncPages();
        this.refreshToolbar();
      }
    );
  }
  restorePdfPageToSession(pageNumber) {
    if (!this.annotationDocument || pageNumber < 1 || pageNumber > this.realPdfPageCount) {
      return;
    }
    this.closePageListPopover();
    this.pushHistory();
    if (!restorePdfPage(this.annotationDocument, pageNumber)) {
      return;
    }
    this.currentPage = pageNumber;
    this.markDirtyAndRedraw(`Restored PDF page ${pageNumber}`);
    this.syncPages();
    this.goToMixedPage(pageNumber);
  }
  duplicateCurrentTemplatePage(includeAnnotations = true) {
    var _a2, _b, _c, _d;
    if (!this.annotationDocument) {
      return;
    }
    this.finishSessionInlineTextEditor(true);
    const pageIndex = this.getSyntheticPageIndex();
    const pages = this.getAppendedPages();
    if (pageIndex < 0 || pageIndex >= pages.length) {
      new import_obsidian6.Notice("Only added template pages can be duplicated here.");
      return;
    }
    const sourcePage = pages[pageIndex];
    const insertIndex = pageIndex + 1;
    const sourcePageNumber = this.realPdfPageCount + pageIndex + 1;
    const sourceStrokes = this.annotationDocument.strokes.filter((stroke) => stroke.page === sourcePageNumber);
    const sourceEraserPaths = ((_a2 = this.annotationDocument.eraserPaths) != null ? _a2 : []).filter((eraserPath) => eraserPath.page === sourcePageNumber);
    const sourceTextItems = this.annotationDocument.textItems.filter((item) => item.page === sourcePageNumber);
    const sourceShapes = this.annotationDocument.shapes.filter((shape) => shape.page === sourcePageNumber);
    const sourceImages = ((_b = this.annotationDocument.imageItems) != null ? _b : []).filter((image) => image.page === sourcePageNumber);
    this.pushHistory();
    const nextPage = {
      ...sourcePage,
      id: generateId("page"),
      title: `${sourcePage.title} copy`,
      strokes: [],
      textItems: [],
      shapes: [],
      imageItems: []
    };
    const insertedPageNumber = insertSyntheticPage(
      this.annotationDocument,
      this.realPdfPageCount,
      insertIndex,
      nextPage
    );
    if (includeAnnotations) {
      const clonedAnnotations = cloneAnnotationsForPage(sourceStrokes, sourceTextItems, sourceShapes, insertedPageNumber);
      this.annotationDocument.strokes.push(...clonedAnnotations.strokes);
      ((_d = (_c = this.annotationDocument).eraserPaths) != null ? _d : _c.eraserPaths = []).push(...sourceEraserPaths.map((eraserPath) => ({
        ...JSON.parse(JSON.stringify(eraserPath)),
        id: generateId("erase"),
        page: insertedPageNumber
      })));
      this.annotationDocument.textItems.push(...clonedAnnotations.textItems);
      this.annotationDocument.shapes.push(...clonedAnnotations.shapes);
      if (!Array.isArray(this.annotationDocument.imageItems)) {
        this.annotationDocument.imageItems = [];
      }
      this.annotationDocument.imageItems.push(...sourceImages.map((image) => ({
        ...JSON.parse(JSON.stringify(image)),
        id: generateId("image"),
        page: insertedPageNumber,
        zIndex: this.getNextPageZIndex(insertedPageNumber)
      })));
    }
    this.selectedTargets = [];
    this.selectedTarget = null;
    this.currentPage = insertedPageNumber;
    this.markDirtyAndRedraw(includeAnnotations ? "Duplicated added page" : "Duplicated page structure");
    this.refreshSyntheticPages(insertedPageNumber);
  }
  duplicateAddedPageById(pageId, includeAnnotations = true) {
    const target = this.getSyntheticPageById(pageId);
    if (!target) {
      new import_obsidian6.Notice("That added page is no longer available.");
      return;
    }
    this.closePageListPopover();
    this.currentPage = target.pageNumber;
    this.duplicateCurrentTemplatePage(includeAnnotations);
  }
  clearCurrentTemplatePageContents() {
    var _a2, _b;
    if (!this.annotationDocument) {
      return;
    }
    this.finishSessionInlineTextEditor(false);
    const pageIndex = this.getSyntheticPageIndex();
    const pages = this.getAppendedPages();
    if (pageIndex < 0 || pageIndex >= pages.length) {
      new import_obsidian6.Notice("Only added template pages can be cleared here.");
      return;
    }
    const page = pages[pageIndex];
    const pageNumber = this.realPdfPageCount + pageIndex + 1;
    const hasContents = this.annotationDocument.strokes.some((stroke) => stroke.page === pageNumber) || ((_a2 = this.annotationDocument.eraserPaths) != null ? _a2 : []).some((eraserPath) => eraserPath.page === pageNumber) || this.annotationDocument.textItems.some((item) => item.page === pageNumber) || this.annotationDocument.shapes.some((shape) => shape.page === pageNumber) || ((_b = this.annotationDocument.imageItems) != null ? _b : []).some((image) => image.page === pageNumber);
    if (!hasContents) {
      return;
    }
    this.requestDangerConfirmation(
      "Clear added page?",
      `All annotations on ${page.title} will be removed, but the page itself will stay.`,
      "Clear page",
      () => {
        var _a3, _b2;
        if (!this.annotationDocument) {
          return;
        }
        this.pushHistory();
        this.annotationDocument.strokes = this.annotationDocument.strokes.filter((stroke) => stroke.page !== pageNumber);
        this.annotationDocument.eraserPaths = ((_a3 = this.annotationDocument.eraserPaths) != null ? _a3 : []).filter((eraserPath) => eraserPath.page !== pageNumber);
        this.annotationDocument.textItems = this.annotationDocument.textItems.filter((item) => item.page !== pageNumber);
        this.annotationDocument.shapes = this.annotationDocument.shapes.filter((shape) => shape.page !== pageNumber);
        this.annotationDocument.imageItems = ((_b2 = this.annotationDocument.imageItems) != null ? _b2 : []).filter((image) => image.page !== pageNumber);
        this.selectedTargets = [];
        this.selectedTarget = null;
        this.markDirtyAndRedraw("Cleared added page");
        this.refreshSyntheticPages(pageNumber);
      }
    );
  }
  clearAddedPageById(pageId) {
    const target = this.getSyntheticPageById(pageId);
    if (!target) {
      new import_obsidian6.Notice("That added page is no longer available.");
      return;
    }
    this.closePageListPopover();
    this.currentPage = target.pageNumber;
    this.clearCurrentTemplatePageContents();
  }
  setCurrentTemplatePageTemplate(template) {
    const page = this.getCurrentSyntheticPage();
    if (!page || page.template === template) {
      return;
    }
    this.pushHistory();
    page.template = template;
    this.markDirtyAndRedraw(`Template changed to ${template}`);
    this.refreshSyntheticPages(this.currentPage);
  }
  setCurrentTemplatePageSize(pageSize) {
    const page = this.getCurrentSyntheticPage();
    if (!page || page.pageSize === pageSize) {
      return;
    }
    this.pushHistory();
    page.pageSize = pageSize;
    this.markDirtyAndRedraw(`Page size changed to ${pageSize}`);
    this.refreshSyntheticPages(this.currentPage);
  }
  setAddedPageTemplateById(pageId, template) {
    const target = this.getSyntheticPageById(pageId);
    if (!target) {
      new import_obsidian6.Notice("That added page is no longer available.");
      return;
    }
    if (target.page.template === template) {
      return;
    }
    this.pushHistory();
    target.page.template = template;
    this.markDirtyAndRedraw(`Template changed to ${getNotebookTemplateLabel(template)}`);
    this.refreshSyntheticPages(target.pageNumber);
  }
  setAddedPageSizeById(pageId, pageSize) {
    const target = this.getSyntheticPageById(pageId);
    if (!target) {
      new import_obsidian6.Notice("That added page is no longer available.");
      return;
    }
    if (target.page.pageSize === pageSize) {
      return;
    }
    this.pushHistory();
    target.page.pageSize = pageSize;
    this.markDirtyAndRedraw(`Page size changed to ${getNotebookPageSizeLabel(pageSize)}`);
    this.refreshSyntheticPages(target.pageNumber);
  }
  setAddedPagePaperColorById(pageId, color) {
    const target = this.getSyntheticPageById(pageId);
    if (!target) {
      new import_obsidian6.Notice("That added page is no longer available.");
      return;
    }
    if (target.page.paperColor.toLowerCase() === color.toLowerCase()) {
      return;
    }
    this.pushHistory();
    target.page.paperColor = color;
    this.markDirtyAndRedraw("Paper color changed");
    this.refreshSyntheticPages(target.pageNumber);
  }
  openGoToPagePopover(anchor) {
    const entries = this.getMixedPageEntries();
    const totalPages = entries.length;
    if (totalPages <= 0) {
      return;
    }
    this.beginExclusiveMenu();
    const popover = createDiv();
    popover.className = "modal pdf-native-annotator-rename-popover pdf-native-annotator-goto-popover";
    const title = popover.createDiv({ cls: "pdf-native-annotator-color-popover-title", text: "Go to page" });
    title.appendChild(this.createPopoverCloseButton(() => this.closeGoToPagePopover()));
    const form = popover.createEl("form", { cls: "pdf-native-annotator-rename-form" });
    const input = form.createEl("input", {
      type: "number",
      placeholder: `1-${totalPages}`
    });
    input.className = "pdf-native-annotator-rename-input";
    input.min = "1";
    input.max = String(totalPages);
    input.step = "1";
    input.value = String(this.getCurrentMixedPageOrdinal());
    form.createDiv({ cls: "pdf-native-annotator-popover-hint", text: `${totalPages} pages including added template pages` });
    const actions = form.createDiv({ cls: "pdf-native-annotator-confirm-actions" });
    const cancelButton = actions.createEl("button", { type: "button", text: "Cancel" });
    const goButton = actions.createEl("button", { type: "submit", text: "Go", cls: "mod-cta" });
    const commit = () => {
      const requestedPage = Number(input.value);
      if (!Number.isFinite(requestedPage) || requestedPage < 1 || requestedPage > totalPages) {
        new import_obsidian6.Notice(`Enter a page from 1 to ${totalPages}.`);
        return;
      }
      this.closeGoToPagePopover();
      this.goToMixedPage(entries[requestedPage - 1].pageNumber);
    };
    cancelButton.addEventListener("click", () => this.closeGoToPagePopover());
    goButton.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      commit();
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        commit();
      }
      if (event.key === "Escape") {
        event.preventDefault();
        this.closeGoToPagePopover();
      }
      event.stopPropagation();
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      commit();
    });
    this.transientPopovers.open("go-to-page", popover);
    this.positionPopoverNearAnchor(popover, anchor);
    this.ownerWindow.setTimeout(() => {
      input.focus();
      input.select();
    }, 0);
  }
  openMixedPageEntryMenu(entry, event, anchor) {
    const openOrRestore = () => {
      if (entry.isRemoved) {
        if (entry.removedKind === "pdf") {
          this.restorePdfPageToSession(entry.pageNumber);
        } else if (entry.pageId) {
          this.restoreRemovedAddedPageById(entry.pageId);
        }
        return;
      }
      this.closePageListPopover();
      this.goToMixedPage(entry.pageNumber);
    };
    const menu = new import_obsidian6.Menu();
    if (entry.isRemoved) {
      menu.addItem((item) => item.setTitle("Restore page").setIcon("rotate-ccw").onClick(openOrRestore));
      if (entry.removedKind === "pdf") {
        menu.addSeparator();
        menu.addItem((item) => item.setTitle("Delete permanently").setIcon("trash").setWarning(true).onClick(() => this.permanentlyDeleteRemovedPdfPageByNumber(entry.pageNumber)));
      } else if (entry.removedKind === "added" && entry.pageId) {
        menu.addSeparator();
        menu.addItem((item) => item.setTitle("Delete permanently").setIcon("trash").onClick(() => this.permanentlyDeleteRemovedAddedPageById(entry.pageId)));
      }
      this.showExclusiveMenuAtMouseEvent(menu, event);
      return;
    }
    menu.addItem((item) => item.setTitle("Open page").setIcon("arrow-right").onClick(openOrRestore));
    menu.addItem((item) => item.setTitle("Copy page link").setIcon("link").onClick(() => void this.copyPageLink(entry.pageNumber)));
    menu.addItem((item) => item.setTitle("Export page snapshot").setIcon("image-file").onClick(() => void this.exportPageSnapshot(entry.pageNumber)));
    menu.addSeparator();
    if (entry.pageId) {
      menu.addItem((item) => item.setTitle("Add template page after").setIcon("plus").onClick(() => this.openTemplatePageInsertModalAfterPageId(entry.pageId)));
      menu.addItem((item) => item.setTitle("Rename added page...").setIcon("pencil").onClick(() => this.openRenameAddedPagePopover(anchor, entry.pageId)));
      menu.addItem((item) => item.setTitle("Duplicate added page").setIcon("copy").onClick(() => this.duplicateAddedPageById(entry.pageId)));
      menu.addSeparator();
      menu.addItem((item) => item.setTitle("Page template...").setIcon("rows-3").onClick((menuEvent) => this.openAddedPageTemplateMenu(entry.pageId, menuEvent, anchor)));
      menu.addItem((item) => item.setTitle("Page size...").setIcon("maximize-2").onClick((menuEvent) => this.openAddedPageSizeMenu(entry.pageId, menuEvent, anchor)));
      menu.addItem((item) => item.setTitle("Paper color...").setIcon("palette").onClick((menuEvent) => this.openAddedPagePaperColorMenu(entry.pageId, menuEvent, anchor)));
      menu.addSeparator();
      menu.addItem((item) => item.setTitle("Clear added page").setIcon("eraser").onClick(() => this.clearAddedPageById(entry.pageId)));
      menu.addItem((item) => item.setTitle("Move added page to Removed").setIcon("trash").onClick(() => this.deleteAddedPageById(entry.pageId)));
    } else {
      menu.addItem((item) => item.setTitle("Add template page after this PDF page").setIcon("plus").onClick(() => this.openTemplatePageInsertModalAfterPdfPage(entry.pageNumber)));
      if (this.canEditPdfPageTemplate(entry.pageNumber)) {
        menu.addSeparator();
        menu.addItem((item) => item.setTitle("Page template...").setIcon("rows-3").onClick((menuEvent) => this.openPdfPageTemplateMenu(entry.pageNumber, menuEvent, anchor)));
        menu.addItem((item) => item.setTitle("Paper color...").setIcon("palette").onClick((menuEvent) => this.openPdfPagePaperColorMenu(entry.pageNumber, menuEvent, anchor)));
        menu.addSeparator();
      }
      menu.addItem((item) => item.setTitle("Remove PDF page from session").setIcon("trash").onClick(() => {
        this.closePageListPopover();
        this.currentPage = entry.pageNumber;
        this.deleteCurrentPage(false);
      }));
    }
    this.showExclusiveMenuAtMouseEvent(menu, event);
  }
  openAddedPageTemplateMenu(pageId, event, anchor) {
    const target = this.getSyntheticPageById(pageId);
    if (!target) {
      new import_obsidian6.Notice("That added page is no longer available.");
      return;
    }
    const menu = new import_obsidian6.Menu();
    addMenuDescriptors(menu, NOTEBOOK_TEMPLATES.map((template) => ({
      title: getNotebookTemplateLabel(template),
      checked: target.page.template === template,
      run: () => this.setAddedPageTemplateById(pageId, template)
    })));
    this.showMenuAtMenuEvent(menu, event, anchor);
  }
  openAddedPageSizeMenu(pageId, event, anchor) {
    const target = this.getSyntheticPageById(pageId);
    if (!target) {
      new import_obsidian6.Notice("That added page is no longer available.");
      return;
    }
    const menu = new import_obsidian6.Menu();
    addMenuDescriptors(menu, NOTEBOOK_PAGE_SIZES.map((pageSize) => ({
      title: getNotebookPageSizeLabel(pageSize),
      checked: target.page.pageSize === pageSize,
      run: () => this.setAddedPageSizeById(pageId, pageSize)
    })));
    this.showMenuAtMenuEvent(menu, event, anchor);
  }
  openAddedPagePaperColorMenu(pageId, event, anchor) {
    const target = this.getSyntheticPageById(pageId);
    if (!target) {
      new import_obsidian6.Notice("That added page is no longer available.");
      return;
    }
    const menu = new import_obsidian6.Menu();
    addMenuDescriptors(menu, PAPER_COLOR_PRESETS.map((preset) => ({
      title: preset.label,
      icon: "palette",
      checked: target.page.paperColor.toLowerCase() === preset.color.toLowerCase(),
      run: () => this.setAddedPagePaperColorById(pageId, preset.color)
    })));
    this.showMenuAtMenuEvent(menu, event, anchor);
  }
  openPdfPageTemplateMenu(pageNumber, event, anchor) {
    if (!this.canEditPdfPageTemplate(pageNumber)) {
      return;
    }
    const pageTemplate = this.getPdfPageTemplate(pageNumber);
    if (!pageTemplate) {
      return;
    }
    const menu = new import_obsidian6.Menu();
    addMenuDescriptors(menu, NOTEBOOK_TEMPLATES.map((template) => ({
      title: getNotebookTemplateLabel(template),
      checked: pageTemplate.template === template,
      run: () => this.setPdfPageTemplateByPage(pageNumber, template)
    })));
    this.showMenuAtMenuEvent(menu, event, anchor);
  }
  openPdfPagePaperColorMenu(pageNumber, event, anchor) {
    if (!this.canEditPdfPageTemplate(pageNumber)) {
      return;
    }
    const pageTemplate = this.getPdfPageTemplate(pageNumber);
    if (!pageTemplate) {
      return;
    }
    const menu = new import_obsidian6.Menu();
    addMenuDescriptors(menu, PAPER_COLOR_PRESETS.map((preset) => ({
      title: preset.label,
      icon: "palette",
      checked: pageTemplate.paperColor.toLowerCase() === preset.color.toLowerCase(),
      run: () => this.setPdfPagePaperColorByPage(pageNumber, preset.color)
    })));
    this.showMenuAtMenuEvent(menu, event, anchor);
  }
  showMenuAtMenuEvent(menu, event, anchor) {
    const anchorRect = anchor.getBoundingClientRect();
    const x2 = "clientX" in event && event.clientX > 0 ? event.clientX : anchorRect.right + 8;
    const y2 = "clientY" in event && event.clientY > 0 ? event.clientY : anchorRect.top;
    this.showExclusiveMenuAtPosition(menu, { x: x2, y: y2, overlap: true });
  }
  closeActiveNativeMenu() {
    const menu = this.activeNativeMenu;
    this.activeNativeMenu = null;
    menu == null ? void 0 : menu.hide();
  }
  beginExclusiveMenu() {
    this.closeActiveNativeMenu();
    this.closeTransientPopovers();
  }
  trackActiveNativeMenu(menu) {
    this.activeNativeMenu = menu;
    menu.onHide(() => {
      if (this.activeNativeMenu === menu) {
        this.activeNativeMenu = null;
      }
    });
  }
  showExclusiveMenuAtPosition(menu, position) {
    this.beginExclusiveMenu();
    this.trackActiveNativeMenu(menu);
    menu.showAtPosition(position);
  }
  showExclusiveMenuAtMouseEvent(menu, event) {
    this.beginExclusiveMenu();
    this.trackActiveNativeMenu(menu);
    menu.showAtMouseEvent(event);
  }
  openPageListPopover(anchor) {
    const entries = this.getMixedPageEntries();
    const removedEntries = this.getRemovedPageEntries();
    if (entries.length === 0 && removedEntries.length === 0) {
      return;
    }
    this.beginExclusiveMenu();
    const pageListDocument = anchor.ownerDocument;
    const popover = createDiv();
    popover.className = "modal pdf-native-annotator-page-list-popover";
    const title = popover.createDiv({ cls: "pdf-native-annotator-color-popover-title", text: "Manage pages" });
    title.appendChild(this.createPopoverCloseButton(() => this.closePageListPopover()));
    const countByFilter = {
      all: entries.length,
      annotated: entries.filter((entry) => entry.annotationCount > 0).length,
      added: entries.filter((entry) => entry.isAdded).length,
      removed: removedEntries.length
    };
    const overview = popover.createDiv({ cls: "pdf-native-annotator-page-list-overview" });
    overview.createSpan({
      text: `${countByFilter.all} pages - ${countByFilter.added} added - ${countByFilter.annotated} annotated`
    });
    const filters = popover.createDiv({ cls: "pdf-native-annotator-page-list-filters" });
    const searchWrap = popover.createDiv({ cls: "pdf-native-annotator-page-list-search" });
    const searchInput = searchWrap.createEl("input", {
      type: "search",
      placeholder: "Search pages"
    });
    searchInput.value = this.pageListQuery;
    const summary = popover.createDiv({ cls: "pdf-native-annotator-page-list-summary" });
    const list = popover.createDiv({ cls: "pdf-native-annotator-page-list" });
    let currentFilteredEntries = [];
    const renderList = () => {
      list.replaceChildren();
      const sourceEntries = this.pageListFilter === "removed" ? removedEntries : entries;
      const filteredEntries = sourceEntries.filter((entry) => {
        if (this.pageListFilter === "added") {
          return entry.isAdded;
        }
        return true;
      }).filter((entry) => {
        const query = this.pageListQuery.trim().toLowerCase();
        if (!query) {
          return true;
        }
        return String(entry.pageNumber).includes(query) || entry.label.toLowerCase().includes(query) || entry.detail.toLowerCase().includes(query);
      });
      currentFilteredEntries = filteredEntries;
      summary.textContent = filteredEntries.length === sourceEntries.length ? `${sourceEntries.length} ${this.pageListFilter === "removed" ? "removed" : "pages"}` : `${filteredEntries.length} of ${sourceEntries.length} pages`;
      if (filteredEntries.length === 0) {
        list.createDiv({ cls: "pdf-native-annotator-page-list-empty", text: "No pages match this filter." });
        return;
      }
      for (const entry of filteredEntries) {
        const button = createDiv();
        button.className = "menu-item pdf-native-annotator-page-list-item";
        button.setAttribute("role", "button");
        button.setAttribute("aria-label", `${entry.label}. ${entry.detail}`);
        button.tabIndex = 0;
        if (entry.pageNumber === this.currentPage) {
          button.classList.add("is-active", "is-selected");
        }
        if (entry.isAdded) {
          button.classList.add("is-added");
        }
        if (entry.annotationCount > 0) {
          button.classList.add("has-annotations");
        }
        if (entry.isRemoved) {
          button.classList.add("is-removed");
        }
        const thumbnail = button.createSpan({ cls: "menu-item-icon pdf-native-annotator-page-list-thumbnail" });
        thumbnail.classList.add(entry.isAdded ? "is-added" : "is-pdf");
        if (entry.template) {
          thumbnail.classList.add(`is-template-${entry.template}`);
        }
        if (entry.paperColor) {
          thumbnail.setCssProps({ "--page-list-paper": entry.paperColor });
        }
        const sheet = thumbnail.createSpan({ cls: "pdf-native-annotator-page-list-thumbnail-sheet" });
        sheet.createSpan({ cls: "pdf-native-annotator-page-list-thumbnail-pattern" });
        if (!entry.isAdded) {
          sheet.createSpan({ cls: "pdf-native-annotator-page-list-thumbnail-pdf", text: "PDF" });
        }
        if (entry.annotationCount > 0) {
          thumbnail.createSpan({ cls: "pdf-native-annotator-page-list-thumbnail-count", text: String(entry.annotationCount) });
        }
        const number = button.createSpan({
          cls: "pdf-native-annotator-page-list-number",
          text: entry.isRemoved ? "Removed" : String(entry.pageNumber)
        });
        number.setAttribute("aria-hidden", "true");
        const text = button.createSpan({ cls: "menu-item-title pdf-native-annotator-page-list-text" });
        text.createSpan({ cls: "pdf-native-annotator-page-list-label", text: entry.label });
        text.createSpan({ cls: "pdf-native-annotator-page-list-detail", text: entry.detail });
        const jump = () => {
          if (entry.isRemoved) {
            if (entry.removedKind === "pdf") {
              this.restorePdfPageToSession(entry.pageNumber);
            } else if (entry.pageId) {
              this.restoreRemovedAddedPageById(entry.pageId);
            }
            return;
          }
          this.closePageListPopover();
          this.goToMixedPage(entry.pageNumber);
        };
        button.addEventListener("click", jump);
        button.addEventListener("keydown", (event) => {
          var _a2;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            jump();
          }
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const rows = Array.from(list.querySelectorAll(".pdf-native-annotator-page-list-item"));
            const currentIndex = rows.indexOf(button);
            const offset = event.key === "ArrowDown" ? 1 : -1;
            const nextIndex = clamp2(currentIndex + offset, 0, rows.length - 1);
            (_a2 = rows[nextIndex]) == null ? void 0 : _a2.focus();
          }
        });
        const actions = button.createSpan({ cls: "menu-item-flair pdf-native-annotator-page-list-actions" });
        actions.addEventListener("click", (event) => event.stopPropagation());
        actions.addEventListener("keydown", (event) => event.stopPropagation());
        const moreButton = this.createPageListActionButton("more-horizontal", `Actions for ${entry.label}`, (event) => {
          this.openMixedPageEntryMenu(entry, event, actions);
        });
        actions.append(moreButton);
        list.appendChild(button);
      }
    };
    const renderFilters = () => {
      filters.replaceChildren();
      for (const filter of [
        { id: "all", label: "All", count: countByFilter.all },
        { id: "added", label: "Added", count: countByFilter.added },
        { id: "removed", label: "Removed", count: countByFilter.removed }
      ]) {
        const button = filters.createEl("button", { type: "button" });
        button.className = "pdf-native-annotator-page-list-filter";
        button.createSpan({ text: filter.label });
        if (filter.count > 0) {
          button.createSpan({ cls: "pdf-native-annotator-page-list-filter-count", text: String(filter.count) });
        }
        if (this.pageListFilter === filter.id) {
          button.classList.add("is-active");
        }
        button.addEventListener("click", () => {
          this.pageListFilter = filter.id;
          renderFilters();
          renderList();
        });
      }
    };
    searchInput.addEventListener("input", () => {
      this.pageListQuery = searchInput.value;
      renderList();
    });
    searchInput.addEventListener("keydown", (event) => {
      var _a2;
      event.stopPropagation();
      if (event.key === "Escape") {
        if (searchInput.value) {
          event.preventDefault();
          this.pageListQuery = "";
          searchInput.value = "";
          renderList();
          return;
        }
        this.closePageListPopover();
      }
      if (event.key === "Enter" && currentFilteredEntries.length > 0) {
        event.preventDefault();
        this.closePageListPopover();
        this.goToMixedPage(currentFilteredEntries[0].pageNumber);
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        (_a2 = list.querySelector(".pdf-native-annotator-page-list-item")) == null ? void 0 : _a2.focus();
      }
    });
    renderFilters();
    renderList();
    this.transientPopovers.open("page-list", popover, { onClose: () => pageListDocument.body.classList.remove("pdf-native-annotator-page-list-open") });
    pageListDocument.body.classList.add("pdf-native-annotator-page-list-open");
    this.positionPopoverNearAnchor(popover, anchor, "left");
    this.ownerWindow.setTimeout(() => {
      var _a2;
      return (_a2 = list.querySelector(".pdf-native-annotator-page-list-item.is-active")) == null ? void 0 : _a2.scrollIntoView({ block: "nearest" });
    }, 0);
  }
  openPaperColorPopover(anchor) {
    const page = this.getCurrentSyntheticPage();
    if (!page) {
      return;
    }
    this.beginExclusiveMenu();
    const popover = createDiv();
    popover.className = "modal pdf-native-annotator-color-popover pdf-native-annotator-paper-popover";
    const title = popover.createDiv({ cls: "pdf-native-annotator-color-popover-title", text: "Paper color" });
    title.appendChild(this.createPopoverCloseButton(() => this.closePaperColorPopover()));
    const swatches = popover.createDiv({ cls: "pdf-native-annotator-color-popover-swatches" });
    for (const preset of PAPER_COLOR_PRESETS) {
      const swatch = createEl("button");
      swatch.type = "button";
      swatch.className = "pdf-native-annotator-swatch";
      swatch.title = preset.label;
      swatch.setAttribute("aria-label", `${preset.label} paper`);
      if (page.paperColor.toLowerCase() === preset.color.toLowerCase()) {
        swatch.classList.add("is-active");
      }
      const inner = swatch.createSpan({ cls: "pdf-native-annotator-swatch-inner" });
      inner.setCssStyles({ backgroundColor: preset.color });
      swatch.addEventListener("click", () => {
        this.setCurrentTemplatePageColorValue(preset.color);
        this.closePaperColorPopover();
      });
      swatches.appendChild(swatch);
    }
    const customRow = popover.createDiv({ cls: "pdf-native-annotator-color-popover-custom" });
    customRow.createSpan({ text: "Custom" });
    const colorInput = createEl("input");
    colorInput.type = "color";
    colorInput.value = page.paperColor;
    colorInput.className = "pdf-native-annotator-color";
    let historyCaptured = false;
    colorInput.addEventListener("input", () => {
      if (!historyCaptured) {
        this.pushHistory();
        historyCaptured = true;
      }
      this.setCurrentTemplatePageColorValue(colorInput.value, false);
    });
    colorInput.addEventListener("change", () => {
      this.closePaperColorPopover();
    });
    customRow.appendChild(colorInput);
    this.transientPopovers.open("paper-color", popover);
    this.positionPopoverNearAnchor(popover, anchor);
  }
  openRenameAddedPagePopover(anchor, pageId) {
    const target = this.getSyntheticPageById(pageId);
    if (!target) {
      new import_obsidian6.Notice("That added page is no longer available.");
      return;
    }
    const anchorRect = anchor.getBoundingClientRect();
    this.beginExclusiveMenu();
    const popover = createDiv();
    popover.className = "modal pdf-native-annotator-rename-popover";
    const title = popover.createDiv({ cls: "pdf-native-annotator-color-popover-title", text: "Page name" });
    title.appendChild(this.createPopoverCloseButton(() => this.closeRenamePopover()));
    const form = popover.createEl("form", { cls: "pdf-native-annotator-rename-form" });
    const input = form.createEl("input", {
      type: "text",
      placeholder: "Page name"
    });
    input.value = target.page.title;
    input.className = "pdf-native-annotator-rename-input";
    const actions = form.createDiv({ cls: "pdf-native-annotator-confirm-actions" });
    const cancelButton = actions.createEl("button", { type: "button", text: "Cancel" });
    const saveButton = actions.createEl("button", { type: "submit", text: "Save", cls: "mod-cta" });
    const commitRename = () => {
      this.renameAddedPage(pageId, input.value);
    };
    cancelButton.addEventListener("click", () => this.closeRenamePopover());
    saveButton.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      commitRename();
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        commitRename();
      }
      if (event.key === "Escape") {
        event.preventDefault();
        this.closeRenamePopover();
      }
      event.stopPropagation();
    });
    input.addEventListener("change", commitRename);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      commitRename();
    });
    this.transientPopovers.open("rename", popover);
    this.positionPopoverNearRect(popover, anchorRect);
    this.ownerWindow.setTimeout(() => {
      input.focus();
      input.select();
    }, 0);
  }
  renameAddedPage(pageId, rawTitle) {
    const target = this.getSyntheticPageById(pageId);
    const title = rawTitle.trim();
    if (!target) {
      new import_obsidian6.Notice("That added page is no longer available.");
      this.closeRenamePopover();
      return false;
    }
    if (!title) {
      new import_obsidian6.Notice("Page name cannot be empty.");
      return false;
    }
    if (title === target.page.title) {
      this.closeRenamePopover();
      return false;
    }
    this.pushHistory();
    target.page.title = title;
    this.currentPage = target.pageNumber;
    this.markDirtyAndRedraw("Renamed added page");
    this.refreshSyntheticPages(target.pageNumber);
    this.closeRenamePopover();
    new import_obsidian6.Notice(`Renamed page to "${title}"`);
    return true;
  }
  showMenuBelowAnchor(menu, anchor) {
    const rect = anchor.getBoundingClientRect();
    this.showExclusiveMenuAtPosition(menu, { x: rect.left, y: rect.bottom + 6 });
  }
  openCurrentAddedPageTemplateMenu(anchor) {
    const page = this.getCurrentSyntheticPage();
    if (!page) {
      new import_obsidian6.Notice("Open an added template page first.");
      return;
    }
    const menu = new import_obsidian6.Menu();
    addMenuDescriptors(menu, NOTEBOOK_TEMPLATES.map((template) => ({
      title: getNotebookTemplateLabel(template),
      checked: page.template === template,
      run: () => this.setCurrentTemplatePageTemplate(template)
    })));
    this.showMenuBelowAnchor(menu, anchor);
  }
  openCurrentAddedPageSizeMenu(anchor) {
    const page = this.getCurrentSyntheticPage();
    if (!page) {
      new import_obsidian6.Notice("Open an added template page first.");
      return;
    }
    const menu = new import_obsidian6.Menu();
    addMenuDescriptors(menu, NOTEBOOK_PAGE_SIZES.map((pageSize) => ({
      title: getNotebookPageSizeLabel(pageSize),
      checked: page.pageSize === pageSize,
      run: () => this.setCurrentTemplatePageSize(pageSize)
    })));
    this.showMenuBelowAnchor(menu, anchor);
  }
  openCurrentAddedPagePaperColorMenu(anchor) {
    const page = this.getCurrentSyntheticPage();
    if (!page) {
      new import_obsidian6.Notice("Open an added template page first.");
      return;
    }
    const menu = new import_obsidian6.Menu();
    addMenuDescriptors(menu, [
      ...PAPER_COLOR_PRESETS.map((preset) => ({
        title: preset.label,
        icon: "palette",
        checked: page.paperColor.toLowerCase() === preset.color.toLowerCase(),
        run: () => this.setCurrentTemplatePageColorValue(preset.color)
      })),
      menuSeparator,
      { title: "Custom color...", icon: "palette", run: () => this.openPaperColorPopover(anchor) }
    ]);
    this.showMenuBelowAnchor(menu, anchor);
  }
  openDocumentActionsMenu(button) {
    const menu = new import_obsidian6.Menu();
    menu.addItem((item) => item.setTitle("Insert photo...").setIcon("image-file").onClick(() => void this.insertPhotoOnCurrentPage()));
    menu.addItem((item) => item.setTitle("Create blank annotatable PDF...").setIcon("file-plus-2").onClick(() => this.plugin.openBlankAnnotatablePdfModal()));
    if (!this.plugin.shouldShowRegionToolbarButton()) {
      menu.addItem((item) => item.setTitle("Select region embed").setIcon("crop").onClick(() => {
        this.setActiveTool("region");
        this.applyOverlayMode();
        this.refreshToolbar();
        this.refreshStatus("Region tool: drag a crop box");
      }));
    }
    menu.addSeparator();
    menu.addItem((item) => item.setTitle("Copy current page link").setIcon("link").onClick(() => void this.copyCurrentPageLink()));
    menu.addItem((item) => item.setTitle("Copy annotated page embed").setIcon("code").onClick(() => void this.copyCurrentPageEmbedBlock()));
    if (this.selectedTargets.length > 0) {
      menu.addItem((item) => item.setTitle("Copy selection").setIcon("copy").onClick(() => this.copySelectedTargets()));
      menu.addItem((item) => item.setTitle("Duplicate selection").setIcon("copy-plus").onClick(() => this.duplicateSelectedTargets()));
      menu.addItem((item) => item.setTitle("Delete selection").setIcon("trash").setWarning(true).onClick(() => this.deleteSelectedTargets()));
    }
    if (this.plugin.hasClipboard()) {
      menu.addItem((item) => item.setTitle("Paste copied annotations").setIcon("clipboard").onClick(() => this.pasteClipboard()));
    }
    menu.addSeparator();
    menu.addItem((item) => item.setTitle("Current page snapshot").setIcon("image-file").onClick(() => void this.exportCurrentPageSnapshot()));
    menu.addItem((item) => item.setTitle("Annotated mixed PDF").setIcon("file-output").onClick(() => void this.exportAnnotatedMixedDocumentPdf()));
    menu.addSeparator();
    menu.addItem((item) => item.setTitle("Open annotation data JSON").setIcon("database").onClick(() => void this.openAnnotationDataJson()));
    if (this.shouldShowRelinkAnnotationDataAction()) {
      menu.addItem((item) => item.setTitle("Relink annotation data").setIcon("replace").onClick(() => void this.relinkAnnotationDataToCurrentPdf()));
    }
    menu.addItem((item) => item.setTitle("Create native mixed working PDF").setIcon("file-plus-2").onClick(() => void this.materializeNativeMixedWorkingPdf()));
    const rect = button.getBoundingClientRect();
    this.showExclusiveMenuAtPosition(menu, { x: rect.left, y: rect.bottom + 6 });
  }
  openAddPageMenu(button) {
    var _a2, _b, _c, _d;
    this.syncCurrentPageForPageAction();
    const menu = new import_obsidian6.Menu();
    const currentSyntheticPage = this.getCurrentSyntheticPage();
    const currentPageNumber = this.currentPage;
    const afterLocation = this.getNativeInsertPageLocation("after");
    const beforeLocation = this.getNativeInsertPageLocation("before");
    const quickDefaults = this.getNativeInsertPageDefaults("after", afterLocation);
    menu.addItem((item) => item.setTitle(`Go to page... (${this.getCurrentMixedPageOrdinal()} of ${Math.max(1, this.getMixedPageEntries().length)})`).setIcon("arrow-right-square").onClick(() => this.openGoToPagePopover(button)));
    menu.addItem((item) => item.setTitle("Manage pages...").setIcon("files").onClick(() => this.openPageListPopover(button)));
    menu.addSeparator();
    menu.addItem((item) => item.setTitle("Quick add after current").setIcon("plus").onClick(() => this.insertTemplatePageAtLocation(afterLocation, quickDefaults)));
    menu.addItem((item) => item.setTitle("Add before...").setIcon("file-plus").onClick(() => this.openTemplatePageInsertModalAtLocation("before", beforeLocation)));
    menu.addItem((item) => item.setTitle("Add after...").setIcon("file-plus").onClick(() => this.openTemplatePageInsertModalAtLocation("after", afterLocation)));
    if (currentSyntheticPage) {
      menu.addSeparator();
      menu.addItem((item) => item.setTitle("Rename...").setIcon("pencil").onClick(() => this.openRenameAddedPagePopover(button, currentSyntheticPage.id)));
      menu.addItem((item) => item.setTitle("Duplicate with annotations").setIcon("copy").onClick(() => this.duplicateCurrentTemplatePage()));
      menu.addItem((item) => item.setTitle("Duplicate page only").setIcon("copy-plus").onClick(() => this.duplicateCurrentTemplatePage(false)));
      menu.addItem((item) => item.setTitle(`Template: ${getNotebookTemplateLabel(currentSyntheticPage.template)}`).setIcon("rows-3").onClick(() => this.openCurrentAddedPageTemplateMenu(button)));
      menu.addItem((item) => item.setTitle(`Size: ${getNotebookPageSizeLabel(currentSyntheticPage.pageSize)}`).setIcon("maximize-2").onClick(() => this.openCurrentAddedPageSizeMenu(button)));
      const currentPaper = (_b = (_a2 = PAPER_COLOR_PRESETS.find((preset) => preset.color.toLowerCase() === currentSyntheticPage.paperColor.toLowerCase())) == null ? void 0 : _a2.label) != null ? _b : "Custom";
      menu.addItem((item) => item.setTitle(`Paper: ${currentPaper}`).setIcon("palette").onClick(() => this.openCurrentAddedPagePaperColorMenu(button)));
      menu.addItem((item) => item.setTitle("Clear contents").setIcon("eraser").onClick(() => this.clearCurrentTemplatePageContents()));
      menu.addItem((item) => item.setTitle("Move to Removed").setIcon("trash").setWarning(true).onClick(() => this.deleteCurrentPage()));
    } else {
      menu.addSeparator();
      const pageTemplate = this.canEditPdfPageTemplate(currentPageNumber) ? this.getPdfPageTemplate(currentPageNumber) : null;
      if (pageTemplate) {
        menu.addItem((item) => item.setTitle(`Template: ${getNotebookTemplateLabel(pageTemplate.template)}`).setIcon("rows-3").onClick((event) => this.openPdfPageTemplateMenu(currentPageNumber, event, button)));
        const paperLabel = (_d = (_c = PAPER_COLOR_PRESETS.find((preset) => preset.color.toLowerCase() === pageTemplate.paperColor.toLowerCase())) == null ? void 0 : _c.label) != null ? _d : "Custom";
        menu.addItem((item) => item.setTitle(`Paper: ${paperLabel}`).setIcon("palette").onClick((event) => this.openPdfPagePaperColorMenu(currentPageNumber, event, button)));
        menu.addSeparator();
      }
      menu.addItem((item) => item.setTitle("Remove from this session").setIcon("trash").onClick(() => this.deleteCurrentPage()));
    }
    menu.addSeparator();
    menu.addItem((item) => item.setTitle("Export annotated PDF").setIcon("file-output").onClick(() => void this.exportAnnotatedMixedDocumentPdf()));
    const rect = button.getBoundingClientRect();
    this.showExclusiveMenuAtPosition(menu, { x: rect.left, y: rect.bottom + 6 });
  }
  requestDangerConfirmation(title, message, confirmText, onConfirm) {
    this.beginExclusiveMenu();
    const popover = createDiv();
    popover.className = "modal pdf-native-annotator-confirm-popover";
    const header = popover.createDiv({ cls: "pdf-native-annotator-confirm-title" });
    (0, import_obsidian6.setIcon)(header.createSpan({ cls: "pdf-native-annotator-confirm-icon" }), "triangle-alert");
    header.createSpan({ text: title });
    header.appendChild(this.createPopoverCloseButton(() => this.closeConfirmPopover()));
    popover.createDiv({ cls: "pdf-native-annotator-confirm-message", text: message });
    const actions = popover.createDiv({ cls: "pdf-native-annotator-confirm-actions" });
    const cancelButton = actions.createEl("button", { type: "button", text: "Cancel" });
    const confirmButton = actions.createEl("button", { type: "button", text: confirmText, cls: "mod-warning" });
    cancelButton.addEventListener("click", () => this.closeConfirmPopover());
    confirmButton.addEventListener("click", () => {
      this.closeConfirmPopover();
      onConfirm();
    });
    this.transientPopovers.open("confirm", popover);
    const popoverRect = popover.getBoundingClientRect();
    const left = clamp2(this.ownerWindow.innerWidth / 2 - popoverRect.width / 2, 12, this.ownerWindow.innerWidth - popoverRect.width - 12);
    const top = clamp2(88, 12, this.ownerWindow.innerHeight - popoverRect.height - 12);
    popover.setCssStyles({
      left: `${left}px`,
      top: `${top}px`
    });
    this.ownerWindow.setTimeout(() => confirmButton.focus(), 0);
  }
  setCurrentTemplatePageColorValue(color, pushHistory = true) {
    const page = this.getCurrentSyntheticPage();
    if (!page || page.paperColor.toLowerCase() === color.toLowerCase()) {
      return;
    }
    if (pushHistory) {
      this.pushHistory();
    }
    page.paperColor = color;
    this.markDirtyAndRedraw("Paper color changed");
    this.refreshSyntheticPages(this.currentPage);
  }
  openTextStyleMenu(button) {
    this.beginExclusiveMenu();
    const popover = createDiv();
    popover.className = "modal pdf-native-annotator-font-popover";
    const title = popover.createDiv({ cls: "pdf-native-annotator-font-popover-title", text: "Text style" });
    title.appendChild(this.createPopoverCloseButton(() => this.closeFontPopover()));
    const preview = popover.createDiv({ cls: "pdf-native-annotator-font-preview", text: "The quick brown fox" });
    const selectionSummary = popover.createDiv({ cls: "pdf-native-annotator-font-selection-summary" });
    let fontSelect = null;
    let sizeInput = null;
    let lineSpacingInput = null;
    let boldButton = null;
    let italicButton = null;
    let wordWrapButton = null;
    let autoFitButton = null;
    let fixedBoxButton = null;
    const alignmentButtons = /* @__PURE__ */ new Map();
    const verticalAlignmentButtons = /* @__PURE__ */ new Map();
    const syncPopoverState = () => {
      const family = this.getCurrentTextFontFamilyForMenu();
      const size = this.getCurrentTextSizeForMenu();
      const color = this.getCurrentTextColorForMenu();
      const fontWeight = this.getCurrentTextFontWeightForMenu();
      const fontStyle = this.getCurrentTextFontStyleForMenu();
      const textAlign = this.getCurrentTextAlignmentForMenu();
      const verticalAlign = this.getCurrentTextVerticalAlignmentForMenu();
      const lineSpacing = this.getCurrentTextLineSpacingForMenu();
      const wordWrap = this.getCurrentTextWordWrapForMenu();
      const autoFit = this.getCurrentTextAutoFitForMenu();
      const summary = this.getTextSelectionStyleSummary();
      preview.setCssStyles({
        fontFamily: `"${family}", sans-serif`,
        fontSize: `${clamp2(size, 12, 40)}px`,
        color,
        fontWeight,
        fontStyle,
        textAlign,
        lineHeight: String(lineSpacing)
      });
      selectionSummary.textContent = summary;
      selectionSummary.classList.toggle("is-hidden", summary.length === 0);
      if (fontSelect && fontSelect !== this.ownerDocument.activeElement) {
        fontSelect.value = family;
      }
      if (sizeInput && sizeInput !== this.ownerDocument.activeElement) {
        sizeInput.value = String(size);
      }
      if (lineSpacingInput && lineSpacingInput !== this.ownerDocument.activeElement) {
        lineSpacingInput.value = lineSpacing.toFixed(2);
      }
      boldButton == null ? void 0 : boldButton.classList.toggle("is-active", fontWeight === "bold");
      boldButton == null ? void 0 : boldButton.setAttribute("aria-pressed", String(fontWeight === "bold"));
      italicButton == null ? void 0 : italicButton.classList.toggle("is-active", fontStyle === "italic");
      italicButton == null ? void 0 : italicButton.setAttribute("aria-pressed", String(fontStyle === "italic"));
      for (const [alignment, alignmentButton] of alignmentButtons) {
        const active = alignment === textAlign;
        alignmentButton.classList.toggle("is-active", active);
        alignmentButton.setAttribute("aria-pressed", String(active));
      }
      for (const [alignment, alignmentButton] of verticalAlignmentButtons) {
        const active = alignment === verticalAlign;
        alignmentButton.classList.toggle("is-active", active);
        alignmentButton.setAttribute("aria-pressed", String(active));
      }
      wordWrapButton == null ? void 0 : wordWrapButton.classList.toggle("is-active", wordWrap);
      wordWrapButton == null ? void 0 : wordWrapButton.setAttribute("aria-pressed", String(wordWrap));
      autoFitButton == null ? void 0 : autoFitButton.classList.toggle("is-active", autoFit);
      autoFitButton == null ? void 0 : autoFitButton.setAttribute("aria-pressed", String(autoFit));
      fixedBoxButton == null ? void 0 : fixedBoxButton.classList.toggle("is-active", !autoFit);
      fixedBoxButton == null ? void 0 : fixedBoxButton.setAttribute("aria-pressed", String(!autoFit));
    };
    const createStyleButton = (parent, icon, label, onClick) => {
      const styleButton = parent.createEl("button", {
        type: "button",
        cls: "clickable-icon pdf-native-annotator-text-style-button",
        attr: {
          "aria-label": label,
          title: label,
          "aria-pressed": "false"
        }
      });
      (0, import_obsidian6.setIcon)(styleButton, icon);
      styleButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
        syncPopoverState();
      });
      return styleButton;
    };
    const fontRow = popover.createDiv({ cls: "pdf-native-annotator-font-select-row" });
    fontSelect = fontRow.createEl("select", { cls: "dropdown pdf-native-annotator-font-select" });
    for (const fontFamily of TEXT_FONT_FAMILIES) {
      const option = fontSelect.createEl("option", { text: fontFamily, value: fontFamily });
      option.setCssStyles({ fontFamily: `"${fontFamily}", sans-serif` });
    }
    fontSelect.value = this.getCurrentTextFontFamilyForMenu();
    fontSelect.addEventListener("change", () => {
      var _a2;
      this.setTextFontFamily((_a2 = fontSelect == null ? void 0 : fontSelect.value) != null ? _a2 : this.currentTextFontFamily);
      syncPopoverState();
    });
    const customSizeRow = popover.createDiv({ cls: "pdf-native-annotator-font-control-row" });
    customSizeRow.createSpan({ text: "Font size" });
    sizeInput = customSizeRow.createEl("input", {
      type: "number",
      cls: "pdf-native-annotator-font-number-input",
      attr: {
        min: "8",
        max: "96",
        step: "1"
      }
    });
    sizeInput.value = String(this.getCurrentTextSizeForMenu());
    sizeInput.addEventListener("change", () => {
      var _a2;
      const nextSize = clamp2(Math.round(Number((_a2 = sizeInput == null ? void 0 : sizeInput.value) != null ? _a2 : this.currentTextFontSize)), 8, 96);
      this.setTextFontSize(nextSize);
      syncPopoverState();
    });
    const formatRow = popover.createDiv({ cls: "pdf-native-annotator-text-style-row" });
    formatRow.createSpan({ cls: "pdf-native-annotator-text-style-label", text: "Style" });
    const formatControls = formatRow.createDiv({ cls: "pdf-native-annotator-text-style-group" });
    boldButton = createStyleButton(formatControls, "bold", "Bold", () => {
      this.setTextFontWeight(this.getCurrentTextFontWeightForMenu() === "bold" ? "normal" : "bold");
    });
    italicButton = createStyleButton(formatControls, "italic", "Italic", () => {
      this.setTextFontStyle(this.getCurrentTextFontStyleForMenu() === "italic" ? "normal" : "italic");
    });
    const alignmentRow = popover.createDiv({ cls: "pdf-native-annotator-text-style-row" });
    alignmentRow.createSpan({ cls: "pdf-native-annotator-text-style-label", text: "Alignment" });
    const alignmentControls = alignmentRow.createDiv({ cls: "pdf-native-annotator-text-style-group" });
    for (const alignment of ["left", "center", "right"]) {
      const label = `${alignment[0].toUpperCase()}${alignment.slice(1)} align`;
      const alignmentButton = createStyleButton(alignmentControls, `align-${alignment}`, label, () => {
        this.setTextAlignment(alignment);
      });
      alignmentButtons.set(alignment, alignmentButton);
    }
    const verticalAlignmentRow = popover.createDiv({ cls: "pdf-native-annotator-text-style-row" });
    verticalAlignmentRow.createSpan({ cls: "pdf-native-annotator-text-style-label", text: "Vertical" });
    const verticalAlignmentControls = verticalAlignmentRow.createDiv({ cls: "pdf-native-annotator-text-style-group" });
    const verticalAlignmentIcons = {
      top: "align-vertical-justify-start",
      middle: "align-vertical-justify-center",
      bottom: "align-vertical-justify-end"
    };
    for (const alignment of ["top", "middle", "bottom"]) {
      const label = `${alignment[0].toUpperCase()}${alignment.slice(1)} align`;
      const alignmentButton = createStyleButton(
        verticalAlignmentControls,
        verticalAlignmentIcons[alignment],
        label,
        () => this.setTextVerticalAlignment(alignment)
      );
      verticalAlignmentButtons.set(alignment, alignmentButton);
    }
    const lineSpacingRow = popover.createDiv({ cls: "pdf-native-annotator-font-control-row" });
    lineSpacingRow.createSpan({ text: "Line spacing" });
    lineSpacingInput = lineSpacingRow.createEl("input", {
      type: "number",
      cls: "pdf-native-annotator-font-number-input",
      attr: {
        min: "0.8",
        max: "3",
        step: "0.05"
      }
    });
    lineSpacingInput.value = this.getCurrentTextLineSpacingForMenu().toFixed(2);
    lineSpacingInput.addEventListener("change", () => {
      var _a2;
      this.setTextLineSpacing(Number((_a2 = lineSpacingInput == null ? void 0 : lineSpacingInput.value) != null ? _a2 : this.currentTextLineSpacing));
      syncPopoverState();
    });
    const layoutRow = popover.createDiv({ cls: "pdf-native-annotator-text-style-row" });
    layoutRow.createSpan({ cls: "pdf-native-annotator-text-style-label", text: "Text box" });
    const layoutControls = layoutRow.createDiv({ cls: "pdf-native-annotator-text-style-group" });
    wordWrapButton = createStyleButton(layoutControls, "wrap-text", "Toggle word wrap", () => {
      this.setTextWordWrap(!this.getCurrentTextWordWrapForMenu());
    });
    autoFitButton = createStyleButton(layoutControls, "scan-text", "Resize box to fit text", () => {
      this.setTextAutoFit(true);
    });
    fixedBoxButton = createStyleButton(layoutControls, "square", "Keep text box size fixed", () => {
      this.setTextAutoFit(false);
    });
    const caseRow = popover.createDiv({ cls: "pdf-native-annotator-font-control-row" });
    caseRow.createSpan({ text: "Change case" });
    const caseSelect = caseRow.createEl("select", { cls: "dropdown pdf-native-annotator-case-select" });
    caseSelect.createEl("option", { text: "Choose...", value: "" });
    caseSelect.createEl("option", { text: "Sentence case", value: "sentence" });
    caseSelect.createEl("option", { text: "lowercase", value: "lower" });
    caseSelect.createEl("option", { text: "UPPERCASE", value: "upper" });
    caseSelect.createEl("option", { text: "Title Case", value: "title" });
    caseSelect.createEl("option", { text: "tOGGLE cASE", value: "toggle" });
    caseSelect.addEventListener("change", () => {
      const mode = caseSelect.value;
      if (mode) {
        this.transformTextCase(mode);
        caseSelect.value = "";
        syncPopoverState();
      }
    });
    this.transientPopovers.open("font", popover, { onClose: () => this.refocusInlineTextEditor() });
    syncPopoverState();
    this.positionPopoverNearAnchor(popover, button, "left");
  }
  getSelectedTextItems() {
    if (!this.annotationDocument) {
      return [];
    }
    const selectedTextIds = new Set(this.selectedTargets.filter((target) => target.kind === "text").map((target) => target.id));
    return this.annotationDocument.textItems.filter((item) => selectedTextIds.has(item.id));
  }
  getTextSelectionStyleSummary() {
    const items = this.getSelectedTextItems();
    if (items.length <= 1) {
      return "";
    }
    const families = new Set(items.map((item) => {
      var _a2;
      return (_a2 = item.fontFamily) != null ? _a2 : this.currentTextFontFamily;
    }));
    const sizes = new Set(items.map((item) => Math.round(item.fontSize)));
    const colors = new Set(items.map((item) => {
      var _a2;
      return ((_a2 = item.color) != null ? _a2 : this.currentTextColor).toLowerCase();
    }));
    const widths = new Set(items.map((item) => item.boxWidthScale ? item.boxWidthScale.toFixed(4) : "auto"));
    const weights = new Set(items.map((item) => resolveTextFontWeight(item)));
    const styles = new Set(items.map((item) => resolveTextFontStyle(item)));
    const alignments = new Set(items.map((item) => resolveTextAlignment(item)));
    const verticalAlignments = new Set(items.map((item) => resolveTextVerticalAlignment(item)));
    const lineSpacings = new Set(items.map((item) => resolveTextLineSpacing(item).toFixed(2)));
    const wrappingModes = new Set(items.map((item) => resolveTextWordWrap(item)));
    const fitModes = new Set(items.map((item) => item.autoFit === true));
    const mixed = [
      families.size > 1 ? "font" : null,
      sizes.size > 1 ? "size" : null,
      colors.size > 1 ? "color" : null,
      widths.size > 1 ? "box" : null,
      weights.size > 1 ? "weight" : null,
      styles.size > 1 ? "style" : null,
      alignments.size > 1 ? "alignment" : null,
      verticalAlignments.size > 1 ? "vertical alignment" : null,
      lineSpacings.size > 1 ? "line spacing" : null,
      wrappingModes.size > 1 ? "wrapping" : null,
      fitModes.size > 1 ? "fit mode" : null
    ].filter((entry) => !!entry);
    return mixed.length > 0 ? `${items.length} text boxes selected; mixed ${mixed.join(", ")}. Changes apply to all selected text boxes.` : `${items.length} text boxes selected. Changes apply to all selected text boxes.`;
  }
  getCurrentTextFontFamilyForMenu() {
    var _a2, _b;
    if (this.inlineTextEditorEl) {
      return this.currentTextFontFamily;
    }
    if (this.annotationDocument && this.hasSelectedText()) {
      const item = (_a2 = this.getSelectedTextItems()[0]) != null ? _a2 : null;
      return (_b = item == null ? void 0 : item.fontFamily) != null ? _b : this.currentTextFontFamily;
    }
    return this.currentTextFontFamily;
  }
  getCurrentTextSizeForMenu() {
    var _a2;
    if (this.inlineTextEditorEl) {
      return this.currentTextFontSize;
    }
    if (this.annotationDocument && this.hasSelectedText()) {
      const item = (_a2 = this.getSelectedTextItems()[0]) != null ? _a2 : null;
      return item ? Math.round(item.fontSize) : this.currentTextFontSize;
    }
    return this.currentTextFontSize;
  }
  getCurrentTextColorForMenu() {
    var _a2, _b;
    if (this.inlineTextEditorEl) {
      return this.currentTextColor;
    }
    if (this.annotationDocument && this.hasSelectedText()) {
      const item = (_a2 = this.getSelectedTextItems()[0]) != null ? _a2 : null;
      return (_b = item == null ? void 0 : item.color) != null ? _b : this.currentTextColor;
    }
    return this.currentTextColor;
  }
  getCurrentTextFontWeightForMenu() {
    var _a2;
    if (this.inlineTextEditorEl) {
      return this.currentTextFontWeight;
    }
    if (this.annotationDocument && this.hasSelectedText()) {
      const item = (_a2 = this.getSelectedTextItems()[0]) != null ? _a2 : null;
      return item ? resolveTextFontWeight(item) : this.currentTextFontWeight;
    }
    return this.currentTextFontWeight;
  }
  getCurrentTextFontStyleForMenu() {
    var _a2;
    if (this.inlineTextEditorEl) {
      return this.currentTextFontStyle;
    }
    if (this.annotationDocument && this.hasSelectedText()) {
      const item = (_a2 = this.getSelectedTextItems()[0]) != null ? _a2 : null;
      return item ? resolveTextFontStyle(item) : this.currentTextFontStyle;
    }
    return this.currentTextFontStyle;
  }
  getCurrentTextAlignmentForMenu() {
    var _a2;
    if (this.inlineTextEditorEl) {
      return this.currentTextAlignment;
    }
    if (this.annotationDocument && this.hasSelectedText()) {
      const item = (_a2 = this.getSelectedTextItems()[0]) != null ? _a2 : null;
      return item ? resolveTextAlignment(item) : this.currentTextAlignment;
    }
    return this.currentTextAlignment;
  }
  getCurrentTextVerticalAlignmentForMenu() {
    var _a2;
    if (this.inlineTextEditorEl) {
      return this.currentTextVerticalAlignment;
    }
    if (this.annotationDocument && this.hasSelectedText()) {
      const item = (_a2 = this.getSelectedTextItems()[0]) != null ? _a2 : null;
      return item ? resolveTextVerticalAlignment(item) : this.currentTextVerticalAlignment;
    }
    return this.currentTextVerticalAlignment;
  }
  getCurrentTextLineSpacingForMenu() {
    var _a2;
    if (this.inlineTextEditorEl) {
      return this.currentTextLineSpacing;
    }
    if (this.annotationDocument && this.hasSelectedText()) {
      const item = (_a2 = this.getSelectedTextItems()[0]) != null ? _a2 : null;
      return item ? resolveTextLineSpacing(item) : this.currentTextLineSpacing;
    }
    return this.currentTextLineSpacing;
  }
  getCurrentTextWordWrapForMenu() {
    var _a2;
    if (this.inlineTextEditorEl) {
      return this.currentTextWordWrap;
    }
    if (this.annotationDocument && this.hasSelectedText()) {
      const item = (_a2 = this.getSelectedTextItems()[0]) != null ? _a2 : null;
      return item ? resolveTextWordWrap(item) : this.currentTextWordWrap;
    }
    return this.currentTextWordWrap;
  }
  getCurrentTextAutoFitForMenu() {
    var _a2;
    if (this.inlineTextEditorEl) {
      return this.inlineTextAutoFit;
    }
    if (this.annotationDocument && this.hasSelectedText()) {
      return ((_a2 = this.getSelectedTextItems()[0]) == null ? void 0 : _a2.autoFit) === true;
    }
    return true;
  }
  getActivePresetKind() {
    if (this.currentTool === "pen" || this.currentTool === "highlighter" || this.currentTool === "eraser") {
      return this.currentTool;
    }
    return null;
  }
  isStrokeSizedTool() {
    return this.currentTool === "pen" || this.currentTool === "highlighter" || this.currentTool === "eraser" || isShapeTool(this.currentTool);
  }
  refreshToolbar() {
    var _a2, _b;
    if (!this.toolbarEl) {
      return;
    }
    this.updateNativeMixedPageThumbnailSelection();
    this.syncNativeMixedPageNavigator();
    const previousToolScrollLeft = (_b = (_a2 = this.toolbarEl.querySelector(".pdf-native-annotator-group.is-tools")) == null ? void 0 : _a2.scrollLeft) != null ? _b : 0;
    const previousToolbarScrollTop = this.toolbarEl.scrollTop;
    this.toolbarEl.replaceChildren();
    const leftGroup = createDiv();
    leftGroup.className = "pdf-native-annotator-group is-tools";
    leftGroup.appendChild(this.createButton(this.annotationMode ? "Finish" : "Annotate", this.annotationMode, () => {
      this.toggleAnnotationMode();
    }));
    if (!this.annotationMode) {
      const readModeHint = createSpan();
      readModeHint.className = "pdf-native-annotator-read-mode-hint";
      readModeHint.textContent = "Read mode";
      leftGroup.appendChild(readModeHint);
      const rightGroup2 = createDiv();
      rightGroup2.className = "pdf-native-annotator-group is-actions";
      const addPageButton2 = this.createPageMenuButton();
      rightGroup2.appendChild(addPageButton2);
      const moreButton2 = this.createIconButton("more-vertical", "More annotation actions", false, () => {
        this.openDocumentActionsMenu(moreButton2);
      });
      rightGroup2.appendChild(moreButton2);
      this.toolbarEl.appendChild(leftGroup);
      this.toolbarEl.appendChild(rightGroup2);
      this.toolbarEl.scrollTop = previousToolbarScrollTop;
      this.restoreToolbarToolScroll(leftGroup, previousToolScrollLeft);
      this.repositionOpenPopovers();
      return;
    }
    if (isTabletWebKitTouchDevice()) {
      const touchDrawing = this.getInkInputPolicy() !== "pen-mouse-only";
      const touchModeButton = this.createButton(
        touchDrawing ? "Finger draws" : "Finger pans",
        touchDrawing,
        () => this.toggleTabletTouchInputMode()
      );
      touchModeButton.classList.add("pdf-native-annotator-mode-button", "pdf-native-annotator-touch-mode-button");
      touchModeButton.setAttribute("aria-pressed", String(touchDrawing));
      touchModeButton.title = touchDrawing ? "Finger draws annotations. Tap to pan the page with one finger." : "Finger pans the page. Apple Pencil and mouse continue drawing.";
      leftGroup.appendChild(touchModeButton);
    }
    let selectButton;
    selectButton = this.createIconButton("move", "Select", this.currentTool === "select", () => {
      if (this.currentTool === "select") {
        this.openSelectionMenu(selectButton);
        return;
      }
      this.setActiveTool("select");
      this.applyOverlayMode();
      this.refreshToolbar();
    });
    leftGroup.appendChild(selectButton);
    if (this.currentTool === "select") {
      const selectionModeButton = this.createButton(
        this.toolState.selectionMode === "lasso" ? "Lasso" : this.toolState.selectionMode === "box" ? "Box" : "Single",
        false,
        () => {
          const targetButton = selectionModeButton;
          this.openSelectionMenu(targetButton);
        }
      );
      selectionModeButton.classList.add("pdf-native-annotator-mode-button");
      leftGroup.appendChild(selectionModeButton);
    }
    if (this.plugin.shouldShowRegionToolbarButton()) {
      leftGroup.appendChild(this.createIconButton("crop", "Region embed", this.currentTool === "region", () => {
        this.setActiveTool("region");
        this.applyOverlayMode();
        this.refreshToolbar();
        this.refreshStatus("Region tool: drag a crop box");
      }));
    }
    leftGroup.appendChild(this.createIconButton("pen-tool", "Pen", this.currentTool === "pen", () => {
      this.setActiveTool("pen");
      this.applyOverlayMode();
      this.refreshToolbar();
    }));
    leftGroup.appendChild(this.createIconButton("highlighter", "Highlighter", this.currentTool === "highlighter", () => {
      this.setActiveTool("highlighter");
      this.applyOverlayMode();
      this.refreshToolbar();
    }));
    leftGroup.appendChild(this.createIconButton("eraser", `Eraser (${this.eraserMode})`, this.currentTool === "eraser", () => {
      if (this.currentTool === "eraser") {
        this.toggleEraserMode();
        return;
      }
      this.setActiveTool("eraser");
      this.applyOverlayMode();
      this.refreshToolbar();
      this.refreshStatus(`Tool: Eraser (${this.eraserMode})`);
    }));
    if (this.currentTool === "eraser") {
      const eraserModeButton = this.createButton(
        this.eraserMode === "segment" ? "Touch erase" : "Object erase",
        false,
        () => {
          this.toggleEraserMode();
        }
      );
      eraserModeButton.classList.add("pdf-native-annotator-mode-button");
      leftGroup.appendChild(eraserModeButton);
    }
    leftGroup.appendChild(this.createIconButton("type", "Text", this.currentTool === "text", () => {
      this.setActiveTool("text");
      this.applyOverlayMode();
      this.refreshToolbar();
    }));
    if (isTabletWebKitTouchDevice()) {
      const shapeButton = this.createIconButton(
        "shapes",
        isShapeTool(this.currentTool) ? `Shapes (${this.currentTool})` : "Shapes",
        isShapeTool(this.currentTool),
        () => this.openShapeToolMenu(shapeButton)
      );
      shapeButton.classList.add("pdf-native-annotator-shape-menu-button");
      leftGroup.appendChild(shapeButton);
    } else {
      leftGroup.appendChild(this.createIconButton("square", "Rectangle", this.currentTool === "rectangle", () => {
        this.setActiveTool("rectangle");
        this.applyOverlayMode();
        this.refreshToolbar();
      }));
      leftGroup.appendChild(this.createIconButton("circle", "Ellipse", this.currentTool === "ellipse", () => {
        this.setActiveTool("ellipse");
        this.applyOverlayMode();
        this.refreshToolbar();
      }));
      leftGroup.appendChild(this.createIconButton("minus", "Line", this.currentTool === "line", () => {
        this.setActiveTool("line");
        this.applyOverlayMode();
        this.refreshToolbar();
      }));
    }
    const activePresetKind = this.getActivePresetKind();
    if (activePresetKind) {
      const slots = createDiv();
      slots.className = "pdf-native-annotator-pen-slots";
      slots.classList.add(`is-${activePresetKind}`);
      for (const preset of this.toolState.getPresetsByKind(activePresetKind)) {
        slots.appendChild(this.createPresetButton(preset));
      }
      leftGroup.appendChild(slots);
    }
    if (this.currentTool !== "eraser" && this.currentTool !== "region") {
      leftGroup.appendChild(this.createColorPickerButton());
    }
    if (this.isStrokeSizedTool() || this.shouldApplyStyleToSelection()) {
      const strokeControl = createDiv();
      strokeControl.className = "pdf-native-annotator-stroke-control";
      strokeControl.appendChild(this.createStrokeSizeButton());
      leftGroup.appendChild(strokeControl);
    }
    if (this.currentTool === "text" || this.currentTool === "select" && this.hasSelectedText()) {
      const textStyleButton = this.createButton("Font", false, () => {
        this.openTextStyleMenu(textStyleButton);
      });
      textStyleButton.classList.add("pdf-native-annotator-mode-button", "pdf-native-annotator-font-button");
      leftGroup.appendChild(textStyleButton);
    }
    const rightGroup = createDiv();
    rightGroup.className = "pdf-native-annotator-group is-actions";
    if (this.selectedTargets.length > 0) {
      const selectionLabel = `Selection ${this.selectedTargets.length}`;
      const selectionActionsButton = this.createButton(selectionLabel, false, () => {
        this.openSelectionActionsMenu(selectionActionsButton);
      });
      selectionActionsButton.classList.add("pdf-native-annotator-mode-button");
      rightGroup.appendChild(selectionActionsButton);
    }
    if (this.lastSelectionRegion) {
      const regionActionsButton = this.createButton("Region", false, () => {
        this.openRegionActionsMenu(regionActionsButton);
      });
      regionActionsButton.classList.add("pdf-native-annotator-mode-button");
      rightGroup.appendChild(regionActionsButton);
    }
    if (this.lastSelectionRegion && this.plugin.shouldShowCopyEmbedToolbarButton()) {
      const copyRegionButton = this.createButton("Copy embed", false, () => {
        void this.copySelectionAnnotatedEmbedBlock();
      });
      copyRegionButton.classList.add("pdf-native-annotator-mode-button");
      copyRegionButton.title = "Copy an annotated markdown embed for the selected box region";
      rightGroup.appendChild(copyRegionButton);
    }
    if (this.plugin.hasClipboard()) {
      rightGroup.appendChild(this.createIconButton("clipboard", "Paste copied annotations", false, () => this.pasteClipboard()));
    }
    rightGroup.appendChild(this.createHistoryIconButton("undo-2", "Undo", () => this.undoFromToolbar()));
    rightGroup.appendChild(this.createHistoryIconButton("redo-2", "Redo", () => this.redoFromToolbar()));
    const addPageButton = this.createPageMenuButton();
    rightGroup.appendChild(addPageButton);
    const moreButton = this.createIconButton("more-vertical", "More annotation actions", false, () => {
      this.openDocumentActionsMenu(moreButton);
    });
    rightGroup.appendChild(moreButton);
    this.toolbarEl.appendChild(leftGroup);
    this.toolbarEl.appendChild(rightGroup);
    this.toolbarEl.scrollTop = previousToolbarScrollTop;
    this.restoreToolbarToolScroll(leftGroup, previousToolScrollLeft);
    this.repositionOpenPopovers();
  }
  restoreToolbarToolScroll(group, scrollLeft) {
    group.scrollLeft = scrollLeft;
    if (this.toolbarScrollRestoreHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.toolbarScrollRestoreHandle);
    }
    this.toolbarScrollRestoreHandle = this.ownerWindow.requestAnimationFrame(() => {
      this.toolbarScrollRestoreHandle = null;
      if (group.isConnected) {
        group.scrollLeft = scrollLeft;
      }
    });
  }
  createButton(label, active, onClick) {
    const button = createEl("button");
    button.type = "button";
    button.className = "pdf-native-annotator-button";
    if (label.trim()) {
      button.classList.add("pdf-native-annotator-text-button");
    }
    if (active) {
      button.classList.add("is-active");
    }
    button.textContent = label;
    this.bindToolbarButtonActivation(button, onClick);
    return button;
  }
  bindToolbarButtonActivation(button, onActivate) {
    let handledMousePointerUp = false;
    button.addEventListener("pointerdown", (event) => event.stopPropagation());
    button.addEventListener("pointerup", (event) => {
      event.stopPropagation();
      if (event.pointerType !== "mouse" || event.button !== 0 || button.disabled) {
        return;
      }
      handledMousePointerUp = true;
      event.preventDefault();
      onActivate(event);
      this.ownerWindow.setTimeout(() => {
        handledMousePointerUp = false;
      }, 0);
    });
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (handledMousePointerUp) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      if (!button.disabled) {
        onActivate(event);
      }
    });
  }
  createIconButton(icon, label, active, onClick) {
    const button = this.createButton("", active, onClick);
    button.classList.add("clickable-icon", "pdf-native-annotator-icon-button");
    button.setAttribute("aria-label", label);
    button.title = label;
    (0, import_obsidian6.setIcon)(button, icon);
    return button;
  }
  createPageMenuButton() {
    const button = createEl("button");
    button.type = "button";
    button.className = "pdf-native-annotator-button pdf-native-annotator-labeled-icon-button pdf-native-annotator-page-menu-button";
    button.setAttribute("aria-label", "Page");
    button.title = "Navigate, add, and manage pages";
    (0, import_obsidian6.setIcon)(button, "files");
    button.createSpan({ text: "Page" });
    let openedFromPointerDown = false;
    button.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
      if (button.disabled || event.pointerType === "mouse" && event.button !== 0) {
        return;
      }
      event.preventDefault();
      openedFromPointerDown = true;
      this.openAddPageMenu(button);
      this.ownerWindow.setTimeout(() => {
        openedFromPointerDown = false;
      }, 0);
    });
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (!button.disabled && !openedFromPointerDown) {
        this.openAddPageMenu(button);
      }
    });
    return button;
  }
  createHistoryIconButton(icon, label, onActivate) {
    const button = createEl("button");
    button.type = "button";
    button.className = "pdf-native-annotator-button clickable-icon pdf-native-annotator-icon-button";
    button.setAttribute("aria-label", label);
    button.title = label;
    (0, import_obsidian6.setIcon)(button, icon);
    let handledPointerDown = false;
    button.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
      if (button.disabled) {
        return;
      }
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }
      handledPointerDown = true;
      event.preventDefault();
      onActivate();
      this.ownerWindow.setTimeout(() => {
        handledPointerDown = false;
      }, 0);
    });
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (handledPointerDown) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      if (!button.disabled) {
        onActivate();
      }
    });
    return button;
  }
  createPageListActionButton(icon, label, onClick) {
    const button = createEl("button");
    button.type = "button";
    button.className = "pdf-native-annotator-page-list-action clickable-icon";
    button.setAttribute("aria-label", label);
    button.title = label;
    (0, import_obsidian6.setIcon)(button, icon);
    button.addEventListener("pointerdown", (event) => event.stopPropagation());
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick(event);
    });
    return button;
  }
  createPopoverCloseButton(onClick) {
    const button = createEl("button");
    button.type = "button";
    button.className = "modal-close-button pdf-native-annotator-popover-close";
    button.setAttribute("aria-label", "Close");
    button.title = "Close";
    (0, import_obsidian6.setIcon)(button, "x");
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick();
    });
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    return button;
  }
  positionPopoverNearAnchor(popover, anchor, mode = "center") {
    this.positionPopoverNearRect(popover, anchor.getBoundingClientRect(), mode);
  }
  positionPopoverNearRect(popover, anchorRect, mode = "center") {
    var _a2, _b, _c, _d;
    popover.setCssStyles({ maxHeight: "" });
    const popoverRect = popover.getBoundingClientRect();
    const visualViewport = this.ownerWindow.visualViewport;
    const viewportLeft = (_a2 = visualViewport == null ? void 0 : visualViewport.offsetLeft) != null ? _a2 : 0;
    const viewportTop = (_b = visualViewport == null ? void 0 : visualViewport.offsetTop) != null ? _b : 0;
    const viewportWidth = (_c = visualViewport == null ? void 0 : visualViewport.width) != null ? _c : this.ownerWindow.innerWidth;
    const viewportHeight = (_d = visualViewport == null ? void 0 : visualViewport.height) != null ? _d : this.ownerWindow.innerHeight;
    const placement = resolveAnchoredPopoverPlacement(
      anchorRect,
      popoverRect,
      {
        left: viewportLeft,
        top: viewportTop,
        right: viewportLeft + viewportWidth,
        bottom: viewportTop + viewportHeight
      },
      mode
    );
    popover.setCssStyles({
      left: `${placement.left}px`,
      top: `${placement.top}px`,
      maxHeight: `${placement.maxHeight}px`
    });
  }
  scheduleRepositionOpenPopovers() {
    if (this.popoverRepositionHandle !== null) {
      return;
    }
    this.popoverRepositionHandle = this.ownerWindow.requestAnimationFrame(() => {
      this.popoverRepositionHandle = null;
      this.repositionOpenPopovers();
    });
  }
  repositionOpenPopovers() {
    if (!this.toolbarEl) {
      return;
    }
    const strokeAnchor = this.toolbarEl.querySelector(".pdf-native-annotator-stroke-button");
    const strokePopover = this.transientPopovers.get("stroke");
    if (strokePopover && strokeAnchor) {
      this.positionPopoverNearAnchor(strokePopover, strokeAnchor);
    }
    const colorAnchor = this.toolbarEl.querySelector(".pdf-native-annotator-color-button");
    const colorPopover = this.transientPopovers.get("color");
    if (colorPopover && colorAnchor) {
      this.positionPopoverNearAnchor(colorPopover, colorAnchor);
    }
    const fontAnchor = this.toolbarEl.querySelector(".pdf-native-annotator-font-button");
    const fontPopover = this.transientPopovers.get("font");
    if (fontPopover && fontAnchor) {
      this.positionPopoverNearAnchor(fontPopover, fontAnchor, "left");
    }
    const pageAnchor = this.toolbarEl.querySelector(".pdf-native-annotator-page-menu-button");
    if (pageAnchor) {
      const paperColorPopover = this.transientPopovers.get("paper-color");
      if (paperColorPopover) {
        this.positionPopoverNearAnchor(paperColorPopover, pageAnchor);
      }
      const renamePopover = this.transientPopovers.get("rename");
      if (renamePopover) {
        this.positionPopoverNearAnchor(renamePopover, pageAnchor);
      }
      const goToPagePopover = this.transientPopovers.get("go-to-page");
      if (goToPagePopover) {
        this.positionPopoverNearAnchor(goToPagePopover, pageAnchor);
      }
      const pageListPopover = this.transientPopovers.get("page-list");
      if (pageListPopover) {
        this.positionPopoverNearAnchor(pageListPopover, pageAnchor, "left");
      }
    }
  }
  createPresetButton(preset) {
    const button = createEl("button");
    button.type = "button";
    button.className = "pdf-native-annotator-preset";
    button.classList.add(`is-${preset.kind}`);
    button.title = `${preset.label}: ${preset.kind} ${preset.width}`;
    button.setAttribute("aria-label", preset.label);
    if (this.toolState.selectedPresetId === preset.id) {
      button.classList.add("is-active");
    }
    const preview = createSpan();
    preview.className = "pdf-native-annotator-preset-preview";
    preview.setCssStyles({
      height: `${Math.max(4, Math.min(14, preset.width))}px`,
      width: `${Math.max(18, Math.min(34, preset.width * 2.6))}px`
    });
    if (preset.kind !== "eraser") {
      preview.setCssStyles({
        backgroundColor: preset.color,
        opacity: String(preset.opacity)
      });
    }
    button.appendChild(preview);
    this.bindToolbarButtonActivation(button, () => {
      this.applyPreset(preset.id);
    });
    return button;
  }
  usesTextColorControl() {
    return this.currentTool === "text" || this.currentTool === "select" && this.selectedTargets.length > 0 && this.selectedTargets.every((target) => target.kind === "text");
  }
  getToolbarColor() {
    return this.usesTextColorControl() ? this.getCurrentTextColorForMenu() : this.currentColor;
  }
  applyToolbarColor(color, pushHistory = true, refreshToolbar = true) {
    if (this.usesTextColorControl()) {
      this.setTextColor(color, pushHistory, refreshToolbar);
      return;
    }
    if (this.shouldApplyStyleToSelection()) {
      this.applyColorToSelection(color, pushHistory);
    }
    this.setCurrentColor(color);
    if (refreshToolbar) {
      this.refreshToolbar();
    }
  }
  createColorSwatch(color, label) {
    const button = createEl("button");
    button.type = "button";
    button.className = "pdf-native-annotator-swatch";
    button.title = label;
    button.setAttribute("aria-label", `${label} ${this.usesTextColorControl() ? "text" : "ink"}`);
    if (this.getToolbarColor().toLowerCase() === color.toLowerCase()) {
      button.classList.add("is-active");
    }
    const inner = createSpan();
    inner.className = "pdf-native-annotator-swatch-inner";
    inner.setCssStyles({ backgroundColor: color });
    button.appendChild(inner);
    this.bindToolbarButtonActivation(button, () => {
      this.applyToolbarColor(color);
    });
    return button;
  }
  createColorPickerButton() {
    const button = createEl("button");
    button.type = "button";
    button.className = "pdf-native-annotator-color-button";
    button.title = "Choose color";
    button.setAttribute("aria-label", this.usesTextColorControl() ? "Choose text color" : "Choose ink color");
    const preview = button.createSpan({ cls: "pdf-native-annotator-color-button-preview" });
    preview.setCssStyles({ backgroundColor: this.getToolbarColor() });
    this.bindToolbarButtonActivation(button, () => {
      this.openColorPopover(button);
    });
    return button;
  }
  openColorPopover(anchor) {
    this.beginExclusiveMenu();
    const popover = createDiv();
    popover.className = "modal pdf-native-annotator-color-popover pdf-native-annotator-tool-color-popover";
    const controlsTextColor = this.usesTextColorControl();
    const title = popover.createDiv({
      cls: "pdf-native-annotator-color-popover-title",
      text: controlsTextColor ? "Text color" : "Ink color"
    });
    title.appendChild(this.createPopoverCloseButton(() => this.closeColorPopover()));
    const swatches = popover.createDiv({ cls: "pdf-native-annotator-color-popover-swatches" });
    for (const preset of TEXT_COLOR_PRESETS) {
      const swatch = this.createColorSwatch(preset.color, preset.label);
      swatch.addEventListener("click", () => {
        this.closeColorPopover();
      });
      swatches.appendChild(swatch);
    }
    const customRow = popover.createDiv({ cls: "pdf-native-annotator-color-popover-custom" });
    customRow.createSpan({ text: "Custom" });
    const colorInput = createEl("input");
    colorInput.type = "color";
    colorInput.value = this.getToolbarColor();
    colorInput.className = "pdf-native-annotator-color";
    let historyCaptured = false;
    colorInput.addEventListener("input", () => {
      const appliesToSelection = this.usesTextColorControl() ? this.shouldApplyTextStyleToSelection() : this.shouldApplyStyleToSelection();
      if (appliesToSelection) {
        if (!historyCaptured) {
          this.pushHistory();
          historyCaptured = true;
        }
      }
      this.applyToolbarColor(colorInput.value, false, false);
      const preview = anchor.querySelector(".pdf-native-annotator-color-button-preview");
      if (preview) {
        preview.setCssStyles({ backgroundColor: colorInput.value });
      }
    });
    colorInput.addEventListener("change", () => {
      this.closeColorPopover();
      this.refreshToolbar();
    });
    customRow.appendChild(colorInput);
    this.transientPopovers.open("color", popover, { onClose: () => this.refocusInlineTextEditor() });
    this.positionPopoverNearAnchor(popover, anchor);
  }
  createStrokeSizeButton() {
    const width = this.shouldApplyStyleToSelection() ? this.getSelectionWidthValue() : this.getActiveWidth();
    const button = createEl("button");
    button.type = "button";
    button.className = "pdf-native-annotator-stroke-button";
    button.classList.add("is-active");
    button.title = `${this.getStrokePopoverTitle()}: ${width.toFixed(1)} px`;
    button.setAttribute("aria-label", `${this.getStrokePopoverTitle()} ${width.toFixed(1)} px`);
    (0, import_obsidian6.setIcon)(button.createSpan({ cls: "pdf-native-annotator-stroke-icon" }), "sliders-horizontal");
    button.createSpan({ cls: "pdf-native-annotator-stroke-value", text: `${width.toFixed(1)}` });
    this.bindToolbarButtonActivation(button, () => {
      this.openStrokeThicknessPopover(button);
    });
    return button;
  }
  updateStrokePreviewElement(anchor, width) {
    var _a2;
    const strokeValue = anchor.querySelector(".pdf-native-annotator-stroke-value");
    if (strokeValue) {
      strokeValue.textContent = width.toFixed(1);
    }
    anchor.setAttribute("aria-label", `${this.getStrokePopoverTitle()} ${width.toFixed(1)} px`);
    anchor.setAttribute("title", `${this.getStrokePopoverTitle()}: ${width.toFixed(1)} px`);
    const activePresetPreview = (_a2 = this.toolbarEl) == null ? void 0 : _a2.querySelector(".pdf-native-annotator-preset.is-active .pdf-native-annotator-preset-preview");
    this.updatePresetPreviewElement(activePresetPreview, width);
  }
  updatePresetPreviewElement(preview, width) {
    if (!preview) {
      return;
    }
    preview.setCssStyles({
      height: `${Math.max(4, Math.min(14, width))}px`,
      width: `${Math.max(18, Math.min(34, width * 2.6))}px`
    });
  }
  getWidthStorageTool(tool = this.currentTool) {
    return isShapeTool(tool) ? "pen" : tool;
  }
  setToolbarWidth(width, refresh = true, targetTool = this.currentTool, pushSelectionHistory = true) {
    if (this.shouldApplyStyleToSelection()) {
      this.applyWidthToSelection(width, pushSelectionHistory);
    }
    this.toolState.setWidth(width, this.getWidthStorageTool(targetTool));
    this.persistToolDefaults();
    this.refreshToolPreviewFromLastPointer(this.currentTool === "eraser" && this.erasingSession);
    if (refresh) {
      this.refreshToolbar();
    }
  }
  openStrokeThicknessPopover(anchor) {
    this.beginExclusiveMenu();
    const popover = createDiv();
    popover.className = "modal pdf-native-annotator-stroke-popover";
    const targetTool = this.currentTool;
    const initialWidth = this.shouldApplyStyleToSelection() ? this.getSelectionWidthValue() : this.getActiveWidth();
    const title = popover.createDiv({ cls: "pdf-native-annotator-stroke-popover-title" });
    title.createSpan({ text: this.getStrokePopoverTitle() });
    title.appendChild(this.createPopoverCloseButton(() => this.closeStrokePopover()));
    const previewWrap = popover.createDiv({ cls: "pdf-native-annotator-stroke-popover-preview" });
    const previewLine = previewWrap.createSpan({ cls: "pdf-native-annotator-stroke-popover-preview-line" });
    previewLine.setCssProps({ "--stroke-preview-size": `${initialWidth}px` });
    if (targetTool === "highlighter") {
      previewWrap.classList.add("is-highlighter");
      previewLine.setCssStyles({ backgroundColor: this.currentColor });
    } else if (targetTool === "eraser") {
      previewWrap.classList.add("is-eraser");
    } else {
      previewLine.setCssStyles({ backgroundColor: this.currentColor });
    }
    const body = popover.createDiv({ cls: "pdf-native-annotator-stroke-popover-body" });
    const valueLabel = body.createSpan({ cls: "pdf-native-annotator-stroke-popover-value", text: `${initialWidth.toFixed(1)} px` });
    const sliderWrap = body.createDiv({ cls: "pdf-native-annotator-stroke-slider-wrap" });
    const slider = sliderWrap.createEl("input", { type: "range" });
    const widthRange = this.getWidthRange(targetTool);
    slider.min = String(widthRange.min);
    slider.max = String(widthRange.max);
    slider.step = String(widthRange.step);
    slider.value = String(initialWidth);
    const tickRow = sliderWrap.createDiv({ cls: "pdf-native-annotator-stroke-ticks" });
    tickRow.createSpan({ text: "Thin" });
    tickRow.createSpan({ text: "Thick" });
    let historyCaptured = false;
    slider.addEventListener("input", () => {
      if (!historyCaptured && this.shouldApplyStyleToSelection()) {
        this.pushHistory();
        historyCaptured = true;
      }
      const width = Number(slider.value);
      valueLabel.textContent = `${width.toFixed(1)} px`;
      previewLine.setCssProps({ "--stroke-preview-size": `${width}px` });
      this.setToolbarWidth(width, false, targetTool, false);
      this.updateStrokePreviewElement(anchor, width);
    });
    slider.addEventListener("change", () => {
      const width = Number(slider.value);
      this.setToolbarWidth(width, true, targetTool, !historyCaptured);
    });
    this.transientPopovers.open("stroke", popover);
    this.positionPopoverNearAnchor(popover, anchor);
  }
  closeStrokePopover() {
    this.transientPopovers.close("stroke");
  }
  closeTransientPopovers() {
    this.transientPopovers.closeAll();
  }
  closeColorPopover() {
    this.transientPopovers.close("color");
  }
  closePaperColorPopover() {
    this.transientPopovers.close("paper-color");
  }
  closeConfirmPopover() {
    this.transientPopovers.close("confirm");
  }
  closeRenamePopover() {
    this.transientPopovers.close("rename");
  }
  closeGoToPagePopover() {
    this.transientPopovers.close("go-to-page");
  }
  closePageListPopover() {
    this.transientPopovers.close("page-list");
  }
  closeFontPopover() {
    this.transientPopovers.close("font");
  }
  refocusInlineTextEditor() {
    const editor = this.inlineTextEditorEl;
    if (!editor) {
      return;
    }
    this.ownerWindow.setTimeout(() => {
      if (this.inlineTextEditorEl === editor && editor.isConnected) {
        editor.focus();
        this.updateInlineTextCaretMirror();
      }
    }, 0);
  }
  getActiveWidth() {
    return this.toolState.getWidth();
  }
  getStrokePopoverTitle() {
    if (this.currentTool === "eraser") {
      return "Eraser thickness";
    }
    if (this.currentTool === "highlighter") {
      return "Highlighter thickness";
    }
    if (this.currentTool === "line") {
      return "Line thickness";
    }
    if (this.currentTool === "rectangle" || this.currentTool === "ellipse") {
      return "Shape thickness";
    }
    return "Pen thickness";
  }
  getWidthRange(tool = this.currentTool) {
    if (tool === "highlighter") {
      return TOOL_WIDTH_RANGES.highlighter;
    }
    if (tool === "eraser") {
      return TOOL_WIDTH_RANGES.eraser;
    }
    return TOOL_WIDTH_RANGES.pen;
  }
  getSelectionWidthValue() {
    if (!this.annotationDocument || this.selectedTargets.length === 0) {
      return this.getActiveWidth();
    }
    const values = [];
    for (const target of this.selectedTargets) {
      if (target.kind === "stroke") {
        const stroke = this.annotationDocument.strokes.find((entry) => entry.id === target.id);
        if (stroke) {
          values.push(stroke.width);
        }
        continue;
      }
      if (target.kind === "shape") {
        const shape = this.annotationDocument.shapes.find((entry) => entry.id === target.id);
        if (shape) {
          values.push(shape.width);
        }
        continue;
      }
      const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
      if (item) {
        values.push(Math.max(1, Math.round(item.fontSize / 4)));
      }
    }
    if (values.length === 0) {
      return this.getActiveWidth();
    }
    return Math.max(1, Math.round(values.reduce((sum, value) => sum + value, 0) / values.length));
  }
  refreshToolPreviewFromLastPointer(active = false) {
    if (this.currentTool !== "eraser") {
      this.hideToolPreview();
      return;
    }
    const preview = this.previewState.snapshot;
    if (preview.clientX === null || preview.clientY === null) {
      if (!active) {
        this.hideToolPreview();
      }
      return;
    }
    this.updateToolPreview(preview.clientX, preview.clientY, active);
  }
  getToolPreviewRadius() {
    if (this.currentTool === "eraser") {
      return Math.max(6, this.toolState.getWidth("eraser") / 2);
    }
    return 0;
  }
  getEraserThreshold(pageNumber) {
    var _a2;
    const surface = this.pageSurfaces.get(pageNumber);
    const pageWidth = Math.max((_a2 = surface == null ? void 0 : surface.lastWidth) != null ? _a2 : 1, 1);
    return this.getToolPreviewRadius() / pageWidth;
  }
  updateToolPreview(clientX, clientY, active = false) {
    const viewContentEl = this.getViewContentEl();
    if (!this.toolPreviewEl || !this.annotationMode || !viewContentEl) {
      return;
    }
    this.previewState.recordPointer(clientX, clientY);
    const radius = this.getToolPreviewRadius();
    if (radius <= 0 || this.currentTool !== "eraser") {
      this.hideToolPreview();
      return;
    }
    this.previewState.show(radius, active);
    this.toolPreviewEl.classList.remove("is-hidden", "is-eraser", "is-active");
    this.toolPreviewEl.classList.add("is-eraser");
    if (active) {
      this.toolPreviewEl.classList.add("is-active");
    }
    const size = radius * 2;
    const rect = viewContentEl.getBoundingClientRect();
    this.toolPreviewEl.setCssStyles({
      width: `${size}px`,
      height: `${size}px`,
      left: `${clientX - rect.left - radius}px`,
      top: `${clientY - rect.top - radius}px`
    });
  }
  hideToolPreview() {
    var _a2;
    this.previewState.hide();
    (_a2 = this.toolPreviewEl) == null ? void 0 : _a2.classList.add("is-hidden");
  }
  openShapeToolMenu(button) {
    const menu = new import_obsidian6.Menu();
    const shapeTools = [
      { tool: "rectangle", label: "Rectangle", icon: "square" },
      { tool: "ellipse", label: "Ellipse", icon: "circle" },
      { tool: "line", label: "Line", icon: "minus" }
    ];
    addMenuDescriptors(menu, shapeTools.map((shape) => ({
      title: shape.label,
      icon: shape.icon,
      checked: this.currentTool === shape.tool,
      run: () => {
        this.setActiveTool(shape.tool);
        this.applyOverlayMode();
        this.refreshToolbar();
        this.refreshStatus(`Tool: ${shape.label}`);
      }
    })));
    const rect = button.getBoundingClientRect();
    this.showExclusiveMenuAtPosition(menu, { x: rect.left, y: rect.bottom + 6 });
  }
  toggleEraserMode() {
    const nextMode = this.eraserMode === "segment" ? "object" : "segment";
    this.toolState.setEraserMode(nextMode);
    this.persistToolDefaults();
    this.refreshToolbar();
    this.refreshToolPreviewFromLastPointer(false);
    this.refreshStatus(nextMode === "object" ? "Eraser mode: whole object" : "Eraser mode: touch section");
  }
  openSelectionMenu(button) {
    const menu = new import_obsidian6.Menu();
    addMenuDescriptors(menu, [
      { mode: "single", title: "Single select", status: "Selection mode: single" },
      { mode: "box", title: "Box select", status: "Selection mode: box" },
      { mode: "lasso", title: "Freehand lasso", status: "Selection mode: lasso" }
    ].map((definition) => ({
      title: definition.title,
      checked: this.toolState.selectionMode === definition.mode,
      run: () => {
        this.setSelectionMode(definition.mode);
        this.refreshStatus(definition.status);
      }
    })));
    const rect = button.getBoundingClientRect();
    this.showExclusiveMenuAtPosition(menu, { x: rect.left, y: rect.bottom + 6 });
  }
  openSelectionActionsMenu(button) {
    const menu = new import_obsidian6.Menu();
    const hasAnnotationSelection = this.selectedTargets.length > 0;
    const descriptors = [
      { title: "Select all on page (Ctrl/Cmd+A)", icon: "list-plus", run: () => this.selectAllCurrentPageAnnotations() }
    ];
    if (hasAnnotationSelection) {
      descriptors.push(
        menuSeparator,
        { title: "Copy selection (Ctrl/Cmd+C)", icon: "copy", run: () => this.copySelectedTargets() },
        { title: "Cut selection (Ctrl/Cmd+X)", icon: "scissors", run: () => this.cutSelectedTargets() },
        { title: "Duplicate selection", icon: "copy", run: () => this.duplicateSelectedTargets() },
        { title: "Delete selection (Del)", icon: "trash", run: () => this.deleteSelectedTargets() },
        menuSeparator,
        { title: "Bring to front (Ctrl/Cmd+])", icon: "bring-to-front", run: () => this.reorderSelectedTargets("front") },
        { title: "Send to back (Ctrl/Cmd+[)", icon: "send-to-back", run: () => this.reorderSelectedTargets("back") }
      );
    }
    if (this.plugin.hasClipboard()) {
      descriptors.push(
        menuSeparator,
        { title: "Paste copied annotations (Ctrl/Cmd+V)", icon: "clipboard", run: () => this.pasteClipboard() },
        { title: "Paste copied annotation in place (Ctrl/Cmd+Shift+V)", icon: "clipboard-copy", run: () => this.pasteClipboard(true) }
      );
    }
    addMenuDescriptors(menu, descriptors);
    const rect = button.getBoundingClientRect();
    this.showExclusiveMenuAtPosition(menu, { x: rect.left, y: rect.bottom + 6 });
  }
  openRegionActionsMenu(button) {
    const menu = new import_obsidian6.Menu();
    const region = this.lastSelectionRegion;
    if (!region) {
      addMenuDescriptors(menu, [{ title: "No active region", icon: "info", disabled: true }]);
      const emptyRect = button.getBoundingClientRect();
      this.showExclusiveMenuAtPosition(menu, { x: emptyRect.left, y: emptyRect.bottom + 6 });
      return;
    }
    addMenuDescriptors(menu, [
      { title: "Copy region embed block", icon: "code", run: () => this.copySelectionAnnotatedEmbedBlock() },
      { title: "Copy region reference", icon: "link", run: () => this.copySelectionRegionReference() },
      { title: "Export region image", icon: "image-file", run: () => this.exportSelectionSnapshot() },
      { title: "Open source page", icon: "file-text", run: () => this.goToMixedPage(region.page) },
      menuSeparator,
      { title: "Clear region", icon: "x", run: () => this.clearRegion() }
    ]);
    const rect = button.getBoundingClientRect();
    this.showExclusiveMenuAtPosition(menu, { x: rect.left, y: rect.bottom + 6 });
  }
  applyOverlayMode() {
    var _a2, _b;
    const enabled = this.annotationMode && ((_a2 = this.file) == null ? void 0 : _a2.path) === ((_b = this.getPdfFile()) == null ? void 0 : _b.path);
    if (!this.annotationMode || !isInkDrawingTool(this.currentTool) || this.getInkInputPolicy() !== "pen-mouse-only") {
      this.finishFingerPan(false);
    }
    for (const surface of this.pageSurfaces.values()) {
      const cursorTool = enabled ? this.currentTool : "disabled";
      const cursor = resolveOverlayModeCursor(
        cursorTool,
        surface.overlayEl.dataset.cursorTool,
        surface.overlayEl.style.cursor,
        this.getDefaultOverlayCursor()
      );
      surface.overlayEl.classList.toggle("is-enabled", enabled);
      surface.overlayEl.setCssStyles({
        pointerEvents: enabled ? "auto" : "none",
        touchAction: enabled ? this.getOverlayTouchAction() : ""
      });
      this.setOverlayCursor(surface, cursor, cursorTool);
    }
    if (!this.annotationMode) {
      this.hideToolPreview();
      return;
    }
    this.refreshToolPreviewFromLastPointer(this.currentTool === "eraser" && this.erasingSession);
  }
  getOverlayTouchAction() {
    return "pinch-zoom";
  }
  getInkInputPolicy() {
    return this.plugin.getInkInputPolicy();
  }
  toggleTabletTouchInputMode() {
    const touchDrawing = this.getInkInputPolicy() !== "pen-mouse-only";
    const nextPolicy = touchDrawing ? "pen-mouse-only" : "allow-touch";
    this.forceFinishStalePdfInteraction("Input mode changed");
    void this.plugin.updateBehaviorSettings({ inkInputPolicy: nextPolicy });
    this.refreshStatus(
      nextPolicy === "allow-touch" ? "Finger draws; Apple Pencil and mouse also draw" : "Finger pans; Apple Pencil and mouse draw",
      3e3
    );
  }
  handleInlineTextEditorShortcut(event) {
    const editor = this.inlineTextEditorEl;
    if (!editor || event.target !== editor && editor.ownerDocument.activeElement !== editor) {
      return false;
    }
    const key = event.key.toLowerCase();
    const isModifierShortcut = (event.ctrlKey || event.metaKey) && !event.altKey;
    if (event.isComposing) {
      return false;
    }
    if (isModifierShortcut && key === "b") {
      this.setTextFontWeight(this.currentTextFontWeight === "bold" ? "normal" : "bold");
      return true;
    }
    if (isModifierShortcut && key === "i") {
      this.setTextFontStyle(this.currentTextFontStyle === "italic" ? "normal" : "italic");
      return true;
    }
    if (isModifierShortcut && key === "enter") {
      this.finishSessionInlineTextEditor(true);
      return true;
    }
    if (key === "escape") {
      this.finishSessionInlineTextEditor(false);
      return true;
    }
    return false;
  }
  isSessionEscapeEligible(event) {
    if (!this.annotationMode || !this.isLeafActive()) {
      return false;
    }
    const target = event.target;
    if (isHtmlElement(target)) {
      if (target.isContentEditable || target.closest("input, textarea, select, [contenteditable='true']")) {
        return false;
      }
    }
    return !this.hasOpenTransientPopover();
  }
  exitAnnotationModeFromEscape() {
    if (!this.annotationMode) {
      return;
    }
    this.selectedTarget = null;
    this.selectedTargets = [];
    this.lastSelectionRegion = null;
    this.activeResizeHandle = null;
    this.dragAnchor = null;
    this.toggleAnnotationMode();
  }
  isSessionKeyboardActive(event) {
    if (!this.annotationMode || this.currentTool !== "select" || !this.isLeafActive()) {
      return false;
    }
    return this.isSessionShortcutActive(event);
  }
  isSessionShortcutActive(event) {
    var _a2, _b;
    if (((_a2 = this.file) == null ? void 0 : _a2.path) !== ((_b = this.getPdfFile()) == null ? void 0 : _b.path) || event.isComposing || !this.annotationMode || !this.isLeafActive()) {
      return false;
    }
    if (this.hasOpenTransientPopover()) {
      return false;
    }
    const target = event.target;
    if (isHtmlElement(target)) {
      if (target.isContentEditable || target.closest("input, textarea, select, [contenteditable='true']")) {
        return false;
      }
    }
    return true;
  }
  isLeafActive() {
    var _a2;
    return ((_a2 = this.plugin.app.workspace.getActiveViewOfType(import_obsidian6.FileView)) == null ? void 0 : _a2.leaf) === this.leaf;
  }
  beginEditingSelectedTextTarget(target) {
    if (!this.annotationDocument || target.kind !== "text") {
      return;
    }
    const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
    if (!item) {
      return;
    }
    this.syncCurrentTextStyleFromItem(item);
    this.beginSessionInlineTextEditor(target.page, { x: item.x, y: item.y, pressure: 0.5 }, item);
  }
  hasOpenTransientPopover() {
    return this.transientPopovers.hasOpen();
  }
  getKeyboardNudgeAmount(useLargeStep) {
    var _a2, _b, _c, _d, _e;
    const selectedPage = (_c = (_b = this.getSelectionPage()) != null ? _b : (_a2 = this.lastSelectionRegion) == null ? void 0 : _a2.page) != null ? _c : this.currentPage;
    const surface = this.pageSurfaces.get(selectedPage);
    const minDimension = Math.min((_d = surface == null ? void 0 : surface.lastWidth) != null ? _d : 0, (_e = surface == null ? void 0 : surface.lastHeight) != null ? _e : 0);
    const pixels = useLargeStep ? 10 : 2;
    if (!minDimension) {
      return useLargeStep ? 0.012 : 3e-3;
    }
    return clamp2(pixels / minDimension, 1e-3, 0.03);
  }
  getDefaultOverlayCursor() {
    if (!this.annotationMode) {
      return "default";
    }
    if (this.currentTool === "eraser") {
      return "cell";
    }
    return "crosshair";
  }
  setOverlayCursor(surface, cursor, cursorTool = this.currentTool) {
    if (surface.overlayEl.style.cursor !== cursor) {
      surface.overlayEl.setCssStyles({ cursor });
    }
    surface.overlayEl.dataset.cursorTool = cursorTool;
  }
  getSelectedRegionHit(pageNumber, point) {
    var _a2;
    const pageTargets = this.selectedTargets.filter((target) => target.page === pageNumber);
    const selectedBounds = this.getCombinedBounds(pageTargets);
    return selectedBounds && pointInBounds(point, selectedBounds) ? (_a2 = pageTargets[0]) != null ? _a2 : null : null;
  }
  getSelectionCursorAtPoint(surface, point) {
    var _a2, _b;
    if (this.pointerPage === surface.pageNumber && this.dragAnchor && this.selectedTargets.length > 0) {
      return this.activeResizeHandle ? this.getCursorForHandle(this.activeResizeHandle) : "grabbing";
    }
    const handle = this.selectedTargets.length > 0 ? this.getSelectionHandleHit(surface.pageNumber, point) : null;
    if (handle) {
      return this.getCursorForHandle(handle);
    }
    const hit = (_b = (_a2 = this.getSelectedTargetHit(surface.pageNumber, point)) != null ? _a2 : this.getSelectedRegionHit(surface.pageNumber, point)) != null ? _b : this.findSelectableTarget(surface.pageNumber, point);
    return hit ? "move" : "crosshair";
  }
  updateOverlayCursorForPointer(event) {
    var _a2;
    const surface = this.getSurfaceAtClientPoint(event.clientX, event.clientY);
    if (!surface) {
      return;
    }
    const rect = surface.overlayEl.getBoundingClientRect();
    const point = {
      x: clamp2((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1),
      y: clamp2((event.clientY - rect.top) / Math.max(rect.height, 1), 0, 1),
      pressure: 0.5
    };
    let cursor = this.getDefaultOverlayCursor();
    if (this.currentTool === "select") {
      cursor = this.getSelectionCursorAtPoint(surface, point);
    } else if (this.currentTool === "text") {
      cursor = ((_a2 = this.findSelectableTarget(surface.pageNumber, point)) == null ? void 0 : _a2.kind) === "text" ? "text" : "crosshair";
    }
    this.setOverlayCursor(surface, cursor);
  }
  rememberPotentialWebKitStylusPointer(event) {
    this.clearPendingWebKitTouchPointer();
    this.pendingWebKitTouchPointer = event;
    this.pendingWebKitTouchHandle = this.ownerWindow.setTimeout(() => {
      this.pendingWebKitTouchHandle = null;
      this.pendingWebKitTouchPointer = null;
    }, 350);
  }
  clearPendingWebKitTouchPointer() {
    if (this.pendingWebKitTouchHandle !== null) {
      this.ownerWindow.clearTimeout(this.pendingWebKitTouchHandle);
      this.pendingWebKitTouchHandle = null;
    }
    this.pendingWebKitTouchPointer = null;
  }
  handleFingerPanPointerDown(event) {
    var _a2;
    if (!this.annotationMode || this.activePdfPointerId !== null || this.fingerPanPointerId !== null || !shouldPanInkPointerEvent(event, this.currentTool, this.getInkInputPolicy())) {
      return false;
    }
    const target = isDomElement(event.target) ? event.target : null;
    const viewContentEl = this.getViewContentEl();
    if (!target || !(viewContentEl == null ? void 0 : viewContentEl.contains(target)) || !this.isPointerTargetInsidePdfPage(target)) {
      return false;
    }
    const surface = this.ensureSurfaceAtClientPoint(event.clientX, event.clientY);
    if (!surface) {
      return false;
    }
    const scrollEl = ((_a2 = this.scrollParent) == null ? void 0 : _a2.isConnected) ? this.scrollParent : findScrollParent(surface.pageEl);
    event.preventDefault();
    event.stopImmediatePropagation();
    this.hideToolPreview();
    this.cancelFingerPanInertia();
    this.rememberPotentialWebKitStylusPointer(event);
    this.fingerPanPointerId = event.pointerId;
    this.fingerPanCanvas = surface.overlayEl;
    this.fingerPanScrollEl = scrollEl;
    this.fingerPanLastPoint = {
      clientX: event.clientX,
      clientY: event.clientY,
      time: event.timeStamp || performance.now()
    };
    this.fingerPanPendingDelta = { x: 0, y: 0 };
    this.fingerPanVelocity = { x: 0, y: 0 };
    this.pauseCommittedRenderingForViewportMotion();
    try {
      surface.overlayEl.setPointerCapture(event.pointerId);
    } catch (e2) {
    }
    this.ownerDocument.addEventListener("pointermove", this.handleFingerPanPointerMove, true);
    this.ownerDocument.addEventListener("pointerup", this.handleFingerPanPointerUp, true);
    this.ownerDocument.addEventListener("pointercancel", this.handleFingerPanPointerCancel, true);
    return true;
  }
  applyPendingFingerPan() {
    const scrollEl = this.fingerPanScrollEl;
    if (!scrollEl) {
      return;
    }
    const deltaX = this.fingerPanPendingDelta.x;
    const deltaY = this.fingerPanPendingDelta.y;
    this.fingerPanPendingDelta = { x: 0, y: 0 };
    scrollEl.scrollLeft += deltaX;
    scrollEl.scrollTop += deltaY;
  }
  finishFingerPan(startInertia) {
    if (this.fingerPanFrameHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.fingerPanFrameHandle);
      this.fingerPanFrameHandle = null;
    }
    if (startInertia) {
      this.applyPendingFingerPan();
    } else {
      this.fingerPanPendingDelta = { x: 0, y: 0 };
    }
    this.ownerDocument.removeEventListener("pointermove", this.handleFingerPanPointerMove, true);
    this.ownerDocument.removeEventListener("pointerup", this.handleFingerPanPointerUp, true);
    this.ownerDocument.removeEventListener("pointercancel", this.handleFingerPanPointerCancel, true);
    if (this.fingerPanCanvas && this.fingerPanPointerId !== null) {
      try {
        this.fingerPanCanvas.releasePointerCapture(this.fingerPanPointerId);
      } catch (e2) {
      }
    }
    const scrollEl = this.fingerPanScrollEl;
    const velocity = { ...this.fingerPanVelocity };
    this.fingerPanPointerId = null;
    this.fingerPanCanvas = null;
    this.fingerPanScrollEl = null;
    this.fingerPanLastPoint = null;
    this.fingerPanPendingDelta = { x: 0, y: 0 };
    this.fingerPanVelocity = { x: 0, y: 0 };
    this.clearPendingWebKitTouchPointer();
    if (startInertia && scrollEl && Math.hypot(velocity.x, velocity.y) >= 0.04) {
      this.startFingerPanInertia(scrollEl, velocity.x, velocity.y);
    } else {
      this.resumeCommittedRenderingAfterFingerPan();
    }
  }
  startFingerPanInertia(scrollEl, velocityX, velocityY) {
    this.cancelFingerPanInertia();
    let lastTime = performance.now();
    const step = (now) => {
      const deltaTime = Math.min(32, Math.max(1, now - lastTime));
      lastTime = now;
      const previousScrollLeft = scrollEl.scrollLeft;
      const previousScrollTop = scrollEl.scrollTop;
      scrollEl.scrollLeft += velocityX * deltaTime;
      scrollEl.scrollTop += velocityY * deltaTime;
      if (scrollEl.scrollLeft === previousScrollLeft) {
        velocityX = 0;
      }
      if (scrollEl.scrollTop === previousScrollTop) {
        velocityY = 0;
      }
      const damping = Math.pow(0.9, deltaTime / 16.67);
      velocityX *= damping;
      velocityY *= damping;
      if (Math.hypot(velocityX, velocityY) < 0.02 || !scrollEl.isConnected) {
        this.fingerPanInertiaHandle = null;
        this.resumeCommittedRenderingAfterFingerPan();
        return;
      }
      this.fingerPanInertiaHandle = this.ownerWindow.requestAnimationFrame(step);
    };
    this.fingerPanInertiaHandle = this.ownerWindow.requestAnimationFrame(step);
  }
  cancelFingerPanInertia() {
    if (this.fingerPanInertiaHandle !== null) {
      this.ownerWindow.cancelAnimationFrame(this.fingerPanInertiaHandle);
      this.fingerPanInertiaHandle = null;
    }
  }
  handleCapturedInkPointerDown(event) {
    var _a2, _b, _c;
    if (!this.annotationMode || !shouldCaptureInkPointerEvent(event, this.currentTool, this.getInkInputPolicy())) {
      return false;
    }
    if (this.fingerPanPointerId !== null) {
      this.finishFingerPan(false);
    }
    const target = isDomElement(event.target) ? event.target : null;
    const viewContentEl = this.getViewContentEl();
    if (!target || !(viewContentEl == null ? void 0 : viewContentEl.contains(target))) {
      return false;
    }
    let canvas = (_a2 = target.closest(`.${OVERLAY_CLASS}`)) != null ? _a2 : null;
    if (!canvas && this.isPointerTargetInsidePdfPage(target)) {
      canvas = (_c = (_b = this.ensureSurfaceAtClientPoint(event.clientX, event.clientY)) == null ? void 0 : _b.overlayEl) != null ? _c : null;
    }
    if (!canvas || !isHtmlCanvasElement(canvas) || !viewContentEl.contains(canvas)) {
      return false;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    if (this.activePdfPointerId === null) {
      this.handlePointerDownForCanvas(event, canvas);
    }
    return true;
  }
  handleFallbackPointerDown(event) {
    if (!this.annotationMode || this.pointerPage !== null) {
      return;
    }
    const target = isDomElement(event.target) ? event.target : null;
    if (!target || target.closest(`.${SESSION_ROOT_CLASS}, ${TOOLBAR_SELECTORS}, .menu, .menu-item, .modal, .modal-container, .popover, .suggestion-container, .prompt, .pdf-native-annotator-popover-backdrop, .pdf-native-annotator-color-popover, .pdf-native-annotator-confirm-popover, .pdf-native-annotator-rename-popover, .pdf-native-annotator-font-popover, .pdf-native-annotator-stroke-popover, .pdf-native-annotator-page-list-popover, .pdf-native-annotator-inline-text-frame, .pdf-native-annotator-inline-text-editor, .pdf-native-annotator-inline-text-handle`)) {
      return;
    }
    if (target.closest(`.${OVERLAY_CLASS}`)) {
      return;
    }
    if (!this.isPointerTargetInsidePdfPage(target)) {
      return;
    }
    const surface = this.ensureSurfaceAtClientPoint(event.clientX, event.clientY);
    if (!surface) {
      this.refreshStatus(`Could not start ink: no page surface at pointer (${this.pageSurfaces.size} registered)`, 4e3);
      this.scheduleSyncPages();
      return;
    }
    if (shouldIgnoreInkPointerEvent(event, this.currentTool, this.getInkInputPolicy())) {
      return;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    this.handlePointerDownForCanvas(event, surface.overlayEl);
  }
  isPointerTargetInsidePdfPage(target) {
    const viewContentEl = this.getViewContentEl();
    if (!(viewContentEl == null ? void 0 : viewContentEl.contains(target))) {
      return false;
    }
    const pageEl = target.closest(
      ".page[data-page-number], .pdf-page[data-page-number], .pdf-native-annotator-synthetic-page[data-page-number]"
    );
    return !!pageEl && viewContentEl.contains(pageEl);
  }
  getSurfaceAtClientPoint(clientX, clientY) {
    let bestSurface = null;
    let bestArea = Number.POSITIVE_INFINITY;
    for (const surface of this.pageSurfaces.values()) {
      if (!surface.overlayEl.isConnected || this.ownerWindow.getComputedStyle(surface.overlayEl).visibility === "hidden") {
        continue;
      }
      const rect = surface.overlayEl.getBoundingClientRect();
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
        continue;
      }
      const area = Math.max(1, rect.width * rect.height);
      if (area < bestArea) {
        bestArea = area;
        bestSurface = surface;
      }
    }
    return bestSurface;
  }
  ensureSurfaceAtClientPoint(clientX, clientY) {
    var _a2;
    const existing = this.getSurfaceAtClientPoint(clientX, clientY);
    if (existing) {
      return existing;
    }
    const pageEntry = this.getPageElementAtClientPoint(clientX, clientY);
    if (!pageEntry) {
      return null;
    }
    try {
      this.ensurePageSurface(pageEntry.pageEl, pageEntry.pageNumber);
    } catch (error) {
      console.error(`freedraw-pdf: failed to create page surface for page ${pageEntry.pageNumber}`, error);
      return null;
    }
    this.applyOverlayMode();
    return (_a2 = this.pageSurfaces.get(pageEntry.pageNumber)) != null ? _a2 : null;
  }
  getPageElementAtClientPoint(clientX, clientY) {
    const viewContentEl = this.getViewContentEl();
    if (!viewContentEl) {
      return null;
    }
    let bestEntry = null;
    const primaryViewerEl = this.getPrimaryPdfViewerEl(viewContentEl);
    const realPageEls = primaryViewerEl ? Array.from(primaryViewerEl.querySelectorAll(".page[data-page-number], .pdf-page[data-page-number]")) : Array.from(viewContentEl.querySelectorAll(PAGE_SELECTORS));
    const syntheticPageEls = Array.from(viewContentEl.querySelectorAll(".pdf-native-annotator-synthetic-page[data-page-number]"));
    for (const pageEl of [...realPageEls, ...syntheticPageEls]) {
      if (pageEl.classList.contains("pdf-native-annotator-synthetic-page") && !pageEl.dataset.pageNumber) {
        continue;
      }
      const pageNumber = Number(pageEl.dataset.pageNumber);
      if (!Number.isFinite(pageNumber) || pageNumber <= 0) {
        continue;
      }
      const rect = pageEl.getBoundingClientRect();
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
        continue;
      }
      const area = Math.max(1, rect.width * rect.height);
      if (!bestEntry || area < bestEntry.area) {
        bestEntry = { pageEl, pageNumber, area };
      }
    }
    return bestEntry ? { pageEl: bestEntry.pageEl, pageNumber: bestEntry.pageNumber } : null;
  }
  handlePointerDownForCanvas(event, canvas, forceWebKitStylus = false) {
    var _a2, _b;
    this.selectionBackground = null;
    if (!this.annotationMode) {
      this.refreshStatus("Could not start ink: annotation mode is off", 4e3);
      return;
    }
    if (!this.annotationDocument) {
      this.refreshStatus("Could not start ink: annotation document is not loaded yet", 4e3);
      return;
    }
    const pageNumber = Number(canvas.dataset.pageNumber);
    if (!Number.isFinite(pageNumber) || pageNumber <= 0) {
      this.refreshStatus("Could not start ink: page number is missing from the overlay", 4e3);
      this.scheduleSyncPages();
      return;
    }
    const surface = this.pageSurfaces.get(pageNumber);
    if (!surface) {
      this.refreshStatus(`Could not start ink: page ${pageNumber} surface is not ready`, 4e3);
      this.scheduleSyncPages();
      return;
    }
    canvas.setCssStyles({ touchAction: this.getOverlayTouchAction() });
    if (!forceWebKitStylus && shouldIgnoreInkPointerEvent(event, this.currentTool, this.getInkInputPolicy())) {
      return;
    }
    event.preventDefault();
    const isInkInput = isInkDrawingTool(this.currentTool);
    if (isInkInput) {
      canvas.setCssStyles({ touchAction: "none" });
      this.pauseCommittedRenderingForInkInput();
    }
    this.forceFinishStalePdfInteraction("New stroke recovered previous input");
    this.webKitStylusPointerId = forceWebKitStylus ? event.pointerId : null;
    this.currentPage = pageNumber;
    if (!isInkInput) {
      this.refreshToolbar();
    }
    this.lastPdfPoint = null;
    this.lastPdfPointTime = 0;
    const pointerRect = surface.overlayEl.getBoundingClientRect();
    const point = this.getNormalizedPointFromRect(pointerRect, event);
    if (isInkDrawingTool(this.currentTool)) {
      this.renderTelemetry.recordPointerDown(this.currentTool, pageNumber, event);
    }
    if (this.inlineTextEditorEl) {
      this.finishSessionInlineTextEditor(true);
    }
    if (this.currentTool === "eraser") {
      this.updateToolPreview(event.clientX, event.clientY, true);
    }
    try {
      canvas.setPointerCapture(event.pointerId);
    } catch (error) {
      console.warn("freedraw-pdf: pointer capture unavailable", error);
    }
    this.bindPdfPointerDocumentTracking(event.pointerId, canvas, pointerRect, forceWebKitStylus);
    if (this.currentTool === "select") {
      const handle = this.getSelectionHandleHit(pageNumber, point);
      if (this.selectedTargets.length > 0 && handle) {
        this.pushHistory();
        this.dragAnchor = point;
        this.dragMoved = false;
        this.activeResizeHandle = handle;
        this.pointerPage = pageNumber;
        this.setOverlayCursor(surface, this.getCursorForHandle(handle));
        this.refreshStatus("Resize handle selected");
        return;
      }
      const selectedHit = (_a2 = this.getSelectedTargetHit(pageNumber, point)) != null ? _a2 : this.getSelectedRegionHit(pageNumber, point);
      if (this.selectedTargets.length > 0 && selectedHit) {
        this.pushHistory();
        this.dragAnchor = point;
        this.dragMoved = false;
        this.activeResizeHandle = null;
        this.pointerPage = pageNumber;
        this.setOverlayCursor(surface, "grabbing");
        this.selectedTarget = selectedHit;
        this.refreshStatus(this.selectedTargets.length > 1 ? `Moving ${this.selectedTargets.length} selections` : "Moving selection");
        return;
      }
      if (this.toolState.selectionMode === "box") {
        this.lastSelectionRegion = null;
        this.currentLasso = { page: pageNumber, points: getSelectionBoxPoints(point, point) };
        this.dragAnchor = point;
        this.dragMoved = false;
        this.activeResizeHandle = null;
        this.pointerPage = pageNumber;
        this.drawPageAnnotations(pageNumber);
        this.refreshStatus("Drag box select");
        return;
      }
      if (this.toolState.selectionMode === "lasso") {
        this.lastSelectionRegion = null;
        this.currentLasso = { page: pageNumber, points: [point] };
        this.dragAnchor = null;
        this.pointerPage = pageNumber;
        this.drawPageAnnotations(pageNumber);
        this.refreshStatus("Tracing lasso");
        return;
      }
      const hit = this.findSelectableTarget(pageNumber, point);
      if (!hit) {
        this.selectedTarget = null;
        this.selectedTargets = [];
        this.dragAnchor = null;
        this.activeResizeHandle = null;
        this.drawPageAnnotations(pageNumber);
        this.refreshStatus("Nothing selected");
        return;
      }
      this.pushHistory();
      const shouldToggleSelection = event.shiftKey || event.ctrlKey || event.metaKey;
      if (shouldToggleSelection) {
        const existing = this.selectedTargets.find((target) => target.id === hit.id && target.kind === hit.kind && target.page === hit.page);
        this.selectedTargets = existing ? this.selectedTargets.filter((target) => !(target.id === hit.id && target.kind === hit.kind && target.page === hit.page)) : [...this.selectedTargets, hit];
        this.selectedTarget = (_b = this.selectedTargets[0]) != null ? _b : null;
      } else {
        this.selectedTarget = hit;
        this.selectedTargets = [hit];
      }
      this.lastSelectionRegion = null;
      this.dragAnchor = point;
      this.dragMoved = false;
      this.activeResizeHandle = null;
      this.pointerPage = pageNumber;
      this.setOverlayCursor(surface, "grabbing");
      this.drawPageAnnotations(pageNumber);
      this.refreshStatus(this.selectedTargets.length > 1 ? `Selected ${this.selectedTargets.length} objects` : `Selected ${hit.kind}`);
      return;
    }
    if (this.currentTool === "region") {
      this.lastSelectionRegion = null;
      this.currentLasso = { page: pageNumber, points: getSelectionBoxPoints(point, point) };
      this.dragAnchor = point;
      this.dragMoved = false;
      this.activeResizeHandle = null;
      this.pointerPage = pageNumber;
      this.drawPageAnnotations(pageNumber);
      this.refreshStatus("Drag region crop box");
      return;
    }
    if (this.currentTool === "text") {
      const hit = this.findSelectableTarget(pageNumber, point);
      if ((hit == null ? void 0 : hit.kind) === "text" && this.annotationDocument) {
        const existing = this.annotationDocument.textItems.find((entry) => entry.id === hit.id);
        if (existing) {
          try {
            canvas.releasePointerCapture(event.pointerId);
          } catch (e2) {
          }
          this.unbindPdfPointerDocumentTracking();
          this.selectedTarget = hit;
          this.selectedTargets = [hit];
          this.lastSelectionRegion = null;
          this.syncCurrentTextStyleFromItem(existing);
          this.beginSessionInlineTextEditor(pageNumber, { x: existing.x, y: existing.y, pressure: point.pressure }, existing);
          return;
        }
      }
      this.selectedTarget = null;
      this.selectedTargets = [];
      this.lastSelectionRegion = null;
      this.currentLasso = { page: pageNumber, points: getSelectionBoxPoints(point, point) };
      this.dragAnchor = point;
      this.dragMoved = false;
      this.pointerPage = pageNumber;
      this.drawPageAnnotations(pageNumber);
      this.refreshStatus("Drag to draw a text box, release to type");
      return;
    }
    if (this.currentTool === "eraser") {
      this.pushHistory();
      this.erasingSession = true;
      this.lastEraserPoint = point;
      this.eraserSessionPoints = [point];
      this.objectErasePreviewTargets.clear();
      this.pointerPage = pageNumber;
      if (this.eraserMode === "object") {
        this.previewObjectErase(pageNumber, point, point);
      } else {
        this.retainTouchErasePixels(pageNumber);
        this.eraseCommittedLayerAtPoint(surface, point);
      }
      this.refreshStatus(`Erasing (${this.eraserMode})`);
      return;
    }
    if (isShapeTool(this.currentTool)) {
      this.pushHistory();
      const zIndex2 = this.getNextPageZIndex(pageNumber);
      this.currentShape = {
        id: generateId("shape"),
        page: pageNumber,
        tool: this.currentTool,
        color: this.currentColor,
        width: this.toolState.getWidth("pen"),
        widthScale: this.getStableAnnotationWidthScale(this.toolState.getWidth("pen")),
        start: point,
        end: point,
        zIndex: zIndex2,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      this.pointerPage = pageNumber;
      this.drawPageAnnotations(pageNumber);
      return;
    }
    const strokeWidth = this.currentTool === "highlighter" ? this.toolState.getWidth("highlighter") : this.toolState.getWidth("pen");
    const zIndex = this.getNextPageZIndex(pageNumber);
    this.currentStroke = {
      inkSettings: { ...this.plugin.getInkRenderSettings() },
      id: generateId("stroke"),
      page: pageNumber,
      tool: this.currentTool,
      color: this.currentColor,
      width: strokeWidth,
      widthScale: this.getStableAnnotationWidthScale(strokeWidth),
      points: [point],
      zIndex,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.currentStrokeRenderedPointCount = 0;
    this.pointerPage = pageNumber;
    this.drawTransientPageAnnotations(pageNumber);
    this.showDrawingNotice(`New stroke on page ${pageNumber}`, 900);
    this.refreshStatus(`Stroke started: ${this.currentTool}, page ${pageNumber}, points 1`, 900);
  }
  hasActivePdfPointerInteraction() {
    return !!(this.currentStroke || this.currentShape || this.currentLasso || this.dragAnchor || this.activeResizeHandle || this.erasingSession);
  }
  resetStalePdfPointerInteraction() {
    if (this.hasActivePdfPointerInteraction()) {
      return;
    }
    if (this.pointerPage !== null || this.activePdfPointerId !== null || this.activePdfPointerCanvas !== null) {
      this.unbindPdfPointerDocumentTracking();
      this.pointerPage = null;
      this.lastEraserPoint = null;
      this.eraserSessionPoints = [];
      this.dragMoved = false;
    }
  }
  forceFinishStalePdfInteraction(message) {
    var _a2, _b, _c, _d, _e, _f, _g;
    this.finishFingerPan(false);
    this.cancelFingerPanInertia();
    if (!this.hasActivePdfPointerInteraction()) {
      this.resetStalePdfPointerInteraction();
      return;
    }
    this.freezeCurrentStrokeAtRenderedFrame();
    const pageNumber = (_g = (_f = (_d = (_b = this.pointerPage) != null ? _b : (_a2 = this.currentStroke) == null ? void 0 : _a2.page) != null ? _d : (_c = this.currentShape) == null ? void 0 : _c.page) != null ? _f : (_e = this.currentLasso) == null ? void 0 : _e.page) != null ? _g : this.currentPage;
    if (this.currentStroke && this.annotationDocument && this.currentStroke.points.length > 0) {
      const committedStroke = this.currentStroke;
      const pointCount = this.currentStroke.points.length;
      this.pushStrokeAddHistory(this.currentStroke);
      this.annotationDocument.strokes.push(this.currentStroke);
      const strokeCount = this.annotationDocument.strokes.length;
      const pageNumber2 = committedStroke.page;
      this.promoteCurrentTransientPreview(pageNumber2);
      this.currentStroke = null;
      this.currentShape = null;
      this.currentLasso = null;
      this.dragAnchor = null;
      this.activeResizeHandle = null;
      this.erasingSession = false;
      this.lastEraserPoint = null;
      this.eraserSessionPoints = [];
      this.pointerPage = null;
      this.dragMoved = false;
      this.unbindPdfPointerDocumentTracking();
      this.invalidateAnnotationPageCache();
      this.documentRevision += 1;
      this.isDirty = true;
      this.scheduleSave();
      this.retainCommittedPagePixels(pageNumber2);
      this.showDrawingNotice(`Stroke recorded (${pointCount} points, ${strokeCount} total)`, 1400);
      this.refreshStatus(`${message} (${pointCount} points, ${strokeCount} strokes)`);
      return;
    }
    if (this.currentShape && this.annotationDocument) {
      this.annotationDocument.shapes.push(this.currentShape);
      this.currentStroke = null;
      this.currentShape = null;
      this.currentLasso = null;
      this.dragAnchor = null;
      this.activeResizeHandle = null;
      this.erasingSession = false;
      this.lastEraserPoint = null;
      this.eraserSessionPoints = [];
      this.pointerPage = null;
      this.dragMoved = false;
      this.unbindPdfPointerDocumentTracking();
      this.markDirtyAndRedraw(message);
      return;
    }
    this.currentStroke = null;
    this.currentShape = null;
    this.currentLasso = null;
    this.dragAnchor = null;
    this.activeResizeHandle = null;
    this.erasingSession = false;
    this.lastEraserPoint = null;
    this.eraserSessionPoints = [];
    this.pointerPage = null;
    this.dragMoved = false;
    this.unbindPdfPointerDocumentTracking();
    if (pageNumber) {
      this.drawPageAnnotations(pageNumber);
    }
  }
  commitActiveInkBeforeLayoutRefresh() {
    if (!this.annotationDocument) {
      return;
    }
    this.freezeCurrentStrokeAtRenderedFrame();
    if (this.currentStroke && this.currentStroke.points.length > 0) {
      const committedStroke = this.currentStroke;
      const pointCount = this.currentStroke.points.length;
      this.pushStrokeAddHistory(this.currentStroke);
      this.annotationDocument.strokes.push(this.currentStroke);
      const strokeCount = this.annotationDocument.strokes.length;
      const pageNumber = committedStroke.page;
      this.promoteCurrentTransientPreview(pageNumber);
      this.currentStroke = null;
      this.currentShape = null;
      this.currentLasso = null;
      this.dragAnchor = null;
      this.activeResizeHandle = null;
      this.erasingSession = false;
      this.lastEraserPoint = null;
      this.eraserSessionPoints = [];
      this.pointerPage = null;
      this.dragMoved = false;
      this.unbindPdfPointerDocumentTracking();
      this.invalidateAnnotationPageCache();
      this.documentRevision += 1;
      this.isDirty = true;
      this.scheduleSave();
      this.retainCommittedPagePixels(pageNumber);
      this.showDrawingNotice(`Stroke recorded before layout refresh (${pointCount} points, ${strokeCount} total)`, 1600);
      this.refreshStatus(`Stroke recorded before layout refresh (${pointCount} points, ${strokeCount} strokes)`, 1200);
      return;
    }
    if (this.currentShape) {
      this.annotationDocument.shapes.push(this.currentShape);
      const pageNumber = this.currentShape.page;
      this.currentStroke = null;
      this.currentShape = null;
      this.currentLasso = null;
      this.dragAnchor = null;
      this.activeResizeHandle = null;
      this.erasingSession = false;
      this.lastEraserPoint = null;
      this.eraserSessionPoints = [];
      this.pointerPage = null;
      this.dragMoved = false;
      this.unbindPdfPointerDocumentTracking();
      this.invalidateAnnotationPageCache();
      this.documentRevision += 1;
      this.isDirty = true;
      this.scheduleSave();
      this.drawPageAnnotations(pageNumber);
    }
  }
  bindPdfPointerDocumentTracking(pointerId, canvas, pointerRect, forceWebKitStylus = false) {
    this.unbindPdfPointerDocumentTracking();
    this.activePdfPointerId = pointerId;
    this.activePdfPointerCanvas = canvas;
    this.activePdfPointerRect = pointerRect;
    this.webKitStylusPointerId = forceWebKitStylus ? pointerId : null;
    this.ownerDocument.addEventListener("pointermove", this.handleDocumentPointerMove, true);
    this.ownerDocument.addEventListener("pointerup", this.handleDocumentPointerUp, true);
    this.ownerDocument.addEventListener("pointercancel", this.handleDocumentPointerCancel, true);
  }
  unbindPdfPointerDocumentTracking() {
    this.ownerDocument.removeEventListener("pointermove", this.handleDocumentPointerMove, true);
    this.ownerDocument.removeEventListener("pointerup", this.handleDocumentPointerUp, true);
    this.ownerDocument.removeEventListener("pointercancel", this.handleDocumentPointerCancel, true);
    this.activePdfPointerId = null;
    this.activePdfPointerCanvas = null;
    this.activePdfPointerRect = null;
    this.webKitStylusPointerId = null;
  }
  shouldHandleDocumentPointer(event) {
    return this.activePdfPointerId === event.pointerId && this.activePdfPointerCanvas !== null;
  }
  handlePointerMoveForCanvas(event, canvas) {
    var _a2;
    if (this.currentTool === "eraser") {
      this.updateToolPreview(event.clientX, event.clientY, this.erasingSession);
    }
    const pageNumber = Number(canvas.dataset.pageNumber);
    if (this.pointerPage === null) {
      return;
    }
    if (pageNumber !== this.pointerPage) {
      return;
    }
    const surface = this.pageSurfaces.get(pageNumber);
    if (!surface) {
      return;
    }
    event.preventDefault();
    if (isInkDrawingTool(this.currentTool)) {
      this.lastInkInputTimestamp = performance.now();
    }
    const points = this.getNormalizedPoints(surface, event);
    if (points.length === 0) {
      return;
    }
    const point = points[points.length - 1];
    if ((this.currentTool === "select" || this.currentTool === "text") && this.selectedTarget && this.dragAnchor && !this.currentLasso) {
      const deltaX = point.x - this.dragAnchor.x;
      const deltaY = point.y - this.dragAnchor.y;
      if (Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0) {
        this.dragMoved = true;
        if (this.activeResizeHandle && this.selectedTargets.length > 0) {
          this.resizeSelectedTargets(this.selectedTargets, this.activeResizeHandle, deltaX, deltaY);
        } else {
          this.moveSelectedTargetsWithinPage(this.selectedTargets, deltaX, deltaY);
        }
        this.dragAnchor = point;
        this.scheduleInteractionRedraw(pageNumber);
      }
      return;
    }
    if (this.currentTool === "select" && this.currentLasso && this.pointerPage === pageNumber) {
      if (this.toolState.selectionMode === "box" && this.dragAnchor) {
        this.currentLasso.points = getSelectionBoxPoints(this.dragAnchor, point);
        this.dragMoved = this.dragMoved || distanceBetween2(this.dragAnchor, point) >= 3e-3;
        this.scheduleInteractionRedraw(pageNumber);
        return;
      }
      const previousPoint = this.currentLasso.points[this.currentLasso.points.length - 1];
      if (!previousPoint || distanceBetween2(previousPoint, point) >= 3e-3) {
        this.currentLasso.points.push(point);
        this.scheduleInteractionRedraw(pageNumber);
      }
      return;
    }
    if (this.currentTool === "region" && this.currentLasso && this.dragAnchor && this.pointerPage === pageNumber) {
      this.currentLasso.points = getSelectionBoxPoints(this.dragAnchor, point);
      this.dragMoved = this.dragMoved || distanceBetween2(this.dragAnchor, point) >= 3e-3;
      this.scheduleInteractionRedraw(pageNumber);
      return;
    }
    if (this.currentTool === "text" && this.currentLasso && this.dragAnchor && this.pointerPage === pageNumber) {
      this.currentLasso.points = getSelectionBoxPoints(this.dragAnchor, point);
      this.dragMoved = this.dragMoved || distanceBetween2(this.dragAnchor, point) >= 3e-3;
      this.scheduleInteractionRedraw(pageNumber);
      return;
    }
    if (this.currentTool === "eraser" && this.erasingSession) {
      for (const sample of points) {
        if (this.eraserMode === "object") {
          this.previewObjectErase(pageNumber, (_a2 = this.lastEraserPoint) != null ? _a2 : sample, sample);
        } else if (this.lastEraserPoint) {
          this.eraseCommittedLayerAlongPath(surface, this.lastEraserPoint, sample);
        } else {
          this.eraseCommittedLayerAtPoint(surface, sample);
        }
        this.appendEraserSessionPoint(pageNumber, sample);
        this.lastEraserPoint = sample;
      }
      this.renderTelemetry.recordPointerSamples(event, points.length, this.eraserSessionPoints.length);
      return;
    }
    if (!this.currentStroke && !this.currentShape) {
      return;
    }
    if (this.currentShape) {
      this.currentShape.end = point;
      this.scheduleInteractionRedraw(pageNumber);
      return;
    }
    if (this.currentStroke && appendStrokePoints(this.currentStroke, points, { mergeThreshold: this.getStrokeMergeThreshold(surface) })) {
      this.renderTelemetry.recordPointerSamples(event, points.length, this.currentStroke.points.length);
      this.scheduleInteractionRedraw(pageNumber);
    }
  }
  handlePointerUpForCanvas(event, canvas) {
    var _a2, _b, _c, _d, _e;
    const isInkInput = isInkDrawingTool(this.currentTool);
    if (isInkInput) {
      this.lastInkInputTimestamp = performance.now();
      this.renderTelemetry.recordPointerUp(event);
    }
    const pageNumber = canvas ? Number(canvas.dataset.pageNumber) : this.pointerPage;
    if (canvas) {
      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch (e2) {
      }
      canvas.setCssStyles({ touchAction: this.getOverlayTouchAction() });
    }
    this.unbindPdfPointerDocumentTracking();
    if (isInkInput) {
      this.resumeCommittedRenderingAfterInkInput();
    }
    const hasActiveInteraction = this.currentTool === "select" && this.dragAnchor !== null || this.currentTool === "select" && this.currentLasso !== null || this.currentTool === "text" && this.dragAnchor !== null && this.selectedTarget !== null || this.currentTool === "region" && this.currentLasso !== null || this.currentTool === "text" && this.currentLasso !== null || this.currentTool === "eraser" && this.erasingSession || this.currentStroke !== null || this.currentShape !== null;
    if (!hasActiveInteraction || this.pointerPage === null || pageNumber !== this.pointerPage || !this.annotationDocument) {
      this.currentStroke = null;
      this.currentShape = null;
      this.dragAnchor = null;
      this.erasingSession = false;
      this.lastEraserPoint = null;
      this.eraserSessionPoints = [];
      this.pointerPage = null;
      return;
    }
    if (this.currentTool === "eraser" && this.erasingSession && canvas) {
      const surface = this.pageSurfaces.get(pageNumber);
      if (surface) {
        const points = this.getNormalizedPoints(surface, event);
        const point = (_a2 = points[points.length - 1]) != null ? _a2 : this.getNormalizedPoint(surface, event);
        for (const sample of points) {
          if (this.eraserMode === "object") {
            this.previewObjectErase(pageNumber, (_b = this.lastEraserPoint) != null ? _b : sample, sample);
          } else if (this.lastEraserPoint) {
            this.eraseCommittedLayerAlongPath(surface, this.lastEraserPoint, sample);
          } else {
            this.eraseCommittedLayerAtPoint(surface, sample);
          }
          this.appendEraserSessionPoint(pageNumber, sample);
          this.lastEraserPoint = sample;
        }
        if (this.eraserMode === "object") {
          this.previewObjectErase(pageNumber, (_c = this.lastEraserPoint) != null ? _c : point, point);
        } else if (this.lastEraserPoint) {
          this.eraseCommittedLayerAlongPath(surface, this.lastEraserPoint, point);
        } else {
          this.eraseCommittedLayerAtPoint(surface, point);
        }
        this.appendEraserSessionPoint(pageNumber, point);
        this.lastEraserPoint = point;
      }
    }
    if (this.currentStroke && canvas && (event.pointerType === "touch" || event.pointerType === "pen")) {
      const surface = this.pageSurfaces.get(pageNumber);
      if (surface) {
        const releasePoint = this.getNormalizedPoint(surface, event);
        const previousPoint = this.currentStroke.points[this.currentStroke.points.length - 1];
        if (previousPoint && event.pressure === 0) {
          releasePoint.pressure = previousPoint.pressure;
        }
        if (!previousPoint || distanceBetween2(previousPoint, releasePoint) >= this.getStrokeMergeThreshold(surface)) {
          appendStrokePoints(this.currentStroke, [releasePoint], { mergeThreshold: this.getStrokeMergeThreshold(surface) });
        }
        if (this.currentStroke.points.length <= 3 && this.currentStrokeRenderedPointCount < this.currentStroke.points.length) {
          this.drawTransientPageAnnotations(pageNumber);
        }
      }
    }
    if (this.currentStroke || this.currentShape || this.erasingSession) {
      this.cancelPendingInteractionRedraw();
    } else {
      this.flushInteractionRedraw(pageNumber);
    }
    if (this.currentTool === "region") {
      const lasso = this.currentLasso;
      this.currentLasso = null;
      this.pointerPage = null;
      this.activeResizeHandle = null;
      this.dragAnchor = null;
      const regionRect = lasso ? normalizeRect(getPolygonBounds(lasso.points)) : null;
      this.lastSelectionRegion = regionRect ? { page: pageNumber, rect: regionRect } : null;
      this.drawAllAnnotations();
      if (this.lastSelectionRegion && this.plugin.shouldAutoCopyRegionEmbed()) {
        this.refreshStatus("Region captured. Copying embed...");
        void this.copySelectionAnnotatedEmbedBlock();
      } else {
        this.refreshStatus(this.lastSelectionRegion ? "Region captured. Use Copy embed." : "Region too small");
      }
      this.refreshToolbar();
      this.refreshToolPreviewFromLastPointer(false);
      return;
    }
    if (this.currentTool === "text") {
      if (this.selectedTarget && this.dragAnchor && !this.currentLasso) {
        this.dragAnchor = null;
        this.pointerPage = null;
        this.activeResizeHandle = null;
        if (canvas) {
          canvas.setCssStyles({ cursor: "text" });
        }
        if (this.dragMoved) {
          this.markDirtyAndRedraw("Text box updated");
        } else {
          if (this.undoStack.length > 0) {
            this.undoStack.pop();
          }
          this.drawAllAnnotations();
        }
        this.dragMoved = false;
        this.refreshToolPreviewFromLastPointer(false);
        return;
      }
      const lasso = this.currentLasso;
      const start = this.dragAnchor;
      this.currentLasso = null;
      this.pointerPage = null;
      this.activeResizeHandle = null;
      this.dragAnchor = null;
      this.drawAllAnnotations();
      const surface = this.pageSurfaces.get(pageNumber);
      if (!surface || !start) {
        return;
      }
      const rect = lasso ? normalizeRect(getPolygonBounds(lasso.points)) : null;
      const boxWidthScale = rect && this.dragMoved ? clamp2(rect.right - rect.left, 0.04, 0.9) : void 0;
      const boxHeightScale = rect && this.dragMoved ? clamp2(rect.bottom - rect.top, 0.026, 0.9) : void 0;
      const point = rect && this.dragMoved ? { x: rect.left, y: rect.top, pressure: 0.5 } : start;
      void this.insertSessionTextAtPoint(pageNumber, point, boxWidthScale, boxHeightScale);
      this.dragMoved = false;
      this.refreshToolPreviewFromLastPointer(false);
      return;
    }
    if (this.currentTool === "select") {
      if (this.currentLasso) {
        const lasso = this.currentLasso;
        const boxClickPoint = this.toolState.selectionMode === "box" && !this.dragMoved ? (_d = this.dragAnchor) != null ? _d : lasso.points[0] : null;
        this.currentLasso = null;
        this.pointerPage = null;
        this.activeResizeHandle = null;
        this.lastSelectionRegion = null;
        const clickHit = boxClickPoint ? this.findSelectableTarget(pageNumber, boxClickPoint) : null;
        const hits = clickHit ? [clickHit] : this.findTargetsInLasso(lasso);
        if ((event.shiftKey || event.ctrlKey || event.metaKey) && hits.length > 0) {
          const existingKeys = new Set(this.selectedTargets.map((target) => `${target.kind}:${target.page}:${target.id}`));
          this.selectedTargets = [
            ...this.selectedTargets,
            ...hits.filter((target) => !existingKeys.has(`${target.kind}:${target.page}:${target.id}`))
          ];
        } else {
          this.selectedTargets = hits;
        }
        this.selectedTarget = (_e = this.selectedTargets[0]) != null ? _e : null;
        this.dragAnchor = null;
        this.dragMoved = false;
        this.drawAllAnnotations();
        const selectionVerb = this.toolState.selectionMode === "box" ? "Box selected" : "Lasso selected";
        const emptyMessage = this.toolState.selectionMode === "box" ? "Box found nothing" : "Lasso found nothing";
        this.refreshStatus(this.selectedTargets.length > 0 ? `${selectionVerb} ${this.selectedTargets.length} objects` : emptyMessage);
        this.refreshToolbar();
        this.refreshToolPreviewFromLastPointer(false);
        return;
      }
      this.dragAnchor = null;
      this.pointerPage = null;
      this.activeResizeHandle = null;
      this.updateOverlayCursorForPointer(event);
      if (this.dragMoved) {
        this.markDirtyAndRedraw("Selection updated");
      } else {
        if (this.undoStack.length > 0) {
          this.undoStack.pop();
        }
        this.refreshStatus("Selection ready");
        this.drawAllAnnotations();
      }
      this.dragMoved = false;
      this.refreshToolPreviewFromLastPointer(false);
      return;
    }
    if (this.currentTool === "eraser") {
      const segmentErase = this.eraserMode === "segment";
      const changed = this.applyEraserSession(pageNumber);
      this.erasingSession = false;
      this.lastEraserPoint = null;
      this.pointerPage = null;
      this.eraserSessionPoints = [];
      this.objectErasePreviewTargets.clear();
      if (segmentErase) {
        this.retainTouchErasePixels(pageNumber);
        if (changed) {
          this.schedulePageRedraw(pageNumber);
        }
      }
      if (changed) {
        if (!segmentErase) {
          this.retainCommittedPagePixels(pageNumber);
        }
        this.refreshStatus(`Erased (${this.eraserMode})`);
      } else {
        if (this.undoStack.length > 0) {
          this.undoStack.pop();
        }
        this.refreshStatus("Eraser ready");
      }
      this.refreshToolPreviewFromLastPointer(false);
      return;
    }
    this.freezeCurrentStrokeAtRenderedFrame();
    const committedPreviewStroke = this.currentStroke;
    const committedPreviewShape = this.currentShape;
    if (this.currentShape) {
      this.annotationDocument.shapes.push(this.currentShape);
    } else if (this.currentStroke && this.currentStroke.points.length > 0) {
      const pointCount = this.currentStroke.points.length;
      this.refreshStatus(`Saving stroke: ${pointCount} points`, 3e3);
      this.pushStrokeAddHistory(this.currentStroke);
      this.annotationDocument.strokes.push(this.currentStroke);
      this.renderTelemetry.recordStrokeCommit(pointCount, this.annotationDocument.strokes.length);
      this.showDrawingNotice(`Stroke recorded (${pointCount} points, ${this.annotationDocument.strokes.length} total)`, 1400);
      this.refreshStatus(`Stroke recorded (${pointCount} points, ${this.annotationDocument.strokes.length} strokes)`, 900);
    }
    this.invalidateAnnotationPageCache();
    this.documentRevision += 1;
    this.isDirty = true;
    this.scheduleSave();
    if (committedPreviewStroke || committedPreviewShape) {
      this.promoteCurrentTransientPreview(pageNumber);
    }
    this.currentStroke = null;
    this.currentStrokeRenderedPointCount = 0;
    this.currentShape = null;
    this.pointerPage = null;
    this.refreshToolPreviewFromLastPointer(false);
    if (committedPreviewStroke) {
      this.retainCommittedPagePixels(pageNumber);
    } else {
      this.deferCommittedPageRedraw(pageNumber);
    }
    this.refreshStatus(isShapeTool(this.currentTool) ? "Shape saved" : "Stroke saved");
  }
  handlePointerCancelForCanvas(event, canvas) {
    const isInkInput = isInkDrawingTool(this.currentTool);
    if (canvas) {
      try {
        canvas.releasePointerCapture(event.pointerId);
      } catch (e2) {
      }
      canvas.setCssStyles({ touchAction: this.getOverlayTouchAction() });
    }
    this.unbindPdfPointerDocumentTracking();
    this.renderTelemetry.recordInputCancelled();
    this.cancelActiveSessionInteraction();
    if (this.currentTool === "select") {
      const surface = this.getSurfaceAtClientPoint(event.clientX, event.clientY);
      if (surface) {
        this.updateOverlayCursorForPointer(event);
      } else if (canvas) {
        const pageNumber = Number(canvas.dataset.pageNumber);
        const canvasSurface = Number.isFinite(pageNumber) ? this.pageSurfaces.get(pageNumber) : null;
        if (canvasSurface) {
          this.setOverlayCursor(canvasSurface, this.getDefaultOverlayCursor());
        }
      }
    }
    if (isInkInput) {
      this.resumeCommittedRenderingAfterInkInput();
    }
  }
  getNormalizedPoint(surface, event) {
    const rect = surface.overlayEl.getBoundingClientRect();
    return this.getNormalizedPointFromRect(rect, event);
  }
  getNormalizedPointFromRect(rect, event) {
    var _a2, _b, _c;
    const width = rect.width || 1;
    const height = rect.height || 1;
    const pressure = resolvePointerPressure(
      event,
      this.lastPdfPoint,
      this.lastPdfPointTime,
      (_c = (_b = (_a2 = this.currentStroke) == null ? void 0 : _a2.inkSettings) == null ? void 0 : _b.pressureMode) != null ? _c : this.plugin.getInkRenderSettings().pressureMode,
      this.webKitStylusPointerId === event.pointerId
    );
    const point = {
      x: clamp2((event.clientX - rect.left) / width, 0, 1),
      y: clamp2((event.clientY - rect.top) / height, 0, 1),
      pressure,
      t: event.timeStamp || performance.now()
    };
    this.lastPdfPoint = { clientX: event.clientX, clientY: event.clientY };
    this.lastPdfPointTime = event.timeStamp;
    return point;
  }
  getNormalizedPoints(surface, event) {
    const rect = this.activePdfPointerCanvas === surface.overlayEl && this.activePdfPointerRect ? this.activePdfPointerRect : surface.overlayEl.getBoundingClientRect();
    return getCoalescedPointerEvents(event).map((sample) => this.getNormalizedPointFromRect(rect, sample));
  }
  getStrokeMergeThreshold(surface) {
    return 1 / Math.max(surface.lastWidth || surface.overlayEl.getBoundingClientRect().width || 1, 1);
  }
  freezeCurrentStrokeAtRenderedFrame() {
  }
  appendEraserSessionPoint(pageNumber, point) {
    const lastPoint = this.eraserSessionPoints[this.eraserSessionPoints.length - 1];
    if (!lastPoint) {
      this.eraserSessionPoints.push(point);
      return;
    }
    const minDistance = Math.max(this.getEraserThreshold(pageNumber) * 0.25, 8e-4);
    if (distanceBetween2(lastPoint, point) >= minDistance) {
      this.eraserSessionPoints.push(point);
    } else {
      this.eraserSessionPoints[this.eraserSessionPoints.length - 1] = point;
    }
  }
  getEraserSessionSegments(points) {
    if (points.length === 0) {
      return [];
    }
    if (points.length === 1) {
      return [{ start: points[0], end: points[0] }];
    }
    const segments = [];
    for (let index = 1; index < points.length; index += 1) {
      segments.push({ start: points[index - 1], end: points[index] });
    }
    return segments;
  }
  applyEraserSession(pageNumber) {
    if (!this.annotationDocument || this.eraserSessionPoints.length === 0) {
      return false;
    }
    const threshold = this.getEraserThreshold(pageNumber);
    const points = [...this.eraserSessionPoints];
    const changed = this.eraserMode === "object" ? this.applyObjectEraserSession(pageNumber, points, threshold) : this.applySegmentEraserSession(pageNumber, points, threshold);
    if (changed) {
      this.invalidateAnnotationPageCache();
      this.documentRevision += 1;
      this.isDirty = true;
      this.scheduleSave();
    }
    return changed;
  }
  applyObjectEraserSession(pageNumber, points, threshold) {
    const targets = /* @__PURE__ */ new Map();
    const addTargets = (nextTargets) => {
      for (const target of nextTargets) {
        targets.set(this.getObjectEraseTargetKey(target), target);
      }
    };
    addTargets(Array.from(this.objectErasePreviewTargets.values()));
    for (const segment of this.getEraserSessionSegments(points)) {
      addTargets(this.findObjectEraseTargetsAlongPath(pageNumber, segment.start, segment.end, threshold));
    }
    const eraseTargets = Array.from(targets.values());
    const targetsMissingFromPreview = eraseTargets.filter((target) => {
      const key = this.getObjectEraseTargetKey(target);
      if (this.objectErasePreviewTargets.has(key)) {
        return false;
      }
      this.objectErasePreviewTargets.set(key, target);
      return true;
    });
    this.redrawObjectErasePreview(pageNumber, targetsMissingFromPreview);
    return this.removeEraseTargets(eraseTargets);
  }
  previewObjectErase(pageNumber, start, end) {
    const threshold = this.getEraserThreshold(pageNumber);
    const addedTargets = [];
    const addTargets = (targets) => {
      for (const target of targets) {
        const key = this.getObjectEraseTargetKey(target);
        if (!this.objectErasePreviewTargets.has(key)) {
          this.objectErasePreviewTargets.set(key, target);
          addedTargets.push(target);
        }
      }
    };
    addTargets(this.findObjectEraseTargetsAlongPath(pageNumber, start, end, threshold));
    this.redrawObjectErasePreview(pageNumber, addedTargets);
  }
  applySegmentEraserSession(pageNumber, points, threshold) {
    if (!this.annotationDocument) {
      return false;
    }
    return eraseStrokeSegmentsAlongPath(
      this.annotationDocument,
      pageNumber,
      points,
      threshold,
      () => generateId("stroke")
    );
  }
  removeEraseTargets(targets) {
    var _a2, _b, _c, _d;
    if (!this.annotationDocument || targets.length === 0) {
      return false;
    }
    const textIds = new Set(targets.filter((target) => target.kind === "text").map((target) => target.id));
    const strokeIds = new Set(targets.filter((target) => target.kind === "stroke").map((target) => target.id));
    const shapeIds = new Set(targets.filter((target) => target.kind === "shape").map((target) => target.id));
    const imageIds = new Set(targets.filter((target) => target.kind === "image").map((target) => target.id));
    const beforeTextCount = this.annotationDocument.textItems.length;
    const beforeStrokeCount = this.annotationDocument.strokes.length;
    const beforeShapeCount = this.annotationDocument.shapes.length;
    const beforeImageCount = (_b = (_a2 = this.annotationDocument.imageItems) == null ? void 0 : _a2.length) != null ? _b : 0;
    if (textIds.size > 0) {
      this.annotationDocument.textItems = this.annotationDocument.textItems.filter((item) => !textIds.has(item.id));
    }
    if (strokeIds.size > 0) {
      this.annotationDocument.strokes = this.annotationDocument.strokes.filter((stroke) => !strokeIds.has(stroke.id));
    }
    if (shapeIds.size > 0) {
      this.annotationDocument.shapes = this.annotationDocument.shapes.filter((shape) => !shapeIds.has(shape.id));
    }
    if (imageIds.size > 0 && this.annotationDocument.imageItems) {
      this.annotationDocument.imageItems = this.annotationDocument.imageItems.filter((image) => !imageIds.has(image.id));
    }
    return this.annotationDocument.textItems.length !== beforeTextCount || this.annotationDocument.strokes.length !== beforeStrokeCount || this.annotationDocument.shapes.length !== beforeShapeCount || ((_d = (_c = this.annotationDocument.imageItems) == null ? void 0 : _c.length) != null ? _d : 0) !== beforeImageCount;
  }
  getObjectEraseTargetKey(target) {
    return `${target.kind}:${target.page}:${target.id}`;
  }
  redrawObjectErasePreview(pageNumber, changedTargets) {
    var _a2;
    if (!this.annotationDocument || changedTargets.length === 0) {
      return;
    }
    const surface = this.pageSurfaces.get(pageNumber);
    if (!surface) {
      return;
    }
    this.ensureOverlayLayerOrder(surface);
    this.resizeOverlay(surface);
    const renderCanvas = this.getNextPageRenderSlot(surface);
    const context = renderCanvas.getContext("2d");
    if (!context || !surface.overlayEl.getContext("2d")) {
      return;
    }
    const ratio = this.ownerWindow.devicePixelRatio || 1;
    const excludedKeys = new Set(this.objectErasePreviewTargets.keys());
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, renderCanvas.width, renderCanvas.height);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const bucket = this.getPageAnnotationBucket(pageNumber);
    for (const imageItem of bucket.imageItems) {
      if (!excludedKeys.has(this.getObjectEraseTargetKey({ kind: "image", id: imageItem.id, page: pageNumber }))) {
        this.drawImageAnnotation(context, surface, imageItem);
      }
    }
    const renderables = getAnnotationRenderables(bucket.strokes, bucket.textItems, bucket.shapes);
    for (const renderable of renderables) {
      if (excludedKeys.has(this.getObjectEraseTargetKey({
        kind: renderable.kind,
        id: renderable.annotation.id,
        page: pageNumber
      }))) {
        continue;
      }
      if (renderable.kind === "stroke") {
        this.drawStroke(context, surface, renderable.annotation);
      } else if (renderable.kind === "text") {
        this.drawText(context, surface, renderable.annotation);
      } else if (renderable.kind === "shape") {
        this.drawShape(context, surface, renderable.annotation);
      }
    }
    const inlinePreviewText = this.getInlineTextPreviewItem(pageNumber);
    if (inlinePreviewText && !this.inlineTextEditorEl) {
      this.drawText(context, surface, inlinePreviewText);
    }
    const pageSelections = this.selectedTargets.filter((target) => target.page === pageNumber);
    if (pageSelections.length > 0) {
      this.drawSelection(context, surface, pageSelections);
    }
    if (((_a2 = this.lastSelectionRegion) == null ? void 0 : _a2.page) === pageNumber) {
      this.drawFocusedRegion(context, surface, this.lastSelectionRegion.rect);
    }
    if (this.focusedRegion && this.focusedRegionPage === pageNumber) {
      this.drawFocusedRegion(context, surface, this.focusedRegion);
    }
    this.publishRenderedCanvas(renderCanvas, surface.overlayEl);
  }
  findObjectEraseTargetsAlongPath(pageNumber, start, end, threshold) {
    var _a2, _b;
    if (!this.annotationDocument) {
      return [];
    }
    const candidates = [];
    for (let index = this.annotationDocument.textItems.length - 1; index >= 0; index -= 1) {
      const item = this.annotationDocument.textItems[index];
      if (item.page !== pageNumber) {
        continue;
      }
      const bounds = getTextBounds(item);
      if (segmentIntersectsExpandedBounds(start, end, bounds, threshold)) {
        candidates.push({ kind: "text", id: item.id, page: pageNumber, score: distanceToRectEdge(start, bounds) });
      }
    }
    for (let index = ((_a2 = this.annotationDocument.imageItems) != null ? _a2 : []).length - 1; index >= 0; index -= 1) {
      const image = (_b = this.annotationDocument.imageItems) == null ? void 0 : _b[index];
      if (!image || image.page !== pageNumber) {
        continue;
      }
      const bounds = this.getImageBounds(image);
      if (segmentIntersectsExpandedBounds(start, end, bounds, threshold)) {
        candidates.push({ kind: "image", id: image.id, page: pageNumber, score: distanceToRectEdge(start, bounds) });
      }
    }
    for (let index = this.annotationDocument.shapes.length - 1; index >= 0; index -= 1) {
      const shape = this.annotationDocument.shapes[index];
      if (shape.page !== pageNumber) {
        continue;
      }
      let score = Number.POSITIVE_INFINITY;
      if (shape.tool === "line") {
        score = distanceBetweenSegments(start, end, shape.start, shape.end);
      } else {
        const bounds = getShapeBounds(shape);
        if (segmentIntersectsExpandedBounds(start, end, bounds, threshold)) {
          score = Math.min(distanceToShape(start, shape), distanceToShape(end, shape));
        }
      }
      if (score <= threshold * 1.5) {
        candidates.push({ kind: "shape", id: shape.id, page: pageNumber, score });
      }
    }
    for (let index = this.annotationDocument.strokes.length - 1; index >= 0; index -= 1) {
      const stroke = this.annotationDocument.strokes[index];
      if (stroke.page !== pageNumber || stroke.points.length === 0) {
        continue;
      }
      let score = Math.min(distanceToSegment(stroke.points[0], start, end), distanceToStroke(start, stroke), distanceToStroke(end, stroke));
      for (let pointIndex = 1; pointIndex < stroke.points.length; pointIndex += 1) {
        score = Math.min(score, distanceBetweenSegments(start, end, stroke.points[pointIndex - 1], stroke.points[pointIndex]));
        if (score <= threshold) {
          break;
        }
      }
      if (score <= threshold) {
        candidates.push({ kind: "stroke", id: stroke.id, page: pageNumber, score });
      }
    }
    if (candidates.length === 0) {
      return [];
    }
    candidates.sort((left, right) => left.score - right.score);
    return candidates.map((candidate) => ({
      kind: candidate.kind,
      id: candidate.id,
      page: candidate.page
    }));
  }
  drawAllAnnotations() {
    for (const pageNumber of this.pageSurfaces.keys()) {
      this.schedulePageRedraw(pageNumber);
    }
  }
  invalidateAnnotationPageCache() {
    this.publishedFrames = /* @__PURE__ */ new WeakMap();
    this.annotationPageCache = null;
    if (!this.annotationDocument) {
      this.strokePathCache.clear();
    }
  }
  getPageAnnotationBucket(pageNumber) {
    var _a2, _b, _c;
    if (!this.annotationDocument) {
      return { strokes: [], eraserPaths: [], textItems: [], shapes: [], imageItems: [] };
    }
    if (!this.annotationPageCache) {
      const cache = /* @__PURE__ */ new Map();
      const getBucket = (page) => {
        let bucket = cache.get(page);
        if (!bucket) {
          bucket = { strokes: [], eraserPaths: [], textItems: [], shapes: [], imageItems: [] };
          cache.set(page, bucket);
        }
        return bucket;
      };
      for (const stroke of this.annotationDocument.strokes) {
        getBucket(stroke.page).strokes.push(stroke);
      }
      for (const eraserPath of (_a2 = this.annotationDocument.eraserPaths) != null ? _a2 : []) {
        getBucket(eraserPath.page).eraserPaths.push(eraserPath);
      }
      for (const textItem of this.annotationDocument.textItems) {
        getBucket(textItem.page).textItems.push(textItem);
      }
      for (const shape of this.annotationDocument.shapes) {
        getBucket(shape.page).shapes.push(shape);
      }
      for (const image of (_b = this.annotationDocument.imageItems) != null ? _b : []) {
        getBucket(image.page).imageItems.push(image);
      }
      this.annotationPageCache = cache;
    }
    return (_c = this.annotationPageCache.get(pageNumber)) != null ? _c : { strokes: [], eraserPaths: [], textItems: [], shapes: [], imageItems: [] };
  }
  drawSelectionPreview(surface) {
    var _a2;
    const targets = this.selectedTargets.filter((target) => target.page === surface.pageNumber);
    if (!this.dragAnchor || this.currentLasso || targets.length === 0) {
      this.selectionBackground = null;
      return false;
    }
    const ratio = this.ownerWindow.devicePixelRatio || 1;
    const key = [surface.pageNumber, surface.lastWidth, surface.lastHeight, ratio, ...targets.map((target) => target.kind + target.id)].join(":");
    const bucket = this.getPageAnnotationBucket(surface.pageNumber);
    if (((_a2 = this.selectionBackground) == null ? void 0 : _a2.key) !== key) {
      const canvas = this.ownerDocument.createElement("canvas");
      canvas.width = surface.overlayEl.width;
      canvas.height = surface.overlayEl.height;
      const context2 = canvas.getContext("2d");
      if (!context2) {
        return false;
      }
      context2.setTransform(ratio, 0, 0, ratio, 0, 0);
      const selected = new Set(targets.map((target) => target.kind + target.id));
      for (const image of bucket.imageItems) {
        if (!selected.has("image" + image.id)) {
          this.drawImageAnnotation(context2, surface, image);
        }
      }
      for (const item of getAnnotationRenderables(bucket.strokes, bucket.textItems, bucket.shapes)) {
        if (selected.has(item.kind + item.annotation.id)) {
          continue;
        }
        if (item.kind === "stroke") {
          this.drawStroke(context2, surface, item.annotation);
        } else if (item.kind === "text") {
          this.drawText(context2, surface, item.annotation);
        } else {
          this.drawShape(context2, surface, item.annotation);
        }
      }
      this.selectionBackground = { key, canvas };
    }
    this.publishRenderedCanvas(this.selectionBackground.canvas, surface.overlayEl);
    const context = surface.overlayEl.getContext("2d");
    if (!context) {
      return false;
    }
    context.save();
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    for (const target of targets) {
      if (target.kind === "stroke") {
        const item = bucket.strokes.find((item2) => item2.id === target.id);
        if (item) {
          this.drawStroke(context, surface, item);
        }
      } else if (target.kind === "text") {
        const item = bucket.textItems.find((item2) => item2.id === target.id);
        if (item) {
          this.drawText(context, surface, item);
        }
      } else if (target.kind === "shape") {
        const item = bucket.shapes.find((item2) => item2.id === target.id);
        if (item) {
          this.drawShape(context, surface, item);
        }
      } else {
        const item = bucket.imageItems.find((item2) => item2.id === target.id);
        if (item) {
          this.drawImageAnnotation(context, surface, item);
        }
      }
    }
    this.drawSelection(context, surface, targets);
    context.restore();
    return true;
  }
  drawPageAnnotations(pageNumber) {
    var _a2;
    if (this.isFingerPanRenderingPaused()) {
      this.pendingRedrawPages.add(pageNumber);
      return;
    }
    if (!this.annotationDocument) {
      return;
    }
    this.cancelPageRenderJob(pageNumber);
    const surface = this.pageSurfaces.get(pageNumber);
    if (!surface) {
      return;
    }
    if (!surface.overlayEl.isConnected || !surface.hostEl.isConnected) {
      return;
    }
    this.ensureOverlayLayerOrder(surface);
    this.resizeOverlay(surface);
    if (!surface.overlayEl.isConnected) {
      this.scheduleSyncPages();
      return;
    }
    if (this.drawSelectionPreview(surface)) {
      return;
    }
    const context = surface.overlayEl.getContext("2d");
    if (!context) {
      return;
    }
    const ratio = this.ownerWindow.devicePixelRatio || 1;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, surface.lastWidth, surface.lastHeight);
    const bucket = this.getPageAnnotationBucket(pageNumber);
    for (const imageItem of bucket.imageItems) {
      this.drawImageAnnotation(context, surface, imageItem);
    }
    const renderables = getAnnotationRenderables(bucket.strokes, bucket.textItems, bucket.shapes);
    for (const renderable of renderables) {
      if (renderable.kind === "stroke") {
        this.drawStroke(context, surface, renderable.annotation);
      } else if (renderable.kind === "text") {
        if (this.inlineTextTargetId === renderable.annotation.id && this.inlineTextPageNumber === pageNumber) {
          continue;
        }
        this.drawText(context, surface, renderable.annotation);
      } else if (renderable.kind === "shape") {
        this.drawShape(context, surface, renderable.annotation);
      }
    }
    const inlinePreviewText = this.getInlineTextPreviewItem(pageNumber);
    if (inlinePreviewText && !this.inlineTextEditorEl) {
      this.drawText(context, surface, inlinePreviewText);
    }
    const pageSelections = this.selectedTargets.filter((target) => target.page === pageNumber);
    if (pageSelections.length > 0) {
      this.drawSelection(context, surface, pageSelections);
    }
    if (((_a2 = this.lastSelectionRegion) == null ? void 0 : _a2.page) === pageNumber) {
      this.drawFocusedRegion(context, surface, this.lastSelectionRegion.rect);
    }
    if (this.focusedRegion && this.focusedRegionPage === pageNumber) {
      this.drawFocusedRegion(context, surface, this.focusedRegion);
    }
    this.clearTransientLayer(surface);
    this.drawTransientPageAnnotations(pageNumber);
  }
  drawImageAnnotation(context, surface, imageItem) {
    if (!isEmbeddedImageDataUrl(imageItem.dataUrl)) {
      return;
    }
    const x2 = imageItem.x * surface.lastWidth;
    const y2 = imageItem.y * surface.lastHeight;
    const width = Math.max(1, imageItem.widthScale * surface.lastWidth);
    const height = Math.max(1, imageItem.heightScale * surface.lastHeight);
    let image = this.imageElementCache.get(imageItem.id);
    if (!image || image.src !== imageItem.dataUrl) {
      image = new Image();
      image.onload = () => this.schedulePageRedraw(imageItem.page);
      image.src = imageItem.dataUrl;
      this.imageElementCache.set(imageItem.id, image);
    }
    if (!image.complete || image.naturalWidth <= 0) {
      context.save();
      context.strokeStyle = "rgba(120, 120, 120, 0.45)";
      context.setLineDash([6, 4]);
      context.strokeRect(x2, y2, width, height);
      context.restore();
      return;
    }
    context.save();
    context.globalAlpha = 1;
    context.drawImage(image, x2, y2, width, height);
    context.restore();
  }
  promoteCurrentTransientPreview(pageNumber) {
    var _a2;
    const surface = this.pageSurfaces.get(pageNumber);
    if (!surface) {
      return;
    }
    if (((_a2 = this.currentStroke) == null ? void 0 : _a2.page) === pageNumber) {
      this.strokePathCache.delete(this.currentStroke.id);
      this.drawTransientPageAnnotations(pageNumber, true);
    } else {
      this.drawTransientPageAnnotations(pageNumber);
    }
    this.promoteTransientLayer(surface);
  }
  promoteTransientLayer(surface) {
    this.syncCanvasBackingSize(surface.overlayEl, surface.lastWidth, surface.lastHeight, true);
    this.syncCanvasBackingSize(surface.transientEl, surface.lastWidth, surface.lastHeight);
    const context = surface.overlayEl.getContext("2d");
    if (!context) {
      return;
    }
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.drawImage(surface.transientEl, 0, 0);
    context.restore();
    this.clearTransientLayer(surface);
  }
  eraseCommittedLayerAtPoint(surface, point) {
    const radius = this.getToolPreviewRadius();
    const context = surface.overlayEl.getContext("2d");
    if (!context || radius <= 0) {
      return;
    }
    const ratio = this.ownerWindow.devicePixelRatio || 1;
    context.save();
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(point.x * surface.lastWidth, point.y * surface.lastHeight, radius + 1, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
  eraseCommittedLayerAlongPath(surface, start, end) {
    const radius = this.getToolPreviewRadius();
    const context = surface.overlayEl.getContext("2d");
    if (!context || radius <= 0) {
      return;
    }
    const ratio = this.ownerWindow.devicePixelRatio || 1;
    context.save();
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.globalCompositeOperation = "destination-out";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.lineWidth = Math.max(1, radius * 2);
    context.beginPath();
    context.moveTo(start.x * surface.lastWidth, start.y * surface.lastHeight);
    context.lineTo(end.x * surface.lastWidth, end.y * surface.lastHeight);
    context.stroke();
    context.restore();
  }
  clearTransientLayer(surface) {
    this.syncCanvasBackingSize(surface.transientEl, surface.lastWidth, surface.lastHeight);
    const context = surface.transientEl.getContext("2d");
    if (!context) {
      return;
    }
    const ratio = this.ownerWindow.devicePixelRatio || 1;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, surface.lastWidth, surface.lastHeight);
  }
  drawTransientPageAnnotations(pageNumber, commitCurrentStroke = false) {
    var _a2, _b, _c;
    const surface = this.pageSurfaces.get(pageNumber);
    if (!surface) {
      return;
    }
    this.syncCanvasBackingSize(surface.transientEl, surface.lastWidth, surface.lastHeight);
    const context = surface.transientEl.getContext("2d");
    if (!context) {
      return;
    }
    const ratio = this.ownerWindow.devicePixelRatio || 1;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, surface.lastWidth, surface.lastHeight);
    if (((_a2 = this.currentStroke) == null ? void 0 : _a2.page) === pageNumber) {
      const predictionStrength = commitCurrentStroke ? 0 : this.getLivePreviewPredictionStrength();
      const predictTail = predictionStrength > 0;
      this.drawStroke(context, surface, this.currentStroke, predictTail, !commitCurrentStroke, predictionStrength);
      this.currentStrokeRenderedPointCount = this.currentStroke.points.length;
    }
    if (((_b = this.currentShape) == null ? void 0 : _b.page) === pageNumber) {
      this.drawShape(context, surface, this.currentShape);
    }
    if (((_c = this.currentLasso) == null ? void 0 : _c.page) === pageNumber) {
      this.drawLasso(context, surface, this.currentLasso);
    }
  }
  getLivePreviewPredictionStrength() {
    switch (this.plugin.getLivePreviewMode()) {
      case "accurate":
        return 0;
      case "balanced":
        return 0;
      case "smooth":
        return 0.25;
    }
  }
  drawStroke(context, surface, stroke, predictTail = false, livePreview = false, predictionStrength = 1) {
    if (stroke.points.length === 0) {
      return;
    }
    const widthScale = this.resolveStoredScale(stroke.width, stroke.widthScale, MAX_STROKE_WIDTH_SCALE2);
    const baseWidth = Math.max(0.75, widthScale * surface.lastWidth);
    context.save();
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = stroke.color;
    context.fillStyle = stroke.color;
    context.globalAlpha = stroke.tool === "highlighter" ? 0.24 : 0.96;
    context.globalCompositeOperation = "source-over";
    if (stroke.tool === "highlighter") {
      this.drawReliablePdfStroke(context, surface, stroke, baseWidth, false, predictTail, livePreview, predictionStrength);
      context.restore();
      return;
    }
    this.drawReliablePdfStroke(context, surface, stroke, baseWidth, true, predictTail, livePreview, predictionStrength);
    context.restore();
  }
  drawReliablePdfStroke(context, surface, stroke, baseWidth, usePressure, predictTail, livePreview = false, predictionStrength = 1) {
    if (stroke.points.length === 0) {
      return;
    }
    if (!livePreview) {
      const cachedOutline = this.getCachedStrokeOutline(surface, stroke, baseWidth, usePressure, predictTail);
      if (cachedOutline) {
        fillInkStrokeOutline(context, cachedOutline);
        return;
      }
    }
    drawSmoothInkStroke(
      context,
      stroke.points,
      surface.lastWidth,
      surface.lastHeight,
      baseWidth,
      usePressure,
      predictTail,
      {
        renderMode: livePreview ? "live" : "committed",
        inkSettings: stroke.inkSettings,
        predictionStrength,
        startTaper: stroke.cutStart ? 0 : void 0,
        endTaper: stroke.cutEnd ? 0 : void 0,
        startCap: true,
        endCap: true
      }
    );
  }
  getStrokePathSignature(surface, stroke, baseWidth, usePressure) {
    let pointHash = 2166136261;
    for (const point of stroke.points) {
      pointHash ^= Math.round(point.x * 1e5);
      pointHash = Math.imul(pointHash, 16777619);
      pointHash ^= Math.round(point.y * 1e5);
      pointHash = Math.imul(pointHash, 16777619);
      pointHash ^= Math.round(point.pressure * 1e3);
      pointHash = Math.imul(pointHash, 16777619);
    }
    return [
      surface.lastWidth.toFixed(1),
      surface.lastHeight.toFixed(1),
      baseWidth.toFixed(2),
      usePressure ? "p" : "u",
      stroke.cutStart ? "cs" : "ns",
      stroke.cutEnd ? "ce" : "ne",
      stroke.points.length,
      JSON.stringify(stroke.inkSettings),
      pointHash >>> 0
    ].join(":");
  }
  getCachedStrokeOutline(surface, stroke, baseWidth, usePressure, predictTail) {
    if (predictTail || stroke.points.length < 4) {
      return null;
    }
    const signature = this.getStrokePathSignature(surface, stroke, baseWidth, usePressure);
    const key = stroke.id;
    const cached = this.strokePathCache.get(key);
    if ((cached == null ? void 0 : cached.signature) === signature) {
      return cached.outline;
    }
    const outline = getSmoothInkStrokeOutline(
      stroke.points,
      surface.lastWidth,
      surface.lastHeight,
      baseWidth,
      usePressure,
      false,
      {
        renderMode: "committed",
        inkSettings: stroke.inkSettings,
        startTaper: stroke.cutStart ? 0 : void 0,
        endTaper: stroke.cutEnd ? 0 : void 0,
        startCap: true,
        endCap: true
      }
    );
    if (!outline) {
      this.strokePathCache.delete(key);
      return null;
    }
    this.strokePathCache.set(key, { signature, outline });
    return outline;
  }
  drawText(context, surface, textItem) {
    var _a2;
    context.save();
    context.fillStyle = textItem.color;
    const fontSize = getRenderedTextFontSize(this.resolveStoredFontScale(textItem), surface.lastWidth);
    const metrics = getRenderedTextLayoutMetrics(surface.lastWidth);
    const fontFamily = (_a2 = textItem.fontFamily) != null ? _a2 : TEXT_FONT_FAMILIES[0];
    applyCanvasTextStyle(context, textItem, fontSize, fontFamily);
    const boxWidth = textItem.boxWidthScale && textItem.boxWidthScale > 0 ? textItem.boxWidthScale * surface.lastWidth : surface.lastWidth * 0.48;
    const innerWidth = Math.max(metrics.minimumInnerWidth, boxWidth - metrics.paddingX * 2);
    const textLeft = textItem.x * surface.lastWidth + metrics.paddingX;
    const lineSpacing = resolveTextLineSpacing(textItem);
    const lines = getCanvasTextLines(context, textItem.text, innerWidth, resolveTextWordWrap(textItem));
    const fallbackHeight = metrics.paddingY * 2 + getTextBlockHeight(fontSize, lines.length, lineSpacing) + metrics.boxExtraHeight;
    const boxHeight = textItem.boxHeightScale && textItem.boxHeightScale > 0 ? textItem.boxHeightScale * surface.lastHeight : fallbackHeight;
    const textTop = getTextBlockTop(
      textItem.y * surface.lastHeight,
      boxHeight,
      fontSize,
      lines.length,
      resolveTextVerticalAlignment(textItem),
      lineSpacing,
      metrics.paddingY
    );
    const textX = getAlignedTextX(textLeft, innerWidth, resolveTextAlignment(textItem));
    lines.forEach((line, index) => {
      context.fillText(line, textX, textTop + index * fontSize * lineSpacing);
    });
    context.restore();
  }
  getInlineTextPreviewItem(pageNumber) {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (!this.annotationDocument || this.inlineTextPageNumber !== pageNumber || !this.inlineTextEditorEl || !this.inlineTextPoint) {
      return null;
    }
    const value = this.inlineTextEditorEl.value;
    if (!value.trim()) {
      return null;
    }
    const surface = this.pageSurfaces.get(pageNumber);
    const pageWidth = Math.max((_a2 = surface == null ? void 0 : surface.lastWidth) != null ? _a2 : 1, 1);
    const pageHeight = Math.max((_b = surface == null ? void 0 : surface.lastHeight) != null ? _b : 1, 1);
    const frameRect = (_d = (_c = this.inlineTextEditorFrameEl) == null ? void 0 : _c.getBoundingClientRect()) != null ? _d : null;
    const framePoint = (_e = this.getInlineTextFramePoint(pageNumber)) != null ? _e : this.inlineTextPoint;
    const existing = this.inlineTextTargetId ? this.annotationDocument.textItems.find((entry) => entry.id === this.inlineTextTargetId) : null;
    const boxWidthScale = frameRect ? clamp2(frameRect.width / pageWidth, 0.04, 0.9) : existing == null ? void 0 : existing.boxWidthScale;
    const baseBoxHeightScale = frameRect ? clamp2(frameRect.height / pageHeight, 0.025, 0.9) : existing == null ? void 0 : existing.boxHeightScale;
    const preview = {
      id: (_f = existing == null ? void 0 : existing.id) != null ? _f : "inline-text-preview",
      page: pageNumber,
      text: value,
      x: framePoint.x,
      y: framePoint.y,
      color: this.inlineTextEditorEl.dataset.textColor || (existing == null ? void 0 : existing.color) || this.currentTextColor,
      fontSize: this.currentTextFontSize,
      fontFamily: this.currentTextFontFamily,
      fontScale: this.getStableTextFontScale(this.currentTextFontSize),
      fontWeight: this.currentTextFontWeight,
      fontStyle: this.currentTextFontStyle,
      textAlign: this.currentTextAlignment,
      verticalAlign: this.currentTextVerticalAlignment,
      lineSpacing: this.currentTextLineSpacing,
      wordWrap: this.currentTextWordWrap,
      autoFit: this.inlineTextAutoFit,
      boxWidthScale,
      boxHeightScale: baseBoxHeightScale,
      zIndex: (_g = existing == null ? void 0 : existing.zIndex) != null ? _g : this.getNextPageZIndex(pageNumber),
      createdAt: (_h = existing == null ? void 0 : existing.createdAt) != null ? _h : (/* @__PURE__ */ new Date()).toISOString()
    };
    const measuredHeightScale = surface ? this.measureTextBoxHeightScale(surface, preview) : null;
    if (measuredHeightScale && this.inlineTextAutoFit) {
      preview.boxHeightScale = measuredHeightScale;
    }
    return preview;
  }
  measureAutoFitTextAnnotation(surface, textItem) {
    var _a2;
    const context = surface.overlayEl.getContext("2d");
    if (!context) {
      return null;
    }
    const fontSize = getRenderedTextFontSize(this.resolveStoredFontScale(textItem), surface.lastWidth);
    const metrics = getRenderedTextLayoutMetrics(surface.lastWidth);
    const fontFamily = (_a2 = textItem.fontFamily) != null ? _a2 : TEXT_FONT_FAMILIES[0];
    const left = textItem.x * surface.lastWidth;
    const preferredWidth = textItem.autoFit === true ? Math.min(320, Math.max(220, surface.lastWidth * 0.44)) : textItem.boxWidthScale && textItem.boxWidthScale > 0 ? textItem.boxWidthScale * surface.lastWidth : Math.min(320, Math.max(220, surface.lastWidth * 0.44));
    const maxWidth = Math.max(
      44,
      Math.min(
        surface.lastWidth - left - 12,
        resolveTextWordWrap(textItem) ? preferredWidth : surface.lastWidth * 0.78,
        surface.lastWidth * 0.78,
        560
      )
    );
    context.save();
    applyCanvasTextStyle(context, textItem, fontSize, fontFamily);
    const size = measureAutoFitTextBox(
      context,
      textItem.text,
      fontSize,
      maxWidth,
      resolveTextLineSpacing(textItem),
      resolveTextWordWrap(textItem),
      metrics
    );
    context.restore();
    return size;
  }
  updateAutoFitTextAnnotation(textItem, pageNumber) {
    if (textItem.autoFit !== true) {
      return;
    }
    const surface = this.pageSurfaces.get(pageNumber);
    const size = surface ? this.measureAutoFitTextAnnotation(surface, textItem) : null;
    if (!surface || !size) {
      return;
    }
    textItem.boxWidthScale = clamp2(size.width / Math.max(surface.lastWidth, 1), 0.04, 0.9);
    textItem.boxHeightScale = clamp2(size.height / Math.max(surface.lastHeight, 1), 0.025, 0.9);
  }
  measureTextBoxHeightScale(surface, textItem) {
    var _a2;
    const context = surface.overlayEl.getContext("2d");
    if (!context) {
      return null;
    }
    const fontSize = getRenderedTextFontSize(this.resolveStoredFontScale(textItem), surface.lastWidth);
    const metrics = getRenderedTextLayoutMetrics(surface.lastWidth);
    const fontFamily = (_a2 = textItem.fontFamily) != null ? _a2 : TEXT_FONT_FAMILIES[0];
    const boxWidth = textItem.boxWidthScale && textItem.boxWidthScale > 0 ? textItem.boxWidthScale * surface.lastWidth : surface.lastWidth * 0.48;
    context.save();
    applyCanvasTextStyle(context, textItem, fontSize, fontFamily);
    const lineCount = Math.max(
      1,
      getCanvasTextLines(
        context,
        textItem.text || " ",
        Math.max(metrics.minimumInnerWidth, boxWidth - metrics.paddingX * 2),
        resolveTextWordWrap(textItem)
      ).length
    );
    context.restore();
    const measuredHeight = metrics.paddingY * 2 + getTextBlockHeight(fontSize, lineCount, resolveTextLineSpacing(textItem)) + metrics.boxExtraHeight;
    return clamp2(measuredHeight / Math.max(surface.lastHeight, 1), 0.025, 0.9);
  }
  updateInlineTextEditorBoxFromContent(pageNumber) {
    const preview = this.getInlineTextPreviewItem(pageNumber);
    const surface = this.pageSurfaces.get(pageNumber);
    if (!surface || !this.inlineTextEditorFrameEl || !this.inlineTextEditorEl) {
      return;
    }
    if (preview && this.inlineTextAutoFit) {
      const size = this.measureAutoFitTextAnnotation(surface, preview);
      if (size) {
        this.inlineTextEditorFrameEl.setCssStyles({
          width: `${size.width}px`,
          height: `${size.height}px`
        });
        this.inlineTextEditorEl.setCssStyles({ height: "100%" });
      }
    } else if (preview == null ? void 0 : preview.boxHeightScale) {
      const currentHeight = preview.boxHeightScale * surface.lastHeight;
      const requiredHeightScale = this.measureTextBoxHeightScale(surface, preview);
      const requiredHeight = requiredHeightScale ? requiredHeightScale * surface.lastHeight : currentHeight;
      const frameTop = Number(this.inlineTextEditorFrameEl.dataset.top) || 0;
      const availableHeight = Math.max(36, surface.lastHeight - frameTop - 8);
      const nextHeight = Math.min(Math.max(currentHeight, requiredHeight), availableHeight);
      this.inlineTextEditorFrameEl.setCssStyles({ height: `${nextHeight}px` });
      this.inlineTextEditorEl.setCssStyles({ height: "100%" });
    }
    this.updateInlineTextVerticalAlignment(pageNumber);
  }
  updateInlineTextVerticalAlignment(pageNumber) {
    const surface = this.pageSurfaces.get(pageNumber);
    const frame = this.inlineTextEditorFrameEl;
    const editor = this.inlineTextEditorEl;
    const mirror = this.inlineTextCaretMirrorEl;
    if (!surface || !frame || !editor || !mirror) {
      return;
    }
    const context = surface.overlayEl.getContext("2d");
    if (!context) {
      return;
    }
    const pageWidth = surface.pendingWidth || surface.lastWidth;
    const metrics = getRenderedTextLayoutMetrics(pageWidth);
    const fontSize = Number.parseFloat(editor.style.fontSize) || 10;
    const frameRect = frame.getBoundingClientRect();
    const preview = this.getInlineTextPreviewItem(pageNumber);
    const textStyle = preview != null ? preview : {
      fontWeight: this.currentTextFontWeight,
      fontStyle: this.currentTextFontStyle,
      textAlign: this.currentTextAlignment
    };
    context.save();
    applyCanvasTextStyle(context, textStyle, fontSize, this.currentTextFontFamily);
    const lineCount = Math.max(
      1,
      getCanvasTextLines(
        context,
        editor.value || " ",
        Math.max(metrics.minimumInnerWidth, frameRect.width - metrics.paddingX * 2),
        this.currentTextWordWrap
      ).length
    );
    context.restore();
    const lineBoxHeight = getTextBlockHeight(fontSize, lineCount, this.currentTextLineSpacing);
    const textTop = getTextBlockTop(
      0,
      frameRect.height,
      fontSize,
      lineCount,
      this.currentTextVerticalAlignment,
      this.currentTextLineSpacing,
      metrics.paddingY
    );
    const verticalPaddingBottom = Math.max(0, frameRect.height - textTop - lineBoxHeight);
    editor.setCssStyles({
      paddingTop: `${textTop}px`,
      paddingBottom: `${verticalPaddingBottom}px`
    });
    mirror.setCssStyles({
      paddingTop: `${textTop}px`,
      paddingBottom: `${verticalPaddingBottom}px`
    });
  }
  drawShape(context, surface, shape) {
    const startX = shape.start.x * surface.lastWidth;
    const startY = shape.start.y * surface.lastHeight;
    const endX = shape.end.x * surface.lastWidth;
    const endY = shape.end.y * surface.lastHeight;
    const width = endX - startX;
    const height = endY - startY;
    context.save();
    context.strokeStyle = shape.color;
    context.lineWidth = Math.max(1, this.resolveStoredScale(shape.width, shape.widthScale, MAX_STROKE_WIDTH_SCALE2) * surface.lastWidth);
    context.globalAlpha = 0.96;
    context.lineCap = "round";
    context.lineJoin = "round";
    if (shape.tool === "line") {
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.stroke();
      context.restore();
      return;
    }
    if (shape.tool === "rectangle") {
      context.strokeRect(startX, startY, width, height);
      context.restore();
      return;
    }
    const centerX = startX + width / 2;
    const centerY = startY + height / 2;
    context.beginPath();
    context.ellipse(centerX, centerY, Math.abs(width) / 2, Math.abs(height) / 2, 0, 0, Math.PI * 2);
    context.stroke();
    context.restore();
  }
  drawSelection(context, surface, targets) {
    const visibleTargets = targets.filter((target) => !(target.kind === "text" && target.id === this.inlineTextTargetId && target.page === this.inlineTextPageNumber));
    if (visibleTargets.length === 0) {
      return;
    }
    context.save();
    for (const target of visibleTargets) {
      const bounds = this.getTargetBounds(target);
      if (!bounds) {
        continue;
      }
      context.strokeStyle = SELECTION_OUTLINE_COLOR;
      context.lineWidth = 1;
      context.setLineDash(SELECTION_LINE_DASH);
      context.strokeRect(
        bounds.left * surface.lastWidth,
        bounds.top * surface.lastHeight,
        (bounds.right - bounds.left) * surface.lastWidth,
        (bounds.bottom - bounds.top) * surface.lastHeight
      );
    }
    if (visibleTargets.length === 1) {
      const bounds = this.getTargetBounds(visibleTargets[0]);
      if (bounds) {
        for (const handle of this.getHandlePoints(bounds)) {
          context.beginPath();
          context.fillStyle = SELECTION_HANDLE_FILL_COLOR;
          context.strokeStyle = SELECTION_OUTLINE_COLOR;
          context.setLineDash([]);
          const radius = this.getResizeHandleVisualRadius(surface);
          context.arc(handle.x * surface.lastWidth, handle.y * surface.lastHeight, radius, 0, Math.PI * 2);
          context.fill();
          context.stroke();
        }
      }
    }
    if (visibleTargets.length > 1) {
      const bounds = this.getCombinedBounds(visibleTargets);
      if (bounds) {
        context.strokeStyle = SELECTION_OUTLINE_COLOR;
        context.lineWidth = 1;
        context.setLineDash(SELECTION_LINE_DASH);
        context.strokeRect(
          bounds.left * surface.lastWidth,
          bounds.top * surface.lastHeight,
          (bounds.right - bounds.left) * surface.lastWidth,
          (bounds.bottom - bounds.top) * surface.lastHeight
        );
        for (const handle of this.getHandlePoints(bounds)) {
          context.beginPath();
          context.fillStyle = SELECTION_HANDLE_FILL_COLOR;
          context.strokeStyle = SELECTION_OUTLINE_COLOR;
          context.setLineDash([]);
          const radius = this.getResizeHandleVisualRadius(surface);
          context.arc(handle.x * surface.lastWidth, handle.y * surface.lastHeight, radius, 0, Math.PI * 2);
          context.fill();
          context.stroke();
        }
      }
    }
    context.restore();
  }
  drawLasso(context, surface, lasso) {
    if (lasso.points.length < 2) {
      return;
    }
    context.save();
    context.fillStyle = SELECTION_FILL_COLOR;
    context.strokeStyle = SELECTION_OUTLINE_COLOR;
    context.lineWidth = 1;
    context.setLineDash(SELECTION_LINE_DASH);
    context.beginPath();
    context.moveTo(lasso.points[0].x * surface.lastWidth, lasso.points[0].y * surface.lastHeight);
    for (let index = 1; index < lasso.points.length; index += 1) {
      const point = lasso.points[index];
      context.lineTo(point.x * surface.lastWidth, point.y * surface.lastHeight);
    }
    if (lasso.points.length >= 3) {
      context.closePath();
      context.fill();
    }
    context.stroke();
    context.restore();
  }
  drawFocusedRegion(context, surface, bounds) {
    context.save();
    context.fillStyle = SELECTION_FILL_COLOR;
    context.strokeStyle = SELECTION_OUTLINE_COLOR;
    context.lineWidth = 1;
    context.setLineDash(SELECTION_LINE_DASH);
    context.fillRect(
      bounds.left * surface.lastWidth,
      bounds.top * surface.lastHeight,
      (bounds.right - bounds.left) * surface.lastWidth,
      (bounds.bottom - bounds.top) * surface.lastHeight
    );
    context.strokeRect(
      bounds.left * surface.lastWidth,
      bounds.top * surface.lastHeight,
      (bounds.right - bounds.left) * surface.lastWidth,
      (bounds.bottom - bounds.top) * surface.lastHeight
    );
    context.restore();
  }
  getGeometryHitThreshold(pageNumber, pixelRadius = 9) {
    var _a2, _b;
    const surface = this.pageSurfaces.get(pageNumber);
    const minDimension = Math.min((_a2 = surface == null ? void 0 : surface.lastWidth) != null ? _a2 : 0, (_b = surface == null ? void 0 : surface.lastHeight) != null ? _b : 0);
    const effectiveRadius = isTabletWebKitTouchDevice() ? Math.max(pixelRadius, 14) : pixelRadius;
    return minDimension > 0 ? clamp2(effectiveRadius / minDimension, 5e-3, 0.032) : 0.012;
  }
  getTextContentLineBounds(item, pageNumber) {
    var _a2;
    const surface = this.pageSurfaces.get(pageNumber);
    const context = surface == null ? void 0 : surface.overlayEl.getContext("2d");
    if (!surface || !context) {
      return [getTextBounds(item)];
    }
    const fontSize = getRenderedTextFontSize(this.resolveStoredFontScale(item), surface.lastWidth);
    const metrics = getRenderedTextLayoutMetrics(surface.lastWidth);
    const fontFamily = (_a2 = item.fontFamily) != null ? _a2 : TEXT_FONT_FAMILIES[0];
    const boxWidth = item.boxWidthScale && item.boxWidthScale > 0 ? item.boxWidthScale * surface.lastWidth : surface.lastWidth * 0.48;
    const innerWidth = Math.max(metrics.minimumInnerWidth, boxWidth - metrics.paddingX * 2);
    const textLeft = item.x * surface.lastWidth + metrics.paddingX;
    context.save();
    applyCanvasTextStyle(context, item, fontSize, fontFamily);
    const lines = getCanvasTextLines(context, item.text, innerWidth, resolveTextWordWrap(item));
    const widths = lines.map((line) => context.measureText(line || " ").width);
    context.restore();
    const lineSpacing = resolveTextLineSpacing(item);
    const fallbackHeight = metrics.paddingY * 2 + getTextBlockHeight(fontSize, lines.length, lineSpacing) + metrics.boxExtraHeight;
    const boxHeight = item.boxHeightScale && item.boxHeightScale > 0 ? item.boxHeightScale * surface.lastHeight : fallbackHeight;
    const textTop = getTextBlockTop(
      item.y * surface.lastHeight,
      boxHeight,
      fontSize,
      lines.length,
      resolveTextVerticalAlignment(item),
      lineSpacing,
      metrics.paddingY
    );
    const alignment = resolveTextAlignment(item);
    return widths.map((lineWidth, index) => {
      const left = alignment === "center" ? textLeft + (innerWidth - lineWidth) / 2 : alignment === "right" ? textLeft + innerWidth - lineWidth : textLeft;
      const top = textTop + index * fontSize * lineSpacing;
      return {
        left: clamp2(left / surface.lastWidth, 0, 1),
        right: clamp2((left + Math.max(lineWidth, 1)) / surface.lastWidth, 0, 1),
        top: clamp2(top / surface.lastHeight, 0, 1),
        bottom: clamp2((top + fontSize) / surface.lastHeight, 0, 1)
      };
    });
  }
  findSelectableTarget(pageNumber, point, threshold) {
    var _a2, _b;
    if (!this.annotationDocument) {
      return null;
    }
    const hitThreshold = threshold != null ? threshold : this.getGeometryHitThreshold(pageNumber);
    const candidates = [];
    for (let index = ((_a2 = this.annotationDocument.imageItems) != null ? _a2 : []).length - 1; index >= 0; index -= 1) {
      const image = (_b = this.annotationDocument.imageItems) == null ? void 0 : _b[index];
      if (!image || image.page !== pageNumber) {
        continue;
      }
      const bounds = this.getImageBounds(image);
      if (pointInBounds(point, bounds, hitThreshold)) {
        const score = pointInBounds(point, bounds) ? -0.04 : distanceToBounds(point, bounds);
        candidates.push({ kind: "image", id: image.id, page: pageNumber, score });
      }
    }
    for (let index = this.annotationDocument.textItems.length - 1; index >= 0; index -= 1) {
      const item = this.annotationDocument.textItems[index];
      if (item.page !== pageNumber) {
        continue;
      }
      const lineBounds = this.getTextContentLineBounds(item, pageNumber);
      const hitBounds = lineBounds.filter((bounds) => pointInBounds(point, bounds, hitThreshold));
      if (hitBounds.length > 0) {
        const score = Math.min(...hitBounds.map((bounds) => pointInBounds(point, bounds) ? -0.03 : distanceToBounds(point, bounds)));
        candidates.push({ kind: "text", id: item.id, page: pageNumber, score });
      }
    }
    for (let index = this.annotationDocument.shapes.length - 1; index >= 0; index -= 1) {
      const shape = this.annotationDocument.shapes[index];
      if (shape.page !== pageNumber) {
        continue;
      }
      const bounds = getShapeBounds(shape);
      if (shape.tool !== "line" && pointInBounds(point, bounds)) {
        candidates.push({ kind: "shape", id: shape.id, page: pageNumber, score: -0.02 });
        continue;
      }
      if (pointInBounds(point, bounds, hitThreshold)) {
        const score = distanceToShape(point, shape);
        if (score <= hitThreshold * 1.5 || pointInBounds(point, bounds)) {
          candidates.push({ kind: "shape", id: shape.id, page: pageNumber, score });
        }
      }
    }
    for (let index = this.annotationDocument.strokes.length - 1; index >= 0; index -= 1) {
      const stroke = this.annotationDocument.strokes[index];
      if (stroke.page !== pageNumber) {
        continue;
      }
      const score = distanceToStroke(point, stroke);
      const visibleRadius = getNormalizedStrokePadding(stroke.width, stroke.widthScale);
      if (score <= hitThreshold + visibleRadius) {
        candidates.push({ kind: "stroke", id: stroke.id, page: pageNumber, score });
      }
    }
    if (candidates.length === 0) {
      return null;
    }
    candidates.sort((left, right) => left.score - right.score);
    const best = candidates[0];
    return { kind: best.kind, id: best.id, page: best.page };
  }
  moveSelectedTarget(target, deltaX, deltaY) {
    var _a2;
    if (!this.annotationDocument) {
      return;
    }
    if (target.kind === "text") {
      const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
      if (!item) {
        return;
      }
      item.x = clamp2(item.x + deltaX, 0, 1);
      item.y = clamp2(item.y + deltaY, 0, 1);
      return;
    }
    if (target.kind === "shape") {
      const shape = this.annotationDocument.shapes.find((entry) => entry.id === target.id);
      if (!shape) {
        return;
      }
      shape.start = {
        ...shape.start,
        x: clamp2(shape.start.x + deltaX, 0, 1),
        y: clamp2(shape.start.y + deltaY, 0, 1)
      };
      shape.end = {
        ...shape.end,
        x: clamp2(shape.end.x + deltaX, 0, 1),
        y: clamp2(shape.end.y + deltaY, 0, 1)
      };
      return;
    }
    if (target.kind === "image") {
      const image = ((_a2 = this.annotationDocument.imageItems) != null ? _a2 : []).find((entry) => entry.id === target.id);
      if (!image) {
        return;
      }
      image.x = clamp2(image.x + deltaX, 0, Math.max(0, 1 - image.widthScale));
      image.y = clamp2(image.y + deltaY, 0, Math.max(0, 1 - image.heightScale));
      return;
    }
    const stroke = this.annotationDocument.strokes.find((entry) => entry.id === target.id);
    if (!stroke) {
      return;
    }
    stroke.points = stroke.points.map((strokePoint) => ({
      ...strokePoint,
      x: clamp2(strokePoint.x + deltaX, 0, 1),
      y: clamp2(strokePoint.y + deltaY, 0, 1)
    }));
  }
  moveSelectedTargetsWithinPage(targets, deltaX, deltaY) {
    var _a2;
    const targetsByPage = /* @__PURE__ */ new Map();
    for (const target of targets) {
      const pageTargets = (_a2 = targetsByPage.get(target.page)) != null ? _a2 : [];
      pageTargets.push(target);
      targetsByPage.set(target.page, pageTargets);
    }
    for (const pageTargets of targetsByPage.values()) {
      const bounds = this.getCombinedBounds(pageTargets);
      if (!bounds) {
        continue;
      }
      const boundedDeltaX = clamp2(deltaX, -bounds.left, 1 - bounds.right);
      const boundedDeltaY = clamp2(deltaY, -bounds.top, 1 - bounds.bottom);
      for (const target of pageTargets) {
        this.moveSelectedTarget(target, boundedDeltaX, boundedDeltaY);
      }
    }
  }
  resizeSelectedTargets(targets, handle, deltaX, deltaY) {
    if (!this.annotationDocument || targets.length === 0) {
      return;
    }
    const bounds = this.getCombinedBounds(targets);
    if (!bounds) {
      return;
    }
    const nextBounds = {
      left: bounds.left,
      right: bounds.right,
      top: bounds.top,
      bottom: bounds.bottom
    };
    switch (handle) {
      case "nw":
        nextBounds.left = clamp2(bounds.left + deltaX, 0, bounds.right - 0.01);
        nextBounds.top = clamp2(bounds.top + deltaY, 0, bounds.bottom - 0.01);
        break;
      case "n":
        nextBounds.top = clamp2(bounds.top + deltaY, 0, bounds.bottom - 0.01);
        break;
      case "ne":
        nextBounds.right = clamp2(bounds.right + deltaX, bounds.left + 0.01, 1);
        nextBounds.top = clamp2(bounds.top + deltaY, 0, bounds.bottom - 0.01);
        break;
      case "e":
        nextBounds.right = clamp2(bounds.right + deltaX, bounds.left + 0.01, 1);
        break;
      case "sw":
        nextBounds.left = clamp2(bounds.left + deltaX, 0, bounds.right - 0.01);
        nextBounds.bottom = clamp2(bounds.bottom + deltaY, bounds.top + 0.01, 1);
        break;
      case "w":
        nextBounds.left = clamp2(bounds.left + deltaX, 0, bounds.right - 0.01);
        break;
      case "s":
        nextBounds.bottom = clamp2(bounds.bottom + deltaY, bounds.top + 0.01, 1);
        break;
      case "se":
        nextBounds.right = clamp2(bounds.right + deltaX, bounds.left + 0.01, 1);
        nextBounds.bottom = clamp2(bounds.bottom + deltaY, bounds.top + 0.01, 1);
        break;
    }
    const resizingOnlyText = targets.every((target) => target.kind === "text");
    if (this.isCornerResizeHandle(handle) && !resizingOnlyText) {
      const proposedWidthScale = (nextBounds.right - nextBounds.left) / Math.max(bounds.right - bounds.left, 1e-4);
      const proposedHeightScale = (nextBounds.bottom - nextBounds.top) / Math.max(bounds.bottom - bounds.top, 1e-4);
      const uniformScale = Math.abs(proposedWidthScale - 1) >= Math.abs(proposedHeightScale - 1) ? proposedWidthScale : proposedHeightScale;
      switch (handle) {
        case "nw":
          nextBounds.left = clamp2(bounds.right - (bounds.right - bounds.left) * uniformScale, 0, bounds.right - 0.01);
          nextBounds.top = clamp2(bounds.bottom - (bounds.bottom - bounds.top) * uniformScale, 0, bounds.bottom - 0.01);
          break;
        case "ne":
          nextBounds.right = clamp2(bounds.left + (bounds.right - bounds.left) * uniformScale, bounds.left + 0.01, 1);
          nextBounds.top = clamp2(bounds.bottom - (bounds.bottom - bounds.top) * uniformScale, 0, bounds.bottom - 0.01);
          break;
        case "sw":
          nextBounds.left = clamp2(bounds.right - (bounds.right - bounds.left) * uniformScale, 0, bounds.right - 0.01);
          nextBounds.bottom = clamp2(bounds.top + (bounds.bottom - bounds.top) * uniformScale, bounds.top + 0.01, 1);
          break;
        case "se":
          nextBounds.right = clamp2(bounds.left + (bounds.right - bounds.left) * uniformScale, bounds.left + 0.01, 1);
          nextBounds.bottom = clamp2(bounds.top + (bounds.bottom - bounds.top) * uniformScale, bounds.top + 0.01, 1);
          break;
      }
    }
    const widthScale = (nextBounds.right - nextBounds.left) / Math.max(bounds.right - bounds.left, 1e-4);
    const heightScale = (nextBounds.bottom - nextBounds.top) / Math.max(bounds.bottom - bounds.top, 1e-4);
    for (const target of targets) {
      this.scaleTargetWithinBounds(target, bounds, nextBounds, widthScale, heightScale);
    }
  }
  scaleTargetWithinBounds(target, previousBounds, nextBounds, widthScale, heightScale) {
    var _a2, _b, _c;
    if (!this.annotationDocument) {
      return;
    }
    const transformPoint = (point) => ({
      ...point,
      x: clamp2(nextBounds.left + (point.x - previousBounds.left) * widthScale, 0, 1),
      y: clamp2(nextBounds.top + (point.y - previousBounds.top) * heightScale, 0, 1)
    });
    if (target.kind === "stroke") {
      const stroke = this.annotationDocument.strokes.find((entry) => entry.id === target.id);
      if (!stroke) {
        return;
      }
      stroke.points = stroke.points.map((point) => transformPoint(point));
      return;
    }
    if (target.kind === "text") {
      const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
      if (!item) {
        return;
      }
      const currentBounds = getTextBounds(item);
      const currentWidth = Math.max((_a2 = item.boxWidthScale) != null ? _a2 : currentBounds.right - currentBounds.left, 0.04);
      const currentHeight = Math.max((_b = item.boxHeightScale) != null ? _b : currentBounds.bottom - currentBounds.top, 0.026);
      const anchor = transformPoint({ x: item.x, y: item.y, pressure: 0.5 });
      item.x = anchor.x;
      item.y = anchor.y;
      item.autoFit = false;
      item.manualBoxSize = true;
      item.boxWidthScale = clamp2(currentWidth * widthScale, 0.04, 0.9);
      item.boxHeightScale = clamp2(currentHeight * heightScale, 0.026, 0.9);
      return;
    }
    if (target.kind === "image") {
      const image = ((_c = this.annotationDocument.imageItems) != null ? _c : []).find((entry) => entry.id === target.id);
      if (!image) {
        return;
      }
      const currentBounds = this.getImageBounds(image);
      image.x = clamp2(nextBounds.left + (currentBounds.left - previousBounds.left) * widthScale, 0, 0.98);
      image.y = clamp2(nextBounds.top + (currentBounds.top - previousBounds.top) * heightScale, 0, 0.98);
      image.widthScale = clamp2(image.widthScale * widthScale, 0.02, 0.98);
      image.heightScale = clamp2(image.heightScale * heightScale, 0.02, 0.98);
      image.x = clamp2(image.x, 0, Math.max(0, 1 - image.widthScale));
      image.y = clamp2(image.y, 0, Math.max(0, 1 - image.heightScale));
      return;
    }
    const shape = this.annotationDocument.shapes.find((entry) => entry.id === target.id);
    if (!shape) {
      return;
    }
    shape.start = transformPoint(shape.start);
    shape.end = transformPoint(shape.end);
  }
  isCornerResizeHandle(handle) {
    return handle === "nw" || handle === "ne" || handle === "sw" || handle === "se";
  }
  getResizeHandleHitThreshold(pageNumber) {
    var _a2, _b;
    const surface = this.pageSurfaces.get(pageNumber);
    const minDimension = Math.min((_a2 = surface == null ? void 0 : surface.lastWidth) != null ? _a2 : 0, (_b = surface == null ? void 0 : surface.lastHeight) != null ? _b : 0);
    if (!minDimension) {
      return 0.022;
    }
    const pixelRadius = isTabletWebKitTouchDevice() ? 22 : 14;
    return clamp2(pixelRadius / minDimension, 0.012, 0.06);
  }
  getResizeHandleVisualRadius(surface) {
    const minDimension = Math.min(surface.lastWidth, surface.lastHeight);
    if (isTabletWebKitTouchDevice()) {
      return minDimension < 520 ? 6 : 5;
    }
    return minDimension < 520 ? 4.5 : 3.5;
  }
  getTargetBounds(target) {
    var _a2;
    if (!this.annotationDocument) {
      return null;
    }
    if (target.kind === "text") {
      if (target.id === this.inlineTextTargetId && target.page === this.inlineTextPageNumber) {
        const preview = this.getInlineTextPreviewItem(target.page);
        if (preview) {
          return getTextBounds(preview);
        }
      }
      const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
      return item ? getTextBounds(item) : null;
    }
    if (target.kind === "shape") {
      const shape = this.annotationDocument.shapes.find((entry) => entry.id === target.id);
      return shape ? getShapeBounds(shape) : null;
    }
    if (target.kind === "image") {
      const image = ((_a2 = this.annotationDocument.imageItems) != null ? _a2 : []).find((entry) => entry.id === target.id);
      return image ? this.getImageBounds(image) : null;
    }
    const stroke = this.annotationDocument.strokes.find((entry) => entry.id === target.id);
    return stroke ? getStrokeBounds(stroke) : null;
  }
  getImageBounds(image) {
    return {
      left: clamp2(image.x, 0, 1),
      right: clamp2(image.x + image.widthScale, 0, 1),
      top: clamp2(image.y, 0, 1),
      bottom: clamp2(image.y + image.heightScale, 0, 1)
    };
  }
  getCombinedBounds(targets) {
    const boundsList = targets.map((target) => this.getTargetBounds(target)).filter((bounds) => !!bounds);
    if (boundsList.length === 0) {
      return null;
    }
    return {
      left: Math.min(...boundsList.map((bounds) => bounds.left)),
      right: Math.max(...boundsList.map((bounds) => bounds.right)),
      top: Math.min(...boundsList.map((bounds) => bounds.top)),
      bottom: Math.max(...boundsList.map((bounds) => bounds.bottom))
    };
  }
  getSelectionPage() {
    if (this.selectedTargets.length === 0) {
      return null;
    }
    const pages = new Set(this.selectedTargets.map((target) => target.page));
    return pages.size === 1 ? this.selectedTargets[0].page : null;
  }
  findTargetsInLasso(lasso) {
    var _a2;
    if (!this.annotationDocument || lasso.points.length < 3) {
      return [];
    }
    const hits = [];
    const polygonBounds = getPolygonBounds(lasso.points);
    if (polygonBounds.right - polygonBounds.left < 2e-3 || polygonBounds.bottom - polygonBounds.top < 2e-3) {
      return [];
    }
    const testPoints = (bounds) => [
      { x: bounds.left, y: bounds.top, pressure: 0.5 },
      { x: bounds.right, y: bounds.top, pressure: 0.5 },
      { x: bounds.left, y: bounds.bottom, pressure: 0.5 },
      { x: bounds.right, y: bounds.bottom, pressure: 0.5 },
      { x: (bounds.left + bounds.right) / 2, y: (bounds.top + bounds.bottom) / 2, pressure: 0.5 }
    ];
    const lassoHitsBounds = (bounds, extraHit) => {
      return testPoints(bounds).some((point) => this.isPointInsidePolygon(point, lasso.points)) || lasso.points.some((point) => point.x >= bounds.left && point.x <= bounds.right && point.y >= bounds.top && point.y <= bounds.bottom) || this.doesPolygonIntersectBounds(lasso.points, bounds) || (extraHit ? extraHit() : false);
    };
    const maybeAdd = (target, bounds, extraHit) => {
      if (!bounds) {
        return;
      }
      if (!boundsOverlap(bounds, polygonBounds)) {
        return;
      }
      if (lassoHitsBounds(bounds, extraHit)) {
        hits.push(target);
      }
    };
    for (const item of this.annotationDocument.textItems) {
      if (item.page === lasso.page) {
        const lineBounds = this.getTextContentLineBounds(item, lasso.page);
        if (lineBounds.some((bounds) => boundsOverlap(bounds, polygonBounds) && lassoHitsBounds(bounds))) {
          hits.push({ kind: "text", id: item.id, page: item.page });
        }
      }
    }
    for (const image of (_a2 = this.annotationDocument.imageItems) != null ? _a2 : []) {
      if (image.page === lasso.page) {
        maybeAdd({ kind: "image", id: image.id, page: image.page }, this.getImageBounds(image));
      }
    }
    for (const shape of this.annotationDocument.shapes) {
      if (shape.page === lasso.page) {
        maybeAdd(
          { kind: "shape", id: shape.id, page: shape.page },
          getShapeBounds(shape),
          () => this.doesPolygonIntersectShape(lasso.points, shape)
        );
      }
    }
    for (const stroke of this.annotationDocument.strokes) {
      if (stroke.page === lasso.page) {
        const bounds = getStrokeBounds(stroke);
        if (boundsOverlap(bounds, polygonBounds) && (stroke.points.some((point) => this.isPointInsidePolygon(point, lasso.points)) || this.doesPolygonIntersectStroke(lasso.points, stroke))) {
          hits.push({ kind: "stroke", id: stroke.id, page: stroke.page });
        }
      }
    }
    return hits;
  }
  doesPolygonIntersectBounds(polygon, bounds) {
    const rectPoints = [
      { x: bounds.left, y: bounds.top, pressure: 0.5 },
      { x: bounds.right, y: bounds.top, pressure: 0.5 },
      { x: bounds.right, y: bounds.bottom, pressure: 0.5 },
      { x: bounds.left, y: bounds.bottom, pressure: 0.5 }
    ];
    return this.doPolylinesIntersectClosed(polygon, rectPoints);
  }
  doesPolygonIntersectShape(polygon, shape) {
    if (shape.tool === "line") {
      return this.doesPolygonIntersectPolyline(polygon, [shape.start, shape.end]);
    }
    return this.doesPolygonIntersectBounds(polygon, getShapeBounds(shape));
  }
  doesPolygonIntersectStroke(polygon, stroke) {
    if (stroke.points.length < 2) {
      return stroke.points.some((point) => this.isPointInsidePolygon(point, polygon));
    }
    return this.doesPolygonIntersectPolyline(polygon, stroke.points);
  }
  doesPolygonIntersectPolyline(polygon, polyline) {
    for (let polygonIndex = 1; polygonIndex < polygon.length; polygonIndex += 1) {
      const polygonStart = polygon[polygonIndex - 1];
      const polygonEnd = polygon[polygonIndex];
      for (let lineIndex = 1; lineIndex < polyline.length; lineIndex += 1) {
        const lineStart = polyline[lineIndex - 1];
        const lineEnd = polyline[lineIndex];
        if (segmentsIntersect(polygonStart, polygonEnd, lineStart, lineEnd)) {
          return true;
        }
      }
    }
    const lastPolygonPoint = polygon[polygon.length - 1];
    const firstPolygonPoint = polygon[0];
    for (let lineIndex = 1; lineIndex < polyline.length; lineIndex += 1) {
      if (segmentsIntersect(lastPolygonPoint, firstPolygonPoint, polyline[lineIndex - 1], polyline[lineIndex])) {
        return true;
      }
    }
    return false;
  }
  doPolylinesIntersectClosed(firstPolygon, secondPolygon) {
    return this.doesPolygonIntersectPolyline(firstPolygon, [...secondPolygon, secondPolygon[0]]);
  }
  isPointInsidePolygon(point, polygon) {
    let inside = false;
    for (let current = 0, previous = polygon.length - 1; current < polygon.length; previous = current++) {
      const currentPoint = polygon[current];
      const previousPoint = polygon[previous];
      const intersects = currentPoint.y > point.y !== previousPoint.y > point.y && point.x < (previousPoint.x - currentPoint.x) * (point.y - currentPoint.y) / (previousPoint.y - currentPoint.y || 1e-6) + currentPoint.x;
      if (intersects) {
        inside = !inside;
      }
    }
    return inside;
  }
  getHandlePoints(bounds) {
    const midX = (bounds.left + bounds.right) / 2;
    const midY = (bounds.top + bounds.bottom) / 2;
    return [
      { handle: "nw", x: bounds.left, y: bounds.top },
      { handle: "n", x: midX, y: bounds.top },
      { handle: "ne", x: bounds.right, y: bounds.top },
      { handle: "e", x: bounds.right, y: midY },
      { handle: "se", x: bounds.right, y: bounds.bottom },
      { handle: "s", x: midX, y: bounds.bottom },
      { handle: "sw", x: bounds.left, y: bounds.bottom },
      { handle: "w", x: bounds.left, y: midY }
    ];
  }
  getHandleHit(target, point) {
    const bounds = this.getTargetBounds(target);
    if (!bounds) {
      return null;
    }
    const threshold = this.getResizeHandleHitThreshold(target.page);
    for (const handlePoint of this.getHandlePoints(bounds)) {
      if (distanceBetween2(point, { x: handlePoint.x, y: handlePoint.y }) <= threshold) {
        return handlePoint.handle;
      }
    }
    return null;
  }
  getSelectionHandleHit(pageNumber, point) {
    if (this.selectedTargets.length === 0) {
      return null;
    }
    if (this.selectedTargets.length === 1) {
      const target = this.selectedTarget;
      if (!target || target.page !== pageNumber) {
        return null;
      }
      return this.getHandleHit(target, point);
    }
    const pageTargets = this.selectedTargets.filter((target) => target.page === pageNumber);
    if (pageTargets.length < 2) {
      return null;
    }
    const bounds = this.getCombinedBounds(pageTargets);
    if (!bounds) {
      return null;
    }
    const threshold = this.getResizeHandleHitThreshold(pageNumber);
    for (const handlePoint of this.getHandlePoints(bounds)) {
      if (distanceBetween2(point, { x: handlePoint.x, y: handlePoint.y }) <= threshold) {
        return handlePoint.handle;
      }
    }
    return null;
  }
  getSelectedTargetHit(pageNumber, point) {
    if (!this.annotationDocument) {
      return null;
    }
    const pageTargets = this.selectedTargets.filter((target) => target.page === pageNumber);
    if (pageTargets.length === 0) {
      return null;
    }
    const threshold = this.getGeometryHitThreshold(pageNumber);
    const candidates = [];
    for (const target of pageTargets) {
      if (target.kind === "text") {
        const item = this.annotationDocument.textItems.find((entry) => entry.id === target.id);
        if (!item) {
          continue;
        }
        const lineBounds = this.getTextContentLineBounds(item, pageNumber);
        const hitBounds = lineBounds.filter((bounds) => pointInBounds(point, bounds, threshold));
        if (hitBounds.length > 0) {
          candidates.push({
            ...target,
            score: Math.min(...hitBounds.map((bounds) => pointInBounds(point, bounds) ? -0.03 : distanceToBounds(point, bounds)))
          });
        }
        continue;
      }
      if (target.kind === "shape") {
        const shape = this.annotationDocument.shapes.find((entry) => entry.id === target.id);
        if (!shape) {
          continue;
        }
        const bounds = getShapeBounds(shape);
        if (shape.tool !== "line" && pointInBounds(point, bounds)) {
          candidates.push({ ...target, score: -0.02 });
          continue;
        }
        if (pointInBounds(point, bounds, threshold)) {
          const score2 = distanceToShape(point, shape);
          if (score2 <= threshold * 1.5 || pointInBounds(point, bounds)) {
            candidates.push({ ...target, score: score2 });
          }
        }
        continue;
      }
      const stroke = this.annotationDocument.strokes.find((entry) => entry.id === target.id);
      if (!stroke) {
        continue;
      }
      const score = distanceToStroke(point, stroke);
      const visibleRadius = getNormalizedStrokePadding(stroke.width, stroke.widthScale);
      if (score <= threshold + visibleRadius) {
        candidates.push({ ...target, score });
      }
    }
    if (candidates.length === 0) {
      return null;
    }
    candidates.sort((left, right) => left.score - right.score);
    const best = candidates[0];
    return { kind: best.kind, id: best.id, page: best.page };
  }
  getCursorForHandle(handle) {
    switch (handle) {
      case "nw":
      case "se":
        return "nwse-resize";
      case "n":
      case "s":
        return "ns-resize";
      case "ne":
      case "sw":
        return "nesw-resize";
      case "e":
      case "w":
        return "ew-resize";
    }
  }
  showDrawingNotice(message, durationMs) {
    if (this.plugin.shouldShowDrawingNotices()) {
      new import_obsidian6.Notice(message, durationMs);
    }
  }
  pushHistory() {
    if (!this.annotationDocument) {
      return;
    }
    this.pushHistoryEntry({ kind: "document", document: cloneDocument(this.annotationDocument) });
  }
  pushStrokeAddHistory(stroke) {
    this.pushHistoryEntry({ kind: "stroke-add", stroke: this.cloneStroke(stroke) });
  }
  pushHistoryEntry(entry) {
    this.undoStack.push(entry);
    if (this.undoStack.length > MAX_HISTORY) {
      this.undoStack.shift();
    }
    this.redoStack = [];
  }
  cloneStroke(stroke) {
    return JSON.parse(JSON.stringify(stroke));
  }
  markDirtyAndRedraw(message) {
    this.invalidateAnnotationPageCache();
    this.documentRevision += 1;
    this.isDirty = true;
    this.scheduleSave();
    this.drawAllAnnotations();
    this.refreshStatus(message);
  }
  scheduleSave() {
    if (this.autosaveHandle !== null) {
      this.ownerWindow.clearTimeout(this.autosaveHandle);
    }
    this.autosaveHandle = this.ownerWindow.setTimeout(() => {
      void this.flushSave();
    }, this.plugin.getAutosaveDelayMs());
  }
  destroyPageSurfaces() {
    var _a2;
    this.finishFingerPan(false);
    this.cancelFingerPanInertia();
    this.unbindPdfPointerDocumentTracking();
    for (const surface of this.pageSurfaces.values()) {
      (_a2 = this.pageResizeObservers.get(surface.pageNumber)) == null ? void 0 : _a2.disconnect();
      surface.overlayEl.removeEventListener("pointerenter", this.handlePointerEnter);
      surface.overlayEl.removeEventListener("pointerdown", this.handlePointerDown);
      surface.overlayEl.removeEventListener("pointermove", this.handlePointerMove);
      surface.overlayEl.removeEventListener("pointerup", this.handlePointerUp);
      surface.overlayEl.removeEventListener("pointercancel", this.handlePointerCancel);
      surface.overlayEl.removeEventListener("pointerleave", this.handlePointerLeave);
      surface.overlayEl.remove();
      surface.transientEl.remove();
    }
    this.pageResizeObservers.clear();
    this.zoomingPages.clear();
    this.pageSurfaces.clear();
    this.handleToolbarDragEnd();
    const viewContentEl = this.getViewContentEl();
    viewContentEl == null ? void 0 : viewContentEl.removeEventListener("touchstart", this.handleZoomGestureTouchStart, { capture: true });
    viewContentEl == null ? void 0 : viewContentEl.removeEventListener("wheel", this.handleZoomGestureWheel, { capture: true });
    viewContentEl == null ? void 0 : viewContentEl.removeEventListener("gesturestart", this.handleZoomGestureStart, { capture: true });
    viewContentEl == null ? void 0 : viewContentEl.removeEventListener("pointerdown", this.handleViewPointerDown, { capture: true });
    viewContentEl == null ? void 0 : viewContentEl.removeEventListener("pointermove", this.handleViewPointerMove);
    viewContentEl == null ? void 0 : viewContentEl.removeEventListener("pointerleave", this.handleViewPointerLeave);
    this.ownerDocument.removeEventListener("pointerdown", this.handleDocumentPointerDown, true);
    this.ownerDocument.removeEventListener("touchstart", this.handleDocumentTouchStart, true);
  }
  async diagnoseOverlayState() {
    var _a2, _b;
    this.syncPages();
    this.forceRedrawAllAnnotations();
    const pageNumber = this.currentPage;
    const surface = (_b = (_a2 = this.pageSurfaces.get(pageNumber)) != null ? _a2 : Array.from(this.pageSurfaces.values())[0]) != null ? _b : null;
    if (!surface) {
      const report2 = {
        pageNumber,
        surfaces: this.pageSurfaces.size,
        error: "No page surface is registered"
      };
      await writeClipboardText(JSON.stringify(report2, null, 2));
      this.refreshStatus("Overlay diagnostic copied: no page surface", 8e3);
      new import_obsidian6.Notice("Freedraw PDF diagnostic copied to clipboard.");
      return;
    }
    const pageRect = surface.pageEl.getBoundingClientRect();
    const hostRect = surface.hostEl.getBoundingClientRect();
    const overlayRect = surface.overlayEl.getBoundingClientRect();
    const centerX = overlayRect.left + overlayRect.width / 2;
    const centerY = overlayRect.top + overlayRect.height / 2;
    const stack = this.ownerDocument.elementsFromPoint(centerX, centerY).slice(0, 8).map((element) => ({
      tag: element.tagName.toLowerCase(),
      className: isHtmlElement(element) ? element.className : "",
      id: element.id || ""
    }));
    const bucket = this.getPageAnnotationBucket(surface.pageNumber);
    const context = surface.overlayEl.getContext("2d");
    const overlayStyle = this.ownerWindow.getComputedStyle(surface.overlayEl);
    let alphaPixels = 0;
    if (context && surface.overlayEl.width > 0 && surface.overlayEl.height > 0) {
      const sampleWidth = Math.min(surface.overlayEl.width, 240);
      const sampleHeight = Math.min(surface.overlayEl.height, 240);
      const data = context.getImageData(0, 0, sampleWidth, sampleHeight).data;
      for (let index = 3; index < data.length; index += 4) {
        if (data[index] > 0) {
          alphaPixels += 1;
        }
      }
    }
    const report = {
      pageNumber: surface.pageNumber,
      currentPage: this.currentPage,
      annotationMode: this.annotationMode,
      surfaces: this.pageSurfaces.size,
      annotations: {
        strokes: bucket.strokes.length,
        textItems: bucket.textItems.length,
        shapes: bucket.shapes.length,
        imageItems: bucket.imageItems.length
      },
      pageRect: this.roundRectForDiagnostic(pageRect),
      hostRect: this.roundRectForDiagnostic(hostRect),
      overlayRect: this.roundRectForDiagnostic(overlayRect),
      canvas: {
        width: surface.overlayEl.width,
        height: surface.overlayEl.height,
        styleWidth: overlayStyle.width,
        styleHeight: overlayStyle.height,
        visibility: overlayStyle.visibility,
        display: overlayStyle.display,
        opacity: overlayStyle.opacity,
        pointerEvents: overlayStyle.pointerEvents,
        alphaPixels
      },
      connection: {
        pageConnected: surface.pageEl.isConnected,
        hostConnected: surface.hostEl.isConnected,
        overlayConnected: surface.overlayEl.isConnected,
        overlayParentClass: isHtmlElement(surface.overlayEl.parentElement) ? surface.overlayEl.parentElement.className : null
      },
      topStack: stack
    };
    await writeClipboardText(JSON.stringify(report, null, 2));
    this.refreshStatus(`Overlay diagnostic copied: p${surface.pageNumber}, alpha ${alphaPixels}`, 1e4);
    new import_obsidian6.Notice("Freedraw PDF diagnostic copied to clipboard.");
  }
  roundRectForDiagnostic(rect) {
    const round = (value) => Math.round(value * 10) / 10;
    return {
      left: round(rect.left),
      top: round(rect.top),
      width: round(rect.width),
      height: round(rect.height),
      right: round(rect.right),
      bottom: round(rect.bottom)
    };
  }
  refreshStatus(message, durationMs = 2500) {
    if (this.statusEl) {
      this.statusEl.textContent = message;
    }
    if (this.statusResetHandle !== null) {
      this.ownerWindow.clearTimeout(this.statusResetHandle);
      this.statusResetHandle = null;
    }
    if (durationMs > 0) {
      this.statusResetHandle = this.ownerWindow.setTimeout(() => {
        var _a2;
        this.statusResetHandle = null;
        if (((_a2 = this.statusEl) == null ? void 0 : _a2.textContent) === message) {
          this.statusEl.textContent = "";
        }
      }, durationMs);
    }
  }
  showStartupError(message) {
    this.refreshStatus(message, 6e3);
    if (!this.startupErrorShown) {
      this.startupErrorShown = true;
      new import_obsidian6.Notice(message);
    }
  }
};
var PDFAnnotatorPlugin = class extends import_obsidian6.Plugin {
  constructor() {
    super(...arguments);
    this.sessions = /* @__PURE__ */ new Map();
    this.clipboard = null;
  }
  async onload() {
    this.settingsController = new PDFAnnotatorSettingsController(
      () => this.loadData(),
      (data) => this.saveData(data),
      () => {
        setInkRenderSettings(this.settingsController.getInkRenderSettings());
        for (const session of this.sessions.values()) {
          session.refreshSettings();
        }
      }
    );
    await this.settingsController.load();
    setInkRenderSettings(this.settingsController.getInkRenderSettings());
    this.store = new AnnotationStore(this.app, this.settingsController.getLegacyInkRenderSettings());
    this.annotatedEmbeds = new AnnotatedEmbedController(this.app, this.store, {
      shouldShowAnnotatedEmbedHeader: () => this.shouldShowAnnotatedEmbedHeader(),
      openPdfPage: (file, pageNumber, rect) => this.openPdfPage(file, pageNumber, rect),
      writeClipboardText: (text) => this.writeClipboardText(text)
    });
    this.addSettingTab(new PDFAnnotatorSettingTab(this.app, this));
    this.registerMarkdownCodeBlockProcessor("freedraw-pdf", (source, el, context) => {
      void this.annotatedEmbeds.renderMarkdownBlock(source, el, context.sourcePath);
    });
    this.addRibbonIcon("pen-tool", "Toggle annotation mode on active PDF", async () => {
      const session = await this.ensureActivePdfSession();
      if (!session) {
        new import_obsidian6.Notice("Open a PDF in Obsidian's built-in viewer first.");
        return;
      }
      session.toggleAnnotationMode();
    });
    this.addRibbonIcon("file-plus-2", "Create blank annotatable PDF", () => {
      this.openBlankAnnotatablePdfModal();
    });
    this.addCommand({
      id: "toggle-active-pdf-annotation-mode",
      name: "Toggle annotation mode on active PDF",
      checkCallback: (checking) => {
        const canRun = !!this.getActivePdfLeaf();
        if (canRun && !checking) {
          void this.toggleActiveSessionMode();
        }
        return canRun;
      }
    });
    this.addCommand({
      id: "create-blank-annotatable-pdf",
      name: "Create blank annotatable PDF",
      callback: () => {
        this.openBlankAnnotatablePdfModal();
      }
    });
    registerSessionCommands(
      (command) => this.addCommand(command),
      () => this.getSessionForLeaf(this.getActivePdfLeaf()),
      [
        { id: "copy-current-page-pdf-link", name: "Copy current PDF page link", run: (session) => session.copyCurrentPageLink() },
        { id: "open-active-pdf-annotation-json", name: "Open active PDF annotation data JSON", run: (session) => session.openAnnotationDataJson() },
        { id: "export-current-page-snapshot", name: "Export current annotated page as PNG", run: (session) => session.exportCurrentPageSnapshot() },
        { id: "export-annotated-mixed-pdf", name: "Export annotated mixed PDF", run: (session) => session.exportAnnotatedMixedDocumentPdf() },
        { id: "create-native-mixed-working-pdf", name: "Advanced: create native mixed working PDF", run: (session) => session.materializeNativeMixedWorkingPdf() },
        { id: "insert-native-notebook-page-after-current", name: "Add temporary template page after current PDF page", run: (session) => session.openTemplatePageInsertModal("after") },
        { id: "insert-native-notebook-page-before-current", name: "Add temporary template page before current PDF page", run: (session) => session.openTemplatePageInsertModal("before") }
      ]
    );
    this.addCommand({
      id: "copy-current-page-annotated-embed",
      name: "Copy annotated PDF page embed",
      checkCallback: (checking) => {
        const source = this.getPreferredPdfInsertionSource();
        const canRun = !!source;
        if (canRun && !checking) {
          void this.copyAnnotatedPdfEmbedBlock(source.file, source.page);
        }
        return canRun;
      }
    });
    this.addCommand({
      id: "insert-current-page-annotated-embed",
      name: "Insert annotated PDF page embed",
      checkCallback: (checking) => {
        const markdownView = this.app.workspace.getActiveViewOfType(import_obsidian6.MarkdownView);
        const source = this.getPreferredPdfInsertionSource();
        const canRun = !!markdownView && !!source;
        if (canRun && !checking) {
          this.annotatedEmbeds.insertBlock(markdownView, source.file, source.page);
        }
        return canRun;
      }
    });
    this.addCommand({
      id: "insert-selected-region-annotated-embed",
      name: "Insert annotated PDF selected region embed",
      checkCallback: (checking) => {
        const markdownView = this.app.workspace.getActiveViewOfType(import_obsidian6.MarkdownView);
        const source = this.getPreferredPdfRegionInsertionSource();
        const canRun = !!markdownView && !!source;
        if (canRun && !checking) {
          this.annotatedEmbeds.insertBlock(markdownView, source.file, source.page, source.rect);
        }
        return canRun;
      }
    });
    registerSessionCommands(
      (command) => this.addCommand(command),
      () => this.getSessionForLeaf(this.getActivePdfLeaf()),
      [
        { id: "pdf-previous-mixed-page", name: "PDF: Go to previous page", isEnabled: (session) => session.canNavigatePage(-1), run: (session) => session.goToPreviousPage() },
        { id: "pdf-next-mixed-page", name: "PDF: Go to next page", isEnabled: (session) => session.canNavigatePage(1), run: (session) => session.goToNextPage() },
        { id: "pdf-undo-annotation-change", name: "PDF: Undo annotation change", run: (session) => session.undo() },
        { id: "pdf-redo-annotation-change", name: "PDF: Redo annotation change", run: (session) => session.redo() },
        { id: "pdf-open-mixed-page-list", name: "PDF: Open mixed page list", run: (session) => session.openMixedPageList() },
        { id: "pdf-open-go-to-page", name: "PDF: Go to page...", run: (session) => session.openGoToPage() },
        { id: "pdf-add-template-page-end", name: "PDF: Quick add template page to end", run: (session) => session.addTemplatePageToEnd() },
        { id: "pdf-add-template-page-before", name: "PDF: Quick add template page before current page", run: (session) => session.addTemplatePageBeforeCurrent() },
        { id: "pdf-add-template-page-after", name: "PDF: Quick add template page after current page", run: (session) => session.addTemplatePageAfterCurrent() },
        { id: "pdf-duplicate-current-added-page", name: "PDF: Duplicate current added page", isEnabled: (session) => session.hasCurrentAddedPage(), run: (session) => session.duplicateCurrentAddedPage() },
        { id: "pdf-duplicate-current-added-page-structure", name: "PDF: Duplicate current added page structure only", isEnabled: (session) => session.hasCurrentAddedPage(), run: (session) => session.duplicateCurrentAddedPage(false) },
        { id: "pdf-clear-current-added-page", name: "PDF: Clear current added page contents", isEnabled: (session) => session.hasCurrentAddedPage(), run: (session) => session.clearCurrentAddedPageContents() },
        { id: "pdf-delete-current-added-page", name: "PDF: Move current page to Removed", run: (session) => session.deleteCurrentPage() },
        { id: "select-all-page-annotations", name: "Select all annotations on current PDF page", run: (session) => session.selectAllCurrentPageAnnotations() },
        { id: "duplicate-selected-annotations", name: "Duplicate selected annotations", run: (session) => session.duplicateSelectedTargets() },
        { id: "delete-selected-annotations", name: "Delete selected annotations", run: (session) => session.deleteSelectedTargets() },
        { id: "copy-selected-annotations", name: "Copy selected annotations", run: (session) => session.copySelectedTargets() },
        { id: "cut-selected-annotations", name: "Cut selected annotations", run: (session) => session.cutSelectedTargets() },
        { id: "bring-selected-annotations-to-front", name: "Bring selected annotations to front", run: (session) => session.reorderSelectedTargets("front") },
        { id: "send-selected-annotations-to-back", name: "Send selected annotations to back", run: (session) => session.reorderSelectedTargets("back") },
        { id: "paste-selected-annotations", name: "Paste copied annotations", isEnabled: () => this.hasClipboard(), run: (session) => session.pasteClipboard() },
        { id: "paste-selected-annotations-in-place", name: "Paste copied annotations in place", isEnabled: () => this.hasClipboard(), run: (session) => session.pasteClipboard(true) },
        { id: "export-selection-snapshot", name: "Export selection snapshot", run: (session) => session.exportSelectionSnapshot() },
        { id: "copy-selection-region-reference", name: "Copy selection region reference", run: (session) => session.copySelectionRegionReference() },
        { id: "copy-selection-annotated-embed", name: "Copy selected region annotated embed", run: (session) => session.copySelectionAnnotatedEmbedBlock() },
        { id: "diagnose-pdf-annotation-overlay", name: "Diagnose PDF annotation overlay", run: (session) => session.diagnoseOverlayState() }
      ]
    );
    this.addCommand({
      id: "open-selection-region-reference-from-clipboard",
      name: "Open selection region reference from clipboard",
      callback: () => {
        void this.openRegionReferenceFromClipboard();
      }
    });
    this.registerEvent(this.app.workspace.on("active-leaf-change", () => {
      void this.syncSessions();
    }));
    this.registerEvent(this.app.workspace.on("file-open", () => {
      void this.syncSessions();
    }));
    this.registerEvent(this.app.workspace.on("layout-change", () => {
      void Promise.all(Array.from(this.sessions.values()).map((session) => session.refreshLayoutAndFlush()));
    }));
    this.registerEvent(this.app.vault.on("rename", (abstractFile, oldPath) => {
      if (!(abstractFile instanceof import_obsidian6.TFile) || abstractFile.extension.toLowerCase() !== "pdf") {
        return;
      }
      void this.store.migrateForRename(abstractFile, oldPath).catch(() => new import_obsidian6.Notice("Could not move annotation data. The original sidecar is preserved."));
    }));
    this.registerEvent(this.app.vault.on("delete", (abstractFile) => {
      if (!(abstractFile instanceof import_obsidian6.TFile) || abstractFile.extension.toLowerCase() !== "pdf") {
        return;
      }
      void this.deleteAnnotationSidecarForDeletedPdf(abstractFile);
    }));
    this.registerEvent(this.app.vault.on("modify", (file) => {
      if (file instanceof import_obsidian6.TFile) {
        this.annotatedEmbeds.refreshForPath(file.path);
      }
    }));
    void this.syncSessions();
  }
  onunload() {
    this.settingsController.dispose();
    for (const session of this.sessions.values()) {
      session.detach();
    }
    this.sessions.clear();
  }
  async deleteAnnotationSidecarForDeletedPdf(file) {
    try {
      const deleted = await this.store.deleteForPdfPath(file.path);
      if (deleted) {
        this.annotatedEmbeds.refreshForPath(`${file.path}.annot.json`);
        new import_obsidian6.Notice(`Deleted annotation data for ${file.name}.`);
      }
    } catch (error) {
      console.error(`freedraw-pdf: failed to delete annotation data for ${file.path}`, error);
      new import_obsidian6.Notice(`Could not delete annotation data for ${file.name}.`);
    }
  }
  openBlankAnnotatablePdfModal() {
    new BlankAnnotatablePdfModal(this.app, (options) => {
      void this.createBlankAnnotatablePdf(options);
    }).open();
  }
  async createBlankAnnotatablePdf(options) {
    var _a2;
    try {
      const activeFile = this.app.workspace.getActiveFile();
      const folderPrefix = ((_a2 = activeFile == null ? void 0 : activeFile.parent) == null ? void 0 : _a2.path) ? `${activeFile.parent.path}/` : "";
      const baseName = (options.title.trim() || "New annotatable PDF").replace(/[\\/:*?"<>|]/g, "-");
      const pageCount = clamp2(Math.round(options.pageCount), 1, 200);
      let path = `${folderPrefix}${baseName}.pdf`;
      let counter = 2;
      while (this.app.vault.getAbstractFileByPath(path)) {
        path = `${folderPrefix}${baseName} ${counter}.pdf`;
        counter += 1;
      }
      const templatePage = createTemplateNotebookPage("Page 1", options.template, options.pageSize, options.paperColor);
      const renderDimensions = getNotebookPageRenderDimensions(templatePage.pageSize, BLANK_PDF_EXPORT_WIDTH_PX);
      const paperDimensions = getNotebookPageSizeDimensions(templatePage.pageSize);
      const widthPt = templatePage.pageSize === "letter" ? 612 : 595.276 * paperDimensions.width / 920;
      const heightPt = templatePage.pageSize === "letter" ? 792 : widthPt * paperDimensions.height / paperDimensions.width;
      const pages = [];
      for (let index = 0; index < pageCount; index += 1) {
        const canvas = createEl("canvas");
        canvas.width = renderDimensions.width;
        canvas.height = renderDimensions.height;
        const context = canvas.getContext("2d");
        if (!context) {
          new import_obsidian6.Notice("Could not create blank PDF canvas.");
          return;
        }
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        pages.push({
          widthPx: canvas.width,
          heightPx: canvas.height,
          widthPt,
          heightPt,
          jpegBytes: new Uint8Array(dataUrlToArrayBuffer(canvas.toDataURL("image/jpeg", 0.92)))
        });
      }
      const pdfBytes = buildPdfFromJpegPages(pages);
      const pdfBuffer = new ArrayBuffer(pdfBytes.byteLength);
      new Uint8Array(pdfBuffer).set(pdfBytes);
      const pdfFile = await this.app.vault.createBinary(path, pdfBuffer);
      const annotationDocument = createEmptyDocument(pdfFile);
      annotationDocument.nativePageTemplatesEditable = true;
      annotationDocument.pdfPageTemplates = Array.from({ length: pageCount }, (_2, index) => ({
        page: index + 1,
        template: options.template,
        paperColor: options.paperColor,
        pageSize: options.pageSize
      }));
      await this.store.save(pdfFile, annotationDocument);
      new import_obsidian6.Notice(`Created ${pdfFile.name} (${pageCount} page${pageCount === 1 ? "" : "s"})`);
      await this.openPdfPage(pdfFile, 1);
    } catch (error) {
      console.error("freedraw-pdf: failed to create blank annotatable PDF", error);
      new import_obsidian6.Notice("Could not create blank annotatable PDF. Check the developer console for details.");
    }
  }
  getToolDefaults() {
    return this.settingsController.getToolDefaults();
  }
  getTextColor() {
    return this.settingsController.getTextColor();
  }
  shouldPreferInlineToolbar() {
    return this.settingsController.getInlineToolbarPreference() && !this.isPdfPlusEnabled();
  }
  getInlineToolbarPreference() {
    return this.settingsController.getInlineToolbarPreference();
  }
  getAutosaveDelayMs() {
    return this.settingsController.getAutosaveDelayMs();
  }
  shouldShowRegionToolbarButton() {
    return this.settingsController.shouldShowRegionToolbarButton();
  }
  shouldShowCopyEmbedToolbarButton() {
    return this.settingsController.shouldShowCopyEmbedToolbarButton();
  }
  shouldAutoCopyRegionEmbed() {
    return this.settingsController.shouldAutoCopyRegionEmbed();
  }
  shouldShowAnnotatedEmbedHeader() {
    return this.settingsController.shouldShowAnnotatedEmbedHeader();
  }
  shouldShowDrawingNotices() {
    return this.settingsController.shouldShowDrawingNotices();
  }
  shouldShowRenderTelemetry() {
    return this.settingsController.shouldShowRenderTelemetry();
  }
  getInkInputPolicy() {
    return this.settingsController.getInkInputPolicy();
  }
  getLivePreviewMode() {
    return this.settingsController.getLivePreviewMode();
  }
  getInkRenderSettings() {
    return this.settingsController.getInkRenderSettings();
  }
  getStoredPresets() {
    return this.settingsController.getStoredPresets();
  }
  getPreferredPdfInsertionSource() {
    const activeSession = this.getSessionForLeaf(this.getActivePdfLeaf());
    if (activeSession == null ? void 0 : activeSession.currentFile) {
      return {
        file: activeSession.currentFile,
        page: activeSession.activePage
      };
    }
    for (const session of this.sessions.values()) {
      if (session.currentFile) {
        return {
          file: session.currentFile,
          page: session.activePage
        };
      }
    }
    return null;
  }
  getPreferredPdfRegionInsertionSource() {
    var _a2;
    const activeRegion = (_a2 = this.getSessionForLeaf(this.getActivePdfLeaf())) == null ? void 0 : _a2.getActiveRegionEmbedSource();
    if (activeRegion) {
      return activeRegion;
    }
    for (const session of this.sessions.values()) {
      const region = session.getActiveRegionEmbedSource();
      if (region) {
        return region;
      }
    }
    return null;
  }
  getClipboard() {
    var _a2;
    if (!this.clipboard) {
      return null;
    }
    return {
      strokes: this.clipboard.strokes.map((stroke) => JSON.parse(JSON.stringify(stroke))),
      textItems: this.clipboard.textItems.map((item) => JSON.parse(JSON.stringify(item))),
      shapes: this.clipboard.shapes.map((shape) => JSON.parse(JSON.stringify(shape))),
      imageItems: ((_a2 = this.clipboard.imageItems) != null ? _a2 : []).map((image) => JSON.parse(JSON.stringify(image)))
    };
  }
  setClipboard(payload) {
    var _a2;
    this.clipboard = {
      strokes: payload.strokes.map((stroke) => JSON.parse(JSON.stringify(stroke))),
      textItems: payload.textItems.map((item) => JSON.parse(JSON.stringify(item))),
      shapes: payload.shapes.map((shape) => JSON.parse(JSON.stringify(shape))),
      imageItems: ((_a2 = payload.imageItems) != null ? _a2 : []).map((image) => JSON.parse(JSON.stringify(image)))
    };
    for (const session of this.sessions.values()) {
      if (session.isActive()) {
        session.refreshUiState();
      }
    }
  }
  hasClipboard() {
    var _a2, _b;
    return !!this.clipboard && (this.clipboard.strokes.length > 0 || this.clipboard.textItems.length > 0 || this.clipboard.shapes.length > 0 || ((_b = (_a2 = this.clipboard.imageItems) == null ? void 0 : _a2.length) != null ? _b : 0) > 0);
  }
  async openRegionReference(raw) {
    const reference = parseRegionReference(raw);
    if (!reference) {
      return false;
    }
    const file = this.app.vault.getAbstractFileByPath(reference.filePath);
    if (!(file instanceof import_obsidian6.TFile) || file.extension.toLowerCase() !== "pdf") {
      return false;
    }
    const leaf = this.app.workspace.getLeaf(true);
    await leaf.openFile(file);
    await this.syncSessions();
    const session = this.getSessionForLeaf(leaf);
    if (!session) {
      return false;
    }
    session.focusRegion(reference.page, reference.rect);
    return true;
  }
  async openRegionReferenceFromClipboard() {
    try {
      const raw = await readClipboardText();
      const opened = await this.openRegionReference(raw);
      if (!opened) {
        new import_obsidian6.Notice("Clipboard does not contain a valid selection region reference.");
        return;
      }
      new import_obsidian6.Notice("Opened selection region reference.");
    } catch (error) {
      console.error("freedraw-pdf: failed to open region reference from clipboard", error);
      new import_obsidian6.Notice("Could not read clipboard for region reference.");
    }
  }
  updateToolPreferences(snapshot, presets) {
    this.settingsController.updateToolPreferences(snapshot, presets);
  }
  updateTextColor(color) {
    this.settingsController.updateTextColor(color);
  }
  async updateBehaviorSettings(nextSettings) {
    await this.settingsController.updateBehaviorSettings(nextSettings);
  }
  async writeClipboardText(text) {
    await writeClipboardText(text);
  }
  buildAnnotatedPdfEmbedBlock(file, page, rect, width = 720) {
    return this.annotatedEmbeds.buildBlock(file, page, rect, width);
  }
  async copyAnnotatedPdfEmbedBlock(file, page, rect) {
    await this.annotatedEmbeds.copyBlock(file, page, rect);
  }
  refreshAnnotatedEmbedsForPath(path) {
    this.annotatedEmbeds.refreshForPath(path);
  }
  async openPdfFileAtPage(file, pageNumber) {
    await this.openPdfPage(file, pageNumber);
  }
  async openPdfPage(file, pageNumber, rect) {
    const leaf = this.app.workspace.getLeaf(true);
    await leaf.openFile(file);
    await this.syncSessions();
    const session = this.getSessionForLeaf(leaf);
    if (!session) {
      new import_obsidian6.Notice(`Opened ${file.name}. Page ${pageNumber} will be available after the PDF view finishes loading.`);
      return;
    }
    if (rect) {
      session.focusRegion(pageNumber, rect);
      return;
    }
    session.focusPage(pageNumber);
  }
  async toggleActiveSessionMode() {
    const session = await this.ensureActivePdfSession();
    if (!session) {
      new import_obsidian6.Notice("Open a PDF in Obsidian's built-in viewer first.");
      return;
    }
    session.toggleAnnotationMode();
  }
  async ensureActivePdfSession() {
    var _a2;
    const leaf = this.getActivePdfLeaf();
    if (!leaf) {
      return null;
    }
    let session = (_a2 = this.sessions.get(leaf)) != null ? _a2 : this.createSession(leaf);
    await session.attach();
    return session.isActive() ? session : null;
  }
  async syncSessions() {
    const keep = /* @__PURE__ */ new Set();
    for (const leaf of this.getOpenPdfLeaves()) {
      let session = this.sessions.get(leaf);
      if (!session) {
        session = this.createSession(leaf);
      }
      await session.attach();
      keep.add(leaf);
    }
    for (const [leaf, session] of this.sessions.entries()) {
      if (!keep.has(leaf)) {
        session.detach();
        this.sessions.delete(leaf);
      }
    }
  }
  getSessionForLeaf(leaf) {
    var _a2;
    return leaf ? (_a2 = this.sessions.get(leaf)) != null ? _a2 : null : null;
  }
  createSession(leaf) {
    const session = new NativePdfAnnotatorSession(this, leaf, this.store);
    this.sessions.set(leaf, session);
    return session;
  }
  isPdfPlusEnabled() {
    var _a2;
    const plugins = this.app.plugins;
    if (!plugins) {
      return false;
    }
    if (plugins.enabledPlugins) {
      return plugins.enabledPlugins.has("pdf-plus");
    }
    return Boolean((_a2 = plugins.plugins) == null ? void 0 : _a2["pdf-plus"]);
  }
  getActivePdfLeaf() {
    var _a2, _b;
    const leaf = (_b = (_a2 = this.app.workspace.getActiveViewOfType(import_obsidian6.FileView)) == null ? void 0 : _a2.leaf) != null ? _b : null;
    if (!leaf) {
      return null;
    }
    return this.isPdfLeaf(leaf) ? leaf : null;
  }
  getOpenPdfLeaves() {
    return this.app.workspace.getLeavesOfType("pdf").filter((leaf) => this.isPdfLeaf(leaf));
  }
  isPdfLeaf(leaf) {
    const view = leaf.view;
    const file = view.file;
    return !!(file && file.extension.toLowerCase() === "pdf");
  }
};

/* nosourcemap */