import React from "react";
import {connect} from "react-redux";
import {Operation} from "../../reducer/data/data";
import PropTypes from "prop-types";

const ReviewForm = (props) => {
  const {onInputChange, rating, review, id, onSendForm, onFormReset, isValid, formRef} = props;

  const sendFormData = (evt) => {
    evt.preventDefault();

    onSendForm(id, {rating: Number(rating), comment: review});
    onFormReset();
  };

  return (
    <form ref={formRef} className="reviews__form form" action="#" method="post" onSubmit={sendFormData}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input onChange={onInputChange} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input onChange={onInputChange} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input onChange={onInputChange} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input onChange={onInputChange} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input onChange={onInputChange} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </div>
      <textarea value={review || ``} onChange={onInputChange} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved"/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}>Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  formRef: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  isValid: PropTypes.bool.isRequired,
  onFormReset: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSendForm: PropTypes.func.isRequired,
  rating: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  review: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  onSendForm: (id, formData) => dispatch(Operation.sendReview(id, formData))
});

export {ReviewForm};
export default connect(null, mapDispatchToProps)(ReviewForm);
