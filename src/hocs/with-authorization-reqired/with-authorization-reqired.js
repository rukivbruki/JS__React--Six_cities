import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAuthorizationStatus} from '../../reducers/user/selectors';
import SignInPage from '../../components/sign-in-page/sign-in-page.jsx';

const withAuthorizationReqired = (Component) => {
  const WithAuthorizationReqired = (props) => {
    if (!props.isAuthorazated) {
      return <SignInPage/>;
    }
    return <Component {...props} />;
  };

  WithAuthorizationReqired.propTypes = {
    isAuthorazated: PropTypes.bool.isRequired,
  };

  const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
    isAuthorazated: getAuthorizationStatus(state),
  });

  return connect(mapStateToProps)(WithAuthorizationReqired);
};

export default withAuthorizationReqired;
