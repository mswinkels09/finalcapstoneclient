import React, { useContext, useState, useEffect } from "react"
import { TypesContext } from "../TypesProvider";
import { ExpenseContext } from "./ExpenseProvider";
import {  Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export const ExpenseForm = props => {
    const{addExpense, expenses} = useContext(ExpenseContext)
    const{supplyTypes, getSupplyTypes} = useContext(TypesContext)

    const [expense, setExpense] = useState({
        suppply_type_id: parseInt(""),
        date_purchased: "",
        cost: parseInt("")
    })

    useEffect(() => {
        getSupplyTypes()
    }, [])

    const handleControlledInputChange = (event) => {
        const newExpenseState = Object.assign({}, expense)
        newExpenseState[event.target.name] = event.target.value
        setExpense(newExpenseState)
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
        <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()
    
                        const newexpense = {
                            supply_type_id: parseInt(expense.supply_type_id),
                            date_purchased: expense.date_purchased,
                            cost: parseFloat(expense.cost),
                            image: ""
                        }
    
                        // Send POST request to your API
                        addExpense(newexpense)
                            .then(props.history.push("/expenses"))
                    }}
                    className="btn btn-primary">Save</button>
        </>
        )
}