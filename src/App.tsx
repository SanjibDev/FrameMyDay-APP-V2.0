import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./public/components/Login/Login";
import Registration from "./public/components/Registration/Registration";
import AboutUs from "./public/components/AboutUs/AboutUs";
import Terms from "./public/components/Terms/Terms";
import PrivacyPolicy from "./public/components/PrivacyPolicy/PrivacyPolicy";
import ContactUs from "./public/components/ContactUs/ContactUs";
import Dashboard from "./main/components/Dashboard/Dashboard";
import MyProfile from "./main/components/MyProfile/MyProfile";
import RequirementPush from "./main/components/RequirementPush/RequirementPush";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/login" />;
          }}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/privacypolicy" component={PrivacyPolicy} />
        <Route exact path="/aboutus" component={AboutUs} />
        <Route exact path="/contactus" component={ContactUs} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/myprofile" component={MyProfile} />
        <Route exact path="/requirement" component={RequirementPush} />
      </Switch>
    </Router>
  );
};

export default App;
