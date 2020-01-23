import React from "react";
import renderer from "react-test-renderer";
import {Sort} from "./sort";

it(`Sort component render correct`, () => {
  const sortTemplate = renderer
    .create(<Sort
      currentSortType={``}
      isOpen={true}
      labelName={``}
      onOpenSorting={jest.fn()}
      onSelectOption={jest.fn()}
      onSetTypeSort={jest.fn()}
    />)
    .toJSON();

  expect(sortTemplate).toMatchSnapshot();
});
