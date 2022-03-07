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

  modalFormParams(type) {
    if (type === 'question') {} else if (type === 'answer') {}
  }

  render () {
    const { type } = this.props;

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