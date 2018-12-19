import React from 'react';

import SubscriptionForm from './components/SubscriptionForm';


const Subscribe = () => (
  <div>
    <h1>Subscribe</h1>
    <p>accessible when users not authenticated or auth but not part of the GH org</p>
    <p>shows form for submission with fields: linkedin, inductee name, quick bio</p>
    <p>
      replaces
      {' '}
      <a href="http://bit.ly/devcon-london-people-form">Devcon Form</a>
    </p>
    <SubscriptionForm />
  </div>
);

export default Subscribe;
