import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadAuthors, deleteAuthor } from "../../redux/actions/authorActions";
import Spinner from "../common/Spinner";
import AuthorsList from "./AuthorsList";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const AuthorsPage = ({
  authors,
  loadAuthors,
  deleteAuthor,
  courses,
  loading,
}) => {
  const [redirectToAddAuthorPage, setRedirectToAddAuthorPage] = useState(false);
  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed " + error);
      });
    }
  }, []);

  const handleDeleteAuthor = (author) => {
    if (courses.length > 0) {
      if (courses.find((c) => c.authorId === author.id) !== undefined) {
        toast.error("This author have courses. It's not possible to delete it");
      } else {
        toast.success("Author deleted");
        deleteAuthor(author).catch((error) => {
          toast.error("Delete failed. " + error.message, { autoClose: false });
        });
      }
    }
  };
  return (
    <React.Fragment>
      {redirectToAddAuthorPage && <Redirect to="/author" />}
      <h2>Authors</h2>
      <hr />
      <button
        className="btn btn-primary"
        style={{ marginBottom: 20 }}
        onClick={() => setRedirectToAddAuthorPage(true)}
      >
        Add Author
      </button>
      {loading ? (
        <Spinner />
      ) : (
        <AuthorsList authors={authors} onDeleteClick={handleDeleteAuthor} />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    authors: state.authors,
    courses: state.courses,
    loading: state.apiCallStatus > 0,
  };
};

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
  loadAuthors,
  deleteAuthor,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
