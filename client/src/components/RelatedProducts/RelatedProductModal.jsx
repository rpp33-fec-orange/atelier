import React from 'react';

class RelatedProductModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      combinedFeatures: []
    }
    this.onClose = this.onClose.bind(this);
    this.combinedFeatures = this.combinedFeatures.bind(this);
  }

  onClose(e) {
    this.props.onClose() && this.props.onClose(e);
  }

  combinedFeatures() {

    const {parentProduct, relatedProduct} = this.props;
    var parentProductFeatures = parentProduct.features;
    var relatedProductFeatures = relatedProduct.features;
    var combinedFeatures = parentProductFeatures.concat(relatedProductFeatures);

    for (var i = 0; i < combinedFeatures.length; i++) {
      for (var j = 0; j < parentProductFeatures.length; j++) {
        if (combinedFeatures[i].feature === parentProductFeatures[j].feature) {
          if (combinedFeatures[i].value === null) {
            combinedFeatures[i].parentProductValue = '';
            combinedFeatures[i].relatedProductValue = '';
          } else if (combinedFeatures[i].value === true) {
            combinedFeatures[i].parentProductValue = '✔️';
            combinedFeatures[i].relatedProductValue = '';
          } else {
            combinedFeatures[i].parentProductValue = combinedFeatures[i].value;
            combinedFeatures[i].relatedProductValue = '';
          }
        }
      }
    }

    for (var i = 0; i < combinedFeatures.length; i++) {
      for (var j = 0; j < relatedProductFeatures.length; j++) {

        if (combinedFeatures[i].parentProductValue === undefined) {
          combinedFeatures[i].parentProductValue = '';
        }
        if (combinedFeatures[i].feature === relatedProductFeatures[j].feature) {
          if (combinedFeatures[i].value === null) {
            combinedFeatures[i].relatedProductValue = '';
          } else if (combinedFeatures[i].value === true) {
            combinedFeatures[i].relatedProductValue = '✔️';
          } else {
            combinedFeatures[i].relatedProductValue = combinedFeatures[i].value;
          }
        }
      }
    }
    return combinedFeatures;
  }

  render() {
    const combinedFeatures = this.combinedFeatures();
    const  {parentProduct, relatedProduct, show} = this.props;

    if (show) {
      return (
        <div className = 'related-product-modal'>
          <div className = 'comparing' >Comparing</div>
          <div className = 'related-product-modal-content'>
            <div className = 'related-product-modal-table-header'>
              <table>
                <tbody>
                  <tr >
                    <th className="related-product-modal-col related-product-modal-col-1">{parentProduct.name}</th>
                    <th className="related-product-modal-col related-product-modal-col-2"></th>
                    <th className="related-product-modal-col related-product-modal-col-3">{relatedProduct.name}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className = 'related-product-modal-table-body'>
              <table>
                <tfoot className = 'related-product-modal-table-footer'>
                  <tr >
                    <button className = 'related-product-modal-close-button' onClick = {(e) => {this.onClose()}}>Close</button>
                  </tr>
                </tfoot>
                <tbody>
                  {combinedFeatures.map((feature) => {
                    return (<tr key = {feature.feature} >
                      <th className="related-product-modal-col related-product-modal-col-1">{feature.parentProductValue}</th>
                      <th className="related-product-modal-col mrelated-product-odal-col-2">{feature.feature}</th>
                      <th className="related-product-modal-col related-product-modal-col-3">{feature.relatedProductValue}</th>
                    </tr>)
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

export default RelatedProductModal
