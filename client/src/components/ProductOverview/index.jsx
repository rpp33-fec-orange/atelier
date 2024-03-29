import React from 'react';
import $ from 'jquery';
import TopBar from './TopBar.jsx';
import Styles from './Styles.jsx';
import Info from './Info.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      productById: {},
      productStylesById: {},
      styles: [],
      initialized: false
    }
    this.productHandler = this.productHandler.bind(this);
    this.stylesHandler = this.stylesHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.recordInteractions = this.recordInteractions.bind(this);
  }

  productHandler() {
    $.ajax({
      context: this,
      type: 'GET',
      url: `/products/${this.state.id}`,
      success: function (success) {
        // console.log('product overview productHandler ajax GET success');
        this.setState({
          productById: success,
        }, () => {
          this.stylesHandler();
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
        // console.log('product overview productHandler ajax GET success');
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

  searchHandler(id) {
    // $.ajax({
    //   context: this,
    //   type: 'POST',
    //   url: '/search',
    //   data: JSON.stringify({ keyword }),
    //   success: function (success) {
    //     // console.log('product overview searchHandler ajax POST success');
    //   },
    //   error: function (error) {
    //     console.log('product overview searchHandler ajax POST error: ', error);
    //   },
    //   contentType: "application/json",
    // })
    $.ajax({
      context: this,
      type: 'GET',
      url: `/products/${id}`,
      success: function (success) {
        // console.log('product overview productHandler ajax GET success');
        this.setState({
          productById: success,
        }, () => {
          this.stylesHandler();
        })
      },
      error: function (error) {
        console.log('product overviewnproductHandler ajax GET error: ', error);
      },
      contentType: "application/json",
    })
    // alert(`${keyword} was searched!`);
    // alert('Search feature coming in next update.');
  }

  recordInteractions(e) {
    this.props.interactions({
      element: e.target.nodeName,
      widget: 'Product Overview',
      time: new Date().toISOString()
    });
  }

  componentDidMount() {
    this.setState({
      id: this.props.id
    }, () => {
      this.productHandler();
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({
        id: this.props.id,
        initialized: false
      }, () => {
        this.productHandler();
      })
    }
  }

  render() {
    if (this.state.initialized) {
      return (
        <div class="index-container" id="productOverview" onClick={this.recordInteractions}>
          <div class="index-item index-item-1">
            <TopBar data-testid="topbar?" searchHandler={this.searchHandler} />
          </div>
          <div id="message">Hack Reactor Sale! ---Extra 40% off on selected items--- Free shipping for orders over $50!</div>
          <div class="index-item index-item-2">
            <Styles data-testid="styles?" productById={this.state.productById} productStylesById={this.state.productStylesById} rating={this.props.rating} currentStyleHandler={this.props.currentStyleHandler} yourOutfitHandleClick={this.props.yourOutfitHandleClick} />
          </div>
          <div class="index-item index-item-2">
            <div class="info-container" id="Info">
              <div class="info-item info-item-1-container">
                <div class="info-item-1-1" id="slogan">{this.state.productById.slogan}.</div>
                <div class="info-item-1-2" id="description">{this.state.productById.description}</div>
              </div>
              <div class="info-item info-item-2" id="features">
                {this.state.productById.features.map((singleData) =>
                  <div>
                    ✔ {singleData.feature}: {singleData.value}
                  </div>
                )}
              </div >
            </div >
            {/* <Info data-testid="info?" productById={this.state.productById} /> */}
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