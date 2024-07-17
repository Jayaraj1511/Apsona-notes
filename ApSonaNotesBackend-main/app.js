const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require("./routes/auth");
const path = require('path'); 
const cors = require('cors');


const app = express();

var indexRouter = require('./routes/index');


// Define a port number
const PORT =process.env.PORT || 8000;



// Middleware to parse JSON bodies
app.use(express.json());


// Middleware
app.use(bodyParser.json());
app.use(cors());


// Database connection
mongoose.connect('mongodb+srv://nachiket:nachiket@cluster0.smaugi0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database');
       
    })
    .catch(err => console.error(err));


// Define the path to your HTML file
const indexPath = path.join(__dirname, 'design', 'index.html');

// Serve the index.html file when accessing the root URL "/"
app.get('/', (req, res) => {
    res.sendFile(indexRouter);
});






app.get("/getAll", (req, res) => {
    res.send("Hello World! Side");
});


app.use('/notes', noteRoutes);
app.use('/user', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Internal Server Error");
});
