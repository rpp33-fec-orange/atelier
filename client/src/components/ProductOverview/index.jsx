import React from 'react';
import $ from 'jquery';
import TopBar from './TopBar.jsx';
import Styles from './Styles.jsx';
import Info from './Info.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      productById: {},
      productStylesById: {},
      styles: [],
      initialized: false
    }
    this.productHandler = this.productHandler.bind(this);
    this.stylesHandler = this.stylesHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }

  productHandler() {
    $.ajax({
      context: this,
      type: 'GET',
      url: `/products/${this.state.id}`,
      success: function (success) {
        console.log('product overview productHandler ajax GET success');
        this.setState({
          productById: success,
        })
      },
      error: function (error) {
        console.log('product overviewnproductHandler ajax GET error: ', error);
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
        console.log('product overview productHandler ajax GET success');
        this.setState({
          productStylesById: success,
          styles: success.results,
          initialized: true
        })
      },
      error: function (error) {
        console.log('product overview productHandler ajax GET error: ', error);
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
        console.log('product overview searchHandler ajax POST success');
      },
      error: function (error) {
        console.log('product overview searchHandler ajax POST error: ', error);
      },
      contentType: "application/json",
    })
    alert(`${keyword} was searched!`);
  }

  componentDidMount() {
    this.productHandler();
    this.stylesHandler();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({
        id: this.props.id,
      })
    }
    this.productHandler();
    this.stylesHandler()
    // this.searchHandler();
  }

  render() {
    if (this.state.initialized) {
      return (
        <div class="index-container" id="productOverview">
          <div class="index-item index-item-1">
            <TopBar data-testid="topbar?" searchHandler={this.searchHandler} />
          </div>
          <div id="message">Hack Reactor Sale! ---Extra 40% off on selected items--- Free shipping for orders over $50!</div>
          <div class="index-item index-item-2">
            <Styles data-testid="styles?" productById={this.state.productById} productStylesById={this.state.productStylesById} rating={this.props.rating} currentStyleHandler={this.props.currentStyleHandler} yourOutfitHandleClick={this.props.yourOutfitHandleClick} />
          </div>
          <div class="index-item index-item-2">
            <Info data-testid="descriptions?" productById={this.state.productById} />
          </div>
        </div>
      )
    } else {
      return (
        <div data-testid="loading" id="loading">
          ⇆ Loading...
        </div>
      )
    }
  }
}

export default ProductOverview;