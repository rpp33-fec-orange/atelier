import React from 'react';

class Features extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

  render() {
    return (
      <div id="checklist">
        ✔ Range Free Unicorn Hair <br></br>
        ✔ Twice Reborn Phoenix Feather <br></br>
        ✔ Earth Core Crystalized Lava
      </div >
    )
  }
}

export default Features;