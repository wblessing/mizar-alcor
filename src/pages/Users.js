import React, { useContext, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import Card from '../components/common/Card';
import PageTitle from '../components/common/PageTitle';
import { FetchContext } from '../context/FetchContext';
import defaultAvatar from './../images/defaultAvatar.png';
import PropTypes from 'prop-types';

const UserDetailLabel = ({ text }) => (
  <p className="mt-2 uppercase font-bold text-gray-500 text-xs">{text}</p>
);

const UserDetail = ({ user }) => (
  <Card>
    <div className="flex">
      <div className="w-24">
        <img src={user.avatar || defaultAvatar} alt="avatar" />
      </div>

      <div>
        <p className="font-bold text-lg">
          {user.firstName} {user.lastName}
        </p>

        <div className="mt-2">
          <UserDetailLabel text="Bio" />
          {user.bio ? (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(user.bio),
              }}
            />
          ) : (
            <p className="text-gray-500 italic">No bio set</p>
          )}
        </div>
      </div>
    </div>
  </Card>
);

const Users = () => {
  const fetchContext = useContext(FetchContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await fetchContext.authAxios.get('api/get-users');
        setUsers(data.users);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [fetchContext.authAxios]);

  return (
    <>
      <PageTitle title="Users" />
      <div className="flex flex-col">
        {!!users.length &&
          users.map((user) => (
            <div className="m-2" key={user._id}>
              <UserDetail user={user} />
            </div>
          ))}
      </div>
    </>
  );
};

UserDetail.propTypes = {
  user: PropTypes.object.isRequired,
};

UserDetailLabel.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Users;
