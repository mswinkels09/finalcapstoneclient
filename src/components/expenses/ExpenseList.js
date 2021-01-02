import React, { useContext, useEffect, useState, useMemo } from "react"
import { ExpenseContext } from "./ExpenseProvider.js"
import { Table } from "reactstrap";

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
        <Table bordered responsive>
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
                </tr>
            </thead>
            <tbody>
            {expenses.sort(sortTypes[currentSort].fn).map(e => {
                    return(
                        <tr>
                            <td>{e.date_purchased}</td>
                            <td>{e.supply_type.name}</td>
                            <td>{e.cost}</td>
                            <td><button type="button" onClick={() => props.history.push(`/expenses/${e.id}`)}>View</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}