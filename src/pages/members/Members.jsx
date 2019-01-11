import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import { Form } from 'informed';
import MemberFields from '../../components/form/MemberFields';
import { DBCollections, Errors } from '../../constants';

const { db } = window;

class Members extends React.Component {
  state = {
    members: [],
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
              error: null,
            });
          },
          (error) => {
            // console.log('error reading from live db', error);
            this.setState({
              members: [],
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
    </Form>
  )

  getUserCard = member => (
    <div>
      <h2>{member.name}, {member.role}</h2>
      <p>{member.bio}</p>
      <p>joined {member.adminDate}</p>
      <ul>
        <li><a href={member.github}>github</a></li>
        <li><a href={member.linkedin}>linkedin</a></li>
        <li><a href={member.twitter}>twitter</a></li>
      </ul>
      <button
        type="button"
        onClick={() => this.setState({ editing: true })}
      >
        edit
      </button>
    </div>
  )

  render() {
    const { props, state } = this;
    const { user } = props;
    const { members, editing } = state;

    let content = null;

    if (user.uid === null) {
      // user not logged in
      content = (<Redirect to="/" />);
    } else if (members.length) {
      content = (
        <div>
          {members.map((member) => {
            let memberContent = null;
            if (editing === true && member.uid === user.uid) {
              memberContent = this.getUserForm(member);
            } else {
              memberContent = this.getUserCard(member);
            }

            return (
              <div key={member.uid}>
                {memberContent}
              </div>
            );
          })}
        </div>
      );
    } else if (state.error !== null) {
      content = (<p>{state.error}</p>);
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
};

const mapStateToProps = state => ({ user: state.user });

const MembersContainer = connect(mapStateToProps)(Members);

export default MembersContainer;
