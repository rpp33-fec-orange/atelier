import React from 'react';
import RatingsReviews from './RatingsReviews.jsx';

class ComfortSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comfort: props.comfort,
		}
	}

	render() {
		console.log('props in ComfortSlider are: ', JSON.stringify(this.props.comfort));
		// var comfort = this.props.comfort;
		// if (this.state.hasError) {
		// 	return <h1>Something went wrong.</h1>
		// }
		if (!this.state.comfort) {
			return (
				<div>
					Loading.....
				</div>
			)
		} else {
			var comfort = this.props.comfort.Comfort.value;
			var percentComfort = Math.round((comfort / 5) * 100);
			return (
				<div className="comfort-slider" id="comfort-slider">
					<p>Comfort</p>
					<div className="comfort-container">
						<div className="comfort-side"></div>
						<div className="comfort-middle"></div>
						<div className="comfort-side"></div>
						<div className="comfort-marker" style={{ marginLeft: `${percentComfort}%` }}>&#9660;</div>
					</div>
					<div className="comfort-explanation">
						<div className="side">Too Small</div>
						<div className="middle"></div>
						<div className="side">Perfect</div>
					</div>
				</div>
			);
		}
	}
}

export default ComfortSlider;