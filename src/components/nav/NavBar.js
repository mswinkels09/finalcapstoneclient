import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="nav-link" to="/listeditems">Listed Items</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/solditems">Sold Items</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/expenses">Expenses</Link>
            </li>
            {
                (localStorage.getItem("user_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("user_token")
                                props.history.push({ pathname: "/login" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}