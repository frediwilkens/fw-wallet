import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { showUser, showTotal, emailField,
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
            { showTotal }
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

Header.propTypes = {
  showUser: PropTypes.string.isRequired,
  showTotal: PropTypes.string.isRequired,
  emailField: PropTypes.string.isRequired,
  totalField: PropTypes.string.isRequired,
  headerCurrencyField: PropTypes.string.isRequired,
};

export default Header;
