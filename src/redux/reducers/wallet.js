import { TYPE_EXPENSE, TYPE_WALLET, TYPE_IS_ENABLE, TYPE_IS_EXPENSE_EDIT }
  from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const reducerWallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TYPE_WALLET:
    return {
      ...state,
      currencies: action.payload.currencies,
    };

  case TYPE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...action.payload.expense,
      ],
    };

  case TYPE_IS_ENABLE:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload.enableEdit,
    };

  case TYPE_IS_EXPENSE_EDIT:
    return {
      ...state,
      editor: false,
      idToEdit: 0,
      expenses: [
        ...action.payload.expensesEdit,
      ],
    };
  default:
    return state;
  }
};

export default reducerWallet;
