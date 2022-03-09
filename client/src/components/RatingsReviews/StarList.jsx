import React from 'react';

class StarList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ratings: props.ratings,
			one: 0,
			two: 0,
			three: 0,
			four: 0,
			five: 0,
			percentOne: 0,
			percentTwo: 0,
			percentThree: 0,
			percentFour: 0,
			percentFive: 0,
		};
		this.calPercentWidth = this.calPercentWidth.bind(this);
	}

	componentDidMount() {
		var one = (this.props.ratings[1] === undefined) ? 0 : this.props.ratings[1];
		var two = (this.props.ratings[2] === undefined) ? 0 : this.props.ratings[2];
		var three = (this.props.ratings[3] === undefined) ? 0 : this.props.ratings[3];
		var four = (this.props.ratings[4] === undefined) ? 0 : this.props.ratings[4];
		var five = (this.props.ratings[5] === undefined) ? 0 : this.props.ratings[5];

		this.setState({
			one: one,
			two: two,
			three: three,
			four: four,
			five: five
		}, this.calPercentWidth);
	}

	calPercentWidth() {
		var one = parseInt(this.state.one);
		var two = parseInt(this.state.two);
		var three = parseInt(this.state.three);
		var four = parseInt(this.state.four);
		var five = parseInt(this.state.five);
		var sum = one + two + three + four + five;
		var percentOne = Math.round((one / sum) * 100);
		var percentTwo = Math.round((two / sum) * 100);
		var percentThree = Math.round((three / sum) * 100);
		var percentFour = Math.round((four / sum) * 100);
		var percentFive = Math.round((five / sum) * 100);
		this.setState({
			percentOne: percentOne,
			percentTwo: percentTwo,
			percentThree: percentThree,
			percentFour: percentFour,
			percentFive: percentFive
		});
	}

	render() {

		return (
			<div className="star-list" id="star-list">
				<table>
					<tbody>
						<tr>
							<td>5 stars:</td>
							<td>
								<div className="progress-bar">
									<div style={{ width: `${this.state.percentFive}%` }}>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>4 stars:</td>
							<td>
								<div className="progress-bar">
									<div style={{ width: `${this.state.percentFour}%` }}>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>3 stars:</td>
							<td>
								<div className="progress-bar">
									<div style={{ width: `${this.state.percentThree}%` }}>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>2 stars:</td>
							<td>
								<div className="progress-bar">
									<div style={{ width: `${this.state.percentTwo}%` }}>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>1 star:</td>
							<td>
								<div className="progress-bar">
									<div style={{ width: `${this.state.percentOne}%` }}>
									</div>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default StarList;