import React, { useContext, useEffect} from "react"
import { SoldItemContext } from "./SoldItemProvider.js"
import "./SoldItems.css"
import { Button } from "reactstrap";

export const SoldItemDetails = (props) => {
    const { singleSoldItem, getSingleSoldItem, editSoldItem } = useContext(SoldItemContext)

    const soldItemId = parseInt(window.location.pathname.split('/')[2]) //http://localhost:3000/solditems/15 => 15
    useEffect(() => {
        getSingleSoldItem(soldItemId)
    }, [])

    //function that changes a value to have a 2 decimal values
    const roundTo2 = (value) => {
        if(value > 0){
            const newValue = parseFloat(value.toFixed(2))
            return newValue
        }
        else return 0
    }

    return (
    <div className="solditemdetail">
        <div className="center_item_details">
            <div className="detail__main_title_div">
                <div className="detail__main_title_sold">
                    <div className="detail__sold_title">{singleSoldItem.title}</div>
                    <div className="detail__sold_id">#{singleSoldItem.unique_item_id}</div>
                </div>
                <div className="detail__sold_date">Sold: {singleSoldItem.dateSoldConverted}</div>
            </div>
        </div>
        <div className="row__details top_row_sold__details">
            <div className="center_item_details">
                <div className="detail__div_listed_top_row">
                    <h4 className="listed_detail__title top_row">Category</h4>
                    <div className="listed_detail__data">{singleSoldItem.category.name}</div>
                </div>
            </div>
            <div className="center_item_details">
                <div className="detail__div_listed_top_row">
                    <h4 className="listed_detail__title top_row">Listing Type</h4>
                    <div className="listed_detail__data">{singleSoldItem.listing_type.name}</div>
                </div>
            </div>
        </div>
        <div className="row__details bottom_row__details">
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Item Weight</h5>
                    <div className="listed_detail__data">{singleSoldItem.item_weight} lbs</div>
                </div>
            </div>
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Total Profit</h5>
                    <div className="listed_detail__data">${roundTo2(singleSoldItem.profit_per_item)}</div>
                </div>
            </div>
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Item Cost</h5>
                    <div className="listed_detail__data">${roundTo2(singleSoldItem.item_cost)}</div>
                </div>
            </div>
        </div>
        <div className="row__details bottom_row__details">
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Item Paid</h5>
                    <div className="listed_detail__data">${roundTo2(singleSoldItem.item_paid)}</div>
                    
                </div>
            </div>
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Shipping Cost</h5>
                    <div className="listed_detail__data">${roundTo2(singleSoldItem.shipping_cost)}</div>
                    
                </div>
            </div>
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Shipping Paid</h5>
                    <div className="listed_detail__data">${roundTo2(singleSoldItem.shipping_paid)}</div>
                </div>
            </div>
        </div>
        <div className="row__details bottom_row__details">
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Listing Fee</h5>
                    <div className="listed_detail__data">${roundTo2(singleSoldItem.listing_fee)}</div>
                </div>
            </div>
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Final Value Fee</h5>
                    <div className="listed_detail__data">${roundTo2(singleSoldItem.final_value_fee)}</div>
                </div>
            </div>
        </div>
        <div className="center_item_details">
            <div className="detail__div_notes_sold">
                <div className="detail__data_notes"><strong>Notes:</strong><div className="notes__details">{singleSoldItem.notes}</div></div>
            </div>
        </div>
        <div className="expense_detail__buttons center_item_details">
            <Button color="success" className="btn btn-3"
            onClick={() => props.history.push(`/soldItems/${singleSoldItem.id}/edit`)}
            >Edit</Button>
        </div>
    </div>
    )
}