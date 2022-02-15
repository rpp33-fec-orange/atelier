import React from 'react';
import $ from 'jquery';
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
    this.initialHandler = this.initialHandler.bind(this);
    this.searcHHandler = this.searchHandler.bind(this);
  }

  initialHandler() {
    $.ajax({
      context: this,
      type: 'GET',
      url: '/products',
      success: function (success) {
        console.log('product overview ajax GET success');
        this.setState({ product: success });
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
    this.initialHandler();
  }

  render() {
    return (
      <div id="overview">
        <Search searchHandler={this.searchHandler} />
        <Photos />
        <Details />
        <Descriptions />
        <Slogan />
      </div>
    )
  }
}

export default ProductOverview;