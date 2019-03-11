# concept

check the following:

- [firebase rules](../src/.rules) stored in a `.rules` file here are presently uploaded manually via firebase console
- [firebase collections](../src/constants.js) defined in a constants file

## submission flow

if you are logged in and you are not a member or don't have a pending submission, you can submit a new membership request

the request will be saved in the `submissions` collection of firebase

an admin will then either approve (i.e. make it go in the `members` collection) or reject (i.e. make it go to the `rejects` collection) the submission

to either approve or reject the sumbission, you must be defined as an admin, i.e. there must be a matching id in the `roles` collection with a field defined `isAdmin: true`
