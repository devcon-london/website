const functions = require('firebase-functions');
const { notifySlack } = require('./slack');
const { sendMail } = require('./sendMail');

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

exports.testEmail = functions.https.onRequest(async (req, res) => {
  if(!req.query.email || req.query.email.length < 1) {
    res.send('please use this service with ?email=email@email.com')
    return false
  }
  
  try {
    const email = await sendMail(req.query.email)
    console.log(email);
    res.send(`Email sent to ${req.query.email}`)
  } catch (e) {
    console.log(e)
    res.send(e.toString())
    return false
  }
})