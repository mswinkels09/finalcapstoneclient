import React, { useContext, useEffect, useState, useMemo } from "react"
import { ProfitContext } from "./ProfitProvider.js"
import { Pie, Bar } from "react-chartjs-2";

export const ProfitListingTypeChart = (props) => {
    const { profitListingTypes, getProfitByListingType } = useContext(ProfitContext)

    useEffect(() => {
        getProfitByListingType()
    }, [])

    const labels = profitListingTypes.map(plt => {
        return plt.name
    })

    const data = profitListingTypes.map(plt => {
        return plt.profit
    })
    const piedata = {
        labels: labels,
        datasets: [{
            label: "Listing Types",
            data: data,
            backgroundColor: 
            [
                "rgb(63, 191, 191)", 
                "rgb(63, 63, 191)",
                "rgb(127, 63, 191)",
                "rgb(191, 63, 127)"
            ]
        }]
    }
    
    return (
        <div>
            <h3>Profit By Listing Types</h3>
            <Pie data={piedata} />
        </div>
    )
}

export const ProfitCategoriesChart = (props) => {
    const { profitCategories, getProfitByCategories } = useContext(ProfitContext)

    useEffect(() => {
        getProfitByCategories()
    }, [])

    const labels = profitCategories.map(plt => {
        return plt.name
    })

    const data = profitCategories.map(plt => {
        return plt.profit
    })
    const piedata = {
        labels: labels,
        datasets: [{
            label: "Categories",
            data: data,
            backgroundColor: 
            [
                "rgb(63, 191, 191)", 
                "rgb(63, 63, 191)",
                "rgb(127, 63, 191)",
                "rgb(191, 63, 127)",
                "rgb(191, 63, 63)",
                "rgb(191, 191, 63)",
                "rgb(127, 191, 63)",
                "rgb(63, 191, 63)",
                "rgb(38, 114, 38)"
            ]
        }]
    }
    
    return (
        <div>
            <h3>Profit By Categories</h3>
            <Pie data={piedata} />
        </div>
    )
}

export const ProfitMonthChart = (props) => {
    const { profitMonth, getProfitByMonth } = useContext(ProfitContext)

    useEffect(() => {
        getProfitByMonth()
    }, [])

    const labels = profitMonth.map(pm => {
        const months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];

        var selectedMonthName = months[pm.profitmonth - 1];
        return selectedMonthName
    })

    const data = profitMonth.map(pm => {
        return pm.profit
    })


    const bardata = {
        labels: labels,
        datasets: [{
            label: "Total Profit",
            data: data,
            backgroundColor: "rgb(63, 191, 191)"
        }],
    }

    return (
        <div>
            <h3>Profit By Month</h3>
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

export const ProfitYearChart = (props) => {
    const { profitYear, getProfitByYear } = useContext(ProfitContext)

    useEffect(() => {
        getProfitByYear()
    }, [])

    const labels = profitYear.map(py => {
        return py.profityear
    })

    const data = profitYear.map(py => {
        return py.profit
    })


    const bardata = {
        labels: labels,
        datasets: [{
            label: "Total Profit",
            data: data,
            backgroundColor: "rgb(63, 191, 191)"
        }],
    }

    return (
        <div>
            <h3>Profit By Year</h3>
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