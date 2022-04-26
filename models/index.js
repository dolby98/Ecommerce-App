// This file will be used for : 
// 1) Creating db connection with sequelize ORM
// 2) Export all functionalities of modes
// 3) If someone imports models folder then this index file exports automatically
// 4) All of this db code is exported in db object created at bottom

const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.json');

const env = "production";
const dbSetting = dbConfig[env];
const sequelize = new Sequelize(
    dbSetting.database,
    dbSetting.username,
    dbSetting.password,
    dbSetting.hostDialect
    // dbSetting.dialect
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Category = require("./category.model.js")(sequelize,Sequelize);
db.Product = require("./product.model.js")(sequelize,Sequelize);
db.User = require("./user.model.js")(sequelize,Sequelize);
db.Role = require("./role.model.js")(sequelize,Sequelize);
db.Cart = require("./cart.model.js")(sequelize,Sequelize);

db.Category.hasMany(db.Product);

db.User.belongsToMany(db.Role,{
    through: "user_roles",
    as: "roles",
    foreignKey : "userId",
    otherKey: "roleId"
});
db.Role.belongsToMany(db.User,{
    through: "user_roles",
    as:"users",
    foreignKey : "roleId",
    otherKey: "userId"
});

db.ROLES = ["user","admin"];

db.Cart.belongsToMany(db.Product,{
    through: "cart_products",
    as : "products",
    foreignKey : "cartId",
    otherKey : "productId"
});

db.Product.belongsToMany(db.Cart,{
    through: "cart_products",
    as : "carts",
    otherKey : "cartId",
    foreignKey : "productId"
});

db.Cart.belongsTo(db.User);

module.exports = db;



// Users-->Roles relationship is many to many