import React from 'react';
import ReviewItem from './ReviewItem.jsx';
import Dashboard from './Dashboard.jsx';

class ReviewList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reviewList: [],
			renderedReviews: [],
			holdingReviews: [],
			reviewsPerClick: 2,
			currentIndex: 0,
			showMore: 'more-reviews-btn'
		}
		this.mappingReviews = this.mappingReviews.bind(this);
		this.handleShowMoreReviews = this.handleShowMoreReviews.bind(this);
		this.slicedReviewList = this.slicedReviewList.bind(this);
		this.setShowMore = this.setShowMore.bind(this);
	}

	componentDidMount() {
		// console.log('finally, this.props.reviews is: ', this.props.reviews);
		var reviewList = this.props.reviews;
		this.setState({
			reviewList: reviewList,
		}, this.slicedReviewList);
		// console.log('finally, this.state.reviewList is: ', this.state.reviewList);
	}

	componentDidUpdate(prevProps) {
		if (this.props.reviews !== prevProps.reviews) {
			var reviewList = this.props.reviews;
			this.setState({
				reviewList: reviewList,
			}, this.slicedReviewList);
		}
	}

	mappingReviews() {
		// console.log('props.reviews in Reviewlist: ', this.props.reviews);
		var reviews = this.state.holdingReviews;
		var renderedReviews = reviews.map((review) =>
			<ReviewItem key={review.review_id.toString()} review={review} onMarkedHelpful={this.props.onMarkedHelpful} onMarkedReported={this.props.onMarkedReported} />
		);
		this.setState({
			renderedReviews: renderedReviews
		}, this.setShowMore);
	}

	setShowMore() {
		var index = this.state.reviewsPerClick;
		var length = this.state.reviewList.length;
		if (index >= length) {
			this.setState({
				showMore: 'more-reviews-btn-hide'
			});
		}
	}

	slicedReviewList() {
		var currentIndex = this.state.currentIndex;
		var reviewsPerClick = this.state.reviewsPerClick;
		const slicedReviewList = this.state.reviewList.slice(currentIndex, reviewsPerClick);
		this.setState({
			holdingReviews: slicedReviewList
		}, this.mappingReviews);

	}

	handleShowMoreReviews() {
		// console.log('write logic for showing more reviews here!');
		var currentReviewsPerClick = this.state.reviewsPerClick;
		currentReviewsPerClick += 2;
		this.setState({
			reviewsPerClick: currentReviewsPerClick
		}, this.slicedReviewList);
	}


	// needs an array to store initally only 2 reviews, then add 2 more each time the Add More button is clicked
	// When no more reviews can be added, such as when length of this.state.reviews is reached, hide the Add More button.

	render() {
		var showMore = this.state.showMore;
		return (
			<div id="review-list-container">
				<div className="scroller">
					{this.state.renderedReviews}
				</div>
				<div className="buttons" id="buttons">
					<button className={showMore} onClick={this.handleShowMoreReviews}>MORE REVIEWS</button>
					<Dashboard />
				</div>
			</div>
		)
	}
}

export default ReviewList;