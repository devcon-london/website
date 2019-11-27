const functions = require('firebase-functions');
const { IncomingWebhook } = require('@slack/webhook');

exports.notifySlack = (msg) => {
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