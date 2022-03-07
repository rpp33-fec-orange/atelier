import React from 'react';


class QuestionAnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      nickname: '',
      email: ''
    };
    this.onClose = this.onClose.bind(this);
  }

  onClose(e) {
    this.props.onClose() && this.props.onClose(e);
  }

  formHandler() {}

  addQuestionAnswer(e) {
    e.preventDefault();

    this.props.addQuestionAnswer({
      type: this.props.modalType,
      body: this.state.body,
      nickname: this.state.nickname,
      email: this.state.email
    });

    this.props.modalHandler();

    this.setState({
      body: '',
      nickname: '',
      email: ''
    });
  }

  modalFormParams(type) {
    if (type === 'question') {} else if (type === 'answer') {}
  }

  render () {
    const { modalType } = this.props;
    let formType = this.modalFormParams(modalType);

    return (
      <div>
        <form>
          <label></label>
          <input></input>
          <label></label>
          <input></input>
          <label></label>
          <input></input>
          <button></button>
        </form>
      </div>
    )
  }

}

export default QuestionAnswerModal;