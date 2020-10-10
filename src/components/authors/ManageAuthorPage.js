import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AuthorForm from "./AuthorForm";
import { newAuthor } from "../../../tools/mockData";
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const ManageAuthorPage = ({
  authors,
  loadAuthors,
  saveAuthor,
  history,
  ...props
}) => {
  const [author, setAuthor] = useState({ ...props.author });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors error " + error);
      });
    } else {
      setAuthor({ ...props.author });
    }
  }, [props.author]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAuthor((prevAuthor) => ({
      ...prevAuthor,
      [name]: value,
    }));
  };

  const formIsValid = () => {
    const { name } = author;
    const errors = {};

    if (!name) errors.name = "Name is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (formIsValid()) {
      setSaving(true);
      saveAuthor(author).then(() => {
        toast.success("Author Saved");
        history.push("/authors");
      });
    }
  };

  return authors.length === 0 ? (
    <Spinner />
  ) : (
    <AuthorForm
      author={author}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
      errors={errors}
    />
  );
};

ManageAuthorPage.propTypes = {
  author: PropTypes.object,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const getAuthorById = (authors, id) => {
  return authors.find((author) => author.id === parseInt(id));
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const author = id ? getAuthorById(state.authors, id) : newAuthor;

  return {
    author,
    authors: state.authors,
  };
};

const mapDispatchToProps = {
  loadAuthors,
  saveAuthor,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
