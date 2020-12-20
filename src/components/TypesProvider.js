import React, { useState } from "react"

export const TypesContext = React.createContext()

export const TypesProvider = (props) => {
    const [ categories, setCategories ] = useState([])
    const [ supplyTypes, setSupplyTypes ] = useState([])
    const [ listingTypes, setListingTypes ] = useState([])
    const [ weightTypes, setWeightTypes ] = useState([])

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setCategories)
    }

    const getSupplyTypes = () => {
        return fetch("http://localhost:8000/supply_types", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setSupplyTypes)
    }
    
    const getListingTypes = () => {
        return fetch("http://localhost:8000/listing_types", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setListingTypes)
    }

    const getWeightTypes = () => {
        return fetch("http://localhost:8000/weight_types", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setWeightTypes)
    }



    return (
        <TypesContext.Provider value={{ categories, getCategories, supplyTypes, getSupplyTypes,
        listingTypes, getListingTypes, weightTypes, getWeightTypes}} >
            { props.children }
        </TypesContext.Provider>
    )
}