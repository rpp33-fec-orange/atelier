import React from 'react';

class StarNumber extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			percentage: 0,
			ratingSummary: 0,
			ratings: props.ratings,
			one: 0,
			two: 0,
			three: 0,
			four: 0,
			five: 0
		};
		this.percentRecommended = this.percentRecommended.bind(this);
		// this.ratingSummary = this.ratingSummary.bind(this);
	}

	percentRecommended() {
		var recommended = parseInt(this.props.recommended.true);
		console.log('recommended is: ', recommended);
		var notRecommended = parseInt(this.props.recommended.false);
		console.log('notRecommended is: ', notRecommended);
		console.log('sum is: ', recommended + notRecommended);
		var result = (recommended * 100) / (recommended + notRecommended);

		return Math.round(result * 100) / 100;
	}

	componentDidMount() {
		var percentage = this.percentRecommended();
		this.setState({
			percentage: percentage
		});
		console.log('this is ratings inside StarNumber: ', this.props.ratings);
		var one = parseInt((this.props.ratings[1] === undefined) ? 0 : this.props.ratings[1]);
		var two = parseInt((this.props.ratings[2] === undefined) ? 0 : this.props.ratings[2]);
		var three = parseInt((this.props.ratings[3] === undefined) ? 0 : this.props.ratings[3]);
		var four = parseInt((this.props.ratings[4] === undefined) ? 0 : this.props.ratings[4]);
		var five = parseInt((this.props.ratings[5] === undefined) ? 0 : this.props.ratings[5]);
		console.log('one in StarNumber is: ', one);
		console.log('two in StarNumber is: ', two);
		console.log('three in StarNumber is: ', three);
		console.log('four in StarNumber is: ', four);
		console.log('five in StarNumber is: ', five);
		var sum = one + two + three + four + five;
		var ratingSummary = (1 * one + 2 * two + 3 * three + 4 * four + 5 * five) / sum;
		ratingSummary = Math.round(ratingSummary * 100) / 100;
		this.setState({
			one: one,
			two: two,
			three: three,
			four: four,
			five: five,
			ratingSummary: ratingSummary
		});
	}

	render() {
		return (
			<div className="one" id="one">
				<h1>{this.state.ratingSummary}</h1>
				<div>&#9733;&#9733;&#9733;&#9734;&#9734;</div>
				<div>{this.state.percentage}% of reviews recommend this product</div>
			</div>

		);
	}

}

export default StarNumber;