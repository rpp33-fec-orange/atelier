import React from 'react';

class QuestionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addAnswer = this.addAnswer.bind(this);
    this.markQuestionHelpful = this.markQuestionHelpful.bind(this);
  }

  addAnswer() {
    this.props.addAnswer();
  }

  markQuestionHelpful() {
    this.props.markQuestionHelpful();
  }

  render() {
    return (
      <div className="questionItem">
        <div className="questionMain" style={{display: 'inline-block'}}>
          <span className="questionText">
            Q: {question.question_body}
          </span>
          <AnswerList answers={question.answers} />
        </div>
        <div className="questionAction" style={{display: 'inline-block'}}>
          <span className="questionHelpfulness">
            Helpful?
            <span className="markQuestionHelpful" onClick={this.markQuestionHelpful}>Yes</span>
            {`(${question.question_helpfulness})  |  `}
          <span className="addAnswer" onClick={this.addAnswer}>Add Answer</span>
        </div>
      </div>
    );
  }
}