import React from 'react';

class QuestionSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
  }

  render() {
    return (
      <div id="questionSearch">
        <input
          type="search"
          name="searchQuery"
          value={this.state.searchQuery}
          placeholder="have a question? search for answers...">
        </input>
      </div>
    );
  }
}

export default QuestionSearch;
