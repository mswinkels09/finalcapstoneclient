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

    return (
        <ListedItemContext.Provider value={{ listedItems, getListedItems }} >
            { props.children }
        </ListedItemContext.Provider>
    )
}