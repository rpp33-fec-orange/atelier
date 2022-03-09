import React from 'react';
import AnswerList from './AnswerList.jsx';
import QuestionAnswerModal from './QuestionAnswerModal.jsx';


class QuestionItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.addAnswer = this.addAnswer.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.markQuestionHelpful = this.markQuestionHelpful.bind(this);
    this.markAnswerHelpful = this.markAnswerHelpful.bind(this);
    this.reportQuestion = this.reportQuestion.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  addAnswer() {
    // this.props.addAnswer();
  }

  handleModal(e) {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  markQuestionHelpful(questionId) {
    this.props.helpfulQuestion(questionId);
  }

  markAnswerHelpful(answerId) {
    let questionId = this.props.question.question_id;
    this.props.helpfulAnswer(questionId, answerId);
  }

  reportQuestion(questionId) {
    this.props.reportQuestion(questionId);
  }

  reportAnswer(answerId) {
    let questionId = this.props.question.question_id;
    this.props.reportAnswer(questionId, answerId);
  }


  render() {
    let { question, prompt } = this.props;

    prompt.questionId = question.question_id;
    prompt.questionBody = question.question_body;


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
            markAnswerHelpful={this.markAnswerHelpful}
            reportAnswer={this.reportAnswer}
          />
        </div>
        <div className="questionAction" style={{display: 'inline-block'}}>
          <span className="questionHelpfulness">
            Helpful?
            {
              !question.marked_helpful
              ?
              <span className="markQuestionHelpful-unmarked" onClick={() => this.markQuestionHelpful(question.question_id)}>
                Yes
              </span>
              :
              <span className="markQuestionHelpful-marked">Yes</span>
            }
            {`(${question.question_helpfulness})  |  `}
            <span className="addAnswer" onClick={() => this.handleModal()}>
              Add Answer
            </span>
            <QuestionAnswerModal
              prompt={prompt}
              toggleModal={this.handleModal}
              showModal={this.state.showModal}
            />
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
