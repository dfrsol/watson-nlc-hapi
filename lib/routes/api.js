'use strict';

// Load Modules

const Boom = require('boom');
const Joi = require('joi');
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

    return next();
};

exports.register.attributes = {
    name: 'apiWatson'
}
