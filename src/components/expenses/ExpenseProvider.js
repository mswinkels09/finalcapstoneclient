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
    const addExpense = expense => {
        return fetch("http://localhost:8000/expenses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            },
            body: JSON.stringify(expense)
        })
            .then(getExpenses)
    }

    return (
        <ExpenseContext.Provider value={{ expenses, getExpenses, addExpense }} >
            { props.children }
        </ExpenseContext.Provider>
    )
}