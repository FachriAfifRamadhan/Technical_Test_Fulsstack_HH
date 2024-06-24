import { text } from "express";
import kegiatan from "../models/Model.js";
import moment from "moment";

const calculateTotalovertimeDuration = (data) => {
    let totalMinutes = 0;

    data.forEach(activity => {
        totalMinutes += activity.total_menit_lembur;
    });

    return totalMinutes;
}

const calculateTotalDuration = (data) => {
    let totalMinutes = 0;

    data.forEach(activity => {
        totalMinutes += activity.total_menit;
    });

    return totalMinutes;
}



export const getUsers = async(req, res) =>{
    try{
        const response = await kegiatan.findAll()
        
        const rate = 200;
        const total_durasi = calculateTotalDuration(response);
        const durasi = String(Math.floor(total_durasi / 60)) + " Jam " + String(total_durasi % 60) + " Menit";
        const total_durasi_lembur = calculateTotalovertimeDuration(response);
        const pendapatan = ((total_durasi-total_durasi_lembur) * rate) + (total_durasi_lembur * rate) *(0.3);
        
        res.status(200).json({response,total_durasi, total_durasi_lembur, durasi, pendapatan});
    } catch (error) {
        console.log(error.message);
    }
}

//==========================================================================================================//

export const doInsert = async(req, res) =>{
    try{
        const { judul_kegiatan, nama_proyek, tanggal_mulai, tanggal_berakhir, waktu_mulai, waktu_berakhir, durasi, total_menit, total_menit_lembur} = req.body;
        const data = req.body;
        const time = new Date();
        const m_now = moment(time).format();
        const m_tm = moment(tanggal_mulai).format();
        const m_tb = moment(tanggal_berakhir).format();
        const m_wm = moment(waktu_mulai, 'LT');
        const m_wb = moment(waktu_berakhir, 'LT');
        const wm_hours = m_wm.hours();
        const wm_minutes = m_wm.minutes();
        const wb_hours = m_wb.hours();
        const wb_minutes = m_wb.minutes();
        const time_mulai = tanggal_mulai + " " + waktu_mulai;
        const time_berakhir = tanggal_berakhir + " " + waktu_berakhir;
        const m_timem = moment(time_mulai, "YYYYMMDD HH:mm");
        const m_timeb = moment(time_berakhir, "YYYYMMDD HH:mm");

        //Validation

        if(m_tm > m_now) return res.status(400).json({msg:"waktu yang diinput tidak benar"});

        if(m_timem > m_timeb) return res.status(400).json({msg:"waktu mulai harus sebelum waktu berakhir"});

        if(isNaN(wm_hours) || isNaN(wm_minutes)  ) return res.status(400).json({ msg: "waktu mulai tidak valid" });

        if(isNaN(wb_hours) || isNaN(wb_minutes)) return res.status(400).json({ msg: "waktu mulai tidak valid" });

        const duration = moment.duration(m_timeb.diff(m_timem));
        const totalHours = Math.floor(duration.asHours());
        const totalMinutes = duration.minutes();
        const total = String(totalHours + " Jam " + String(totalMinutes) + " Menit")
        const total_m = ((totalHours* 60) + totalMinutes);
        let total_menit_l = 0;


        if(total_m > 480){
            total_menit_l = total_m - 480;
        }

        data.durasi = total;
        data.total_menit = total_m;
        data.total_menit_lembur = total_menit_l;

        const response = {
            response_code: 201,
            response_msg: "Tambah Proyek Baru Berhasil",
            response_time: time,
            response_data: data,
            duration: total

        }
        // console.log(time_mulai, time_berakhir);
        // console.log(m_timem, m_timeb, total);

        await kegiatan.create(data);
        res.status(201).json({response});
    } catch (error) {
        console.log(error.message);
    }
}

//==========================================================================================================//

export const doUpdate = async(req, res) =>{
    
    try{
        const { judul_kegiatan, nama_proyek, tanggal_mulai, tanggal_berakhir, waktu_mulai, waktu_berakhir, durasi, total_menit, total_menit_lembur} = req.body;
        const data = req.body;
        const time = new Date();
        const m_now = moment(time).format();
        const tanggal_mulaiconv = moment(tanggal_mulai, "YYYYMMDD");
        const tanggal_berakhirconv = moment(tanggal_berakhir, "YYYYMMDD");
        const m_tm = moment(tanggal_mulaiconv).format();
        const m_tb = moment(tanggal_berakhirconv).format();
        const m_wm = moment(waktu_mulai, 'LT');
        const m_wb = moment(waktu_berakhir, 'LT');
        const wm_hours = m_wm.hours();
        const wm_minutes = m_wm.minutes();
        const wb_hours = m_wb.hours();
        const wb_minutes = m_wb.minutes();
        const time_mulai = tanggal_mulai + " " + waktu_mulai;
        const time_berakhir = tanggal_berakhir + " " + waktu_berakhir;
        const m_timem = moment(time_mulai, "YYYYMMDD HH:mm");
        const m_timeb = moment(time_berakhir, "YYYYMMDD HH:mm");


        if(m_tm > m_now) return res.status(400).json({msg:"waktu yang diinput tidak benar"});

        if(m_timem > m_timeb) return res.status(400).json({msg:"waktu mulai harus sebelum waktu berakhir"});

        if(isNaN(wm_hours) || isNaN(wm_minutes)  ) return res.status(400).json({ msg: "waktu mulai tidak valid" });

        if(isNaN(wb_hours) || isNaN(wb_minutes)) return res.status(400).json({ msg: "waktu mulai tidak valid" });

        const duration = moment.duration(m_timeb.diff(m_timem));
        const totalHours = Math.floor(duration.asHours());
        const totalMinutes = duration.minutes();
        const total = String(totalHours + " Jam " + String(totalMinutes) + " Menit")
        const total_m = ((totalHours* 60) + totalMinutes);
        let total_menit_l = 0;


        if(total_m > 480){
            total_menit_l = total_m - 480;
        }

        data.durasi = total;
        data.total_menit = total_m;
        data.total_menit_lembur = total_menit_l;

        await kegiatan.update(data,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

//==========================================================================================================//

export const doDelete = async(req, res) =>{
    try{
        await kegiatan.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}

//==========================================================================================================//

export const doSearchUser = async(req, res) =>{
    try{
        console.log(req.body);
        const whereClause = {};

        if (req.body.judul_kegiatan) {
            whereClause.judul_kegiatan = req.body.judul_kegiatan;
        }
        if (req.body.nama_proyek) {
            whereClause.nama_proyek = req.body.nama_proyek;
        }

        if (Object.keys(whereClause).length == 0) {
            const data = await kegiatan.findAll();
            const rate = 200;
            const total_durasi = calculateTotalDuration(data);
            const durasi = String(Math.floor(total_durasi / 60)) + " Jam " + String(total_durasi % 60) + " Menit";
            const total_durasi_lembur = calculateTotalovertimeDuration(data);
            const pendapatan = ((total_durasi-total_durasi_lembur) * rate) + (total_durasi_lembur * rate) *(0.3);
            const time = new Date();
            return res.status(200).json({data,total_durasi, total_durasi_lembur, durasi, pendapatan});
        }

        
        const data = await kegiatan.findAll({
            where: whereClause
        });
        
        
        const rate = 200;
        const total_durasi = calculateTotalDuration(data);
        const durasi = String(Math.floor(total_durasi / 60)) + " Jam " + String(total_durasi % 60) + " Menit";
        const total_durasi_lembur = calculateTotalovertimeDuration(data);
        const pendapatan = ((total_durasi-total_durasi_lembur) * rate) + (total_durasi_lembur * rate) *(0.3);
        const time = new Date();

        const response = {
            response_code: 200,
            response_msg: "Data Found",
            response_time: time,
            response_data: data
        }

        const notfound = {
            response_code: 404,
            response_msg: "Data Not Found",
            response_time: time,
            response_data: data
        }


        if(data.length != 0){
            res.status(200).json({data,total_durasi, total_durasi_lembur, durasi, pendapatan});
            console.log(response)
        }else{
            res.status(400).json(notfound);
            console.log(notfound)
        }
    } catch (error) {
        console.log(error.message);
    }
}