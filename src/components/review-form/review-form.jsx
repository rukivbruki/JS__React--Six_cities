import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {Field, reduxForm} from 'redux-form';

import {sendComment} from '../../reducers/comments/comments';
import {getIsSending, getSendingError} from '../../reducers/comments/selectors';
import PropTypes from "prop-types";

class ReviewForm extends PureComponent {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    const {invalid, sending, sendingError} = this.props;
    return <form className="reviews__form form" action="#" method="post" onSubmit={this.props.handleSubmit(this._handleSubmit)}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <Field component="input" className="form__rating-input visually-hidden" name="rating"
          value="5" id="5-stars" type="radio"/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <Field component="input" className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars"
          type="radio"/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <Field component="input" className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars"
          type="radio"/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <Field component="input" className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars"
          type="radio"/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <Field component="input" className="form__rating-input visually-hidden" name="rating" value="1" id="1-star"
          type="radio"/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <Field component="textarea" className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        {sendingError && <p style={{color: `red`}}>{}</p>}
        <button className="reviews__submit form__submit button" type="submit" disabled={invalid || sending}>Submit</button>
      </div>
      {sendingError && <div className="reviews__button-wrapper">
        <p style={{color: `red`}}>{sendingError}</p>
      </div> }
    </form>;
  }

  _handleSubmit(values) {
    const {placeId, onSend} = this.props;
    onSend(placeId, {
      rating: Number(values.rating),
      comment: values.review,
    });
  }
}

ReviewForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  placeId: PropTypes.number.isRequired,
  invalid: PropTypes.bool.isRequired,
  sending: PropTypes.bool.isRequired,
  sendingError: PropTypes.string,
  onSend: PropTypes.func.isRequired,
};

const reviewFormValidate = (values) => {
  const error = {};

  if (!values.rating) {
    error.rating = `You must select rating`;
  }

  if (!values.review || values.review.length < 50) {
    error.rating = `Review must be more 30 characters`;
  }

  if (values.review && values.review.length > 300) {
    error.rating = `Review must be less 300 characters`;
  }

  return error;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  sending: getIsSending(state),
  sendingError: getSendingError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSend: (placeId, comment) => dispatch(sendComment(placeId, comment))
});

export {ReviewForm};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
      form: `reviewForm`,
      validate: reviewFormValidate
    })
)(ReviewForm);
