// Coloque aqui suas actions
import getCurrency from '../../services/Api';

const TYPE_USER = 'TYPE_USER';
const TYPE_WALLET = 'TYPE_WALLET';
const TYPE_FAIL = 'TYPE_FAIL';
const TYPE_EXPENSE = 'TYPE_EXPENSE';
const TYPE_IS_FETCH = 'TYPE_IS_FETCH';
const TYPE_IS_ENABLE = 'TYPE_IS_ENABLE';
const TYPE_IS_EXPENSE_EDIT = 'TYPE_IS_EXPENSE_EDIT';

const actUser = (payload) => ({
  type: TYPE_USER,
  payload,
});

const actWallet = (wallet) => ({
  type: TYPE_WALLET,
  payload: {
    currencies: wallet,
  },
});

const actFail = () => ({
  type: TYPE_FAIL,
});

const actIsFetch = () => ({
  type: TYPE_IS_FETCH,
});

const actEnableEdit = (enableEdit) => ({
  type: TYPE_IS_ENABLE,
  payload: {
    enableEdit,
  },
});

const actExpenseEdit = (expensesEdit) => ({
  type: TYPE_IS_EXPENSE_EDIT,
  payload: {
    expensesEdit,
  },
});

const actExpense = (expense) => ({
  type: TYPE_EXPENSE,
  payload: {
    expense,
  },
});

function fetchWithThunk() {
  return async (dispatch) => {
    dispatch(actIsFetch());
    try {
      const wallet = await getCurrency();
      const arrayCurrencies = Object.keys(wallet).filter((currency) => (
        currency !== 'USDT' ? currency : null
      ));
      dispatch(actWallet(arrayCurrencies));
    } catch (err) {
      dispatch(actFail());
    }
  };
}

export {
  TYPE_USER,
  TYPE_WALLET,
  TYPE_IS_ENABLE,
  TYPE_EXPENSE,
  TYPE_IS_EXPENSE_EDIT,
  actUser,
  actWallet,
  actFail,
  actIsFetch,
  fetchWithThunk,
  actExpense,
  actEnableEdit,
  actExpenseEdit,
};
