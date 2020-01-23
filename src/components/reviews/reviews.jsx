import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getCommentsForPlace} from '../../reducers/comments/selectors';
import {loadComments} from '../../reducers/comments/comments';
import {format} from 'date-fns';

class Reviews extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {placeId, load} = this.props;
    load(placeId);
  }

  render() {
    const {commentsData = {}} = this.props;
    const {isLoaded, loadingError, comments} = commentsData;

    if (loadingError) {
      return <h2 className="reviews__title">Reviews loading error :( </h2>;
    }

    if (!isLoaded) {
      return <h2 className="reviews__title">Loading reviews ... </h2>;
    }

    const sortedComments = comments.sort((comment1, comment2) => {
      return new Date(comment2.date) - new Date(comment1.date);
    }).slice(0, 10);

    return <>
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">{sortedComments.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedComments.map((comment) => {
          return <li key={comment.id} className="reviews__item">
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src="/img/avatar-max.jpg"
                  width="54" height="54" alt="Reviews avatar" />
              </div>
              <span className="reviews__user-name">{comment.user.name}</span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                  <span style={{width: `${Math.round(comment.rating) * 100 / 5}%`}}>{}</span>
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <p className="reviews__text">{comment.comment}</p>
              <time className="reviews__time" dateTime={format(new Date(comment.date), `YYYY-MM-DD`)}>
                {format(new Date(comment.date), `MMM YYYY`)}
              </time>
            </div>
          </li>;
        })}
      </ul>
    </>;
  }
}

Reviews.propTypes = {
  load: PropTypes.func.isRequired,
  placeId: PropTypes.number.isRequired,
  commentsData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadingError: PropTypes.string,
    isLoaded: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        isPro: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
      }).isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }))
  })
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  commentsData: getCommentsForPlace(state, ownProps.placeId),
});

const mapDispatchToProps = (dispatch) => ({
  load: (placeId) => dispatch(loadComments(placeId)),
});

export {Reviews};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
