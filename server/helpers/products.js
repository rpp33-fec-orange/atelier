const axios = require('axios');
const config = require('../../config.js');

const getProducts = function () {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products', { headers: { 'Authorization': config.API_KEY } })
    .then(success => {
      console.log('helpers getProducts GET success: ');
      return success.data;
    })
    .catch(error => {
      console.log('helpers getProducts GET error')
    })
};

const getProductById = function (id) {
  console.log('helper product id', id);
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`, { headers: { 'Authorization': config.API_KEY } })
    .then(success => {
      console.log('helpers getProductById GET success: ');
      return success.data;
    })
    .catch(error => {
      console.log('helpers getProductById GET error')
    })
};

const getProductStylesById = function (id) {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`, { headers: { 'Authorization': config.API_KEY } })
    .then(success => {
      console.log('helpers getProductStylesById GET success: ');
      return success.data;
    })
    .catch(error => {
      console.log('helpers getProductStylesById axios GET error')
    })
};

module.exports.getProducts = getProducts;
module.exports.getProductById = getProductById;
module.exports.getProductStylesById = getProductStylesById;