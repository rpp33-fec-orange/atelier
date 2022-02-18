import $ from 'jquery';
import {API_KEY} from '../../config.js';

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';

// $.ajaxPrefilter(function (settings, _, jqXHR) {
//   jqXHR.setRequestHeader('Authorization', API_KEY);
// });

var searchAPI = (options, callback) => {

  // /?page=${options.page}&count=${options.count}

  var url = '';

  if (options.purpose = 'get related product ids') {
    var getRelatedProductIdsURL = `${API_URL}${options.endPoint}/?product_id=${options.product_id}`;
    url = getRelatedProductIdsURL;
  } else if (options.purpose = 'get products') {
      var getProductsURL = `${API_URL}${options.endPoint}`;
      url = getProductsURL;
  }

  $.get(url, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
}

export default searchAPI;