import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const ManageCoursePage = ({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

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
    } else {
      setCourse({ ...props.course });
    }
  }, [props.course]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  };

  const formIsValid = () => {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (formIsValid()) {
      setSaving(true);
      saveCourse(course).then(() => {
        toast.success("Course Saved");
        history.push("/courses");
      });
    }
  };

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      authors={authors}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
};

ManageCoursePage.propTypes = {
  course: PropTypes.object,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const getCourseBySlug = (courses, slug) => {
  return courses.find((course) => course.slug === slug) || null;
};

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course = slug ? getCourseBySlug(state.courses, slug) : newCourse;

  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
};

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);