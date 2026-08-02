import { Injectable, signal } from '@angular/core';
import { Action, ActionReducer } from '@ngrx/store';

export interface LoggedAction {
  id: number;
  type: string;
  payloadPreview: string;
  timestamp: string;
  stateAfter: unknown;
}

// Central log service for all dispatched actions.
// Wired in via `logActionsMetaReducer` in app.config.ts,
// so any number of `<app-state-inspector>` panels can
// subscribe to it - no need for a separate subscription per pattern.

@Injectable({ providedIn: 'root' })
export class ActionLogService {
  private nextId = 1;
  readonly log = signal<LoggedAction[]>([]); // signal - public, read-only from outside

  record(action: Action, stateAfter: unknown): void {
    const { type, ...payload } = action as Action & Record<string, unknown>;

    const entry: LoggedAction = {
      id: this.nextId++,
      type,
      payloadPreview: this.safePreview(payload),
      timestamp: new Date().toLocaleTimeString('uk-UA', { hour12: false }),
      stateAfter,
    };

    this.log.update((entries) => [entry, ...entries].slice(0, 50));
  }

  clear(): void {
    this.log.set([]);
  }

  private safePreview(payload: Record<string, unknown>): string {
    try {
      const keys = Object.keys(payload);
      if (keys.length === 0) return '{}';
      return JSON.stringify(payload);
    } catch {
      return '(unserializable payload)';
    }
  }
}

// Meta-reducer — wraps EVERY reducer in the store.
// This is the mechanism that lets the inspector see everything,
// without reaching into each individual feature reducer by hand.

export function createActionLogMetaReducer(actionLog: ActionLogService) {
  return function actionLogMetaReducer(reducer: ActionReducer<unknown>): ActionReducer<unknown> {
    return (state, action) => {
      const nextState = reducer(state, action);

      if (!action.type.startsWith('@ngrx')) {
        actionLog.record(action, nextState);
      }
      return nextState;
    };
  };
}
