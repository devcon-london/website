const functions = require('firebase-functions');
const { notifySlack, inviteSlack } = require('./slack');
const { welcomeEmail } = require('./email');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.notifySubmission = functions.firestore
  .document('submissions/{userId}')
  .onCreate((snap) => {
    const newSub = snap.data();
    const msg = `New submission! ${newSub.name} wants to join the Devcon ${newSub.applicant} community`;
    notifySlack(msg);
    return true;
  });

exports.notifyMembership = functions.firestore
  .document('members/{userId}')
  .onCreate((snap) => {
    const newMember = snap.data();
    welcomeEmail(newMember.email);
    inviteSlack(newMember.email);
    const msg = `A welcome email and invite to Slack have been sent to ${newMember.email}`;
    notifySlack(msg);
  });

// exports.testEmail = functions.https.onRequest(async (req, res) => {
//   if(!req.query.email || req.query.email.length < 1) {
//     res.send('please use this service with ?email=email@email.com')
//     return false
//   }

//   try {
//     const email = await sendMail(req.query.email)
//     console.log(email);
//     res.send(`Email sent to ${req.query.email}`)
//   } catch (e) {
//     console.log(e)
//     res.send(e.toString())
//     return false
//   }
// })
