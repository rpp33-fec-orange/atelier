import React from 'react';
// HOW TO USE: this React component takes in props.num as input, and will output a number of rendered stars
// equivalent to the value passed in.
// The value passed in must be between 0 and 5.

class StarRating extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			greyStar: 'https://www.surecritic.com/assets/star2-0.svg',
			0.25: 'https://www.surecritic.com/assets/star2-1q.svg',
			0.5: 'https://www.surecritic.com/assets/star2-2q.svg',
			0.75: 'https://www.surecritic.com/assets/star2-3q.svg',
			fullStar: 'https://www.surecritic.com/assets/star2-1.svg'
		}
		this.roundToQuater = this.roundToQuater.bind(this);
		this.renderStars = this.renderStars.bind(this);
	}

	roundToQuater(rawNum) {
		var number = rawNum;
		if (number > 0 && number <= 5) {
			number = (Math.round(number * 4) / 4).toFixed(2);
			return number;
		}
		return ('number has to be between 1 and 5');
	}

	renderStars() {
		if (this.props.num === 0 || this.props.num === undefined) {
			var allGrey = [];    // store all 5 grey stars just in case
			for (var j = 0; j < 5; j++) {
				allGrey.push(<img className="star" src={this.state.greyStar} alt='star-image' key={j} />);
			}
			return allGrey;
		} else {
			// Do everything else just like before
			var roundedNum = 0;
			if (this.props.num != 0) {
				var roundedNum = this.roundToQuater(this.props.num);  // e.g: 3.25
			}
			var mainNum = Math.floor(roundedNum);    // this is 3 filled stars
			var leftoverNum = 5 - mainNum;    // this is   2 grey stars
			var fractionNum = roundedNum - mainNum;   // this is 0.25 star
			var fractionNumLeftover = 1 - fractionNum;  // this is 0.75
			var fractionNumStr = JSON.stringify(fractionNum);   // 0.25 star but String
			var stars = [];    // store all the filled and grey stars
			if (mainNum) {     // this loop will render all filled full stars
				for (var i = 0; i < mainNum; i++) {
					stars.push(<img className="star" src={this.state.fullStar} alt='star-image' key={i} />);
				}
				// fractionNum can only be 0, 0.25, 0.5 and 0.75
			}

			if (fractionNum === 0.25) {
				stars.push(<img className="star" src={this.state[0.25]} alt='star-image' key={mainNum} />);
				for (var k = 0; k < leftoverNum - 1; k++) {
					stars.push(<img className="star" src={this.state.greyStar} alt='star-image' key={mainNum + 1 + k} />);
				}
			} else if (fractionNum === 0.5) {
				stars.push(<img className="star" src={this.state[0.5]} alt='star-image' key={mainNum} />);
				for (var k = 0; k < leftoverNum - 1; k++) {
					stars.push(<img className="star" src={this.state.greyStar} alt='star-image' key={mainNum + 1 + k} />);
				}
			} else if (fractionNum === 0.75) {
				stars.push(<img className="star" src={this.state[0.75]} alt='star-image' key={mainNum} />);
				for (var k = 0; k < leftoverNum - 1; k++) {
					stars.push(<img className="star" src={this.state.greyStar} alt='star-image' key={mainNum + 1 + k} />);
				}
			} else {
				for (var k = 0; k < leftoverNum; k++) {
					stars.push(<img className="star" src={this.state.greyStar} alt='star-image' key={mainNum + 1 + k} />);
				}
			}
			return stars;
		}
	}

	render() {
		var stars = this.renderStars();
		return (
			<div className="container">
				<div className="filledStars" >{stars}</div>
			</div>
		);
	}
}

export default StarRating;




