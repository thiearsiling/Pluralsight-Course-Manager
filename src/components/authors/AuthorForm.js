import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const AuthorForm = ({
  author,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{author.id ? "Edit" : "Add"} Author</h2>
      <hr />
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={author.name}
        onChange={onChange}
        error={errors.name}
      />

      {saving ? (
        <button type="submit" disabled className="btn btn-success">
          Saving...
        </button>
      ) : (
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      )}
    </form>
  );
};

AuthorForm.propTypes = {
  author: PropTypes.object,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default AuthorForm;
