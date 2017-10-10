Newer versions of node packages are not compatible with each other, so we are using the shrinkwrap concept. This involves running `npm shrinkwrap --dev`. However, this creates issues if you run Travis on Linux and create the shrinkwrap with MacOS. See https://github.com/npm/npm/issues/2679#issuecomment-150084700.

So,

```
# shrinkwrap
npm shrinkwrap --dev

# Manually edit `npm-shrinkwrap.json` to remove `fsevents`

# Manually add `fsevents` to `package.json`
```
