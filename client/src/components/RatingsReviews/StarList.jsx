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
			five: 0
		}
	}

  componentDidMount() {
		console.log('this is ratings: ', this.props.ratings);
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
		});
	}

	render() {
		console.log('one is: ', this.state.one);
		console.log('two is: ', this.state.two);
		console.log('three is: ', this.state.three);
		console.log('four is: ', this.state.four);
		console.log('five is: ', this.state.five);

		return (
			<div className="star-list" id="star-list">
				<table>
					<tbody>
						<tr>
							<td>5 stars:</td>
							<td>
								<div>
									{this.state.five} votes
								</div>
							</td>
						</tr>
						<tr>
							<td>4 stars:</td>
							<td>
								<div>
								{this.state.four} votes
								</div>
							</td>
						</tr>
						<tr>
							<td>3 stars:</td>
							<td>
								<div>
								{this.state.three} votes
								</div>
							</td>
						</tr>
						<tr>
							<td>2 stars:</td>
							<td>
								<div>
								{this.state.two} votes
								</div>
							</td>
						</tr>
						<tr>
							<td>1 star:</td>
							<td>
								<div>
								{this.state.one} votes
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