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

    // console.log('props in modal ', this.props)
    // console.log('parent product in modal', parentProduct)
    // console.log('related products in modal', relatedProduct)

    var parentProductFeatures = parentProduct.features;
    var relatedProductFeatures = relatedProduct.features;

    // console.log('parent product features', parentProductFeatures)
    // console.log('related products features', relatedProductFeatures)
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
        <div className = 'modal'>
          <div align = 'left'>Comparing</div>
          <div className = 'modal-content'>
            <div className = 'modal-table-header'>
              <table>
                <tbody>
                  <tr>
                    <th className="modal-col modal-col-1">{parentProduct.name}</th>
                    <th className="modal-col modal-col-2"></th>
                    <th className="modal-col modal-col-3">{relatedProduct.name}</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className = 'modal-table-body'>
              <table>
                <tbody>
                  {combinedFeatures.map((feature) => {
                    return (<tr key = {feature.feature}>
                      <th className="modal-col modal-col-1">{feature.parentProductValue}</th>
                      <th className="modal-col modal-col-2">{feature.feature}</th>
                      <th className="modal-col modal-col-3">{feature.relatedProductValue}</th>
                    </tr>)
                  })}
                </tbody>
              </table>
            </div>
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
