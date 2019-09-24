import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

import { connect } from 'react-redux'
import { userLogout, userLogin, userMembership } from '../../state/reducers/user'
import { loadMembers } from '../../state/reducers/members'

class Authentication extends React.Component {
  constructor(props) {
    super(props)
    const { firebase } = window
    const { auth } = firebase
    this.auth = auth()
  }

  state = {}

  componentDidMount() {
    const { auth, props } = this
    // firebase  auth
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        // console.log('+++ firebase +++ user signed in', user);
        props.onLogin({ user })
      } else {
        // User signed out.
        // console.log('+++ firebase +++ user not signed in');
        props.onLogout()
      }
    })
  }

  authSuccess = result => {
    const { props } = this
    // console.log('auth success', result);
    const { user } = result
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const token = result.credential.accessToken
    props.onLogin({ user, token })
  }

  authError = error => {
    // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // The email of the user's account used.
    // var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    // var credential = error.credential;
    // console.log('auth error', error);
  }

  static getDerivedStateFromProps(props) {
    const { members, user, onUserMembership } = props
    if(members.length > 0 && user.membership === null) {
      onUserMembership(!!members.find(a => a.uid === user.uid))
    }

    return null
  }

  ghSignIn = () => {
    const { auth } = this
    const { firebase } = window
    const provider = new firebase.auth.GithubAuthProvider()
    // https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/
    provider.addScope('read:org')
    auth
      .signInWithPopup(provider)
      .then(this.authSuccess)
      .catch(this.authError)
  }

  signOut = () => {
    this.auth.signOut()
  }

  render() {
    const { user } = this.props
    const { displayName } = user
    return (
      <>
        {displayName ? (
          <Button onClick={this.signOut}>SignOut</Button>
        ) : (
          <Button onClick={this.ghSignIn}>Github SignIn</Button>
        )}
      </>
    )
  }
}

Authentication.propTypes = {
  user: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
}

function mapDispathToProps(dispatch) {
  return {
    onLogin: data => {
      dispatch(userLogin(data))
      dispatch(loadMembers(data.user.uid))
    },
    onLogout: () => {
      dispatch(userLogout())
    },
    onUserMembership: (data) => dispatch(userMembership(data))
  }
}

const AuthenticationContainer = connect(
  ({ user, members: {members} }) => ({ user, members }),
  mapDispathToProps
)(Authentication)

export default AuthenticationContainer
