const express = require('express');
const getProducts = require('./helpers/products.js').getProducts;
const getProductById = require('./helpers/products.js').getProductById;
const getProductStylesById = require('./helpers/products.js').getProductStylesById;
const getReviewsByID = require('./helpers/reviews.js').getReviewsByID;
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.get('/products', function (req, res) {
  getProducts()
    .then((data) => {
      console.log('server getProducts success');
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log('server getProducts error');
    })
});

app.get('/products/:product_id', function (req, res) { //products?product_id=insertHere
  let id = req.params.product_id;
  getProductById(id)
    .then((data) => {
      console.log('server getProductById success');
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log('server getProductById error');
    })
});

app.get('/products/:product_id/styles', function (req, res) {
  console.log('server product styles id', req.params.product_id);
  let id = req.params.product_id;
  getProductStylesById(id)
    .then((data) => {
      console.log('server getProductStylesById success');
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log('server getProductStylesById error');
    })
});

app.get('/reviews/', function (req, res) {
  getReviewsByID(req.query.product_id)
    .then((data) => {
      console.log('getting reviews success! data is: ', data);
      console.log('reviews are: ', data);
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log('error getting reviews!');
    })
});

let port = 2000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});