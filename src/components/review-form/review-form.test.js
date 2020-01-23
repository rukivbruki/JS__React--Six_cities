import React from 'react';
import renderer from 'react-test-renderer';
import {ReviewForm} from './review-form.jsx';

jest.mock(`redux-form/lib/Field`, () => `field`);

it(`ReviewForm snapshot`, () => {
  const tree = renderer.create(<ReviewForm
    formData={{}}
    handleSubmit={jest.fn()}
    onSend={jest.fn()}
    placeId={0}
    invalid={false}
    sending={false}
    sendingError={``}
  />).toJSON();
  expect(tree).toMatchSnapshot();
});
