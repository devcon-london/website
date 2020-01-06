export const DBCollections = {
  submissions: 'submissions',
  members: 'members',
  advertisers: 'advertisers',
  rejects: 'rejects',
  roles: 'roles',
}

export const DBSnapshots = {
  membersUnsubscribe: undefined,
}

export const Sizes = {
  drawerWidth: 240,
}

// visibility of links
// 0: public
// 1: private
// 2: already a member, dont show

export const NavItems = [
  {
    to: '/',
    text: 'Home',
    visibility: 0,
  },
  {
    to: '/subscribe',
    text: 'Subscribe',
    visibility: 2,
  },
  {
    to: '/members',
    text: 'Members',
    visibility: 1,
  },
  {
    to: '/advertisers',
    text: 'Advertisers',
    visibility: 1,
  },
  {
    to: '/submissions',
    text: 'Submissions',
    visibility: 1,
  },
]

export const Errors = {
  errorLoading: 'Error loading data from the database',
  errorSaving: 'Error while saving data',
  loginFirst: 'You need to login to access this section',
  sectionPermission: 'You do not have enough rights to access this section',
  notAMember:
    'If you are looking for a community membership, you should apply first. Check the "Subscribe" section!',
}
