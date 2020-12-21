import React, { useState } from "react"

export const ListedItemContext = React.createContext()

export const ListedItemProvider = (props) => {
    const [ listedItems, setListedItems ] = useState([])

    const getListedItems = () => {
        return fetch("http://localhost:8000/listeditems", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setListedItems)
    }

    const addItem = item => {
        return fetch("http://localhost:8000/listeditems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            },
            body: JSON.stringify(item)
        })
            .then(getListedItems)
    }

    return (
        <ListedItemContext.Provider value={{ listedItems, getListedItems, addItem }} >
            { props.children }
        </ListedItemContext.Provider>
    )
}