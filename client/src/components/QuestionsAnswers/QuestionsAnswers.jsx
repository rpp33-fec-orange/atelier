import React from 'react';
import QuestionSearch from './subcomponents/QuestionSearch.jsx';
import QuestionList from './subcomponents/QuestionList.jsx';
import QuestionAddons from './subcomponents/QuestionAddons.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      showMoreQuestions: true
    };
  }

  render() {
    return (
      <div>
        <h4 id="questionsAndAnswers">Questions and Answers</h4>
        <QuestionSearch />
        <QuestionList />
        <QuestionAddons showMoreQuestions={this.state.showMoreQuestions} />
      </div>
    );
  }
}

export default QuestionsAnswers;
