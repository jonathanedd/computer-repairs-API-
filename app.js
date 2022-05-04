const express = require('express');



//Routers 
const { userRouter } = require('./routes/users.route');
const { repairRouter } = require('./routes/repairs.route');

//Utils - Import connection with databse
const { db } = require('./utils/database'); 

//Initialize express app 
const app = express();

//PORT 
const PORT = process.env.PORT || 4001;

//enable incoming JSON data
app.use(express.json());

// URL : http://localhost:4001/api/v2/users
app.use('/api/v2/users', userRouter );

//URL : http://localhost:4001/api/v2/repairs
app.use('/api/v2/repairs', repairRouter );


//database authentication
db.authenticate()
    .then(() => console.log('database was authenticated'))
    .catch( error => console.log(error))

db.sync({})
    .then(() => console.log('synced'))
    .catch( error => console.log(error))


//App listen petitions
app.listen(PORT, () => {
    console.log(`Express app running in port: ${PORT}`)
})