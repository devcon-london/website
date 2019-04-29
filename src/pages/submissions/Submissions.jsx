import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { DBCollections, Errors } from '../../constants';

const { db } = window;

class Submissions extends React.Component {
  state = {
    submissions: [],
    error: null,
  }

  componentDidMount() {
    const { user } = this.props;
    if (user.uid !== null) {
      this.submissionsUnsubscribe = db.collection(DBCollections.submissions)
        .onSnapshot(
          (snapshot) => {
            const submissions = [];
            snapshot.forEach((doc) => {
              submissions.push(doc.data());
            });
            this.setState({ submissions, error: null });
          },
          (error) => {
            this.setState({
              submissions: [],
              error: Errors.sectionPermission,
            });
          },
        );
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

  getClickHandler = (uid, approval) => {
    const f = () => this.handleSubmission(uid, approval);
    return f;
  }

  handleSubmission = (uid, approval) => {
    // console.log('handle', uid, 'approve', approval);
    const { user } = this.props;
    db.collection(DBCollections.submissions)
      .doc(uid)
      .get()
      .then((doc) => {
        // inject current user id and date so we know who approved/rejected
        const data = Object.assign({
          adminUid: user.uid,
          adminDate: (new Date()).toISOString(),
        }, doc.data());
        let collection = DBCollections.rejects;
        if (approval) {
          // determine the right collection depending on applicant value
          // can be either members or advertisers, set by SubcscriptionForm
          collection = DBCollections[data.applicant];
        }
        db.collection(collection)
          .doc(uid)
          .set(data)
          .then(() => {
            db.collection(DBCollections.submissions)
              .doc(uid)
              .delete()
              .then(() => {
                // console.log('it is always sunny in California');
                this.setState({ error: null });
              })
              .catch((error) => {
                console.log('error deleting submission', error);
                this.setState({ error: 'error deleting submission' });
              });
          })
          .catch((error) => {
            console.log('error setting submission', collection, error);
            this.setState({ error: 'error setting submission' });
          });
      })
      .catch((error) => {
        console.log('error retrieving submission', uid, error);
        this.setState({ error: 'error retrieving submission' });
      });
  }

  getFields = (submission) => {
    const intro = (
      <Typography variant="body1" gutterBottom>
        {`introduced by ${submission.referrer} on ${submission.date}`}
      </Typography>
    );
    const showFields = {
      members: (
        <React.Fragment>
          <Typography variant="h5">
            {`Community Membership for ${submission.name}, ${submission.role}`}
          </Typography>
          {intro}
          <Typography variant="body1" gutterBottom>
            {`Bio: ${submission.bio}`}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Button href={submission.github}>Github</Button>
            <Button href={submission.linkedin}>LinkedIn</Button>
            <Button href={submission.twitter}>Twitter</Button>
          </Typography>
        </React.Fragment>
      ),
      advertisers: (
        <React.Fragment>
          <Typography variant="h5">
            {`Advertising Membership for ${submission.name}`}
          </Typography>
          {intro}
          <Typography variant="body1" gutterBottom>
            {`Role ${submission.role}. Company: ${submission.company}`}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <Button href={submission.linkedin}>LinkedIn</Button>
            <Button href={`mailto:${submission.email}`}>{submission.email}</Button>
          </Typography>
        </React.Fragment>
      ),
    };
    return showFields[submission.applicant];
  }

  render() {
    const { user } = this.props;
    const { submissions, error } = this.state;
    let content = null;

    if (user.uid === null) {
      // user not logged in
      content = (<Redirect to="/" />);
    } else if (submissions.length) {
      content = (
        <div>
          {submissions.map(i => (
            <div key={i.uid}>
              {this.getFields(i)}
              {/* material-ui Button doesn't like data-* attributes, hence the getClickHandler */}
              {
                [
                  { label: 'Accept', approval: true },
                  { label: 'Reject', approval: false },
                ].map(v => (
                  <Button
                    key={v.label}
                    data-uid={i.uid}
                    onClick={this.getClickHandler(i.uid, v.approval)}
                  >
                    {v.label}
                  </Button>
                ))
              }
            </div>
          ))}
        </div>
      );
    } else if (error) {
      content = (<p>{error}</p>);
    } else {
      content = (<p>no pending submissions!</p>);
    }

    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Submissions.
        </Typography>
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
