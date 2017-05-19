# Node SkuVault API Wrapper

```sh
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
