import {combineReducers} from 'redux';
import {reducer as activeCity} from './active-city/active-city';
import {reducer as offers} from './offers/offers';
import {reducer as user} from './user/user';
import {reducer as favorites} from './favorites/favorites';
import {reducer as commnets} from './comments/comments';
import {formReducer} from './form-reducer/form-reducer';

import NameSpace from "./name-spaces";

export default combineReducers({
  [NameSpace.ACTIVE_CITY]: activeCity,
  [NameSpace.OFFERS]: offers,
  [NameSpace.USER]: user,
  [NameSpace.FAVORITES]: favorites,
  [NameSpace.COMMENTS]: commnets,
  [NameSpace.FORM_REDUCER]: formReducer,
});
