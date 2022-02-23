import React from 'react';

class Quantity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityArray: props.quantityArray,
      quantityBool: false
    }
  }

  render() {
    // if () {
    //   return (
    //     <select id="quantity"></select>
    //     <options value="nullQuantity">-</options>
    //   )
    // } else {
    return (
      <div>
        <select id="quantity" >
          {this.state.quantityArray.map((quantityItem) =>
            <option value={quantityItem}>{quantityItem}</option>
          )}
        </select><br></br>
      </div >)

    // }
  }
}

export default Quantity;