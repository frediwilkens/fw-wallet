// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { DELETE_EXPENSE, NEW_EXPENSE } from '../actions';

export const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

export const wallet = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case NEW_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          ...payload.expense,
          id: state.expenses.length,
          exchangeRates: payload.rates,
        },
      ],
      total: (state.total) + (
        parseFloat(payload.expense.value)
        * parseFloat(payload.rates[payload.expense.currency].ask)
      ),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload.neoExpe,
      total: payload.subtracted,
    };
  default:
    return state;
  }
};
