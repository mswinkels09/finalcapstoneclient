import React, { useContext, useEffect, useState, useMemo } from "react"
import { ExpenseContext } from "./ExpenseProvider.js"

export const ExpenseDetails = (props) => {
    const { singleExpense, getSingleExpense } = useContext(ExpenseContext)

    useEffect(() => {
        const expenseId = parseInt(window.location.pathname.split('/')[2])
        getSingleExpense(expenseId)
    })

    console.log(singleExpense)

    return (
    <>
        <h3>Expense Detail</h3>
            <h4>Supply Type</h4>
            <div>{singleExpense.supply_type.name}</div>
            <h4>Date Of Purchase</h4>
            <div>{singleExpense.date_purchased}</div>
            <h4>Total Amount</h4>
            <div>{singleExpense.cost}</div>
    </>
    )
}