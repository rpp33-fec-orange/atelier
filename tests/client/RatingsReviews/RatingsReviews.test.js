import React from 'react';
import TestRenderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
import '@testing-library/jest-dom'
import RatingsReviews from '../../../client/src/components/RatingsReviews/RatingsReviews.jsx';
import Dashboard from '../../../client/src/components/RatingsReviews/Dashboard.jsx';
import Modal from '../../../client/src/components/RatingsReviews/Modal.jsx';
import ProductBreakdown from '../../../client/src/components/RatingsReviews/ProductBreakdown.jsx';
import ReviewItem from '../../../client/src/components/RatingsReviews/ReviewItem.jsx';
import ReviewList from '../../../client/src/components/RatingsReviews/ReviewList.jsx';
import StarItem from '../../../client/src/components/RatingsReviews/StarItem.jsx';
import StarList from '../../../client/src/components/RatingsReviews/StarList.jsx';
import StarNumber from '../../../client/src/components/RatingsReviews/StarNumber.jsx';
import StarRating from '../../../client/src/components/RatingsReviews/StarRating.jsx';







describe('RatingsReviews component tests', () => {
	const testRenderer = TestRenderer.create(<RatingsReviews />);
	const testInstance = testRenderer.root;

	test('it should contain an h3 element with the text "RATINGS AND REVIEWS', () => {
		expect(testInstance.findByProps("div").children).toEqual(['RATINGS AND REVIEWS']);
	})

	// it("renders RatingsReviews header", () => {
	// 	const wrapper = shallow(<RatingsReviews />);
	// 	const ratingsReviews = <h3>RATINGS AND REVIEWS</h3>
	// 	expect(wrapper.contains(ratingsReviews)).toEqual(true);
	// })

	test('Snapshot should match!', () => {
		let tree = testRenderer.toJSON();
		expect(tree).toMatchSnapshot();
	})

	it('it should render StarNumber.jsx component', () => {
		const component = shallow(<StarNumber />);
		expect(component.exists()).toEqual(true);
	});

	it('it should render StarList.jsx component', () => {
		const component = shallow(<StarList />);
		expect(component.exists()).toEqual(true);
	});

	it('it should render StarItem.jsx component', () => {
		const component = shallow(<StarItem />);
		expect(component.exists()).toEqual(true);
	});

	it('it should render StarRating.jsx component', () => {
		const component = shallow(<StarRating />);
		expect(component.exists()).toEqual(true);
	});

	it('it should render ReviewList.jsx component', () => {
		const component = shallow(<ReviewList />);
		expect(component.exists()).toEqual(true);
	});

	it('it should render ReviewItem.jsx component', () => {
		const component = shallow(<ReviewItem />);
		expect(component.exists()).toEqual(true);
	});

	it('it should render ProductBreakdown.jsx component', () => {
		const component = shallow(<ProductBreakdown />);
		expect(component.exists()).toEqual(true);
	})
})

