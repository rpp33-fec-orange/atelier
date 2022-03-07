import React from 'react';
import ReviewItem from './ReviewItem.jsx';

class ReviewList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reviewList: [],
			renderedReviews: [],
			holdingReviews: [],
			reviewsPerClick: 2,
			currentIndex: 0
		}
		this.mappingReviews = this.mappingReviews.bind(this);
		this.handleShowMoreReviews = this.handleShowMoreReviews.bind(this);
		// this.handleShowInitialReviews = this.handleShowInitialReviews.bind(this);
		this.slicedReviewList = this.slicedReviewList.bind(this);
	}

	componentDidMount() {
		console.log('finally, this.props.reviews is: ', this.props.reviews);
		var reviewList = this.props.reviews;
		this.setState({
			reviewList: reviewList,
		}, this.slicedReviewList);
		console.log('finally, this.state.reviewList is: ', this.state.reviewList);
	}

	mappingReviews() {
		console.log('props.reviews in Reviewlist: ', this.props.reviews);
		// var reviews = this.props.reviews;
		var reviews = this.state.holdingReviews;
		var renderedReviews = reviews.map((review) =>
			<ReviewItem key={review.review_id.toString()} review={review} />
		);
		this.setState({
			renderedReviews: renderedReviews
		});
	}

	slicedReviewList(callback) {
		var currentIndex = this.state.currentIndex;
		var reviewsPerClick = this.state.reviewsPerClick;
		console.log('finally, this.state.reviewList is: ', this.state.reviewList);
		const slicedReviewList = this.state.reviewList.slice(currentIndex, reviewsPerClick);
		console.log('finally, slicedReviewList is: ', slicedReviewList);
		this.setState({
			holdingReviews: slicedReviewList
		}, this.mappingReviews);

	}

	// handleShowInitialReviews() {
	// 	console.log('write logic for showing initial reviews here!');
	// 	this.slicedReviewList(function(){this.mappingReviews();});
	// 	// this.mappingReviews();
	// 	console.log('finally, this.state.renderedReviews are: ', this.state.renderedReviews);
	// }

	handleShowMoreReviews() {
		console.log('write logic for showing more reviews here!');
	}


	// needs an array to store initally only 2 reviews, then add 2 more each time the Add More button is clicked
	// When no more reviews can be added, such as when length of this.state.reviews is reached, hide the Add More button.

	render() {
		console.log('finally, this.state.holdingReviews in ReviewList is: ', this.state.holdingReviews);
		console.log('finally, this.state.reviewList under render() in ReviewList is: ', this.state.reviewList);

		console.log('finally, this.state.renderedReviews in ReviewList is: ', this.state.renderedReviews);
		return (
			<div id="list">
				{this.state.renderedReviews}
				<div className="five" id="buttons">
					<button onClick={this.handleShowMoreReviews}>MORE REVIEWS</button>
					{/* <button>ADD A REVIEW</button> */}
				</div>
			</div>
		)
	}
}

export default ReviewList;