from .csv import csv_to_dict


SLACK_FILE = 'slack-devconteam-members.csv'
SLACK_FIELDS = ['username', 'email', 'status', 'billing-active', 'has-2fa', 'has-sso', 'userid', 'fullname', 'displayname']


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
