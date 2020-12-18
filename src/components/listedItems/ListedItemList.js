import React, { useContext, useEffect } from "react"
import { ListedItemContext } from "./ListedItemProvider.js"

export const ListedItemList = (props) => {
    const { listedItems, getListedItems } = useContext(ListedItemContext)

    useEffect(() => {
        getListedItems()
    }, [])

    console.log(listedItems)

    return (
        <article className="listedItems">
            {/* <button className="btn btn-2 btn-sep icon-create"
                onClick={() => { props.history.push("/games/new")
                }}>
                Create New Game
            </button> */}
            {
                listedItems.map(li => {
                    return <section key={`li--${li.id}`} className="li">
                        {/* <div className="li__edit">
                            <button className="btn btn-3"
                                    onClick={e => props.history.push(`/lis/${li.id}/edit`)}
                                    >Edit</button></div> */}
                        <div className="li__title">{li.title}</div>
                        <div className="li__category">{li.category.name}</div>
                        <div className="li__listing_type">{li.listing_type.name}</div>
                    </section>
                })
            }
        </article>
    )
}