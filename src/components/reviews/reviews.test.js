import React from 'react';
import renderer from 'react-test-renderer';
import {Reviews} from './reviews.jsx';
import loadedComments from '../../mocks/mock-comments';

jest.mock(`../../utils/set-body-root-class`);

it(`Reviews snapshot`, () => {
  const tree = renderer.create(<Reviews
    load={jest.fn()}
    placeId={0}
    commentsData={loadedComments}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});


