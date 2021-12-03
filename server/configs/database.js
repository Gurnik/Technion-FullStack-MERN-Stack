const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/moviesDB');

const initialDataSetup = require('./initialDataSetup');
initialDataSetup.fetchInitialData();