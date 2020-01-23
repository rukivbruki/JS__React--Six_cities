import React from "react";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {FavoritesPage} from "./favorites-page.jsx";

configure({adapter: new Adapter()});

jest.mock(`../page-layout/page-layout.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../header/header.jsx`, () => jest.fn().mockReturnValue(null));

describe(`FavoritesPage should correctly render`, () => {
  it(`FavoritesPage is renders correctly`, () => {
    const favorites = shallow(
        <FavoritesPage
          cities={[`Amsterdam`]}
          favorites={{}}
          onLoadFavorites={jest.fn()}
        />
    );

    expect(favorites).toMatchSnapshot();
  });

  it(`FavoritesPage empty page renders correctly`, () => {
    const favorites = shallow(
        <FavoritesPage
          cities={[]}
          favorites={{}}
          onLoadFavorites={jest.fn()}
        />
    );

    expect(favorites).toMatchSnapshot();
  });
});
