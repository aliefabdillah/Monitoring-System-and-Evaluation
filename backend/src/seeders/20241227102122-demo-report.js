// eslint-disable-next-line import/no-extraneous-dependencies
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Reports', [
      {
        nama_program: 'BANSOS',
        jml_penerima: 200,
        wilayah: '11,12,13',
        tgl_penyaluran: new Date(),
        bukti: 'http://image.url',
        catatan: '',
        status: 'Pending',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Reports', null, {});
  },
};
