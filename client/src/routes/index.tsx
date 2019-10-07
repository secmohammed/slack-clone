import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
        </Switch>
    </Router>
);

export default Routes;
