import React from 'react';
import StarRating from './StarRating.jsx';

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
		this.setRatingSummary = this.setRatingSummary.bind(this);
		this.giveRating = this.giveRating.bind(this);
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
		var results = this.setRatingSummary();
		this.setState({
			one: results[1],
			two: results[2],
			three: results[3],
			four: results[4],
			five: results[5],
			ratingSummary: results[0]
		}, this.giveRating);
	}

	giveRating() {
		var ratingSummary = this.state.ratingSummary;
		this.props.handleGetRating(ratingSummary);
	}

	setRatingSummary() {
		console.log('this function will fill your stars!');
		// round stars number up to a quarter of a review point.
		// We have : 0.00, 0.25, 0.50, 0.75, and 1.00
		var results = [];
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
		results.push(ratingSummary, one, two, three, four, five);
		return results;
	}

	render() {
		return (
			<div className="one" id="one">
				<h1 className="rating-summary">{this.state.ratingSummary}</h1>
				<StarRating num={this.state.ratingSummary} handleRating={this.props.handleRating} />
				<div>{this.state.percentage}% of reviews recommend this product</div>
			</div>

		);
	}

}

export default StarNumber;