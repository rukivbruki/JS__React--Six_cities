import React from "react";
import Proptypes from "prop-types";

const Goods = ({goods}) => {
  return (
    <ul className="property__inside-list">{
      goods.map((item, index) => (
        <li key={`"inside-item-${index}`} className="property__inside-item">
          {item}
        </li>
      ))
    }</ul>
  );
};

Goods.propTypes = {
  goods: Proptypes
    .arrayOf(Proptypes.string).isRequired
};

export default Goods;
