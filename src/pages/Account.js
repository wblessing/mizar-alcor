import React, { useContext, useState } from 'react';
import PageTitle from '../components/common/PageTitle';
import Card from '../components/common/Card';
import { FetchContext } from '../context/FetchContext';

import { useHistory, withRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-toastify';

const Account = () => {
  const fetchContext = useContext(FetchContext);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const history = useHistory();
  const { user } = useAuth0();
  const roles = user[`${process.env.REACT_APP_JWT_NAMESPACE}/roles`];

  function setUserRole(role) {
    user[`${process.env.REACT_APP_JWT_NAMESPACE}/roles`] = [role];
    toast.success('User role updated.');
    history.push('/dashboard');
  }

  return (
    <>
      <PageTitle title="Account" />
      <Card>
        <p className="font-bold">User Role</p>
        <div className="mt-4">
          <p>Select a role for yourself</p>
          <div className="mt-2 flex">
            <select
              defaultValue={roles[0]}
              onChange={(e) => setUserRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {successMessage && (
              <p className="text-green-700 ml-4">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 ml-4">{errorMessage}</p>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Account;
