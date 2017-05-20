# Node SkuVault API Wrapper

[![Circle CI](https://circleci.com/gh/greenchef/node-skuvault/tree/master.svg?style=svg&circle-token=887416cc1d6459e4702cbc8401791dbc41f8cd31)](https://circleci.com/gh/greenchef/node-skuvault/tree/master)

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
