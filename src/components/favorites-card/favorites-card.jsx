import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {removeFromFavorites} from "../../reducers/favorites/favorites";
import {Link} from 'react-router-dom';

class FavoritesCard extends PureComponent {
  constructor(props) {
    super(props);
    this._handeleRemoveFromFavorites = this._handeleRemoveFromFavorites.bind(this);
  }

  render() {
    const {place} = this.props;
    return <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${place.id}`}>
          <img className="place-card__image" src={place.previewImage} width="150" height="110"
            alt="Place image"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${place.isFavorite &&
          `place-card__bookmark-button--active`}`} type="button"
          onClick={this._handeleRemoveFromFavorites}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `100%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${place.id}`}>{place.title}</Link>
        </h2>
        <p className="place-card__type">{place.type}</p>
      </div>
    </article>;
  }

  _handeleRemoveFromFavorites() {
    const {place, onRemoveFromFavoritesClick} = this.props;
    onRemoveFromFavoritesClick(place);
  }
}
FavoritesCard.propTypes = {
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
  onRemoveFromFavoritesClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
});

const mapDispatchToProps = (dispatch) => ({
  onRemoveFromFavoritesClick: (place) => dispatch(removeFromFavorites(place))
});

export {FavoritesCard};
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesCard);
