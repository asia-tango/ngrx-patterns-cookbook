import { contractsReducer, contractsAdapter } from './contracts.reducer';
import { ContractsActions } from './contracts.actions';
import { Contract } from '../../../core/mock-api.service';

describe('contractsReducer', () => {
  const mockContracts: Contract[] = [
    { id: 'a', name: 'A', amount: 100, status: 'pending' },
    { id: 'b', name: 'B', amount: 200, status: 'draft' },
  ];

  it('should set loading=true on loadRequested', () => {
    const state = contractsReducer(undefined, ContractsActions.loadRequested());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should normalize contracts into entities on loadSuccess', () => {
    const state = contractsReducer(undefined, ContractsActions.loadSuccess({ contracts: mockContracts }));
    expect(state.loading).toBe(false);
    expect(state.ids.length).toBe(2);
    expect(state.entities['a']?.name).toBe('A');
  });

  it('should set error and stop loading on loadFailure', () => {
    const state = contractsReducer(undefined, ContractsActions.loadFailure({ error: 'boom' }));
    expect(state.loading).toBe(false);
    expect(state.error).toBe('boom');
  });

  it('sortComparer should order by amount descending', () => {
    const state = contractsReducer(undefined, ContractsActions.loadSuccess({ contracts: mockContracts }));
    const all = contractsAdapter.getSelectors().selectAll(state);
    expect(all[0].id).toBe('b'); // 200 > 100
  });
});
