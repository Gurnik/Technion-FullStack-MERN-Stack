const express = require ('express');
const userssRouter = require('./routers/usersRouter');
const moviesRouter = require('./routers/moviesRouter');
const membersRouter = require('./routers/membersRouter');
const subscribtionsRouter = require('./routers/subscribtionsRouter');

var cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cors());

require('./configs/database');

app.use('/api/users', userssRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/members', membersRouter);
app.use('/api/subscribtions', subscribtionsRouter);

app.listen(8000);