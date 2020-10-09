import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, payload: authors };
}

export function createAuthorSuccess(author) {
  return { type: types.CREATE_AUTHOR_SUCCESS, payload: author };
}

export function updateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHOR_SUCCESS, payload: author };
}

export function deleteAuthorOptimistic(author) {
  return { type: types.DELETE_AUTHOR_OPTIMISTIC, payload: author };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveAuthor(author) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .saveAuthor(author)
      .then((savedAuthor) => {
        author.id
          ? dispatch(updateAuthorSuccess(savedAuthor))
          : dispatch(createAuthorSuccess(savedAuthor));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteAuthor(author) {
  return function (dispatch) {
    dispatch(deleteAuthorOptimistic(author));
    return authorApi.deleteAuthor(author.id);
  };
}
