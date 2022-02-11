import React from 'react';
import TestRenderer from 'react-test-renderer';
import RelatedItems from '../../../client/src/components/RelatedItems/RelatedItems.jsx';
import {screen, getByLabelText} from '@testing-library/dom'
import App from '../../../client/src/App.jsx';

// const inputNode1 = screen.getByLabelText('Username')

describe('Initial Test Suite', () => {
  const testRenderer = TestRenderer.create(<RelatedItems />);
  const testInstance = testRenderer.root;

  test('it should contain a DOM element with the text "Related Items and Comparison"', () => {
    expect(testInstance.findByProps({id: "related-items"}).children).toEqual(['Related Items and Comparison']);
  });

});