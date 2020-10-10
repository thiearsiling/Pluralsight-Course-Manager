import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadCourses } from "../../redux/actions/courseActions";

const Header = ({ courses, loadCourses }) => {
  const activeStyle = { color: "#F15B2A" };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <nav>
      <NavLink to="/" exact activeStyle={activeStyle}>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>
        Courses {courses.length > 0 && ` (${courses.length}) `}
      </NavLink>
      {" | "}
      <NavLink to="/authors" activeStyle={activeStyle}>
        Authors
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};

Header.propTypes = {
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
  };
};

const mapDispathToProps = {
  loadCourses,
};

export default connect(mapStateToProps, mapDispathToProps)(Header);
