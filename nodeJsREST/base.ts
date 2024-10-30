const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
import cors from 'cors';

const publicRoutes = require('./routes/publicRoutes');

// rest object
const api = express();


// CORS
const corsOptions = {
    origin: '*', // Allow  this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow cookies to be sent
};

api.use(cors(corsOptions));

// middlewares
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(morgan('dev'));

// routes
api.use('/api/public', publicRoutes);

// port
const PORT = process.env.PORT || 8081;

// listen
api.listen(PORT, () => {
    console.log('Condo Nodejs server running on PORT:' + PORT);
});