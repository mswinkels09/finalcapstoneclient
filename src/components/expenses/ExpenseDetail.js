import React, { useContext, useEffect, useState, useMemo } from "react"
import { ExpenseContext } from "./ExpenseProvider.js"
import "./Expenses.css"

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
    <div className="expensedetail">
        <div className="center_item_details">
            <h3 className="detail__main_title">Expense Detail</h3>
        </div>
        <div className="center_item_details">
            <div className="detail__div">
                <h4 className="detail__title">Supply Type</h4>
                <div className="detail__data">{singleExpense.supply_type.name}</div>
            </div>
        </div>
        <div className="center_item_details">
            <div className="detail__div">
                <h4 className="detail__title">Date Of Purchase</h4>
                <div className="detail__data">{singleExpense.date_purchased}</div>
            </div>
        </div>
        <div className="center_item_details">
            <div className="detail__div">
                <h4 className="detail__title">Total Amount</h4>
                <div className="detail__data">${singleExpense.cost}</div>
            </div>
        </div>
            <div className="expense_detail__buttons center_item_details">
                    <button className="btn btn-3"
                        onClick={() => props.history.push(`/expenses/${singleExpense.id}/edit`)}
                        >Edit</button>
                    <button className="btn" onClick={() => delete_prompt(singleExpense.id)}>Delete</button>
            </div>
    </div>
    )
}