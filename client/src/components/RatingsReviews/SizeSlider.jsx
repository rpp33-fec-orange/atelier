import React from 'react';

class SizeSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			size: props.size
		}
	}

	render() {
		var size = this.props.size.Fit.value;
		return (
			<div className="three" id="three">
				<p>Size</p>
				<div>Too Small     |     {size}      |      Too Large</div>
			</div>

		);
	}

}

export default SizeSlider;