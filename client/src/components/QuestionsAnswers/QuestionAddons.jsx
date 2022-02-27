import React from 'react';

class QuestionAddons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getMoreQuestions = this.getMoreQuestions.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  getMoreQuestions() {
    this.props.loadMore();
  }

  addQuestion() {
    // create form element
    // invoke modal
    // handle question entry in form element
  }



  render() {
    const showMore = this.props.canShowMore;
    return (
      <div id="questionAddons">
        {
          showMore
          &&
          <button
            id="moreAnsweredQuestions"
            type="button"
            onClick={this.getMoreQuestions}
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
