import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

  render() {
    return (
      <div>
        <div id="logo">Logo<input id="search" placeholder="keyword"></input><button>Search</button></div>
        <div id="message">Valentine's Day Sale! ---Extra 40% off on select items--- Free shipping for orders over $50!</div>
      </div >
    )
  }
}

export default Search;