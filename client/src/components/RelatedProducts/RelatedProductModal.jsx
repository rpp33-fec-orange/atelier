import React from 'react';

class RelatedProductModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      // showModal: false
    }
    this.onClose = this.onClose.bind(this);
  }

  onClose(e) {
    this.props.onClose() && this.props.onClose(e);
  }

  render() {

    const  { show } = this.props;

    // console.log('show', show)

    let modalStar;

    if (show) {
      return (
        <div className = 'modal'>
          Product Comparison Modal
          <div className = 'modal-content'>

          </div>
          <div className = 'modal-actions'>
            <button className = 'toggle-button' onClose = {(e) => {this.onClose(e)}}></button>
          </div>
        </div>
      )
    } else {
      return null;
    }

  }
}

export default RelatedProductModal
