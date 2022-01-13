import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import { exchangeRates } from '../actions';
import fetchAPI from '../services/api';
import Table from '../components/Table';

const food = 'Alimentação';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  currencies: [],
  method: 'Dinheiro',
  methods: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
  tag: food,
  tags: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
};

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies = async () => {
    const filter = 'USDT';
    const rates = await fetchAPI();
    const currencies = Object.keys(rates)
      .filter((currency) => currency !== filter);

    this.setState({
      currencies,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  addExpense = () => {
    const { expenseDispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const formData = {
      value,
      description,
      currency,
      method,
      tag,
    };
    expenseDispatch(formData);

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: food,
    });
  }

  render() {
    const { email } = this.props;
    const { value,
      description, currency,
      currencies, method, methods,
      tag, tags } = this.state;
    return (
      <div>
        <Header
          showUser={ email }
          emailField="email-field"
          totalField="total-field"
          headerCurrencyField="header-currency-field"
        />

        <form className="wallet-box">
          <Input
            labelText="Value:"
            id="value-input"
            type="text"
            name="value"
            placeholder="Value"
            value={ value }
            onChange={ this.handleChange }
            nameClass="wallet-input"
          />
          <Input
            labelText="Description:"
            id="description-input"
            type="text"
            name="description"
            placeholder="Description"
            value={ description }
            onChange={ this.handleChange }
            nameClass="wallet-input"
          />
          <Select
            id="currency-input"
            labelName="Moeda:"
            onChange={ this.handleChange }
            value={ currency }
            options={ currencies }
            name="currency"
            testid={ currencies }
          />
          <Select
            id="method-input"
            labelName="Method:"
            onChange={ this.handleChange }
            value={ method }
            options={ methods }
            name="method"
          />
          <Select
            id="tag-input"
            labelName="Tag:"
            onChange={ this.handleChange }
            value={ tag }
            options={ tags }
            name="tag"
          />
          <Button
            labelName="Adicionar despesa"
            onClick={ this.addExpense }
          />
        </form>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  expenseDispatch: (value) => dispatch(exchangeRates(value)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenseDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
