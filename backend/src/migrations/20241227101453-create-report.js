/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reports', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuidv4(),
      },
      nama_program: {
        type: Sequelize.STRING,
      },
      jml_penerima: {
        type: Sequelize.BIGINT,
      },
      wilayah: {
        type: Sequelize.STRING,
      },
      tgl_penyaluran: {
        type: Sequelize.DATE,
      },
      bukti: {
        type: Sequelize.STRING,
      },
      catatan: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Pending', 'Disetujui', 'Ditolak'],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reports');
  },
};
