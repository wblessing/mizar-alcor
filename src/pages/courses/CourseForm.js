import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../components/common/TextInput';
import SelectInput from '../../components/common/SelectInput';
import PageTitle from '../../components/common/PageTitle';
import GradientButton from '../../components/common/buttons/GradientButton';
import * as classnames from '../../components/common/classnames';

const CourseForm = ({
  course,
  authors,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <>
      <PageTitle title={course.id ? 'Edit Course' : 'Add Course'} />
      <div className={classnames.FORM_BORDER}>
        <form onSubmit={onSave}>
          {errors.onSave && (
            <div className="alert alert-danger" role="alert">
              {errors.onSave}
            </div>
          )}
          <TextInput
            name="title"
            label="Title"
            value={course.title}
            onChange={onChange}
            error={errors.title}
          />

          <SelectInput
            name="authorId"
            label="Author"
            value={course.authorId || ''}
            defaultOption="Select Author"
            options={authors.map((author) => ({
              value: author.externalId,
              text: author.name,
            }))}
            onChange={onChange}
            error={errors.author}
          />

          <TextInput
            name="url"
            label="Url"
            value={course.url}
            onChange={onChange}
            error={errors.url}
          />

          <TextInput
            name="category"
            label="Category"
            value={course.category}
            onChange={onChange}
            error={errors.category}
          />

          <div className="w-full sm:w-1/4 mt-4">
            <GradientButton
              type="submit"
              text={saving ? 'Saving...' : 'Save'}
            />
          </div>
        </form>
      </div>
    </>
  );
};

CourseForm.propTypes = {
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default CourseForm;
