import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import './style.css';
import update from '../media/update.png';
import del from '../media/delete.png';
import filt from '../media/Filter.png';
import search from '../media/search.png';
import success from '../media/Success.png';

const List = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterMode, setIsFilterMode] = useState(false);
    const [totalDurasi, setTotalDurasi] = useState("");
    const [totalDurasim, setTotalDurasiM] = useState(0);
    const [totalDurasiLembur, setTotalDurasiLembur] = useState(0);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        judul_kegiatan: '',
        nama_proyek: '',
        tanggal_mulai: '',
        tanggal_berakhir: '',
        waktu_mulai: '',
        waktu_berakhir: ''
    });
    const [editId, setEditId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [name, setName] = useState("");
    const [rate, setRate] = useState(null);
    const [fee, setFee] = useState(null);
    const [isSuccessPopup, setIsSuccessPopup] = useState(false);

    useEffect(() => {
        getData();
        const storedName = localStorage.getItem('name');
        const storedRate = localStorage.getItem('rate');
        if (storedName) setName(storedName);
        if (storedRate) setRate(storedRate);
    }, []);

    useEffect(() => {
        if (rate !== null) {
            const rateValue = parseFloat(rate);
            const calculatedFee = (((totalDurasim - totalDurasiLembur) * (rateValue / 60))) + (totalDurasiLembur * ((rateValue / 60) * 1.3));
            setFee(calculatedFee);
        }
    }, [rate, totalDurasim, totalDurasiLembur]);

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:5002/test");
            const { response: dataResponse, durasi, total_durasi, total_durasi_lembur } = response.data;
            setData(dataResponse);
            setTotalDurasi(durasi);
            setTotalDurasiM(total_durasi);
            setTotalDurasiLembur(total_durasi_lembur);
        } catch (error) {
            console.log(error);
        }
    };

    const getFilteredData = async (searchTerm) => {
        try {
            const response = await axios.post("http://localhost:5002/test/search", { judul_kegiatan: searchTerm });
            const { data: dataResponse, durasi, total_durasi, total_durasi_lembur } = response.data;
            setData(dataResponse);
            setTotalDurasi(durasi);
            setTotalDurasiM(total_durasi);
            setTotalDurasiLembur(total_durasi_lembur);
        } catch (error) {
            console.log(error);
        }
    };

    const getFilteredDataProyek = async (searchTerm) => {
        try {
            const response = await axios.post("http://localhost:5002/test/search", { nama_proyek: searchTerm });
            const { data: dataResponse, durasi, total_durasi, total_durasi_lembur } = response.data;
            setData(dataResponse);
            setTotalDurasi(durasi);
            setTotalDurasiM(total_durasi);
            setTotalDurasiLembur(total_durasi_lembur);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteData = async (id) => {
        try {
            await axios.delete(`http://localhost:5002/test/delete/${id}`);
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    const openModal = (data = null) => {
        setIsModalOpen(true);
        if (data) {
            setFormData(data);
            setIsEditMode(true);
            setEditId(data.id);
            setIsFilterMode(false);
        } else {
            setFormData({
                judul_kegiatan: '',
                nama_proyek: '',
                tanggal_mulai: '',
                tanggal_berakhir: '',
                waktu_mulai: '',
                waktu_berakhir: ''
            });
            setIsEditMode(false);
            setIsFilterMode(false);
        }
    };

    const openFilterModal = () => {
        setIsModalOpen(true);
        setIsFilterMode(true);
        setFormData({
            nama_proyek: ''
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        setIsSuccessPopup(true);
    
        if (isEditMode) {
            await axios.patch(`http://localhost:5002/test/patch/${editId}`, formData);
            getData();
        } else if (isFilterMode) {
            await getFilteredDataProyek(formData.nama_proyek);
        } else {
            await axios.post('http://localhost:5002/test/post', formData);
            getData();
        }
    
        // Wait for 2 seconds before closing the modal
        setTimeout(() => {
            setIsSuccessPopup(false);
            closeModal();
        }, 2000);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        getFilteredData(e.target.value);
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
            <div className="employee-details">
                <div>
                    <span>Nama Karyawan</span>
                    <p>{name}</p>
                </div>
                <div className="rate">
                    <span>Rate</span>
                    <p>{rate} /jam</p>
                </div>
            </div>
            <div className="activity-list">
                <div className="head-activity-list">
                    <div className="left-items">
                        <h2>Daftar Kegiatan</h2>
                        <button className="button is-primary" onClick={() => openModal()}>⊕ Tambah Kegiatan</button>
                    </div>

                    <div className="right-items">
                        <div>
                            <button className="search-button">
                                <img className="search-icon" src={search}></img>
                            </button>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Cari"
                                value={searchTerm}
                                onChange={handleSearch}
                                className="search-input"
                            />
                        </div>
                        <div>
                            <button onClick={openFilterModal}>
                                <img className="filter" src={filt} alt="Filter"></img>
                            </button>
                        </div>
                    </div>
                </div>
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th className="judul">Judul Kegiatan</th>
                            <th>Nama Proyek</th>
                            <th>Tanggal Mulai</th>
                            <th>Tanggal Berakhir</th>
                            <th>Waktu Mulai</th>
                            <th>Waktu Berakhir</th>
                            <th>Durasi</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && data.map((data, index) => (
                            <tr key={data.id}>
                                <td className="judul">{data.judul_kegiatan}</td>
                                <td>{data.nama_proyek}</td>
                                <td>{data.tanggal_mulai}</td>
                                <td>{data.tanggal_berakhir}</td>
                                <td>{data.waktu_mulai}</td>
                                <td>{data.waktu_berakhir}</td>
                                <td>{data.durasi}</td>
                                <td className="action-tab">
                                    <div className="update-button">
                                        <button onClick={() => openModal(data)}>
                                            <img className="upd" src={update}></img>
                                        </button>
                                    </div>
                                    <div className="delete-button">
                                        <button onClick={() => deleteData(data.id)}>
                                            <img className="del" src={del}></img>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="summary">
                    <div className="s1">
                        <div className="duration">
                            <span>Total Durasi:</span>
                        </div>
                        <div>
                            <p>{totalDurasi}</p>
                        </div>
                    </div>
                    <div className="s2">
                        <div>
                            <span>Total Pendapatan:</span>
                        </div>
                        <div className="totalfee">
                            <p>Rp.{fee !== null ? fee.toFixed(0) : 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
                formData={formData}
                handleChange={handleChange}
                isFilterMode={isFilterMode}
            />
        </div>
    );
};

export default List;
