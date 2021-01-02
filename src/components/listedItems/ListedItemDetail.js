import React, { useContext, useEffect} from "react"
import { ListedItemContext } from "./ListedItemProvider.js"

export const ListedItemDetails = (props) => {
    const { singleListedItem, getSingleListedItem } = useContext(ListedItemContext)

    useEffect(() => {
        const listedItemId = parseInt(window.location.pathname.split('/')[2])
        getSingleListedItem(listedItemId)
    })

    console.log(singleListedItem)

    return (
    <>
        <h2>Listed Item Detail</h2>
            <h3>Item Name</h3>
            <div>{singleListedItem.title}{singleListedItem.unique_item_id}</div>
            <h4>Listing Type</h4>
            <div>{singleListedItem.listing_type.name}</div>
            <h4>Category</h4>
            <div>{singleListedItem.category.name}</div>
            <h5>Item Cost</h5>
            <div>{singleListedItem.item_cost}</div>
            <h5>Item Weight</h5>
            <div>{singleListedItem.item_weight}</div>
            <h5>Number of Days Listed</h5>
            <div>{singleListedItem.daysListed}</div>
            <h5>Listing Fee</h5>
            <div>{singleListedItem.listing_fee}</div>
            <h5>Notes</h5>
            <div>{singleListedItem.notes}</div>
    </>
    )
}