import React from 'react';

class Slogan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

  render() {
    return (
      <div>
        <div id="slogan">
          Esconced yourself in the finest wool in all of Middle Earth, crafted with Elven Everlast threads with flax fiber from the Shire with a dash of gunpowder of Modor.<br></br>
          ✔ Range Free Unicorn Hair <br></br>
          ✔ Twice Reborn Phoenix Feather <br></br>
          ✔ Earth Core Crystalized Lava
        </div>
      </div >
    )
  }
}

export default Slogan;