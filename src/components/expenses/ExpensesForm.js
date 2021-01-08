import React, { useContext, useState, useEffect } from "react"
import { TypesContext } from "../TypesProvider";
import { ExpenseContext } from "./ExpenseProvider";
import {  Button, Form, FormGroup, Label, Input, FormText} from "reactstrap";
import "./Expenses.css"

export const ExpenseForm = props => {
    const{addExpense, expenses, editExpense} = useContext(ExpenseContext)
    const{supplyTypes, getSupplyTypes} = useContext(TypesContext)

    const expensePathId = parseInt(window.location.pathname.split('/')[2])

    const [expense, setExpense] = useState({})

    useEffect(() => {
        getSupplyTypes()
    }, [])
    
    useEffect(() => {
        if(expensePathId){
            getExpenseInEditMode()
        }
    }, {expensePathId})

    const handleControlledInputChange = (event) => {
        const newExpenseState = Object.assign({}, expense)
        newExpenseState[event.target.name] = event.target.value
        setExpense(newExpenseState)
    }

    const getExpenseInEditMode = () => {
            const selectedExpense = expenses.find(expense => expense.id === expensePathId) || {}
            const selectedExpenseUnnested = {
                id: selectedExpense.id,
                supply_type_id: parseInt(selectedExpense.supply_type.id),
                date_purchased: selectedExpense.date_purchased,
                cost: selectedExpense.cost,
                image: ""
            }
            setExpense(selectedExpenseUnnested)
    }

    const constructNewExpense = () => {
        if (expensePathId) {
            editExpense({
                id: expense.id,
                supply_type_id: parseInt(expense.supply_type_id),
                date_purchased: expense.date_purchased,
                cost: expense.cost,
                image: ""
            })

                .then(() => props.history.push("/expenses"))
        } else {
            addExpense({
                supply_type_id: parseInt(expense.supply_type_id),
                date_purchased: expense.date_purchased,
                cost: expense.cost,
                image: ""
            })
                .then(() => props.history.push("/expenses"))
        }
    }

    return(
        <>
        <div className="expenseform">
            <div className="form__main">
                <Form className="form__div">
                    <div className="center_item_title_form">
                        <h2 className="form__title">{expensePathId ?"Edit Expense" :"Add New Expense"}</h2>
                    </div>
                    <FormGroup className="form__detail">
                        <select name="supply_type_id" id="supply_type" value={expense.supply_type_id}
                            onChange={handleControlledInputChange}>
                            <option value="">Select Supply Type</option>
                            {supplyTypes.map(st => (
                                <option key={st.id} value={st.id}>
                                    {st.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>
                    <FormGroup className="form__detail">
                        <Input type="date" name="date_purchased" id="date_purchased" placeholder="Select Date" 
                            value={expense.date_purchased}
                            onChange={handleControlledInputChange}/>
                    </FormGroup>
                    <FormGroup className="form__detail">
                        <Input type="number" name="cost" id="cost" placeholder="Reciept Total" 
                            value={expense.cost}
                            onChange={handleControlledInputChange}/>
                    </FormGroup>
                    <div className="form__buttons">
                        <Button color="success"
                            onClick={evt => {
                                evt.preventDefault() 
                                constructNewExpense()
                            }}
                                className="form__expense_button table__button">
                                    {expensePathId ?"Save" :"Submit"}
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
        </>
        )
}