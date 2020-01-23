import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getAuthorizationStatus, getUserData} from "../../reducer/user/selector";
import {PageAddress, REQUEST} from "../../constants";

const Header = ({isAuthorizationRequired, userData}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link
                  to={isAuthorizationRequired ? PageAddress.LOGIN : PageAddress.FAVORITE}
                  className="header__nav-link header__nav-link--profile"
                >
                  <div
                    className="header__avatar-wrapper user__avatar-wrapper"
                    style={isAuthorizationRequired ? {} : {backgroundImage: `url(${REQUEST.BASE_URL}${userData.avatar})`}}
                  >
                  </div>
                  <span className="header__user-name user__name">
                    {isAuthorizationRequired ? `Sign In` : userData.email}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isAuthorizationRequired: PropTypes.bool.isRequired,
  userData: PropTypes.shape({
    avatar: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    isPro: PropTypes.bool,
    name: PropTypes.string,
  }),
};


const mapStateToProps = (state) => ({
  isAuthorizationRequired: getAuthorizationStatus(state),
  userData: getUserData(state)
});


export {Header};
export default connect(mapStateToProps)(Header);
