import React from 'react';
import $ from 'jquery';

import QuestionSearch from './QuestionSearch.jsx';
import QuestionItem from './QuestionItem.jsx';
import QuestionAddons from './QuestionAddons.jsx';


class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    let { id, productName } = this.props;
    this.state = {
      productId: id,
      initialized: false,
      productName: productName,
      showMoreQuestions: true,
      allQuestions: [],
      renderedQuestions: [],
      searchedQuestions: [],
      renderedSearch: [],
      renderSearch: false
    };
    this.search = this.search.bind(this);
    this.initialRender =  this.initialRender.bind(this);
    this.getMoreQuestions = this.getMoreQuestions.bind(this);
    this.getMoreAnswers = this.getMoreAnswers.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.reportQuestion = this.reportQuestion.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
    this.markQuestionHelpful = this.markQuestionHelpful.bind(this);
    this.markAnswerHelpful = this.markAnswerHelpful.bind(this);
    this.hideSearchResults = this.hideSearchResults.bind(this);
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
          renderedQuestions: this.initialRender(data),
          initialized: true
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

  submitQuestion(formDetails) {
    // console.log(`before leaving client the product_id is: ${typeof formDetails.product_id}`);s

    $.ajax({
      context: this,
      type: 'POST',
      url: `qa/questions`,
      data: formDetails,
      success: () => {
        console.log('question POST successful');
        // refresh page
      },
      // contentType: 'application/json',
      dataType: 'json'
    });

  }

  submitAnswer(questionId, formDetails) {
    $.ajax({
      context: this,
      type: 'POST',
      url: `qa/questions/${questionId}/answers`,
      data: formDetails,
      success: () => {
        console.log('answer POST successful');
      },
      dataType: 'json'
    });

  }

  markQuestionHelpful(questionId) {
    $.ajax({
      context: this,
      type: 'PUT',
      url: `qa/questions/${questionId}/helpful`,
      success: () => {
        let { allQuestions, renderedQuestions } = this.state;

        let questionIndex = allQuestions.findIndex(question => {
          return question.question_id === questionId;
        });

        allQuestions[questionIndex].marked_helpful = true;
        renderedQuestions[questionIndex].marked_helpful = true;

        allQuestions[questionIndex].question_helpfulness++;
        renderedQuestions[questionIndex].question_helpfulness++;

        this.setState({
          allQuestions: allQuestions,
          renderedQuestions: renderedQuestions
        });
      },
      dataType: 'json'
    });
  }

  markAnswerHelpful(questionId, answerId) {
    $.ajax({
      context: this,
      type: 'PUT',
      url: `qa/answers/${answerId}/helpful`,
      success: () => {
        let { allQuestions, renderedQuestions } = this.state;

        let questionIndex = allQuestions.findIndex(question => {
          return question.question_id === questionId;
        });

        let answerIndex = allQuestions[questionIndex].answers.findIndex(answer => {
          return answer.id === answerId;
        });

        allQuestions[questionIndex].answers[answerIndex].marked_helpful = true;
        renderedQuestions[questionIndex].answers[answerIndex].marked_helpful = true;

        allQuestions[questionIndex].answers[answerIndex].helpfulness++;
        renderedQuestions[questionIndex].answers[answerIndex].helpfulness++;

        this.setState({
          allQuestions: allQuestions,
          renderedQuestions: renderedQuestions
        });
      },
      dataType: 'json'
    });
  }

  reportQuestion(questionId) {
    $.ajax({
      context: this,
      type: 'PUT',
      url: `qa/questions/${questionId}/report`,
      success: () => {
        let { allQuestions, renderedQuestions } = this.state;

        let questionIndex = allQuestions.findIndex(question => {
          return question.question_id === questionId;
        });

        allQuestions[questionIndex].reported = true;
        renderedQuestions[questionIndex].reported = true;

        this.setState({
          allQuestions: allQuestions,
          renderedQuestions: renderedQuestions
        });
      },
      dataType: 'json'
    });
  }

  reportAnswer(questionId, answerId) {
    $.ajax({
      context: this,
      type: 'PUT',
      url: `qa/answers/${answerId}/report`,
      success: () => {
        let { allQuestions, renderedQuestions } = this.state;

        let questionIndex = allQuestions.findIndex(question => {
          return question.question_id === questionId;
        });

        let answerIndex = allQuestions[questionIndex].answers.findIndex(answer => {
          return answer.id === answerId;
        });

        allQuestions[questionIndex].answers[answerIndex].reported = true;
        renderedQuestions[questionIndex].answers[answerIndex].reported = true;

        this.setState({
          allQuestions: allQuestions,
          renderedQuestions: renderedQuestions
        });
      },
      dataType: 'json'
    });
  }

  search(query) {
    let { allQuestions } = this.state;
    let searchedQuestions = [];
    let toRender = [];

    const searchQuestions = (string) => {
      let results = [];
      allQuestions.forEach(question => {
        if (question.question_body.includes(string)) {
          results.push(question);
        }
      });

      return results;
    };

    searchedQuestions = searchQuestions(query);
    toRender = JSON.parse(JSON.stringify(searchedQuestions));

    // add search to show moreAnswers/Questions

    this.setState({
      searchedQuestions: searchedQuestions,
      renderedSearch: this.initialRender(toRender),
      renderSearch: true
    });

  }

  hideSearchResults() {
    this.setState({
      renderSearch: false
    });
  }

  render() {
    let questions = [];

    let questionPrompt = {
      type: 'Question',
      product_id: this.state.productId,
      productName: this.state.productName
    };

    let answerPrompt = {
      type: 'Answer',
      productName: this.state.productName
    };

    if (!this.state.renderSearch) {
      questions = this.state.renderedQuestions;
    } else {
      questions = this.state.renderedSearch;
    }

    if (this.state.initialized) {
      return (
        <div id="questionsAndAnswers">
          <h4>Questions and Answers</h4>
          <QuestionSearch
            searchQuestion={this.search}
            hideSearchResults={this.hideSearchResults}
          />
          <div id="questionList">
            {
              questions.map(questionObject => {
                return (
                  <QuestionItem
                    question={questionObject}
                    loadMore={this.getMoreAnswers}
                    helpfulQuestion={this.markQuestionHelpful}
                    helpfulAnswer={this.markAnswerHelpful}
                    reportQuestion={this.reportQuestion}
                    reportAnswer={this.reportAnswer}
                    addAnswer={this.submitAnswer}
                    prompt={answerPrompt}
                  />
                )
              })
            }
          </div>
          <QuestionAddons
            canShowMore={this.state.showMoreQuestions}
            loadMore={this.getMoreQuestions}
            addQuestion={this.submitQuestion}
            prompt={questionPrompt}
          />
        </div>
      );
    } else {
      return null;
    }

  }
}

export default QuestionsAnswers;
