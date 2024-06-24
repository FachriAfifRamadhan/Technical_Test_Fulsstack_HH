import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './style.css';

const Pengaturan = () => {
    const [name, setName] = useState("");
    const [rate, setRate] = useState("");

    const getData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("http://localhost:5002/test");
            const { response: dataResponse, durasi } = response.data;

            // Store name and rate in local storage
            localStorage.setItem('name', name);
            localStorage.setItem('rate', rate);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex-container">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>React App</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" />
            </head>
            <header className="header">
                <h1>HH Timesheet</h1>
                <nav>
                    <Link to="/">Daftar Kegiatan</Link>
                    <Link to="/pengaturan">Pengaturan</Link>
                </nav>
            </header>
             <div className="container">
                 <form onSubmit={getData}>
                     <div className='field'>
                         <label className='label'>Nama Karyawan</label>
                         <div className='control'>
                             <input type='text' className='input' value={name} onChange={(e)=> setName(e.target.value)}/>
                         </div>
                     </div>
                     <div className='field'>
                         <label className='label'>Rate</label>
                         <div className='control'>
                             <input type='text' className='input' value={rate} onChange={(e)=> setRate(e.target.value)} placeholder='/jam'/>
                         </div>
                     </div>
                     <div className='field'>
                        <button type='submit' className='button is-cancel'>
                             Batalkan
                         </button>
                         <button type='submit' className='button is-save'>
                             Simpan
                         </button>
                     </div>
                 </form>
             </div>
        </div>
    )
}

export default Pengaturan;
