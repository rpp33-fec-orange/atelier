import React from 'react';

class StarItem extends React.Component {
  constructor(props) {
    super(props);
    this.roundToQuater = this.roundToQuater.bind(this);
  }
  roundToQuater(n) {
    var number = n;
    if (number >= 0 && number <= 5) {
      number = (Math.round(number * 4) / 4).toFixed(2);
      return number;
    }
    return ('number has to be between 0 and 5');
  }

  render() {
    const starsInner = {
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden',
      width: 50,
    };

    const starsOuter = {
      display: 'inline-block',
      position: 'relative',
      fontFamily: 'FontAwesome',
    }

    return (
      <div></div>
    )
  }
}

export default StarItem;



