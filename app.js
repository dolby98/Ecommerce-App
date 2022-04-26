const express = require('express');
const app = express();
const serverConfig = require('./config/server.config.js');
const logger = require('morgan');

const db = require("./models"); //If we just write models toh it by default imports index.js file


db.sequelize.sync({force:true}).then(()=>{
    console.log("updated models/tables");
    init();
}); //sync all tables in case of any change in tables

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger('dev'));

function init(){
    db.Role.create({
        id:1,
        name:db.ROLES[0]
    });

    db.Role.create({
        id:2,
        name:db.ROLES[1]
    });
}


const env = "dev";

app.get('/', (req,res)=>{
    res.send("welcome to your ecommerce app");
})

require('./routes/category.routes')(app); //We pass our app as a paramter to function to routes and import the routing dependencies in main app.js
require('./routes/product.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/cart.routes')(app);

app.listen(process.env.PORT || serverConfig.PORT, async ()=>{
    console.log("Server has started");
    
    // await db.sequelize.authenticate().then(() => { When we are syncing , it automatically authenticates: so no use of this
    //     console.log('Database connected...');
    // }).catch(err => {
    //     console.log('Error: ' + err);
    // })
});


