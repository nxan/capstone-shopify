const Sequelize = require('sequelize');

const db = new Sequelize('DB_NAME', 'USERNAME', 'PASSWORD', {
    dialect: 'mssql',
    host: 'HOST',
    port: 1433,
    timestamps: false,
    dialectOptions: { options: { encrypt: true } }
});

module.exports = db;