import {createActionGroup, props} from '@ngrx/store';

export const SyncActions = createActionGroup({
  source: 'Reconciliation Sync',
  events: {
    'Sync Requested': props<{ attempt: number }>(),
    'Sync Succeeded': props<{ syncedRecords: number }>(),
    'Sync Failed': props<{ error: string }>(),
  }
});
