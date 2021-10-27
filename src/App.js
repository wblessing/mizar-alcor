import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as authActions from './redux/actions/authActions';
import AppView from './AppView';

const mapDispatchToProps = (dispatch) => ({
  loginSuccess: (profile) => dispatch(authActions.loginSuccess(profile)),
  loginError: (error) => dispatch(authActions.loginError(error)),
});

export default withRouter(
  connect(
    null, // no mapStateToProps
    mapDispatchToProps
  )(AppView)
);
