# 01 — Entity Adapter List

## When to use it
When you have a list of entities (contracts, users, orders) that:
- gets updated partially and often (a single record, not the whole array)
- needs fast lookup by id (e.g. from another part of the store)
- has sorting/filtering that shouldn't be recomputed on every CD cycle

## Why not a plain array in state
An array + `.find()`/`.map()` on every update is O(n) per operation, and it's
easy to slip into "accidental" mutation. `@ngrx/entity` gives you a normalized
shape `{ ids: string[], entities: { [id]: T } }` — O(1) lookup by id, plus
ready-made CRUD helpers (`setAll`, `upsertOne`, `updateOne`, `removeOne`)
without manual array mapping.

## Pitfalls
- **`sortComparer` runs on every upsert**, not only on read — for very large
  lists (10k+) this can end up costing more than sorting "on the fly" in a
  selector. Profile it if your list is big.
- Don't keep derived data (like "pending total") inside the entity state
  itself — compute it in a memoized selector (see `selectTotalPendingAmount`),
  otherwise you risk it going out of sync on a partial update.
- `selectId` needs to be stable — if the backend sometimes returns `id` as a
  `number` and sometimes as a `string`, the adapter will silently create
  duplicates.
