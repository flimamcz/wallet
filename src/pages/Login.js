import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actUser } from '../redux/actions';
import '../styles/login.css';
import Logo from '../images/logo.svg';

class Login extends React.Component {
  state = {
    disableButton: true,
    email: '',
    password: '',
    redirect: false,
  };

  checkInputs = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.value }, () => {
      const { email, password } = this.state;
      const regex = /\S+@\S+\.\S+/;
      const checkEmail = regex.test(email);
      const minLength = 6;
      const checkPassword = password.length >= minLength;
      if (checkEmail && checkPassword) {
        this.setState({ disableButton: false });
      } else {
        this.setState({ disableButton: true });
      }
    });
  };

  submitUser = () => {
    const { email } = this.state;
    const { myDispatch } = this.props;
    myDispatch(email);
    this.setState({ redirect: true });
  };

  render() {
    const { disableButton, email, password, redirect } = this.state;
    return (
      <div className="container-login">
        <form onSubmit={ (e) => e.preventDefault() } className="form-login">
          <img src={Logo} alt="logo da fl wallet" />
          <label htmlFor="email">
            <input
              className="input-login"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              data-testid="email-input"
              value={ email }
              onChange={ this.checkInputs }
            />
          </label>

          <label htmlFor="password">
            <input
              className="input-login"
              type="text"
              name="password"
              id="password"
              placeholder="password"
              data-testid="password-input"
              minLength={ 6 }
              value={ password }
              onChange={ this.checkInputs }
            />
          </label>

          <button
            type="button"
            disabled={ disableButton }
            className="button-login"
            onClick={ this.submitUser }
          >
            Entrar
          </button>
        </form>

        {redirect && <Redirect to="/carteira" />}
      </div>
    );
  }
}

Login.propTypes = {
  myDispatch: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  myDispatch: (state) => dispatch(actUser(state)),
  dispatch,
});

export default connect(null, mapDispatchToProps)(Login);
