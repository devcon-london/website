import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


invite_email_body = """<strong>Hey, just a friendly poke from Devcon.network!</strong>
<p>It looks you are on our Slack, but you have not registered on our website yet.</p>
<p>Please visit <a href="https://devcon.network">Devcon.network</a> and create a new submission,</p>
<p>we'll make sure to give you access to the member's page as soon as possible.</p>
"""


def send_invite_email(recipient_list):
    message = Mail(
        from_email='Devcon.network <no-reply@devon.network>',
        to_emails=recipient_list,
        subject='Remember to join Devcon.network website!',
        html_content=invite_email_body)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(f'email sent, response status: {response.status_code}, body: {response.body}')
        # print(response.headers)
    except Exception as e:
        print(str(e))


def send_newsletter(last_members_list):
    newsletter_body = '\n'.join([
        f'<h3>{m["name"]}, {m["role"]}</h3><p>{m.get("bio", "empty bio")} {m.get("twitter", "empty twitter handler")}</p>'
        for m in last_members_list
    ])
    print(newsletter_body)


def filter_emails(email_list):
    return filter(
        lambda x: x if x is not None and 'slack-bots' not in x else None,
        email_list)
