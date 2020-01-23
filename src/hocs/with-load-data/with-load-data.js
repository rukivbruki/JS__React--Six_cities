import React, {PureComponent} from "react";
import PropType from "prop-types";

const withLoadData = (Component) => {
  class WithLoadData extends PureComponent {
    componentDidMount() {
      this._onRequiredLoadData();
    }

    componentDidUpdate() {
      this._onRequiredLoadData();
    }

    _onRequiredLoadData() {
      const {isRequiredDataLoad, onLoadData} = this.props;

      if (isRequiredDataLoad) {
        onLoadData();
      }
    }

    render() {
      return this.props.isRequiredDataLoad ? <h1>Loading...</h1> : <Component {...this.props}/>;
    }
  }

  WithLoadData.propTypes = {
    isRequiredDataLoad: PropType.bool.isRequired,
    onLoadData: PropType.func.isRequired,
  };


  return WithLoadData;
};

export default withLoadData;
