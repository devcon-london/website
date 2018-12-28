import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
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
            // meh, bit shit but...
            const d = doc.data();
            d.adminDate = (new Date(1000 * d.adminDate.seconds)).toISOString();
            members.push(d);
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

  getUserForm = member => (
    <div>
      <h2>{member.name}, {member.role}</h2>
      <p>TODO: here goes the form</p>
      <button
        type="button"
        onClick={() => this.setState({ editing: false })}
      >
        save
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
