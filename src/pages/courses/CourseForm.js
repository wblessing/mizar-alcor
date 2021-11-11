import React from 'react';
import PropTypes from 'prop-types';
import TextInputBoot from '../../components/common/TextInputBoot';
import SelectInput from '../../components/common/SelectInputBoot';
import PageTitle from '../../components/common/PageTitle';
import GradientButton from '../../components/common/GradientButton';

const CourseForm = ({
  course,
  authors,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <section className="bg-white p-4 shadow-md rounded-md">
      <form onSubmit={onSave}>
        <PageTitle title={course.id ? 'Edit Course' : 'Add Course'} />
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}
        <TextInputBoot
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

        <TextInputBoot
          name="url"
          label="Url"
          value={course.url}
          onChange={onChange}
          error={errors.url}
        />

        <TextInputBoot
          name="category"
          label="Category"
          value={course.category}
          onChange={onChange}
          error={errors.category}
        />

        <div className="w-full sm:w-1/4 mt-4">
          <GradientButton type="submit" text={saving ? 'Saving...' : 'Save'} />
        </div>
      </form>
    </section>
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
