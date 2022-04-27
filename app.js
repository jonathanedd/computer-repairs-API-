const express = require('express');


//Routers 
const { userRouter } = require('./routes/users.route');

//Utils - Import connection with databse
const { db } = require('./utils/database'); 

//Initialize express app 
const app = express();

//PORT 
const PORT = 4001;

//enable incoming JSON data
app.use(express.json());

// URL : http://localhost:4001/api/v2/users
app.use('/api/v2/users', userRouter );



// resolved Exercise 
app.post('/posts', (req, res) => {
    const { title } = req.body;
    const newPost = {
        id: Math.floor(Math.random() * 1000),
        title
    };

    posts.push(newPost)

    res.status(202).json({ newPost })
});



//database authentication
db.authenticate()
    .then(() => console.log('database was authenticated'))
    .catch( error => console.log(error))

    db.sync()
        .then(() => console.log('synced'))
        .catch( error => console.log(error))


//App listen petitions
app.listen(PORT, () => {
    console.log(`Express app running in port: ${PORT}`)
})