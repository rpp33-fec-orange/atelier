import React from 'react';

class AnswerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.reportAnswer = this.reportAnswer.bind(this);
    this.markAnswerHelpful = this.markAnswerHelpful.bind(this);
    this.renderAnswerItem = this.renderAnswerItem.bind(this);
  }

  reportAnswer() {
    this.props.reportAnswer();
  }

  markAnswerHelpful() {
    this.props.markAnswerHelpful();
  }

  renderAnswerItem(answer) {
    return (
      <div className="answerItem">
        <span className="answerKey">
          A: <span className="answerText">{answer.body}</span>
        </span>
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
    let answerItem = this.props.answers.map(this.renderAnswerItem);
    return (
      <div className="answerList">
        {answerItem}
      </div>
    );
  }
}