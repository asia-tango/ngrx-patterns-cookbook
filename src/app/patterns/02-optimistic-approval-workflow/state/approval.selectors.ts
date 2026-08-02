import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApprovalsState } from './approval.reducer';

export const selectApprovalsState = createFeatureSelector<ApprovalsState>('approvals');

export const selectApprovalItems = createSelector(
  selectApprovalsState,
  (state) => state.approvals
);

export const selectApprovalsLoading = createSelector(
  selectApprovalsState,
  (state) => state.loading
);

export const selectApprovalsError = createSelector(
  selectApprovalsState,
  (state) => state.error
);
