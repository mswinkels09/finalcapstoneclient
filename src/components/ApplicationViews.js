import React from "react"
import { Route } from "react-router-dom"
import { ListedItemList } from "./listedItems/ListedItemList";
import { ItemForm } from "./listedItems/ListedItemsForm";
import { ListedItemProvider } from "./listedItems/ListedItemProvider";
import { SoldItemList } from "./soldItems/SoldItemList";
import { SoldItemProvider } from "./soldItems/SoldItemProvider";
import { ExpenseList } from "./expenses/ExpenseList";
import { TypesProvider } from "./TypesProvider";
import { ExpenseForm } from "./expenses/ExpensesForm";
import { ExpenseProvider } from "./expenses/ExpenseProvider";
import { ExpenseDetails } from "./expenses/ExpenseDetail";

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
        </SoldItemProvider>
        <ExpenseProvider>
            <TypesProvider>
                <Route exact path="/expenses">
                    <ExpenseList {...props} />
                </Route>
                <Route exact path="/addexpense">
                    <ExpenseForm {...props} />
                </Route>
                <Route exact path="/expenses/:expenseId(\d+)">
                    <ExpenseDetails {...props} />
                </Route>
            </TypesProvider>
        </ExpenseProvider>
    </>
}