// Coloque aqui suas actions
import fetchAPI from '../services/api';

export const USER_LOGIN = 'USER_LOGIN';
export const NEW_EXPENSE = 'NEW_EXPENSE';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export const newExpense = (state, rates) => ({
  type: NEW_EXPENSE,
  payload: {
    expense: { ...state },
    rates,
  },
});

export const exchangeRates = (state) => (
  async (dispatch) => {
    const rates = await fetchAPI();
    return dispatch(newExpense(state, rates));
  }
);
