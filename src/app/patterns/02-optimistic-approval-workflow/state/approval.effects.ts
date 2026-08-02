import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { MockApiService } from '../../../core/mock-api.service';
import { ApprovalActions } from './approval.actions';

@Injectable()
export class ApprovalEffects {
  private actions$ = inject(Actions);
  private api = inject(MockApiService);

  loadApprovals$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApprovalActions.loadApprovals),
      switchMap(({ forceFail }) =>
        this.api.getContracts(forceFail).pipe(
          map((contracts) =>
            ApprovalActions.loadApprovalsSuccess({
              approvals: contracts.map((contract) => ({
                ...contract,
                isSaving: false,
                error: null,
              })),
            })
          ),
          catchError((err: Error) =>
            of(ApprovalActions.loadApprovalsFailure({ error: err.message }))
          )
        )
      )
    )
  );

  approveContract$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApprovalActions.approveContract),
      switchMap(({ contractId }) =>
        this.api.approveContract(contractId).pipe(
          map(() => ApprovalActions.approveContractSuccess({ contractId })),
          catchError((err: Error) =>
            of(
              ApprovalActions.approveContractFailure({
                contractId,
                error: err.message,
              })
            )
          )
        )
      )
    )
  );
}
