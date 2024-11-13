import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal_Addproduct from "./Modal_Addproduct.jsx";

function Warehouse() {
    const [search_query, setsearch_query] = useState("");
    const [apidata, setapidata] = useState([]);
    const [isaddproductmodal, setisaddproductmodal] = useState(false);
    const [isDeleteModalOpen, setisDeleteModalOpen] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editProductId, setEditProductId] = useState('');
    const [editProductPrice, setEditProductPrice] = useState(0);
    const [editProductAmount, setEditProductAmount] = useState(0);

    const openModal = (id) => {
        setDeleteId(id);
        setisDeleteModalOpen(true);
    };

    const closeModal = () => {
        setDeleteId('');
        setisDeleteModalOpen(false);
    };

    useEffect(() => {
        // Fetch database as we open warehouse page
        axios.get('http://localhost:5000/api/allsparepart')
            .then((res) => {
                setapidata(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function search(event) {
        event.preventDefault();
        console.log("search : ", search_query);
        axios.post('http://localhost:5000/api/searchquery', {
            search_query: search_query
        })
        .then((res) => {
            console.log(res);
            setapidata(res.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    function addproduct(event) {
        event.preventDefault();
        console.log("addproduct");
        setisaddproductmodal(true);
    }

    function edititem(id, price, amount) {
        setEditProductId(id);
        setEditProductPrice(price);
        setEditProductAmount(amount);
        setIsEditModalOpen(true);
    }

    function deleteitem(id) {
        openModal(id);
    }

    function confirmDelete() {
        axios.delete(`http://localhost:5000/api/deletesparepart/${deleteId}`)
            .then((res) => {
                closeModal();
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    }

    function cancelDelete() {
        closeModal();
    }

    // Modal for editing product details
    const Modal_EditProduct = ({ setIsEditModalOpen, productId, currentPrice, currentAmount }) => {
        const [price, setPrice] = useState(currentPrice);
        const [amount, setAmount] = useState(currentAmount);

        const handleUpdate = (event) => {
            event.preventDefault();
            axios.put(`http://localhost:5000/api/updateproduct/${productId}`, {
                SparePart_Price: price,
                SparePart_Amount: amount
            })
            .then((res) => {
                console.log(res);
                // Refresh data after update
                axios.get('http://localhost:5000/api/allsparepart')
                    .then((res) => {
                        setapidata(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                setIsEditModalOpen(false);
            })
            .catch((error) => {
                console.error(error);
            });
        };

        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded shadow-lg">
                    <h2 className="text-[1.5vw] mb-4">แก้ไขสินค้า</h2>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label className="block mb-2">ราคาต่อหน่วย:</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="border rounded p-2 w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">จำนวนคงเหลือ:</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="border rounded p -2 w-full"
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded">
                                ยกเลิก
                            </button>
                            <button type="submit" className="bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded">
                                บันทึก
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <>
            {!isaddproductmodal && (
                <div className="flex flex-col justify-center">
                    <h1 className="text-[1.5vw] mb-4 text-center pt-4">รายการสินค้าคงคลัง</h1>
                    <form className="content-start mx-8 my-2">
                        <div className="flex space-x-4 content-center">
                            <input value={search_query} type="search" id="search_query" className="block w-full p-4 text-[1vw] text-gray-900 border border-gray-300 rounded-lg bg-gray-100" placeholder="ค้นหาชื่อ/รหัสสินค้า" onChange={e => setsearch_query(e.target.value)} />
                            <button type='button' id="search" onClick={search}><img src='/images/search-symbol.png' className='h-[2vw] w-[2vw]'></img></button>
                            <button type='button' id="add" onClick={addproduct} className='block rounded mx-4 px-6 py-2 text-[1vw] bg-blue-400 hover:bg-blue-500 active:bg-blue-700 whitespace-nowrap'>เพิ่มสินค้า</button>
                        </div>
                    </form>
                    <div className='flex mx-4 my-4'>
                        <button type='button' id='filter_all' className='text-left block rounded mx-2 px-4 py-2 text-gray-700 bg-blue-400 hover:bg-blue-500 focus:bg-blue-500'>ทั้งหมด</button>
                        <button type='button' id='filter_wheel' className='text-left block rounded mx-2 px-4 py-2 text-gray-700 bg-blue-400 hover:bg-blue-500 focus:bg-blue-500'>ล้อ</button>
                        <button type='button' id='filter_bearings' className='text-left block rounded mx-2 px-4 py-2 text-gray-700 bg-blue-400 hover:bg-blue-500 focus:bg-blue-500'>ลูกปืน</button>
                        <button type='button' id='filter_rubber' className='text-left block rounded mx-2 px-4 py-2 text-gray-700 bg-blue-400 hover:bg-blue-500 focus:bg-blue-500'>ยาง</button>
                        <button type='button' id='filter_motor' className='text-left block rounded mx-2 px-4 py-2 text-gray-700 bg-blue-400 hover:bg-blue-500 focus:bg-blue-500'>เครื่องยนต์</button>
                        <button type='button' id='filter_oil' className='text-left block rounded mx-2 px-4 py-2 text-gray-700 bg-blue-400 hover:bg-blue-500 focus:bg-blue-500'>น้ำมันเครื่อง</button>
                        <button type='button' id='filter_etc' className='text-left block rounded mx-2 px-4 py-2 text-gray-700 bg-blue-400 hover:bg-blue-500 focus:bg-blue-500'>อื่น</button>
                    </div>

                    <div className='relative overflow-x-auto'>
                        <table className="w-full text-left text-[1vw] table-auto">
                            <thead>
                                <tr>
                                    <th className='text-start px-6 py-2'>รูปภาพ</th>
                                    <th className='text-start px-3 py-2'>รหัสสินค้า</th>
                                    <th className='text-start px-3 py-2'>ชื่่อสินค้า</th>
                                    <th className='text-start px-6 py-2'>ประเภท</th>
                                    <th className='text-start px-6 py-2'>จำนวนคงเหลือ</th>
                                    <th className='text-start px-6 py-2'>ราคาต่อหน่วย</th>
                                    <th className='text-end px-6 py-2'>แก้ไข</th>
                                    <th className='text-end px-6 py-2'>ลบ</th>
                                </tr>
                            
                            </thead>
                            <tbody>
                                {apidata.map((item, index) => (
                                    <tr key={index}>
                                        <td className='text-start px-3 py-2'>{item.SparePart_Image}</td>
                                        <td className='text-start px-3 py-2'>{item.SparePart_ProductID}</td>
                                        <td className='text-start px-3 py-2'>{item.SparePart_Name}</td>
                                        <td className='text-start px-3 py-2'>{item.Category_Name}</td>
                                        <td className='text-start px-3 py-2'>{item.SparePart_Amount}</td>
                                        <td className='text-start px-3 py-2'>{item.SparePart_Price}</td>
                                        <td className='text-end px-2 py-2' onClick={() => edititem(item.SparePart_ID, item.SparePart_Price, item.SparePart_Amount)}>
                                            <button type='button'>
                                                <svg className="mr-4 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="gray" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                                </svg>
                                            </button>
                                        </td>
                                        <td className='text-end py-2' onClick={() => deleteitem(item.SparePart_ID)}>
                                            <button type='button'>
                                                <svg className="mr-4 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {isaddproductmodal && (
                <Modal_Addproduct setisaddproductmodal={setisaddproductmodal} />
            )}
            {isEditModalOpen && (
                <Modal_EditProduct 
                    setIsEditModalOpen={setIsEditModalOpen} 
                    productId={editProductId} 
                    currentPrice={editProductPrice} 
                    currentAmount={editProductAmount} 
                />
            )}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-[1.5vw] mb-4">ต้องการลบสินค้าหรือไม่</h2>
                        <div className="flex space-x-20 items-center justify-center">
                            <button onClick={cancelDelete} className="block rounded px-4 py-2 text-gray-700 bg-red-400 hover:bg-red-600 active:bg-red-700">
                                ยกเลิก
                            </button>
                            <button onClick={confirmDelete} className="block rounded px-4 py-2 text-gray-700 bg-green-400 hover:bg-green-600 active:bg-green-700">
                                ยืนยัน
                            </ button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Warehouse;