const Constants = {
  MAX_RATING: 5,
  MAX_GALLERY_PHOTOS: 6,
  MAX_MAP_MARKERS: 3,
  CITIES: [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`],
  CITIES_COORDINATES: new Map([
    [`Cologne`, [50.938361, 6.959974]],
    [`Brussels`, [50.846557, 4.351697]],
    [`Paris`, [48.85661, 2.351499]],
    [`Dusseldorf`, [51.225402, 6.776314]],
    [`Amsterdam`, [52.37454, 4.897976]],
    [`Hamburg`, [53.550341, 10.000654]],
  ]),
};

const REQUEST = {
  BASE_URL: `https://htmlacademy-react-2.appspot.com/six-cities`,
  TIMEOUT: 5000,
  STATUS_CODE: {
    DENIED: 401,
    SUCCESS: 200,
  }
};

const PageAddress = {
  FAVORITE: `/favorite`,
  HOTELS: `/hotels`,
  LOGIN: `/login`,
  MAIN: `/`,
  OFFER: `/offer`,
};

const SortType = {
  POPULAR: `POPULAR`,
  TO_HIGH: `TO_HIGH`,
  TO_LOW: `TO_LOW`,
  TOP_RATED: `TOP_RATED`,
};

const SortOptions = [
  {
    name: `Popular`,
    sortType: SortType.POPULAR,
    selected: true,
  },
  {
    name: `Price: low to high`,
    sortType: SortType.TO_HIGH,
    selected: false,
  },
  {
    name: `Price: high to low`,
    sortType: SortType.TO_LOW,
    selected: false,
  },
  {
    name: `Top rated first`,
    sortType: SortType.TOP_RATED,
    selected: false,
  }
];

export {
  REQUEST,
  SortOptions,
  PageAddress,
  SortType,
};

export default Constants;
