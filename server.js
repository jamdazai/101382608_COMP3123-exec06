/**
 *  Lab Exercise 6 in Full Stack Development
 * @author: Jam Furaque
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atlas Url here to Connect to the database
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to Mongo DB");    
}).catch(err => {
    console.log('Error connecting to Mongo DB', err);
    process.exit();
});


app.use('/api/v1', noteRoutes);
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});