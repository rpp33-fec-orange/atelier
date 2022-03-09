import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';


class QuestionAnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: '',
      nickname: '',
      email: ''
    };
    this.closeModal = this.closeModal.bind(this);
    this.formHandler = this.formHandler.bind(this);
    this.addQuestionAnswer = this.addQuestionAnswer.bind(this);
  }

  closeModal(e) {
    this.props.toggleModal() && this.props.toggleModal(e);
  }

  formHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addQuestionAnswer(e) {
    e.preventDefault();

    const { prompt } = this.props;

    if (prompt.type === 'Question') {

      this.props.addQuestion({
        body: this.state.body,
        name: this.state.nickname,
        email: this.state.email,
        product_id: prompt.productId
      });

    } else if (prompt.type === 'Answer') {

      this.props.addAnswer(prompt.questionId, {
        body: this.state.body,
        name: this.state.nickname,
        email: this.state.email
      });

    }

    this.closeModal(e);

    this.setState({
      body: '',
      nickname: '',
      email: ''
    });
  }

  render () {
    const { prompt, showModal } = this.props;

    if (showModal) {
      return (
        <div id={`add${prompt.type}Form-modal`}>
          <button id="escapeModal" onClick={() => this.closeModal()}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <h3>{`Add Your ${prompt.type}`}</h3>
          <h4>
            {
              prompt.type === 'Question'
              &&
              `About the ${prompt.productName}`
            }
            {
              prompt.type === 'Answer'
              &&
              `${prompt.productName}: ${prompt.questionBody}`
            }
          </h4>
          <form onSubmit={this.addQuestionAnswer}>
            <label
              htmlFor="body"
              style={{ display: 'block' }}
            >
              {`Your ${prompt.type}`}
            </label>
            <textarea
              name="body"
              value={this.state.body}
              onChange={this.formHandler}
              type="text"
              rows="5"
              cols="40"
              maxlength="1000"
              wrap="hard"
              style={{ display: 'block' }}
              autofocus
              required
            >
            </textarea>
            <label
              htmlFor="nickname"
              style={{ display: 'block' }}
            >
              {`What is your nickname?`}
            </label>
            <input
              name="nickname"
              value={this.state.nickname}
              onChange={this.formHandler}
              type="text"
              maxlength="60"
              placeholder="Example: jack543!"
              style={{ display: 'block' }}
              required
            >
            </input>
            <label
              htmlFor="email"
              style={{ display: 'block' }}
            >
              {`Your email`}
            </label>
            <input
              name="email"
              value={this.state.email}
              onChange={this.formHandler}
              type="email"
              maxlength="60"
              placeholder="Example: jack@email.com"
              style={{ display: 'block' }}
              required
            >
            </input>
            <br></br>
            <button>
              {`Submit ${prompt.type}`}
            </button>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }

}

export default QuestionAnswerModal;