import React, { useState } from "react"

export const SoldItemContext = React.createContext()

export const SoldItemProvider = (props) => {
    const [ soldItems, setSoldItems ] = useState([])
    const [singleSoldItem, setSingleSoldItem] = useState({category: {}, listing_type: {}})

    const getSoldItems = () => {
        return fetch("http://localhost:8000/solditems", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setSoldItems)
    }

    const getSingleSoldItem = (item) => {
        return fetch(`http://localhost:8000/solditems/${item}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }})
            .then(res => res.json())
            .then(setSingleSoldItem)
    }

    const editSoldItem = item => {
        debugger
        return fetch(`http://localhost:8000/solditems/${item.id}`, {
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
        <SoldItemContext.Provider value={{ soldItems, getSoldItems, getSingleSoldItem, singleSoldItem, editSoldItem }} >
            { props.children }
        </SoldItemContext.Provider>
    )
}