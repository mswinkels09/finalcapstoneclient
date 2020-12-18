import React from "react"
import { Route } from "react-router-dom"
import { ListedItemList } from "./listedItems/ListedItemList";
import { ListedItemProvider } from "./listedItems/ListedItemProvider";
import { SoldItemList } from "./soldItems/SoldItemList";
import { SoldItemProvider } from "./soldItems/SoldItemProvider";
import { ExpenseList } from "./expenses/ExpenseList";
import { ExpenseProvider } from "./expenses/ExpenseProvider";
import Table from "./expenses/ExpenseTable";

export const ApplicationViews = (props) => {
    return <>
        <ListedItemProvider>
            <Route exact path="/listeditems">
                <ListedItemList {...props} />
            </Route>
            {/* <Route exact path="/games/new" render={props => <GameForm {...props} />} />
            <Route exact path="/games/:gameId(/d+)/edit" render={props => <GameForm {...props} />} /> */}
        </ListedItemProvider>
        <SoldItemProvider>
            <Route exact path="/solditems">
                <SoldItemList {...props} />
            </Route>

            {/* <Route exact path="/games/:gameId(/d+)/edit" render={props => <GameForm {...props} />} /> */}
        </SoldItemProvider>
        <ExpenseProvider>
            <Route exact path="/expenses">
                <ExpenseList {...props} />
                {/* <Table {...props} /> */}
            </Route>
        </ExpenseProvider>
    </>
}