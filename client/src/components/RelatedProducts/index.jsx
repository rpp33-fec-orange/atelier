import React from 'react';
import RelatedProductsRow from './RelatedProdcutsRow.jsx'
import YourOutfitRow from './YourOutfitRow.jsx'
import searchAPI from './searchAPI'

class RelatedProducts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: ''
    }
  }

  componentDidMount () {
    var options = {
      endPoint: 'products',
      page: 1,
      count: 5
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
      <div>
      <h4 id = 'related-products'>Related Products</h4>
      <RelatedProductsRow/>
      <h4 id = 'related-products'>Your Outfit</h4>
      <YourOutfitRow/>
    </div>
    )
  }
}

export default RelatedProducts;