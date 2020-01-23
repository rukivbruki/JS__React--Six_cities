import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import ScrollToTop from '../scroll-to-top/scroll-to-top.jsx';
import history from '../../utils/history';

import MainPage from '../main-page/main-page.jsx';
import SignInPage from '../sign-in-page/sign-in-page.jsx';
import Header from '../header/header.jsx';
import FavoritesPage from '../favorites-page/favorites-page.jsx';
import PlacePage from '../place-page/place-page.jsx';

const App = () => {
  return <>
    <Router history={history}>
      <ScrollToTop>
        <Header />
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/login" component={SignInPage} />
          <Route path="/favorites" component={FavoritesPage} />
          <Route path="/offer/:id" component={PlacePage} />
        </Switch>
      </ScrollToTop>
    </Router>
  </>;
};

export {App};
export default App;


