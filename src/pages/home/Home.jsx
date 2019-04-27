import React from 'react';

import Typography from '@material-ui/core/Typography';

const Home = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Welcome.
    </Typography>

    <Typography variant="h6" gutterBottom>
      Q: What is Devcon.London?
    </Typography>
    <Typography variant="body1" gutterBottom>
      A: Devcon.London is an invitation-only community of developers.
    </Typography>
    <Typography variant="h6" gutterBottom>
      Q: How do I get in?
    </Typography>
    <Typography variant="body1" gutterBottom>
      A: You should know someone who is already in and willing to invite you.
    </Typography>
    <Typography variant="h6" gutterBottom>
      Q: Why is this community so private?
    </Typography>
    <Typography variant="body1" gutterBottom>
      A: Because we believe that keeping strong relationships between our members is healthy
      and granting access on an invite-basis is a way of doing so. Also, we can guarantee privacy
      for our members and avoid unsolicited contacts from people who are not interested in the community.
    </Typography>
    <Typography variant="h6" gutterBottom>
      Q: OK, I have an invite, how do I get in now?
    </Typography>
    <Typography variant="body1" gutterBottom>
      A: Login using your Github account, then head to the subscribe page and fill the form.
      One of the admins will review your submission and let you in.
    </Typography>
  </div>
);

export default Home;
