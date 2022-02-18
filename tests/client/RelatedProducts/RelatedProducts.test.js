import React from 'react';
import TestRenderer from 'react-test-renderer';
import RelatedProducts from '../../../client/src/components/RelatedProducts/index.jsx';
import {render, screen} from '@testing-library/react'
import App from '../../../client/src/App.jsx';
import { shallow } from 'enzyme';
import RelatedProductsRow from '../../../client/src/components/RelatedProducts/RelatedProdcutsRow.jsx';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import YourOutfitRow from '../../../client/src/components/RelatedProducts/YourOutfitRow.jsx';

import { mount } from 'enzyme';
import { spy } from 'sinon';



Enzyme.configure({ adapter: new Adapter() });


// describe('Initial Test Suite', () => {
//   const testRenderer = TestRenderer.create(<RelatedProducts />);
//   const testInstance = testRenderer.root;

//   test('it should contain a DOM element with the text "Related Products"', () => {
//     expect(testInstance.findByProps({id: "related-products"}).children).toEqual(['Related Products']);
//   });

// });

describe ('Related Products', () => {

  it('should check that Related Products Row component exists', () => {
    const component = shallow (<RelatedProductsRow/>);

    expect(component.exists()).toBe(true);

  });

  it('should check that Your Outfit Row component exists', () => {
    const component = shallow (<YourOutfitRow/>);

    expect(component.exists()).toBe(true);
  });

  // it('should check that Child components exists', () => {
  //   const component = shallow (<RelatedProducts/>);

  //   // console.log(component.find('.related-products-row').children())

  //   expect(component.find('.related-products-and-items').closest('.related-products-row').children()).to.have.lengthOf(2);
  // });

  spy(RelatedProducts.prototype, 'componentDidMount');

  it('calls componentDidMount', () => {
    const component = mount(<App />);
    expect(RelatedProducts.prototype.componentDidMount).to.have.property('callCount', 1);
  });

})

