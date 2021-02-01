import React, { useState } from "react"
import settings from "../Settings.js"

export const SoldItemContext = React.createContext()

export const SoldItemProvider = (props) => {
    const [ soldItems, setSoldItems ] = useState([])
    const [ soldItemsByMonth, setSoldItemsByMonth ] = useState([])
    const [singleSoldItem, setSingleSoldItem] = useState({category: {}, listing_type: {}})

    const getSoldItems = () => {
        return fetch(`${settings.remoteUrl}/solditems`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setSoldItems)
    }

    const getSoldItemsByMonth = () => {
        return fetch(`${settings.remoteUrl}/solditemsbymonth`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setSoldItemsByMonth)
    }

    const getSingleSoldItem = (item) => {
        return fetch(`${settings.remoteUrl}/solditems/${item}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }})
            .then(res => res.json())
            .then(setSingleSoldItem)
    }

    const editSoldItem = item => {
        return fetch(`${settings.remoteUrl}/solditems/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            },
            body: JSON.stringify(item)
        })
            .then(getSoldItems)
    }

    return (
        <SoldItemContext.Provider value={{ soldItems, getSoldItems, getSingleSoldItem, singleSoldItem, editSoldItem, soldItemsByMonth, getSoldItemsByMonth }} >
            { props.children }
        </SoldItemContext.Provider>
    )
}