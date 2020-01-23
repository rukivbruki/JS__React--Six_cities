import React from "react";
import PageLayout from "../page-layout/page-layout";
import Catalog from "../catalog/catalog";
import Header from "../header/header";

const MainPage = () => {
  return (
    <PageLayout pageClasses={[`page--gray`, `page--main`]}>
      <Header/>
      <Catalog/>
    </PageLayout>
  );
};

export default MainPage;
