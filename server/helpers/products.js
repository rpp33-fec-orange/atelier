const axios = require('axios');
const config = require('../../config.js');

const getProducts = function () {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products', { headers: { 'Authorization': config.API_KEY } })
    .then(success => {
      console.log('api axios GET success: ');
      return success.data;
    })
    .catch(error => {
      console.log('api axios GET error')
    })
};

const getProductById = function (id) {
  console.log('helper product id', id);
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`, { headers: { 'Authorization': config.API_KEY } })
    .then(success => {
      console.log('getProductById GET success: ');
      return success.data;
    })
    .catch(error => {
      console.log('getProductById GET error')
    })
};

const getProductStylesById = function (id) {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`, { headers: { 'Authorization': config.API_KEY } })
    .then(success => {
      console.log('getProductStylesById GET success: ');
      return success.data;
    })
    .catch(error => {
      console.log('getProductStylesById axios GET error')
    })
};

module.exports.getProducts = getProducts;
module.exports.getProductById = getProductById;
module.exports.getProductStylesById = getProductStylesById;