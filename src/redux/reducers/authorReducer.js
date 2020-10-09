import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.payload;
    case types.CREATE_AUTHOR_SUCCESS:
      return [...state, { ...action.payload }];
    case types.UPDATE_AUTHOR_SUCCESS:
      return state.map((author) =>
        author.id === action.payload.id ? action.payload : author
      );
    case types.DELETE_AUTHOR_OPTIMISTIC:
      return state.filter((author) => author.id !== action.payload.id);
    default:
      return state;
  }
}
