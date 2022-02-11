import RatingsReviews from '../../../client/src/components/RatingsReviews/RatingsReviews.jsx';
import ProductOverview from '../../../client/src/components/ProductOverview/ProductOverview.jsx';
import QuestionsAnswers from '../../../client/src/components/QuestionsAnswers/QuestionsAnswers.jsx';
import RelatedItems from '../../../client/src/components/RelatedItems/RelatedItems.jsx';

test('it should contain a class component called App', () => {
	expect(testInstance.findByType(ProductOverview).props.foo).toBe('bar');
	expect(testInstance.findByType(QuestionsAnswers).props.foo).toBe('bar');
	expect(testInstance.findByType(RatingsReviews).props.foo).toBe('bar');
	expect(testInstance.findByType(RelatedItems).props.foo).toBe('bar');
});

