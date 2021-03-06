import React, { useEffect, useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { faCaretDown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const DropdownItem = ({ item }) => (
  <button className="text-gray-700 flex items-center" onClick={item.onClick}>
    <FontAwesomeIcon icon={item.icon} />
    <p className="ml-2">{item.title}</p>
  </button>
);

const DropdownContent = ({ dropdownItems }) => {
  return (
    <div className="bg-white w-full absolute p-4 shadow-lg rounded-lg mt-2">
      {dropdownItems.map((item, i) => {
        return (
          <div className="mt-1" key={i}>
            <DropdownItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

const AvatarDropdown = () => {
  const node = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout, user } = useAuth0();

  const dropdownItems = [
    {
      title: 'Log Out',
      icon: faSignOutAlt,
      onClick: () => logout({ returnTo: window.location.origin }),
    },
  ];

  const handleClick = (e) => {
    if (!node.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div ref={node}>
      <button
        ref={node}
        className="flex rounded-full items-center py-2 px-3 bg-gradient focus:outline-none shadow-lg"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={user.picture}
          className="rounded-full w-6 border-2 border-white"
          alt="Avatar"
        />
        <div className="px-3">
          <p className="text-white">{user.name}</p>
        </div>
        <div className="mr-1 text-white">
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </button>

      {dropdownOpen && (
        <div className="relative">
          <DropdownContent dropdownItems={dropdownItems} />
        </div>
      )}
    </div>
  );
};

DropdownItem.propTypes = {
  item: PropTypes.object.isRequired,
};

DropdownContent.propTypes = {
  dropdownItems: PropTypes.object.isRequired,
};

export default AvatarDropdown;
