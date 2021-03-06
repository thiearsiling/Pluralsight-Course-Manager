import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AuthorsList = ({ authors, onDeleteClick }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => {
          return (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>
                <Link to={"/author/" + author.id}>{author.name}</Link>
              </td>
              <td className="">
                <button
                  className="btn btn-outline-danger float-right"
                  onClick={() => onDeleteClick(author)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

AuthorsList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default AuthorsList;
