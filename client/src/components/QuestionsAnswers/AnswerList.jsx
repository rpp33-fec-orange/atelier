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
    let id = this.props.questionId;
    this.props.loadMore(id);
  }

  renderAnswerItem(answer) {
    return (
      <div className="answerItem" key={answer.id}>
        <div className="answerKey">
          A: <span className="answerText">{answer.body}</span>
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
    let answers = this.props.answers;
    let answerItems = answers.map(this.renderAnswerItem);
    return (
      <div className="answerList">
        {answerItems}
        {
          answers.canShowMore
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
