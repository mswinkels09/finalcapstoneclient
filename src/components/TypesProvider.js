import React, { useState } from "react"
import settings from "Settings.js"

export const TypesContext = React.createContext()

export const TypesProvider = (props) => {
    const [ categories, setCategories ] = useState([])
    const [ supplyTypes, setSupplyTypes ] = useState([])
    const [ listingTypes, setListingTypes ] = useState([])
    const [ weightTypes, setWeightTypes ] = useState([])

    const getCategories = () => {
        return fetch(`${settings.remoteUrl}/categories`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setCategories)
    }

    const getSupplyTypes = () => {
        return fetch(`${settings.remoteUrl}/supply_types`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setSupplyTypes)
    }
    
    const getListingTypes = () => {
        return fetch(`${settings.remoteUrl}/listing_types`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setListingTypes)
    }

    const getWeightTypes = () => {
        return fetch(`${settings.remoteUrl}/weight_types`, {
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