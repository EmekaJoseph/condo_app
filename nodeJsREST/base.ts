const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
import cors from 'cors';
import path from 'path';

const routes = require('./routes');
// const authRoutes = require('./routes/authRoutes');

// rest object
const api = express();


// CORS
const corsOptions = {
    origin: '*', // Allow  this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow cookies to be sent
};

api.use(cors(corsOptions));

// Serve static files from the 'public' directory
api.use(express.static(path.join(__dirname, 'public')));

// middlewares
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(morgan('dev'));

// routes
api.use('/api', routes);

// port
const PORT = process.env.PORT || 8081;

// listen
api.listen(PORT, () => {
    console.log('Condo Nodejs server running on PORT:' + PORT);
});