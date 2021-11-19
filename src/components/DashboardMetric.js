import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const DashboardMetric = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-blue-500">
      <p className="text-gray-600 uppercase text-xs">
        <FontAwesomeIcon icon={icon} className="mr-2" />
        {title}
      </p>
      <p className="text-3xl text-blue-600 font-bold">{value}</p>
    </div>
  );
};

DashboardMetric.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  icon: PropTypes.any.isRequired,
};

export default DashboardMetric;
