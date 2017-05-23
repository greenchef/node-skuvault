# Node SkuVault API Wrapper

[![CircleCI](https://circleci.com/gh/greenchef/node-skuvault/tree/master.svg?style=svg&circle-token=aaa354d7e3ed01f870f994fac8c038a6ca015229)](https://circleci.com/gh/greenchef/node-skuvault/tree/master)

See Sku Vault API reference for objects and required fields https://dev.skuvault.com/reference

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
  // tokens
});
```

### Brands

```sh
var brand = {
      "Name": "String"
    };
var sv = new SkuVault(config);
sv.brands.find().then(result => {
  // brands
});

sv.brands.create(brand).then(result => {
  // brands
});
```

### Products

```sh
var sv = new SkuVault(config);
sv.products.find().then(result => {
  // products
});
```

### Suppliers

```sh
var supplier = {
      "EmailTemplateMessage": "String",
      "EmailTemplateSubject": "String",
      "Emails": [
        "String"
      ],
      "Name": "String"
    };
var sv = new SkuVault(config);
sv.suppliers.find().then(result => {
  // suppliers
});

sv.suppliers.create(supplier).then(result => {
  // suppliers
});
```

### Inventory

```sh
var product = {
  "Code": "String",
  "LocationCode": "String",
  "Quantity": 0,
  "Reason": "String",
  "Sku": "String",
  "TenantToken": "String",
  "UserToken": "String",
  "WarehouseId": 0
};
var sv = new SkuVault(config);
sv.inventory.add().then(result => {
  // result
});
```
