import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Header = ({ courses }) => {
  const activeStyle = { color: "#F15B2A" };

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
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
  };
};

export default connect(mapStateToProps)(Header);
