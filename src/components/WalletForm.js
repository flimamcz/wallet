import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actExpense, fetchWithThunk, actExpenseEdit } from '../redux/actions/index';
import getCurrency from '../services/Api';
import '../styles/walletForm.css'

class WalletForm extends Component {
  state = {
    storeExpenses: [],
    value: '',
    description: '',
    currency: 'USD',
    method: 'Cartão de crédito',
    tag: 'Alimentação',
    disabled: true,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchWithThunk());
  }

  fetchCurrency = async () => {
    const currencies = await getCurrency();
    delete currencies.USDT;
    return currencies;
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      const { value } = this.state;
      if(value.length > 0) {
        this.setState({disabled: false})
      }
    });
  };

  editForm = () => {
    const { idExpenseEdit, expenses, editDispatch } = this.props;
    const { value, description, currency, tag, method } = this.state;
    const editExpenses = expenses;
    const indexExpenseEdit = expenses
      .findIndex((expense) => expense.id === idExpenseEdit);
    editExpenses[indexExpenseEdit].value = value;
    editExpenses[indexExpenseEdit].description = description;
    editExpenses[indexExpenseEdit].currency = currency;
    editExpenses[indexExpenseEdit].method = method;
    editExpenses[indexExpenseEdit].tag = tag;
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    }, () => {
      editDispatch(editExpenses);
    });
  };

  saveInStore = async () => {
    const dataCurrencies = await this.fetchCurrency();
    const { myDispatch } = this.props;
    const { value, description, currency, tag, method } = this.state;
    const expense = {
      value,
      description,
      currency,
      tag,
      method,
      exchangeRates: {
        ...dataCurrencies,
      },
    };

    this.setState((prevState) => ({
      storeExpenses: [...prevState.storeExpenses, expense],
    }), () => {
      const { storeExpenses } = this.state;
      const newStoreExpenses = storeExpenses.map((expenseState, index) => ({
        id: index,
        ...expenseState,
      }));
      myDispatch(newStoreExpenses);
      this.setState({
        value: '',
        description: '',
      });
    });
  };

  render() {
    const { currencies, edit } = this.props;
    const { value, description, currency, tag, method, disabled } = this.state;
    return (
      <form onSubmit={ (e) => e.preventDefault() } className="form-wallet">
        <div className="value_and_description">
          <label htmlFor="value">
          <span>Valor da despesa:</span>
            <input
              type="text"
              name="value"
              id="value"
              data-testid="value-input"
              value={ value }
              placeholder="Informe o valor gasto"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="description">
            <span>Descrição da despesa:</span>
            <textarea
              name="description"
              id="description"
              cols="10"
              rows="2"
              placeholder="Descrição da despesa"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
        </div>

        <div className="container-currency">
          <label htmlFor="currency">
            <span>Moeda</span>
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              {currencies.length > 0 && currencies.map((currencyAPI) => (
                <option key={ currencyAPI } value={ currencyAPI }>{currencyAPI}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            <span>Forma de pagamento</span>
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <span>Categoria</span>
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          
        </div>
        {edit ? (
            <button
              type="button"
              className="button-saved-expense"
              onClick={ this.editForm }
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="button"
              onClick={ this.saveInStore }
              className="button-saved-expense"
              disabled={disabled}
            >
              Adicionar despesa
            </button>
          )}
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  edit: state.wallet.editor,
  currencies: state.wallet.currencies,
  idExpenseEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  myDispatch: (expense) => dispatch(actExpense(expense)),
  editDispatch: (expenseEdit) => dispatch(actExpenseEdit(expenseEdit)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
