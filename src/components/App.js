import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursePage from "./courses/ManageCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthorsPage from "./authors/AuthorsPage";
import ManageAuthorPage from "./authors/ManageAuthorPage";

const App = () => {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/courses" component={CoursesPage}></Route>
        <Route path="/course/:slug" component={ManageCoursePage}></Route>
        <Route path="/course/" component={ManageCoursePage}></Route>
        <Route path="/authors" component={AuthorsPage} />
        <Route path="/author" component={ManageAuthorPage} />
        <Route path="/about" component={AboutPage}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>

      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
};

export default App;
