import React, { useState } from "react";
import "./addexpense.css";
import { expensecategory } from "../../models/expense"; 
import { addexpensecategory } from "../../service/expenseservice"; 
import { useNavigate } from "react-router-dom";

export function Addexpense() {
  const [categoryid, setCategoryid] = useState<number | undefined>();
  const [Expensename, setExpensename] = useState<string>(""); 
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string | undefined>();
  const [amount, setAmount] = useState<number | undefined>();
  const [message, setMessage] = useState<string | null>(null); 
  const token = localStorage.getItem("token");
  const navigate=useNavigate()
  console.log(token);
  if (!token) {
    console.error("Token is missing. Please log in again.");
    setMessage("User not authenticated. Please log in.");
    return;
  }
  
 
  
  const addexpenses = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryid || !amount || !description || !date || !Expensename) {
      setMessage("Please fill all fields!");
      return;
    }

    const expesnecategory: expensecategory = {
      expense: {
        userId: parseInt(localStorage.getItem("userid") || "0"),
        categoryId: categoryid,
        amount: amount,
        description: description,
        date: date,
      },
      category: {
        userid: parseInt(localStorage.getItem("userid") || "0"),
        categoryid: categoryid,
        name: Expensename,
        type: description,
      },
    };

    try {
      const result = await addexpensecategory(expesnecategory, token || "");
      setMessage("Expense added successfully!");
     
      setCategoryid(undefined);
      setExpensename("");
      setDescription("");
      setDate(undefined);
      setAmount(undefined);

     
     navigate("/home")
    } catch (error) {
      setMessage("Failed to add expense. Please try again.");
    }
  };

  return (
    <>
      <div className="expensediv">
        <div className="div1">
          <h1 className="expenseh1">Expenses and Categories</h1>
          <form id="expenseForm" onSubmit={addexpenses}>
            <div>
              <label htmlFor="categoryid">Enter a Category ID</label>
              <input
                type="number"
                id="categoryid"
                value={categoryid || ""}
                onChange={(e) => setCategoryid(Number(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="Expensename">Enter an Expense Name</label>
              <input
                type="text"
                id="Expensename"
                value={Expensename}
                onChange={(e) => setExpensename(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Enter a Description</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="date">Enter a Date</label>
              <input
                type="date"
                id="date"
                value={date || ""}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="amount">Enter an Amount</label>
              <input
                type="number"
                id="amount"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <button className="incomexpens" type="submit">
                Add Expense
              </button>
            </div>
          </form>
          {message && <span id="message" style={{ color: "green" }}>{message}</span>}
        </div>
      </div>
    </>
  );
}

