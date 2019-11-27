const axios = require('axios');
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

exports.inviteSlack = async (email) => {
  try {
    const SLACK_TOKEN = functions.config().slack_integration.token;
    const SLACK_INVITE_ENDPOINT = 'https://slack.com/api/users.admin.invite';
    const QUERY_PARAMS = `email=${email}&token=${SLACK_TOKEN}&set_active=true`;
    
    const request = await axios.get(`${SLACK_INVITE_ENDPOINT}?${QUERY_PARAMS}`)
    // TODO: return what you need after the request
    console.log(request)
  } catch (e) {
    throw new Error(e)
  }
}