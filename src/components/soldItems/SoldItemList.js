import React, { useContext, useEffect } from "react"
import { SoldItemContext } from "./SoldItemProvider.js"

export const SoldItemList = (props) => {
    const { soldItems, getSoldItems } = useContext(SoldItemContext)

    useEffect(() => {
        getSoldItems()
    }, [])

    return (
        <article className="soldItems">
            {/* <button className="btn btn-2 btn-sep icon-create"
                onClick={() => { props.history.push("/games/new")
                }}>
                Create New Game
            </button> */}
            {
                soldItems.map(si => {
                    return <section key={`li--${si.id}`} className="li">
                        {/* <div className="li__edit">
                            <button className="btn btn-3"
                                    onClick={e => props.history.push(`/lis/${li.id}/edit`)}
                                    >Edit</button></div> */}
                        <div className="li__title">{si.title}</div>
                        <div className="li__category">{si.category.name}</div>
                        <div className="li__listing_type">{si.listing_type.name}</div>
                        <div className="li__listing_type">${si.item_paid}</div>
                    </section>
                })
            }
        </article>
    )
}