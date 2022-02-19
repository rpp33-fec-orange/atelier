const axios = require('axios');
const Promise = require('promise');
const  $ = require('jquery')
const {API_KEY} = require ('../../config.js');

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';


const getProductsById = (id) => { //This function makes a GET request for product info by product_id

  console.log('product id at server helper', id);
  var relatedProductsInfoPromiseArray = [];
  var relatedProductsInfoArray = [];

  return axios({
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/related`,
    headers: { 'Authorization': API_KEY},
  })
    .then((productIds) => {
      // console.log('productIds at helper function', productIds)
      for (var i = 0; i < productIds.data.length; i++) {

        relatedProductsInfoPromiseArray.push (

          axios({
            method: 'GET',
            url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productIds.data[i]}`,
            headers: { 'Authorization': API_KEY},
          })
          .then((productInfo) => {
            return relatedProductsInfoArray.push(productInfo.data);
          })
        )
      }

      return Promise.all(relatedProductsInfoPromiseArray)
      .then(() => {
        return relatedProductsInfoArray;
      });
    })
    .catch((err) => {
      console.log('error in related items helper function', err)
    })
}

const getRelatedStylesById = (id) => { //This function makes a GET request for product info by product_id

  console.log('product id at server helper', id);
  var relatedStylesInfoPromiseArray = [];
  var relatedStylesInfoArray = [];

  return axios({
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/related`,
    headers: { 'Authorization': API_KEY},
  })
    .then((productIds) => {
      for (var i = 0; i < productIds.data.length; i++) {

        relatedStylesInfoPromiseArray.push (
          axios({
            method: 'GET',
            url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productIds.data[i]}/styles`,
            headers: { 'Authorization': API_KEY},
          })
          .then((productStyles) => {
            return relatedStylesInfoArray.push(productStyles.data);
          })
        )
      }

      return Promise.all(relatedStylesInfoPromiseArray)
      .then(() => {
        return relatedStylesInfoArray;
      });
    })
    .catch((err) => {
      console.log('error in related items helper function', err)
    })
}

module.exports.getRelatedStylesById = getRelatedStylesById;
module.exports.getProductsById = getProductsById;







// Related Products Ends Point //

// const getRelatedStylesById = require('./helpers/relatedItems.js').getRelatedStylesById;
// const getProductsById = require('./helpers/relatedItems.js').getProductsById;

// app.get('/products/:product_id/related', function (req, res) {
//   // console.log('server product id bhrigu', req.params.product_id);

//   var relatedProducts = [];

//   getProductsById(req.params.product_id)
//     .then((productData) => {
//       console.log('server getProductById success');
//       // res.status(200).send(data);
//       relatedProducts = productData;

//       getRelatedStylesById(req.params.product_id)
//       .then((stylesData) => {

//         for (var i = 0; i < relatedProducts.length; i++) {
//           for (var j = 0; j < stylesData.length; j++) {
//             if (relatedProducts[i].id.toString() === stylesData[j].product_id) {
//               relatedProducts[i]['photos'] = stylesData[j].results[0].photos;
//             }
//           }
//         }
//         res.status(200).send(relatedProducts);
//       })
//       .catch((error) => {
//         console.log('server getProductStylesById error');
//       })

//     })
//     .catch((error) => {
//       console.log('server getProductStylesById error');
//     })
// });

// app.get('/products/:product_id/relatedStyles', function (req, res) {
//   // console.log('server product id bhrigu', req.params.product_id);

//   getRelatedStylesById(req.params.product_id)
//     .then((data) => {
//       console.log('server getProductStylesById success', data);
//       res.status(200).send(data);
//     })
//     .catch((error) => {
//       console.log('server getProductStylesById error');
//     })
// });

// //
