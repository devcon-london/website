import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { DBCollections } from '../../constants';

const { db } = window;

class Submissions extends React.Component {
  state = {
    submissions: [],
  }

  componentDidMount() {
    const { props: user } = this;
    if (user.uid !== null) {
      // TODO: set permissions on firebase so access to collection is allowed to a set of admins
      this.submissionsUnsubscribe = db.collection(DBCollections.submissions)
        .onSnapshot((snapshot) => {
          const submissions = [];
          snapshot.forEach((doc) => {
            submissions.push(doc.data());
          });
          this.setState({ submissions });
        });
    }
  }

  componentWillUnmount() {
    if (this.submissionsUnsubscribe) {
      this.submissionsUnsubscribe();
    }
  }

  approveSubmission = (e) => {
    this.handleSubmission(e.target.dataset.uid, true);
  }

  rejectSubmission = (e) => {
    this.handleSubmission(e.target.dataset.uid, false);
  }

  handleSubmission = (uid, approval) => {
    console.log('handle', uid, 'approve', approval);
    const { props } = this;
    const { user } = props;
    db.collection(DBCollections.submissions).doc(uid).get()
      .then((doc) => {
        // inject current user id and date so we know who approved/rejected
        const data = Object.assign({
          adminUid: user.uid,
          adminDate: new Date(),
        }, doc.data());
        let collection = DBCollections.rejects;
        if (approval) {
          collection = DBCollections.members;
        }
        db.collection(collection).doc(uid).set(data)
          .then(() => {
            db.collection(DBCollections.submissions).doc(uid).delete()
              .then(() => {
                console.log('it is always sunny in California');
              })
              .catch((error) => {
                console.log('error deleting submission', error);
              });
          })
          .catch((error) => {
            console.log('error setting submission', collection, error);
          });
      })
      .catch((error) => {
        console.log('error retrieving submission', uid, error);
      });
  }

  render() {
    const { props, state } = this;
    const { user } = props;
    const { submissions } = state;
    let content = null;

    if (user.uid === null) {
      // user not logged in
      content = (<Redirect to="/" />);
    } else if (submissions.length) {
      content = (
        <div>
          {submissions.map(i => (
            <div key={i.uid}>
              <p>{i.name} introduced by {i.referrer} on {i.date}</p>
              <p>role: {i.role} bio: {i.bio}</p>
              <p><a href={i.linkedin}>linkedin</a>, <a href={i.twitter}>twitter</a></p>
              <button
                data-uid={i.uid}
                onClick={this.approveSubmission}
                type="button"
              >
                accept
              </button>
              <button
                data-uid={i.uid}
                onClick={this.rejectSubmission}
                type="button"
              >
                reject
              </button>
            </div>
          ))}
        </div>
      );
    } else {
      content = (<p>no pending submissions!</p>);
    }

    return (
      <div>
        <h1>Submissions</h1>
        {content}
      </div>
    );
  }
}

Submissions.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.user });

const SubmissionsContainer = connect(mapStateToProps)(Submissions);
export default SubmissionsContainer;
