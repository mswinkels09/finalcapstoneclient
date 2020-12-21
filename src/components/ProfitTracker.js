import React from "react"
import "./ProfitTracker.css"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const ProfitTracker = (props) => (
    <>
        <Route render={() => {
            if (localStorage.getItem("user_token")) {
                return <>
                    <Route render={NavBar} />
                    <div className="content_body">
                        <Route render={props => <ApplicationViews {...props} />} />
                    </div>
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={Login} />
        <Route path="/register" render={Register} />
    </>
)