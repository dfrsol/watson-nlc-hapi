'use strict';

const Hoek = require('hoek');
const Server = require('./index');


const internals = {};


Server.init(8000, (err, server) => {
   
   Hoek.assert(!err, err);
   console.log('Server started at: ' + server.info.uri); 
});