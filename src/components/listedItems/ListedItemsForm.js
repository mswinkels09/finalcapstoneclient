import React, { useContext, useState, useEffect } from "react"
import { TypesContext } from "../TypesProvider";
import { ListedItemContext } from "./ListedItemProvider";
import {  Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export const ItemForm = props => {
    const{addItem, listedItems} = useContext(ListedItemContext)
    const{categories, getCategories, listingTypes, getListingTypes, weightTypes, getWeightTypes} = useContext(TypesContext)

    const [item, setItem] = useState({
        title: "",
        unique_item_id: 0,
        item_weight: 0,
        weight_type_id: 1,
        item_cost: 0.00,
        date_listed: "",
        category_id: 1,
        listing_type_id: 1,
        listing_fee: 0,
        notes: ""
    })


    useEffect(() => {
        getCategories()
        getListingTypes()
        getWeightTypes()
    })

    const handleControlledInputChange = (event) => {
        const newItemState = Object.assign({}, item)
        newItemState[event.target.name] = event.target.value
        setItem(newItemState)
    }

    return(
        <Form>
            <FormGroup>
                <Input type="text" name="title" id="title" placeholder="Enter Item's Name" 
                    value={item.title}
                    onChange={handleControlledInputChange}/>
            </FormGroup>
        </Form>
    )
}