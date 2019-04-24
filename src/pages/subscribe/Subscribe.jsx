import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SubscriptionForm from './components/SubscriptionForm';
import { DBCollections } from '../../constants';

const { db } = window;

class Subscribe extends React.Component {
  state = {
    loading: true,
    membership: null,
    submission: null,
  }

  componentDidMount() {
    const { user } = this.props;
    if (user.uid !== null) {
      this.retrieveData(user.uid);
    }
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    if (user.uid !== prevProps.user.uid && user.uid !== null) {
      this.retrieveData(user.uid);
    }
  }

  fetchUserMembership = uid => db.collection(DBCollections.members).doc(uid).get();

  fetchUserSubmission = uid => db.collection(DBCollections.submissions).doc(uid).get();

  retrieveData = (uid) => {
    this.setState({ loading: true });
    this.fetchUserMembership(uid)
      .then((doc) => {
        if (doc.exists) {
          console.log('yoohoo you are a member!', doc.data());
          this.setState({
            loading: false,
            membership: doc.data(),
          });
        }
        // 'else' should not happen: if not a member it will throw due to permissions
      })
      .catch((error) => {
        console.log('error fetching membership', error);
        // ok, you're not a member see if there's a pending submission
        this.fetchUserSubmission(uid)
          .then((sub) => {
            if (sub.exists) {
              console.log('you have a pending submission', sub.data());
              this.setState({
                loading: false,
                submission: sub.data(),
              });
            } else {
              // TODO: mh, maybe permissons should be checked?
              // this should not happen and go straight to error
              console.log('no pending submission');
              this.setState({ loading: false });
            }
          })
          .catch((subError) => {
            console.log('error fetching submission', subError);
            this.setState({ loading: false });
          });
      });
  }

  render() {
    const { user } = this.props;
    const { membership, submission, loading } = this.state;
    let content = null;

    if (user.uid === null) {
      // user not logged in
      content = (<Redirect to="/" />);
    } else if (loading === true) {
      content = (<p>loading...</p>);
    } else if (membership === null) {
      // logged in but no member, check if already submitted
      if (submission === null) {
        content = (<SubscriptionForm user={user} />);
      } else {
        content = (<p>You have a pending submission, good things come to those who wait.</p>);
      }
    } else {
      content = (<p>You are already a Devcon member, do not need to subscribe again</p>);
      // for debug, uncomment the following to always enable submissions
      // content = (<SubscriptionForm user={user} />);
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

const mapStateToProps = state => ({ user: state.user });

const SubscribeContainer = connect(mapStateToProps)(Subscribe);
export default SubscribeContainer;
