import React from 'react';

class Authentication extends React.Component {
  constructor(props) {
    // TODO: hook everything and connect with redux store
    super(props);
    const { firebase } = window;
    const { auth } = firebase;
    this.auth = auth();
    this.ghProvider = firebase.auth.GithubAuthProvider();
    // might need to add scope for org? e.g. provider.addScope('user');
  }

  componentDidMount() {
    const { auth, props } = this;
    // firebase  auth
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log('+++ firebase +++ user signed in');
        // redux dispatch + store update
        props.onLogin(user);
      } else {
        // User signed out.
        console.log('+++ firebase +++ user not signed in');
        props.onLogout();
      }
    });
  }

  authSuccess = (result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    // var token = result.credential.accessToken;
    // The signed-in user info.
    // var user = result.user;
  }

  authError = (error) => {
    // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // The email of the user's account used.
    // var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
  }

  signIn = () => {
    const { auth, ghProvider } = this;
    auth()
      .signInWithPopup(ghProvider)
      .then(this.authSuccess)
      .catch(this.authError);
  }

  signOut = () => {
    this.auth.signOut();
  }

  render() {
    // check if we're logged in and render accordingly
    return (
      <button type="button">Trigger stuff</button>
    );
  }
}

export default Authentication;
