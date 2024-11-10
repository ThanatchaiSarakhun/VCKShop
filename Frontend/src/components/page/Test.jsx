import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";

function City2014() {
    const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true); // Loading state
    // const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // เรียก API เพื่อดึงข้อมูลจาก MySQL
        axios.get("http://localhost:5000/products")
            .then((response) => {
                setProducts(response.data); // ตั้งค่าผลลัพธ์ที่ได้ใน state
                //setLoading(false); // Set loading to false after data is fetched
            })
            // .catch((error) => {
            //     console.error("Error fetching data:", error);
            //     setError("Failed to load products."); // Set error message
            //     setLoading(false); // Set loading to false even if there is an error
            // });
    //}, []); // ทำการดึงข้อมูลเมื่อ component โหลดเสร็จ
    });

    // if (loading) {
    //     return <div>Loading...</div>; // Show loading indicator
    // }

    // if (error) {
    //     return <div>{error}</div>; // Show error message
    // }

    return <>
    <Navbar />
        <div className="flex p-4">
            <div class="flex items-center">
                <Link to="/City">
                    <button className="p-2 rounded">
                        <img src="src/components/image/back-icon.png" className="h-10 w-10"/>
                    </button>
                </Link>
            </div>
            <div class="flex p-4 justify-center items-center w-full">
                <h1 class="text-3xl font-semibold mb-6 text-center">ค้นหาจากรถยี่ห้อ Honda รุ่น City (2024)</h1>
            </div>
        </div>
        <div className="container mx-auto px-4">
            <p className="flex text-gray-900 text-2xl font-bold px-96 mb-6">หมวดหมู่</p>
            <div class="flex justify-center mb-3 space-x-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl">ทั้งหมด</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded-xl ml-2">โช็ค</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl ml-2">ผ้าเบรค</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl ml-2">จานเบรค</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl ml-2">หัวเทียน</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-xl ml-2">ลูกปืน</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded-xl ml-2">อื่นๆ</button>
            </div>
            <div className="grid lg:grid-cols-4 gap-4 m-10"> 
                {products.map((product) => (
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-lg font-bold">{product.name}</h2>
                        <p className="text-gray-400 mb-3">รหัสสินค้า {product.sku}</p>
                        <p className="text-cyan-400 mb-3">{product.description}</p>
                        <div className="flex items-center text-red-500">
                            <span>*</span><p className="text-gray-700 ml-1">{product.price} บาท</p>
                        </div>
                        <button className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">เพิ่มไปยังตะกร้า</button>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
        </>
}

export default City2014;