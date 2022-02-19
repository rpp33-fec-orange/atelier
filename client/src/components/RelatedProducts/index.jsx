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
      relatedProducts: null,
      relatedProductsInfo: null,
      relatedStylesInfo: null
    }
    // this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount () {

    // This AJAX request fetches related products info

    $.ajax({
      context: this,
      type: 'GET',
      url: `/products/${this.state.product_id}/related`,
      contentType: "application/json",
      success: function (data) {
        console.log('product data received by client', data)
          this.setState({
            relatedProductsInfo: data
          })
      },
      error: function (error) {
        console.log('error in GET request')
      },
    })

    // This AJAX request fetches related products styles (for product photos)

    // $.ajax({
    //   context: this,
    //   type: 'GET',
    //   url: `/products/${this.state.product_id}/relatedStyles`,
    //   contentType: "application/json",
    //   success: function (data) {
    //     console.log('style data received by client')
    //       this.setState({
    //         relatedStylesInfo: data
    //       })
    //   },
    //   error: function (error) {
    //     console.log('error in GET request')
    //   },
    // })

  }

  render() {
    return (
      <div id = 'related-products-and-items'>
        <div className = "related-products-row">
          <h4 id = 'related-products'>Related Products</h4>
          <RelatedProductsRow relatedProductsInfo = {this.state.relatedProductsInfo}/>
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