import React, { useContext, useEffect, useState, useMemo } from "react"
import { ExpenseContext } from "./ExpenseProvider.js"

export const ExpenseDetails = (props) => {
    const { singleExpense, getSingleExpense, deleteExpense } = useContext(ExpenseContext)

    useEffect(() => {
        const expenseId = parseInt(window.location.pathname.split('/')[2])
        getSingleExpense(expenseId)
    }, {})

    console.log(singleExpense)

    const delete_prompt = (id) => {
        var retVal = window.confirm("This action will permanently delete the expense. Are you sure?");
        if( retVal == true ) {
            deleteExpense(id)
            props.history.push("/expenses")
            return true;
        } else {
            return false;
        }
    }

    return (
    <>
        <h3>Expense Detail</h3>
            <h4>Supply Type</h4>
            <div>{singleExpense.supply_type.name}</div>
            <h4>Date Of Purchase</h4>
            <div>{singleExpense.date_purchased}</div>
            <h4>Total Amount</h4>
            <div>{singleExpense.cost}</div>
            <div className="expense__edit">
                <button className="btn btn-3"
                    onClick={() => props.history.push(`/expenses/${singleExpense.id}/edit`)}
                    >Edit</button></div>
            <button className="btn" onClick={() => delete_prompt(singleExpense.id)}>Delete</button>
    </>
    )
}