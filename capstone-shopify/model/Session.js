const Sequelize = require('sequelize');
const db = require('../config/db');


const Session = db.define('session', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    jsession_id: {
        type: Sequelize.INTEGER
    },
    user_id: {
        type: Sequelize.INTEGER
    },                                         
    session_start_time: {
        type: Sequelize.DATE
    },
    session_end_time: {
        type: Sequelize.DATE
    },
    entrance_page_id: {
        type: Sequelize.INTEGER
    },
    exit_page_id: {
        type: Sequelize.INTEGER
    },
    city_id: {
        type: Sequelize.INTEGER
    },
    device_type_id: {
        type: Sequelize.INTEGER
    },
    os_id: {
        type: Sequelize.INTEGER
    },
    acquistion_id: {
        type: Sequelize.INTEGER
    },
    age_id: {
        type: Sequelize.INTEGER
    },
    gender_id: {
        type: Sequelize.INTEGER
    },
    is_first_visit: {
        type: Sequelize.INTEGER
    },
}, {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Session;