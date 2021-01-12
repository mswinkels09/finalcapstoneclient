import React, { useContext, useEffect, useState, useMemo } from "react"
import { ListedItemContext } from "./ListedItemProvider.js"
import { SoldItemContext } from "../soldItems/SoldItemProvider.js"
import { Form, Table, FormGroup, Input, Button } from "reactstrap";
import { Link } from "react-router-dom"
import Popup from 'reactjs-popup';
import "./ListedItems.css";
import sort from "../images/sort.png";

export const ListedItemList = (props) => {
    const { listedItems, getListedItems } = useContext(ListedItemContext)
    const { editSoldItem } = useContext(SoldItemContext)

    const [item, setItem] = useState({})
    const [data, setData] = useState(listedItems);
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        getListedItems()
    }, [])
    
    useEffect(() => {
        setData(listedItems)
    }, [listedItems])

    //SORTING THE DATA ARRAY
    //makes a copy of the data array and toggles between sorting it high to low - low to high
    const sortDaysListed = () => {
        const sortedDataCost = data.slice().sort((a, b) => {
            if(toggle === false){
                setToggle(true)
                return a.daysListed - b.daysListed
            }
            else if(toggle === true){
                setToggle(false)
                return b.daysListed - a.daysListed
            }
        })
        setData(sortedDataCost);
    };

    const sortCost = () => {
        const sortedDataCost = data.slice().sort((a, b) => {
            if(toggle === false){
                setToggle(true)
                return a.item_cost - b.item_cost
            }
            else if(toggle === true){
                setToggle(false)
                return b.item_cost - a.item_cost
            }
        })
        setData(sortedDataCost);
    };

    //function that changes a value to have a 2 decimal values
    const roundTo2 = (value) => {
        if(value > 0){
            const newValue = parseFloat(value.toFixed(2))
            return newValue
        }
        else return 0
    }

    
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
                                <div className="table__sort">
                                    Item Cost
                                    <Button id="sorting__button" color="outline-success" onClick={() => sortCost()}>
                                        <img className="table__image" src={sort} width={25} height={25} />
                                    </Button>

                                </div>
                            </th>
                            <th>
                            <div className="table__sort">
                                    Days Listed
                                    <Button id="sorting__button" color="outline-success" onClick={() => sortDaysListed()}>
                                        <img className="table__image" src={sort} width={25} height={25} />
                                    </Button>

                                </div>
                            </th>
                            <th>SOLD?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(li => {
                            return (
                                <tr>
                                    <td><Link to={{ pathname: `/listeditems/${li.id}` }}>{li.title}</Link></td>
                                    <td >{li.listing_type.name}</td>
                                    <td>{li.category.name}</td>
                                    <td>${li.item_cost.toFixed(2)}</td>
                                    <td>{li.daysListed}</td>
                                    <td>
                                        <Popup //creates popup that allows user to easily enter in data when an item is sold
                                            trigger={<button className="success table__button" id={li.id}>Sold?</button>}
                                            modal>
                                            {close => (
                                                <div>
                                                    <div className="header">
                                                        <div className="popup__header"><strong>Item Sold Form</strong></div>
                                                        <div className="popup__header_title">{li.title}</div>
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
                                                    <div className="form__button_listed_sold">
                                                        <Button color="success"
                                                            onClick={evt => {
                                                                editListedItemToSold(li.id) // user is then pushed to sold items page
                                                            }}
                                                            className="btn btn-primary ">
                                                            Save
                                                        </Button>
                                                    </div>
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