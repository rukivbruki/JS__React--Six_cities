import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import Spinner from '../spinner/spinner.jsx';
import PlacesList from '../places-list/places-list.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import {ActionCreator as ActiveCityActionCreator} from '../../reducers/active-city/active-city';

import withSortOpen from '../../hocs/with-sort-open/with-sort-open';
import withPlacesSort from '../../hocs/with-places-sort/with-places-sort';
import withActivePlace from '../../hocs/with-active-place/with-active-place';

import {loadOffers} from '../../reducers/offers/offers';

import {getActiveCityOffers, getCities, getIsLoaded, getLoadingError} from '../../reducers/offers/selectors';
import {getActiveCity} from '../../reducers/active-city/selectors';
import {setBodyRootClass} from "../../utils/set-body-root-class";

const PlacesListWrapped = withPlacesSort(withSortOpen(PlacesList));

class MainPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setBodyRootClass(`page page--gray page--main`, `full-height`);
    const {load} = this.props;
    load();
  }

  render() {
    const {
      isLoaded,
      places,
      cities,
      activeCity,
      onCityClick,
      activePlace,
      onActivatePlace,
    } = this.props;

    if (!isLoaded) {
      return <Spinner />;
    }

    return <>
      <main className={`page__main page__main--index
      ${!places.length ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          cities={cities}
          activeCity={activeCity}
          onCityClick={(city) => {
            onActivatePlace(null);
            onCityClick(city);
          }}
        />
        <PlacesListWrapped
          places={places}
          city={activeCity}
          key={activeCity.name}
          activePlace={activePlace}
          onActivatePlace={onActivatePlace}
        />
      </main>
    </>;
  }
}

MainPage.propTypes = {
  places: PropTypes.array,
  cities: PropTypes.array,
  activeCity: PropTypes.object,
  activePlace: PropTypes.object,
  isLoaded: PropTypes.bool.isRequired,
  loadingError: PropTypes.string,
  load: PropTypes.func.isRequired,
  onActivatePlace: PropTypes.func.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: getActiveCity(state),
  places: getActiveCityOffers(state),
  cities: getCities(state),
  isLoaded: getIsLoaded(state),
  loadingError: getLoadingError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick: (city) => dispatch(ActiveCityActionCreator.setActiveCity(city)),
  load: () => dispatch(loadOffers())
});

export {MainPage};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withActivePlace
)(MainPage);

