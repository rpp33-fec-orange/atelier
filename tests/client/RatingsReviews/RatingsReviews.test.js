import RatingsReviews from '../../../client/src/components/RatingsReviews/RatingsReviews.jsx';
import React from 'react';
import TestRenderer from 'react-test-renderer';


describe('Initial RatingsnReviews Test Suite', () => {
	const testRenderer = TestRenderer.create(<RatingsReviews />);
	const testInstance = testRenderer.root;

	test('it should contain a DOM element with the text "Ratings and Reviews', () => {
		expect(testInstance.findByProps({id: "ratings-reviews"}).children).toEqual(['Ratings and Reviews']);
	});

});


