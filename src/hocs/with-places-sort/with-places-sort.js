import React, {PureComponent} from 'react';

const sortings = [
  {
    name: `Popular`,
    sortFunction: null,
  },
  {
    name: `Price: low to high`,
    sortFunction: (place1, place2) => place1.price - place2.price,
  },
  {
    name: `Price: high to low`,
    sortFunction: (place1, place2) => place2.price - place1.price,
  },
  {
    name: `Top rated first`,
    sortFunction: (place1, place2) => place2.rating - place1.rating,
  },
];

const withPlacesSort = (Component) => {
  class WithPlacesSort extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        activeSorting: sortings[0],
      };
      this.handlerSortClick = this.handlerSortClick.bind(this);
    }

    render() {
      const {activeSorting} = this.state;
      return <Component
        {...this.props}
        activeSorting={activeSorting}
        sortings={sortings}
        onSortClick={this.handlerSortClick}
      />;
    }

    handlerSortClick(activeSorting) {
      this.setState({activeSorting});
    }
  }

  return WithPlacesSort;
};

export default withPlacesSort;
