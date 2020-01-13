import csv
from google.cloud import firestore

from .csv import csv_to_dict


FIRESTORE_PRJ = 'devcon-london'
MEMBERS_EXPORT_FILE = 'devcon.members.csv'
MEMBERS_EXPORT_FIELDS = ['uid', 'name', 'email', 'referrer', 'date', 'linkedin', 'github', 'twitter', 'role']


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


def cast_field(field, member_dict):
    """
    converts a field to specified format, if defined, otherwise just returns the field

    :param field: the field to be selected from the dict
    :param members_dict: the whole dict
    :return: a converted field, if defined, otherwise just plain
    """
    # if field == 'date':
    #     return members_dict.get(field).isoformat()
    return member_dict.get(field)


def export_members(members_dict, fields=MEMBERS_EXPORT_FIELDS):
    """
    stores a members dict of dicts in csv format

    :param members_dict: a dict of dicts with members data
    :param fields: the list of fields to export
    :return:
    """
    with open(MEMBERS_EXPORT_FILE, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(fields)
        for m_id, m_dict in members_dict.items():
            csvwriter.writerow([cast_field(f, m_dict) for f in fields])
    print(f'\n devcon members saved to {MEMBERS_EXPORT_FILE}')


def last_members_list(from_date, members_dict):
    return [
        m for m in sorted(members_dict.values(), key=lambda x: x['date'])
        if m['date'] > from_date
    ]
