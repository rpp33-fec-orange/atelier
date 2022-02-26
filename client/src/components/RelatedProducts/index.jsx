import React from 'react';
import RelatedProductsRow from './RelatedProdcutsRow.jsx'
import YourOutfitRow from './YourOutfitRow.jsx'
import $ from 'jquery';

class RelatedProducts extends React.Component {

  constructor(props) {

    var product_id = props.id
    super(props);
    this.state = {
      product_id: product_id,
      relatedProducts: [],
      relatedProductsInfo: [],
      relatedStylesInfo: [],
      parentProduct: [],
      relatedProductsIds: []
    }
  }

  componentDidMount () {

    // This AJAX request fetches product data for parent product (shown in product overview section) info

    $.ajax({
      context: this,
      type: 'GET',
      url: `/products/${this.state.product_id}`,
      contentType: "application/json",
      success: function (data) {
        // console.log('parent product data received by client', data)
        this.setState({
          parentProduct: [data]
        })
      },
      error: function (error) {
        console.log('error in GET request', error);
      },
    })

    // This AJAX request fetches styles data (including photos) for parent product (shown in product overview section) info

    $.ajax({
      context: this,
      type: 'GET',
      url: `/products/${this.state.product_id}/styles`,
      contentType: "application/json",
      success: function (data) {
        // console.log('parent product styles data received by client', data)
        const parentProduct = this.state.parentProduct[0];
        parentProduct['styles'] = data.results;
        // console.log('parent product with styles', parentProduct)
        this.setState({
          parentProduct: parentProduct
        })
      },
      error: function (error) {
        console.log('error in GET request', error);
      },
    })

    // This AJAX request fetches related products info

    $.ajax({
      context: this,
      type: 'GET',
      url: `/products/${this.state.product_id}/related`,
      contentType: "application/json",
      success: function (data) {
        // console.log('product data received by client', data)

        const relatedProductsIds = data.shift();

          this.setState({
            relatedProductsInfo: data,
            relatedProductsIds: relatedProductsIds
          })
      },
      error: function (error) {
        console.log('error in GET request', error);
      },
    })

  }

  render() {
    return (
      <div id = 'related-products-and-items'>
        <div className = "related-products-row">
          <h4 id = 'related-products'>Related Products</h4>
          <RelatedProductsRow relatedProductsIds = {this.state.relatedProductsIds} parentProduct = {this.state.parentProduct} relatedProductsInfo = {this.state.relatedProductsInfo}/>
        </div>
        <div className = "your-outfit-row">
          <h4 id = 'your-outfit'>Your Outfit</h4>
          <YourOutfitRow/>
        </div>
      </div>
    )
  }
}

export default RelatedProducts;