const express = require('express');
const { getProducts, getProductById, getProductStylesById } = require('./helpers/products.js');
const { addToCart, getCart } = require('./helpers/cart.js');
const { getRelatedStylesById, getRelatedProductsById, getRelatedProductsReviewMeta} = require('./helpers/relatedItems.js');
const { getQuestionsByProductId, markQuestionHelpful, markAnswerHelpful, reportQuestion, reportAnswer } = require('./helpers/questions.js');
// const getReviewsByID = require('./helpers/reviews.js').getReviewsByID;
const { getReviewsByID, getReviewsMeta, postReview, putReview, putReviewReported } = require('./helpers/reviews.js');


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
  console.log(req.body.skuId);
  addToCart(req.body.skuId)
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
  getRelatedProductsById(req.params.product_id)
    .then((productData) => {
      // console.log('server getProductById success', productData);


      for (var i = 0; i < productData.length; i++) {
        relatedProducts.push(productData[i])
        // relatedProducts.push(productData[i])
      }
      // console.log('server relatedProducts ', relatedProducts);

      // relatedProducts = productData;
      getRelatedStylesById(req.params.product_id)
        .then((stylesData) => {
          for (var i = 1; i < relatedProducts.length; i++) {
            for (var j = 0; j < stylesData.length; j++) {
              if (relatedProducts[i].id.toString() === stylesData[j].product_id) {
                relatedProducts[i]['photos'] = stylesData[j].results[0].photos;
              }
            }
          }
          getRelatedProductsReviewMeta(req.params.product_id, relatedProducts[0])
            .then((reviewMetaData) => {
              for (var i = 1; i < relatedProducts.length; i++) {
                for (var j = 0; j < reviewMetaData.length; j++) {
                  if (relatedProducts[i].id.toString() === reviewMetaData[j].product_id) {
                    relatedProducts[i]['meta_ratings'] = reviewMetaData[j].ratings;
                  }
                }
              }
              res.status(200).send(relatedProducts);
              // console.log('reviews Meta Data', reviewMetaData);
            })
            .catch((error) => {
              console.log('server getRelatedProductsReviewMeta error', error);
              res.status(500).send(error);
            })
        })
        .catch((error) => {
          console.log('server getProductStylesById error', error);
          res.status(500).send(error);
        })
    })
    .catch((error) => {
      console.log('server getProductStylesById error', error);
      res.status(500).send(error);
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
      res.status(500).send(error);
    })
});

app.get('/reviews/meta', function (req, res) {
  getReviewsMeta(req.query.product_id)
    .then((success) => {
      // console.log('getting reviews meta success! data is: ', success.data);
      res.status(200).send(success.data);
    })
    .catch((error) => {
      console.log('error getting reviews!');
      res.status(500).send(error);
    })
});

app.post('/reviews', function (req, res) {
  postReview(req.query.product_id, req.query.rating, req.query.summary, req.query.body, req.query.recommend, req.query.name, req.query.email, req.query.photos, req.query.characteristics)
    .then((success) => {
      // console.log('getting reviews meta success! data is: ', success.data);
      res.status(201).send(success.data);
    })
    .catch((error) => {
      console.log('error getting reviews!');
      res.status(500).send(error);
    })
});

app.put('/reviews/:review_id/helpful', function (req, res) {
  var id = req.params.review_id;
  putReview(id)
    .then((success) => {
      console.log('server putReview Review was found helpful success!');
      res.status(204).send(success.data);
    })
    .catch((error) => {
      console.log('server putReview Review was found helpful error!');
      res.status(500).send(error);
    })
});

app.put('/reviews/:review_id/report', function (req, res) {
  var id = req.params.review_id;
  putReviewReported(id)
    .then((success) => {
      console.log('server putReviewReported Review was reported: success!');
      res.status(204).send(success.data);
    })
    .catch((error) => {
      console.log('server putReviewReported: error!');
      res.status(500).send(error);
    })
});


let port = 3000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});