import React from 'react';
import TestRenderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow } from 'enzyme';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import ProductOverview from '../../../client/src/components/ProductOverview/index.jsx';
import Styles from '../../../client/src/components/ProductOverview/Styles.jsx';
import TopBar from '../../../client/src/components/ProductOverview/TopBar.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('ProductOverview component tests', () => {
  const testRenderer = TestRenderer.create(<ProductOverview />);
  const testInstance = testRenderer.root;

  test('it should contain a h4 element with the text "⇆ Loading..." in index.jsx', () => {
    expect(testInstance.findByProps({ id: "loading" }).children).toEqual(['⇆ Loading...']);
  });

  test('it should render loading page on index.jsx on start up', () => {
    render(<ProductOverview />);
    const element = screen.getByTestId('loading');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('⇆ Loading...');
  });

  test('it should render logo at TopBar component startup', () => {
    render(<TopBar />);
    const element = screen.getByTestId('logo');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Atelier');
  });

  test('it should match snapshot ', () => {
    const tree = TestRenderer.create(<ProductOverview />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("it should render index.jsx component", () => {
    const component = shallow(<ProductOverview />);
    expect(component.exists()).toBe(true);
  });

  it("it should render Styles component", () => {
    const component = shallow(<Styles />);
    expect(component.exists()).toBe(true);
  });

  it("it should render TopBar component", () => {
    const component = shallow(<TopBar />);
    expect(component.exists()).toBe(true);
  });
});