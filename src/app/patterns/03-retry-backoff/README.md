# 03 — Retry & Backoff

## When to use it
When a request talks to something flaky by nature (a sync job, a third-party
service, a batch operation) and a single transient failure shouldn't be
treated the same as a real, final failure. The user shouldn't have to
manually click "retry" for a problem that fixes itself half a second later.

## How it works
Instead of hiding retries inside an RxJS operator like `retry()`, each
attempt is its own dispatched action: `syncRequested({ attempt })`. The
effect calls the API; on success it dispatches `syncSucceeded`, and on
failure it decides — inside the effect, not the reducer — whether to try
again:
- if `attempt < maxAttempts`, wait for a backoff delay and dispatch
  `syncRequested({ attempt: attempt + 1 })`
- if attempts are exhausted, dispatch `syncFailed` with the last error

Because every attempt is a real action, the whole retry sequence shows up in
the State Inspector log as separate entries — nothing is hidden inside a
stream operator, which makes this pattern much easier to debug and reason
about than a "silent" `retry()` chain.

## Pitfalls
- **Always back off between attempts.** Retrying immediately after a failure
  (a "retry storm") can make an already-struggling backend worse, not
  better — the backoff delay should grow with the attempt number, not stay
  fixed.
- **Always cap the number of attempts.** Without `maxAttempts`, a
  consistently-failing request retries forever, silently burning resources
  and never surfacing an error to the user.
- Don't let intermediate failures reach the reducer as a "real" failure
  state — the UI shouldn't flash an error message on attempt 1 of 3 just
  because it happened to fail; only the final, exhausted failure should be
  user-visible.
