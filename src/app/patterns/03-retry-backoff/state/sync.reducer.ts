import {createReducer, on} from "@ngrx/store";
import {SyncActions} from "./sync.actions";
import {SyncStatus} from "./sync.model";

export interface SyncState {
  status: SyncStatus;
  attempt: number;
  maxAttempts: number;
  error: string | null;
}

export const initialState: SyncState = {
  status: 'idle',
  attempt: 0,
  maxAttempts: 3,
  error: null,
};

export const syncReducer = createReducer(
  initialState,
  on(SyncActions.syncRequested, (state, { attempt }) => ({
    ...state,
    status: 'syncing',
    attempt,
    error: null,
  })),
  on(SyncActions.syncSucceeded, (state) => ({
    ...state,
    status: 'succeeded',
    error: null,
  })),
  on(SyncActions.syncFailed, (state, { error }) => ({
    ...state,
    status: 'failed',
    error,
  }))
)
