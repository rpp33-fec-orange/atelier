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
      allQuestions: [],
      renderedQuestions: []
    };
    this.search = this.search.bind(this);
    this.initialRender =  this.initialRender.bind(this);
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
        let fullSet = JSON.parse(JSON.stringify(data));

        this.setState({
          allQuestions: fullSet,
          renderedQuestions: this.initialRender(data)
        });
      },
      dataType: 'json'
    });
  }

  initialRender(data) {
    if (data.length >= 2) {
      data.length = 2;
      data.map(question => {
        if (question.answers.length > 2) {
          question.answers['canShowMore'] = true;
        } else if (question.answers.length <= 2) {
          question.answers['canShowMore'] = false;
        }
        question.answers.length = 2;
      });
    }
    return data;
  };

  getMoreQuestions() {
    let { renderedQuestions, allQuestions } = this.state;

    let grabbed = allQuestions.slice(renderedQuestions.length, renderedQuestions.length + 2);
    let parsed = this.initialRender(grabbed);
    let rendered = [...renderedQuestions, ...parsed];

    if (allQuestions.length > rendered.length) {
      this.setState({
        renderedQuestions: rendered
      });
    } else {
      this.setState({
        showMoreQuestions: false,
        renderedQuestions: rendered
      });
    }

  }

  getMoreAnswers(questionId) {
    let { renderedQuestions, allQuestions } = this.state;

    let questionObj = allQuestions.find(question => question.question_id === questionId );
    let renderedQuestionIndex = renderedQuestions.findIndex(question => question.question_id === questionId );
    let renderedAnswers = renderedQuestions[renderedQuestionIndex].answers;

    let grabbedAnswers = questionObj.answers.slice(renderedAnswers.length, renderedAnswers.length + 2);

    renderedQuestions[renderedQuestionIndex].answers = [...renderedAnswers, ...grabbedAnswers];

    if (questionObj.answers.length > renderedQuestions[renderedQuestionIndex].answers.length) {
      renderedQuestions[renderedQuestionIndex].answers['canShowMore'] = true;
    } else if (questionObj.answers.length === renderedQuestions[renderedQuestionIndex].answers.length) {
      renderedQuestions[renderedQuestionIndex].answers['canShowMore'] = false;
    }

    this.setState({
      renderedQuestions: renderedQuestions
    });

  }

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
    let questions = this.state.renderedQuestions;
    return (
      <div>
        <h4 id="questionsAndAnswers">Questions and Answers</h4>
        <QuestionSearch searchQuestion={this.search} />
        <div id="questionList">
          {
            questions.map(questionObject => {
              return (
                <QuestionItem
                  question={questionObject}
                  loadMore={this.getMoreAnswers}
                />
                )
            })
          }
        </div>
        <QuestionAddons
          canShowMore={this.state.showMoreQuestions}
          loadMore={this.getMoreQuestions}
        />
      </div>
    );
  }
}

export default QuestionsAnswers;
