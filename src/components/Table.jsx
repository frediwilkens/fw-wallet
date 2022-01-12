import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense, index) => {
              const { description, tag,
                method, value,
                currency, exchangeRates } = expense;

              const completeName = exchangeRates[currency].name;
              const currencyName = completeName.split('/');
              const conver = parseFloat(value) * parseFloat(exchangeRates[currency].ask);

              return (
                <tr key={ index }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ currencyName[0] }</td>
                  <td>{ parseFloat(exchangeRates[currency].ask).toFixed(2) }</td>
                  <td>{ (conver).toFixed(2) }</td>
                  <td>Real</td>
                  <td>Editar/Excluir</td>
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

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
};

Table.defaultProps = {
  expenses: {},
};

export default connect(mapStateToProps, null)(Table);
