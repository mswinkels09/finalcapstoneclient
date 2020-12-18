import React, { useState } from "react"

export const SoldItemContext = React.createContext()

export const SoldItemProvider = (props) => {
    const [ soldItems, setSoldItems ] = useState([])

    const getSoldItems = () => {
        return fetch("http://localhost:8000/solditems", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("user_token")}`
            }
        })
            .then(response => response.json())
            .then(setSoldItems)
    }

    return (
        <SoldItemContext.Provider value={{ soldItems, getSoldItems }} >
            { props.children }
        </SoldItemContext.Provider>
    )
}