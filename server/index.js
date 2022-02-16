const express = require('express');
const getProducts = require('./helpers/products.js').getProducts;
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.get('/products', function (req, res) {
  getProducts()
    .then((data) => {
      console.log('server /products success');
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log('server /products error');
    })
});

let port = 2000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});