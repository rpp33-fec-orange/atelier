const axios = require('axios');
const { options } = require('./options.js');


const recordInteractions = (details) => {

  return axios({
    method: 'post',
    url: `${options.baseUrl}/interactions`,
    data: details,
    contentType: 'application/json',
    responseType: 'json',
    headers: options.auth,
    validateStatus: (status) => {
      return status === 201;
    }
  });

};


module.exports = { recordInteractions };
