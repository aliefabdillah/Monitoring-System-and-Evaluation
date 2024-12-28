const {
  Model,
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Report.init({
    nama_program: DataTypes.STRING,
    jml_penerima: DataTypes.INTEGER,
    provinsi: DataTypes.STRING,
    kabupaten_kota: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    tgl_penyaluran: DataTypes.DATE,
    bukti: DataTypes.STRING,
    catatan: DataTypes.STRING,
    alasan: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};
