import React, { useState } from "react"

export const ExpenseContext = React.createContext()

export const ExpenseProvider = (props) => {
    const [ expenses, setExpenses ] = useState([])

    const getExpenses = () => {
        return fetch("http://localhost:8000/expenses", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setExpenses)
    }

    return (
        <ExpenseContext.Provider value={{ expenses, getExpenses }} >
            { props.children }
        </ExpenseContext.Provider>
    )
}