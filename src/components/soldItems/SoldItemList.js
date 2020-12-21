import React, { useContext, useEffect } from "react"
import { SoldItemContext } from "./SoldItemProvider.js"
import { Table } from "reactstrap";
import { Link } from "react-router-dom"

export const SoldItemList = (props) => {
    const { soldItems, getSoldItems } = useContext(SoldItemContext)

    useEffect(() => {
        getSoldItems()
    }, [])

    return (
        <Table bordered responsive>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Item Cost</th>
                    <th>Shipping Cost</th>
                    <th>Item Paid</th>
                    <th>Shipping Paid</th>
                    <th>Total Profit</th>
                    <th>Percentage Of Profit</th>
                </tr>
            </thead>
            <tbody>
                {soldItems.map(si => {
                    return(
                        <tr>
                            <td><Link>{si.title}</Link></td>
                            <td>{si.category.name}</td>
                            <td>{si.item_cost}</td>
                            <td>{si.shipping_cost}</td>
                            <td>{si.item_paid}</td>
                            <td>{si.shipping_paid}</td>
                            <td>{si.profit_per_item}</td>
                            <td>{si.profit_per_item_percentage}</td>
                        </tr>
                    )
                    })}
            </tbody>
        </Table>
    )
}