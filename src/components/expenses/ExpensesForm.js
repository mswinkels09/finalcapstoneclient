import React, { useContext, useState, useEffect } from "react"
import { TypesContext } from "../TypesProvider";
import { ExpenseContext } from "./ExpenseProvider";
import {  Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export const ExpenseForm = props => {
    const{addExpense, expenses, editExpense} = useContext(ExpenseContext)
    const{supplyTypes, getSupplyTypes} = useContext(TypesContext)

    const expensePathId = parseInt(window.location.pathname.split('/')[2])

    const [expense, setExpense] = useState({})

    useEffect(() => {
        getSupplyTypes()
    }, [])
    
    useEffect(() => {
        getExpenseInEditMode()
    }, {expensePathId})

    const handleControlledInputChange = (event) => {
        const newExpenseState = Object.assign({}, expense)
        newExpenseState[event.target.name] = event.target.value
        setExpense(newExpenseState)
    }

    const getExpenseInEditMode = () => {
            const selectedExpense = expenses.find(expense => expense.id === expensePathId) || {}
            setExpense(selectedExpense)
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
        <h2>Add New Expense</h2>
        <Form>
            <FormGroup>
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
            <FormGroup>
                <Input type="date" name="date_purchased" id="date_purchased" placeholder="Select Date" 
                    value={expense.date_purchased}
                    onChange={handleControlledInputChange}/>
            </FormGroup>
            <FormGroup>
                <Input type="number" name="cost" id="cost" placeholder="Reciept Total" 
                    value={expense.cost}
                    onChange={handleControlledInputChange}/>
            </FormGroup>
        </Form>
        <button
            onClick={evt => {
                evt.preventDefault() 
                constructNewExpense()
            }}
                className="btn btn-primary">
                    {expensePathId ?"Save" :"Submit"}
        </button>
        </>
        )
}