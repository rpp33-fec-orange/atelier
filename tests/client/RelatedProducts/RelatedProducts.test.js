import React from 'react';
import TestRenderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {render, screen} from '@testing-library/react'
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import App from '../../../client/src/App.jsx';
import RelatedProductsRow from '../../../client/src/components/RelatedProducts/RelatedProductsRow.jsx';
import YourOutfitRow from '../../../client/src/components/RelatedProducts/YourOutfitRow.jsx';
import RelatedProducts from '../../../client/src/components/RelatedProducts/index.jsx';
import ProductCard from '../../../client/src/components/RelatedProducts/ProductCard.jsx';
import RelatedProductModal from '../../../client/src/components/RelatedProducts/RelatedProductModal.jsx';
import YourOutfitCard from '../../../client/src/components/RelatedProducts/YourOutfitCard.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe ('Related Products', () => {

  it('should check that Parent App component exists', () => {
    const component = shallow (<App/>);
    expect(component.exists()).toBe(true);
  });

  it('RelatedProducts should render and match snapshot', () => {
    const tree = TestRenderer.create(<RelatedProducts />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should check that Related Products Row component exists', () => {
    const component = shallow (<RelatedProductsRow/>);
    expect(component.exists()).toBe(true);
  });

  it('should check that Your Outfit Row component exists', () => {
    const component = shallow (<YourOutfitRow/>);
    expect(component.exists()).toBe(true);
  });

  it('should check that Product card exists', () => {
    const component = shallow (<ProductCard/>);
    expect(component.exists()).toBe(true);
  });

  it('should check that Your Outfit Card exists', () => {
    const component = shallow (<YourOutfitCard/>);
    expect(component.exists()).toBe(true);
  });

  it('should check that Related Product Modal exists', () => {
    const component = shallow (<RelatedProductModal/>);
    expect(component.exists()).toBe(true);
  });

})

