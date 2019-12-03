import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import { Section, PaperContainer as Paper } from '../../components/ui'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  containerHero: {
    position: 'relative',
    minHeight: theme.section.minHeight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hero: {
    transform: 'translateY(-150%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  heroTitle: {
    marginBottom: '0.25rem'
  },
  arrow: {
    position: 'absolute',
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
})

const content = [
  {
    title: 'How do I get in?',
    content:
      'You should know someone who is already in and willing to invite you.',
  },
  {
    title: 'Why is this community so private?',
    content:
      'Because we believe that keeping strong relationships between our members is healthy and granting access on an invite-basis is a way of doing so. Also, we can guarantee privacy for our members and avoid unsolicited contacts from people who are not interested in the community.',
  },
  {
    title: 'OK, I have an invite, how do I get in now?',
    content:
      'Login using your Github account, then head to the subscribe page and fill the form. One of the admins will review your submission and let you in.',
  },
  {
    title: 'Is my data private?',
    content:
      "All data is stored on Firebase, and only authenticated users can access it. Only members can see all other members' data. Please refer to the full <a href='/privacy'>Privacy & Policy</a> page",
  },
  {
    title: 'Cookies?',
    content: 'We only use cookies for the Google Analytics tracker.',
  },
  {
    title: 'Code of Conduct',
    content:
      "Please refer to Code of Conduct <a href='https://github.com/devcon-london/Code-Of-Conduct' rel=\"noopener noreferrer\" target='_blank'>Github repository.</Link>",
  },
]

const Home = ({ classes }) => (
  <div className={classes.root}>
    <Section>
      <Container className={classes.containerHero}>
        <div className={classes.hero}>
          <Typography variant="h1" className={classes.heroTitle}>
            DevCon
          </Typography>
          <Typography variant="subtitle1">
            invitation-only community of developers
          </Typography>
        </div>
      </Container>
      <ArrowDownwardIcon className={classes.arrow} />
    </Section>

    <Section>
      {content.map((c, index) => (
        <Paper elevation={0} className={classes.paper} key={index.toString()}>
          <Typography variant="h2" component="h4" gutterBottom>
            {c.title}
          </Typography>
          <Typography
            component="p"
            dangerouslySetInnerHTML={{ __html: c.content }}
          />
        </Paper>
      ))}
    </Section>
  </div>
)

export default withStyles(styles)(Home)
