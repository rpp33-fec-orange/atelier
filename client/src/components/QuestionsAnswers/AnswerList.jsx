import React from 'react';

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someAnswersHidden: true
    };
    this.reportAnswer = this.reportAnswer.bind(this);
    this.markAnswerHelpful = this.markAnswerHelpful.bind(this);
    this.renderAnswerItem = this.renderAnswerItem.bind(this);
    this.loadMoreAnswers = this.loadMoreAnswers.bind(this);
  }

  reportAnswer() {
    this.props.reportAnswer();
  }

  markAnswerHelpful() {
    this.props.markAnswerHelpful();
  }

  loadMoreAnswers() {
    this.props.loadMoreAnswers();
  }

  renderAnswerItem(answer) {
    return (
      <div className="answerItem">
        <span className="answerKey">
          A: <span className="answerText">{answer.body}</span>
          {/* add conditional photo rendering logic here */}
        </span>
        <br></br>
        <span className="answerActions">
          {`by ${answer.answerer_name}, ${answer.date}  |  Helpful? `}
          <span className="markAnswerHelpful" onClick={this.markAnswerHelpful}>Yes</span>
          {`(${answer.helpfulness})  |  `}
          <span className="reportAnswer" onClick={this.reportAnswer}>
            Report
          </span>
        </span>
      </div>
    );
  }

  render() {
    let answerItems = this.props.answers.map(this.renderAnswerItem);
    return (
      <div className="answerList">
        {answerItems}
        {
          this.state.someAnswersHidden
          &&
          <span className="loadMore" onClick={this.loadMoreAnswers}>
            LOAD MORE ANSWERS
          </span>
        }
      </div>
    );
  }
}

export default AnswerList;
