import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { ProfitTracker } from "./components/ProfitTracker.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ProfitTracker />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)