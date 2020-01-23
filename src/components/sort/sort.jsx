import React from "react";
import {connect} from "react-redux";
import Option from "../option/option";
import {SortOptions} from "../../constants";
import {ActionCreator} from "../../reducer/data/data";
import PropTypes from "prop-types";

class Sort extends React.PureComponent {
  render() {
    const {
      currentSortType,
      isOpen,
      labelName,
      onOpenSorting,
      onSelectOption,
      onSetTypeSort,
    } = this.props;

    return (
      <>
        <span
          onClick={onOpenSorting}
          className="places__sorting-type"
          tabIndex="0"
        >
          {labelName}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"/>
          </svg>
        </span>
        <ul className={`${isOpen ? `places__options--opened` : ``} places__options places__options--custom`}>
          {SortOptions.map((option) => {
            return <Option
              onSelectOption={onSelectOption}
              onSetTypeSort={onSetTypeSort}
              isSelected={currentSortType === option.sortType}
              sortType={option.sortType}
              name={option.name}
              key={`option-${option.sortType}`}
            />;
          })}
        </ul>
      </>
    );
  }
}

Sort.propTypes = {
  currentSortType: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  labelName: PropTypes.string.isRequired,
  onOpenSorting: PropTypes.func.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  onSetTypeSort: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onSetTypeSort: (value) => dispatch(ActionCreator.setSortType(value)),
});

export {Sort};
export default connect(null, mapDispatchToProps)(Sort);
