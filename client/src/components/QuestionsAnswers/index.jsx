import React from 'react';
import $ from 'jquery';

import QuestionSearch from './QuestionSearch.jsx';
import QuestionItem from './QuestionItem.jsx';
import QuestionAddons from './QuestionAddons.jsx';
import listOfQuestions from './listOfQuestions.js';


class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.id;
    this.state = {
      productId: id,
      showMoreQuestions: true,
      questions: listOfQuestions
    };
    this.search = this.search.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions() {

    $.ajax({
      context: this,
      type: 'GET',
      url: `qa/questions/${this.state.productId}`,
      success: (data) => {
        this.parseQuestions(data);
      },
      dataType: 'json'
    });

  }

  // getQuestions() {
    // keep track of number of questions - update after "MORE ANSWERED QUESTIONS CLICK"
    // keep track of number of answers - update after "LOAD MORE ANSWERS CLICK"
    // add two after after filtering
  // }

  getAnswers() {}

  submitQuestion() {}

  submitAnswer() {}

  markQuestionHelpful() {}

  markAnswerHelpful() {}

  reportQuestion() {}

  reportAnswer() {}

  search(q) {
    // handle on client using return from GET /qa/questions
  }

  parseQuestions(data) {
    console.log('the return is: ', data);
    let newAnswers = [];
    if (data.length > 2) {
      data.length = 2;
      data.map(qtn => {
        qtn.answers.length = 2;
      });
      console.log('the mapped return is: ', data);

    }

    if (data.length === 2) {
      this.setState({
        questions: data
      });
    }
  }

  render() {
    let questions = this.state.questions;
    return (
      <div>
        <h4 id="questionsAndAnswers">Questions and Answers</h4>
        <QuestionSearch searchQuestion={this.search} />
        <div id="questionList">
          {
            questions.map(questionObject => {
              return (<QuestionItem question={questionObject} />)
            })
          }
        </div>
        <QuestionAddons showMore={this.state.showMoreQuestions} />
      </div>
    );
  }
}

export default QuestionsAnswers;
