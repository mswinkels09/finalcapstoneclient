import React, { useContext, useEffect, useState} from "react"
import { SoldItemContext } from "./SoldItemProvider.js"
import {  Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "./SoldItems.css"

export const SoldItemForm = (props) => {
    const { singleSoldItem, getSingleSoldItem, editSoldItem } = useContext(SoldItemContext)
    const [item, setItem] = useState({})

    const soldItemId = parseInt(window.location.pathname.split('/')[2])

    useEffect(() => {
        getSingleSoldItem(soldItemId)
    }, [])

    useEffect(() => {
        getItemInEditMode()
    }, {soldItemId})

    const getItemInEditMode = () => {
        const selectedItem = singleSoldItem.id === soldItemId || {}
        setItem(selectedItem)
    }

    const handleControlledInputChange = (event) => {
        const newItemState = Object.assign({}, item)
        newItemState[event.target.name] = event.target.value
        setItem(newItemState)
    }

    const updateSoldItem = () => {
        debugger
        editSoldItem({
            id: singleSoldItem.id,
            item_paid: parseFloat(item.item_paid),
            shipping_cost: parseFloat(item.shipping_cost),
            shipping_paid: parseFloat(item.shipping_paid),
            final_value_fee: parseFloat(item.final_value_fee),
            sold_date: item.sold_date,
            returned: false,
            notes: item.notes
        })
            .then(() => props.history.push("/soldItems"))
    }

    return (
    <>
    <div className="solditemdetail">
        <div className="center_item_details">
            <div className="detail__main_title_div">
                <div className="detail__main_title_sold">
                    <div className="detail__sold_title">{singleSoldItem.title}(Edit)</div>
                    <div className="detail__sold_id">#{singleSoldItem.unique_item_id}</div>
                </div>
            </div>
        </div>
        <div className="row__details bottom_row__details">
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Category</h5>
                    <div className="listed_detail__data">{singleSoldItem.category.name}</div>
                </div>
            </div>
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Listing Type</h5>
                    <div className="listed_detail__data">{singleSoldItem.listing_type.name}</div>
                </div>
            </div>
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Item Weight</h5>
                    <div className="listed_detail__data">{singleSoldItem.item_weight}</div>
                </div>
            </div>
        </div>
        <div className="row__details bottom_row__details">
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Total Profit</h5>
                    <div className="listed_detail__data">${singleSoldItem.profit_per_item}</div>
                </div>
            </div>
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Item Cost</h5>
                    <div className="listed_detail__data">${singleSoldItem.item_cost}</div>
                </div>
            </div>
            <div className="center_item_details">
                <div className="detail__div_sold_bottom_row">
                    <h5 className="listed_detail__title">Listing Fee</h5>
                    <div className="listed_detail__data">${singleSoldItem.listing_fee}</div>
                </div>
            </div>
        </div>
            <Form className="form__div_sold">
                <div className="form__rows">
                    <FormGroup className="form__detail_sold">
                        <div className="form__detail_placeholder">Sold Date</div>
                        <Input type="date" name="sold_date" id="sold_date" placeholder="Choose Item's Sold Date"
                            value={item.sold_date}
                            onChange={handleControlledInputChange} />
                    </FormGroup>
                    <FormGroup className="form__detail_sold">
                    <div className="form__detail_placeholder">Customer Paid For Item</div>
                        <Input type="number" name="item_paid" id="item_paid" placeholder="Update What Customer Paid"
                            value={item.item_paid}
                            onChange={handleControlledInputChange} />
                    </FormGroup>
                    <FormGroup className="form__detail_sold">
                    <div className="form__detail_placeholder">Shipping Cost</div>
                        <Input type="number" name="shipping_cost" id="shipping_cost" placeholder="Update How Much You Paid For Shipping"
                            value={item.shipping_cost}
                            onChange={handleControlledInputChange} />
                    </FormGroup>
                </div>
                <div className="form__rows">
                    <FormGroup className="form__detail_sold">
                    <div className="form__detail_placeholder">Customer Paid For Shipping</div>
                        <Input type="number" name="shipping_paid" id="shipping_paid" placeholder="Update How Much The Customer Paid For Shipping"
                            value={item.shipping_paid}
                            onChange={handleControlledInputChange} />
                    </FormGroup>
                    <FormGroup className="form__detail_sold">
                    <div className="form__detail_placeholder">Final Value Fee</div>
                        <Input type="number" name="final_value_fee" id="final_value_fee" placeholder="Update Final Value Fees"
                            value={item.final_value_fee}
                            onChange={handleControlledInputChange} />
                    </FormGroup>
                </div>
                <FormGroup className="form__detail_listed form__sold_notes">
                <div className="form__detail_placeholder">Notes</div>
                    <Input type="text" name="notes" id="notes" placeholder="Update Notes"
                        value={item.notes}
                        onChange={handleControlledInputChange} />
                </FormGroup>
            </Form>
            <div className="form__buttons">
                <Button color="success"
                    onClick={evt => {
                        evt.preventDefault()
                        updateSoldItem(singleSoldItem.id)
                    }}
                        className="btn btn-primary">
                            Save
                </Button>
            </div>
        </div>
    </>
    )
}