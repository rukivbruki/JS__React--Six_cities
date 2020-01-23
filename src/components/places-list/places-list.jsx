import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from '../place-card/place-card.jsx';
import CityMap from "../city-map/city-map.jsx";

const PlacesList = (props) => {
  const {
    places,
    city,
    activePlace,
    onActivatePlace,
    isSortOpen,
    onOpenSortClick,
    activeSorting,
    sortings,
    onSortClick
  } = props;

  let sortedPlaces = [...places];
  if (activeSorting.sortFunction) {
    sortedPlaces = sortedPlaces.sort(activeSorting.sortFunction);
  }

  if (!sortedPlaces.length) {
    return <div className="cities__places-wrapper">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property availbale at the moment in
              {city.name}</p>
          </div>
        </section>
        <div className="cities__right-section">
        </div>
      </div>
    </div>;
  }

  return <div className="cities__places-wrapper">
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{sortedPlaces.length} places to stay in {city.name}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by </span>
          <span className="places__sorting-type" tabIndex="0" onClick={onOpenSortClick}>
            {activeSorting.name}
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className={`places__options places__options--custom
          ${isSortOpen ? `places__options--opened` : ``}`} onClick={onOpenSortClick}>
            {sortings.map((sorting) => {
              return <li
                className={`places__option ${sorting === activeSorting ? `places__option--active` : `` }`}
                tabIndex="0"
                key={sorting.name}
                onClick={() => onSortClick(sorting)}
              >
                {sorting.name}
              </li>;
            })}
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {sortedPlaces.map((place) => <PlaceCard
            key={place.id}
            place={place}
            onActivate={onActivatePlace}
          />)}
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map">
          <CityMap
            city={city}
            places={sortedPlaces}
            activePlace={activePlace}
          />
        </section>
      </div>
    </div>
  </div>;
};

PlacesList.propTypes = {
  places: PropTypes.array.isRequired,
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
  }).isRequired,
  activePlace: PropTypes.object,
  isSortOpen: PropTypes.bool.isRequired,
  activeSorting: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sortFunction: PropTypes.func,
  }).isRequired,
  sortings: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    sortFunction: PropTypes.func,
  }).isRequired).isRequired,
  onActivatePlace: PropTypes.func.isRequired,
  onOpenSortClick: PropTypes.func.isRequired,
  onSortClick: PropTypes.func.isRequired,
};

export default PlacesList;
