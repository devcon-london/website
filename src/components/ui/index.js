import React from 'react'
import { Typography } from '@material-ui/core'

export const Title = ({ children }) => (
  <Typography variant="h1" gutterBottom>
    {children}
  </Typography>
)
