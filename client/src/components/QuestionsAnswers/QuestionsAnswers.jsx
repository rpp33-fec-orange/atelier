import React from 'react';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: ''
    };
  }

  render() {
    return (
      <div>
      <h4 id="questionsAndAnswers">Questions and Answers</h4>
    </div>
    );
  }
}

export default QuestionsAnswers;
