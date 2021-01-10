import React, { useContext, useEffect, useState, useMemo } from "react"
import { ExpenseContext } from "./ExpenseProvider.js"
import { Pie, Bar } from "react-chartjs-2";
import "./Expenses.css";

export const ExpenseChart = (props) => {
    const { supplyTypeExpenses, getExpensesBySupplyType } = useContext(ExpenseContext)
    const { monthExpenses, getExpensesByMonth } = useContext(ExpenseContext)

    useEffect(() => {
        getExpensesBySupplyType()
        getExpensesByMonth()
    }, [])

    const supplytypelabels = supplyTypeExpenses.map(ste => {
        if(ste.supply_type_id === 1){
            return 'Supplies'
        } else return 'Inventory'
    })

    const supplytypedata = supplyTypeExpenses.map(ste => {
        return ste.totalexpense.toFixed(2)
    })
    
    const piedata = {
        labels: supplytypelabels,
        datasets: [{
            label: "Supply Types",
            data: supplytypedata,
            backgroundColor: ["rgb(63, 191, 191)", "rgb(63, 63, 191)"]
        }]
    }

    const monthlabels = monthExpenses.map(me => {
        const months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];

        var selectedMonthName = months[me.expensemonth - 1];
        return selectedMonthName
    })

    const monthdata = monthExpenses.map(me => {
        return me.totalexpense.toFixed(2)
    })


    const bardata = {
        labels: monthlabels,
        datasets: [{
            label: "Total Expenses",
            data: monthdata,
            backgroundColor: "rgb(63, 191, 191)"
        }],
    }

    return (
    <div className="expensechart">
        <div className="chart__div_expense chart__div_expense_pie">
            <h4 className="chart__title">Expenses By Supply Type</h4>
            <Pie data={piedata} />
        </div>
        <div className="chart__div_expense chart__div_expense_bar">
            <h4 className="chart__title">Expenses By Month</h4>
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
    </div>
    )
}