import React from 'react';
import Search from './Search.jsx';
import Photos from './Photos.jsx';
import Details from './Details.jsx';
import Descriptions from './Descriptions.jsx';
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
      <div id="overview">
        <Search />
        <Photos />
        <Details />
        <Descriptions />
        <Slogan />
      </div>
    )
  }
}

export default ProductOverview;