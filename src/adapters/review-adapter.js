import {convertIsoDateToString} from "../utils";

class ReviewAdapter {
  static parseReviews(reviews, id) {
    return {
      [id]: reviews.map((review) => {
        return {
          id: review[`id`],
          comment: review[`comment`],
          rating: review[`rating`],
          userName: review[`user`][`name`],
          avatarUrl: review[`user`][`avatar_url`],
          isPro: review[`user`][`is_pro`],
          date: convertIsoDateToString(review[`date`]),
        };
      })
    };
  }
}

export default ReviewAdapter;
