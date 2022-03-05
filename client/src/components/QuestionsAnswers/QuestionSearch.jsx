import React from 'react';

class QuestionSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(e) {

    this.setState({
      query: e.target.value
    });

    if (e.target.value.length >= 3) {
      this.search();
    } else {
      this.props.hideSearchResults();
    }

  }

  search() {
    let query = this.state.query;
    this.props.searchQuestion(query);
  }

  render() {
    return (
      <div id="questionSearch">
        <input
          type="search"
          name="query"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Have a question? Search for answers...">
        </input>
      </div>
    );
  }
}

export default QuestionSearch;
