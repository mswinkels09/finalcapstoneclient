import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import logo from "../images/logo.png"
import { Button } from "reactstrap";

export const NavBar = (props) => {
    return (
        <div className="navbar sidebar" id="navbar">
            <div className="logo">
                <img src={logo} width={140} height={140} alt=""/>
            </div>
            <div className="navbar__mainlinks">
                <div className="navbar__item_main_top">
                    <Button outline color="success" className="nav-button"
                            onClick={() => {
                                props.history.push({ pathname: "/" })
                            }}
                        >Dashboard</Button>
                </div>
                <div className="navbar__item_main">
                    <Button outline color="success" className="nav-button "
                            onClick={() => {
                                props.history.push({ pathname: "/profit" })
                            }}
                        >Sales/Profit</Button>
                </div>
                <div className="navbar__item_main">
                    <Button outline color="success" className="nav-button "
                            onClick={() => {
                                props.history.push({ pathname: "/listeditems" })
                            }}
                        >Listed Items</Button>
                </div>
                <div className="navbar__item_main">
                <Button outline color="success" className="nav-link " width="130"
                            onClick={() => {
                                props.history.push({ pathname: "/solditems" })
                            }}
                        >Sold Items</Button>
                </div>
                <div className="navbar__item_main">
                <Button outline color="success" className="nav-link "
                            onClick={() => {
                                props.history.push({ pathname: "/expenses" })
                            }}
                        >Expenses</Button>
                </div>
            </div>
            <div className="navbar__item_add">
                <div className="navbar__item">
                    <Button outline color="success"className="nav-link" onClick={() => {
                        props.history.push({ pathname: "/newitem" })
                    }}>Add Item</Button>
                </div>
                <div className="navbar__item">
                    <Button outline color="success"className="nav-link" onClick={() => {
                        props.history.push({ pathname: "/addexpense" })
                    }}>Add Expense</Button>
                </div>
            </div>
            {
                (localStorage.getItem("user_token") !== null) ?
                    <div className="nav-item logout">
                        <Button outline color="success"className="nav-link "
                            onClick={() => {
                                localStorage.removeItem("user_token")
                                props.history.push({ pathname: "/login" })
                            }}
                        >Logout</Button>
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