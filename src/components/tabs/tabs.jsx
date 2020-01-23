import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/data/data";
import TabsLink from "../tabs-link/tabs-link";
import {getCities} from "../../reducer/data/selector";

const Tabs = (props) => {
  const {
    currentCity,
    activeElement,
    changeCurrentCity,
    cities,
    onSelect,
  } = props;

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city, index) =>
            <TabsLink
              key={`${index}-${city}`}
              city={city}
              onSelect={onSelect}
              activeElement={activeElement || currentCity}
              changeCurrentCity={changeCurrentCity}
            />)}
        </ul>
      </section>
    </div>
  );
};

Tabs.propTypes = {
  activeElement: PropTypes.string,
  changeCurrentCity: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentCity: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cities: getCities(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrentCity: (city) => dispatch(ActionCreator.changeCity(city))
});

export {Tabs};
export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
