import csv
from google.cloud import firestore

SLACK_FILE = 'slack-devconteam-members.csv'
SLACK_FIELDS = ['username', 'email', 'status', 'billing-active', 'has-2fa', 'has-sso', 'userid', 'fullname', 'displayname']
EXPORT_FILE = 'devcon.members.csv'
EXPORT_FIELDS = ['name', 'email', 'date', 'linkedin', 'github', 'twitter', 'referrer', 'role', 'bio']

"""
sample dict:
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

def members_collection_to_dict(db):
    out = {}
    members = db.collection(u'members').get()
    for m in members:
        out[m.id] = m.to_dict()
    return out


def cast_field(field, members_dict):
    # if field == 'date':
    #     return members_dict.get(field).isoformat()
    return members_dict.get(field)


def export_members(members_dict, fields=EXPORT_FIELDS):
    with open(EXPORT_FILE, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(EXPORT_FIELDS)
        for m_id, m_dict in members_dict.items():
            csvwriter.writerow([cast_field(f, m_dict) for f in EXPORT_FIELDS])
    print(f'\n devcon members saved to {EXPORT_FILE}')


def load_slack_members():
    out = {}
    with open(SLACK_FILE, newline='') as csvfile:
        csvreader = csv.DictReader(csvfile)
        for row in csvreader:
            out[row['userid']] = row
    return out


def reconcile_members(members_dict, slack_members_dict):
    # weird, throws a keyerror if accessing with square brackets
    members_emails = set([m.get('email') for uid, m in members_dict.items()])
    slack_members_emails = set([m['email'] for uid, m in slack_members_dict.items()])
    print('++++++++++++++++++++++++++++++++')
    print(f'there are {len(members_emails)} registered devcon members and {len(slack_members_emails)} slack members')
    print('\n list of members in devcon not on slack: \n')
    print(f'------------------------------------------\n {members_emails - slack_members_emails}')
    print('\n list of members in slack not on devcon: \n')
    print(f'------------------------------------------\n {slack_members_emails - members_emails}')


def run():
    db = firestore.Client()
    members_dict = members_collection_to_dict(db)
    slack_members_dict = load_slack_members()
    reconcile_members(members_dict, slack_members_dict)
    export_members(members_dict)


if __name__ == '__main__':
    run()
