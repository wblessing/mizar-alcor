import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children }) => (
  <div className="p-3 rounded shadow-lg bg-white">{children}</div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
