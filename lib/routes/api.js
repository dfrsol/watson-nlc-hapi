'use strict';

// Load Modules

const NLC = require('../handlers/nlc');


// Declare internals

const internals = {};


exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/api/nlc/list',
        config: NLC.list
    });

    server.route({
        method: 'GET',
        path: '/api/nlc/status',
        config: NLC.status
    });

    server.route({
        method: 'GET',
        path: '/api/nlc/ask',
        config: NLC.ask
    });

    server.route({
        method: 'GET',
        path: '/api/nlc/create',
        config: NLC.create
    })

    return next();
};

exports.register.attributes = {
    name: 'apiWatson'
}
