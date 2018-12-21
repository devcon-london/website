import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SubscriptionForm from './components/SubscriptionForm';

const { db } = window;

class Subscribe extends React.Component {
  state = {
    membership: null,
    submission: null,
  }

  componentDidMount() {
    const { props } = this;
    const { user } = props;
    if (user.uid !== null) {
      this.retrieveData(user.uid);
    }
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    const { user } = props;
    console.log('subscribe component updated', user.uid);
    if (user.uid !== prevProps.user.uid && user.uid !== null) {
      this.retrieveData(user.uid);
    }
  }

  fetchUserMembership = uid => db.collection('members').doc(uid).get();

  fetchUserSubmission = uid => db.collection('submissions').doc(uid).get();

  retrieveData = (uid) => {
    console.log('fetching membership');
    this.fetchUserMembership(uid)
      .then((doc) => {
        console.log('membership received');
        if (doc.exists) {
          this.setState({
            membership: doc.data(),
          });
        } else {
          console.log('fetching submission');
          this.fetchUserSubmission(uid)
            .then((sub) => {
              console.log('submission received', sub);
              if (sub.exists) {
                this.setState({
                  submission: sub.data(),
                });
              }
            })
            .catch((error) => {
              console.log('error fetching submission', error);
            });
        }
      })
      .catch((error) => {
        console.log('error fetching membership', error);
      });
  }

  render() {
    const { props, state } = this;
    const { user } = props;
    const { membership, submission } = state;
    let content = null;

    if (user.uid === null) {
      // user not logged in
      content = (<Redirect to="/" />);
    } else if (membership === null) {
      // logged in but no member, check if already submitted
      if (submission === null) {
        content = (<SubscriptionForm user={user} />);
      } else {
        content = (<p>You have a pending submission, good things come to those who wait.</p>);
      }
    } else {
      content = (<p>You are already a Devcon member, do not need to subscribe again</p>);
    }

    return (
      <div>
        <h1>Subscribe</h1>
        {content}
      </div>
    );
  }
}

Subscribe.propTypes = {
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const SubscribeContainer = connect(mapStateToProps)(Subscribe);
export default SubscribeContainer;
