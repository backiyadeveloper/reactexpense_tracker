import {expensecategory} from "../models/expense"
export const addexpensecategory = async (
    data: expensecategory,
    token: string
  ): Promise<string> => {
    const url = "http://localhost:8080/api/addexpensecategory";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg);
    }
  
    return response.text();
  };