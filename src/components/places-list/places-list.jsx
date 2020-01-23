import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PlaceCard from "../place-card/place-card";
import {ActionCreator} from "../../reducer/data/data";

class PlacesList extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers, changeActiveOffer} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) =>
          <PlaceCard
            key={offer.id}
            offer={offer}
            onCardHover={changeActiveOffer}
          />)}
      </div>
    );
  }
}

PlacesList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  changeActiveOffer: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  changeActiveOffer: (id) => dispatch(ActionCreator.changeActiveOffer(id))
});

export {PlacesList};
export default connect(null, mapDispatchToProps)(PlacesList);
