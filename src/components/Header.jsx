import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  getTotal = () => {
    const { expenses } = this.props;
    return expenses.reduce((prev, curr) => {
      const currencyValue = Number(curr.exchangeRates[curr.currency].ask);
      const newTotal = currencyValue * Number(curr.value);
      return prev + newTotal;
    }, 0).toFixed(2);
  };

  render() {
    const { showUser, emailField,
      totalField, headerCurrencyField } = this.props;
    return (
      <header>
        <h2 data-testid={ emailField }>
          { showUser }
        </h2>
        <h2>
          Total:
          {' '}
          <span data-testid={ totalField }>
            { this.getTotal() }
          </span>
          {' '}
          <span data-testid={ headerCurrencyField }>
            BRL
          </span>
        </h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  showUser: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  emailField: PropTypes.string.isRequired,
  totalField: PropTypes.string.isRequired,
  headerCurrencyField: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
