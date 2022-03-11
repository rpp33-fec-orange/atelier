import React from 'react';
import RelatedProductsRow from './RelatedProductsRow.jsx'
import YourOutfitRow from './YourOutfitRow.jsx'
import $ from 'jquery';

class RelatedProducts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      product_id: null,
      relatedProducts: [],
      relatedProductsInfo: [],
      relatedStylesInfo: [],
      parentProduct: [],
      relatedProductsIds: [],
      initialized: false
    };
    this.fetchParentProductData = this.fetchParentProductData.bind(this);
    this.fetchParentProductStyles = this.fetchParentProductStyles.bind(this);
    this.fetchRelatedProductsData = this.fetchRelatedProductsData.bind(this);
  }

  fetchParentProductData () {
    // This AJAX request fetches product data for parent product (shown in product overview section) info
    $.ajax({
      context: this,
      type: 'GET',
      url: `/products/${this.props.id}`,
      contentType: "application/json",
      success: function (data) {
        var tempArray = [];
        tempArray.push(data)
        this.setState({
          parentProduct: JSON.parse(JSON.stringify(tempArray))
        }, () => {
          this.fetchParentProductStyles();
        })
      },
      error: function (error) {
        console.log('error in GET request', error);
      },
    })
  }

  fetchParentProductStyles () {
    // This AJAX request fetches styles data (including photos) for parent product (shown in product overview section) info
    $.ajax({
      context: this,
      type: 'GET',
      url: `/products/${this.props.id}/styles`,
      contentType: "application/json",
      success: function (data) {
        const parentProduct = this.state.parentProduct[0];
        parentProduct['styles'] = data.results;
        this.setState({
          parentProduct: parentProduct
        }, () => {
          this.fetchRelatedProductsData();
        })
      },
      error: function (error) {
        console.log('error in GET request', error);
      },
    })
  }

  fetchRelatedProductsData () {
    // This AJAX request fetches related products info
    $.ajax({
      context: this,
      type: 'GET',
      url: `/products/${this.props.id}/related`,
      contentType: "application/json",
      success: function (data) {
        var relatedProductsIds = data.shift();
          this.setState({
            relatedProductsInfo: data,
            relatedProductsIds: relatedProductsIds,
            initialized: true
          })
      },
      error: function (error) {
        console.log('error in GET request', error);
      },
    })
  }

  componentDidMount () {
    this.setState({
      product_id: this.props.id,
    }, () => {
      this.fetchParentProductData();
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
        this.setState({
          product_id: this.props.id,
          initialized: false
        }, () => {
          this.fetchParentProductData();
        });
    }
  }

  render() {

    if (this.state.initialized) {
      return (
        <div className = 'related-products-and-items'>
          <div className = "related-products-row">
            <div className = 'heading'>Related Products</div>
            <RelatedProductsRow relatedProductsIds = {this.state.relatedProductsIds} parentProduct = {this.state.parentProduct} relatedProductsInfo = {this.state.relatedProductsInfo} handleProductChange = {this.props.handleProductChange} initialized = {this.state.initialized}/>
          </div>
          <div className = "your-outfit-row">
            <div className = 'heading'>Your Outfit</div>
            <YourOutfitRow currentStyle = {this.props.currentStyle} yourOutfitArray = {this.props.yourOutfitArray} yourOutfitHandleClick = {this.props.yourOutfitHandleClick}/>
          </div>
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

export default RelatedProducts;