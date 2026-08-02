import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Contract {
  id: string;
  name: string;
  amount: number;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
}

const SEED: Contract[] = [
  { id: 'c1', name: 'Acme Corp — Q3 Renewal', amount: 42000, status: 'pending' },
  { id: 'c2', name: 'Globex — New Deal', amount: 18500, status: 'draft' },
  { id: 'c3', name: 'Initech — Support Plan', amount: 7200, status: 'approved' },
  { id: 'c4', name: 'Umbrella — Enterprise', amount: 96000, status: 'pending' },
  { id: 'c5', name: 'Soylent — Pilot', amount: 3100, status: 'rejected' },
];

/**
 * Fake backend. The key part here is the controlled delay and the ability
 * to force a failure (approveContract simulates a 30% failure chance),
 * so there's something to show in the effects error-handling and retry patterns.
 */
@Injectable({ providedIn: 'root' })
export class MockApiService {
  private data = [...SEED];

  /**
   * forceFail - for the "Simulate error" button in the UI. This way the demo
   * doesn't depend on randomness (with the real 30% chance you could click for
   * a while and never hit the failure branch) - it shows it reliably, on click.
   */
  getContracts(forceFail = false): Observable<Contract[]> {
    if (forceFail) {
      return throwError(() => new Error('Simulated network failure')).pipe(delay(600));
    }
    return of([...this.data]).pipe(delay(600));
  }

  approveContract(id: string): Observable<Contract> {
    const contract = this.data.find((c) => c.id === id);
    if (!contract) {
      return throwError(() => new Error('Contract not found')).pipe(delay(400));
    }

    // 30% chance of a "server-side" rejection - intentional, to demonstrate the error-handling path
    const shouldFail = Math.random() < 0.3;
    if (shouldFail) {
      return throwError(() => new Error('Approval rejected by validation service')).pipe(delay(800));
    }

    contract.status = 'approved';
    return of({ ...contract }).pipe(delay(800));
  }

  syncReconciliation(): Observable<{ syncedRecords: number }> {
    const shouldFail = Math.random() < 0.5;
    if (shouldFail) {
      return throwError(() => new Error('Reconciliation service timeout')).pipe(delay(500));
    }
    return of({ syncedRecords: 128 }).pipe(delay(500));
  }
}
