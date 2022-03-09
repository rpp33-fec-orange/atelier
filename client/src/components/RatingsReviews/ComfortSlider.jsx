	import React from 'react';
	import RatingsReviews from './RatingsReviews.jsx';

class ComfortSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comfort: props.comfort,
			hasError: false
		}
	}

	static getDerivedStateFromError(error) {
		return {hasError: true};
	}

	// componentDidMount() {
	// 	this.setState(
	// 		{
	// 			comfort: this.props.comfort
	// 		})
	// 		console.log('comfort state is: ', this.state.comfort);
	// }

	componentDidCatch(error, errorInfo) {
		logErrorToMyService(error, errorInfo);
	}

	render() {
		console.log('props in ComfortSlider are: ',  JSON.stringify(this.props.comfort));
		// var comfort = this.props.comfort;
		// if (this.state.hasError) {
		// 	return <h1>Something went wrong.</h1>
		// }
		if (!this.state.comfort){
			return (
				<div>
					Loading.....
				</div>
			)
		} else {
			var comfort = this.props.comfort.Comfort.value;
			return (
				<div className="comfort-slider" id="comfort-slider">
					<p>Comfort</p>
					{/* <div>comfort value: {comfort}</div> */}
					{/* <div>{JSON.stringify(comfort)}</div> */}
					<div>Poor     | {comfort}|     Perfect</div>
				</div>

			);
		}
	}
}

export default ComfortSlider;