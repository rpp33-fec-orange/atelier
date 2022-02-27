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
        let fullSet = [...data];
        this.setState({
          allQuestions: fullSet,
          renderedQuestions: this.initialRender(data)
        });
        console.log(`the fullSet is ${fullSet.length}`);
        console.log(`the full question set is ${this.state.allQuestions.length}, while the rendered is ${this.state.renderedQuestions.length}`);
      },
      dataType: 'json'
    });
  }

  initialRender(data) {
    if (data.length >= 2) {
      data.length = 2;
      data.map(qtn => {
        qtn.answers.length = 2;
      });
    }
    return data;
  };

  getMoreQuestions() {
    let { renderedQuestions, allQuestions } = this.state;
    console.log(`the currentRender: ${renderedQuestions.length} and all: ${allQuestions.length}`);

    let grabbed = allQuestions.slice(renderedQuestions.length, renderedQuestions.length + 2);
    let parsed = this.initialRender(grabbed);
    let rendered = [...renderedQuestions, ...parsed];

    console.log(`after showing more Questions, ${rendered.length}`);

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

    // if (allQuestions.length > renderedQuestions.length) {
    //   this.setState({
    //     renderedQuestions: [...renderedQuestions, ...this.initialRender(grabbed)]
    //   });
    // } else {
    //   this.setState({
    //     showMoreQuestions: false,
    //     renderedQuestions: [...renderedQuestions, ...this.initialRender(grabbed)]
    //   });
    // }
  }

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
    let questions = this.state.renderedQuestions;
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
        <QuestionAddons
          canShowMore={this.state.showMoreQuestions}
          loadMore={this.getMoreQuestions}
        />
      </div>
    );
  }
}

export default QuestionsAnswers;
