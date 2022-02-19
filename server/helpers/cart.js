const axios = require('axios');
const config = require('../../config.js');

const addToCart = function (cartItem) {
  return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart', { headers: { 'Authorization': config.API_KEY } })
    .then(success => {
      console.log('api addToCart GET success: ');
    })
    .catch(error => {
      console.log('api addToCart GET error')
    })
};

const getCart = function () {
  return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart', { headers: { 'Authorization': config.API_KEY } })
    .then(success => {
      console.log('api getCart GET success: ');
      return success.data;
    })
    .catch(error => {
      console.log('api getCart GET error')
    })
};

module.exports.addToCart = addToCart;
module.exports.getCart = getCart;

// SERVER ENDPOINTS FROM CLIENT REQUEST TO HELPERS API CALL

// const addToCart = require('./helpers/cart.js').addToCart;
// const getCart = require('./helpers/cart.js').getCart;

// app.get('/cart', function (req, res) {
//   getCart()
//     .then((data) => {
//       console.log('server getCart success');
//       res.status(200).send(data);
//     })
//     .catch((error) => {
//       console.log('server getCart reviews');
//     })
// });

// app.post('/addToCart', function (req, res) {
//   addToCart(req.body.cartItem)
//     .then((data) => {
//       console.log('server addToCart success');
//       res.status(201).send(data);
//     })
//     .catch((error) => {
//       console.log('server addToCart error');
//     })
// });