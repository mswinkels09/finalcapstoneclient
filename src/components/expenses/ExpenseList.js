import React, { useContext, useEffect, useState, useMemo } from "react"
import { ExpenseContext } from "./ExpenseProvider.js"
import { Table, Button } from "reactstrap";
import {ExpenseChart} from "./ExpenseChart"
import "./Expenses.css"
import sort from "../images/sort.png";

export const ExpenseList = (props) => {
    const { expenses, getExpenses } = useContext(ExpenseContext)

    const [data, setData] = useState(expenses);
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        getExpenses()
    }, [])
    useEffect(() => {
        setData(expenses)
    }, [expenses])



    const sortCost = () => {
        const sortedData = data.slice().sort((a, b) => {
            if(toggle === false){
                setToggle(true)
                return a.cost - b.cost
            }
            else if(toggle === true){
                setToggle(false)
                return b.cost - a.cost
            }
        })
        setData(sortedData);
    };

    const sortDate = () => {
        const sortedData = data.slice().sort((a, b) => {
            if(toggle === false){
                setToggle(true)
                return new Date(a.date_purchased) - new Date(b.date_purchased)
            }
            else if(toggle === true){
                setToggle(false)
                return new Date(b.date_purchased) - new Date(a.date_purchased)
            }
        })
        setData(sortedData);
    };

    
    return(
        <div className="expense__main">
            <div className="chart__main_expense">
                <ExpenseChart {...props} />
            </div>
            <div className="expense__main">
                <div className="table__main_expense table__main">
                    <div className="table__title">EXPENSES</div>
                    <Table className="table__main_expenses" bordered responsive>
                        <thead>
                            <tr>
                                <th>                            
                                    <div className="table__sort">
                                        Date
                                        <Button id="sorting__button" color="outline-success" onClick={() => sortDate()}>
                                            <img className="table__image" src={sort} width={25} height={25} />
                                        </Button>

                                    </div>
                                </th>
                                <th>Supply Type</th>
                                <th>
                                    <div className="table__sort">
                                        Amount Spent
                                        <Button id="sorting__button" color="outline-success" onClick={() => sortCost()}>
                                            <img className="table__image" src={sort} width={25} height={25} />
                                        </Button>

                                    </div>
                                </th>
                                <th>View Expense</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data.map(e => {
                                return(
                                    <tr>
                                        <td>{e.dateExpenseConverted}</td>
                                        <td>{e.supply_type.name}</td>
                                        <td>${e.cost.toFixed(2)}</td>
                                        <td><Button className="table__button" color="success" type="button" onClick={() => props.history.push(`/expenses/${e.id}`)}>View</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}