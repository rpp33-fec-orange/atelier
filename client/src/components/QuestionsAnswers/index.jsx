import React from 'react';
import QuestionSearch from './QuestionSearch.jsx';
import QuestionList from './QuestionList.jsx';
import QuestionAddons from './QuestionAddons.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      showMoreQuestions: true
    };
    this.search = this.search.bind(this);
  }

  getQuestions

  search(q) {
    // handle on client using return from GET /qa/questions
  }

  render() {
    return (
      <div>
        <h4 id="questionsAndAnswers">Questions and Answers</h4>
        <QuestionSearch searchQuestion={this.search} />
        <QuestionList />
        <QuestionAddons showMore={this.state.showMoreQuestions} />
      </div>
    );
  }
}

export default QuestionsAnswers;
