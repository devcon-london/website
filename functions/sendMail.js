const nodemailer = require('nodemailer')
const functions = require('firebase-functions')

exports.sendMail = (email, subject = `Hello world ${Date.now()}`) => {
  try {
    const transporter = nodemailer.createTransport({
      host: functions.config().email.smtp,
      port: 465,
      secure: true,
      auth: {
        user: functions.config().email.user,
        pass: functions.config().email.pass,
      },
    })

    return transporter.sendMail({
      from: '"Devcon.rocks" <no-reply@devcon.rocks>', // sender address
      to: email,
      subject: subject,
      text: subject,
      html: `<b>${subject}</b>`,
    })
  } catch (e) {
    throw new Error(e)
  }
}
