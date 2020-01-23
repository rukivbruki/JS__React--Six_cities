import React from "react";
import PropTypes from "prop-types";

const Option = (props) => {
  const {
    isSelected,
    name,
    onSelectOption,
    onSetTypeSort,
    sortType,
  } = props;

  const onOptionClick = () => {
    onSelectOption(sortType, name);
    onSetTypeSort(sortType);
  };

  return (
    <li
      className={`${isSelected ? `places__option--active` : ``} places__option`}
      onClick={onOptionClick}
      tabIndex="0"
      data-value={sortType}
    >
      {name}
    </li>
  );
};

Option.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onSelectOption: PropTypes.func.isRequired,
  onSetTypeSort: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
};

export default Option;
