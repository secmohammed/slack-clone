import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import CreateTeam from "../pages/teams/create";
//@ts-ignore
const PrivateRoute = ({ component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem("token") ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);
const Routes = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/teams/create" exact component={CreateTeam} />
        </Switch>
    </Router>
);

export default Routes;
