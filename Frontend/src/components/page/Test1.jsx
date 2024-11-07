import React, { useState } from "react";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";

function Test1() {
    return <>
    <Navbar/>
      <div className="text-center">Test1</div>
        <div className="text-left">TestLeft</div>
        <input className="w-fit border border-gray-600 p-2 rounded" type="text" typer="number" placeholder="1500.."/>
    <Footer />
    </>
}

export default Test1;
