import React from 'react';
import PropTypes from 'prop-types';

const DangerButton = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="text-grey-600 text-sm rounded border border-blue-600 px-2 hover:text-white hover:bg-blue-600"
  >
    {text}
  </button>
);

DangerButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DangerButton;
