import React, { useContext, useEffect, useState, useMemo } from "react"
import { ExpenseContext } from "./ExpenseProvider.js"
import { useTable } from "react-table";

export const ExpenseList = (props) => {
    const { expenses, getExpenses } = useContext(ExpenseContext)
    const [data, setData] = useState([]);

    useEffect(() => {
        getExpenses()
    }, [])


    useEffect(() => {
        setData(expenses);
    }, []);

    // const data = React.useMemo(expenses)
    console.log(data, "data")

    const columns = 
        useMemo(
            () => [
                    {
                        id: 1,
                        columns: [
                            {
                                Header: "Date",
                                accessor: "date_purchased"
                            },
                            {
                                Header: "Supply Type",
                                accessor: "supply_type.name"
                            },
                            {
                                Header: "Amount Spend",
                                accessor: "cost"
                            },
                            {
                                Header: "Receipt Image",
                                accessor: "image"
                            },
                        ],
                    }
            ],
            []
    );
    
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
        } = useTable({
        columns,
        data
        });

    return (
        <table {...getTableProps()}>
            <thead>
                <tr>
                {columns.map(column => (
                    column.columns.map(c => (
                        <th>{c.Header}</th>
                    ))
                    ))}
                </tr>
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                prepareRow(row);
                return (
                <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                </tr>
                );
                })}
            </tbody>
        </table>
        )
}