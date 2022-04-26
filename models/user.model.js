// User Schema
// username, email, password


module.exports = (sequelize,Sequelize)=>{
    const User = sequelize.define('user',{
        username : {type:Sequelize.STRING,primaryKey:true},
        email : {type:Sequelize.STRING, allowNull:false},
        password : {type:Sequelize.STRING, allowNull:false},
        mobile : {type:Sequelize.BIGINT, unique:true, allowNull:false}
    },
    {
        tableName: 'users' //Tablename always pulral? why?
    });

    return User;
}