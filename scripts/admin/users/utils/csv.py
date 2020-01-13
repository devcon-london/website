import csv


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
