import React from 'react';
// HOW TO USE: this React component takes in props.num as input, and will output a number of rendered stars
// equivalent to the value passed in.
// The value passed in must be between 0 and 5.

class Rating extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      0: 'https://www.surecritic.com/assets/star2-0.svg',
      0.25: 'https://www.surecritic.com/assets/star2-1q.svg',
      0.5: 'https://www.surecritic.com/assets/star2-2q.svg',
      0.75: 'https://www.surecritic.com/assets/star2-3q.svg',
      fullStar: 'https://www.surecritic.com/assets/star2-1.svg'
    }
    this.roundToQuater = this.roundToQuater.bind(this);
    this.renderStars = this.renderStars.bind(this);
    this.renderOneStar = this.renderOneStar.bind(this);
  }

  roundToQuater(rawNum) {
    var number = rawNum;
    if (number >= 0 && number <= 5) {
      number = (Math.round(number * 4) / 4).toFixed(2);
      return number;
    }
    return ('number has to be between 0 and 5');
  }

  renderStars() {
    var roundedNum = this.roundToQuater(this.props.num);  // e.g: 3.25
    var mainNum = Math.floor(roundedNum);
    var leftoverNum = roundedNum - mainNum;
    var leftoverNumStr = JSON.stringify(leftoverNum);
    var stars = [];
    if (mainNum) {
      for (var i = 0; i < mainNum; i++) {
        stars.push(<img className="star" src={this.state.fullStar} key={i} />);
      }
    }
    if (mainNum < 5) {
      stars.push(<img class="star" src={this.state[leftoverNumStr]} key={mainNum} />);
    }
    return stars;
  }

  renderOneStar(source) {
    return <img class="po-star" src={source} />
  }

  render() {
    var stars = this.renderStars();
    return (
      <div>
        {/* <img class="star" src={this.state[0]} />
				<img class="star" src={this.state[0]} />
				<img class="star" src={this.state[0]} />
				<img class="star" src={this.state[0]} />
				<img class="star" src={this.state[0]} /> */}
        <div class="po-stars-container">{stars}</div>
      </div>
    );
  }
}

export default Rating;




