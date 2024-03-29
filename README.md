# Node SkuVault API Wrapper

[![CircleCI](https://circleci.com/gh/greenchef/node-skuvault/tree/master.svg?style=svg&circle-token=aaa354d7e3ed01f870f994fac8c038a6ca015229)](https://circleci.com/gh/greenchef/node-skuvault/tree/master)

See Sku Vault API reference for objects and required fields https://dev.skuvault.com/reference

```sh
# setup
yarn
# run tests
DEBUG=sv:req yarn test
```

| Class | Method | Param | SkuVault Endpoint |
| --- | --- | --- | --- |
| auth | login | object | /getTokens |
| brands | find | object | /products/getBrands |
| brands | create | object | /products/createBrands |
| suppliers | find | object | /products/getSuppliers |
| suppliers | create | object | /products/createSuppliers |
| products | find | object | /products/getProducts |
| products | create | object | /products/createProduct |
| products | create | array | /products/createProducts |
| products | update | object | /products/updateProduct |
| products | update | array | /products/updateProducts |
| inventory | find | object | /inventory/getItemQuantities |
| inventory | add | object | /inventory/addItem |
| inventory | add | array | /inventory/addItemBulk |
| inventory | remove | object | /inventory/removeItem |
| inventory | remove | array | /inventory/removeItemBulk |

## Examples

### Library Usage

```sh
// ES5
var SV = require('@greenchef/node-skuvault'),
    sv = new SV.SkuVault(config);

// ES2015 w/ require()
var {SkuVault, ApiException} = require('@greenchef/node-skuvault'),
    sv = new SkuVault(config);

// ES2015 w/ import through Babel
import {SkuVault, ApiException} from '@greenchef/node-skuvault';
var sv = new SkuVault(config);
```
### Config Options

```sh
# set on init
var sv = new SkuVault(config);
# or set with options
sv.options(config);
```

See [config.json](config.json) for config json object

```json
{
  "apiUrl": "https://staging.skuvault.com/api",
  "UserToken" : "asdfafd",
  "TenantToken" : "asdfsadf",
  "appdProfile": {}  
}
```

| Option | Type | Value | Default |
| --- | --- | --- | --- |
| apiUrl | string | Sku Vault API Url | https://staging.skuvault.com/api |
| UserToken | string | Sku Vault User Token | |
| TenantToken | string | Sku Vault Tenant Token | |
| log | boolean | Winston log the API request | true |
| appdProfile | object | App Dynamics profile object | null |

### Authentication

```sh
sv.auth.login().then(result => {
  // tokens
});
```

### Brands

```sh
var brand = {
      "Name": "String"
    };
sv.brands.find().then(result => {
  // brands
});

sv.brands.create(brand).then(result => {
  // brands
});
```

### Products

```sh
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
sv.inventory.add(product).then(result => {
  // result
});
```
