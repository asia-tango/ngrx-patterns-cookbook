import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { contractsReducer } from './patterns/01-entity-adapter-list/state/contracts.reducer';
import { ContractsEffects } from './patterns/01-entity-adapter-list/state/contracts.effects';
import { approvalsReducer } from './patterns/02-optimistic-approval-workflow/state/approval.reducer';
import { ApprovalEffects } from './patterns/02-optimistic-approval-workflow/state/approval.effects';
import {SyncEffects} from './patterns/03-retry-backoff/state/sync.effects';
import {syncReducer} from './patterns/03-retry-backoff/state/sync.reducer';

export const routes: Routes = [
  { path: '', redirectTo: 'patterns/entity-adapter', pathMatch: 'full' },
  {
    path: 'patterns/entity-adapter',
    providers: [provideState('contracts', contractsReducer), provideEffects(ContractsEffects)],
    loadComponent: () =>
      import('./patterns/01-entity-adapter-list/contracts-list.component').then(
        (m) => m.ContractsListComponent
      ),
  },
  {
    path: 'patterns/optimistic-approval',
    providers: [provideState('approvals', approvalsReducer), provideEffects(ApprovalEffects)],
    loadComponent: () =>
      import('./patterns/02-optimistic-approval-workflow/approval-modal.component').then(
        (m) => m.ApprovalModalComponent
      ),
  },
  {
    path: 'patterns/retry-backoff',
    providers: [provideState('sync', syncReducer), provideEffects(SyncEffects)],
    loadComponent: () =>
      import('./patterns/03-retry-backoff/reconciliation-sync.component').then(
        (m) => m.ReconciliationSyncComponent
      ),
  },
];
