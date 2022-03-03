import React from 'react';
import AnswerList from './AnswerList.jsx';

class QuestionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addAnswer = this.addAnswer.bind(this);
    this.markQuestionHelpful = this.markQuestionHelpful.bind(this);
    this.reportQuestion = this.reportQuestion.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  addAnswer() {
    // this.props.addAnswer();
  }

  markQuestionHelpful() {
    // this.props.markQuestionHelpful();
  }

  reportAnswer(answerId) {
    let questionId = this.props.question.question_id;
    this.props.reportAnswer(questionId, answerId);
  }

  reportQuestion(questionId) {
    this.props.reportQuestion(questionId);
  }

  render() {
    let question = this.props.question;
    return (
      <div className="questionItem" key={question.question_id}>
        <div className="questionMain" style={{display: 'inline-block'}}>
          <span className="questionText">
            Q: {question.question_body}
          </span>
          <AnswerList
            answers={question.answers}
            questionId={question.question_id}
            loadMore={this.props.loadMore}
            reportAnswer={this.reportAnswer}
          />
        </div>
        <div className="questionAction" style={{display: 'inline-block'}}>
          <span className="questionHelpfulness">
            Helpful?
            <span className="markQuestionHelpful" onClick={this.markQuestionHelpful}>Yes</span>
            {`(${question.question_helpfulness})  |  `}
            <span className="addAnswer" onClick={this.addAnswer}>Add Answer</span>
            {'  |  '}
            {
              !question.reported
              ?
              <span className="reportQuestion-unreported" onClick={() => this.reportQuestion(question.question_id)}>
                Report
              </span>
              :
              <span className="reportQuestion-reported">
                Reported
              </span>
            }
          </span>
        </div>
      </div>
    );
  }
}

export default QuestionItem;
