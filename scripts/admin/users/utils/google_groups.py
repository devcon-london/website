from .csv import csv_to_dict


GOOGLE_GROUP_FILE = 'devconlondon.csv'


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
