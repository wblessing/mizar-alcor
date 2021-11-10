import React from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import { toast } from 'react-toastify';
//import 'bootstrap/dist/css/bootstrap.min.css';
import PageTitle from '../../components/common/PageTitle';
import GradientButton from '../../components/common/GradientButton';

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const { courses, authors, actions, accessToken } = this.props;
    if (courses.length === 0) {
      actions.loadCourses(accessToken).catch((error) => {
        alert('Loading courses failed' + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors(accessToken).catch((error) => {
        alert('Loading authors failed' + error);
      });
    }
  }

  handleWatchCourse = async (course) => {
    window.open(course.url, '_blank');
  };

  handleDeleteCourse = async (course) => {
    toast.success('Course deleted');
    try {
      await this.props.actions.deleteCourse(course, this.props.accessToken);
    } catch (error) {
      toast.error('Delete failed. ' + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="course" />}
        <PageTitle title="Courses" />
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <CourseList
              onWatchClick={this.handleWatchCourse}
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
            <div className="w-full sm:w-1/4 mt-4">
              <GradientButton
                type="button"
                text="Add Course"
                onClick={() => this.setState({ redirectToAddCoursePage: true })}
              />
            </div>
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  accessToken: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find(
                (a) => a.externalId === course.authorId
              ).name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
