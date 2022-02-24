import React from 'react';
import $ from 'jquery';

import QuestionSearch from './QuestionSearch.jsx';
import QuestionItem from './QuestionItem.jsx';
import QuestionAddons from './QuestionAddons.jsx';


class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.id;
    this.state = {
      productId: id,
      showMoreQuestions: true,
      fullQuestionList: [],
      questions: []
    };
    this.search = this.search.bind(this);
    this.getMoreQuestions = this.getMoreQuestions.bind(this);
    this.getMoreAnswers = this.getMoreAnswers.bind(this);
  }

  componentDidMount() {
    this.loadQuestions();
  }

  loadQuestions() {

    $.ajax({
      context: this,
      type: 'GET',
      url: `qa/questions/${this.state.productId}`,
      success: (data) => {
        const initialRender = (data) => {
          if (data.length > 2) {
            data.length = 2;
            data.map(qtn => {
              qtn.answers.length = 2;
            });
          }
          return data;
        };

        this.setState({
          fullQuestionList: data,
          questions: initialRender(data)
        });
      },
      dataType: 'json'
    });

  }

  getMoreQuestions() {}

  getMoreAnswers() {}

  submitQuestion() {}

  submitAnswer() {}

  markQuestionHelpful() {}

  markAnswerHelpful() {}

  reportQuestion() {}

  reportAnswer() {}

  search(q) {
    // handle on client using return from GET /qa/questions
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
