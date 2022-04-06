import React from 'react';
import RatingsReviews from './RatingsReviews.jsx';

class ProductBreakdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			size: null,
			width: null,
			comfort: null,
			quality: null,
			length: null,
			fit: null,
			percentSize: null,
			percentWidth: null,
			percentComfort: null,
			percentQuality: null,
			percentLength: null,
			percentFit: null

		};
	}

	breakDown() {
		var size = null;
		var width = null;
		var comfort = null;
		var quality = null;
		var length = null;
		var fit = null;
		var percentSize = null;
		var percentWidth = null;
		var percentComfort = null;
		var percentQuality = null;
		var percentLength = null;
		var percentFit = null;

		if (this.props.meta_characteristics.Size != undefined) {
			if (this.props.meta_characteristics.Width.value != undefined) {
				size = (this.props.meta_characteristics.Size.value === undefined) ? '0' : this.props.meta_characteristics.Size.value;
				percentSize = Math.round((size / 5) * 100);
			}
		}
		if (this.props.meta_characteristics.Width != undefined) {
			if (this.props.meta_characteristics.Width.value != undefined) {
				width = (this.props.meta_characteristics.Width.value === undefined) ? '0' : this.props.meta_characteristics.Width.value;
				percentWidth = Math.round((width / 5) * 100);
			}

		}
		if (this.props.meta_characteristics.Comfort != undefined) {
			if (this.props.meta_characteristics.Comfort.value != undefined) {
				comfort = (this.props.meta_characteristics.Comfort.value === undefined) ? '0' : this.props.meta_characteristics.Comfort.value;
				percentComfort = Math.round((comfort / 5) * 100);
			}
		}
		if (this.props.meta_characteristics.Quality != undefined) {
			if (this.props.meta_characteristics.Quality.value != undefined) {
				quality = (this.props.meta_characteristics.Quality.value === undefined) ? '0' : this.props.meta_characteristics.Quality.value;
				percentQuality = Math.round((quality / 5) * 100);
			}
		}
		if (this.props.meta_characteristics.Length != undefined) {
			if (this.props.meta_characteristics.Length.value != undefined) {
				length = (this.props.meta_characteristics.Length.value === undefined) ? '0' : this.props.meta_characteristics.Length.value;
				percentLength = Math.round((length / 5) * 100);
			}
		}
		if (this.props.meta_characteristics.Fit != undefined) {
			if (this.props.meta_characteristics.Fit.value != undefined) {
				fit = (this.props.meta_characteristics.Fit.value === undefined) ? '0' : this.props.meta_characteristics.Fit.value;
				percentFit = Math.round((fit / 5) * 100);
			}
		}
		this.setState({
			size: size,
			width: width,
			comfort: comfort,
			quality: quality,
			length: length,
			fit: fit,
			percentSize: percentSize,
			percentWidth: percentWidth,
			percentComfort: percentComfort,
			percentQuality: percentQuality,
			percentLength: percentLength,
			percentFit: percentFit
		})
	}

	componentDidMount() {
		this.breakDown();
	}

	componentDidUpdate(prevProps) {
		if (this.props.meta_characteristics != prevProps.meta_characteristics) {
			this.breakDown();
		}
	}

	render() {
		let sizeRender;
		let widthRender;
		let comfortRender;
		let qualityRender;
		let lengthRender;
		let fitRender;

		if (this.state.size != null) {
			sizeRender =
				<div>Size
					<div className="size-container">
						<div className="size-side"></div>
						<div className="size-marker" style={{ marginLeft: `${this.state.percentSize}%` }}>&#9660;</div>
					</div>
					<div className="size-explanation">
						<div className="side">Too Small</div>
						<div className="middle">Perfect</div>
						<div className="side">Too Wide</div>
					</div>
				</div>
		}
		if (this.state.width != null) {
			widthRender =
				<div>Width
					<div className="width-container">
						<div className="width-side"></div>
						<div className="width-marker" style={{ marginLeft: `${this.state.percentWidth}%` }}>&#9660;</div>
					</div>
					<div className="width-explanation">
						<div className="side">Too Narrow</div>
						<div className="middle">Perfect</div>
						<div className="side">Too Wide</div>
					</div>
				</div>
		}
		if (this.state.comfort != null) {
			comfortRender =
				<div>Comfort
					<div className="comfort-container">
						<div className="comfort-side"></div>
						<div className="comfort-marker" style={{ marginLeft: `${this.state.percentComfort}%` }}>&#9660;</div>
					</div>
					<div className="comfort-explanation">
						<div className="side">Uncomfortable</div>
						<div className="middle">Ok</div>
						<div className="side">Perfect</div>
					</div>
				</div>
		}
		if (this.state.quality != null) {
			qualityRender =
				<div>Quality
					<div className="quality-container">
						<div className="quality-side"></div>
						<div className="quality-marker" style={{ marginLeft: `${this.state.percentQuality}%` }}>&#9660;</div>
					</div>
					<div className="quality-explanation">
						<div className="side">Poor</div>
						<div className="middle">What I Expected</div>
						<div className="side">Perfect</div>
					</div>
				</div>
		}
		if (this.state.length != null) {
			lengthRender =
				<div>Length
					<div className="length-container">
						<div className="length-side"></div>
						<div className="length-marker" style={{ marginLeft: `${this.state.percentLength}%` }}>&#9660;</div>
					</div>
					<div className="length-explanation">
						<div className="side">Runs Short</div>
						<div className="middle">Perfect</div>
						<div className="side">Runs Long</div>
					</div>
				</div>
		}
		if (this.state.fit != null) {
			fitRender =
				<div>Fit
					<div className="fit-container">
						<div className="fit-side"></div>
						<div className="fit-marker" style={{ marginLeft: `${this.state.percentFit}%` }}>&#9660;</div>
					</div>
					<div className="fit-explanation">
						<div className="side">Runs Tight</div>
						<div className="middle">Perfect</div>
						<div className="side">Runs Long</div>
					</div>
				</div>
		}
		return (
			<div>
				{sizeRender}
				{widthRender}
				{comfortRender}
				{qualityRender}
				{lengthRender}
				{fitRender}
			</div>
		);
	}
}

export default ProductBreakdown;