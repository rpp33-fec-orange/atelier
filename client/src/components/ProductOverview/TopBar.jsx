import React from 'react';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    }
    this.onChange = this.onChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  onChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }

  clickHandler() {
    this.props.searchHandler(this.state.keyword);
    this.setState({
      keyword: ''
    });
  }

  render() {
    return (
      <div id="TopBar">
        <div id="logoSearch">
          <div data-testid="logo" id="logo">Atelier<input id="input" placeholder="keyword" onChange={this.onChange}></input><button id="inputButton" onClick={this.clickHandler}>Search</button></div>
        </div>
      </div >
    )
  }
}

export default TopBar;