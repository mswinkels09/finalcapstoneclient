import React from "react"
import { Route } from "react-router-dom"
import { ListedItemList } from "./listedItems/ListedItemList";
import { ItemForm } from "./listedItems/ListedItemsForm";
import { ListedItemProvider } from "./listedItems/ListedItemProvider";
import { SoldItemList } from "./soldItems/SoldItemList";
import { SoldItemProvider } from "./soldItems/SoldItemProvider";
import { ExpenseList } from "./expenses/ExpenseList";
import { ExpenseProvider } from "./expenses/ExpenseProvider";
import { TypesProvider } from "./TypesProvider";

export const ApplicationViews = (props) => {
    return <>
        <ListedItemProvider>
            <TypesProvider>
                <Route exact path="/listeditems">
                    <ListedItemList {...props} />
                </Route>
                <Route exact path="/newitem">
                    <ItemForm {...props} />
                </Route>
            </TypesProvider>
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
            </Route>
        </ExpenseProvider>
    </>
}