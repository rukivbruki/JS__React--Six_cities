import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from 'enzyme-to-json';
import withActiveElement from "./with-active-element";
import {Tabs} from "../../components/tabs/tabs";

Enzyme.configure({adapter: new Adapter()});

describe(`PlacesListWrapped works correct`, () => {
  const TabsWrapped = withActiveElement(Tabs);
  const changeCurrentCity = jest.fn();
  const cities = [`Paris`, `Kyiv`];

  const wrappedComponent = mount(
      <TabsWrapped
        changeCurrentCity={changeCurrentCity}
        cities={cities}
        currentCity={`Amsterdam`}
      />
  );

  const firstTab = wrappedComponent.find(`.locations__item-link`).first();


  it(`PlacesListWrapped should render correctly with offers`, () => {
    expect(toJson(wrappedComponent)).toMatchSnapshot();
  });

  it(`PlacesListWrapped must have initial state === null`, () => {
    expect(wrappedComponent.state().activeElement).toEqual(null);
  });

  it(`PlacesListWrapped change state on mouse hover first offer`, () => {
    firstTab.simulate(`click`);

    expect(wrappedComponent.state().activeElement).toEqual(`Paris`);
  });
});
