import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ text }) => (
  <label className="text-sm font-semibold text-gray-700">{text}</label>
);

Label.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Label;
