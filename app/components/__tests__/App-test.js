/* global describe it */
import React from 'react';
import { createRenderer } from 'react/lib/ReactTestUtils';
import chai from 'chai';

import App from 'components/App/App';

const expect = chai.expect;

describe('App', () => {
  it('renders', () => {
    const renderer = createRenderer();
    renderer.render(<App/>);
    const result = renderer.getRenderOutput();
    expect(result.type).equal('div');
    expect(result.props.children).equal('App');
  });
});
