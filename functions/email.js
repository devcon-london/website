// const nodemailer = require('nodemailer')
const functions = require('firebase-functions')
const sgMail = require('@sendgrid/mail')

exports.welcomeEmail = (email) => {
  const SENDGRID = functions.config().sendgrid;
  sgMail.setApiKey(SENDGRID.api_key)
  const msg = {
    to: email,
    from: '"Devcon.network" <no-reply@devcon.network>',
    subject: 'Welcome to Devcon.network!',
    text: 'Welcome on board!\n\nPlease check your inbox, you should shortly receive an invite to join our Slack Workspace and Google group mailing list',
    html: '<strong>Welcome on board!</strong><p>Please check your inbox, you should shortly receive an invite to join our Slack Workspace and Google group mailing list</p>',
  };
  sgMail.send(msg);
}

// exports.sendMail = (email, subject = `Hello world ${Date.now()}`) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: functions.config().email.smtp,
//       port: 465,
//       secure: true,
//       auth: {
//         user: functions.config().email.user,
//         pass: functions.config().email.pass,
//       },
//     })

//     return transporter.sendMail({
//       from: '"Devcon.rocks" <no-reply@devcon.rocks>', // sender address
//       to: email,
//       subject: subject,
//       text: subject,
//       html: `<b>${subject}</b>`,
//     })
//   } catch (e) {
//     throw new Error(e)
//   }
// }
