import React, { useContext, useEffect, useState, useMemo } from "react"
import { ProfitContext } from "./ProfitProvider.js"
import { Pie } from "react-chartjs-2";

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