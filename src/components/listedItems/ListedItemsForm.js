import React, { useContext, useState, useEffect } from "react"
import { TypesContext } from "../TypesProvider";
import { ListedItemContext } from "./ListedItemProvider";
import {  Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export const ItemForm = props => {
    const{addItem, listedItems} = useContext(ListedItemContext)
    const{categories, getCategories, listingTypes, getListingTypes, weightTypes, getWeightTypes} = useContext(TypesContext)

    const [item, setItem] = useState({
        title: "",
        unique_item_id: parseInt(""),
        item_weight: parseInt(""),
        weight_type_id: 0,
        item_cost: parseInt(""),
        date_listed: "",
        category_id: 0,
        listing_type_id: 0,
        listing_fee: parseInt(""),
        notes: ""
    })

    const findWeightTypePercentage = weightTypes.find(wt => {
        return parseInt(item.weight_type_id)===parseInt(wt.id)
    }) || {}

    // console.log(listingTypes)
    useEffect(() => {
        getCategories()
        getListingTypes()
        getWeightTypes()
    }, [])

    const calculateItemCost = (item) => {
        if (item.weight_type_id === "3") {
            return item.item_cost
        } else {
            return item.item_weight * findWeightTypePercentage.percentage
        }
    }


    const handleControlledInputChange = (event) => {
        const newItemState = Object.assign({}, item)
        newItemState[event.target.name] = event.target.value
        setItem(newItemState)
    }
    console.log(item)

    return(
        <>
        <h2>Add New Item</h2>
        <Form>
            <FormGroup>
                <Input type="text" name="title" id="title" placeholder="Enter Item's Name" 
                    value={item.title}
                    onChange={handleControlledInputChange}/>
            </FormGroup>
            <FormGroup>
                <select name="listing_type_id" id="listing_type" value={item.listing_type_id}
                    onChange={handleControlledInputChange}>
                    <option value="">Select Listing Type</option>
                    {listingTypes.map(lt => (
                        <option key={lt.id} value={lt.id}>
                            {lt.name}
                        </option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup>
                <select name="category_id" id="category" value={item.category_id}
                    onChange={handleControlledInputChange}>
                    <option value="">Select Item Category</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup>
                <Input type="number" name="unique_item_id" id="unique_item_id" placeholder="Enter Item's Unique ID (If Applicable)" 
                    value={item.unique_item_id}
                    onChange={handleControlledInputChange}/>
            </FormGroup>
            <FormGroup>
                <Input type="date" name="date_listed" id="date_listed" placeholder="Select Date Item Was Listed" 
                    value={item.date_listed}
                    onChange={handleControlledInputChange}/>
            </FormGroup>
            <FormGroup>
                <Input type="number" name="item_weight" id="item_weight" placeholder="Enter Item's Weight" 
                    value={item.item_weight}
                    onChange={handleControlledInputChange }/>
            </FormGroup>
            <FormGroup>
                <select name="weight_type_id" id="weight_type" value={item.weight_type_id}
                    onChange={handleControlledInputChange}>
                    <option value="">Select Weight Type</option>
                    {weightTypes.map(wt => (
                        <option key={wt.id} value={wt.id}>
                            {wt.type}
                        </option>
                    ))}
                </select>
            </FormGroup>
            <FormGroup>
                <Input type="number" name="item_cost" id="item_cost" placeholder="Enter Item's Cost" 
                    value={calculateItemCost(item)}
                    onChange={handleControlledInputChange}/>
            </FormGroup>
            <FormGroup>
                <Input type="number" name="listing_fee" id="listing_fee" placeholder="Enter Item's Listing Fee (If Applicable)" 
                    value={item.listing_fee}
                    onChange={handleControlledInputChange }/>
            </FormGroup>
            <FormGroup>
                <Input type="textarea" name="notes" id="notes" placeholder="Item Notes" 
                    value={item.notes}
                    onChange={handleControlledInputChange }/>
            </FormGroup>
        </Form>
        <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()
                        console.log(findWeightTypePercentage, "weighttype")
    
                        const newitem = {
                            title: item.title,
                            unique_item_id: parseInt(item.unique_item_id),
                            item_weight: parseInt(item.item_weight),
                            weight_type_id: parseInt(item.weight_type_id),
                            item_cost: parseFloat(calculateItemCost(item)),
                            date_listed: item.date_listed,
                            category_id: parseInt(item.category_id),
                            listing_type_id: parseInt(item.listing_type_id),
                            listing_fee: parseFloat(item.listing_fee),
                            notes: item.notes
                        }
    
                        // Send POST request to your API
                        addItem(newitem)
                            .then(props.history.push("/listedItems"))
                    }}
                    className="btn btn-primary">Save</button>
        </>
    )
}