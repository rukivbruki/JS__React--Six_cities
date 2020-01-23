import React from "react";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Header} from "./header";

configure({adapter: new Adapter()});

describe(`Header component should render is correctly`, () => {
  it(`if user require authorization`, () => {
    const header = shallow(<Header
      isAuthorizationRequired={true}
      userData={{}}
    />);

    expect(header).toMatchSnapshot();
  });

  it(`if user already authorization`, () => {
    const header = shallow(<Header
      isAuthorizationRequired={false}
      userData={{
        avatar: `static/avatar/10.jpg`,
        email: `Shramko.web@yahoo.com`,
        id: 13,
        isPro: false,
        name: `Shramko.web`,
      }}
    />);

    expect(header).toMatchSnapshot();
  });
});
