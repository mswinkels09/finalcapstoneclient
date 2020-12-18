import React, { useContext, useEffect } from "react"
import { ListedItemContext } from "./ListedItemProvider.js"
import { Table } from "reactstrap";
import { Link } from "react-router-dom"

export const ListedItemList = (props) => {
    const { listedItems, getListedItems } = useContext(ListedItemContext)

    useEffect(() => {
        getListedItems()
    }, [])


    return(
        <Table bordered responsive>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Type Of Listing</th>
                    <th>Category</th>
                    <th>Item Cost</th>
                    <th>Days Listed</th>
                    <th>SOLD?</th>
                </tr>
            </thead>
            <tbody>
                {listedItems.map(li => {
                    return(
                        <tr>
                            <td><Link>{li.title}</Link></td>
                            <td>{li.listing_type.name}</td>
                            <td>{li.category.name}</td>
                            <td>{li.item_cost}</td>
                            <td>{li.daysListed}</td>
                            <td><button>Sold</button></td>
                        </tr>
                    )
                    })}
            </tbody>
        </Table>
    )
}