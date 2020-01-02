import React from 'react'
import { storiesOf } from '@storybook/react'
import Member from './Member'

const member = JSON.parse(
  '{"adminDate":"2019-06-18T09:38:17.794Z","adminUid":"p60VyrQ2S1hv110Z9RYAdg8zrrQ2","applicant":"members","bio":"Full-stack developer focusing on data visualisation and data science. 10 years of experience. Mostly Javascript and Python. Running the Visualising Data London meetup.","date":{"seconds":1560172275,"nanoseconds":715000000},"email":"zdenek.hynek@gmail.com","github":"https://github.com/zdenekhynek","linkedin":"https://www.linkedin.com/in/zdenek-hynek-526a252b","name":"Zdenek Hynek","referrer":"Dan Voyce","role":"Web developer","twitter":"https://twitter.com/zdenekhynek","uid":"RkFxMttG4fRMg9viJiRAZQGGkPw1"}'
)

storiesOf('Member', module)
  .add('Member', () => (
    <div>
      <Member member={member} />
    </div>
  ))
  .add('Member Editable', () => (
    <div>
      <Member member={member} editable />
    </div>
  ))
