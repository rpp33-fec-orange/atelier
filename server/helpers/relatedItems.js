const axios = require('axios');
const Promise = require('promise');
const $ = require('jquery')
const { API_KEY } = require('../../config.js');

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';

const getRelatedProductsById = (id) => { //This function makes a GET request for product info by product_id

  // console.log('product id at server helper', id);

  var relatedProductsInfoPromiseArray = [];
  var relatedProductsInfoArray = [];
  var relatedProductIds = {
    relatedProductIds: []
  }

  return axios({
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/related`,
    headers: { 'Authorization': API_KEY },
  })
    .then((productIds) => {

      relatedProductIds.relatedProductIds = productIds.data;
      // console.log('productIds at helper function', productIds.data)
      for (var i = 0; i < productIds.data.length; i++) {

        relatedProductsInfoPromiseArray.push(

          axios({
            method: 'GET',
            url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productIds.data[i]}`,
            headers: { 'Authorization': API_KEY },
          })
            .then((productInfo) => {
              return relatedProductsInfoArray.push(productInfo.data);
            })
        )
      }

      return Promise.all(relatedProductsInfoPromiseArray)
        .then(() => {
          relatedProductsInfoArray.unshift(relatedProductIds);
          return relatedProductsInfoArray;
        })
        .catch((err) => {
          return err;
        })
    })
    .catch((err) => {
      console.log('error in related items helper function', err)
      return err;
    })
}

const getRelatedStylesById = (id) => { //This function makes a GET request for product info by product_id

  // console.log('product id at server helper', id);
  var relatedStylesInfoPromiseArray = [];
  var relatedStylesInfoArray = [];

  return axios({
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/related`,
    headers: { 'Authorization': API_KEY },
  })
    .then((productIds) => {
      for (var i = 0; i < productIds.data.length; i++) {

        relatedStylesInfoPromiseArray.push(
          axios({
            method: 'GET',
            url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productIds.data[i]}/styles`,
            headers: { 'Authorization': API_KEY },
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

const getRelatedProductsReviewMeta = (ParentProductId, relatedProducts) => {

  var productIds = relatedProducts.relatedProductIds
  var relatedReviewMetaPromiseArray = [];
  var relatedReviewMetaInfoArray = [];

  for (var i = 0; i < productIds.length; i++) {
    relatedReviewMetaPromiseArray.push(
      axios({
        method: 'GET',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta`,
        params: {
			    product_id: productIds[i]
		    },
        headers: { 'Authorization': API_KEY },
      })
        .then((reviews) => {
          return relatedReviewMetaInfoArray.push(reviews.data);
        })
        .catch((error) => {
          console.log('error in fetching review meta data', error)
        })
    )
  }
  return Promise.all(relatedReviewMetaPromiseArray)
    .then(() => {
      return relatedReviewMetaInfoArray;
    });
}

module.exports = { getRelatedStylesById, getRelatedProductsById, getRelatedProductsReviewMeta };

