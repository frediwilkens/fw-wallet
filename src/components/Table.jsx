import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  constructor() {
    super();

    this.deleteExpense = this.deleteExpense.bind(this);
  }

  deleteExpense({ target }) {
    const { expenses, deleteDispatch } = this.props;
    const numberName = parseInt(target.name, 10);

    const neoExpenses = expenses.filter(({ id }) => id !== numberName);

    const total = neoExpenses.reduce((prev, curr) => {
      const currencyValue = parseFloat(curr.exchangeRates[curr.currency].ask);
      const conversion = parseFloat(curr.value) * currencyValue;
      return prev + conversion;
    }, 0);

    deleteDispatch(neoExpenses, total);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Tag</th>
            <th>Payment Method</th>
            <th>Value</th>
            <th>Currency</th>
            <th>Exchange Rate</th>
            <th>Converted Value</th>
            <th>Conversion Currency</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => {
              const { description, tag,
                method, value, id,
                currency, exchangeRates } = expense;

              const completeName = exchangeRates[currency].name;
              const currencyName = completeName.split('/');
              const conversion = (Number(exchangeRates[currency].ask));
              const conv = (Number(value) * Number(conversion)).toFixed(2);

              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ currencyName[0] }</td>
                  <td>{ conversion.toFixed(2) }</td>
                  <td>{ conv }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      data-testid="delete-btn"
                      name={ id }
                      onClick={ this.deleteExpense }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDispatch: (neoExpe, subtract) => dispatch(deleteExpense(neoExpe, subtract)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
