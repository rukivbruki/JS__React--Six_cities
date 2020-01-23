import React from 'react';
import PropTypes from 'prop-types';

const CitiesList = (props) => {
  const {cities, activeCity, onCityClick} = props;
  return <div className="cities tabs">
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => {
          return <li className="locations__item" key={city.name}>
            <a
              className={`locations__item-link tabs__item
              ${city.name === activeCity.name ? `tabs__item--active` : ``}`}
              href="#"
              onClick={(evt) => {
                evt.preventDefault();
                onCityClick(city);
              }}
            >
              <span>{city.name}</span>
            </a>
          </li>;
        })}
      </ul>
    </section>
  </div>;
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  activeCity: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export default CitiesList;

