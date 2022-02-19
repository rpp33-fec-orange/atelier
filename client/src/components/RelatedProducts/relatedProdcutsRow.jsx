import React from 'react';
import images from './stockImages.jsx';

var photoUnavailable = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg'

const rowStyle = {
  display: 'flex'
};

const columnStyle = {
  flex: '33.33%',
  padding: '5px',
  border: '1px solid #555',
  width: '150'
};

const RelatedProductsRow = (props) => {

  if (props.relatedProductsInfo === null) {

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

  } else if (props.relatedProductsInfo) {

    var DOMarray = props.relatedProductsInfo.map((product) => {
      console.log('product in component', product);
      return (
        <div className = "col-md-2" style = {columnStyle}  align = 'center'>
          <img src = {product.photos[0].url || photoUnavailable} alt = "Sample Image" height = "150" width = '150'/>
          <div id = 'category'>{product.category}</div>
          <div id = 'product-description'>{product.name}</div>
          <div id = 'price'>{product.default_price}</div>
          <div id = 'rating'>★★★★☆</div>
        </div>
      )
    })

    return (
      <div className = " related-products-row" style = {rowStyle}>
        {DOMarray}
      </div>
    )

    // return (
    //   <div className = " related-products-row" style = {rowStyle}>
    //     <div className = "col-md-2" style = {columnStyle}>
    //       <img src = {images.relatedProductImages[0]} alt = "Sample Image" height = "150" />
    //       <div id = 'category'>${props.relatedProductsInfo[0].category}</div>
    //       <div id = 'product-description'>${props.relatedProductsInfo[0].name}</div>
    //       <div id = 'price'>${props.relatedProductsInfo[0].default_price}</div>
    //       <div id = 'rating'>★★★★☆</div>
    //     </div>
    //     <div className = "col-md-2" style = {columnStyle}>
    //       <img src = {images.relatedProductImages[1]} alt = "Sample Image" height = "150" />
    //       <div id = 'category'>Men's Clothing</div>
    //       <div id = 'product-description'>Collared Green T-shirt</div>
    //       <div id = 'price'>$19.99</div>
    //       <div id = 'rating'>★★★★☆</div>
    //     </div>
    //     <div className = "col-md-2" style = {columnStyle}>
    //       <img src = {images.relatedProductImages[2]} alt = "Sample Image" height = "150" />
    //       <div id = 'category'>Men's Clothing</div>
    //       <div id = 'product-description'>Collared Pink T-shirt</div>
    //       <div id = 'price'>$19.99</div>
    //       <div id = 'rating'>★★★★☆</div>
    //     </div>
    //     <div className = "col-md-2" style = {columnStyle}>
    //       <img src = {images.relatedProductImages[3]} alt = "Sample Image" height = "150" />
    //       <div id = 'category'>Men's Clothing</div>
    //       <div id = 'product-description'>White T-shirt</div>
    //       <div id = 'price'>$19.99</div>
    //       <div id = 'rating'>★★★★☆</div>
    //     </div>
    //   </div>
    //  )

  }
}

export default RelatedProductsRow;