import React from 'react';
import $ from 'jquery';
import Search from './Search.jsx';
import Photos from './Photos.jsx';
import Details from './Details.jsx';
import Descriptions from './Descriptions.jsx';
import Features from './Features.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      productById: {},
      productStylesById: {},
      initialized: false
    }
    this.productHandler = this.productHandler.bind(this);
    this.stylesHandler = this.stylesHandler.bind(this);
    this.searcHHandler = this.searchHandler.bind(this);
  }

  productHandler() {
    $.ajax({
      context: this,
      type: 'GET',
      url: `/products/${this.state.id}`,
      success: function (success) {
        console.log('productHandler ajax GET success:');
        this.setState({
          productById: success,
        })
      },
      error: function (error) {
        console.log('productHandler ajax GET error: ', error);
      },
      contentType: "application/json",
    })
  }

  stylesHandler() {
    $.ajax({
      context: this,
      type: 'GET',
      url: `/products/${this.state.id}/styles`,
      success: function (success) {
        console.log('productHandler ajax GET success:');
        this.setState({
          productStylesById: success,
          initialized: true
        })
      },
      error: function (error) {
        console.log('productHandler ajax GET error: ', error);
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
        console.log('searchHandler ajax POST success');
      },
      error: function (error) {
        console.log('searchHandler ajax POST error: ', error);
      },
      contentType: "application/json",
    })
    alert(`${keyword} was searched!`);
  }

  componentDidMount() {
    this.productHandler();
    this.stylesHandler();
  }

  render() {
    console.log('productStylesById: ', this.state.productStylesById);
    if (this.state.initialized) {
      return (
        <div id="overview">
          <Search searchHandler={this.searchHandler} />
          <Photos productStylesById={this.state.productStylesById} />
          <Details productById={this.state.productById} productStylesById={this.state.productStylesById} />
          <Descriptions productById={this.state.productById} />
          <Features productById={this.state.productById} />
        </div>
      )
    } else {
      return (
        <div id="loading">
          ⇆ Loading...
        </div>
      )
    }
  }
}

export default ProductOverview;