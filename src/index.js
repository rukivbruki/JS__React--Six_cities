import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/reducer';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import {createAPI} from './api';
import {loadAuthorizationData} from './reducers/user/user';

const init = () => {
  const api = createAPI();

  let store;
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    store = createStore(
        reducer,
        compose(
            applyMiddleware(thunk.withExtraArgument(api)),
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
  } else {
    store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(api)));
  }

  store.dispatch(loadAuthorizationData);

  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();

