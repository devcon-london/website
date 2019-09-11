import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link';

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
    <p>Please refer to Code of Conduct <Link href='https://github.com/devcon-london/Code-Of-Conduct' rel="noopener noreferrer" target='_blank'>Github repository.</Link></p>
  </div>
)

export default Terms
