const functions = require('firebase-functions');

const SlackWebhook = require('@slack/webhook');

const { IncomingWebhook } = SlackWebhook;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const notifySlack = (msg) => {
  const url = functions.config().slack_integration.webhook_url;
  const webhook = new IncomingWebhook(url, {});

  return webhook
    .send({
      text: msg,
    })
    .then(() => {
      console.log('notification sent');
    })
    .catch((e) => {
      console.log('error while posting to slack', e);
    });
};

exports.notifySubmission = functions.firestore
  .document('submissions/{userId}')
  .onCreate((snap, context) => {
    const newSub = snap.data();
    const msg = `New submission! ${newSub.name} wants to join the Devcon ${newSub.applicant} community`;
    notifySlack(msg);
    return true;
  });
