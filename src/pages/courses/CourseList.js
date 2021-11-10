import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DangerButton from '../../components/common/DangerButton';
import StandardButton from '../../components/common/StandardButton';

const CourseList = ({ courses, onDeleteClick, onWatchClick }) => (
  <section className="bg-white p-4 shadow-md rounded-md">
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
                <StandardButton
                  text="Watch"
                  onClick={() => onWatchClick(course)}
                />
              </td>
              <td>
                <Link to={'/course/' + course.title}>{course.title}</Link>
              </td>
              <td>{course.authorName}</td>
              <td>{course.category}</td>
              <td>
                <a className="btn btn-light" href={course.url}>
                  Watch
                </a>
              </td>
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
  </section>
);

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onWatchClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CourseList;
