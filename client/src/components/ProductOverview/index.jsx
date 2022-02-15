import React from 'react';
import Search from './Search.jsx';
import Photos from './Photos.jsx';
import Details from './Details.jsx';
import Slogan from './Slogan.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

  render() {
    return (
      <div>
        <h4 id="productOverview">Product Overview</h4>
        <Search />
        <Photos />
        <Details />
        <Slogan />
      </div>
    )
  }
}

export default ProductOverview;