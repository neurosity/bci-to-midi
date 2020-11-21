const { pipe, from, interval } = require("rxjs");
const { switchMap, scan, zip, map } = require("rxjs/operators");
const linspace = require("linspace");

function tween({ to = [0, 1], iterations = 20 } = {}) {
  return pipe(
    map((metric) =>
      mapRange({
        value: metric.probability,
        to
      })
    ),
    scan(([, prev], next) => [prev, next], [0, 0]),
    switchMap(([prev, next]) =>
      from(linspace(prev, next, iterations)).pipe(
        zip(interval(1000 / iterations), (value) => value)
      )
    )
  );
}

function mapRange({ value, from = [0, 1], to = [0, 1] } = {}) {
  const [fromMin, fromMax] = from;
  const target = clamp(value, fromMin, fromMax);
  const [toMin, toMax] = to;
  return (
    ((target - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin
  );
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

module.exports = { tween };
