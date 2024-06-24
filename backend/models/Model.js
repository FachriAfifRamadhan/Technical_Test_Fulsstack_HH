import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const kegiatan = db.define('kegiatan',{
    judul_kegiatan: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    nama_proyek: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    tanggal_mulai: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    tanggal_berakhir: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    waktu_mulai: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    waktu_berakhir: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    durasi: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    total_menit: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    total_menit_lembur: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    nama_karyawan: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    rate: {
        type: DataTypes.STRING(25),
        allowNull: true
    }
},{
    freezeTableName: true
});

export default kegiatan;

(async()=>{
    await db.sync();
})();