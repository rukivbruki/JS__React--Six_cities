import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {convertFloatToPercentage} from "../../utils";
import {Operation} from "../../reducer/data/data";
import {PageAddress} from "../../constants";

const PlaceCard = (props) => {
  const {
    offer,
    onCardHover,
    onAddFavorite,
    loadFavorites,
    onRemoveFavorite
  } = props;

  const {
    id,
    isFavorite,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type,
  } = offer;

  const onCardMouseEnter = () => {
    onCardHover(id);
  };

  const onFavoriteButtonClick = () => {
    if (isFavorite) {
      onRemoveFavorite(id);
      loadFavorites();
    } else {
      onAddFavorite(id);
    }
  };

  const ratingPercentage = `${convertFloatToPercentage(rating)}%`;

  return (
    <article
      id={id}
      className="cities__place-card place-card"
      onMouseEnter={onCardMouseEnter}
    >

      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite ? `place-card__bookmark-button--active` : ``}`}
            type="button"
            onClick={onFavoriteButtonClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingPercentage}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${PageAddress.OFFER}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

PlaceCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    previewImage: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  onCardHover: PropTypes.func.isRequired,
  loadFavorites: PropTypes.func.isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onAddFavorite: (id) => dispatch(Operation.addToFavorites(id)),
  onRemoveFavorite: (id) => dispatch(Operation.removeFromFavorite(id)),
  loadFavorites: () => dispatch(Operation.loadFavorites()),
});

export {PlaceCard};
export default connect(null, mapDispatchToProps)(PlaceCard);
