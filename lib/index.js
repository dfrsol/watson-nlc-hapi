'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');


const internals = {};
const plugins = [];


exports.init = function (port, next) {
    
    const server = new Hapi.Server();
    server.connection({ port: port });
    server.register(plugins, (err) => {
        
        if (err) {
            
            return next(err);
        };
        
        server.route(require('./routes').routes);
        
        server.start((err) => {

            return next(err, server);
        }); 
    })
};