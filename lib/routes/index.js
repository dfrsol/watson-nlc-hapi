'use strict';

// Load Modules

const Path = require('path');


// Declare internals

const internals = {
    publicPath: Path.join(__dirname, '..', 'public')
};


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
                path: internals.publicPath,
                index: false,
                redirectToSlash: false
            }
        }
    }
});
