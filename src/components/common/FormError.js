import React from 'react';
import PropTypes from 'prop-types';

const FormError = ({ text }) => (
  <span className="text-red-500 text-sm">{text}</span>
);

FormError.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FormError;
