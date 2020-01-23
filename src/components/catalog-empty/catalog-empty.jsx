import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs";
import withActiveElement from "../../hocs/with-active-element/with-active-element";

const TabsWrapped = withActiveElement(Tabs);

const CatalogEmpty = (props) => {
  const {currentCity} = props;

  return (
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>

      <TabsWrapped currentCity={currentCity}/>

      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in {currentCity}</p>
            </div>
          </section>
          <div className="cities__right-section"/>
        </div>
      </div>
    </main>
  );
};

CatalogEmpty.propTypes = {
  currentCity: PropTypes.string.isRequired
};

export default CatalogEmpty;
