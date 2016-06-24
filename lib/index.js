'use strict';

const Boom = require('boom');
const Hapi = require('hapi');
const Hoek = require('hoek');
const Inert = require('inert');
const Path = require('path');
const Vision = require('vision');


const internals = {};
const plugins = [Inert, Vision];


exports.init = function (port, next) {

    const server = new Hapi.Server();
    server.connection({ port: port });

    server.ext('onPreResponse', (request, reply) => {

        if (!request.response.isBoom) {
            return reply.continue();
        }

            return reply.view('error', request.response).code(request.response.output.statusCode);
    });

    server.register(plugins, (err) => {

        if (err) {

            return next(err);
        };

        server.views({
            engines: {
                hbs: require('handlebars')
            },
            relativeTo: Path.resolve(__dirname, '..'),
            path: './templates',
            helpersPath: './templates/helpers',
            layoutPath: './templates/layouts',
            partialsPath: './templates/partials',
            layout: 'default'
        });

        server.route(require('./routes').routes);

        server.start((err) => {

            return next(err, server);
        });
    })
};
