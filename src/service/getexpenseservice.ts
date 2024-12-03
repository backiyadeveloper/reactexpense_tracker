import {Expense} from "../models/getexpense"
export const getexpense=async(userid:number,token:string):Promise<Expense[]>=>{
    const response = await fetch(`http://localhost:8080/api/getExpenses/${userid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
})
if (!response.ok) {
    throw new Error(`Failed to fetch expenses: ${response.statusText}`);
  }
  const data: Expense[] = await response.json();
  return data;
}

export const deletedata=async(userid:number,categoryid:number,token:string):Promise<string>=>{
    try{
    const response=await fetch(`http://localhost:8080/api/delete/${userid}`,{
    method:"DELETE",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    body:JSON.stringify({categoryid:categoryid})
    }
    )
    if (response.ok) {
        
        return "Expense deleted successfully";
      } else {
      
        const errorMessage = await response.text();
        throw new Error(`Failed to delete expense: ${errorMessage}`);
      }
    } catch (error: any) {
     
      throw new Error(`Error deleting expense: ${error.message}`);
    }
}