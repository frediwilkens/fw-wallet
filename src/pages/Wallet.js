import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      total: '0',
    };
  }

  render() {
    const { email } = this.props;
    const { total } = this.state;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">
            { email }
          </h2>
          <h2>
            Total:
            {' '}
            <span data-testid="total-field">
              { total }
            </span>
            {' '}
            <span data-testid="header-currency-field">
              BRL
            </span>
          </h2>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
