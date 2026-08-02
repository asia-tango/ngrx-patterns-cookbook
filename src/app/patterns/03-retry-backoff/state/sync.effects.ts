import {inject, Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {MockApiService} from "../../../core/mock-api.service";
import {map, catchError, of, switchMap, timer} from "rxjs";
import {SyncActions} from "./sync.actions";

@Injectable()
export class SyncEffects {
  private actions$ = inject(Actions);
  private api = inject(MockApiService);
  private maxAttempts = 3;

  sync$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SyncActions.syncRequested),
      switchMap(({ attempt }) =>
        this.api.syncReconciliation().pipe(
          map((syncedRecords) => 
            SyncActions.syncSucceeded(syncedRecords)
          ),
          catchError((err: Error) => {
            if (attempt < this.maxAttempts) {
              // Retry after a delay, with exponential backoff 
              return timer(exponentialBackoffMs(attempt)).pipe(
                map(() => SyncActions.syncRequested({ attempt: attempt + 1 }))
              );
            } else {
              return of (SyncActions.syncFailed({ error: err.message }));
            }
          })
        )
      )
    )
  );
}

// Delay grows exponentially (500ms → 1000ms → 2000ms...) instead of linearly
// the goal isn't just 'wait a bit', it's giving the backend increasingly more
// time to recover after each failed attempt. Linear growth adds the same
// fixed increment every time and scales poorly with more attempts;
function exponentialBackoffMs(attempt: number): number {
  const baseDelayMs = 500;
  return baseDelayMs * 2 ** (attempt - 1);
}