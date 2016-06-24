'use strict';

const Path = require('path');

exports.routes = [];

exports.routes.push({
    method: 'GET',
    path: '/',
    config: {
        description: 'Simple starter route',
        handler: (reqest, reply) => {

            return reply.view('index');
        }
    }
});

exports.routes.push({
    method: 'GET',
    path: '/public/{p*}',
    config: {
        handler: {
            directory: {
                path: Path.join(__dirname, '..', 'public'),
                index: false,
                redirectToSlash: false
            }
        }
    }
});
