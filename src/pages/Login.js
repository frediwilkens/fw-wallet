import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  validation = () => {
    const { email, password } = this.state;
    const numberValidation = 6;
    const emailValidation = (/\S+@\S+\.\S+/).test(email);
    const passwordValidation = password.length < numberValidation;
    return !emailValidation || passwordValidation;
  }

  dispatchAndPush = () => {
    const { history, userDispatch } = this.props;
    const { email } = this.state;
    userDispatch(email);
    history.push('/wallet');
  }

  render() {
    const { email, password } = this.state;
    return (
      <form>
        <fieldset className="login-box">
          <h1 className="title">LOGIN</h1>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="email"
            value={ email }
            onChange={ this.handleChange }
            id="email-input"
          />

          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="password"
            value={ password }
            onChange={ this.handleChange }
            id="password-input"
          />

          <button
            type="button"
            disabled={ this.validation() }
            onClick={ this.dispatchAndPush }
            id="login-btn"
          >
            Sign in
          </button>

        </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userDispatch: (value) => dispatch(userLogin(value)),
});

Login.propTypes = {
  userDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
