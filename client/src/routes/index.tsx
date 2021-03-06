import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import React, { Component } from "react";

import CreateTeam from "../pages/teams/create";
import ShowTeam from "../pages/teams/show";
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

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
                        pathname: "/auth/login",
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
            <Route path="/auth/register" exact component={Register} />
            <Route path="/auth/login" exact component={Login} />
            <Route path="/teams/:id/:channelId?" exact component={ShowTeam} />
            <PrivateRoute path="/teams/create" exact component={CreateTeam} />
        </Switch>
    </Router>
);

export default Routes;
