import React, { useContext, useEffect, useState, useMemo } from "react"
import { ExpenseContext } from "./ExpenseProvider.js"
import { Table } from "reactstrap";

export const ExpenseList = (props) => {
    const { expenses, getExpenses } = useContext(ExpenseContext)

    useEffect(() => {
        getExpenses()
    }, [])

    return(
        <Table bordered responsive>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Supply Type</th>
                    <th>Amount Spent</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map(e => {
                    return(
                        <tr>
                            <td>{e.date_purchased}</td>
                            <td>{e.supply_type.name}</td>
                            <td>{e.cost}</td>
                            <td><button>View</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}