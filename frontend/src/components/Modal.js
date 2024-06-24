import React, { useState } from 'react';
import './style.css';
import success from '../media/Success.png';

const Modal = ({ isOpen, onClose, onSubmit, formData, handleChange, isFilterMode }) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    if (!isOpen) return null;

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit();
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
            setTimeout(() => {
                onClose();
            }, 1000); // Additional delay before closing the modal to ensure message is fully hidden
        }, 2000); // Show success message for 2 seconds
    };

    return (
        <>
            {showSuccessMessage && (
                <div className="success-popup">
                    <img src={success} alt="Success" />
                    <h2>Berhasil</h2>
                    <p>{isFilterMode ? 'Filter berhasil diterapkan.' : 'Tambah Proyek Baru Berhasil.'}</p>
                </div>
            )}
            <div className="modal is-active">
                <div className="modal-background" onClick={onClose}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            {isFilterMode ? 'Filter Kegiatan' : 'Tambah / Edit Kegiatan Baru'}
                        </p>
                        <button className="delete" aria-label="close" onClick={onClose}></button>
                    </header>
                    <section className="modal-card-body">
                        <form onSubmit={handleFormSubmit}>
                            {!isFilterMode ? (
                                <>
                                    <div className='timeform'>
                                        <div className="fieldtime">
                                            <label className="label">Tanggal Mulai</label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type="date"
                                                    name="tanggal_mulai"
                                                    value={formData.tanggal_mulai}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="fieldtime">
                                            <label className="label">Tanggal Berakhir</label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type="date"
                                                    name="tanggal_berakhir"
                                                    value={formData.tanggal_berakhir}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="fieldtime">
                                            <label className="label">Waktu Mulai</label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type="time"
                                                    name="waktu_mulai"
                                                    value={formData.waktu_mulai}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="fieldtime">
                                            <label className="label">Waktu Berakhir</label>
                                            <div className="control">
                                                <input
                                                    className="input"
                                                    type="time"
                                                    name="waktu_berakhir"
                                                    value={formData.waktu_berakhir}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Judul Kegiatan</label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                name="judul_kegiatan"
                                                value={formData.judul_kegiatan}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : null}
                            <div className="field">
                                <label className="label">Nama Proyek</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name="nama_proyek"
                                        value={formData.nama_proyek}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-cancel m-5" onClick={onClose}>Kembali</button>
                        <button className="button is-success" onClick={handleFormSubmit}>
                            {isFilterMode ? 'Filter' : 'Simpan'}
                        </button>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Modal;
