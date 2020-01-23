import Constants from "./constants";

const convertFloatToPercentage = (rating) => {
  return rating / Constants.MAX_RATING * 100;
};

const parseHost = (data = {}) => {
  return {
    id: data[`id`] || ``,
    name: data[`name`] || ``,
    isPro: data[`is_pro`] || ``,
    avatar: data[`avatar_url`] || ``
  };
};

const convertIsoDateToString = (date) => {
  const options = {year: `numeric`, month: `long`};

  return new Intl.DateTimeFormat(`en-US`, options).format(new Date(date));
};

const parseLocation = (data = {}) => {
  return {
    coordinates: [data[`latitude`], data[`longitude`]] || [],
    zoom: data[`zoom`] || ``
  };
};

const parseCity = (data = {}) => {
  return {
    name: data[`name`] || ``,
    location: [data[`location`][`latitude`], data[`location`][`longitude`]] || [],
    zoom: data[`location`][`zoom`] || ``
  };
};

export {
  parseHost,
  parseCity,
  convertIsoDateToString,
  parseLocation,
  convertFloatToPercentage
};
