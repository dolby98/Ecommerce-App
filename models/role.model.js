// Role Schema
// username, email, password


module.exports = (sequelize,Sequelize)=>{
    const Role = sequelize.define('role',{
        id : {type:Sequelize.INTEGER, unique:true, primaryKey:true},
        name : {type:Sequelize.STRING, allowNull:false}
    },
    {
        tableName: 'roles' //Tablename always pulral? why?
    });

    return Role;
}