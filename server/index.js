const express = require('express');
const { getProducts, getProductById, getProductStylesById } = require('./helpers/products.js');
const { addToCart, getCart } = require('./helpers/cart.js');
const { getRelatedStylesById, getRelatedProductsById, getRelatedProductsReviewMeta } = require('./helpers/relatedItems.js');
const { getQuestionsByProductId, submitQuestion, submitAnswer, markQuestionHelpful, markAnswerHelpful, reportQuestion, reportAnswer } = require('./helpers/questions.js');
// const getReviewsByID = require('./helpers/reviews.js').getReviewsByID;
const { getReviewsByID, getReviewsMeta, postReview, putReview, putReviewReported } = require('./helpers/reviews.js');
const { recordInteractions } = require('./helpers/interactions.js');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.get('/products', function (req, res) {
  getProducts()
    .then((data) => {
      console.log('server getProducts success', data);
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log('server getProducts error', error);
    })
});

app.get('/products/:product_id', function (req, res) {
  let id = req.params.product_id;
  getProductById(id)
    .then((data) => {
      console.log('server getProductById success', data);
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

app.post('/qa/questions', (req, res) => {
  let questionFormDetails = req.body;

  // product_id type changes between client and server. refactor client to use axios?
  questionFormDetails.product_id = parseInt(questionFormDetails.product_id);
  // console.log(`in server the product_id is: ${typeof questionFormDetails.product_id}`);

  submitQuestion(questionFormDetails)
    .then(() => {
      res.status(201).end();
    })
    .catch(() => {
      res.status(400).end();
    });
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  let question_id = req.params.question_id;
  let answerFormDetails = req.body;

  submitAnswer(question_id, answerFormDetails)
    .then(() => {
      res.status(201).end();
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
  getReviewsByID(req.query.product_id, req.query.sort, req.query.count)
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
  var review = req.body;
  // var review = req.query.review;
  console.log('req.body inside app.post in server index.js: ', review);
  postReview(review)
    .then((success) => {
      console.log('posting reviews success! data is: ', success.data);
      res.status(201).send(success.data);
    })
    .catch((error) => {
      console.log('error posting reviews!', error.response.data);
      // res.status(500).send(error);
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

app.post('/interactions', function (req, res) {
  let interactionsObj = req.body;
  recordInteractions(interactionsObj)
    .then((success) => {
      res.status(201).end();
    })
    .catch((error) => {
      res.status(500).end();
    })
})

// app.get('*', function (req, res) {
//   res.end(`
//   <!DOCTYPE html>
//   <html>

//   <head>
//     <title>Atelier</title>
//     <link rel="stylesheet" href="./style-sheets/stylesApp.css">
//     <link rel="stylesheet" href="./style-sheets/stylesRelatedProducts.css">
//     <link rel="stylesheet" href="./style-sheets/questionsAnswersMain.css">
//     <link rel="stylesheet" href="./style-sheets/stylesProductOverview.css">
//     <link rel="stylesheet" href="./style-sheets/stylesRatingsReviews.css">
//     <link rel="preconnect" href="https://fonts.googleapis.com">
//     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//     <link href="https://fonts.googleapis.com/css2?family=Lora:wght@500&display=swap" rel="stylesheet">
//     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
//     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap" rel="stylesheet">
//     <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
//     <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap" rel="stylesheet">
//     <link href="https://fonts.googleapis.com/css2?family=Arimo:wght@700&display=swap" rel="stylesheet">
//     <link rel="stylesheet" href="./style-sheets/stylesStarRating.css">
//     <script src="https://kit.fontawesome.com/5290ec3ec6.js" crossorigin="anonymous"></script>
//   </head>

//   <body>
//     <div id="app"></div>
//     <script type="text/javascript" src="bundle.js"></script>
//   </body>

//   </html>`);
// });


let port = 3000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
});