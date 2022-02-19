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
      <div id="topbar">
        <div id="logo">Atelier<input id="input" placeholder="keyword" onChange={this.onChange}></input><button id="inputButton" onClick={this.clickHandler}>Search</button></div>
        <div id="message">Valentine's Day Sale! ---Extra 40% off on select items--- Free shipping for orders over $50!</div>
      </div >
    )
  }
}

export default TopBar;