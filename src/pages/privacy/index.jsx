import React from 'react'
import { Typography, withStyles } from '@material-ui/core'
import { Section, Container as Paper } from '../../components/ui'

const styles = theme => ({})

const Privacy = () => (
  <Section>
    <Paper>
      <Typography variant="h1">Privacy Policy for Devcon.network</Typography>

      <Typography variant="body1">
        At Devcon.network, accessible from devcon.network, one of our main
        priorities is the privacy of our visitors. This Privacy Policy document
        contains types of information that is collected and recorded by
        Devcon.network and how we use it.
      </Typography>

      <Typography variant="body1">
        If you have additional questions or require more information about our
        Privacy Policy, do not hesitate to contact us.
      </Typography>

      <Typography variant="h2">Log Files</Typography>

      <Typography variant="body1">
        Devcon.network follows a standard procedure of using log files. These
        files log visitors when they visit websites. All hosting companies do
        this and a part of hosting services' analytics. The information
        collected by log files include internet protocol (IP) addresses, browser
        type, Internet Service Provider (ISP), date and time stamp,
        referring/exit pages, and possibly the number of clicks. These are not
        linked to any information that is personally identifiable. The purpose
        of the information is for analyzing trends, administering the site,
        tracking users' movement on the website, and gathering demographic
        information.
      </Typography>

      <Typography variant="h2">Cookies and Web Beacons</Typography>

      <Typography variant="body1">
        Like any other website, Devcon.network uses 'cookies'. These cookies are
        used to store information including visitors' preferences, and the pages
        on the website that the visitor accessed or visited. The information is
        used to optimize the users' experience by customizing our web page
        content based on visitors' browser type and/or other information.
      </Typography>

      <Typography variant="h2">Privacy Policies</Typography>

      <Typography variant="body1">
        You may consult this list to find the Privacy Policy for each of the
        advertising partners of Devcon.network. Our Privacy Policy was created
        with the help of the{' '}
        <a href="https://www.privacypolicygenerator.info">
          Privacy Policy Generator
        </a>{' '}
        and the{' '}
        <a href="https://www.privacypolicyonline.com">
          Privacy Policy Generator Online
        </a>
        .
      </Typography>

      <Typography variant="body1">
        Third-party ad servers or ad networks uses technologies like cookies,
        JavaScript, or Web Beacons that are used in their respective
        advertisements and links that appear on Devcon.network, which are sent
        directly to users' browser. They automatically receive your IP address
        when this occurs. These technologies are used to measure the
        effectiveness of their advertising campaigns and/or to personalize the
        advertising content that you see on websites that you visit.
      </Typography>

      <Typography variant="body1">
        Note that Devcon.network has no access to or control over these cookies
        that are used by third-party advertisers.
      </Typography>

      <Typography variant="h2">Third Party Privacy Policies</Typography>

      <Typography variant="body1">
        Devcon.network's Privacy Policy does not apply to other advertisers or
        websites. Thus, we are advising you to consult the respective Privacy
        Policies of these third-party ad servers for more detailed information.
        It may include their practices and instructions about how to opt-out of
        certain options. You may find a complete list of these Privacy Policies
        and their links here: Privacy Policy Links.
      </Typography>

      <Typography variant="body1">
        You can choose to disable cookies through your individual browser
        options. To know more detailed information about cookie management with
        specific web browsers, it can be found at the browsers' respective
        websites. What Are Cookies?
      </Typography>

      <Typography variant="h2">Children's Information</Typography>

      <Typography variant="body1">
        Another part of our priority is adding protection for children while
        using the internet. We encourage parents and guardians to observe,
        participate in, and/or monitor and guide their online activity.
      </Typography>

      <Typography variant="body1">
        Devcon.network does not knowingly collect any Personal Identifiable
        Information from children under the age of 13. If you think that your
        child provided this kind of information on our website, we strongly
        encourage you to contact us immediately and we will do our best efforts
        to promptly remove such information from our records.
      </Typography>

      <Typography variant="h2">Online Privacy Policy Only</Typography>

      <Typography variant="body1">
        This Privacy Policy applies only to our online activities and is valid
        for visitors to our website with regards to the information that they
        shared and/or collect in Devcon.network. This policy is not applicable
        to any information collected offline or via channels other than this
        website.
      </Typography>

      <Typography variant="h2">Consent</Typography>

      <Typography variant="body1">
        By using our website, you hereby consent to our Privacy Policy and agree
        to its Terms and Conditions.
      </Typography>
    </Paper>
  </Section>
)

export default withStyles(styles, { withTheme: true })(Privacy)
