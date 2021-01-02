import React, { useContext, useEffect, useState } from "react"
import { SoldItemContext } from "./SoldItemProvider.js"
import { Table } from "reactstrap";
import { Link } from "react-router-dom"

export const SoldItemList = (props) => {
    const { soldItems, getSoldItems } = useContext(SoldItemContext)

    const[currentSort, setCurrentSort] = useState(('default'))

    useEffect(() => {
        getSoldItems()
    }, [])

    const sortTypes = {
        up: {
            class: 'sort-up',
            fn: (a, b) => a.profit_per_item - b.profit_per_item || a.sold_date - b.sold_date
        },
        down: {
            class: 'sort-down',
            fn: (a, b) => b.profit_per_item - a.profit_per_item || b.sold_date - a.sold_date
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

    return (
        <Table bordered responsive>
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>
                        Sold Date
                        <button onClick={onSortChange}>
                            <i className={`fas fa-${sortTypes[currentSort].class}`} />
                        </button>
                    </th>
                    <th>Category</th>
                    <th>Item Cost</th>
                    <th>Shipping Cost</th>
                    <th>Item Paid</th>
                    <th>Shipping Paid</th>
                    <th>
                        Total Profit
                        <button onClick={onSortChange}>
                            <i className={`fas fa-${sortTypes[currentSort].class}`} />
                        </button>
                    </th>
                    <th>Percentage Of Profit</th>
                </tr>
            </thead>
            <tbody>
                {soldItems.sort(sortTypes[currentSort].fn).map(si => {
                    return(
                        <tr>
                            <td><Link to={{pathname:`/solditems/${si.id}`}}>{si.title}</Link></td>
                            <td>{si.sold_date}</td>
                            <td>{si.category.name}</td>
                            <td>${si.item_cost}</td>
                            <td>${si.shipping_cost}</td>
                            <td>${si.item_paid}</td>
                            <td>${si.shipping_paid}</td>
                            <td>${si.profit_per_item}</td>
                            <td>{si.profit_per_item_percentage}%</td>
                        </tr>
                    )
                    })}
            </tbody>
        </Table>
    )
}