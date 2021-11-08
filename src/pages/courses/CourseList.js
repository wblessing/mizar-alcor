import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DangerButton from '../../components/common/DangerButton';

const CourseList = ({ courses, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {courses.map((course) => {
        return (
          <tr key={course.title}>
            <td>
              <a className="btn btn-light" href={course.url}>
                Watch
              </a>
            </td>
            <td>
              <Link to={'/course/' + course.title}>{course.title}</Link>
            </td>
            <td>{course.authorName}</td>
            <td>{course.category}</td>
            <td>
              <DangerButton
                text="Delete"
                onClick={() => onDeleteClick(course)}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CourseList;
