import {createFeatureSelector, createSelector} from "@ngrx/store";
import {SyncViewModel} from "./sync.model";

export const selectSyncViewModel = createFeatureSelector<SyncViewModel>('sync');

export const selectSyncStatus = createSelector(
  selectSyncViewModel,
  (state) => state.status
);

export const selectSyncError = createSelector(
  selectSyncViewModel,
  (state) => state.error
);

export const selectSyncSyncing = createSelector(
  selectSyncViewModel,
  (state) => state.status === 'syncing'
);
