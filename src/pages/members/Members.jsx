import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Form } from 'informed';
import MemberFields from '../../components/form/MemberFields';
import { DBCollections, Errors } from '../../constants';

const { db } = window;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
});

/**
 * this might be helpful for debug
const fakeMembers = () => (
  [1, 2, 3, 4, 5, 6, 7, 8].map(v => ({
    uid: v,
    name: `Zungo ${v}`,
    role: 'dev',
    bio: 'crisps websites',
    adminDate: (new Date()).toISOString(),
    github: 'http://www.google.com/',
    linkedin: 'http://www.google.com/',
    twitter: 'http://www.google.com/',
  }))
);
 */

class Members extends React.Component {
  state = {
    members: [],
    loading: true,
    editing: false,
    error: null,
  }

  componentDidMount() {
    const { user } = this.props;
    if (user.uid !== null) {
      this.membersUnsubscribe = db.collection(DBCollections.members)
        .onSnapshot(
          (snapshot) => {
            const members = [];
            snapshot.forEach((doc) => {
              members.push(doc.data());
            });
            this.setState({
              members,
              loading: false,
              error: null,
            });
          },
          (error) => {
            // console.log('error reading from live db', error);
            this.setState({
              members: [],
              loading: false,
              error: Errors.sectionPermission,
            });
          },
        );
    }
  }

  componentWillUnmount() {
    if (this.membersUnsubscribe) {
      this.membersUnsubscribe();
    }
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  }

  validate = value => (value ? null : 'Enter value for field')

  submitForm = () => {
    const formState = this.formApi.getState();
    if (!formState.invalid) {
      db.collection(DBCollections.members)
        .doc(formState.values.uid)
        .get()
        .then((doc) => {
          const updatedData = Object.assign(
            {},
            doc.data(),
            formState.values,
          );
          db.collection(DBCollections.members)
            .doc(updatedData.uid)
            .set(updatedData)
            .then(() => {
              // console.log('it is always sunny in California');
              this.setState({ error: null });
            })
            .catch((error) => {
              // console.log('error storing data', error);
              this.setState({ error: 'Error storing data' });
            });
        })
        .catch((error) => {
          // console.log('error fetching document', error);
          this.setState({ error: 'Error fetching your personal data' });
        });
    }
    // TODO: setting state multiple times? bad dog!
    this.setState({ editing: false });
  }

  getUserForm = member => (
    <Form
      className="SubscriptionForm"
      id="subscription-form"
      getApi={this.setFormApi}
      initialValues={member}
      key={member.uid}
    >
      <MemberFields />
      <Button onClick={this.submitForm}>Submit</Button>
      <Button onClick={() => { this.setState({ editing: false }); }}>Cancel</Button>
    </Form>
  )

  getUserCard = (member, editable) => (
    <div>
      <Typography variant="h5">
        {`${member.name}, ${member.role}`}
      </Typography>
      <Typography variant="body1">
        {member.bio}
      </Typography>
      <Typography variant="body1">
        {`joined ${member.adminDate}`}
      </Typography>
      <Typography variant="body1">
        { editable
          ? (
            <Button
              onClick={() => this.setState({ editing: true })}
            >
              edit
            </Button>
          )
          : ''
        }
        <Button href={member.github}>github</Button>
        <Button href={member.linkedin}>linkedin</Button>
        <Button href={member.twitter}>twitter</Button>
      </Typography>
    </div>
  )

  render() {
    const { user, classes } = this.props;
    const {
      members,
      loading,
      editing,
      error,
    } = this.state;

    let content = null;

    if (user.uid === null) {
      // user not logged in
      content = (<Redirect to="/" />);
    } else if (loading) {
      content = (<p>loading...</p>);
    } else if (error !== null) {
      content = (<p>{error}</p>);
    } else if (members.length) {
      content = (
        <div className={classes.root}>
          <Grid container spacing={24}>
            {members.map((member) => {
              let memberContent = null;
              if (editing === true && member.uid === user.uid) {
                memberContent = this.getUserForm(member);
              } else {
                const editable = member.uid === user.uid;
                memberContent = this.getUserCard(member, editable);
              }

              return (
                <Grid item xs={6} key={member.uid}>
                  <Paper className={classes.paper}>
                    {memberContent}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </div>
      );
    } else {
      content = (<p>these are not the droids you are looking for!</p>);
    }

    return (
      <div>
        <h1>Members</h1>
        {content}
      </div>
    );
  }
}

Members.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ user: state.user });

const StyledMembers = withStyles(styles)(Members);
const MembersContainer = connect(mapStateToProps)(StyledMembers);

export default MembersContainer;
