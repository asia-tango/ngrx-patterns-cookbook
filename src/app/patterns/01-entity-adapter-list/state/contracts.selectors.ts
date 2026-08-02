import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContractsState, contractsAdapter } from './contracts.reducer';

export const selectContractsState = createFeatureSelector<ContractsState>('contracts');

const { selectAll, selectTotal } = contractsAdapter.getSelectors(selectContractsState);

export const selectAllContracts = selectAll;
export const selectContractsLoading = createSelector(selectContractsState, (s) => s.loading);
export const selectContractsError = createSelector(selectContractsState, (s) => s.error);

export const selectTotalPendingAmount = createSelector(selectAllContracts, (contracts) =>
  contracts.filter((c) => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0)
);

export const selectContractsCount = selectTotal;
