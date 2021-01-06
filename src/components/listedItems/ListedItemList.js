import React, { useContext, useEffect, useState } from "react"
import { ListedItemContext } from "./ListedItemProvider.js"
import { SoldItemContext } from "../soldItems/SoldItemProvider.js"
import { Form, Table, FormGroup, Input, Button } from "reactstrap";
import { Link } from "react-router-dom"
import Popup from 'reactjs-popup';
import "./ListedItems.css";

export const ListedItemList = (props) => {
    const { listedItems, getListedItems } = useContext(ListedItemContext)
    const { editSoldItem } = useContext(SoldItemContext)

    const [currentSort, setCurrentSort] = useState('default')
    const [item, setItem] = useState({})

    useEffect(() => {
        getListedItems()
    }, [])

    const sortTypes = {
        up: {
            class: 'sort-up',
            fn: (a, b) => a.item_cost - b.item_cost || a.daysListed - b.daysListed
        },
        down: {
            class: 'sort-down',
            fn: (a, b) => b.item_cost - a.item_cost || b.daysListed - a.daysListed
        },
        default: {
            class: 'sort',
            fn: (a, b) => a
        }
    };

    const onSortChange = () => {
        if (currentSort === 'down')
            setCurrentSort('up');
        else if (currentSort === 'up')
            setCurrentSort('default');
        else if (currentSort === 'default')
            setCurrentSort('down');
    };


    // const findItemId = (obj) => {
    //     setItem(obj)
    // }

    const handleControlledInputChange = (event) => {
        const newItemState = Object.assign({}, item)
        newItemState[event.target.name] = event.target.value
        setItem(newItemState)
    }

    const editListedItemToSold = (obj) => {
        editSoldItem({
            id: obj,
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
        <div className="listed_items__main">
            <div className="table__main_listed_items table__main">
                <div className="table__title">LISTED ITEMS</div>
                <Table bordered responsive id="table__listed_items" className="table__div">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Type Of Listing</th>
                            <th>Category</th>
                            <th>
                                Item Cost
                                <button onClick={onSortChange}>
                                    <i className={`fas fa-${sortTypes[currentSort].class}`} />
                                </button>
                            </th>
                            <th>
                                Days Listed
                                <button onClick={onSortChange}>
                                    <i className={`fas fa-${sortTypes[currentSort].class}`} />
                                </button>
                            </th>
                            <th>SOLD?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listedItems.sort(sortTypes[currentSort].fn).map(li => {
                            return (
                                <tr>
                                    <td><Link to={{ pathname: `/listeditems/${li.id}` }}>{li.title}</Link></td>
                                    <td >{li.listing_type.name}</td>
                                    <td>{li.category.name}</td>
                                    <td>${li.item_cost.toFixed(2)}</td>
                                    <td>{li.daysListed}</td>
                                    <td>
                                        <Popup
                                            trigger={<button className="success" id={li.id}>Sold?</button>}
                                            modal>
                                            {close => (
                                                <div>
                                                    <button className="close" onClick={() => { }}>&times;</button>
                                                    <div className="header">
                                                        <div className="popup__header"><strong>Item Sold Form</strong></div>
                                                        <div className="popup__header">{li.title}</div>
                                                    </div>
                                                    <Form className="content">
                                                        <FormGroup>
                                                            <Input className="popup__content" type="date" name="sold_date" id="sold_date" placeholder="Choose Item's Sold Date"
                                                                value={item.sold_date}
                                                                onChange={handleControlledInputChange} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input type="number" name="item_paid" id="item_paid" placeholder="Enter What Customer Paid"
                                                                value={item.item_paid}
                                                                onChange={handleControlledInputChange} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input type="number" name="shipping_cost" id="shipping_cost" placeholder="Enter How Much You Paid For Shipping"
                                                                value={item.shipping_cost}
                                                                onChange={handleControlledInputChange} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input type="number" name="shipping_paid" id="shipping_paid" placeholder="Enter How Much The Customer Paid For Shipping"
                                                                value={item.shipping_paid}
                                                                onChange={handleControlledInputChange} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input type="number" name="final_value_fee" id="final_value_fee" placeholder="Enter Final Value Fees"
                                                                value={item.final_value_fee}
                                                                onChange={handleControlledInputChange} />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Input type="text" name="notes" id="notes" placeholder="Update Notes"
                                                                value={item.notes}
                                                                onChange={handleControlledInputChange} />
                                                        </FormGroup>
                                                    </Form>
                                                    <Button color="success"
                                                        onClick={evt => {
                                                            editListedItemToSold(li.id)
                                                            // findItemId(li.id)
                                                        }}
                                                        className="btn btn-primary">
                                                        Save
                                                    </Button>
                                                </div>

                                            )}
                                        </Popup>

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}