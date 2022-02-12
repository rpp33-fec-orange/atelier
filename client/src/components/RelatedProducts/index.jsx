import React from 'react';
import RelatedProductsRow from './/RelatedProdcutsRow.jsx'
import YourOutfitRow from './/YourOutfitRow.jsx'

const RelatedProducts = (props) => (
  <div>
    <h4 id = 'related-products'>Related Products</h4>
    <RelatedProductsRow/>
    <h4 id = 'related-products'>Your Outfit</h4>
    <YourOutfitRow/>
  </div>
)

export default RelatedProducts;