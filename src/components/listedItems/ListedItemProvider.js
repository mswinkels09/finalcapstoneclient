import React, { useState } from "react"
import settings from "../Settings.js"

export const ListedItemContext = React.createContext()

export const ListedItemProvider = (props) => {
    const [ listedItems, setListedItems ] = useState([])
    const [singleListedItem, setSingleListedItem] = useState({category: {}, listing_type: {}, weight_type: {}})

    const getListedItems = () => {
        return fetch(`${settings.remoteUrl}/listeditems`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setListedItems)
    }

    const addItem = item => {
        return fetch(`${settings.remoteUrl}/listeditems`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            },
            body: JSON.stringify(item)
        })
            .then(getListedItems)
    }

    const editListedItem = item => {
        return fetch(`${settings.remoteUrl}/listeditems/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            },
            body: JSON.stringify(item)
        })
            .then(getListedItems)
    }

    const getSingleListedItem = (item) => {
        return fetch(`${settings.remoteUrl}/listeditems/${item}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }})
            .then(res => res.json())
            .then(setSingleListedItem)
    }
    
    const deleteListedItem = (itemId) => {
        return fetch(`${settings.remoteUrl}/listeditems/${itemId}`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            },
        })
            .then(setSingleListedItem)
    }

    return (
        <ListedItemContext.Provider value={{ listedItems, getListedItems, addItem, getSingleListedItem, 
        singleListedItem, deleteListedItem, editListedItem }} >
            { props.children }
        </ListedItemContext.Provider>
    )
}