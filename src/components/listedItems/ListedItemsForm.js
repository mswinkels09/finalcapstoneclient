import React, { useContext, useState, useEffect } from "react"
import { TypesContext } from "../TypesProvider";
import { ListedItemContext } from "./ListedItemProvider";
import { Button, Form, FormGroup, Input, Modal, ModalBody, ModalHeader } from "reactstrap";

export const ItemForm = props => {
    const { addItem, listedItems, editListedItem } = useContext(ListedItemContext)
    const { categories, getCategories, listingTypes, getListingTypes, weightTypes, getWeightTypes } = useContext(TypesContext)

    const [item, setItem] = useState({})
    const [showModal, setShowModal] = useState(false)

    const toggle = () => setShowModal(!showModal) // toggles between modal showing and not showing

    const itemPathId = parseInt(window.location.pathname.split('/')[2]) //http://localhost:3000/listedItems/6/edit => 6


    
    useEffect(() => {
        getCategories()
        getListingTypes()
        getWeightTypes()
    }, [])
    
    
    useEffect(() => {
        if (itemPathId) {
            getItemInEditMode()
        }
    }, [itemPathId])
    

    //WEIGHT TO ITEM COST CALCULATIONS
    //matches the weight_type_id to the currents item weight_type_id    
    const findWeightTypeId = weightTypes.find(wt => {
        return parseInt(item.weight_type_id) === parseInt(wt.id)
    }) || {}

    //if user chooses options 1("Books") or 2("Misc") in the drop down then the new item cost will be calculated
    //if user chooses option 3("N/A") then the user can write their own item_cost
    const calculateItemCost = (item) => {
        if (item.weight_type_id === "3") {
            return item.item_cost
        } else {
            return item.item_weight * findWeightTypeId.percentage
        }
    }

    const getItemInEditMode = () => {
        const selectedItem = listedItems.find(item => item.id === itemPathId) || {}
        const selectedItemUnnested =
        {
            id: selectedItem.id,
            title: selectedItem.title,
            unique_item_id: selectedItem.unique_item_id,
            item_weight: selectedItem.item_weight,
            weight_type_id: selectedItem.weight_type.id,
            item_cost: parseFloat(selectedItem.item_cost),
            date_listed: selectedItem.date_listed,
            category_id: selectedItem.category.id,
            listing_type_id: selectedItem.listing_type.id,
            listing_fee: parseFloat(selectedItem.listing_fee),
            notes: selectedItem.notes
        }
        setItem(selectedItemUnnested)
    }


    const handleControlledInputChange = (event) => {
        const newItemState = Object.assign({}, item)
        newItemState[event.target.name] = event.target.value
        setItem(newItemState)
    }

    const constructNewItem = () => {
        if (itemPathId) {
            editListedItem({
                id: item.id,
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
            })

                .then(() => props.history.push("/listedItems"))
        } else {
            addItem({
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
            })
                .then(() => props.history.push("/listedItems"))
        }
    }

    return (
        <>
            <div className="listedform">
                <div className="form__main">
                    <Form className="form__div_items">
                        <div className="center_item_title_form_listed">
                            <h2 className="form__title">{itemPathId ? "Edit Item" : "Add New Item"}</h2>
                        </div>
                        <div className="form__item_top">
                            <FormGroup className="form__detail_listed">
                                <Input type="text" name="title" id="title" placeholder="Enter Item's Name"
                                    value={item.title}
                                    onChange={handleControlledInputChange} />
                            </FormGroup>
                            <FormGroup className="form__detail_listed">
                                <Input type="number" name="unique_item_id" id="unique_item_id" placeholder="Enter Item's Unique ID (If Applicable)"
                                    value={item.unique_item_id}
                                    onChange={handleControlledInputChange} />
                            </FormGroup>
                            <FormGroup className="form__detail_listed form__detail_select">
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
                            <FormGroup className="form__detail_listed form__detail_select">
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
                            <FormGroup className="form__detail_listed">
                                <Input type="date" name="date_listed" id="date_listed" placeholder="Select Date Item Was Listed"
                                    value={item.date_listed}
                                    onChange={handleControlledInputChange} />
                            </FormGroup>
                        </div>
                        <div className="form__item_weight">
                            <FormGroup className="form__detail_listed form__weight_input">
                                <Input type="number" name="item_weight" id="item_weight" placeholder="Enter Item's Weight"
                                    value={item.item_weight}
                                    onChange={handleControlledInputChange} />
                            </FormGroup>
                            <FormGroup className="form__detail_listed form__weight_select">
                                <select name="weight_type_id" id="weight_type" value={item.weight_type_id}
                                    onChange={handleControlledInputChange}>
                                    <option value="">Select Weight Type</option>
                                    {weightTypes.map(wt => (
                                        <option key={wt.id} value={wt.id}>
                                            {wt.type}
                                        </option>
                                    ))}
                                </select>
                                <div>
                                    <Button color="success" className="weight_type__btn" onClick={toggle}>i</Button>
                                    <Modal isOpen={showModal} toggle={toggle}>
                                        <ModalHeader toggle={toggle}>Weight Type Explained</ModalHeader>
                                        <ModalBody><div className="weight_type__modal">Weight Types can be used to calculate how much that item cost. Some thrift stores calculate their price by weight. 
                                            For example, if you bought 3 lbs of children toys from a thrift store. Then you will be charged $1.09 per lbs of that miscellaneous(Misc) item aka $3.27.</div>
                                            <div className="weight_type__div_categories">Weight Types are seperated into 3 categories:</div>
                                            <ul>
                                                <li className="weight_type__div_category"><strong>Books:</strong> $0.59 per lbs</li>
                                                <li className="weight_type__div_category"><strong>Misc:</strong> $1.09 per lbs</li>
                                                <li className="weight_type__div_category"><strong>N/A:</strong> Does not apply to this item</li>
                                            </ul></ModalBody>
                                    </Modal>
                                </div>
                            </FormGroup>
                        </div>
                        <div className="form__item_bottom">
                            <FormGroup className="form__detail_listed">
                                <Input type="number" name="item_cost" id="item_cost" placeholder="Enter Item's Cost"
                                    value={calculateItemCost(item)}
                                    onChange={handleControlledInputChange} />
                            </FormGroup>
                            <FormGroup className="form__detail_listed">
                                <Input type="number" name="listing_fee" id="listing_fee" placeholder="Enter Item's Listing Fee (If Applicable)"
                                    value={item.listing_fee}
                                    onChange={handleControlledInputChange} />
                            </FormGroup>
                        </div>
                        <FormGroup className="form__detail_listed">
                            <Input type="textarea" name="notes" id="notes" placeholder="Item Notes" defaultValue=""
                                value={item.notes}
                                onChange={handleControlledInputChange} />
                        </FormGroup>
                        <div className="form__buttons">
                            <Button color="success"
                                onClick={evt => {
                                    evt.preventDefault()
                                    constructNewItem()
                                }}
                                className="form__listed_button table__button">
                                {itemPathId ? "Save" : "Submit"}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}