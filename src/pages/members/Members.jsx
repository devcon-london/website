import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Text, TextArea } from 'informed';
import { DBCollections } from '../../constants';

const { db } = window;

class Members extends React.Component {
  state = {
    members: [],
    editing: false,
  }

  componentDidMount() {
    const { props: user } = this;
    if (user.uid !== null) {
      // TODO: set permissions on firebase so access to collection is allowed only to member
      this.membersUnsubscribe = db.collection(DBCollections.members)
        .onSnapshot((snapshot) => {
          const members = [];
          snapshot.forEach((doc) => {
            members.push(doc.data());
          });
          this.setState({ members });
        });
    }
  }

  componentWillUnmount() {
    if (this.membersUnsubscribe) {
      this.membersUnsubscribe();
    }
  }

  setFormApi = (formApi) => {
    console.log('set form api', formApi);
    this.formApi = formApi;
  }

  validate = value => (value ? null : 'enter value for field')

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
              console.log('it is always sunny in California');
            })
            .error((error) => {
              console.log('error storing data', error);
            });
        })
        .catch((error) => {
          console.log('error fetching document', error);
        });
    }
    // TODO: let user know if form is invalid and we haven't updated
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
      <Text field="uid" id="uid" hidden />
      <label htmlFor="name">Name</label>
      <Text field="name" id="name" validate={this.validate} />
      <label htmlFor="github">Github URL</label>
      <Text field="github" id="github" validate={this.validate} />
      <label htmlFor="twitter">Twitter URL</label>
      <Text field="twitter" id="twitter" validate={this.validate} />
      <label htmlFor="linkedin">LinkedIn URL</label>
      <Text field="linkedin" id="linkedin" validate={this.validate} />
      <label htmlFor="role">Role</label>
      <Text field="role" id="role" validate={this.validate} />
      <label htmlFor="bio">Short Bio</label>
      <TextArea field="bio" id="bio" validate={this.validate} />
      <button type="button" onClick={this.submitForm}>Submit</button>
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
