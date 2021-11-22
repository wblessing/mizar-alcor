import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  faAddressCard,
  faAward,
  faChartLine,
  faChartPie,
  faCogs,
  faDoorOpen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import logo from './../images/logo.png';
import PropTypes from 'prop-types';

const paren1 = '\u{2474}';
const paren2 = '\u{2475}';

const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: faChartLine,
    allowedRoles: ['user', 'admin'],
  },
  {
    label: 'Inventory ' + paren1,
    path: '/inventory',
    icon: faChartPie,
    allowedRoles: ['admin'],
  },
  {
    label: 'Courses ' + paren2,
    path: '/courses',
    icon: faAward,
    allowedRoles: ['user', 'admin'],
  },
  {
    label: 'Account ',
    path: '/account',
    icon: faAddressCard,
    allowedRoles: ['user', 'admin'],
  },
  {
    label: 'Settings ' + paren1,
    path: '/settings',
    icon: faCogs,
    allowedRoles: ['admin'],
  },
  {
    label: 'Users ' + paren1,
    path: '/users',
    icon: faDoorOpen,
    allowedRoles: ['admin'],
  },
];

const NavItem = ({ navItem }) => {
  const location = useLocation();
  const isCurrentRoute = location.pathname === `/${navItem.path}`;
  const classes = classNames({
    'px-2 sm:px-6 justify-center sm:justify-start py-3 rounded-full flex': true,
    'text-gray-600 hover:text-blue-500 transform hover:translate-x-1 transition ease-in-out duration-100':
      !isCurrentRoute,
    'bg-gradient text-gray-100 shadow-lg': isCurrentRoute,
  });
  return (
    <Link to={navItem.path} className={classes}>
      <div className="flex items-center">
        <div className="mr-0 sm:mr-4">
          <FontAwesomeIcon icon={navItem.icon} />
        </div>
        <span className="hidden sm:block" style={{ whiteSpace: 'nowrap' }}>
          {navItem.label}
        </span>
      </div>
    </Link>
  );
};

const NavItemContainer = ({ children }) => <div>{children}</div>;

const Sidebar = () => {
  const { user } = useAuth0();
  const roles = user[`${process.env.REACT_APP_JWT_NAMESPACE}/roles`];
  if (roles.length === 0) {
    roles[0] = 'user';
  }
  return (
    <section className="h-screen">
      <div className="w-16 sm:w-24 m-auto">
        <img src={logo} rel="logo" alt="Logo" />
      </div>
      <div className="mt-20">
        {navItems.map((navItem, i) => (
          <NavItemContainer key={i}>
            {navItem.allowedRoles.length === 0 ||
              (navItem.allowedRoles.includes(roles[0]) && (
                <NavItem navItem={navItem} />
              ))}
          </NavItemContainer>
        ))}
      </div>
    </section>
  );
};

NavItem.propTypes = {
  navItem: PropTypes.object.isRequired,
};

NavItemContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
