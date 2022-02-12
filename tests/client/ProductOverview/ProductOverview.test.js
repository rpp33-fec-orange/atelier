import TestRenderer from 'react-test-renderer';
import React from 'react';
import ProductOverview from '../../../client/src/components/ProductOverview/ProductOverview.jsx';


describe('Product Overview component test', () => {
  const testRenderer = TestRenderer.create(<ProductOverview />);
  const testInstance = testRenderer.root;

  test('it should contain a h4 element with the text "Product Overview"', () => {
    expect(testInstance.findByProps({ id: "productOverview" }).children).toEqual(['Product Overview']);
  });
});