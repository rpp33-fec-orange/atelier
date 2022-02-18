import React from 'react';
import RelatedProductsRow from './RelatedProdcutsRow.jsx'
import YourOutfitRow from './YourOutfitRow.jsx'
import searchAPI from '../../../../server/helpers/relatedItems.js'

class RelatedProducts extends React.Component {

  constructor(props) {

    var product_id = props.id
    super(props);
    this.state = {
      product_id: product_id || 64621
    }
  }

  // 64620, 64621. 64622, 64623, 64624

  // /:product_id/related

  componentDidMount () {

    var options = {
      purpose: 'get products',
      endPoint: 'products',
      page: 10,
      count: 10
    }
    searchAPI(options, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });

    var options = {
      purpose: 'get related product ids',
      endPoint: 'products/:product_id/related',
      product_id: 64623,
    }
    searchAPI(options, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });

  }

  render() {
    return (
      <div id = 'related-products-and-items'>
        <div className = "related-products-row">
          <h4 id = 'related-products'>Related Products</h4>
          <RelatedProductsRow/>
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