import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { SyncActions } from './state/sync.actions';
import { selectSyncViewModel } from './state/sync.selectors';
import { INITIAL_SYNC_VIEW } from './state/sync.model';

@Component({
  selector: 'app-reconciliation-sync',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reconciliation-sync.component.html',
  styleUrl: './reconciliation-sync.component.scss',
})
export class ReconciliationSyncComponent {
  private readonly store = inject(Store);

  protected readonly sync = toSignal(this.store.select(selectSyncViewModel), {
    initialValue: INITIAL_SYNC_VIEW,
  });

  protected start(): void {
    // firts try - attempt: 1. Next attempts dispatch effect.
    this.store.dispatch(SyncActions.syncRequested({ attempt: 1 }));
  }
}
