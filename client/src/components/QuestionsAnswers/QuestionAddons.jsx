import React from 'react';

class QuestionAddons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadMoreQuestions = this.loadMoreQuestions.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  loadMoreQuestions() {
    // load 2 additional questions
    // figure out how to handle count of questions
  }

  addQuestion() {
    // create form element
    // invoke modal
    // handle question entry in form element
  }



  render() {
    const showMore = this.props.showMore;
    return (
      <div id="questionAddons">
        {
          showMore
          &&
          <button
            id="moreAnsweredQuestions"
            type="button"
            onClick={this.loadMoreQuestions}
          >
            More Answered Questions
          </button>
        }
        <button
          id="addQuestion"
          type="button"
          onClick={this.addQuestion}
        >
          Add A Question
        </button>
      </div>
    );
  }
}

export default QuestionAddons;
