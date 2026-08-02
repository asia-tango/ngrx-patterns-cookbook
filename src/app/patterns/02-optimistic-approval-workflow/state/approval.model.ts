import { Contract } from '../../../core/mock-api.service';

export interface ApprovalItem extends Contract {
  isSaving: boolean;
  error: string | null;
}
