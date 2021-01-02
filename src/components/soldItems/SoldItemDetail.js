import React, { useContext, useEffect} from "react"
import { SoldItemContext } from "./SoldItemProvider.js"

export const SoldItemDetails = (props) => {
    const { singleSoldItem, getSingleSoldItem } = useContext(SoldItemContext)

    useEffect(() => {
        const soldItemId = parseInt(window.location.pathname.split('/')[2])
        getSingleSoldItem(soldItemId)
    })

    console.log(singleSoldItem)

    return (
    <>
        <h2>Sold Item Detail</h2>
            <h3>Item Name</h3>
            <div>{singleSoldItem.title}{singleSoldItem.unique_item_id}<div>Sold:{singleSoldItem.sold_date}</div></div>
            <h4>Category</h4>
            <div>{singleSoldItem.category.name}</div>
            <h4>Listing Type</h4>
            <div>{singleSoldItem.listing_type.name}</div>
            <h5>Item Weight</h5>
            <div>{singleSoldItem.item_weight}</div>
            <h5>Total Profit</h5>
            <div>${singleSoldItem.profit_per_item}</div>
            <h5>Item Cost</h5>
            <div>${singleSoldItem.item_cost}</div>
            <h5>Item Paid</h5>
            <div>${singleSoldItem.item_paid}</div>
            <h5>Shipping Cost</h5>
            <div>${singleSoldItem.shipping_cost}</div>
            <h5>Shipping Paid</h5>
            <div>${singleSoldItem.shipping_paid}</div>
            <h5>Listing Fee</h5>
            <div>${singleSoldItem.listing_fee}</div>
            <h5>Final Value Fee</h5>
            <div>${singleSoldItem.final_value_fee}</div>
            <h5>Notes</h5>
            <div>{singleSoldItem.notes}</div>
    </>
    )
}