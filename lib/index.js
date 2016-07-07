'use strict';

// Load Modules

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const Vision = require('vision');
const NLCApi = require('./routes/api')


// Declare Internals

const internals = {
    relativePath: Path.resolve(__dirname, '..')
};


const plugins = [Inert, Vision, NLCApi];


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
        
        // Set templates
        server.views({
            engines: {
                hbs: require('handlebars')
            },
            relativeTo: internals.relativePath,
            path: './templates',
            helpersPath: './templates/helpers',
            layoutPath: './templates/layouts',
            partialsPath: './templates/partials',
            layout: 'default'
        });
        
        // Route static files
        server.route({
            method: 'GET',
            path: '/public/{p*}',
            config: {
                handler: {
                    directory: {
                        path: internals.relativePath + 'public',
                        index: false,
                        redirectToSlash: false
                    }
                }
            }
        });
        server.route(require('./routes').endpoints);

        server.start((err) => {

            return next(err, server);
        });
    });
};
