import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of } from 'rxjs';
import { MockApiService } from '../../../core/mock-api.service';
import { ContractsActions } from './contracts.actions';

@Injectable()
export class ContractsEffects {
  private actions$ = inject(Actions);
  private api = inject(MockApiService);

  loadContracts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContractsActions.loadRequested),
      switchMap(({ forceFail }) =>
        this.api.getContracts(forceFail).pipe(
          map((contracts) => ContractsActions.loadSuccess({ contracts })),
          catchError((err: Error) => of(ContractsActions.loadFailure({ error: err.message })))
        )
      )
    )
  );
}
