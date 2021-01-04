import React, { useState } from "react"

export const ProfitContext = React.createContext()

export const ProfitProvider = (props) => {
    const [profitListingTypes, setProfitListingTypes] = useState([])
    const [profitCategories, setProfitCategories] = useState([])
    const [profitMonth, setProfitMonth] = useState([])
    const [profitYear, setProfitYear] = useState([])


    const getProfitByListingType = () => {
        return fetch("http://localhost:8000/profitbylistingtype", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setProfitListingTypes)
    }

    const getProfitByCategories = () => {
        return fetch("http://localhost:8000/profitbycategories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setProfitCategories)
    }

    const getProfitByMonth = () => {
        return fetch("http://localhost:8000/profitbymonth", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setProfitMonth)
    }

    const getProfitByYear = () => {
        return fetch("http://localhost:8000/profitbyyear", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setProfitYear)
    }

    return (
        <ProfitContext.Provider value={{ profitListingTypes, getProfitByListingType, profitCategories, 
        getProfitByCategories, getProfitByMonth, profitMonth, profitYear, getProfitByYear}} >
            { props.children }
        </ProfitContext.Provider>
    )

}