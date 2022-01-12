// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { NEW_EXPENSE } from '../actions';

export const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: '0',
};

export const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEW_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          ...action.payload.expense,
          id: state.expenses.length,
          exchangeRates: action.payload.rates,
        },
      ],
      total: (parseFloat(state.total) + (
        parseFloat(action.payload.expense.value)
        * parseFloat(action.payload.rates[action.payload.expense.currency].ask)
      )).toFixed(2).toString(),
    };
  default:
    return state;
  }
};
