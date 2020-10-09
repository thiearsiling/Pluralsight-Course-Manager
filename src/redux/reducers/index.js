import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiCallStatus from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallStatus,
});

export default rootReducer;
