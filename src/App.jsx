import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainMenu from './components/navigation/MainMenu';

import Home from './pages/home/Home';
import Terms from './pages/terms/Terms';
import Subscribe from './pages/subscribe/Subscribe';
import Events from './pages/events/Events';
import Members from './pages/members/Members';
import Submissions from './pages/submissions/Submissions';

import './App.css';

const App = () => (
  <Router>
    <div className="App">
      <MainMenu />
      <Route path="/" exact component={Home} />
      <Route path="/terms" component={Terms} />
      {/* shown when not authenticated or authenticated and not a member */}
      <Route path="/subscribe" component={Subscribe} />
      {/* shown when authenticated and member */}
      <Route path="/events" component={Events} />
      <Route path="/members" component={Members} />
      {/* shown when authenticated, member and admin */}
      <Route path="/submissions" component={Submissions} />
    </div>
  </Router>
);

export default App;
