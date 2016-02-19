import React from 'react';
import { createRenderer } from 'react/lib/ReactTestUtils';
import chai from 'chai';

import Root from 'components/Root';

const expect = chai.expect;

describe('Root', () => {
  it('renders without problems', () => {
    const renderer = createRenderer();
    renderer.render(<Root/>);
    const actualElement = renderer.getRenderOutput();
    const expectedElement = (<div>I am root!</div>);
    expect(actualElement.props.children).equal(expectedElement.props.children);
  });
});
