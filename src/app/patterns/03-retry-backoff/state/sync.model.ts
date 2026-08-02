export type SyncStatus = 'idle' | 'syncing' | 'succeeded' | 'failed';

// This is the shape the component expects from the selectSyncViewModel
// selector. Your reducer doesn't have to store state in exactly this
// shape - the selector just needs to project into this at the end.

export interface SyncViewModel {
  status: SyncStatus;
  attempt: number;
  maxAttempts: number;
  error: string | null;
}

export const INITIAL_SYNC_VIEW: SyncViewModel = {
  status: 'idle',
  attempt: 0,
  maxAttempts: 3,
  error: null,
};
