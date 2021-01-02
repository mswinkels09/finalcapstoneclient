import React, { useContext, useEffect, useState } from "react"
import { ListedItemContext } from "./ListedItemProvider.js"
import { Table } from "reactstrap";
import { Link } from "react-router-dom"

export const ListedItemList = (props) => {
    const { listedItems, getListedItems } = useContext(ListedItemContext)

    const[currentSort, setCurrentSort] = useState(('default'))

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

    return(
        <Table bordered responsive>
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
                    return(
                        <tr>
                            <td><Link to={{pathname:`/listeditems/${li.id}`}}>{li.title}</Link></td>
                            <td>{li.listing_type.name}</td>
                            <td>{li.category.name}</td>
                            <td>{li.item_cost}</td>
                            <td>{li.daysListed}</td>
                            <td><button>Sold</button></td>
                        </tr>
                    )
                    })}
            </tbody>
        </Table>
    )
}