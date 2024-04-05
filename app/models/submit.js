const connection = require("./database");
const sequelize = require("sequelize");

const submit = connection.define(
    "RekapData",
    {
      nama_pegawai: { type: sequelize.DataTypes.STRING },
      tanggal_kegiatan: { type: sequelize.DataTypes.DATE},
      nama_kegiatan: { type: sequelize.DataTypes.TEXT},
      volume_kegiatan: {type: sequelize.DataTypes.INTEGER},
      satuan_kegiatan: {type: sequelize.DataTypes.TEXT},
      waktu_mulai: {type: sequelize.DataTypes.TIME},
      waktu_selesai: {type: sequelize.DataTypes.TIME},
      bulan_kegiatan:{type: sequelize.DataTypes.INTEGER}  // tambahkan kolom bulan_kegiatan
    },
    {
        freezeTableName: true,
        timestamps:false,
    }
);

module.exports = submit;
