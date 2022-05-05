const express = require('express');
const route = express.Router();

const services = require("../services/render");
const controller = require('../controller/controller');

// Navigation route 
route.get('/', services.home);
route.get('/add', services.add);
route.get('/update', services.update);


// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

module.exports=route