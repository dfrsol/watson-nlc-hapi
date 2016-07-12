'use strict';

// Load Modules

const Joi = require('joi');
const NLC = require('../handlers/nlc');


// Declare internals

const internals = {};


exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/nlc/ask',
        config: {
            description: 'Ask a question to a specific classifier',
            validate: {
                query: {
                    id:  Joi.string().min(1).required(),
                    question: Joi.string().min(1).required()
                },
                failAction: function (request, reply, source, error) {

                    return reply(error);
                }
            },
            handler: NLC.ask
        }
    });

    server.route({
        method: 'GET',
        path: '/nlc/create',
        config: {
            description: 'Create a new classifier',
            validate: {
                query: {
                    name: Joi.string().min(1).required(),
                    file: Joi.string().min(1).required()
                },
                failAction: function (reqest, reply, source, error) {

                    return reply(error);
                }
            },
            handler: NLC.create
        }
    });

    server.route({
        method: 'GET',
        path: '/nlc/delete',
        config: {
            description: 'Delete a classifier',
            validate: {
                query: {
                    id: Joi.string().min(1).required(),
                },
                failAction: function (request, reply, source, error) {

                    return reply(error);
                }
            },
            handler: NLC.delete
        }
    })

    server.route({
        method: 'GET',
        path: '/nlc/list',
        config: {
            description: "Returns a list of all classifiers ",
            handler: NLC.list
        }
    });

    server.route({
        method: 'GET',
        path: '/nlc/status',
        config: {
            description: "Returns the current classifier training status",
            validate: {
                query: {
                    id: Joi.string().min(1).required()
                },
                failAction: function (request, reply, source, error) {

                    return reply(error);
                }
            },
            handler: NLC.status
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'apiWatson'
}
