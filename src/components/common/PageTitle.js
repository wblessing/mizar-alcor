import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ title }) => (
  <div className="my-1 sm:my-4">
    <h2 className="text-gray-800 font-bold text-2xl">{title}</h2>
  </div>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
