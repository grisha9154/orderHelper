'use strict';
const { Sequelize } = require('sequelize');

module.exports = {
  async up ({ context: queryInterface }) {
    return Promise.all([
      queryInterface.addColumn(
        'CostGoods',
        'originCost',
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'CostGoods',
        'margin',
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'CostGoods',
        'originWeight',
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'CostGoods',
        'dryWeight',
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'CostGoods',
        'dryCost',
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'CostGoods',
        'costPrice',
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'CostGoods',
        'totalCost',
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'CostGoods',
        'additionalExpenses',
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      ),
    ]);
  },

  async down ({ context: queryInterface }) {
    return Promise.all([
      queryInterface.removeColumn('CostGoods', 'originCost'),
      queryInterface.removeColumn('CostGoods', 'margin'),
      queryInterface.removeColumn('CostGoods', 'originWeight'),
      queryInterface.removeColumn('CostGoods', 'dryWeight'),
      queryInterface.removeColumn('CostGoods', 'dryCost'),
      queryInterface.removeColumn('CostGoods', 'costPrice'),
      queryInterface.removeColumn('CostGoods', 'totalCost'),
      queryInterface.removeColumn('CostGoods', 'additionalExpenses'),
    ]);
  }
};
