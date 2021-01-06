import React, { useContext, useEffect, useState} from "react"
import { ExpenseContext } from "../expenses/ExpenseProvider.js"
import { ProfitContext } from "../profit/ProfitProvider.js"
import { SoldItemContext } from "../soldItems/SoldItemProvider.js"
import { Bar } from "react-chartjs-2";
import { ListedItemContext } from "../listedItems/ListedItemProvider.js";
import "./Dashboard.css"

export const DashboardChart = (props) => {
    const { profitMonth, getProfitByMonth } = useContext(ProfitContext)
    const { monthExpenses, getExpensesByMonth } = useContext(ExpenseContext)
    const { soldItemsByMonth, getSoldItemsByMonth, soldItems, getSoldItems } = useContext(SoldItemContext)
    const {listedItems, getListedItems} = useContext(ListedItemContext)

    
    const [sortedSoldItem, setSortedSoldItem] = useState([])

    useEffect(() => {
        getProfitByMonth()
        getExpensesByMonth()
        getSoldItemsByMonth()
        getSoldItems()
        getListedItems()
    }, [])

    useEffect(() => {
        const sortedSoldItemsArray = soldItems.sort((a,b) => {
            var dateA = new Date(a.sold_date);
            var dateB = new Date(b.sold_date);
            return dateB - dateA;})
            setSortedSoldItem(sortedSoldItemsArray[0])
    }, [])


    const soldDate = sortedSoldItem.sold_date
    const todaysDate = new Date().toISOString().slice(0,10)

    const numberOfDays = soldDate - todaysDate


    console.log(soldDate)


    const numberOfListedItems = listedItems.length
    const numberOfSoldItems = soldItems.length
    const totalNumberOfItems = numberOfListedItems + numberOfSoldItems

    const months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];
    
    const profitlabels = profitMonth.map(pm => {
        var selectedMonthName = months[pm.profitmonth - 1];
        return selectedMonthName
    })

    const expenselabels = monthExpenses.map(em => {
        var selectedMonthName = months[em.expensemonth - 1];
        return selectedMonthName
    })

    const profitdata = profitMonth.map(pm => {
            return pm.profit
    })

    const expensedata = monthExpenses.map(em => {
        return em.totalexpense
    })

    const profitexpensebardata = {
        labels: expenselabels,
        datasets: [{
            label: "Total Profit",
            data: profitdata,
            backgroundColor: "rgb(63, 191, 191)"
        },
        {
            label: "Total Expense",
            data: expensedata,
            backgroundColor: "rgb(0,0,139)"
        } 
    ],
    }


    const monthlabels = soldItemsByMonth.map(sibm => {
        var selectedMonthName = months[sibm.soldItemMonth - 1];
        return selectedMonthName
    })

    const solditemdata = soldItemsByMonth.map(sibm => {
            return sibm.totalitems
    })

    const monthbardata = {
        labels: monthlabels,
        datasets: [{
            label: "Total Number Of Items",
            data: solditemdata,
            backgroundColor: "rgb(63, 191, 191)"
        }
    ],
    }

    return (
        <div className="dashboard__main">
            <div className="dashboard__left">

                <div className="number_lists">
                    <h5 className="number_list">TOTAL NUMBER OF ITEMS: {totalNumberOfItems}</h5>
                    <h5 className="number_list">TOTAL NUMBER OF LISTED ITEMS: {numberOfListedItems}</h5>
                    <h5 className="number_list">TOTAL NUMBER OF SOLD ITEMS: {numberOfSoldItems}</h5>
                    <div>
                    </div>
                </div>
            </div>
            <div className="dashboard__right">
                <div className="chart__main_dashboard">
                    <div className="chart__div_dashboard">
                        <h3 className="chart__title">Profit By Month</h3>
                        <Bar
                            data={profitexpensebardata}
                            height={170}
                            options={{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                },
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                    <div className="chart__div_dashboard">
                        <h3 className="chart__title">Number Of Sold Items By Month</h3>
                        <Bar
                            data={monthbardata}
                            height={120}
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
            </div>
        </div>
    )
}