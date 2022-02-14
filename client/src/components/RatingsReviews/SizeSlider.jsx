import React from 'react';

class SizeSlider extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="wrapper">
				<p>Size</p>
				<div>Too Small     |     Perfect      |      Too Large</div>
			</div>

		);
	}

}

export default SizeSlider;