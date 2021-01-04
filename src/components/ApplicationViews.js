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
import { ListedItemDetails } from "./listedItems/ListedItemDetail";
import { SoldItemDetails } from "./soldItems/SoldItemDetail";
import { ExpenseSupplyTypeChart, ExpenseMonthChart } from "./expenses/ExpenseChart";
import { ProfitProvider } from "./profit/ProfitProvider";
import { ProfitListingTypeChart, ProfitCategoriesChart, ProfitMonthChart, ProfitYearChart } from "./profit/ProfitChart";

export const ApplicationViews = (props) => {
    return <>
        <ProfitProvider>
            <Route exact path="/profit">
                <ProfitListingTypeChart {...props} />
                <ProfitCategoriesChart {...props} />
                <ProfitMonthChart {...props} />
                <ProfitYearChart {...props} />
            </Route>
        </ProfitProvider>
        <ListedItemProvider>
            <TypesProvider>
                <Route exact path="/listeditems">
                    <ListedItemList {...props} />
                </Route>
                <Route exact path="/newitem">
                    <ItemForm {...props} />
                </Route>
                <Route exact path="/listeditems/:listedItemId(\d+)">
                    <ListedItemDetails {...props} />
                </Route>
                <Route exact path="/listeditems/:listedItemId(\d+)/edit">
                    <ItemForm {...props} />
                </Route>
            </TypesProvider>
        </ListedItemProvider>
        <SoldItemProvider>
            <Route exact path="/solditems">
                <SoldItemList {...props} />
            </Route>
            <Route exact path="/solditems/:soldItemId(\d+)">
                    <SoldItemDetails {...props} />
            </Route>
        </SoldItemProvider>
        <ExpenseProvider>
            <TypesProvider>
                <Route exact path="/expenses">
                    <ExpenseSupplyTypeChart {...props} />
                    <ExpenseMonthChart {...props} />
                    <ExpenseList {...props} />
                </Route>
                <Route exact path="/addexpense">
                    <ExpenseForm {...props} />
                </Route>
                <Route exact path="/expenses/:expenseId(\d+)">
                    <ExpenseDetails {...props} />
                </Route>
                <Route exact path="/expenses/:expenseId(\d+)/edit">
                    <ExpenseForm {...props} />
                </Route>
            </TypesProvider>
        </ExpenseProvider>
    </>
}