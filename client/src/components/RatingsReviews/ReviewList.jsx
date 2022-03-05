// import React from 'react';
// import ReviewItem from './ReviewItem.jsx';

// const ReviewList = (props) => {
// 	console.log('props.reviews in Reviewlist: ', props.reviews);
// 	var reviews = props.reviews;
// 	var reviewList = reviews.map((review) =>
// 		<ReviewItem key={review.review_id.toString()} review={review} />
// 	);
// 	console.log('this is reviews: ', reviews);
// 	console.log('finally, reviewList is: ', reviewList);
// 	return (
// 		<div id="list">
// 			{reviewList}
// 			<div className="five" id="buttons">
// 				<button>MORE REVIEWS</button>
// 				<button>ADD A REVIEW</button>
// 			</div>
// 		</div>
// 	)
// }

// export default ReviewList;

import React from 'react';
import ReviewItem from './ReviewItem.jsx';

class ReviewList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reviewList: [],
			currentList: []
		}
		this.mappingReviews = this.mappingReviews.bind(this);
	}

	mappingReviews() {
		console.log('props.reviews in Reviewlist: ', this.props.reviews);
		var reviews = this.props.reviews;
		var reviewList = reviews.map((review) =>
			<ReviewItem key={review.review_id.toString()} review={review} />
		);
		this.setState({
      reviewList: reviewList
		});
		var currentList = [];
		console.log('this is reviews: ', reviews);
		console.log('finally, reviewList is: ', this.state.reviewList);
	}

	componentDidMount() {
		this.mappingReviews();
	}


  // needs an array to store initally only 2 reviews, then add 2 more each time the Add More button is clicked
	// When no more reviews can be added, such as when length of this.state.reviews is reached, hide the Add More button.

	render() {
		return (
			<div id="list">
				{this.state.reviewList}
				<div className="five" id="buttons">
					<button>MORE REVIEWS</button>
					{/* <button>ADD A REVIEW</button> */}
				</div>
			</div>
		)
	}
}

export default ReviewList;