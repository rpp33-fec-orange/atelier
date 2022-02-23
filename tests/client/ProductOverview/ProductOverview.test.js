import React from 'react';
import TestRenderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow } from 'enzyme';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import ProductOverview from '../../../client/src/components/ProductOverview/index.jsx';
import Descriptions from '../../../client/src/components/ProductOverview/Descriptions.jsx';
import Styles from '../../../client/src/components/ProductOverview/Styles.jsx';
import TopBar from '../../../client/src/components/ProductOverview/TopBar.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('ProductOverview component tests', () => {
  const testRenderer = TestRenderer.create(<ProductOverview />);
  const testInstance = TestRenderer.root;

  test('it should contain a h4 element with the text "⇆ Loading..." in index.jsx', () => {
    expect(testInstance.findByProps({ id: "loading" }).children).toEqual(['⇆ Loading...']);
  });

  test('render loading page on index.jsx on start up', () => {
    render(<ProductOverview />);
    const element = screen.getByTestId('loading');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('⇆ Loading...');
  });

  test('render logo at TopBar component startup', () => {
    render(<TopBar />);
    const element = screen.getByTestId('logo');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Atelier');
  });

  test('matches snapshot ', () => {
    const tree = TestRenderer.create(<ProductOverview />).toJSON();
    expect(tree).toMatchSnapshot();
    console.log(tree);
  });

  it("should render my component", () => {
    const component = shallow(<ProductOverview />);
    expect(component.exists()).toBe(true);
  });

  it("should render my component", () => {
    const component = shallow(<Descriptions />);
    expect(component.exists()).toBe(true);
  });

  it("should render my component", () => {
    const component = shallow(<Styles />);
    expect(component.exists()).toBe(true);
  });

  it("should render my component", () => {
    const component = shallow(<TopBar />);
    expect(component.exists()).toBe(true);
  });
});