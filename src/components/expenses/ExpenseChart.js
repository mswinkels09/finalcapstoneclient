import React, { useContext, useEffect, useState, useMemo } from "react"
import { ExpenseContext } from "./ExpenseProvider.js"
import { Pie, Bar } from "react-chartjs-2";

export const ExpenseSupplyTypeChart = (props) => {
    const { supplyTypeExpenses, getExpensesBySupplyType } = useContext(ExpenseContext)

    useEffect(() => {
        getExpensesBySupplyType()
    }, [])

    const labels = supplyTypeExpenses.map(ste => {
        return ste.name
    })

    const data = supplyTypeExpenses.map(ste => {
        return ste.expense
    })
    const piedata = {
        labels: labels,
        datasets: [{
            label: "Supply Types",
            data: data,
            backgroundColor: ["rgb(63, 191, 191)", "rgb(63, 63, 191)"]
        }]
    }

    return (
        <div>
            <h3>Expenses By Supply Type</h3>
            <Pie data={piedata} />
        </div>
    )
}

export const ExpenseMonthChart = (props) => {
    const { monthExpenses, getExpensesByMonth } = useContext(ExpenseContext)

    useEffect(() => {
        getExpensesByMonth()
    }, [])

    const labels = monthExpenses.map(me => {
        const months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];

        var selectedMonthName = months[me.expensemonth - 1];
        return selectedMonthName
    })

    const data = monthExpenses.map(me => {
        return me.totalexpense
    })


    const bardata = {
        labels: labels,
        datasets: [{
            label: "Total Expenses",
            data: data,
            backgroundColor: "rgb(63, 191, 191)"
        }],
    }

    return (
        <div>
            <h3>Expenses By Month</h3>
            <Bar
                data={bardata}
                options={{
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        </div>
    )
}