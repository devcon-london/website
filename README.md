# devcon.london

website v2, work in progress

refer to [docs](./docs) folder for documentation, where available

to deploy you need both the `website` and `devcon-london.github.io`, assuming they are under the same root:

```bash
cd website
npm run build
cd ../devcon-london.github.io
cp -a ../website/build/* .
git commit -a -m "new release"
git push
```
