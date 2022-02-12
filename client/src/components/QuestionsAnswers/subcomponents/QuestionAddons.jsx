import React from 'react';

class QuestionAddons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const showMoreQuestions = this.props.showMoreQuestions;
    return (
      <div id="questionAddons">
        {
          showMoreQuestions
          &&
          <button id="moreAnsweredQuestions" type="button">
            More Answered Questions
          </button>
        }
        <button id="addQuestion" type="button">
          Add A Question +
        </button>
      </div>
    );
  }
}

export default QuestionAddons;
