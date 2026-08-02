import {ApprovalItem} from "./approval.model";
import {createReducer, on} from "@ngrx/store";
import {ApprovalActions} from "./approval.actions";

export interface ApprovalsState {
  approvals: ApprovalItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ApprovalsState = {
  approvals: [],
  loading: false,
  error: null,
};

export const approvalsReducer = createReducer(
  initialState,
  on(ApprovalActions.loadApprovals, (state) => ({ ...state, loading: true, error: null })),
  on(ApprovalActions.loadApprovalsSuccess, (state, {approvals}) => ({...state, approvals, loading: false})),
  on(ApprovalActions.loadApprovalsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(ApprovalActions.approveContract, (state, { contractId }) => ({
    ...state,
    approvals: state.approvals.map((approval) =>
      approval.id === contractId
        ? { ...approval, isSaving: true, error: null } 
        : approval
    )
  })),
  on(ApprovalActions.approveContractSuccess, (state, { contractId }) => ({
    ...state,
     approvals: state.approvals.map((approval) =>
      approval.id === contractId
        ? { ...approval, status: 'approved', isSaving: false, error: null }
        : approval
    )
  })),
  on(ApprovalActions.approveContractFailure, (state, { contractId, error }) => ({
    ...state,
    approvals: state.approvals.map((approval) =>
      approval.id === contractId
        ? { ...approval, isSaving: false, error }
        : approval
    )
  })),
)
