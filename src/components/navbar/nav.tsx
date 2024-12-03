import React from "react";
import "./nav.css"
import { Link } from "react-router-dom";
import navimg from "../../assets/images.png";
export function Navbar(){
    return(
        <>
          <div className="navborder">
      
          <img src={navimg} className="navimg"  alt=""></img>
    
        <nav className="navtag">
        <Link to={"/home"} className="atag"><a >Home</a></Link>
            <Link to={"/expense"} className="atag"><a >Expens and category</a></Link>
           <Link to="" className="atag"> <a href="./income.html">Income</a></Link>
            <Link to="" className="atag"><a href="./user.html">User</a></Link>
            <Link to="" className="atag"><a href="./viewbycategory.html">view by Category</a></Link>
            <Link to="" className="atag"><a href="./viewbydates.html">view by dates</a></Link>
            <Link to="" className="atag"><a href="./report.html">Report</a></Link>
           <Link to={"/logout"} className="atag"> <a  >logout</a></Link>
        </nav>
    </div>
        </>
    )
}