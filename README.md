# Node SkuVault API Wrapper

[![CircleCI](https://circleci.com/gh/greenchef/node-skuvault/tree/master.svg?style=svg&circle-token=aaa354d7e3ed01f870f994fac8c038a6ca015229)](https://circleci.com/gh/greenchef/node-skuvault/tree/master)

```sh
# setup
yarn
# run tests
DEBUG=sv:req yarn test
```

### SkuVault Config

See [config.json](config.json) for config json object

```json
{
  "skuvault" : {
    "apiUrl": "https://staging.skuvault.com/api",
    "UserToken" : "asdfafd",
    "TenantToken" : "asdfsadf"
  }
}
```

### Authentication

```sh
var sv = new SkuVault(config);
sv.auth.login().then(result => {
  // brands
});
```

### Brands

```sh
var sv = new SkuVault(config);
sv.brands.find().then(result => {
  // brands
});
```

### Products

```sh
var sv = new SkuVault(config);
sv.products.find().then(result => {
  // brands
});
```

### Suppliers

```sh
var sv = new SkuVault(config);
sv.suppliers.find().then(result => {
  // brands
});
```
