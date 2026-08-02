import { createActionGroup, props } from '@ngrx/store';
import { ApprovalItem } from './approval.model';

export const ApprovalActions = createActionGroup({
  source: 'Approval Workflow',
  events: {
    'Load Approvals': props<{ forceFail?: boolean }>(),
    'Load Approvals Success': props<{ approvals: ApprovalItem[] }>(),
    'Load Approvals Failure': props<{ error: string }>(),

    'Approve Contract': props<{ contractId: string }>(),
    'Approve Contract Success': props<{ contractId: string }>(),
    'Approve Contract Failure': props<{ contractId: string; error: string }>(),
  },
});
