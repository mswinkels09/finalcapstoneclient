import React, { useContext, useEffect, useState, useMemo } from "react"
import { ProfitContext } from "./ProfitProvider.js"
import { Pie, Bar } from "react-chartjs-2";
import { OutlinedInput } from "@material-ui/core";
import "./Profit.css"

export const ProfitChart = (props) => {
    const { profitListingTypes, getProfitByListingType, profitCategories, getProfitByCategories, profitMonth, getProfitByMonth, profitYear, getProfitByYear } = useContext(ProfitContext)

    useEffect(() => {
        getProfitByListingType()
        getProfitByCategories()
        getProfitByMonth()
        getProfitByYear()
    }, [])

    const listingtypeslabels = profitListingTypes.map(plt => {
        return plt.name
    })

    const listingtypesdata = profitListingTypes.map(plt => {
        if (plt.profit != null) {
            return plt.profit.toFixed(2)
        }
    })
    const listingtypepiedata = {
        labels: listingtypeslabels,
        datasets: [{
            label: "Listing Types",
            data: listingtypesdata,
            backgroundColor:
                [
                    "rgb(63, 191, 191)",
                    "rgb(63, 63, 191)",
                    "rgb(127, 63, 191)",
                    "rgb(191, 63, 127)"
                ]
        }]
    }

    const categorieslabels = profitCategories.map(plt => {
        return plt.name
    })

    const categoriesdata = profitCategories.map(plt => {
        if (plt.profit != null) {
            return plt.profit.toFixed(2)
        }
    })
    const categoriespiedata = {
        labels: categorieslabels,
        datasets: [{
            label: "Categories",
            data: categoriesdata,
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

    const monthlabels = profitMonth.map(pm => {
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        var selectedMonthName = months[pm.profitmonth - 1];
        return selectedMonthName
    })

    const monthdata = profitMonth.map(pm => {
            return pm.profit.toFixed(2)
    })

    const monthbardata = {
        labels: monthlabels,
        datasets: [{
            label: "Total Profit",
            data: monthdata,
            backgroundColor: "rgb(63, 191, 191)"
        }],
    }


    const yearlabels = profitYear.map(py => {
        return py.profityear
    })

    const yeardata = profitYear.map(py => {
        return py.profit.toFixed(2)
    })

    const yearbardata = {
        labels: yearlabels,
        datasets: [{
            label: "Total Profit",
            data: yeardata,
            backgroundColor: "rgb(63, 191, 191)"
        }],
    }

    return (
        <>
        <div className="profit__main">
            <div className="chart__main_profit">
                <div className="chart__bar">
                    <div className="chart__div_profit">
                        <h3 className="chart__title">Profit By Month</h3>
                        <Bar
                            data={monthbardata}
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
                    <div className="chart__div_profit">
                        <h3 className="chart__title">Profit By Year</h3>
                        <Bar
                            data={yearbardata}
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
                <div className="chart__pie">
                    <div className="chart__div_profit">
                        <h3 className="chart__title">Profit By Listing Types</h3>
                        <Pie data={listingtypepiedata} />
                    </div>
                    <div className="chart__div_profit">
                        <h3 className="chart__title">Profit By Categories</h3>
                        <Pie data={categoriespiedata} />
                    </div>
                </div>
            </div>
        </div>
            
        </>
    )
}