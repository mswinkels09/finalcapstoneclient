import React, { useContext, useEffect, useState, useMemo } from "react"
import { ExpenseContext } from "./ExpenseProvider.js"
import { Table, Button } from "reactstrap";
import {ExpenseChart} from "./ExpenseChart"
import "./Expenses.css"

export const ExpenseList = (props) => {
    const { expenses, getExpenses } = useContext(ExpenseContext)

    const[currentSort, setCurrentSort] = useState(('default'))

    useEffect(() => {
        getExpenses()
    }, [])


    const sortTypes = {
        up: {
            class: 'sort-up',
            fn: (a, b) => a.cost - b.cost || a.date_purchased - b.date_purchased
        },
        down: {
            class: 'sort-down',
            fn: (a, b) => b.cost - a.cost || b.date_purchased - a.date_purchased
        },
        default: {
            class: 'sort',
            fn: (a, b) => a
        }
    };



    const onSortChange = () => {
        if (currentSort === 'down')
            setCurrentSort('up');
        else if (currentSort === 'up') 
            setCurrentSort('default');
        else if (currentSort === 'default') 
            setCurrentSort('down');
    };
    
    return(
        <div className="expense__main">
            <div className="chart__main_expense">
                <ExpenseChart {...props} />
            </div>
            <div className="expense__main">
                <div className="table__main_expense table__main">
                    <div className="table__title">EXPENSES</div>
                    <Table className="table__main_expenses" bordered responsive>
                        <thead>
                            <tr>
                                <th>
                                    Date
                                    <button onClick={onSortChange}>
                                                <i className={`fas fa-${sortTypes[currentSort].class}`} />
                                            </button>
                                </th>
                                <th>Supply Type</th>
                                <th>
                                    Amount Spent
                                    <button onClick={onSortChange}>
                                                <i className={`fas fa-${sortTypes[currentSort].class}`} />
                                            </button>
                                </th>
                                <th>View Expense</th>
                            </tr>
                        </thead>
                        <tbody>
                        {expenses.sort(sortTypes[currentSort].fn).map(e => {
                                return(
                                    <tr>
                                        <td>{e.date_purchased}</td>
                                        <td>{e.supply_type.name}</td>
                                        <td>${e.cost.toFixed(2)}</td>
                                        <td><Button color="success" type="button" onClick={() => props.history.push(`/expenses/${e.id}`)}>View</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}