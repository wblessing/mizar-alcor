import React from 'react';
import PropTypes from 'prop-types';

const TextInputBoot = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="appearance-none rounded-none relative block w-full px-3
            py-2 border border-gray-300 placeholder-gray-500 text-gray-900
            rounded-md focus:outline-none focus:shadow-outline-blue
            focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInputBoot.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default TextInputBoot;
