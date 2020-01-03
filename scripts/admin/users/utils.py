"""
sample dict as stored on firebase:
    {
        'github': 'https://github.com/blah',
        'adminDate': '2019-05-16T09:48:00.595Z',
        'bio': 'I like to write code',
        'adminUid': 'p60VyrQ2S1hv110Z9RYAdg8zrrQ2',
        'twitter': 'https://twitter.com/blah',
        'name': 'Clever Dev',
        'date': DatetimeWithNanoseconds(2019, 5, 15, 20, 31, 34, 318000, tzinfo=<UTC>),
        'linkedin': 'https://www.linkedin.com/in/blah',
        'uid': 'ud1us3RG8lcJxarozJGMJfernuU2',
        'applicant': 'members',
        'email': 'me@email.com',
        'referrer': "Someone",
        'role': 'Tech Director'
    }
"""
import os
import csv
import math
from google.cloud import firestore
from dotenv import load_dotenv

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

load_dotenv()

FIRESTORE_PRJ = 'devcon-london'

SLACK_FILE = 'slack-devconteam-members.csv'
SLACK_FIELDS = ['username', 'email', 'status', 'billing-active', 'has-2fa', 'has-sso', 'userid', 'fullname', 'displayname']

GOOGLE_GROUP_FILE = 'devconlondon.csv'

MEMBERS_EXPORT_FILE = 'devcon.members.csv'
MEMBERS_EXPORT_FIELDS = ['uid', 'name', 'email', 'referrer', 'date', 'linkedin', 'github', 'twitter', 'role']

email_body = """<strong>Hey, just a friendly poke from Devcon.network!</strong>
<p>It looks you are on our Slack, but you have not registered on our website yet.</p>
<p>Please visit <a href="https://devcon.network">Devcon.network</a> and create a new submission,</p>
<p>we'll make sure to give you access to the member's page as soon as possible.</p>
"""

def send_invite_email(recipient_list):
    message = Mail(
        from_email='Devcon.network <no-reply@devon.network>',
        to_emails=recipient_list,
        subject='Remember to join Devcon.network website!',
        html_content=email_body)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(f'email sent, response status: {response.status_code}, body: {response.body}')
        # print(response.headers)
    except Exception as e:
        print(str(e))


def csv_to_dict(key_field, csvfile):
    """
    reads a csv as dict (assuming fields are in the first line)
    returns a dict of dicts structured as follows: { key_field: { dict } }

    :param key_field: the field to be used as key of the output dict
    :param csvfile: the csvfile as python opened file i.e. not path
    :return: the dict of dicts
    """
    out = {}
    csvreader = csv.DictReader(csvfile)
    for row in csvreader:
        out[row.get(key_field)] = row
    return out


def load_members_from_firestore():
    """
    reads the whole /members collection from firestore and returns a dict of dict
    structured as follows: {user_id: { user_data }}

    :return: a dict containing all users data
    """
    db = firestore.Client(project=FIRESTORE_PRJ)

    out = {}
    members = db.collection(u'members').get()
    for m in members:
        out[m.id] = m.to_dict()
    return out


def load_members_from_csv(f_name=MEMBERS_EXPORT_FILE):
    """
    reads a member list from a firebase /members collection export stored in f_name
    and returns a dict of dicts structured as follows: {user_id: { user_data }}

    :param f_name:
    :return:
    """
    with open(f_name, newline='') as csvfile:
        out = csv_to_dict('uid', csvfile)
    return out


def load_slack_members(f_name=SLACK_FILE):
    """
    reads a member list from a slack export stored in f_name and returns a dict of dicts
    structured as follows: {user_id: { user_data }}

    :param f_name: name of the file
    :return: a dict containing all users data
    """
    with open(f_name, newline='') as csvfile:
        out = csv_to_dict('userid', csvfile)
    return out


def load_google_group_members(f_name=GOOGLE_GROUP_FILE):
    """
    reads a member list from a google groups export stored in f_name and returns a dict of dicts
    structured as follows: {email: { user_data }}

    :param f_name:  name of the file
    :return: a dict containing all users data
    """
    with open(f_name, newline='') as csvfile:
        out = csv_to_dict('Email address', csvfile)
    return out


def filter_emails(email_list):
    return filter(
        lambda x: x if x is not None and 'slack-bots' not in x else None,
        email_list)


def reconcile_members(website_members_dict, slack_members_dict, google_members_dict):
    """
    checks who's in and out of various groups. Sends emails to people who are on slack and not on website.
    prints a bunch of information for manual action.

    :param website_members_dict:
    :param slack_members_dict:
    :return:
    """
    # weird, throws a keyerror if accessing email with square brackets
    website_members_emails = set([m.get('email') for uid, m in website_members_dict.items()])
    slack_members_emails = set([m['email'] for uid, m in slack_members_dict.items()])
    google_members_emails = set([email for email in google_members_dict.keys()])

    print('++++++++++++++++++++++++++++++++')
    print(f'- devcon website members: {len(website_members_emails)}')
    print(f'- slack members: {len(slack_members_emails)}')
    print(f'- google group members: {len(google_members_emails)}')

    diffident = list(filter_emails(website_members_emails - slack_members_emails))
    lazy = list(filter_emails(slack_members_emails - website_members_emails))
    lost = list(filter_emails(slack_members_emails - google_members_emails))

    print(f'\n {len(diffident)} members in devcon not on slack: \n')
    print(f'------------------------------------------\n {", ".join(diffident)}')
    print('\n tip: manually check if they are not on slack and invite them to join')

    print(f'\n {len(lazy)} members in slack not on devcon: \n')
    print(f'------------------------------------------\n {", ".join(lazy)}')
    print('\n tip: invite them to join devcon website')
    invite = input(' do you want to send an email and ask them to join? [Y/n] ')
    if invite is 'Y':
        send_invite_email(lazy)
    else:
        print('emails not sent')

    print(f'\n {len(lost)} members in slack not on google groups: \n')
    print(f'------------------------------------------')
    max_invite = 10
    for i in range(0, math.ceil(len(lost) / max_invite)):
        print(f'group {i}: {", ".join(lost[i:i+max_invite])}')
    print('\n tip: invite them to join google group, 10 at a time')


def cast_field(field, members_dict):
    """
    converts a field to specified format, if defined, otherwise just returns the field

    :param field: the field to be selected from the dict
    :param members_dict: the whole dict
    :return: a converted field, if defined, otherwise just plain
    """
    # if field == 'date':
    #     return members_dict.get(field).isoformat()
    return members_dict.get(field)


def export_members(members_dict, fields=MEMBERS_EXPORT_FIELDS):
    """
    stores a members dict of dicts in csv format

    :param members_dict: a dict of dicts with members data
    :param fields: the list of fields to export
    :return:
    """
    with open(MEMBERS_EXPORT_FILE, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(MEMBERS_EXPORT_FIELDS)
        for m_id, m_dict in members_dict.items():
            csvwriter.writerow([cast_field(f, m_dict) for f in MEMBERS_EXPORT_FIELDS])
    print(f'\n devcon members saved to {MEMBERS_EXPORT_FILE}')


def run():
    """

    :return:
    """
    website_members_dict = load_members_from_firestore()
    export_members(website_members_dict)

    slack_members_dict = load_slack_members()
    google_members_dict = load_google_group_members()

    reconcile_members(website_members_dict, slack_members_dict, google_members_dict)


if __name__ == '__main__':
    run()
