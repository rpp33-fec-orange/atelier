const axios = require('axios');
const { options } = require('./options.js');


const getProducts = function () {
  return axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products', { headers: options.auth })
    .then(success => {
      console.log('helpers getProducts GET success: ',  success);
      return success.data;
    })
    .catch(error => {
      console.log('helpers getProducts GET error here ', error);
      console.log('env auth: ', options.);
    })
};

const getProductById = function (id) {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`, { headers: options.auth })
    .then(success => {
      console.log('helpers getProductById GET success: ');
      return success.data;
    })
    .catch(error => {
      console.log('helpers getProductById GET error')
    })
};

const getProductStylesById = function (id) {
  return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`, { headers: options.auth })
    .then(success => {
      console.log('helpers getProductStylesById GET success: ');
      return success.data;
    })
    .catch(error => {
      console.log('helpers getProductStylesById axios GET error')
    })
};

module.exports = { getProducts, getProductById, getProductStylesById };