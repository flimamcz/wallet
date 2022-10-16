import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from '../images/logo.svg';
import User from '../images/icon-user.svg';
import Currency from '../images/icon-moedas.svg';
import '../styles/header.css';
import { Link } from "react-router-dom";
class Header extends Component {
  sumTotalExpenses = () => {
    const { expenses } = this.props;
    let sumTotal = 0;
    expenses.forEach(({ value, exchangeRates, currency }) => {
      sumTotal += Number(exchangeRates[currency].ask) * value;
    });
    return sumTotal;
  };

  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Logo da fl wallet" />
          </Link>
        </div>

        <div>
          <div className="header-currency">
              <img src={Currency} alt="icon da moeda" />
            <p data-testid="total-field">
              Total de despesas:
              {' '}
              {
                this.sumTotalExpenses() ? this.sumTotalExpenses().toFixed(2) : '0.00'
              }
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>

        <p data-testid="email-field" className="header-email">
           <img src={User} alt="icon at profile" />
            {' '}
            <span className="email">{email}</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
