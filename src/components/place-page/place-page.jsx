import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Spinner from '../spinner/spinner.jsx';
import Reviews from '../reviews/reviews.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import CityMap from '../city-map/city-map.jsx';
import PlaceCard from '../place-card/place-card.jsx';

import {changeFavorites} from '../../reducers/favorites/favorites';
import {loadOffers} from '../../reducers/offers/offers';
import {getIsLoaded, getOfferById} from '../../reducers/offers/selectors';
import {getAuthorizationStatus} from '../../reducers/user/selectors';
import {getTreeNearPlaces} from '../../reducers/offers/selectors';
import {setBodyRootClass} from "../../utils/set-body-root-class";


const PlaceTypes = {
  apartment: `Apartment`,
  room: `Private Room`,
  house: `House`,
  hotel: `Hotel`,
};

class PlacePage extends PureComponent {
  constructor(props) {
    super(props);
    this._handelBookmarksClick = this._handelBookmarksClick.bind(this);
  }

  componentDidMount() {
    const {isLoaded, load} = this.props;
    if (!isLoaded) {
      load();
    }

    setBodyRootClass(`page`, ``);
  }

  render() {
    const {isLoaded} = this.props;

    if (!isLoaded) {
      return <main className="page__main page__main--property">
        <section className="property">
          <Spinner />
        </section>
      </main>;
    }

    const {place, isAuthorazated, nearPlaces} = this.props;

    return <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {place.images && place.images.slice(0, 6).map((image, index) => {
              return <div key={index} className="property__image-wrapper">
                <img className="property__image" src={image} alt="Photo studio" />
              </div>;
            })}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {place.isPremium && <div className="property__mark">
              <span>Premium</span>
            </div>}
            <div className="property__name-wrapper">
              <h1 className="property__name">{place.title}</h1>
              <button className={`property__bookmark-button button ${place.isFavorite &&
              `property__bookmark-button--active`}`} type="button"
              onClick={this._handelBookmarksClick}>
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${Math.round(place.rating) * 100 / 5}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{place.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {PlaceTypes[place.type] || `Entire place`}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {place.bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {place.maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{place.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {place.goods && place.goods.map((it, index) => {
                  return <li key={index} className="property__inside-item">
                    {it}
                  </li>;
                })}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className={`property__avatar-wrapper ${place.host.isPro &&
                `property__avatar-wrapper--pro`} user__avatar-wrapper`}>
                  <img className="property__avatar user__avatar" src={`/` + place.host.avatarUrl}
                    width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">{place.host.name}</span>
                {place.host.isPro && <span className="property__user-status">Pro</span>}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {place.description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <Reviews placeId={place.id} />
              {isAuthorazated && <ReviewForm placeId={place.id} />}
            </section>
          </div>
        </div>
        <section className="property__map map">
          <CityMap places={[...nearPlaces, place]} city={place.city} activePlace={place}/>
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {nearPlaces.map((it) => <PlaceCard
              key={it.id}
              place={it}
            />)}
          </div>
        </section>
      </div>
    </main>;
  }

  _handelBookmarksClick() {
    const {place, onBookmarkClick} = this.props;
    onBookmarkClick(place);
  }
}

PlacePage.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  isAuthorazated: PropTypes.bool.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired,
  nearPlaces: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        isPremium: PropTypes.bool.isRequired,
        previewImage: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool.isRequired,
      }).isRequired
  ).isRequired,
  place: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isLoaded: getIsLoaded(state),
  isAuthorazated: getAuthorizationStatus(state),
  place: getOfferById(state, ownProps.match.params.id),
  nearPlaces: getTreeNearPlaces(state, getOfferById(state, ownProps.match.params.id), 3),
});

const mapDispatchToProps = (dispatch) => ({
  onBookmarkClick: (place) => dispatch(changeFavorites(place)),
  load: () => dispatch(loadOffers()),
});

export {PlacePage};
export default connect(mapStateToProps, mapDispatchToProps)(PlacePage);


