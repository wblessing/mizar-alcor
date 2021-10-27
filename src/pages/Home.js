import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as authActions from '../redux/actions/authActions';
import HomeView from './HomeView';

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = (dispatch) => ({
  loginRequest: () => dispatch(authActions.loginRequest()),
  logoutSuccess: () => dispatch(authActions.logoutSuccess()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeView)
);
