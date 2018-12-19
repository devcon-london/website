import React from 'react';

const Members = () => (
  <div>
    <h1>Members</h1>
    <p>accessible to members only</p>
    <p>get the GH auth token from firebase auth? check if part of devcon org, pull content from firebase db</p>
    <p>or a simpler way would be to check if firebase uid is in the list of members so we don't have to call GH api</p>
    <p>allow to edit bio / interest / linkedin field to owner</p>
  </div>
);

export default Members;
