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
import math
from datetime import timedelta, datetime, timezone
from dotenv import load_dotenv

from utils.email import send_invite_email, filter_emails, send_newsletter
from utils.website import load_members_from_firestore, export_members, last_members_list
from utils.slack import load_slack_members
from utils.google_groups import load_google_group_members

load_dotenv()


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
        print(f'group {i}: {", ".join(lost[max_invite*i:max_invite*i+max_invite-1])}')
    print('\n tip: invite them to join google group, 10 at a time')


def run():
    """

    :return:
    """
    website_members_dict = load_members_from_firestore()
    export_members(website_members_dict)

    # slack_members_dict = load_slack_members()
    # google_members_dict = load_google_group_members()

    # reconcile_members(website_members_dict, slack_members_dict, google_members_dict)

    member_from = datetime.now(timezone.utc) - timedelta(days=7)
    send_newsletter(last_members_list(member_from, website_members_dict))


if __name__ == '__main__':
    run()
