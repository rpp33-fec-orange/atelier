const axios = require('axios');
const config = require('../../config.js');


const options = {
  auth: { 'Authorization': config.API_KEY },
  baseUrl: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp'
};

const getDateString = (utcString) => {
  let date = new Date(utcString);

  let [monthNum, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
  let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(monthNum);

  return `${month} ${day}, ${year}`;
};

const getQuestionsByProductId = (id) => {

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
      // console.log(`getQuestionsByProductId GET success`);

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

        let questionDateString = getDateString(question.question_date);
        question.question_date = questionDateString;

        sortedAnswers.map(answer => {
          let answerDateString = getDateString(answer.date);
          answer.date = answerDateString;
          answer.reported = false;
          answer.marked_helpful = false;
        });

        question.marked_helpful = false;
        question.answers = sortedAnswers;
      });

      return sortedQuestions;
    });
};

const markQuestionHelpful = (question_id) => {

  return axios({
    method: 'put',
    url: `${options.baseUrl}/qa/questions/${question_id}/helpful`,
    responseType: 'json',
    headers: options.auth,
    validateStatus: (status) => {
      return status === 204;
    }
  });
};

const markAnswerHelpful = (answer_id) => {

  return axios({
    method: 'put',
    url: `${options.baseUrl}/qa/answers/${answer_id}/helpful`,
    responseType: 'json',
    headers: options.auth,
    validateStatus: (status) => {
      return status === 204;
    }
  });
};


const reportQuestion = (question_id) => {

  return axios({
    method: 'put',
    url: `${options.baseUrl}/qa/questions/${question_id}/report`,
    responseType: 'json',
    headers: options.auth,
    validateStatus: (status) => {
      return status === 204;
    }
  });
};

const reportAnswer = (answer_id) => {

  return axios({
    method: 'put',
    url: `${options.baseUrl}/qa/answers/${answer_id}/report`,
    responseType: 'json',
    headers: options.auth,
    validateStatus: (status) => {
      return status === 204;
    }
  });
};


module.exports = {
  getQuestionsByProductId,
  markQuestionHelpful,
  markAnswerHelpful,
  reportQuestion,
  reportAnswer
};