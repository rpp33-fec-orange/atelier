import React from 'react';

class StarNumber extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			percentage: 0
		}
		this.percentRecommended = this.percentRecommended.bind(this);
	}

	percentRecommended() {
		var recommended = this.props.recommended.true;
		var notRecommended = this.props.recommended.false;
		var result = (recommended * 100) / (recommended + notRecommended);
		return result;
	}

	componentDidMount() {
		var percentage = this.percentRecommended();
		this.setState({
      percentage: percentage
		});
	}
	render() {
		return (
			<div className="one" id="one">
				<h1>3.5</h1>
				<div>&#9733;&#9733;&#9733;&#9734;&#9734;</div>
				<div>Number of recommended: {this.props.recommended.true}</div>
				<div>{this.state.percentage} of reviews recommend this product</div>
			</div>

		);
	}

}

export default StarNumber;