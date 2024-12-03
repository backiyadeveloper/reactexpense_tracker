import React, { useEffect, useState } from "react";
import {getexpense,deletedata} from "../../service/getexpenseservice"
import {Expense} from "../../models/getexpense"
import "./home.css"
export function Home(){
    const token=localStorage.getItem("token")
    const userid=localStorage.getItem("userid")
    const [expense,setExpense]=useState<Expense[]>([]);
    useEffect(() => {
        const fetchExpenses = async () => {
        
          if (!userid || !token) {
            console.error("Missing user ID or token. Redirecting to login...");
            window.location.href = "../html/signup.html";
            return;
          }
    
          try {
            const data = await getexpense(parseInt(userid), token);
            setExpense(data);
            console.log(data)
          } catch (error) {
            console.error("Error fetching expenses:", error);
          }
        };
    
        fetchExpenses();
      }, [userid, token]);
      const deletecategory = async (userid: number, categoryid: number) => {
        const token = localStorage.getItem("token");
    
       
        if (!token) {
          console.error("Token is missing. Redirecting to login...");
          window.location.href = "../html/signup.html";
          return;
        }
    
        try {
          const response = await deletedata(userid, categoryid, token);
          console.log("Delete response:", response);
    
        
          setExpense((prevExpenses) =>
            prevExpenses.filter(
              (expense) =>
                !(expense.userId === userid && expense.categoryId === categoryid)
            )
          );
        } catch (error) {
          console.error("Error deleting category:", error);
        }
      };
    return(
    <>
         <div className="viewdiv">
        <h1 id="username">All Expenses</h1>
        <center>
            <table id="expenstable">
                <tr>
                   
                    <th>category id</th>
                    <th>category name</th>
                    <th>cateory type</th>
                    <th>date</th>
                    <th>amount</th>
                    <th>Edit</th>
                    <th>delete</th>
                </tr>
                <tbody>
                    {
                        expense.map((expense)=>(
                            <tr key={`${expense.userId}-${expense.categoryId}`}>
                                <td>{expense.categoryId}</td>
                                <td>{expense.categoryName}</td>
                                <td>{expense.categoryType}</td>
                                <td>{expense.date}</td>
                                <td>{expense.amount}</td>
                                <td><button className="incomexpens1">Edit</button></td>
                                <td><button className="incomexpens1" onClick={()=>deletecategory(expense.userId,expense.categoryId)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
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