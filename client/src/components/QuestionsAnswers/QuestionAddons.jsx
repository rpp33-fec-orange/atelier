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
          <div
            id="moreAnsweredQuestions"
            onClick={this.getMoreQuestions}
          >
            {`MORE ANSWERED QUESTIONS`}
          </div>
        }
        <div
          id="addQuestion"
          onClick={() => this.handleModal()}
        >
          {`ADD A QUESTION +`}
        </div>
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
