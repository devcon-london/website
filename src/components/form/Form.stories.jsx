import React from 'react'
import { storiesOf } from '@storybook/react'

import MemberFields from './MemberFields'
import AdvertiserFields from './AdvertiserFields'
import SubscriptionForm from './SubscriptionForm'

const user = JSON.parse('{"uid":"123456789"}')

storiesOf('User Data', module)
  .add('Member Fields', () => (
    <div>
      <MemberFields />
    </div>
  ))
  .add('Advertiser Fields', () => (
    <div>
      <AdvertiserFields />
    </div>
  ))
  .add('Subscription Form', () => (
    <div>
      <SubscriptionForm user={user} />
    </div>
  ))
