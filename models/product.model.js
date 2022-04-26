// Product Schema
// Id, Name, Description, CategoryID, Price

module.exports = (sequelize,Sequelize) =>{
    const Product = sequelize.define('product',{
        id:{type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
        name : {type:Sequelize.STRING, allowNull:false},
        description : {type:Sequelize.STRING},
        price : {type:Sequelize.INTEGER, allowNull:false},
    },{
        tableName: 'products'
    });

    // Product.belongsTo(Category);

    return Product;
}

