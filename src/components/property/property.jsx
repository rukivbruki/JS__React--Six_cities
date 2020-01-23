import React from "react";
import {connect} from "react-redux";
import {convertFloatToPercentage} from "../../utils";
import PropTypes from "prop-types";
import {getActiveCity, getHoveredOffer, getNearbyOffers, getOfferById} from "../../reducer/data/selector";
import Gallery from "../gallery/gallery";
import Goods from "../goods/goods";
import PageLayout from "../page-layout/page-layout";
import Header from "../header/header";
import ReviewList from "../review-list/review-list";
import Map from "../map/map";
import PlacesList from "../places-list/places-list";
import {getAuthorizationStatus} from "../../reducer/user/selector";
import ReviewForm from "../review-form/review-form";
import {Operation} from "../../reducer/data/data";
import withReviewSubmit from "../../hocs/with-review-submit/with-review-submit";

const ReviewFormWrapped = withReviewSubmit(ReviewForm);

const Property = (props) => {
  const {
    activeOffer,
    currentCity,
    currentOffer,
    id,
    nearbyOffers,
    nearbyOffersCoordinates,
    isAuthorized,
    onAddFavorite,
    onRemoveFavorite
  } = props;

  const {
    bedrooms,
    description,
    goods,
    host: {
      avatar,
      isPro,
      name,
    },
    images,
    isFavorite,
    isPremium,
    maxAdults,
    price,
    rating,
    title,
    type,
  } = currentOffer;

  const onFavoriteButtonClick = () => {
    if (isFavorite) {
      onRemoveFavorite(id);
    } else {
      onAddFavorite(id);
    }
  };

  return (
    <PageLayout pageClasses={[`page__main`, `page__main--property`]}>
      <Header/>

      <section className="property">

        <Gallery photos={images}/>

        <div className="property__container container">
          <div className="property__wrapper">

            {isPremium && <div className="property__mark"><span>Premium</span></div>}

            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>
              <button
                onClick={onFavoriteButtonClick}
                className={`property__bookmark-button button ${isFavorite && `property__bookmark-button--active`}`}
                type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"/>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{width: `${convertFloatToPercentage(rating)}%`}}/>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>

              <Goods goods={goods}/>

            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div
                  className={`property__avatar-wrapper user__avatar-wrapper ${isPro ? `property__avatar-wrapper--pro` : ``}`}>
                  <img className="property__avatar user__avatar" src={`/${avatar}`} width="74" height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  {name}
                </span>
                {isPro && <span className="property__user-status">Pro</span>}
              </div>
              <div className="property__description">
                <p className="property__text">{description}</p>
              </div>
            </div>
            <section className="property__reviews reviews">

              <ReviewList id={id}/>

              {isAuthorized && <ReviewFormWrapped id={id}/>}
            </section>
          </div>
        </div>
        <section className="property__map map">
          <Map currentCity={currentCity} coordinates={nearbyOffersCoordinates} activeOffer={activeOffer}/>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList offers={nearbyOffers}/>
            </div>
          </section>
        </div>
      </section>
    </PageLayout>
  );
};

Property.propTypes = {
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
  currentCity: PropTypes.string.isRequired,
  currentOffer: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  nearbyOffers: PropTypes.array.isRequired,
  nearbyOffersCoordinates: PropTypes.array.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const nearbyOffers = getNearbyOffers(state);

  return {
    activeOffer: getHoveredOffer(state),
    currentCity: getActiveCity(state),
    currentOffer: getOfferById(state, ownProps.id),
    isAuthorized: !getAuthorizationStatus(state),
    nearbyOffers: nearbyOffers || [],
    nearbyOffersCoordinates: nearbyOffers.map((offer) => offer.location.coordinates),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAddFavorite: (id) => dispatch(Operation.addToFavorites(id)),
  onRemoveFavorite: (id) => dispatch(Operation.removeFromFavorite(id))
});

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);
