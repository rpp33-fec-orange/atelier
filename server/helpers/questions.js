const axios = require('axios');
const config = require('../../config.js');


const options = {
  auth: { 'Authorization': config.API_KEY },
  baseUrl: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp'
};

const getQuestionsByProductId = function(id) {

  return axios({
    method: 'get',
    url: `${options.baseUrl}/qa/questions?product_id=${id}&count=100`,
    responseType: 'json',
    headers: options.auth,
    validateStatus: (status) => {
      return status === 200;
    }
  })
    .then(success => {
      console.log(`getQuestionsByProductId GET success`);

      let parsedQuestions = success.data.results.sort((pre, post) => {
        return post.question_helpfulness - pre.question_helpfulness;
      });

      let sortedQuestions = parsedQuestions;

      sortedQuestions.map((question, index) => {
        let unsortedAnswers = Object.values(parsedQuestions[index].answers);

        let sortedAnswers = unsortedAnswers.sort((pre, post) => {
          return post.helpfulness - pre.helpfulness;
        });

        let sellerIndex = sortedAnswers.findIndex(answer => answer.answerer_name.toLowerCase() === 'seller');

        // if seller answer exists and is already at pos [0], no need to reposition it
        if (sellerIndex > 0) {
          let sellerAnswer = sortedAnswers[sellerIndex];
          sortedAnswers.splice(sellerIndex, 1);
          sortedAnswers.unshift(sellerAnswer);
        }

        question.answers = sortedAnswers;
      });

      return sortedQuestions;
    });
};


module.exports = { getQuestionsByProductId };