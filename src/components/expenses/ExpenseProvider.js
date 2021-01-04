import React, { useState } from "react"

export const ExpenseContext = React.createContext()

export const ExpenseProvider = (props) => {
    const [ expenses, setExpenses ] = useState([])
    const [ supplyTypeExpenses, setSupplyTypeExpenses ] = useState([])
    const [ monthExpenses, setMonthExpenses ] = useState([])
    const [singleExpense, setExpense] = useState({supply_type: {}})

    const getExpenses = () => {
        return fetch("http://localhost:8000/expenses", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setExpenses)
    }

    const getExpensesBySupplyType = () => {
        return fetch("http://localhost:8000/expensesbysupplytype", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setSupplyTypeExpenses)
    }

    const getExpensesByMonth = () => {
        return fetch("http://localhost:8000/expensesbymonth", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setMonthExpenses)
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
    const getSingleExpense = (expense) => {
        return fetch(`http://localhost:8000/expenses/${expense}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }})
            .then(res => res.json())
            .then(setExpense)
    }

    const editExpense = expense => {
        return fetch(`http://localhost:8000/expenses/${expense.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            },
            body: JSON.stringify(expense)
        })
            .then(getExpenses)
    }

    const deleteExpense = expenseId => {
        return fetch(`http://localhost:8000/expenses/${expenseId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            },
        })
            .then(getExpenses)
    }

    return (
        <ExpenseContext.Provider value={{ expenses, getExpenses, addExpense, singleExpense, 
        getSingleExpense, editExpense, deleteExpense, getExpensesBySupplyType, supplyTypeExpenses, getExpensesByMonth, monthExpenses }} >
            { props.children }
        </ExpenseContext.Provider>
    )
}