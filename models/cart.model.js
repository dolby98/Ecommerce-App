// cart Schema
// Id, Name, Products, TotalPrice


module.exports = (sequelize,Sequelize)=>{
    const Cart = sequelize.define('cart',{
        id : {type:Sequelize.INTEGER, primaryKey:true, autoIncrement:true},
        // name : {type:Sequelize.STRING, allowNull:false},
        // products : {type:Sequelize.STRING},
        totalPrice : {type:Sequelize.INTEGER, defaultValue : 0}
    },
    {
        tableName: 'carts' //Tablename always pulral? why?
    });

    return Cart;
}


