import React from 'react';

class QuestionSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  search(e) {
    e.preventDefault();

    this.props.searchQuestion(this.state.query);

    this.setState({
      query: ''
    });
  }

  render() {
    return (
      <div id="questionSearch">
        <input
          type="search"
          name="query"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="have a question? search for answers...">
        </input>
      </div>
    );
  }
}

export default QuestionSearch;
