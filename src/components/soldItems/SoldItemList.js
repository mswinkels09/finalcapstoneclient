import React, { useContext, useEffect, useState } from "react"
import { SoldItemContext } from "./SoldItemProvider.js"
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom"
import "./SoldItems.css"
import sort from "../images/sort.png";

export const SoldItemList = (props) => {
    const { soldItems, getSoldItems } = useContext(SoldItemContext)

    const [data, setData] = useState(soldItems);
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        getSoldItems()
    }, [])

    const sortProfit = () => {
        const sortedData = data.slice().sort((a, b) => {
            if(toggle === false){
                setToggle(true)
                return a.profit_per_item - b.profit_per_item
            }
            else if(toggle === true){
                setToggle(false)
                return b.profit_per_item - a.profit_per_item
            }
        })
        setData(sortedData);
    };
    const sortItemPaid = () => {
        const sortedData = data.slice().sort((a, b) => {
            if(toggle === false){
                setToggle(true)
                return a.item_paid - b.item_paid
            }
            else if(toggle === true){
                setToggle(false)
                return b.item_paid - a.item_paid
            }
        })
        setData(sortedData);
    };

    const sortItemCost = () => {
        const sortedData = data.slice().sort((a, b) => {
            if(toggle === false){
                setToggle(true)
                return a.item_cost - b.item_cost
            }
            else if(toggle === true){
                setToggle(false)
                return b.item_cost - a.item_cost
            }
        })
        setData(sortedData);
    };

    const sortDate = () => {
        const sortedData = data.slice().sort((a, b) => {
            if(toggle === false){
                setToggle(true)
                return new Date(a.sold_date) - new Date(b.sold_date)
            }
            else if(toggle === true){
                setToggle(false)
                return new Date(b.sold_date) - new Date(a.sold_date)
            }
        })
        setData(sortedData);
    };

    return (
        <div className="sold_items__main">
            <div className="table__main_sold_items table__main">
                <div className="table__title">SOLD ITEMS</div>
                <Table bordered responsive className="table__div">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>
                                <div className="table__sort">
                                    Sold Date
                                    <Button id="sorting__button" color="outline-success" onClick={() => sortDate()}>
                                        <img className="table__image" src={sort} width={25} height={25} />
                                    </Button>
                                </div>
                            </th>
                            <th>Category</th>
                            <th>
                                <div className="table__sort">
                                    Item Cost
                                    <Button id="sorting__button" color="outline-success" onClick={() => sortItemCost()}>
                                        <img className="table__image" src={sort} width={25} height={25} />
                                    </Button>
                                </div>
                            </th>
                            <th>Shipping Cost</th>
                            <th>
                                <div className="table__sort">
                                    Item Paid
                                    <Button id="sorting__button" color="outline-success" onClick={() => sortItemPaid()}>
                                        <img className="table__image" src={sort} width={25} height={25} />
                                    </Button>
                                </div>
                            </th>
                            <th>Shipping Paid</th>
                            <th>
                                <div className="table__sort">
                                    Total Profit
                                    <Button id="sorting__button" color="outline-success" onClick={() => sortProfit()}>
                                        <img className="table__image" src={sort} width={25} height={25} />
                                    </Button>
                                </div>
                            </th>
                            <th>Percentage Of Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(si => {
                            return(
                                <tr>
                                    <td><Link to={{pathname:`/solditems/${si.id}`}}>{si.title}</Link></td>
                                    <td>{si.sold_date}</td>
                                    <td>{si.category.name}</td>
                                    <td>${si.item_cost.toFixed(2)}</td>
                                    <td>${si.shipping_cost.toFixed(2)}</td>
                                    <td>${si.item_paid.toFixed(2)}</td>
                                    <td>${si.shipping_paid.toFixed(2)}</td>
                                    <td>${si.profit_per_item.toFixed(2)}</td>
                                    <td>{si.profit_per_item_percentage.toFixed(2)}%</td>
                                </tr>
                            )
                            })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}