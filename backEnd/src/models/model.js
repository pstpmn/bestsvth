const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.servers = require("./servers.model.js")(sequelize, Sequelize);
db.comments = require("./category.model.js")(sequelize, Sequelize);
db.votes = require("./votes.model.js")(sequelize, Sequelize);
db.resetRank = require("./resetRanking.model.js")(sequelize, Sequelize);


// db.category.belongsTo(db.servers, {foreignKey: 'game_categoryId'})
// db.servers.hasMany(db.category,{foreignKey: 'category_id'});

db.category.hasMany(db.servers, { foreignKey: 'category_id' });
db.servers.belongsTo(db.category, { foreignKey: 'category_id' });
// db.servers.hasMany(db.category,{foreignKey: 'category_id'});
// db.servers.hasMany(db.category, {foreignKey: 'category_id'});
db.servers.belongsTo(db.users, {foreignKey: 'server_user'});





// db.servers.belongsTo(db.votes, { foreignKey: 'vote_server' });

// db.users.hasMany(db.servers, { foreignKey: 'user_id' });





module.exports = db;

