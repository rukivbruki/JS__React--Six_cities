import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Redirect} from "react-router-dom";

import {getAuthorizationError, getAuthorizationStatus} from '../../reducers/user/selectors';
import {authorizeUser} from '../../reducers/user/user';

import withForm from '../../hocs/with-form/with-form';

import {setBodyRootClass} from '../../utils/set-body-root-class';

class SignInPage extends PureComponent {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    setBodyRootClass(`page page--gray page--login`, `full-height`);
  }

  render() {
    const {formData = {}, onInputChange, authorizationError, isAuthorazated} = this.props;

    if (isAuthorazated) {
      return <Redirect to="/" />;
    }

    const {email = ``, password = ``} = formData;

    return <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={this._handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" type="email" name="email"
                placeholder="Email" value={email} onChange={onInputChange} required />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" type="password" name="password"
                placeholder="Password" value={password} onChange={onInputChange} required />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
            {!!authorizationError && <div>
              <p style={{color: `red`}}>{authorizationError}</p>
            </div>}
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Amsterdam</span>
            </a>
          </div>
        </section>
      </div>
    </main>;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    const {formData = {}} = this.props;
    const {email, password} = formData;
    this.props.submitAuthorization(email, password);
  }
}

SignInPage.propTypes = {
  isAuthorazated: PropTypes.bool.isRequired,
  authorizationError: PropTypes.string,
  formData: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  submitAuthorization: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorazated: getAuthorizationStatus(state),
  authorizationError: getAuthorizationError(state),
});

const mapDispatchToProps = (dispatch) => ({
  submitAuthorization: (email, password) => dispatch(authorizeUser(email, password)),
});

export {SignInPage};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withForm()
)(SignInPage);
