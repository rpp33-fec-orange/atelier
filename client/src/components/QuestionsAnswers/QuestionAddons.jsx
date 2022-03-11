import React from 'react';
import QuestionAnswerModal from './QuestionAnswerModal.jsx';


class QuestionAddons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.getMoreQuestions = this.getMoreQuestions.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  getMoreQuestions() {
    this.props.loadMore();
  }

  handleModal(e) {
    this.setState({
      showModal: !this.state.showModal
    });
  }



  render() {
    const showMoreQuestions = this.props.canShowMore;
    return (
      <div id="questionAddons">
        {
          showMoreQuestions
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
          onClick={() => this.handleModal()}
        >
          Add A Question
        </button>
        <QuestionAnswerModal
          prompt={this.props.prompt}
          toggleModal={this.handleModal}
          showModal={this.state.showModal}
          addQuestion={this.props.addQuestion}
        />
      </div>
    );
  }
}

export default QuestionAddons;
