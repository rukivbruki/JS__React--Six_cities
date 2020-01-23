import React from "react";
import renderer from "react-test-renderer";
import PageLayout from "./page-layout";

const children = <div className="children-component" />;

it(`PageLayout component render correct`, () => {

  const layout = renderer
    .create(
        <PageLayout pageClasses={[`page--gray`, `page--main`]}>
          {children}
        </PageLayout>
    );

  expect(layout).toMatchSnapshot();
});
