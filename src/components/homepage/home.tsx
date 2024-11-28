import React from "react";

import "./home.css"
export function Home(){
    return(
    <>
         <div className="viewdiv">
        <h1 id="username">All Expenses</h1>
        <center>
            <table id="expenstable">
                <tr>
                    <th>user id</th>
                    <th>category id</th>
                    <th>category name</th>
                    <th>cateory type</th>
                    <th>date</th>
                    <th>amount</th>
                    <th>Edit</th>
                    <th>delete</th>
                </tr>

            </table>
        </center>
    </div>
    <div id="editModal" className="modal" >
        <div className="modal-content viewdiv">
            <span className="close">&times;</span>
            <h2>Edit Expense</h2>
            <form id="editForm">
                <label htmlFor="userId">Enter a user ID:</label>
                <input type="number" id="userId" readOnly required></input>

                <label htmlFor="categoryId">Enter a category ID:</label>
                <input type="number" id="categoryId" readOnly required></input>

                <label htmlFor="expense">Enter an categoryname:</label>
                <input type="text" id="expense" required></input>

                <label htmlFor="expense">Enter an type:</label>
                <input type="text" id="type" required></input>

                <label htmlFor="date">Enter a date (dd/mm/yyyy):</label>
                <input type="text" id="date" required></input>

                <label htmlFor="amount">Enter an amount:</label>
                <input type="number" id="amount" required></input>

                <button type="submit" className="incomexpens">Save Changes</button>
            </form>
        </div>
    </div>
 </>
    );
};