import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { userLogout, userLogin } from '../../state/actions/user';

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    const { firebase } = window;
    const { auth } = firebase;
    this.auth = auth();
  }

  componentDidMount() {
    const { auth, props } = this;
    // firebase  auth
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        // console.log('+++ firebase +++ user signed in', user);
        props.onLogin({ user });
      } else {
        // User signed out.
        // console.log('+++ firebase +++ user not signed in');
        props.onLogout();
      }
    });
  }

  authSuccess = (result) => {
    const { props } = this;
    // console.log('auth success', result);
    const { user } = result;
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const token = result.credential.accessToken;
    props.onLogin({ user, token });
  }

  authError = (error) => {
    // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // The email of the user's account used.
    // var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
    // console.log('auth error', error);
  }

  ghSignIn = () => {
    const { auth } = this;
    const { firebase } = window;
    const provider = new firebase.auth.GithubAuthProvider();
    // https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/
    provider.addScope('read:org');
    auth
      .signInWithPopup(provider)
      .then(this.authSuccess)
      .catch(this.authError);
  }

  signOut = () => {
    this.auth.signOut();
  }

  render() {
    const { user } = this.props;
    const { displayName } = user;
    return (
      <React.Fragment>
        { displayName
          ? (
            <Button
              onClick={this.signOut}
            >
              SignOut
            </Button>
          ) : (
            <Button
              onClick={this.ghSignIn}
            >
              Github SignIn
            </Button>
          )
        }
      </React.Fragment>
    );
  }
}

Authentication.propTypes = {
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispathToProps(dispatch) {
  return {
    onLogin: (user) => { dispatch(userLogin(user)); },
    onLogout: () => { dispatch(userLogout()); },
  };
}

const AuthenticationContainer = connect(mapStateToProps, mapDispathToProps)(Authentication);

export default AuthenticationContainer;
