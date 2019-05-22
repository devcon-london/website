import React from 'react'
import Typography from '@material-ui/core/Typography'

const Terms = () => (
  <div>
    <Typography variant="h4" gutterBottom>
      Privacy.
    </Typography>
    <p>
      All data is stored on Firebase, and only authenticated users can access
      it. Only members can see all other members' data.
    </p>
    <p>Also, we only use cookies for the Google Analytics tracker.</p>
    <Typography variant="h4" gutterBottom>
      Code of conduct.
    </Typography>
    <p>Please refer to the guidelines received when you joined the group.</p>
  </div>
)

export default Terms
