/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reports', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(36),
        defaultValue: Sequelize.UUIDV4,
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
        values: ['Pending', 'Disetujui', 'Ditolak']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reports');
  },
};
