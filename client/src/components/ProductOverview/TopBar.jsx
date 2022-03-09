import React from 'react';
import { BsSearch } from 'react-icons/Bs';

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
          <BsSearch id="search-button" onClick={this.clickHandler} />
        </div>
      </div >
    )
  }
}

export default TopBar;