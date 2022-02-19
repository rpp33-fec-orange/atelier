import React from 'react';
import ReviewItem from './ReviewItem.jsx';

const ReviewList = (props) => {
	console.log('props.reviews in Reviewlist: ', props.reviews);
	var reviews = props.reviews;
	var reviewList = reviews.map((review) =>
		<ReviewItem key={review.review_id.toString()} review={review} />
	);
	console.log('this is reviews: ', reviews);
	// console.log('type of reviews: ', typeof reviews);
	// var reviewList = [];
	// // for (var i = 0; i < reviews; i++) {
	// reviews.forEach(element =>
	// 	reviewList.push(<ReviewItem review={element} />)
	// 		);
console.log('finally, reviewList is: ', reviewList);
return (
	<div>
		{reviewList}
	</div>
)
	}

export default ReviewList;