import React, { useContext, useEffect} from "react"
import { ListedItemContext } from "./ListedItemProvider.js"
import "./ListedItems.css"
import { Button } from "reactstrap";

export const ListedItemDetails = (props) => {
    // debugger
    const { singleListedItem, getSingleListedItem, deleteListedItem } = useContext(ListedItemContext)

    const listedItemId = parseInt(window.location.pathname.split('/')[2]) //http://localhost:3000/listeditems/6 => 6

    useEffect(() => {
        getSingleListedItem(listedItemId)
    }, [listedItemId])

    //function that changes a value to have a 2 decimal values
    const roundTo2 = (value) => {
        if(value > 0){
            const newValue = parseFloat(value.toFixed(2))
            return newValue
        }
        else return 0
    }

    const delete_prompt = (id) => {
        var retVal = window.confirm("This action will permanently delete the item. Are you sure?");
        if( retVal == true ) {
            deleteListedItem(id)
            .then(props.history.push("/listeditems"))
            .then(window.location.reload(false))
            return true;
        } else {
            return false;
        }
    }
    console.log(singleListedItem)

    return (
    <div className="listeditemdetail">
            <div className="center_item_details">
                <div className="detail__main_title_listed">
                    <div className="detail__listed_title">{singleListedItem.title}</div>
                    <div className="detail__listed_id">#{singleListedItem.unique_item_id}</div></div>
            </div>
        <div className="row__details top_row__details">
            <div className="center_item_details">
                <div className="detail__div_listed_top_row">
                    <h4 className="listed_detail__title top_row">Category:</h4>
                    <div className="listed_detail__data">{singleListedItem.category.name}</div>
                </div>
            </div>
            <div className="center_item_details">
                <div className="detail__div_listed_top_row">
                    <h4 className="listed_detail__title top_row">Listing Type:</h4>
                    <div className="listed_detail__data">{singleListedItem.listing_type.name}</div>
                </div>
            </div>
        </div>
        <div className="row__details">
            <div className="center_item_details">
                <div className="detail__div_listed_bottom_row">
                    <h5 className="listed_detail__title">Item Cost:</h5>
                    <div className="listed_detail__data">${roundTo2(singleListedItem.item_cost)}</div>
                </div>
            </div>
            <div className="center_item_details">
                <div className="detail__div_listed_bottom_row">
                    <h5 className="listed_detail__title">Item Weight:</h5>
                    <div className="listed_detail__data">{singleListedItem.item_weight} lbs</div>
                </div>
            </div>
        </div>
        <div className="row__details">
            <div className="center_item_details">
                <div className="detail__div_listed_bottom_row">
                    <h5 className="listed_detail__title">Number of Days Listed:</h5>
                    <div className="listed_detail__data">{singleListedItem.daysListed}</div>
                </div>
            </div>
            <div className="center_item_details">
                <div className="detail__div_listed_bottom_row">
                    <h5 className="listed_detail__title">Listing Fee:</h5>
                    <div className="listed_detail__data">${singleListedItem.listing_fee}</div>
                </div>
            </div>
        </div>
        <div className="center_item_details">
            <div className="detail__div_notes">
                <div className="detail__data_notes"><strong>Notes:</strong><div className="notes__details">{singleListedItem.notes}</div></div>
            </div>
        </div>
        <div  className="expense_detail__buttons center_item_details">
            <Button color="success" className="btn btn-3"
                onClick={() => props.history.push(`/listedItems/${singleListedItem.id}/edit`)}
                >Edit</Button>
            <Button color="success" className="btn" onClick={() => delete_prompt(singleListedItem.id)}>Delete</Button>
        </div>
    </div>
    )
}