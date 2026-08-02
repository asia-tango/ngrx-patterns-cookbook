import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Contract } from '../../../core/mock-api.service';
import { ContractsActions } from './contracts.actions';

export interface ContractsState extends EntityState<Contract> {
  loading: boolean;
  error: string | null;
}

//  WHY Entity Adapter instead of a plain array in state:
// - O(1) access by id instead of .find() over the whole array on every selector
// - ready-made CRUD helpers (upsertOne, updateOne, removeOne) without manual array mapping
// - normalized state shape { ids: [], entities: {} } — critical
// - when the list is large (hundreds-thousands of records) and updated partially, often
 
export const contractsAdapter: EntityAdapter<Contract> = createEntityAdapter<Contract>({
  selectId: (c) => c.id,
  sortComparer: (a, b) => b.amount - a.amount,
});

const initialState: ContractsState = contractsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const contractsReducer = createReducer(
  initialState,
  on(ContractsActions.loadRequested, (state) => ({ ...state, loading: true, error: null })),
  on(ContractsActions.loadSuccess, (state, { contracts }) =>
    contractsAdapter.setAll(contracts, { ...state, loading: false })
  ),
  on(ContractsActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
