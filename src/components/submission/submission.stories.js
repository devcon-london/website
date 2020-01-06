import React from 'react'
import { storiesOf } from '@storybook/react'
import Member from './Member'
import Advertiser from './Advertiser'

const submission = JSON.parse(
  '{"company":"Amazing Recruitment", "bio":"Full-stack developer focusing on data visualisation and data science. 10 years of experience. Mostly Javascript and Python. Running the Visualising Data London meetup.","date":{"seconds":1560172275,"nanoseconds":715000000},"email":"zdenek.hynek@gmail.com","github":"https://github.com/zdenekhynek","linkedin":"https://www.linkedin.com/in/zdenek-hynek-526a252b","name":"Zdenek Hynek","referrer":"Dan Voyce","role":"Web developer","twitter":"https://twitter.com/zdenekhynek"}'
)

storiesOf('Submission Card', module)
  .add('Member', () => (
    <div>
      <Member submission={submission} />
    </div>
  ))
  .add('Advertiser', () => (
    <div>
      <Advertiser submission={submission} />
    </div>
  ))
