import React from "react";
import {SortOptions, SortType} from "../../constants";

const witSelectState = (Component) => {
  class WithSelectState extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        currentSortType: SortType.POPULAR,
        isOpen: false,
        labelName: SortOptions.find((item) => item.selected).name,
      };

      this._handleSortClick = this._handleSortClick.bind(this);
      this._onSelectOption = this._onSelectOption.bind(this);
    }

    _handleSortClick() {
      this.setState((currentState) => {
        return {isOpen: !currentState.isOpen};
      });
    }

    _onSelectOption(value, name) {
      this.setState((currentState) => ({
        isOpen: !currentState.isOpen,
        labelName: name,
      }));
    }

    render() {
      return (
        <Component
          {...this.props}
          currentSortType={this.state.currentSortType}
          isOpen={this.state.isOpen}
          labelName={this.state.labelName}
          onOpenSorting={this._handleSortClick}
          onSelectOption={this._onSelectOption}
        />
      );
    }
  }

  return WithSelectState;
};

export default witSelectState;
