import React from 'react';

class SizeSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			size: 0,
			percentSize: 0
		};
		// this.setPercentSize = this.setPercentSize.bind(this);
	}

	// componentDidMount() {
	// 	this.setState({
	// 		size: this.props.size.Fit.value
	// 	}, this.setPercentSize);
	// }

	// setPercentSize() {
	// 	var percentSize = Math.round(this.props.size.Fit.value / 5) * 100;
	// 	this.setState({
	// 		percentSize: percentSize
	// 	});
	// }

	render() {
		var size = this.props.size.Fit.value;
		console.log('size in SizeSlider is: ', size);
		var percentSize = Math.round((size / 5) * 100);
		console.log('percentSize in SizeSlider is: ', percentSize);
		return (
			<div className="size-slider" id="size-slider">
				<p>Size</p>
				<div className="size-container">
					<div className="size-bar"></div>
					<div className="size-bar"></div>
					<div className="size-bar"></div>
					<div className="size-marker" style={{ marginLeft: `${percentSize}%` }}>&#9660;</div>
				</div>
				<div className="size-explanation">
					<div className="too-small">Too Small</div>
					<div className="perfect">Perfect</div>
					<div className="too-large">Too Large</div>
				</div>
			</div>

		);
	}

}

export default SizeSlider;