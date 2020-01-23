import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Reviews} from "./reviews";
import mockComments from '../../mocks/mock-comments';

configure({adapter: new Adapter()});

describe(`Reviews correctly work`, () => {
  it(`When mount reviews call loadComments`, () => {
    const mockLoadComments = jest.fn();
    const mockPlaceId = 1;
    mount(<Reviews
      load={mockLoadComments}
      placeId={mockPlaceId}
      commentsData={mockComments}
    />);
    expect(mockLoadComments).toHaveBeenCalledTimes(1);
    expect(mockLoadComments.mock.calls[0][0]).toBe(mockPlaceId);
  });
});
