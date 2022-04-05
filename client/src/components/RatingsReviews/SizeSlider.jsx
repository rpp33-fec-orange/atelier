import React from 'react';

class SizeSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			size: 0,
			percentSize: 0
		};
		this.calPercentSize = this.calPercentSize.bind(this);
	}

	componentDidMount() {
		var size = this.props.size.Fit.value;
		this.setState({
			size: size
		}, () => {
			this.calPercentSize();
		});
	}

  calPercentSize() {
		var size = this.state.size;
		var percentSize = Math.round((size / 5) * 100);
		this.setState({
			percentSize: percentSize
		});
	}

	render() {

		var size = this.state.size;
		var percentSize = this.state.percentSize;
		if (!size) {
			return (
				<div>
					Loading.....
				</div>
			)
		}
		return (
			// <div className="size-slider" id="size-slider">
			// 	<p>Size</p>
			// 	<div className="size-container">
			// 		<div className="size-bar"></div>
			// 		<div className="size-marker" style={{ marginLeft: `${percentSize}%` }}>&#9660;</div>
			// 	</div>
			// 	<div className="size-explanation">
			// 		<div className="too-small">Too Small</div>
			// 		<div className="perfect">Perfect</div>
			// 		<div className="too-large">Too Large</div>
			// 	</div>
			// </div>
<div>Hola</div>
		);
	}

}

export default SizeSlider;