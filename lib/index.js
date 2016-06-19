'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');


const internals = {};


internals.init = function () {
    
    const server = new Hapi.Server();
    server.connection({ port:process.env.PORT || 8000 });
    
    server.route({
        method: 'GET',
        path: '/{path*}',
        config: {
            description: 'Simple starter route',
            handler: (reqest, reply) => {
                
                return reply('Watson NLC Hapi.JS Starter Kit');
            }
        }
    });
    
    server.start((err) => {

        Hoek.assert(!err, err);
        console.log('Server started at: ' + server.info.uri);
    });
}

internals.init();