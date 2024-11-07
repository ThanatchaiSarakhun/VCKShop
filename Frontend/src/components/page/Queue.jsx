import React, { useState } from "react";
import Navbar from "../Navbar.jsx"
import Footer from "../Footer.jsx"

function Queue()
{
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [errorFullName, setErrorFullName] = useState('');
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorDate, setErrorDate] = useState('');
    const [errorTime, setErrorTime] = useState('');
    const [isModalOpen, setIsModalOpen] = useState('');
    const [serviceType, setServiceType] = useState('ตรวจเช็ครถยนต์ครบวงจร'); // สถานะข้อมูลของประเภทการบริการ
    const [details, setDetails] = useState(
        `- เปลี่ยนล้อ\n- ยางล้อรถ Brimstone\n- เปลี่ยนอะไหล่\n- ลูกปืนล้อหน้า HONDA CIVIC FC ปี 2016-2020 (1 ตัว) แท้`
    );

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const handleSubmit = (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้า

        if (!fullName) {
            setErrorFullName("กรุณากรอกชื่อ-นามสกุล");
        } else if (fullName) {
            setErrorFullName(''); // หากกรอกแล้ว ให้เคลียร์ข้อความเตือน
        }

        if (!phoneNumber) {
            setErrorPhoneNumber("กรุณากรอกเบอร์โทรศัพท์");
        } else if (phoneNumber) {
            setErrorPhoneNumber('');
        }

        if (!email) {
            setErrorEmail("กรุณากรอกอีเมล");
        } else if (email) {
            setErrorEmail('');
        }
        
        if (!date) {
            setErrorDate("กรุณากรอกวันที่จอง");
        } else if (date) {
            setErrorDate('');
        }

        if (!time) {
            setErrorTime("กรุณากรอกเวลาที่จอง");
        } else if (time) {
            setErrorTime('');
        }

        // ตรวจสอบว่าไม่มีข้อผิดพลาดในฟิลด์ทั้งหมดหรือไม่
        if (fullName && phoneNumber && email && date && time) {
            openModal();
        }
    };

    return <>
    <Navbar />
    <div class="bg-gray-100 p-6 shadow-md mx-auto w-full">
    <h1 class="text-3xl font-semibold mb-3 text-center">เครื่องมือสำหรับการจองเข้าใช้บริการอู่</h1>

    <div class="flex">
        <div class="w-1/3 mt-4 p-6">
            <h2 class="text-lg font-semibold mb-4">ระบุวันที่ต้องการจอง</h2>
            <label class="block text-gray-700 mb-2" for="date"> วันที่จอง </label>
            <input class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date" required onChange={(e) => setDate(e.target.value)}></input>
            {errorDate && <p className="text-red-500 text-sm mt-2">{errorDate}</p>}
        </div>

        <div class="w-2/3 mt-4 p-6">
            <h2 class="text-lg font-semibold mb-4">ระบุเวลาที่ต้องการจอง</h2>
            <label class="block text-gray-700 mb-2" for="time"> เวลา </label>
            <select id="time" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setTime(e.target.value)}>
                <option value="" disabled selected>--:--</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
            </select>
            {errorTime && <p className="text-red-500 text-sm mt-2">{errorTime}</p>}
        </div>
    </div>


    <div class="mt-4 bg-white p-6 rounded shadow">
        <h2 class="text-lg font-semibold mb-4">รายละเอียดผู้จอง</h2>
            <form class="space-y-8" oninput="checkForm()" onSubmit={handleSubmit}>
                <div class="flex space-x-4">
                    <div class="w-1/2">
                        <label class="block">ชื่อ-นามสกุล <span class="text-red-500">*</span></label>
                        <input type="text" class="w-full border border-gray-300 p-2 rounded" placeholder="ชื่อ-นามสกุล" value={fullName} onChange={(e) => setFullName(e.target.value)}></input>
                        {errorFullName && <p className="text-red-500 text-sm mt-2">{errorFullName}</p>}
                    </div>
                    <div class="w-1/2">
                        <label class="block text-sm font-normal">เบอร์โทรศัพท์ <span class="text-red-500">*</span></label>
                        <input type="tel" inputMode="numeric" class="w-full border border-gray-300 p-2 rounded" placeholder="เบอร์โทรศัพท์" value={phoneNumber} 
                            onChange={(e) => {
                                // ตรวจสอบให้กรอกเฉพาะตัวเลข
                                const value = e.target.value.replace(/[^0-9]/g, ''); 
                                setPhoneNumber(value);
                            }}>
                        </input>
                        {errorPhoneNumber && <p className="text-red-500 text-sm mt-2">{errorPhoneNumber}</p>}
                    </div>
                </div>
                <div class="flex space-x-4">
                    <div class="w-1/2">
                        <label class="block text-sm font-normal">อีเมล <span class="text-red-500">*</span></label>
                        <input type="email" class="w-full border border-gray-300 p-2 rounded" placeholder="อีเมล" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        {errorEmail && <p className="text-red-500 text-sm mt-2">{errorEmail}</p>}
                    </div>
                    <div className="w-1/2">
                        <label className="block text-sm font-normal">ประเภทการบริการ</label>
                        <select className="w-full border border-gray-300 p-2 rounded" value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                            <option>ตรวจเช็ครถยนต์ครบวงจร</option>
                            <option>เติมลมยาง</option>
                            <option>ตั้งศูนย์/ถ่วงล้อ</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-normal">รายละเอียด</label>
                    <textarea className="w-full border border-gray-300 p-2 rounded cursor-not-allowed" rows="4" value={details} readOnly />
                </div>
                    <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">ยืนยันการจอง</button>
            </form>
    </div>
    </div>
    {isModalOpen && ( //แสดงผล Modal
    <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center px-4">
        <div className="relative mx-auto shadow-xl rounded-md bg-white max-w-md w-full">
            <div className="p-6 pt-0 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mt-5 mb-4">ข้อมูลการจองของคุณ</h3>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md text-left mb-4">
                    <p className="text-gray-700 mb-2"><strong>ชื่อ-นามสกุล:</strong> {fullName}</p>
                    <p className="text-gray-700 mb-2"><strong>เบอร์โทรศัพท์:</strong> {phoneNumber}</p>
                    <p className="text-gray-700 mb-2"><strong>อีเมล:</strong> {email}</p>
                    <p className="text-gray-700 mb-2"><strong>วันที่จอง:</strong> {date}</p>
                    <p className="text-gray-700 mb-2"><strong>เวลาที่จอง:</strong> {time}</p>
                    <p className="text-gray-700 mb-2"><strong>ประเภทการบริการ:</strong> {serviceType}</p>
                    <p className="text-gray-700"><strong>รายละเอียด:</strong> {details}</p>
                </div>
                <button onClick={closeModal} className="text-black font-medium rounded-lg text-base px-4 py-2 mt-4 mr-16">ยกเลิก</button>
                <button onClick={closeModal} className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 font-medium rounded-lg text-base px-4 py-2 mt-4">ยืนยัน</button>
            </div>
        </div>
    </div>
    )}
    <Footer />
    </>
}

export default Queue