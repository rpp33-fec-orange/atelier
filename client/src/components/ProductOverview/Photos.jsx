import React from 'react';

class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

  render() {
    return (
      <div>
        <img id="mainPhoto" src="https://cdn.shopify.com/s/files/1/0286/4077/2235/products/Knit-polo-sweater-The-Korean-Fashion_61ba38bf-7198-4f52-bca3-8b7ee082e567_1800x1800.jpg?v=1639580510" width="200" height="200"></img>
      </div >
    )
  }
}

export default Photos;