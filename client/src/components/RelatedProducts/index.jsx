import React from 'react';
import RelatedProductsRow from './RelatedProdcutsRow.jsx'
import YourOutfitRow from './YourOutfitRow.jsx'
import $ from 'jquery';

class RelatedProducts extends React.Component {

  constructor(props) {

    // var product_id = props.id
    super(props);
    this.state = {
      product_id: null,
      relatedProducts: [],
      relatedProductsInfo: [],
      relatedStylesInfo: [],
      parentProduct: [],
      relatedProductsIds: []
    }
  }

  componentDidMount () {

    this.setState({
      product_id: this.props.id,
    })

    // This AJAX request fetches product data for parent product (shown in product overview section) info

    $.ajax({
      context: this,
      type: 'GET',
      url: `/products/${this.props.id}`,
      contentType: "application/json",
      success: function (data) {
        // console.log('parent product data received by client', data)
        var tempArray = [];
        tempArray.push(data)
        this.setState({
          parentProduct: JSON.parse(JSON.stringify(tempArray))
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
      url: `/products/${this.props.id}/styles`,
      contentType: "application/json",
      success: function (data) {
        // console.log('parent product styles data received by client', data)
        // console.log('parent product with styles', parentProduct)
        // console.log('state in component did mount', this.state)
        const parentProduct = this.state.parentProduct[0];
        parentProduct['styles'] = data.results;
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
      url: `/products/${this.props.id}/related`,
      contentType: "application/json",
      success: function (data) {
        // console.log('product data received by client', data)
        var relatedProductsIds = data.shift();
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

  // componentDidUpdate(prevProps) {

  //   // this.setState({
  //   //   product_id: this.props.id,
  //   // })

  //   if (this.props.id !== prevProps.id) {

  //   // This AJAX request fetches product data for parent product (shown in product overview section) info

  //   $.ajax({
  //     context: this,
  //     type: 'GET',
  //     url: `/products/${this.props.id}`,
  //     contentType: "application/json",
  //     success: function (data) {
  //       // console.log('parent product data received by client', data)
  //       this.setState({
  //         parentProduct: [data]
  //       })
  //     },
  //     error: function (error) {
  //       console.log('error in GET request', error);
  //     },
  //   })

  //   // This AJAX request fetches styles data (including photos) for parent product (shown in product overview section) info

  //   $.ajax({
  //     context: this,
  //     type: 'GET',
  //     url: `/products/${this.props.id}/styles`,
  //     contentType: "application/json",
  //     success: function (data) {
  //       // console.log('parent product styles data received by client', data)
  //       const parentProduct = this.state.parentProduct[0];
  //       parentProduct['styles'] = data.results;
  //       // console.log('parent product with styles', parentProduct)
  //       this.setState({
  //         parentProduct: parentProduct
  //       })
  //     },
  //     error: function (error) {
  //       console.log('error in GET request', error);
  //     },
  //   })

  //   // This AJAX request fetches related products info

  //   $.ajax({
  //     context: this,
  //     type: 'GET',
  //     url: `/products/${this.props.id}/related`,
  //     contentType: "application/json",
  //     success: function (data) {
  //       console.log('product data received by client', data)

  //       var relatedProductsIds = data.shift();
  //       // relatedProductsIds = data.shift();

  //         this.setState({
  //           relatedProductsInfo: data,
  //           relatedProductsIds: relatedProductsIds
  //         })
  //     },
  //     error: function (error) {
  //       console.log('error in GET request', error);
  //     },
  //   })
  // }

  // console.log('updated related products info', this.state.relatedProductsInfo)

  // }

  render() {
    return (
      <div className = 'related-products-and-items'>
        <div className = "related-products-row">
          <div className = 'heading'>Related Products</div>
          <RelatedProductsRow relatedProductsIds = {this.state.relatedProductsIds} parentProduct = {this.state.parentProduct} relatedProductsInfo = {this.state.relatedProductsInfo} handleProductChange = {this.props.handleProductChange}/>
        </div>
        <div className = "your-outfit-row">
          <div className = 'heading'>Your Outfit</div>
          <YourOutfitRow currentStyle = {this.props.currentStyle} yourOutfitArray = {this.props.yourOutfitArray} yourOutfitHandleClick = {this.props.yourOutfitHandleClick}/>
        </div>
      </div>
    )
  }
}

export default RelatedProducts;