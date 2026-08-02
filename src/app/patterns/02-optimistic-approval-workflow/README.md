# 02 — Approve & Rollback (Optimistic Update)

> **Note:** despite the name, the current implementation is a
> confirm-then-update pattern, not a true optimistic update — there's no
> rollback, because `status` is never changed ahead of the server's
> response. See the last pitfall below for what a true optimistic version
> would require.

## When to use it
When an action needs backend confirmation before the UI can safely show its
result (approving a request, applying a payment, anything where the server
is the source of truth), but the user still needs immediate feedback that
something is happening.

## How it works
Dispatching `approveContract` doesn't change the item's `status` — it only
flips `isSaving: true` on that item, so the UI can show a loading state
("Approving…") without pretending the outcome is already known. The effect
then calls the API in the background:
- on success, `approveContractSuccess` sets `status: 'approved'` and clears
  `isSaving`
- on failure, `approveContractFailure` clears `isSaving` and attaches the
  `error` — `status` is left untouched, so it naturally stays `'pending'`

## Pitfalls
- Don't skip the `isSaving` flag — without it, the UI gives no feedback
  between click and response, and a slow network makes the action feel
  broken or unresponsive.
- If the user can trigger the same action twice in quick succession (double
  click, or approving two different items in a row), make sure `isSaving`
  and `error` are scoped to the right item by id — don't rely on "the last
  one clicked".
- A true optimistic version would set `status: 'approved'` synchronously in
  `approveContract`, before the API call resolves, and roll it back to
  `'pending'` in `approveContractFailure`. That's a different, slightly more
  complex trade-off — instant UI feedback, at the cost of occasionally
  showing a status that gets reverted a moment later.
