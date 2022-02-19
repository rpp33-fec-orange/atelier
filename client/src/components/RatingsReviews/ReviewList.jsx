import React from 'react';
import ReviewItem from './ReviewItem.jsx';

const ReviewList = (props) => {
	console.log('props.reviews in Reviewlist: ', props.reviews);
	var reviews = props.reviews;
	var reviewList = reviews.map((review) =>
		<ReviewItem key={review.review_id.toString()} review={review} />
	);
	console.log('this is reviews: ', reviews);
	console.log('finally, reviewList is: ', reviewList);
	return (
		<div id="list">
			{reviewList}
			<div className="five" id="buttons">
				<button>MORE REVIEWS</button>
				<button>ADD A REVIEW</button>
			</div>
		</div>
	)
}

export default ReviewList;