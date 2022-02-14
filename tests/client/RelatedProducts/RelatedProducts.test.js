import React from 'react';
import TestRenderer from 'react-test-renderer';
import RelatedProducts from '../../../client/src/components/RelatedProducts/RelatedProducts.jsx';
import {screen, getByLabelText} from '@testing-library/dom'
import App from '../../../client/src/App.jsx';

// const inputNode1 = screen.getByLabelText('Username')

describe('Initial Test Suite', () => {
  const testRenderer = TestRenderer.create(<RelatedProducts />);
  const testInstance = testRenderer.root;

  test('it should contain a DOM element with the text "Related Products"', () => {
    expect(testInstance.findByProps({id: "related-products"}).children).toEqual(['Related Products']);
  });

});