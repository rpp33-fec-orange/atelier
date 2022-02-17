import React from 'react';
import $ from 'jquery';
import Search from './Search.jsx';
import Photos from './Photos.jsx';
import Details from './Details.jsx';
import Descriptions from './Descriptions.jsx';
import CheckList from './CheckList.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    // let parentState = props;
    // console.log('parent state', parentState);
    super(props);
    this.state = {
      // id: parentState.id
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
        console.log('product overview ajax GET success');
        this.setState({
          product: success[0],
        });
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
    console.log('child state id: ', this.state.id);
    return (
      <div id="overview">
        <Search searchHandler={this.searchHandler} />
        <Photos />
        <Details />
        <Descriptions product={this.state.product} />
        <CheckList />
      </div>
    )

  }
}

export default ProductOverview;