
export default (offer) => ({
  city: offer.city,
  previewImage: offer.preview_image,
  images: offer.images,
  title: offer.title,
  isFavorite: offer.is_favorite,
  isPremium: offer.is_premium,
  rating: offer.rating,
  type: offer.type,
  bedrooms: offer.bedrooms,
  maxAdults: offer.max_adults,
  price: offer.price,
  goods: offer.goods,
  host: offer.host && {
    id: offer.host.id,
    name: offer.host.name,
    isPro: offer.host.is_pro,
    avatarUrl: offer.host.avatar_url,
  },
  description: offer.description,
  location: offer.location,
  id: offer.id,
});
