import React from 'react';
import $ from 'jquery';
import Search from './Search.jsx';
import Photos from './Photos.jsx';
import Details from './Details.jsx';
import Descriptions from './Descriptions.jsx';
import Extra from './Extra.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
    this.productsHandler = this.productsHandler.bind(this);
    this.searcHHandler = this.searchHandler.bind(this);
  }

  productsHandler() {
    $.ajax({
      context: this,
      type: 'GET',
      url: '/products',
      success: function (success) {
        console.log('product overview ajax GET success: ', success[0]);
        this.setState({ product: success[0] });
      },
      error: function (error) {
        console.log('product overview ajax GET error: ', error);
      },
      contentType: "application/json",
    })
  }

  searchHandler(keyword) {
    $.ajax({
      context: this,
      type: 'POST',
      url: '/search',
      data: JSON.stringify({ keyword }),
      success: function (success) {
        console.log('product overview ajax POST success: ', success);
      },
      error: function (error) {
        console.log('product overview ajax POST error: ', error);
      },
      contentType: "application/json",
    })
    alert(`${keyword} was searched!`);
  }

  componentDidMount() {
    this.productsHandler();
  }

  render() {
    return (
      <div id="overview">
        <Search searchHandler={this.searchHandler} />
        <Photos />
        <Details />
        <Descriptions />
        <Extra />
      </div>
    )
  }
}

export default ProductOverview;