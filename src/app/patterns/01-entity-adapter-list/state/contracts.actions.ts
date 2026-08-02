import { createActionGroup, props } from '@ngrx/store';
import { Contract } from '../../../core/mock-api.service';

export const ContractsActions = createActionGroup({
  source: 'Contracts List',
  events: {
    'Load Requested': props<{ forceFail?: boolean }>(),
    'Load Success': props<{ contracts: Contract[] }>(),
    'Load Failure': props<{ error: string }>(),
  },
});
