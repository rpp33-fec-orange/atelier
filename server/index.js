const express = require('express');
const { getProducts, getProductById, getProductStylesById } = require('./helpers/products.js');
const { addToCart, getCart } = require('./helpers/cart.js');
const { getRelatedStylesById, getProductsById } = require('./helpers/relatedItems.js');
const { getQuestionsByProductId, markQuestionHelpful, markAnswerHelpful, reportQuestion, reportAnswer } = require('./helpers/questions.js');
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

app.get('/products/:product_id', function (req, res) {
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

app.get('/qa/questions/:product_id', (req, res) => {
  let id = req.params.product_id;
  getQuestionsByProductId(id)
    .then((data) => {
      // console.log('server getQuestionsByProductId success');
      res.status(200).json(data).end();
    })
    .catch(() => {
      // console.log('server getQuestionsByProductId error');
      res.status(400).end();
    });
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  let id = req.params.question_id;
  markQuestionHelpful(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(400).end();
    });
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  let id = req.params.answer_id;
  markAnswerHelpful(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(400).end();
    });
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  let id = req.params.question_id;
  reportQuestion(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(400).end();
    });
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  let id = req.params.answer_id;
  reportAnswer(id)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(400).end();
    });
});

app.get('/cart', function (req, res) {
  getCart()
    .then((data) => {
      console.log('server getCart success');
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log('server getCart reviews');
    })
});

app.post('/cart', function (req, res) {
  addToCart(req.body.cartItem)
    .then((data) => {
      console.log('server addToCart success');
      res.status(201).send(data);
    })
    .catch((error) => {
      console.log('server addToCart error');
    })
});

app.get('/products/:product_id/related', function (req, res) {
  var relatedProducts = [];
  getProductsById(req.params.product_id)
    .then((productData) => {
      console.log('server getProductById success');
      relatedProducts = productData;
      getRelatedStylesById(req.params.product_id)
        .then((stylesData) => {
          for (var i = 0; i < relatedProducts.length; i++) {
            for (var j = 0; j < stylesData.length; j++) {
              if (relatedProducts[i].id.toString() === stylesData[j].product_id) {
                relatedProducts[i]['photos'] = stylesData[j].results[0].photos;
              }
            }
          }
          res.status(200).send(relatedProducts);
        })
        .catch((error) => {
          console.log('server getProductStylesById error');
        })
    })
    .catch((error) => {
      console.log('server getProductStylesById error');
    })
});

app.get('/reviews/', function (req, res) {
  getReviewsByID(req.query.product_id)
    .then((success) => {
      // console.log('getting reviews success! data is: ', success.data.results);
      res.status(200).send(success.data);
    })
    .catch((error) => {
      console.log('error getting reviews!');
    })
});

let port = 2000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});