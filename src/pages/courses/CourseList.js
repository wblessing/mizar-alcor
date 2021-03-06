import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DangerButton from '../../components/common/buttons/DangerButton';
import StandardButton from '../../components/common/buttons/StandardButton';
import * as classnames from '../../components/common/classnames';

const CourseList = ({ courses, onDeleteClick, onWatchClick }) => {
  return (
    <section className={classnames.FORM_BORDER}>
      <table style={{ width: 770 }}>
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
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onWatchClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CourseList;
