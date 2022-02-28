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
      <div class="topbar-container" id="TopBar">
        <div class="topbar-item topbar-item-1" data-testid="logo" id="logo">Atelier</div>
        <div class="topbar-item topbar-item-2">
          <input id="seach-box" placeholder="keyword" onChange={this.onChange}></input><button id="search-button" onClick={this.clickHandler}>Search</button>
        </div>
      </div >
    )
  }
}

export default TopBar;