import $ from 'jquery';
import keys from './config/config.js';

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';

$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', keys.API_KEY);
});

var searchAPI = (options, callback) => {

  $.get(`${API_URL}${options.endPoint}/?page=${options.page}&count=${options.count}`, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
}

export default searchAPI;