import React from "react";
import "./nav.css"
import navimg from "../../assets/images.png";
export function Navbar(){
    return(
        <>
          <div className="navborder">
      
          <img src={navimg} className="navimg"  alt=""></img>
    
        <nav className="navtag">
            <a href="./home.html" className="atag">Home</a>
            <a href="./expense.html" className="atag">Expens and category</a>
            <a href="./income.html" className="atag">Income</a>
            <a href="./user.html" className="atag">User</a>
            <a href="./viewbycategory.html" className="atag">view by Category</a>
            <a href="./viewbydates.html" className="atag">view by dates</a>
            <a href="./report.html" className="atag">Report</a>
            <a href="./report.html"  className="atag">logout</a>
        </nav>
    </div>
        </>
    )
}