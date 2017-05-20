# Node SkuVault API Wrapper

[![CircleCI](https://circleci.com/gh/greenchef/node-skuvault/tree/master.svg?style=svg&circle-token=aaa354d7e3ed01f870f994fac8c038a6ca015229)](https://circleci.com/gh/greenchef/node-skuvault/tree/master)

```sh
# setup
yarn
# run tests
DEBUG=sv:req npm test
```

### SkuVault Config

See [config.json](config.json) for config json object

### Brands Example

```sh
var brands = new Brands(config);
brands.find().then(result => {
  // brands
});
```
