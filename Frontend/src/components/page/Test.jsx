import React, { useState } from "react";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";

function Test() {
    return <>
    <Navbar/>
        <div class="flex space-x-4">
            <div class="w-1/2">
                <label className="text-xl font-bold">ชื่อ-นามสกุล <span class="text-red-500">*</span></label>
                <input type="text" class="w-full border border-gray-300 p-2 rounded" placeholder="ชื่อ-นามสกุล"/>
            </div>
            <div class="w-1/2">
                <label className="text-xl font-bold">เบอร์โทรศัพท์ <span class="text-red-500">*</span></label>
                <input type="tel" inputMode="numeric" class="w-full border border-gray-300 p-2 rounded" placeholder="เบอร์โทรศัพท์"/> 
            </div>
        </div>
    <Footer />
    </>
}

export default Test;
