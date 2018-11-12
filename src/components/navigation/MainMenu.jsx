import React from 'react';
import { Link } from 'react-router-dom';

import Authentication from './Authentication';

const MainMenu = () => (
  <nav>
    <ul>
      {/* <li><Authentication /></li> */}
      <li><Link to="/">What is DevCon.London</Link></li>
      <li><Link to="/terms">Terms</Link></li>
      {/* shown when not authenticated or authenticated and not a member */}
      <li><Link to="/subscribe">Subscribe</Link></li>
      {/* shown when authenticated and member */}
      <li><Link to="/events">Events</Link></li>
      <li><Link to="/members">Members</Link></li>
      {/* shown when authenticated, member and admin */}
      <li><Link to="/submissions">Submissions</Link></li>
    </ul>
  </nav>
);

export default MainMenu;
