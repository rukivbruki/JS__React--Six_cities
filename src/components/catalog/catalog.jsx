import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PlacesList from "../places-list/places-list";
import CatalogEmpty from "../catalog-empty/catalog-empty";
import Tabs from "../tabs/tabs";
import Sort from "../sort/sort";
import withActiveElement from "../../hocs/with-active-element/with-active-element";
import Map from "../map/map";
import {getActiveCity, getCoordinates, getHoveredOffer, getSortedOffers} from "../../reducer/data/selector";
import witSelectState from "../../hocs/with-select-state/with-select-state";

const TabsWrapped = withActiveElement(Tabs);
const SortWrapped = witSelectState(Sort);

const Catalog = (props) => {
  const {
    currentCity,
    offers,
    mapCoordinates,
    activeOffer,
  } = props;

  return (
    <Fragment>
      {offers.length ?
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>

          <TabsWrapped currentCity={currentCity}/>

          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {currentCity}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by </span>

                  <SortWrapped/>

                </form>

                <PlacesList offers={offers}/>

              </section>
              <div className="cities__right-section">
                <section className="cities__map">
                  <Map coordinates={mapCoordinates} currentCity={currentCity} activeOffer={activeOffer}/>
                </section>
              </div>
            </div>
          </div>
        </main>
        : <CatalogEmpty currentCity={currentCity}/>
      }
    </Fragment>
  );
};

Catalog.propTypes = {
  activeOffer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.arrayOf(PropTypes.number).isRequired,
      zoom: PropTypes.number.isRequired
    }),
    location: PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      zoom: PropTypes.number.isRequired
    }),
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    previewImage: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }),
  currentCity: PropTypes.string,
  mapCoordinates: PropTypes.array.isRequired,
  offers: PropTypes.array,
};

const mapStateToProps = (state) => ({
  activeOffer: getHoveredOffer(state),
  currentCity: getActiveCity(state),
  mapCoordinates: getCoordinates(state),
  offers: getSortedOffers(state),
});

export {Catalog};
export default connect(mapStateToProps)(Catalog);
