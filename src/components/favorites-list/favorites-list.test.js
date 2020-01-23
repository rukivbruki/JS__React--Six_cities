import React from "react";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {FavoritesList} from "./favorites-list";

configure({adapter: new Adapter()});

it(`FavoritesList is renders correctly`, () => {
  const favorites = shallow(
      <FavoritesList
        history={{}}
        onChangeCity={jest.fn()}
        cities={[`Amsterdam`]}
        favorites={{'Amsterdam': []}}
      />
  );
  expect(favorites).toMatchSnapshot();
});
