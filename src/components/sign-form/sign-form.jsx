import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Operation} from "../../reducer/user/user";
import {history} from "../../index";
import {PageAddress} from "../../constants";

const SignForm = (props) => {
  const {onInputChange, sendAuthData, email, password} = props;

  const handleSubmitForm = (evt) => {
    evt.preventDefault();

    sendAuthData({
      email,
      password
    });
    history.push(PageAddress.MAIN);
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className="login__form form"
      action="#"
      method="post"
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          onChange={onInputChange}
          value={email || ``}
          className="login__input form__input"
          name="email"
          placeholder="Email"
          type="email"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          onChange={onInputChange}
          className="login__input form__input"
          value={password || ``}
          name="password"
          placeholder="Password"
          type="password"
          required
        />
      </div>
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  sendAuthData: (data) => dispatch(Operation.sendAuthData(data))
});

SignForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  sendAuthData: PropTypes.func.isRequired
};

export {SignForm};
export default connect(null, mapDispatchToProps)(SignForm);
