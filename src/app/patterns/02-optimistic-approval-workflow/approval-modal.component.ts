import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApprovalActions } from './state/approval.actions';
import { selectApprovalItems } from './state/approval.selectors';

@Component({
  selector: 'app-approval-modal',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './approval-modal.component.html',
  styleUrl: './approval-modal.component.scss',
})
export class ApprovalModalComponent implements OnInit {
  private readonly store = inject(Store);

  protected readonly items = toSignal(this.store.select(selectApprovalItems), {
    initialValue: [],
  });

  ngOnInit(): void {
    this.store.dispatch(ApprovalActions.loadApprovals({ forceFail: false }));
  }

  protected approve(contractId: string): void {
    this.store.dispatch(ApprovalActions.approveContract({ contractId }));
  }
}
