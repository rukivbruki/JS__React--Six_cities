import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import history from "../../utils/history";

import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';

import {getAuthorizationData, getAuthorizationStatus} from '../../reducers/user/selectors';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {unauthorizeUser} from '../../reducers/user/user';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this._handleLogOutClick = this._handleLogOutClick.bind(this);
  }

  render() {
    const {isAuthorazated, authorizationData} = this.props;
    return <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuthorazated ?
                <>
                  <li className="header__nav-item user">
                    <Link to="/favorites" className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">{authorizationData.email}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item logout">
                    <a href="#" onClick={this._handleLogOutClick} className="header__nav-link header__nav-link--profile">
                      <span className="header__user-name">Logout</span>
                    </a>
                  </li>
                </> :
                <li className="header__nav-item user">
                  <Link to="/login" className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>;
  }

  _handleLogOutClick(evt) {
    evt.preventDefault();
    this.props.onLogout();
    history.push(`/`);
  }
}

Header.propTypes = {
  isAuthorazated: PropTypes.bool.isRequired,
  authorizationData: PropTypes.shape({
    email: PropTypes.string
  }),
  onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isAuthorazated: getAuthorizationStatus(state),
  authorizationData: getAuthorizationData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(unauthorizeUser),
});

export {Header};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(Header);
