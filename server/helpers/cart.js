const axios = require('axios');
const { options } = require('./options.js');

const addToCart = function (skuId) {
  return axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart', { sku_id: skuId }, { headers: options.auth })
    .then(success => {
      console.log('api addToCart POST success: ');
    })
    .catch(error => {
      console.log('api addToCart POST error')
    })
};

const getCart = function () {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart', { headers: options.auth })
    .then(success => {
      console.log('api getCart GET success: ');
      return success.data;
    })
    .catch(error => {
      console.log('api getCart GET error')
    })
};

module.exports = { addToCart, getCart };