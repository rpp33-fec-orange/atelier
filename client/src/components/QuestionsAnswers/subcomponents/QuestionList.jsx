import React from 'react';

class QuestionList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="questionList">
        <ul>
          <li>Question 1</li>
          <li>Question 2</li>
          <li>Question 3</li>
          <li>Question 4</li>
        </ul>
      </div>
    );
  }
}

export default QuestionList;
