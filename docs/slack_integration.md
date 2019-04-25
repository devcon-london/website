# Submission notifications

a webhook url has been defined to post notifications from a firebase function to slack private channel `#devcon-admin`, this has been configured as follows:

```bash
# setting variable
firebase functions:config:set slack_integration.webhook_url="SECRET_URL"
# retrieving variable
firebase functions:config:get
{
  "slack_integration": {
    "webhook_url": "SECRET_URL"
  }
}
```

for further documentation, check firebase docs [here](https://firebase.google.com/docs/functions/config-env)
