import React from 'react';

class Descriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

  render() {
    return (
      <div id="descriptions">
        Esconced yourself in the finest wool in all of Middle Earth, crafted with Elven Everlast threads with flax fiber from the Shire with a dash of gunpowder of Modor.<br></br>
      </div >
    )
  }
}

export default Descriptions;