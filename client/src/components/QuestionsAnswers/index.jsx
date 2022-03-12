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
      showMoreQuestions: false,
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
    this.collapseAnswers = this.collapseAnswers.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.reportQuestion = this.reportQuestion.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
    this.markQuestionHelpful = this.markQuestionHelpful.bind(this);
    this.markAnswerHelpful = this.markAnswerHelpful.bind(this);
    this.hideSearchResults = this.hideSearchResults.bind(this);
    this.recordInteraction = this.recordInteraction.bind(this);
  }

  componentDidMount() {
    this.loadQuestions();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
        this.setState({
          productId: this.props.id,
          productName: this.props.productName,
          initialized: false
        }, () => {
          this.loadQuestions();
        });
    }
  }

  loadQuestions() {

    $.ajax({
      context: this,
      type: 'GET',
      url: `qa/questions/${this.state.productId}`,
      success: (data) => {
        let fullSet = JSON.parse(JSON.stringify(data));
        let canShowMore = fullSet.length > 2;

        this.setState({
          allQuestions: fullSet,
          showMoreQuestions: canShowMore,
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
          question.answers.length = 2;
          question.answers['canShowMore'] = true;
        } else if (question.answers.length <= 2) {
          question.answers['canShowMore'] = false;
        }
      });
    }
    return data;
  };

  getMoreQuestions() {
    if (!this.state.renderSearch) {

      let { renderedQuestions, allQuestions } = this.state;

      let grabbed = allQuestions.slice(renderedQuestions.length, renderedQuestions.length + 2);
      let parsed = this.initialRender(grabbed);
      let rendered = [...renderedQuestions, ...parsed];

      if (allQuestions.length > rendered.length) {
        this.setState({
          showMoreQuestions: true,
          renderedQuestions: rendered
        });
      } else {
        this.setState({
          showMoreQuestions: false,
          renderedQuestions: rendered
        });
      }

    } else {

      let { searchedQuestions, renderedSearch } = this.state;

      let grabbed = searchedQuestions.slice(renderedSearch.length, renderedSearch.length + 2);
      let parsed = this.initialRender(grabbed);
      let rendered = [...renderedSearch, ...parsed];

      if (searchedQuestions.length > rendered.length) {
        this.setState({
          showMoreQuestions: true,
          renderedSearch: rendered
        });
      } else {
        this.setState({
          showMoreQuestions: false,
          renderedSearch: rendered
        });
      }

    }

  }

  getMoreAnswers(questionId) {
    if (!this.state.renderSearch) {

      let { renderedQuestions, allQuestions } = this.state;

      let questionObj = allQuestions.find(question => question.question_id === questionId );
      let renderedQuestionIndex = renderedQuestions.findIndex(question => question.question_id === questionId );

      renderedQuestions[renderedQuestionIndex].answers = JSON.parse(JSON.stringify(questionObj.answers));

      if (questionObj.answers.length === renderedQuestions[renderedQuestionIndex].answers.length) {
        renderedQuestions[renderedQuestionIndex].answers['canShowMore'] = false;
      }

      this.setState({
        renderedQuestions: renderedQuestions
      });

    } else {

      let { renderedSearch, searchedQuestions } = this.state;

      let questionObj = searchedQuestions.find(question => question.question_id === questionId );
      let renderedQuestionIndex = renderedSearch.findIndex(question => question.question_id === questionId );

      renderedSearch[renderedQuestionIndex].answers = JSON.parse(JSON.stringify(questionObj.answers));

      if (questionObj.answers.length === renderedSearch[renderedQuestionIndex].answers.length) {
        renderedSearch[renderedQuestionIndex].answers['canShowMore'] = false;
      }

      this.setState({
        renderedSearch: renderedSearch
      });

    }

  }

  collapseAnswers(questionId) {
    if (!this.state.renderSearch) {

      let { renderedQuestions, allQuestions } = this.state;

      let questionObj = allQuestions.find(question => question.question_id === questionId );
      let renderedQuestionIndex = renderedQuestions.findIndex(question => question.question_id === questionId );

      if (questionObj.answers.length > 2) {
        renderedQuestions[renderedQuestionIndex].answers.length = 2;
        renderedQuestions[renderedQuestionIndex].answers['canShowMore'] = true;
      } else {
        renderedQuestions[renderedQuestionIndex].answers['canShowMore'] = false;
      }

      this.setState({
        renderedQuestions: renderedQuestions
      });

    } else {

      let { renderedSearch, searchedQuestions } = this.state;

      let questionObj = searchedQuestions.find(question => question.question_id === questionId );
      let renderedQuestionIndex = renderedSearch.findIndex(question => question.question_id === questionId );

      if (questionObj.answers.length > 2) {
        renderedSearch[renderedQuestionIndex].answers.length = 2;
        renderedSearch[renderedQuestionIndex].answers['canShowMore'] = true;
      } else {
        renderedSearch[renderedQuestionIndex].answers['canShowMore'] = true;
      }

      this.setState({
        renderedSearch: renderedSearch
      });

    }
  }

  submitQuestion(formDetails) {
    // console.log(`before leaving client the product_id is: ${typeof formDetails.product_id}`);

    $.ajax({
      context: this,
      type: 'POST',
      url: `qa/questions`,
      data: formDetails,
      success: () => {
        this.loadQuestions();
      },
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
        this.loadQuestions();
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
        let { allQuestions, renderedQuestions, searchedQuestions, renderedSearch } = this.state;

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

        if (renderSearch) {
          let questionIndexSearch = searchedQuestions.findIndex(question => {
            return question.question_id === questionId;
          });

          searchedQuestions[questionIndexSearch].marked_helpful = true;
          renderedSearch[questionIndexSearch].marked_helpful = true;

          searchedQuestions[questionIndexSearch].question_helpfulness++;
          renderedSearch[questionIndexSearch].question_helpfulness++;

          this.setState({
            searchedQuestions: searchedQuestions,
            renderedSearch: renderedSearch
          });
        }

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
        let { allQuestions, renderedQuestions, searchedQuestions, renderedSearch } = this.state;

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

        if (renderSearch) {
          let questionIndexSearch = searchedQuestions.findIndex(question => {
            return question.question_id === questionId;
          });

          let answerIndexSearch = searchedQuestions[questionIndexSearch].answers.findIndex(answer => {
            return answer.id === answerId;
          });

          searchedQuestions[questionIndexSearch].answers[answerIndexSearch].marked_helpful = true;
          renderedSearch[questionIndexSearch].answers[answerIndexSearch].marked_helpful = true;

          searchedQuestions[questionIndexSearch].answers[answerIndexSearch].helpfulness++;
          renderedSearch[questionIndexSearch].answers[answerIndexSearch].helpfulness++;

          this.setState({
            searchedQuestions: searchedQuestions,
            renderedSearch: renderedSearch
          });
        }

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
        let { allQuestions, renderedQuestions, searchedQuestions, renderedSearch } = this.state;

        let questionIndex = allQuestions.findIndex(question => {
          return question.question_id === questionId;
        });

        allQuestions[questionIndex].reported = true;
        renderedQuestions[questionIndex].reported = true;

        this.setState({
          allQuestions: allQuestions,
          renderedQuestions: renderedQuestions
        });

        if (renderSearch) {
          let questionIndexSearch = searchedQuestions.findIndex(question => {
            return question.question_id === questionId;
          });

          searchedQuestions[questionIndexSearch].reported = true;
          renderedSearch[questionIndexSearch].reported = true;

          this.setState({
            searchedQuestions: searchedQuestions,
            renderedSearch: renderedSearch
          });
        }

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
        let { allQuestions, renderedQuestions, searchedQuestions, renderedSearch } = this.state;

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

        if (renderSearch) {
          let questionIndexSearch = searchedQuestions.findIndex(question => {
            return question.question_id === questionId;
          });

          let answerIndexSearch = searchedQuestions[questionIndexSearch].answers.findIndex(answer => {
            return answer.id === answerId;
          });

          searchedQuestions[questionIndexSearch].answers[answerIndexSearch].reported = true;
          renderedSearch[questionIndexSearch].answers[answerIndexSearch].reported = true;

          this.setState({
            searchedQuestions: searchedQuestions,
            renderedSearch: renderedSearch
          });
        }

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

  recordInteraction(e) {
    this.props.interactions({
      element: e.target.nodeName,
      widget: 'Questions & Answers',
      time: new Date().toISOString()
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
        <div className="questionsAnswers-container" onClick={this.recordInteraction}>
          <h4>{`QUESTIONS & ANSWERS`}</h4>
          <br></br>
          <QuestionSearch
            searchQuestion={this.search}
            hideSearchResults={this.hideSearchResults}
          />
          <br></br>
          <div id="questionList">
            {
              questions.map(questionObject => {
                return (
                  <QuestionItem
                    question={questionObject}
                    loadMore={this.getMoreAnswers}
                    collapse={this.collapseAnswers}
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
