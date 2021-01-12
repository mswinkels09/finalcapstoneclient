import React, { useContext, useEffect, useState} from "react"
import { ExpenseContext } from "../expenses/ExpenseProvider.js"
import { ProfitContext } from "../profit/ProfitProvider.js"
import { SoldItemContext } from "../soldItems/SoldItemProvider.js"
import { Bar } from "react-chartjs-2";
import { ListedItemContext } from "../listedItems/ListedItemProvider.js";
import "./Dashboard.css"

export const DashboardChart = (props) => {
    //CONTEXTS
    const { profitMonth, getProfitByMonth } = useContext(ProfitContext)
    const { monthExpenses, getExpensesByMonth } = useContext(ExpenseContext)
    const { soldItemsByMonth, getSoldItemsByMonth, soldItems, getSoldItems } = useContext(SoldItemContext)
    const {listedItems, getListedItems} = useContext(ListedItemContext)

    //STATE
    const [profitTotal, setProfitTotal] = useState([])
    const [profitArray, setProfitArray] = useState(profitMonth)

    const [expenseTotal, setExpenseTotal] = useState([])
    const [expenseArray, setExpenseArray] = useState(monthExpenses)

    const [grossProfit, setGrossProfit] = useState([])

    //GET FUNCTIONS
    useEffect(() => {
        getProfitByMonth()
        getExpensesByMonth()
        getSoldItemsByMonth()
        getSoldItems()
        getListedItems()
    }, [])
    
    // will use to set most recent sold item
    // const [sortedSoldItem, setSortedSoldItem] = useState([])
    // useEffect(() => {
    //     const sortedSoldItemsArray = soldItems.sort((a,b) => {
    //         var dateA = new Date(a.sold_date);
    //         var dateB = new Date(b.sold_date);
    //         return dateB - dateA;})
    //         setSortedSoldItem(sortedSoldItemsArray[0])
    // }, [])

    //TOTAL PROFIT
    //makes a copy of profitMonth array and only adds the profit attribute to the array
    //sets new array into state
    useEffect(() => {
        const profitarray = profitMonth.slice().map(pa => pa.profit)
            setProfitArray(profitarray)
    }, [profitMonth])

    //adds all profit in that array and sets it to profitTotal
    useEffect(() => {
        const totalProfitObj = profitArray.reduce((a,b) => a+b, 0)
        setProfitTotal(roundTo2(totalProfitObj))
    }, [profitArray])


    //TOTAL EXPENSES
    //makes a copy of monthExpenses array and only adds the totalexpense attribute to the array
    //sets new array into state
    useEffect(() => {
        const expensearray = monthExpenses.slice().map(pa => pa.totalexpense)
            setExpenseArray(expensearray)
    }, [monthExpenses])

    //adds all totalexpense in that array and sets it to expenseTotal
    useEffect(() => {
        const totalExpenseObj = expenseArray.reduce((a,b) => a+b, 0)
        setExpenseTotal(roundTo2(totalExpenseObj))
    }, [expenseArray])

    //TOTAL GROSS PROFIT
    //takes the difference between the two totals and sets it to grossProfit
    useEffect(() => {
        const totalGrossProfit = profitTotal - expenseTotal
        setGrossProfit(roundTo2(totalGrossProfit))
    }, [profitTotal, expenseTotal])

    //function that changes a value to have a 2 decimal values
    const roundTo2 = (value) => {
        if(value > 0){
            const newValue = parseFloat(value.toFixed(2))
            return newValue
        }
        else return 0
    }

    const numberOfListedItems = listedItems.length
    const numberOfSoldItems = soldItems.length
    const totalNumberOfItems = numberOfListedItems + numberOfSoldItems

    const months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ];
    
    const profitlabels = profitMonth.map(pm => {
        var selectedMonthName = months[pm.profitmonth - 1];
        return selectedMonthName
    })

    //TOTAL PROFIT AND EXPENSE BAR GRAPH
    //x axis of the Expense and Profit Chart
    const expenselabels = monthExpenses.map(em => {
        var selectedMonthName = months[em.expensemonth - 1];
        return selectedMonthName
    })

    //y axis data points for total profit
    const profitdata = profitMonth.map(pm => {
            return roundTo2(pm.profit)
    })

    //y axis data points for total expenses
    const expensedata = monthExpenses.map(em => {
        return roundTo2(em.totalexpense)
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

    //TOTAL SOLD ITEMS BAR GRAPH
    //x axis of the total sold items chart
    const monthlabels = soldItemsByMonth.map(sibm => {
        var selectedMonthName = months[sibm.soldItemMonth - 1];
        return selectedMonthName
    })

    //y axis data points for total number of sold items
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
                <div className="totals_div">
                    <div className="totals__div">
                        <div className="total__div">TOTAL PROFIT OF 2021: <div className="total__data">${profitTotal}</div></div>
                    </div>
                    <div className="totals__div">
                        <div className="total__div">TOTAL EXPENSES OF 2021: <div className="total__data">${expenseTotal}</div></div>
                    </div>
                    <div className="totals__div">
                        <div className="total__div">TOTAL GROSS PROFIT OF 2021: <div className="total__data">${grossProfit}</div></div>
                    </div>
                </div>
                <div className="number_lists">
                    <div className="number_list">TOTAL NUMBER OF <strong>ITEMS</strong>: {totalNumberOfItems}</div>
                    <div className="number_list">TOTAL NUMBER OF <strong>LISTED ITEMS</strong>: {numberOfListedItems}</div>
                    <div className="number_list">TOTAL NUMBER OF <strong>SOLD ITEMS</strong>: {numberOfSoldItems}</div>
                    <div>
                    </div>
                </div>
            </div>
            <div className="dashboard__right">
                <div className="chart__main_dashboard">
                    <div className="chart__div_dashboard">
                        <h3 className="chart__title">Profit and Expenses By Month</h3>
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