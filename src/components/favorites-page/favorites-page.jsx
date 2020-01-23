import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'recompose';

import FavoritesCard from '../favorites-card/favorites-card.jsx';
import Spinner from '../spinner/spinner.jsx';
import Footer from '../footer/footer.jsx';

import {loadFavorites} from '../../reducers/favorites/favorites';
import {getIsLoaded, getLoadingError, getOrderedFavorites} from '../../reducers/favorites/selectors';
import withAuthorizationReqired from '../../hocs/with-authorization-reqired/with-authorization-reqired';
import {setBodyRootClass} from "../../utils/set-body-root-class";

class FavoritePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadData();
    setBodyRootClass(`page`, ``);
  }

  render() {
    const {favorites, isLoaded, loadingError} = this.props;

    if (!isLoaded) {
      return <>
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <Spinner />
          </div>
        </main>
        <Footer/>
      </>;
    }

    if (!favorites || !favorites.length) {
      return <>
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow
                  down search or plan yor future trips.</p>
              </div>
            </section>
          </div>
        </main>
        <Footer/>
      </>;
    }

    if (loadingError) {
      return <>
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Load favorites error: {loadingError}</h1>
            </section>
          </div>
        </main>
        <Footer/>
      </>;
    }

    return <>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favorites.map((it) => {
                return <li key={it.city.name} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{it.city.name}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {it.offers.map((offer) => {
                      return <FavoritesCard place={offer} key={offer.id}/>;
                    })}
                  </div>
                </li>;
              })}
            </ul>
          </section>
        </div>
      </main>
      <Footer/>
    </>;
  }
}

FavoritePage.propTypes = {
  loadData: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  loadingError: PropTypes.string,
  favorites: PropTypes.arrayOf(PropTypes.shape({
    city: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    offers: PropTypes.array,
  })),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  favorites: getOrderedFavorites(state),
  isLoaded: getIsLoaded(state),
  loadError: getLoadingError(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadData: () => dispatch(loadFavorites())
});

export {FavoritePage};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthorizationReqired
)(FavoritePage);
