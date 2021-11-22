import React, { useContext, useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import GradientButton from '../components/common/buttons/GradientButton';
import PageTitle from '../components/common/PageTitle';
import Card from './../components/common/Card';
import { FetchContext } from './../context/FetchContext';
import * as constants from '../components/common/constants';
import { toast } from 'react-toastify';

const Settings = () => {
  const fetchContext = useContext(FetchContext);
  const [bio, setBio] = useState();

  useEffect(() => {
    const getBio = async () => {
      try {
        const { data } = await fetchContext.authAxios.get('api/get-user-bio');
        setBio(data.bio);
      } catch (err) {
        console.log(err);
      }
    };
    getBio();
  }, [fetchContext.authAxios]);

  const saveBio = async (bio) => {
    try {
      await fetchContext.authAxios.patch('api/update-user-bio', bio);
      toast.success('User Bio updated!');
    } catch (err) {
      toast.error('Save Bio failed, ' + constants.PERMISSIONS_MESSAGE, {
        autoClose: false,
      });
    }
  };
  return (
    <>
      <PageTitle title="Settings" />
      <Card>
        <h2 className="font-bold mb-2">Fill Out Your Bio</h2>
        <Formik
          initialValues={{
            bio,
          }}
          onSubmit={(values) => saveBio(values)}
          enableReinitialize={true}
        >
          {() => (
            <Form>
              <Field
                className="border border-gray-300 rounded p-1 w-full h-56 mb-2"
                component="textarea"
                name="bio"
                placeholder="Your bio here"
              />
              <GradientButton text="Save" type="submit" />
            </Form>
          )}
        </Formik>
      </Card>
    </>
  );
};

export default Settings;
