import TestRenderer from 'react-test-renderer';
import React from 'react';
import App from '../../client/src/App.jsx';
import ProductOverview from '../../client/src/components/ProductOverview/ProductOverview.jsx';
import QuestionsAnswers from '../../client/src/components/QuestionsAnswers/QuestionsAnswers.jsx';
import RatingsReviews from '../../client/src/components/RatingsReviews/RatingsReviews.jsx';
import RelatedItems from '../../client/src/components/RelatedItems/RelatedItems.jsx';

describe.only('Main component test', () => {
  const testRenderer = TestRenderer.create(<App />);
  const testInstance = testRenderer.root;

  test('it should contain a class subcomponent called RelatedItems', () => {
    expect(testInstance.findByType(ProductOverview)).toBeDefined();
    expect(testInstance.findByType(QuestionsAnswers)).toBeDefined();
    expect(testInstance.findByType(RatingsReviews)).toBeDefined();
    expect(testInstance.findByType(RelatedItems)).toBeDefined();
  });

  it('it should teach us math', function () {
    const received = 4;
    const expected = 2 + 2;
    expect(received).toEqual(expected);
  });
});