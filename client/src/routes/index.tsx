import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import CreateTeam from "../pages/teams/create";

const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/teams/create" exact component={CreateTeam} />
        </Switch>
    </Router>
);

export default Routes;
