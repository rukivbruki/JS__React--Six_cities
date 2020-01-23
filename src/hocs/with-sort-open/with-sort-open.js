import React, {PureComponent} from 'react';

const withSortOpen = (Component) => {
  class WithActivePlace extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isSortOpen: false,
      };
      this.handlerOpenSortClick = this.handlerOpenSortClick.bind(this);
    }

    render() {
      const {isSortOpen} = this.state;
      return <Component
        {...this.props}
        isSortOpen={isSortOpen}
        onOpenSortClick={this.handlerOpenSortClick}
      />;
    }

    handlerOpenSortClick() {
      const isSortOpen = !this.state.isSortOpen;
      this.setState({isSortOpen});
    }
  }

  return WithActivePlace;
};

export default withSortOpen;
