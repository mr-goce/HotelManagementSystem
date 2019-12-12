const express = require("express");
const app = express();
const mainLogger = require('./loger/logger');
var bodyParser = require('body-parser');
const swagerJsDoc = require('swagger-jsdoc');
// const swaggerDocs = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const {swaggerDocs} = require('./swagger');
var jwt = require('express-jwt');
var unless = require('express-unless');
const guests = require('./guest/routes');
const hotels = require('./hotel/routes');
const rooms = require('./room/routes');
const reservation = require('./reservation/routes');
const errH = require('./errorHandeler');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(mainLogger.logger);

// const publicRoutePaths = ['/login'];
// app.use(jwt({ secret: 'goce' }).unless({path: publicRoutePaths}));

app.use('/api/guests', guests);
app.use('/api/hotels', hotels);
app.use('/api',rooms);
app.use('/api/reservations',reservation);

//test
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use(errH.errorRoute);
app.use(errH.errorHandler);

// app.use(errHandeler);
const port = process.env.PORT || 8080;
app.listen(port,()=>{

    console.log(`The server is started on port: ${port}`)
})