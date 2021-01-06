import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <div className="navbar sidebar" id="navbar">

            <div className="logo">Logo Goes Here</div>
            <div className="navbar__mainlinks">
                <div className="navbar__item_main">
                    <button className="nav-button "
                            onClick={() => {
                                props.history.push({ pathname: "/" })
                            }}
                        >Dashboard</button>
                </div>
                <div className="navbar__item_main">
                    <button className="nav-button "
                            onClick={() => {
                                props.history.push({ pathname: "/profit" })
                            }}
                        >Sales/Profit</button>
                </div>
                <div className="navbar__item_main">
                    <button className="nav-button "
                            onClick={() => {
                                props.history.push({ pathname: "/listeditems" })
                            }}
                        >Listed Items</button>
                </div>
                <div className="navbar__item_main">
                <button className="nav-link " width="130"
                            onClick={() => {
                                props.history.push({ pathname: "/solditems" })
                            }}
                        >Sold Items</button>
                </div>
                <div className="navbar__item_main">
                <button className="nav-link "
                            onClick={() => {
                                props.history.push({ pathname: "/expenses" })
                            }}
                        >Expenses</button>
                </div>
            </div>
            <div className="navbar__item_add">
                <div className="navbar__item">
                    <button className="nav-link" onClick={() => {
                        props.history.push({ pathname: "/newitem" })
                    }}>Add Item</button>
                </div>
                <div className="navbar__item">
                    <button className="nav-link" onClick={() => {
                        props.history.push({ pathname: "/addexpense" })
                    }}>Add Expense</button>
                </div>
            </div>
            {
                (localStorage.getItem("user_token") !== null) ?
                    <div className="nav-item logout">
                        <button className="nav-link "
                            onClick={() => {
                                localStorage.removeItem("user_token")
                                props.history.push({ pathname: "/login" })
                            }}
                        >Logout</button>
                    </div> :
                    <>
                        <div className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </div>
                        <div className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </div>
                    </>
            }        </div>
    )
}