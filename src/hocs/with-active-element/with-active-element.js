import React from "react";

const withActiveElement = (Component) => {
  class WithActiveElement extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {activeElement: null};

      this.elementSelectHandler = this.elementSelectHandler.bind(this);
    }

    elementSelectHandler(id) {
      this.setState({
        activeElement: id
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          activeElement={this.state.activeElement}
          onSelect={this.elementSelectHandler}
        />
      );
    }
  }

  WithActiveElement.propTypes = {};

  return WithActiveElement;
};

export default withActiveElement;
