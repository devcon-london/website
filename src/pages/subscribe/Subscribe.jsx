import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Title, Section, Container } from '../../components/ui'

import SubscriptionForm from './components/SubscriptionForm'
import { DBCollections, Errors } from '../../constants'
import { showNotifications } from '../../state/reducers/ui'

const { db } = window

class Subscribe extends React.Component {
  state = {
    loading: true,
    membership: null,
    submission: null,
  }

  componentDidMount() {
    const { user } = this.props
    if (user.uid !== null) {
      this.retrieveData(user.uid)
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props
    if (user.uid !== prevProps.user.uid && user.uid !== null) {
      this.retrieveData(user.uid)
    }
  }

  fetchUserMembership = uid =>
    db
      .collection(DBCollections.members)
      .doc(uid)
      .get()

  fetchUserSubmission = uid =>
    db
      .collection(DBCollections.submissions)
      .doc(uid)
      .get()

  retrieveData = uid => {
    console.log(`hello ${uid}, time to check your membership/submission status`);
    this.setState({ loading: true })
    this.fetchUserMembership(uid)
      .then(doc => {
        if (doc.exists) {
          // membership exists
          console.log('yoohoo! you are a member.', doc.data());
          this.setState({
            loading: false,
            membership: doc.data(),
          })
        }
        // 'else' should not happen: if not a member it will raise due to permissions
      })
      .catch(error => {
        // ok, you're not a member see if there's a pending submission
        console.log('you are not a member, check if you have subscribed...', error);
        this.fetchUserSubmission(uid)
          .then(sub => {
            if (sub.exists) {
              // ok you've got a pending submission
              console.log('you have a pending submission', sub.data());
              this.setState({
                loading: false,
                submission: sub.data(),
              })
            } else {
              // TODO: check this, it should not happen and go straight
              // to catch section below, maybe permissons should be checked?
              console.log('no pending submission (this should not happen)');
              this.setState({ loading: false })
            }
          })
          .catch(subError => {
            // not a member and not subscribed, time for a submission
            console.log('not a member, no pending submission', subError);
            this.setState({ loading: false })
          })
      })
  }

  render() {
    const { user, showNotifications } = this.props
    const { membership, submission, loading } = this.state
    let content = null

    if (user.uid === null) {
      // user not logged in
      showNotifications(Errors.loginFirst)
      content = (
        <p>Please login with Github first, then head back here to subscribe</p>
      )
    } else if (loading === true) {
      content = <p>loading...</p>
    } else if (membership === null) {
      // logged in but no member, check if already submitted
      if (submission === null) {
        content = <SubscriptionForm user={user} />
      } else {
        content = (
          <p>
            You have a pending submission, good things come to those who wait.
          </p>
        )
      }
    } else {
      content = (
        <p>You are already a DevCon member, do not need to subscribe again</p>
      )
      // for debug, uncomment the following to always enable submissions
      // content = (<SubscriptionForm user={user} />);
    }

    return (
      <Section>
        <Container>
          <Title>Subscribe</Title>
          {content}
        </Container>
      </Section>
    )
  }
}

Subscribe.propTypes = {
  user: PropTypes.object.isRequired,
  showNotifications: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ user: state.user })

const SubscribeContainer = connect(mapStateToProps, {
  showNotifications,
})(Subscribe)
export default SubscribeContainer
