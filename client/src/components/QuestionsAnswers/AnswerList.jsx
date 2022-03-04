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

  reportAnswer(id) {
    this.props.reportAnswer(id);
  }

  markAnswerHelpful(answerId) {
    this.props.markAnswerHelpful(answerId);
  }

  loadMoreAnswers() {
    let id = this.props.questionId;
    this.props.loadMore(id);
  }

  renderAnswerItem(answer) {
    return (
      <div className="answerItem" key={answer.id}>
        <div className="answerKey">
          <span className="answerText">{answer.body}</span>
          <div className="answerImages">
            {
              !!answer.photos.length // only render if photos array contains urls
              &&
              answer.photos.map(photo => {
                return (
                  <img className="answerPhoto" src={photo} height="64" width="64"></img>
                )
              })
            }
          </div>
        </div>
        <span className="answerActions">
          {`by ${answer.answerer_name}, ${answer.date}  |  Helpful? `}
          {
            !answer.marked_helpful
            ?
            <span className="markAnswerHelpful-unmarked" onClick={() => this.markAnswerHelpful(answer.id)}>
              Yes
            </span>
            :
            <span className="markAnswerHelpful-marked">Yes</span>
          }
          {`(${answer.helpfulness})  |  `}
          {
            !answer.reported
            ?
            <span className="reportAnswer-unreported" onClick={() => this.reportAnswer(answer.id)}>
              Report
            </span>
            :
            <span className="reportAnswer-reported">
              Reported
            </span>
          }
        </span>
      </div>
    );
  }

  render() {
    let answers = this.props.answers;
    let answerItems = answers.map(this.renderAnswerItem);
    return (
      <div className="answers-container">
        <div className="answerFlag" style={{ display: 'inline-block'}}>{'A:'}</div>
        <div className="answerList" style={{ display: 'inline-block'}}>
          {answerItems}
          {
            answers.canShowMore
            &&
            <span className="loadMore" onClick={this.loadMoreAnswers}>
              LOAD MORE ANSWERS
            </span>
          }
        </div>
      </div>
    );
  }
}

export default AnswerList;
