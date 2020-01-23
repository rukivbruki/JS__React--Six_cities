import {parseCity, parseHost, parseLocation} from "../utils";

class PlaceCardAdapter {
  static parseOffer(offer) {
    return {
      id: offer[`id`],
      city: parseCity(offer[`city`]),
      previewImage: offer[`preview_image`],
      images: offer[`images`],
      title: offer[`title`],
      isFavorite: offer[`is_favorite`],
      isPremium: offer[`is_premium`],
      rating: offer[`rating`],
      type: offer[`type`],
      bedrooms: offer[`bedrooms`],
      maxAdults: offer[`max_adults`],
      price: offer[`price`],
      goods: offer[`goods`],
      host: parseHost(offer[`host`]),
      description: offer[`description`],
      location: parseLocation(offer[`location`])
    };
  }

  static parseOffers(offers) {
    return offers.map(PlaceCardAdapter.parseOffer);
  }
}

export default PlaceCardAdapter;
