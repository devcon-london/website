import React from 'react';

const Submissions = () => (
  <div>
    <h1>Submissions</h1>
    <p>accessible to admin members only (i.e. GH username flagged as admin in firebase db)</p>
    <p>it would be nice to have approval with, say, 3 admin checks. when approved, the member username gets added to the GH organisation calling the GH api using the logged admin auth token</p>
  </div>
);

export default Submissions;
