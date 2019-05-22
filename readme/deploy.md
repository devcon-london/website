# deploy

this site is hosted on firebase

## automatic

deploys are made by CI, check the `.circleci` folder for details

## manual

you need to have access to the `devcon-london` firebase project, then

```bash
npm run install
SKIP_PREFLIGHT_CHECK=true npm run build
./node_modules/.bin/firebase deploy
```
