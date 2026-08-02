import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ContractsActions } from './state/contracts.actions';
import {
  selectAllContracts,
  selectContractsError,
  selectContractsLoading,
  selectTotalPendingAmount,
} from './state/contracts.selectors';

@Component({
  selector: 'app-contracts-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contracts-list.component.html',
  styleUrl: './contracts-list.component.scss',
})
export class ContractsListComponent implements OnInit {
  private store = inject(Store);

  protected contracts = this.store.selectSignal(selectAllContracts);
  protected loading = this.store.selectSignal(selectContractsLoading);
  protected totalPending = this.store.selectSignal(selectTotalPendingAmount);
  protected error = this.store.selectSignal(selectContractsError);

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.store.dispatch(ContractsActions.loadRequested({}));
  }

  simulateFailure(): void {
    this.store.dispatch(ContractsActions.loadRequested({ forceFail: true }));
  }
}
