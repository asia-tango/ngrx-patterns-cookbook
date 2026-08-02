# NgRx Patterns Cookbook

A living reference of practical NgRx patterns for enterprise applications -
NOT a "todo list" tutorial, but vertical slices of real-world cases (approval
workflow, large lists, error handling), each with a component, full state,
and tests.

**🔗 Live demo:** _(link after deployment)_

Each pattern has its own **State Inspector** panel on the right - see every
dispatched action and the current state in real time, without opening
DevTools.

## Tech stack

- **Angular 21** - standalone components, signals
- **NgRx** (`@ngrx/store`, `@ngrx/effects`, `@ngrx/entity`) - state management
- **TypeScript 5.9**
- **RxJS 7**
- **Vitest** - unit tests, via Angular's native `@angular/build:unit-test` builder (only pattern 01 has coverage so far, more planned in a follow-up PR)

## Patterns

| # | Pattern | Status | What it illustrates |
|---|---|---|---|
| 01 | [Entity Adapter List](src/app/patterns/01-entity-adapter-list/README.md) | ✅ done | normalized state for large lists, memoized selectors |
| 02 | [Approve & Rollback](src/app/patterns/02-optimistic-approval-workflow/README.md) | ✅ done | pending state + error handling on approve (confirm-then-update — see pattern README) |
| 03 | [Retry & Backoff](src/app/patterns/03-retry-backoff/README.md) | ✅ done | exponential backoff retry logic in effects |
| 04 | Live Update with Deferred Apply | 📅 planned | WebSocket + HTTP writing to the same entity state, buffering a change until user consent |
| 05 | NgRx Store vs Signal Store | 📅 planned | same use case, two implementations side by side |

## Running locally

```bash
npm install
npm start
```

Opens at `http://localhost:4200`.

## Tests

```bash
ng test
```

Tests focus on state logic (reducers/selectors), not UI rendering. So far
only pattern 01 (`contracts.reducer.spec.ts`) has coverage — tests for the
other patterns are planned in a follow-up PR.

## Deploy

```bash
npm run deploy
```

(or connect Vercel/Netlify directly to the repo — that works out of the box too)
