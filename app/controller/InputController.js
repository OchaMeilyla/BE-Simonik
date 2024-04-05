const submit = require('../models/submit')
const RekapData = require('../models/rekap')

function addData(req,res,next){
    if(req.body.nama_pegawai == "" || req.body.tanggal_kegiatan == "" || req.body.nama_kegiatan == "" || req.body.volume_kegiatan == "" || req.body.satuan_kegiatan == "" || req.body.waktu_mulai == "" || req.body.waktu_selesai == "" || req.body.bulan_kegiatan == "" ){
        res.status(400).json({
            message: "Silahkan Isi Terlebih Dahulu"
        })
        return
    }

    submit.create({
        nama_pegawai: req.body.nama_pegawai,
        tanggal_kegiatan: req.body.tanggal_kegiatan,
        nama_kegiatan: req.body.nama_kegiatan,
        volume_kegiatan: req.body.volume_kegiatan,
        satuan_kegiatan: req.body.satuan_kegiatan,
        waktu_mulai: req.body.waktu_mulai,
        waktu_selesai: req.body.waktu_selesai,
        bulan_kegiatan: req.body.bulan_kegiatan //untuk bulan
    })

    .then(function(){
        res.status(201).json({
            message: "input Kinerja Berhasil. Terima Kasih"
        })
    })
    .catch(function(err){
        res.status(500).json({
            error: err,
        })
    })
    return
}

function getRekapKinerja(req,res){
    RekapData.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err =>{
        console.error('Gagal mengambil data dari model: ' + err.message);
        res.status(500).send('Terjadi kesalahan saat mengambil data dari model.');
    });
}

function deleteData(req, res) {
    const id = req.params.id;

    RekapData.destroy({
        where: {
            id: id
        }
    })
    .then(num => {
        if (num === 1) {
            res.status(200).json({ message: "Data berhasil dihapus." });
        } else {
            res.status(404).json({ message: `Data dengan ID ${id} tidak ditemukan.` });
        }
    })
    .catch(err => {
        console.error('Error deleting data:', err);
        res.status(500).json({ message: "Terjadi kesalahan saat menghapus data." });
    });
}


function getDataById(req, res) {
    const id = req.params.id;

    RekapData.findByPk(id)
    .then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: `Data dengan ID ${id} tidak ditemukan.` });
        }
    })
    .catch(err => {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data." });
    });
}

function updateData(req, res) {
    const id = req.params.id;
    const updatedData = req.body; // Data yang sudah diedit dikirim dari klien

    RekapData.findByPk(id)
    .then(data => {
        if (!data) {
            return res.status(404).json({ message: `Data dengan ID ${id} tidak ditemukan.` });
        }

        // Perbarui data dengan data yang diterima dari klien
        data.update(updatedData)
        .then(() => {
            res.status(200).json({ message: "Data berhasil diperbarui." });
        })
        .catch(err => {
            console.error('Error updating data:', err);
            res.status(500).json({ message: "Terjadi kesalahan saat memperbarui data." });
        });
    })
    .catch(err => {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data." });
    });
}




module.exports = {
    addData,
    getRekapKinerja,
    deleteData,
    getDataById,
    updateData
}