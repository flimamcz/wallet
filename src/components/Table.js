import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { actExpense, actEnableEdit } from '../redux/actions/index';
import '../styles/table.css'
import iconTrash from '../images/icon-trash.svg';
import iconEdit from '../images/icon-editar.svg';

class Table extends Component {
  deleteExpense = (expenseDelete) => {
    const { expenses, dispatch } = this.props;
    const expenseFilteredDelete = expenses.filter((expense) => expense !== expenseDelete);
    dispatch(actExpense(expenseFilteredDelete));
  };

  enableEdit = (id) => {
    const { enableEditDispatch } = this.props;
    enableEditDispatch(id);
  };

  render() {
    const { expenses } = this.props;
    return (
      <>
        {expenses.length ? (
          <table className="table-expense">
          <thead>
            <tr>
              <th>Valor</th>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Moeda de conversão</th>
              <th>Valor convertido</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
  
          <tbody>
            {expenses.length > 0 && expenses.map((expense) => (
              <tr key={ uuidv4() }>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>{expense.currency}</td>
                <td>
                  {Number(
                    (expense.exchangeRates[expense.currency].ask) * Number(expense.value)
                      .toFixed(2),
                  ).toFixed(2)}
                </td>
                <td>
                <button
                    data-testid="edit-btn"
                    onClick={ () => this.enableEdit(expense.id) }
                    type="button"
                  >
                    <img src={iconEdit} alt="Icon edit" />
                </button>
                  
                  <button
                    data-testid="delete-btn"
                    onClick={ () => this.deleteExpense(expense) }
                    type="button"
                  >
                    <img src={iconTrash} alt="Icon trash" />
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        ) : <h1 className="title-not-expense">Sem despesas no momento.</h1>}
      </>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  enableEditDispatch: (enableEdit) => dispatch(actEnableEdit(enableEdit)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
