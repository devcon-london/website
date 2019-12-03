import React from 'react'

import { Route } from 'react-router-dom'

import Home from '../../pages/home/Home'
// import Terms from '../../pages/terms/Terms'
import Subscribe from '../../pages/subscribe/Subscribe'
import Events from '../../pages/events/Events'
import Members from '../../pages/members/Members'
import Advertisers from '../../pages/advertisers/Advertisers'
import Submissions from '../../pages/submissions/Submissions'
import Privacy from '../../pages/privacy'
import ScrollTop from '../ScrollTop/ScrollTop'

const Routes = () => (
  <>
    <ScrollTop />
    <Route path="/" exact component={Home} />
    {/* <Route path="/terms" component={Terms} /> */}
    {/* shown when not authenticated or authenticated and not a member */}
    <Route path="/subscribe" component={Subscribe} />
    {/* shown when authenticated and member */}
    <Route path="/events" component={Events} />
    <Route path="/members" component={Members} />
    <Route path="/privacy" component={Privacy} />
    <Route path="/advertisers" component={Advertisers} />
    {/* shown when authenticated, member and admin */}
    <Route path="/submissions" component={Submissions} />
  </>
)

export default Routes
