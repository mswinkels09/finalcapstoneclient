import React, { useState } from "react"

export const ProfitContext = React.createContext()

export const ProfitProvider = (props) => {
    const [profitListingTypes, setProfitListingTypes] = useState([])
    const [profitCategories, setProfitCategories] = useState([])


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

    return (
        <ProfitContext.Provider value={{ profitListingTypes, getProfitByListingType, profitCategories, getProfitByCategories}} >
            { props.children }
        </ProfitContext.Provider>
    )

}