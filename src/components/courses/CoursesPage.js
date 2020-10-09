import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadCourses, deleteCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const CoursesPage = (props) => {
  const {
    courses,
    authors,
    loadCourses,
    deleteCourse,
    loadAuthors,
    loading,
  } = props;
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses error " + error);
      });

      if (authors.length === 0) {
        loadAuthors().catch((error) => {
          alert("Loading authors failed " + error);
        });
      }
    }
  }, []);

  const handleDeleteCourse = (course) => {
    toast.success("Course deleted");
    deleteCourse(course).catch((error) => {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    });
  };

  return (
    <React.Fragment>
      {redirectToAddCoursePage && <Redirect to="/course" />}
      <h2>Courses</h2>
      <hr />
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <button
            type="button"
            className="btn btn-primary add-course"
            style={{ marginBottom: 20 }}
            onClick={() => setRedirectToAddCoursePage(true)}
          >
            Add Course
          </button>
          <CourseList
            courses={props.courses}
            onDeleteClick={handleDeleteCourse}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallStatus > 0,
  };
};

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  deleteCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
