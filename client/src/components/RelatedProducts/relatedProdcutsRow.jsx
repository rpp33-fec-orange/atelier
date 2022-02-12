import React from 'react';
import images from './/stockImages.jsx';

const rowStyle = {
  display: 'flex'
};

const columnStyle = {
  flex: '33.33%',
  padding: '5px',
  border: '1px solid #555'
};



console.log(images.relatedProductImages)

const RelatedProductsRow = () => {
  return (
    <div className = " related-products-row" style = {rowStyle}>
      <div className = "col-md-2" style = {columnStyle}>
        <img src = {images.relatedProductImages[0]} alt = "Sample Image" height = "150" />
        <div id = 'category'>Men's Clothing</div>
        <div id = 'product-description'>Collared T-shirt</div>
        <div id = 'price'>$19.99</div>
        <div id = 'rating'>★★★★☆</div>
      </div>
      <div className = "col-md-2" style = {columnStyle}>
        <img src = {images.relatedProductImages[1]} alt = "Sample Image" height = "150" />
        <div id = 'category'>Men's Clothing</div>
        <div id = 'product-description'>Collared Green T-shirt</div>
        <div id = 'price'>$19.99</div>
        <div id = 'rating'>★★★★☆</div>
      </div>
      <div className = "col-md-2" style = {columnStyle}>
        <img src = {images.relatedProductImages[2]} alt = "Sample Image" height = "150" />
        <div id = 'category'>Men's Clothing</div>
        <div id = 'product-description'>Collared Pink T-shirt</div>
        <div id = 'price'>$19.99</div>
        <div id = 'rating'>★★★★☆</div>
      </div>
      <div className = "col-md-2" style = {columnStyle}>
        <img src = {images.relatedProductImages[3]} alt = "Sample Image" height = "150" />
        <div id = 'category'>Men's Clothing</div>
        <div id = 'product-description'>White T-shirt</div>
        <div id = 'price'>$19.99</div>
        <div id = 'rating'>★★★★☆</div>
      </div>
    </div>
  )
}

export default RelatedProductsRow;