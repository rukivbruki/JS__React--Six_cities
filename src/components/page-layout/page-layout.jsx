import React from "react";
import PropTypes from "prop-types";

const PageLayout = (props) => {
  const {
    children,
    pageClasses,
  } = props;

  return (
    <div className={`page ${pageClasses && pageClasses.join(` `)}`}>
      {children}
    </div>
  );
};

PageLayout.propTypes = {
  pageClasses: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default PageLayout;
